/** Same hero video placeholder used on Our Heritage, Ingredients, and similar pages. */
export default function HeritageVideoSection() {
  return (
    <section className="flex min-h-[320px] items-center justify-center bg-[#d8d5cf] md:min-h-[420px]">
      <div className="flex flex-col items-center gap-3 text-[#7a7572]">
        <svg
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
        </svg>
        <span className="font-['Montserrat',sans-serif] text-sm uppercase tracking-[0.3em] text-[#7a7572]">
          Video
        </span>
      </div>
    </section>
  );
}
