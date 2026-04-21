import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: "content.1",
    pillar: "content",
    prompt: "How often are you posting new content on your primary platform?",
    options: [
      { label: "Multiple times per week, every week, no gaps", points: 3 },
      { label: "Once a week like clockwork", points: 2 },
      { label: "Whenever I have time — a few times a month", points: 1 },
      { label: "Haven't posted in weeks. Or months.", points: 0 },
    ],
  },
  {
    id: "content.2",
    pillar: "content",
    prompt: "When you do post, what does it look like?",
    options: [
      { label: "A real mix — video, photo, carousels, written posts", points: 3 },
      { label: "Mostly one format, but some variety", points: 2 },
      { label: "Almost always the same format", points: 1 },
      { label: "Not sure. Whatever the tool suggests.", points: 0 },
    ],
  },
  {
    id: "content.3",
    pillar: "content",
    prompt: "If someone scrolled your grid or profile, would they recognize you as one brand?",
    options: [
      { label: "Yes — same fonts, colors, tone across every post", points: 3 },
      { label: "Mostly — a few older posts are off, but newer ones line up", points: 2 },
      { label: "It's a mixed bag — no clear visual system", points: 1 },
      { label: "Every post looks like a different business", points: 0 },
    ],
  },
  {
    id: "content.4",
    pillar: "content",
    prompt: "Are you using each platform's native format (Reels, TikTok, LinkedIn articles) — not just recycling the same square post everywhere?",
    options: [
      { label: "Every platform gets content built for it specifically", points: 3 },
      { label: "I tailor the big stuff, but simpler posts go out cross-platform", points: 2 },
      { label: "Mostly the same asset, resized for each feed", points: 1 },
      { label: "Same image, same caption, every platform", points: 0 },
    ],
  },
  {
    id: "content.5",
    pillar: "content",
    prompt: "When you make one piece of content, do you squeeze multiple posts out of it?",
    options: [
      { label: "Yes — one idea becomes a video, carousel, quote card, caption", points: 3 },
      { label: "Sometimes — I'll cut a long video into a few clips", points: 2 },
      { label: "Rarely. I start from scratch every time.", points: 1 },
      { label: "I don't know what you mean by this.", points: 0 },
    ],
  },
  {
    id: "strategy.1",
    pillar: "strategy",
    prompt: "Do you have a written-down goal for your social media — something you could show a team member?",
    options: [
      { label: "Specific goal with a number (e.g. 30 qualified leads per quarter)", points: 3 },
      { label: "General direction (\u201cgrow awareness\u201d), but no numbers", points: 2 },
      { label: "I know what I want, but nothing's written", points: 1 },
      { label: "We post because we're supposed to. No goal.", points: 0 },
    ],
  },
  {
    id: "strategy.2",
    pillar: "strategy",
    prompt: "If someone asked you to describe your ideal customer, how specific could you get?",
    options: [
      { label: "Job title, pain point, and where they hang out online", points: 3 },
      { label: "Industry and rough demographics", points: 2 },
      { label: "A vague sense — mostly instinct", points: 1 },
      { label: "Anyone with money, honestly", points: 0 },
    ],
  },
  {
    id: "strategy.3",
    pillar: "strategy",
    prompt: "Do you have 3\u20135 themes or pillars that every post ties back to?",
    options: [
      { label: "Yes — every post belongs to one of my pillars", points: 3 },
      { label: "I have themes in my head, but I don't always follow them", points: 2 },
      { label: "I post about whatever feels relevant that week", points: 1 },
      { label: "No themes. Just whatever.", points: 0 },
    ],
  },
  {
    id: "strategy.4",
    pillar: "strategy",
    prompt: "Could you hand your login to someone else and trust they'd sound like you?",
    options: [
      { label: "Yes — I have a voice doc or clear examples to show them", points: 3 },
      { label: "Probably — I'd need to review the first few posts", points: 2 },
      { label: "No — my voice is in my head, not documented", points: 1 },
      { label: "No — and honestly my voice changes post to post", points: 0 },
    ],
  },
  {
    id: "strategy.5",
    pillar: "strategy",
    prompt: "When did you last study what 2\u20133 direct competitors are posting?",
    options: [
      { label: "Within the last month — I track them regularly", points: 3 },
      { label: "Within the last few months", points: 2 },
      { label: "Once, a long time ago", points: 1 },
      { label: "Never. I don't pay attention to competitors.", points: 0 },
    ],
  },
  {
    id: "engagement.1",
    pillar: "engagement",
    prompt: "When someone comments or DMs you, how quickly do you reply?",
    options: [
      { label: "Within hours, every time", points: 3 },
      { label: "Within a day or two, most times", points: 2 },
      { label: "Eventually. Or when I remember.", points: 1 },
      { label: "I rarely check. I don't really reply.", points: 0 },
    ],
  },
  {
    id: "engagement.2",
    pillar: "engagement",
    prompt: "Do you spend time commenting on other accounts' posts — prospects, peers, local businesses?",
    options: [
      { label: "Yes — a few minutes of intentional commenting every day", points: 3 },
      { label: "A few times a week", points: 2 },
      { label: "Every now and then", points: 1 },
      { label: "Never. I just post and leave.", points: 0 },
    ],
  },
  {
    id: "engagement.3",
    pillar: "engagement",
    prompt: "Do you have any ongoing relationship with your audience beyond likes — group chats, repeat commenters, a Discord, an email list you actually use?",
    options: [
      { label: "Yes — active community I show up in consistently", points: 3 },
      { label: "A small group of regulars I recognize and engage with", points: 2 },
      { label: "A few loyal commenters, but no system", points: 1 },
      { label: "No — it's a one-way broadcast", points: 0 },
    ],
  },
  {
    id: "engagement.4",
    pillar: "engagement",
    prompt: "Are customers or collaborators creating content about you — or are you partnering with other creators/businesses on content?",
    options: [
      { label: "Yes — tagged content and/or collabs happen regularly", points: 3 },
      { label: "Occasionally — a customer will tag me once in a while", points: 2 },
      { label: "Very rarely. I've asked, but nothing consistent.", points: 1 },
      { label: "No one has ever created content about my business", points: 0 },
    ],
  },
  {
    id: "engagement.5",
    pillar: "engagement",
    prompt: "When a new follower reaches out or a lead lands in your inbox from social, how long before you respond?",
    options: [
      { label: "Same day, always", points: 3 },
      { label: "Within 24\u201348 hours", points: 2 },
      { label: "Within the week, eventually", points: 1 },
      { label: "They usually follow up before I reply", points: 0 },
    ],
  },
  {
    id: "analytics.1",
    pillar: "analytics",
    prompt: "How often do you actually open your platform analytics?",
    options: [
      { label: "Weekly — it's a standing habit", points: 3 },
      { label: "Monthly", points: 2 },
      { label: "When I remember. A few times a year.", points: 1 },
      { label: "I don't look at analytics", points: 0 },
    ],
  },
  {
    id: "analytics.2",
    pillar: "analytics",
    prompt: "Off the top of your head — what's your best-performing post of the last 90 days, and why?",
    options: [
      { label: "I can tell you the post, the metric, and why I think it worked", points: 3 },
      { label: "I can tell you the post, but not really why", points: 2 },
      { label: "I have a vague sense but would have to check", points: 1 },
      { label: "No idea", points: 0 },
    ],
  },
  {
    id: "analytics.3",
    pillar: "analytics",
    prompt: "Are you tracking follower or audience growth against a target, or just watching the number?",
    options: [
      { label: "Yes — I track growth rate against a monthly target", points: 3 },
      { label: "I check the number regularly, but there's no target", points: 2 },
      { label: "I only notice when it's a big jump or drop", points: 1 },
      { label: "I don't track it at all", points: 0 },
    ],
  },
  {
    id: "analytics.4",
    pillar: "analytics",
    prompt: "When something underperforms, do you change the plan — or keep posting the same way?",
    options: [
      { label: "Yes — I adjust formats, hooks, and cadence based on what's working", points: 3 },
      { label: "Sometimes — I'll tweak, but not systematically", points: 2 },
      { label: "Rarely. I mostly keep doing what I've been doing.", points: 1 },
      { label: "I don't know what's working well enough to adjust", points: 0 },
    ],
  },
  {
    id: "analytics.5",
    pillar: "analytics",
    prompt: "Have you ever killed a content pillar or format because the data said it wasn't working?",
    options: [
      { label: "Yes — I've cut things that weren't performing and doubled down on winners", points: 3 },
      { label: "Once or twice, informally", points: 2 },
      { label: "No, but I've thought about it", points: 1 },
      { label: "I don't look at data at that level", points: 0 },
    ],
  },
];

export const QUESTIONS_BY_ID: Record<string, Question> = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, q])
);

export function questionsForPillar(pillarIndex: 0 | 1 | 2 | 3): Question[] {
  const pillars = ["content", "strategy", "engagement", "analytics"] as const;
  return QUESTIONS.filter((q) => q.pillar === pillars[pillarIndex]);
}
