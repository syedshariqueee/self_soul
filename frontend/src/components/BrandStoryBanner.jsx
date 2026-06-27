/**
 * Full-width brand strip: photo + “SELF SOUL” + tagline.
 * Figma: ~338px height, black / 25% overlay, cream rails; logo drop shadow 0 4px 12.8px @ 25%.
 */
export default function BrandStoryBanner({
  imageSrc = '/heritage/inallpage.jpg',
  title = 'SELF SOUL',
  tagline = 'Heal with Nature',
  alt = 'Self Soul brand',
  /** Cream strips above/below the photo */
  railColorClass = 'bg-[#fdf5f0]',
  className = '',
}) {
  return (
    <section
      className={`w-full ${className}`}
      aria-label="Brand banner"
    >
      <div className={`h-2 w-full md:h-3 ${railColorClass}`} aria-hidden />
      <div className="relative flex min-h-[260px] w-full items-center justify-center overflow-hidden md:h-[338px] md:min-h-0">
        <img
          src={imageSrc}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="relative z-10 mx-auto flex flex-col items-center px-6 text-center drop-shadow-[0_4px_12.8px_rgba(0,0,0,0.25)]">
          <img src="/bannerlogo.png" alt="Self Soul Logo" className="h-16 md:h-24 w-auto object-contain" />
        </div>
      </div>
      {/* No bottom rail — newsletter section sits flush below */}
    </section>
  );
}
