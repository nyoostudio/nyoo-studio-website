import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FAQContent } from "@/components/sections/faq/FAQContent";
import { FAQStickyMobileCTA } from "@/components/sections/faq/FAQStickyMobileCTA";

export const metadata: Metadata = {
  title: "FAQs | Nyoo Studio | Small Business Marketing Agency DC Metro",
  description:
    "Answers to the most common questions about working with Nyoo Studio — services, pricing, process, and what to expect.",
  alternates: {
    canonical: "https://nyoostudio.com/faq",
  },
  openGraph: {
    title: "FAQs | Nyoo Studio",
    description:
      "Answers to the most common questions about working with Nyoo Studio — services, pricing, process, and what to expect.",
    url: "https://nyoostudio.com/faq",
  },
};

const faqCategories = [
  {
    category: "About Nyoo Studio",
    items: [
      {
        question: "What kind of businesses do you work with?",
        answer:
          "Established small businesses in the DC Metro area — typically $500K–$5M in annual revenue — that have a proven model and are ready to grow. We're not a fit for businesses still figuring out their product or service. We work best with owners who know what they do and just need the marketing to match it.",
      },
      {
        question: "Are you a full-service marketing agency?",
        answer:
          "No. We do two things: social media management and content strategy for lead generation. We do them at a high level. We're not the right fit if you need website development, SEO audits, or paid search campaigns — those require a different kind of agency.",
      },
      {
        question: "Why DC Metro? Do you work with businesses outside the area?",
        answer:
          "We're DC-based and built for DC Metro businesses because we understand the market — the culture, the competition, the audience. That said, we do take a small number of out-of-market clients if the fit is right. Book a call and we'll tell you honestly.",
      },
      {
        question: "How selective are you?",
        answer:
          "Very. We take on a limited number of clients at a time so we can do the work properly. When we say we're all in on your business, we mean it — but that only works if we're not spread across 40 accounts.",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        question: "What's included in social media management?",
        answer:
          "Content creation, caption writing, scheduling, community management (responding to comments and DMs), and monthly performance reporting. The exact volume of posts and platforms depends on your package. We handle the full production cycle — you review and approve before anything goes live.",
      },
      {
        question: "What does 'content strategy for lead generation' mean?",
        answer:
          "It means your content is built to attract the right people and move them toward working with you — not just to get likes. That includes email newsletters, short-form video scripts, and long-form content (depending on tier), all mapped to your sales cycle. Vanity metrics don't pay the bills.",
      },
      {
        question: "Do I have to approve everything before it's published?",
        answer:
          "Yes. You'll have a review window for all content before it goes out. We don't publish anything without your sign-off. The review process is quick by design — we write tight briefs, so there's rarely a lot to revise.",
      },
      {
        question: "Do you do photography or video production?",
        answer:
          "We write video scripts and provide detailed direction briefs for photography. We don't operate a production crew. If you need a photographer or videographer, we can recommend trusted partners in the DC area.",
      },
    ],
  },
  {
    category: "Pricing & Contracts",
    items: [
      {
        question: "Are your retainers month-to-month?",
        answer:
          "Yes. All packages are month-to-month by default — no lock-in. If you want to commit to a 3- or 6-month term upfront, you get a discount (10% and 15% respectively). Either way, you're never stuck in a contract you didn't choose.",
      },
      {
        question: "What if you miss a deliverable?",
        answer:
          "Any missed pieces carry to the next sprint at no extra cost. That's our performance guarantee. We put it in the agreement — if we say 16 posts, we mean 16 posts.",
      },
      {
        question: "Can I upgrade or change my package?",
        answer:
          "Yes. You can upgrade at any time. Downgrades take effect at the start of the next billing cycle. We make it easy to adjust as your business changes.",
      },
      {
        question: "Do you offer custom pricing?",
        answer:
          "For multi-location businesses or multi-entity engagements, yes. Book a call and we'll put together a proposal that makes sense for your situation.",
      },
    ],
  },
  {
    category: "Working Together",
    items: [
      {
        question: "What does the onboarding process look like?",
        answer:
          "No 12-week discovery phases. We do a focused strategy call, review your existing content and competitors, put together a content plan, and start producing in the first week. You'll usually see the first batch of content within 5–7 business days of signing.",
      },
      {
        question: "How much of my time will this take?",
        answer:
          "Realistically, 1–2 hours a month for strategy sessions, plus time to review content batches. We're built to run independently — you're not supposed to be managing us.",
      },
      {
        question: "Who will I actually be working with?",
        answer:
          "Jo runs every client relationship. You'll hear from her directly — not an account coordinator or junior rep. Jin handles the systems and strategy infrastructure behind the scenes.",
      },
      {
        question: "What if it's not working?",
        answer:
          "We'll tell you before you ask. We track performance monthly and flag it when something isn't moving the way it should. If it's not the right fit, we'd rather end cleanly than keep billing you for results that aren't there.",
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero
        headline="Questions we actually get asked."
        subhead="If you have one we didn't cover, the contact page is right there."
      />
      <FAQContent categories={faqCategories} />
      <FAQStickyMobileCTA />
    </>
  );
}
