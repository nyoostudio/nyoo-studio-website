"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  ActionItem,
  AuditState,
  EmailGateData,
  Platform,
  Points,
  ScoreBundle,
} from "@/lib/audit/types";
import { questionsForPillar } from "@/lib/audit/questions";
import { computeScores, pickActionItems } from "@/lib/audit/scoring";
import { LandingScreen } from "@/components/sections/audit/LandingScreen";
import { PlatformSelector } from "@/components/sections/audit/PlatformSelector";
import { QuestionStep } from "@/components/sections/audit/QuestionStep";
import { EmailGate } from "@/components/sections/audit/EmailGate";
import { GeneratingScreen } from "@/components/sections/audit/GeneratingScreen";
import { ResultsScreen } from "@/components/sections/audit/ResultsScreen";

const INITIAL_STATE: AuditState = {
  screen: "landing",
  platforms: [],
  currentPillar: 0,
  currentQ: 0,
  answers: {},
  direction: "forward",
  email: { firstName: "", email: "", wantsNewsletter: false },
  submitStatus: "idle",
};

export function AuditApp() {
  const [state, setState] = useState<AuditState>(INITIAL_STATE);

  useEffect(() => {
    const el = document.getElementById("audit-step-heading");
    if (el && typeof (el as HTMLElement).focus === "function") {
      (el as HTMLElement).focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.screen, state.currentPillar, state.currentQ]);

  const currentPillarQuestions = questionsForPillar(state.currentPillar);
  const currentQuestion = currentPillarQuestions[state.currentQ];

  const handleStart = useCallback(() => {
    setState((s) => ({ ...s, screen: "platforms", direction: "forward" }));
  }, []);

  const handlePlatformsContinue = useCallback((platforms: Platform[]) => {
    setState((s) => ({
      ...s,
      platforms,
      screen: "questions",
      currentPillar: 0,
      currentQ: 0,
      direction: "forward",
    }));
  }, []);

  const handlePlatformsBack = useCallback(() => {
    setState((s) => ({ ...s, screen: "landing", direction: "back" }));
  }, []);

  const handleAnswer = useCallback(
    (points: Points) => {
      if (!currentQuestion) return;
      setState((s) => ({
        ...s,
        answers: { ...s.answers, [currentQuestion.id]: points },
      }));
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    setState((s) => {
      if (s.currentQ < 4) {
        return { ...s, currentQ: (s.currentQ + 1) as AuditState["currentQ"], direction: "forward" };
      }
      if (s.currentPillar < 3) {
        return {
          ...s,
          currentPillar: (s.currentPillar + 1) as AuditState["currentPillar"],
          currentQ: 0,
          direction: "forward",
        };
      }
      return { ...s, screen: "email-gate", direction: "forward" };
    });
  }, []);

  const handleBack = useCallback(() => {
    setState((s) => {
      if (s.currentQ > 0) {
        return { ...s, currentQ: (s.currentQ - 1) as AuditState["currentQ"], direction: "back" };
      }
      if (s.currentPillar > 0) {
        return {
          ...s,
          currentPillar: (s.currentPillar - 1) as AuditState["currentPillar"],
          currentQ: 4,
          direction: "back",
        };
      }
      return { ...s, screen: "platforms", direction: "back" };
    });
  }, []);

  const handleEmailSubmit = useCallback(
    async (email: EmailGateData, token: string | null) => {
      const scores: ScoreBundle = computeScores(state.answers);
      const actionItems: ActionItem[] = pickActionItems(state.answers, state.platforms, scores);

      setState((s) => ({
        ...s,
        email,
        scores,
        actionItems,
        submitStatus: "sending",
        screen: "generating",
        direction: "forward",
      }));

      const timerPromise = new Promise<void>((r) => setTimeout(r, 1500));

      const submitPromise = (async () => {
        if (!token) return "failed" as const;
        try {
          const res = await fetch("/api/capture-audit-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: email.firstName,
              email: email.email,
              wantsNewsletter: email.wantsNewsletter,
              score: scores.total,
              grade: scores.grade,
              pillarScores: scores.pillarScores,
              platforms: state.platforms,
              timestamp: new Date().toISOString(),
              token,
            }),
          });
          return res.ok ? ("sent" as const) : ("failed" as const);
        } catch {
          return "failed" as const;
        }
      })();

      const [, submitResult] = await Promise.all([timerPromise, submitPromise]);

      setState((s) => ({ ...s, screen: "results", submitStatus: submitResult, direction: "forward" }));
    },
    [state.answers, state.platforms]
  );

  const handleEmailBack = useCallback(() => {
    setState((s) => ({
      ...s,
      screen: "questions",
      currentPillar: 3,
      currentQ: 4,
      direction: "back",
    }));
  }, []);

  const handleRestart = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  switch (state.screen) {
    case "landing":
      return <LandingScreen onStart={handleStart} />;

    case "platforms":
      return (
        <PlatformSelector
          selected={state.platforms}
          onBack={handlePlatformsBack}
          onContinue={handlePlatformsContinue}
        />
      );

    case "questions":
      if (!currentQuestion) return null;
      return (
        <QuestionStep
          key={currentQuestion.id}
          question={currentQuestion}
          currentPillar={state.currentPillar}
          currentQ={state.currentQ}
          selected={state.answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onBack={handleBack}
          onNext={handleNext}
        />
      );

    case "email-gate":
      return <EmailGate onSubmit={handleEmailSubmit} onBack={handleEmailBack} />;

    case "generating":
      return <GeneratingScreen />;

    case "results":
      if (!state.scores || !state.actionItems) return null;
      return (
        <ResultsScreen
          scores={state.scores}
          actionItems={state.actionItems}
          firstName={state.email.firstName}
          submitFailed={state.submitStatus === "failed"}
          onRestart={handleRestart}
        />
      );
  }
}
