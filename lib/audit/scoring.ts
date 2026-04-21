import type {
  ActionItem,
  Answers,
  Grade,
  IconName,
  Pillar,
  PillarScores,
  Platform,
  Points,
  ScoreBundle,
} from "./types";
import { QUESTIONS } from "./questions";

const PILLAR_MAX_RAW = 15;
const PILLAR_NORMALIZED = 25;

export function computeScores(answers: Answers): ScoreBundle {
  const pillarRaw: PillarScores = { content: 0, strategy: 0, engagement: 0, analytics: 0 };

  for (const q of QUESTIONS) {
    const pts = answers[q.id] ?? 0;
    pillarRaw[q.pillar] += pts;
  }

  const pillarScores: PillarScores = {
    content: Math.round((pillarRaw.content / PILLAR_MAX_RAW) * PILLAR_NORMALIZED),
    strategy: Math.round((pillarRaw.strategy / PILLAR_MAX_RAW) * PILLAR_NORMALIZED),
    engagement: Math.round((pillarRaw.engagement / PILLAR_MAX_RAW) * PILLAR_NORMALIZED),
    analytics: Math.round((pillarRaw.analytics / PILLAR_MAX_RAW) * PILLAR_NORMALIZED),
  };

  const total = pillarScores.content + pillarScores.strategy + pillarScores.engagement + pillarScores.analytics;
  const grade = computeGrade(total);

  return { total, grade, pillarScores, pillarRaw };
}

export function computeGrade(total: number): Grade {
  if (total >= 85) return "A";
  if (total >= 70) return "B";
  if (total >= 50) return "C";
  if (total >= 30) return "D";
  return "F";
}

interface ActionItemTemplate {
  id: string;
  pillar: Pillar;
  title: string;
  body: string;
  icon: IconName;
  primaryQuestion: string;
  match: (answers: Answers, platforms: Platform[]) => boolean;
}

