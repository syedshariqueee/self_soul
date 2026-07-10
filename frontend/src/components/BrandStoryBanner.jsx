/**
 * Full-width brand strip banner.
 * Image includes brand text; used across pages via default props.
 */
export default function BrandStoryBanner({
  imageSrc = '/footer-banner/banner.png',
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
      <div className="relative w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={alt}
          className="block h-auto w-full object-cover object-center"
        />
      </div>
      {/* No bottom rail — newsletter section sits flush below */}
    </section>
  );
}
