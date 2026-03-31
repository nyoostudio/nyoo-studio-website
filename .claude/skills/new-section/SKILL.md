---
name: new-section
description: Scaffold a new page section component following Nyoo Studio's design patterns
---

Create a new section component at `components/sections/{ComponentName}.tsx`.

First, ask the user for:
- Component name (e.g. `TestimonialsSection`)
- Section label text (e.g. `"What clients say"`)
- Headline text
- Brief description of the content that goes inside

Use context7 to confirm any Next.js or React patterns if needed.

Then scaffold using these conventions exactly:
- Import `SectionLabel` from `@/components/ui/SectionLabel` and `GrainOverlay` from `@/components/ui/GrainOverlay`
- Outer `<section>` uses: `className="relative bg-soft-black text-white px-6 py-24 md:py-32"`
- `<GrainOverlay />` as first child of section
- Inner container: `<div className="relative mx-auto max-w-[1200px]">`
- `<SectionLabel>` before the headline
- Headline uses: `className="mt-4 font-title text-4xl md:text-6xl font-bold leading-tight"`
- Body text uses: `className="text-base leading-relaxed opacity-70"`
- Export as a named function: `export function {ComponentName}() { ... }`
- Use `{/* TODO: content */}` placeholder inside the container for the user to fill in

After creating the file, remind the user to import and add it to the relevant page in `app/`.