const TEMPLATES: ActionItemTemplate[] = [
  {
    id: "content.cadence",
    pillar: "content",
    title: "Lock in a weekly cadence before anything else.",
    body: "Pick one platform, commit to 3 posts a week for 30 days, and protect the time on your calendar like a client meeting. Consistency beats quality at this stage.",
    icon: "calendar",
    primaryQuestion: "content.1",
    match: (a) => (a["content.1"] ?? 0) <= 1,
  },
  {
    id: "content.native-ig",
    pillar: "content",
    title: "Stop resizing. Start shooting Reels.",
    body: "Instagram rewards native vertical video. Build one Reel a week from scratch — not a recycled square post — and the algorithm will start showing you to strangers again.",
    icon: "eye",
    primaryQuestion: "content.4",
    match: (a, p) => (a["content.4"] ?? 0) <= 1 && p.includes("instagram"),
  },
  {
    id: "content.native-tt",
    pillar: "content",
    title: "Open with a hook. Cut the intro.",
    body: "TikTok kills videos with slow starts. The first 2 seconds need to make a claim, ask a question, or show something the viewer can't look away from.",
    icon: "trend-up",
    primaryQuestion: "content.4",
    match: (a, p) => (a["content.4"] ?? 0) <= 1 && p.includes("tiktok"),
  },
  {
    id: "content.native-li",
    pillar: "content",
    title: "Write the post like a LinkedIn post — not an Instagram caption.",
    body: "Lead with a one-line hook, break lines aggressively, and end with a question. LinkedIn's feed rewards posts that look like posts, not marketing copy.",
    icon: "pen",
    primaryQuestion: "content.4",
    match: (a, p) => (a["content.4"] ?? 0) <= 1 && p.includes("linkedin"),
  },
  {
    id: "content.visual-brand",
    pillar: "content",
    title: "Pick 2 fonts, 3 colors, and lock them in.",
    body: "Build a small visual system \u2014 fonts, colors, logo usage \u2014 and run every new post through it. Your feed should look like one brand inside a week.",
    icon: "target",
    primaryQuestion: "content.3",
    match: (a) => (a["content.3"] ?? 0) <= 1,
  },
  {
    id: "content.repurpose",
    pillar: "content",
    title: "Turn one piece of content into five.",
    body: "Every long video becomes a Reel, a carousel, a quote graphic, a LinkedIn post, and a newsletter line. Create once, publish five times.",
    icon: "filter",
    primaryQuestion: "content.5",
    match: (a) => (a["content.5"] ?? 0) <= 1,
  },

  {
    id: "strategy.goals",
    pillar: "strategy",
    title: "Write a one-sentence goal with a number in it.",
    body: "\u201cGenerate 15 qualified inquiries from social media per quarter\u201d beats \u201cgrow our presence\u201d by a wide margin. If you can't count it, you can't improve it.",
    icon: "target",
    primaryQuestion: "strategy.1",
    match: (a) => (a["strategy.1"] ?? 0) <= 1,
  },
  {
    id: "strategy.audience",
    pillar: "strategy",
    title: "Name your customer. Out loud. In one paragraph.",
    body: "Job title, pain point, platform. If you can't describe who you're talking to in two sentences, every post is aimed at no one.",
    icon: "users",
    primaryQuestion: "strategy.2",
    match: (a) => (a["strategy.2"] ?? 0) <= 1,
  },
  {
    id: "strategy.pillars",
    pillar: "strategy",
    title: "Set 3 content pillars and refuse to post outside them.",
    body: "Pick three themes that tie to your business and your audience's problems. Every post earns its place by living inside one of those three buckets.",
    icon: "filter",
    primaryQuestion: "strategy.3",
    match: (a) => (a["strategy.3"] ?? 0) <= 1,
  },
  {
    id: "strategy.voice",
    pillar: "strategy",
    title: "Draft a one-page voice doc.",
    body: "Ten lines of \u201cwe sound like this, we don't sound like this,\u201d with examples. Anyone on your team should be able to post in your voice without asking you.",
    icon: "pen",
    primaryQuestion: "strategy.4",
    match: (a) => (a["strategy.4"] ?? 0) <= 1,
  },
  {
    id: "strategy.competitors",
    pillar: "strategy",
    title: "Pick 3 competitors and audit their feeds this week.",
    body: "Note what's working, what isn't, and where the gaps are. Their gaps are your opening.",
    icon: "eye",
    primaryQuestion: "strategy.5",
    match: (a) => (a["strategy.5"] ?? 0) <= 1,
  },

  {
    id: "engagement.response-time",
    pillar: "engagement",
    title: "Answer every DM within 24 hours. Non-negotiable.",
    body: "Inbound messages from social are the hottest leads you'll get. Treat them like a ringing phone \u2014 not a pile of email.",
    icon: "heart",
    primaryQuestion: "engagement.1",
    match: (a) => (a["engagement.1"] ?? 0) <= 1 || (a["engagement.5"] ?? 0) <= 1,
  },
  {
    id: "engagement.proactive-ig",
    pillar: "engagement",
    title: "Spend 15 minutes a day commenting, not posting.",
    body: "Pick 20 Instagram accounts your ideal customer follows. Leave thoughtful comments. Do it every day for 30 days \u2014 watch what happens to your reach.",
    icon: "users",
    primaryQuestion: "engagement.2",
    match: (a, p) => (a["engagement.2"] ?? 0) <= 1 && p.includes("instagram"),
  },
  {
    id: "engagement.proactive-li",
    pillar: "engagement",
    title: "Comment on 10 LinkedIn posts before you post your own.",
    body: "LinkedIn's algorithm weights engagement heavily. Showing up in other people's comments will pull more visibility than any post you write today.",
    icon: "pen",
    primaryQuestion: "engagement.2",
    match: (a, p) => (a["engagement.2"] ?? 0) <= 1 && p.includes("linkedin"),
  },
  {
    id: "engagement.community",
    pillar: "engagement",
    title: "Build one repeatable touchpoint beyond the feed.",
    body: "A monthly email, a private group, a standing Q&A \u2014 pick one. Turn followers into people you have a relationship with.",
    icon: "users",
    primaryQuestion: "engagement.3",
    match: (a) => (a["engagement.3"] ?? 0) <= 1,
  },
  {
    id: "engagement.ugc",
    pillar: "engagement",
    title: "Ask your three best customers to tag you this month.",
    body: "User-generated content is the highest-trust marketing you can get \u2014 and nobody will do it unless you specifically ask.",
    icon: "heart",
    primaryQuestion: "engagement.4",
    match: (a) => (a["engagement.4"] ?? 0) <= 1,
  },

  {
    id: "analytics.habit",
    pillar: "analytics",
    title: "Put a 15-minute analytics review on your calendar every Monday.",
    body: "Same day, same time, every week. You cannot optimize what you never look at.",
    icon: "calendar",
    primaryQuestion: "analytics.1",
    match: (a) => (a["analytics.1"] ?? 0) <= 1,
  },
  {
    id: "analytics.top-content",
    pillar: "analytics",
    title: "Identify your top 3 posts of the last 90 days and break down why they worked.",
    body: "Hook? Topic? Format? Timing? Patterns in your winners are the blueprint for your next 10 posts.",
    icon: "chart",
    primaryQuestion: "analytics.2",
    match: (a) => (a["analytics.2"] ?? 0) <= 1,
  },
  {
    id: "analytics.targets",
    pillar: "analytics",
    title: "Set a monthly follower and engagement target \u2014 even if it's small.",
    body: "\u201cGrow to 2,500 followers with a 4% engagement rate by end of next quarter\u201d gives you something to steer toward.",
    icon: "trend-up",
    primaryQuestion: "analytics.3",
    match: (a) => (a["analytics.3"] ?? 0) <= 1,
  },
  {
    id: "analytics.adjust",
    pillar: "analytics",
    title: "Kill one thing this month that isn't working.",
    body: "A format, a pillar, a posting time \u2014 pick the weakest performer and stop doing it. Redeploy the hours elsewhere.",
    icon: "scissors",
    primaryQuestion: "analytics.4",
    match: (a) => (a["analytics.4"] ?? 0) <= 1,
  },
  {
    id: "analytics.prune",
    pillar: "analytics",
    title: "Review your content pillars quarterly \u2014 and cut the bottom one.",
    body: "If a pillar isn't driving engagement, shares, or inquiries after 90 days, it's a hobby, not a strategy.",
    icon: "scissors",
    primaryQuestion: "analytics.5",
    match: (a) => (a["analytics.5"] ?? 0) <= 1,
  },
];

export function pickActionItems(
  answers: Answers,
  platforms: Platform[],
  scores: ScoreBundle,
  max: number = 5
): ActionItem[] {
  const matched = TEMPLATES.filter((t) => t.match(answers, platforms)).map<ActionItem>((t) => {
    const primaryScore: Points = (answers[t.primaryQuestion] ?? 0) as Points;
    return {
      id: t.id,
      pillar: t.pillar,
      title: t.title,
      body: t.body,
      icon: t.icon,
      severity: 3 - primaryScore,
    };
  });

  matched.sort((a, b) => {
    if (b.severity !== a.severity) return b.severity - a.severity;
    const aPillar = scores.pillarScores[a.pillar];
    const bPillar = scores.pillarScores[b.pillar];
    if (aPillar !== bPillar) return aPillar - bPillar;
    return a.id.localeCompare(b.id);
  });

  const capPerPillar = 2;
  const pillarCount: Record<Pillar, number> = { content: 0, strategy: 0, engagement: 0, analytics: 0 };
  const result: ActionItem[] = [];

  for (const item of matched) {
    if (result.length >= max) break;
    if (pillarCount[item.pillar] >= capPerPillar) continue;
    pillarCount[item.pillar] += 1;
    result.push(item);
  }

  return result;
}
