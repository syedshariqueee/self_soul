/**
 * Full-width brand strip banner.
 * Image includes brand text; used across pages via default props.
 */
export default function BrandStoryBanner({
  imageSrc = '/footer-banner/homebanner.png',
  alt = 'Self Soul brand',
  className = '',
}) {
  return (
    <section
      className={`w-full ${className}`}
      aria-label="Brand banner"
    >
      <div className="relative w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={alt}
          className="block h-auto w-full object-cover object-center"
        />
      </div>
    </section>
  );
}
