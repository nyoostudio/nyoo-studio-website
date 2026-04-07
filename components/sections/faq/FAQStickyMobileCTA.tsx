import Link from "next/link";

export function FAQStickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-white/10 bg-soft-black/80 backdrop-blur-xl p-4">
      <Link
        href="/book"
        className="flex items-center justify-center w-full bg-red text-white font-bold py-3 px-6 text-sm tracking-wide hover:bg-red/90 transition-all duration-300 hover:shadow-lg hover:shadow-red/20"
      >
        Book a Free Strategy Call
      </Link>
    </div>
  );
}
