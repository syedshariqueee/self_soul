import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-[#fdf5f0] px-6 py-12 text-[#2a2f2c] sm:px-8 sm:py-14 md:px-10 lg:px-14 lg:py-16">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6 xl:gap-x-10">
          <div className="font-['Montserrat',sans-serif]">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a2f2c] sm:text-xs">
              The Self&apos;soul Store
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm font-normal">
              <li>
                <a href="#" className="hover:underline">
                  Our Heritage
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  What Makes Us Different
                </a>
              </li>
            </ul>
          </div>
          <div className="font-['Montserrat',sans-serif]">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a2f2c] sm:text-xs">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm font-normal">
              {["Bath", "Body", "Face", "Best Seller", "Value Sets", "Gift"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="font-['Montserrat',sans-serif]">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a2f2c] sm:text-xs">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm font-normal">
              <li>
                <Link to="/faqs" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="font-['Montserrat',sans-serif]">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a2f2c] sm:text-xs">
              Useful links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm font-normal">
              <li>
                <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:underline">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:underline">Returns & Refund policy</Link>
              </li>
              <li>
                <Link to="/delivery-information" className="hover:underline">Delivery Enquiries</Link>
              </li>
            </ul>
          </div>
          <div className="font-['Montserrat',sans-serif] sm:col-span-2 lg:col-span-1">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a2f2c] sm:text-xs">
              Customer care
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm font-normal">
              <li>Email: hello@self&apos;soul.com</li>
              <li>Mon-Fri 10AM to 6:00PM</li>
              <li>Call: +44(0) 7438890745</li>
            </ul>
            <div className="mt-5 flex items-center gap-3 text-[#2a2f2c]">
              <a href="#" className="hover:opacity-70" aria-label="Facebook">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2v-2.2c0-1.97 1.35-3.65 3.2-3.65h2v3h-2c-.55 0-1 .45-1 1v1.85h3.2l-.52 3H13v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="hover:opacity-70" aria-label="Instagram">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </a>
              <a href="#" className="hover:opacity-70" aria-label="LinkedIn">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4.1 0 4.8 2.7 4.8 6.2V24h-4v-8.4c0-2 0-4.6-2.8-4.6-2.8 0-3.2 2-3.2 4.1V24h-4V8z" />
                </svg>
              </a>
              <a href="#" className="hover:opacity-70" aria-label="Email">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M4 6h16v12H4z" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
