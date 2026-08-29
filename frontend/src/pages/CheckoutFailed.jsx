import { Link, useNavigate } from 'react-router-dom';
import CheckoutLayout from '../components/checkout/CheckoutLayout';

export default function CheckoutFailed() {
  const navigate = useNavigate();

  return (
    <CheckoutLayout>
      <section className="px-4 py-16 sm:px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[720px] text-center font-['Montserrat',sans-serif] text-[#1a3636]">
          <h1 className="text-[26px] font-semibold uppercase leading-tight tracking-wide sm:text-3xl">
            Oops, your payment was not completed
          </h1>
          <p className="mx-auto mt-4 max-w-[34rem] text-sm leading-relaxed text-[#4a4a4a]">
            Your order has not been placed because your selected payment method didn&apos;t approve the payment. You can try again!
          </p>
          <button
            type="button"
            onClick={() => navigate('/checkout/review')}
            className="mx-auto mt-8 flex h-12 w-full max-w-[360px] items-center justify-center rounded-full bg-[#1a3035] text-sm font-semibold uppercase tracking-[0.14em] text-white"
          >
            Retry payment
          </button>
          <div className="mx-auto mt-3 flex w-full max-w-[360px] gap-3">
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="flex h-11 flex-1 items-center justify-center rounded-full border border-[#1a1a1a] text-[11px] font-semibold uppercase tracking-wide"
            >
              Change payment method
            </button>
            <Link
              to="/contact-us"
              className="flex h-11 flex-1 items-center justify-center rounded-full border border-[#1a1a1a] text-[11px] font-semibold uppercase tracking-wide"
            >
              Help
            </Link>
          </div>
        </div>
      </section>
    </CheckoutLayout>
  );
}
