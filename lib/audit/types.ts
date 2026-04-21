export type Platform = "instagram" | "tiktok" | "linkedin" | "facebook";

export type Pillar = "content" | "strategy" | "engagement" | "analytics";

export type Points = 0 | 1 | 2 | 3;

export type QId = string;

export interface QuestionOption {
  label: string;
  points: Points;
}

export interface Question {
  id: QId;
  pillar: Pillar;
  prompt: string;
  options: QuestionOption[];
}

export type Grade = "A" | "B" | "C" | "D" | "F";

export interface PillarScores {
  content: number;
  strategy: number;
  engagement: number;
  analytics: number;
}

export interface ScoreBundle {
  total: number;
  grade: Grade;
  pillarScores: PillarScores;
  pillarRaw: PillarScores;
}

export type IconName =
  | "target"
  | "calendar"
  | "trend-up"
  | "users"
  | "pen"
  | "heart"
  | "eye"
  | "chart"
  | "filter"
  | "scissors";

export interface ActionItem {
  id: string;
  pillar: Pillar;
  title: string;
  body: string;
  icon: IconName;
  severity: number;
}

export type Answers = Record<QId, Points>;

export type Screen =
  | "landing"
  | "platforms"
  | "questions"
  | "email-gate"
  | "generating"
  | "results";

export interface EmailGateData {
  firstName: string;
  email: string;
  wantsNewsletter: boolean;
}

export interface AuditState {
  screen: Screen;
  platforms: Platform[];
  currentPillar: 0 | 1 | 2 | 3;
  currentQ: 0 | 1 | 2 | 3 | 4;
  answers: Answers;
  direction: "forward" | "back";
  email: EmailGateData;
  scores?: ScoreBundle;
  actionItems?: ActionItem[];
  submitStatus: "idle" | "sending" | "sent" | "failed";
}

export const PILLARS: Pillar[] = ["content", "strategy", "engagement", "analytics"];

export const PILLAR_META: Record<Pillar, { title: string; subtitle: string }> = {
  content: { title: "Content & Consistency", subtitle: "The work you publish." },
  strategy: { title: "Strategy & Goals", subtitle: "The plan behind it." },
  engagement: { title: "Engagement & Community", subtitle: "The relationships you build." },
  analytics: { title: "Analytics & Growth", subtitle: "The feedback loop." },
};

export const PLATFORM_META: Record<Platform, { label: string }> = {
  instagram: { label: "Instagram" },
  tiktok: { label: "TikTok" },
  linkedin: { label: "LinkedIn" },
  facebook: { label: "Facebook" },
};
