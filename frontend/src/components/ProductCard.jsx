function StarRating({ rating = 5 }) {
  return (
    <div className="mt-2 flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${i < Math.round(rating) ? 'text-[#1a3636]' : 'text-[#1a3636]/25'}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 13.77l-4.7 2.47.9-5.24-3.8-3.7 5.25-.76L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({
  badge,
  image,
  title,
  rating = 5,
  price,
  href = '#',
}) {
  return (
    <a href={href} className="group flex w-full max-w-[303px] flex-col text-left">
      <div className="relative aspect-[303/364] w-full overflow-hidden bg-[#e8e4df]">
        {badge ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#f7efe3] px-2.5 py-1 font-['Montserrat',sans-serif] text-[10px] font-medium tracking-wide text-[#1a3636] sm:text-[11px]">
            {badge}
          </span>
        ) : null}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 font-['Montserrat',sans-serif] text-sm font-semibold leading-snug text-[#1a3636] sm:text-[15px]">
        {title}
      </h3>
      <StarRating rating={rating} />
      <div className="mt-2 font-['Montserrat',sans-serif] text-sm">
        <span className="font-medium text-[#1a3636]">₹ {price}</span>
      </div>
    </a>
  );
}
