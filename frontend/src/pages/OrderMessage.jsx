import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OrderPageLayout from '../components/order/OrderPageLayout';
import { readAuthUser } from '../utils/auth';

export default function OrderMessage({ variant }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const isReturn = variant === 'return';

  useEffect(() => {
    if (!readAuthUser()) {
      navigate(`/login?next=/orders/${orderId}/${isReturn ? 'returned' : 'cancelled'}`);
    }
  }, [isReturn, navigate, orderId]);

  return (
    <OrderPageLayout>
      <section className="px-4 py-16 sm:px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[720px] text-center font-['Montserrat',sans-serif] text-[#1a3636]">
          <h1 className="text-[26px] font-semibold uppercase leading-tight tracking-wide sm:text-[32px]">
            {isReturn
              ? 'Return request has been received successfully'
              : 'Your order has been canceled successfully'}
          </h1>
          <p className="mx-auto mt-4 max-w-[34rem] text-sm leading-relaxed text-[#4a4a4a]">
            {isReturn
              ? 'Your return request has been received successfully, you can track return status by clicking the button below.'
              : 'Your order been cancelled successfully, you can track cancellation/refund status by clicking the button below'}
          </p>
          <Link
            to={`/orders/${orderId}`}
            className="mx-auto mt-10 flex h-12 w-full max-w-[420px] items-center justify-center rounded-full bg-[#1a3636] text-sm font-semibold uppercase tracking-[0.12em] text-white"
          >
            {isReturn ? 'View Return Status' : 'View Cancellation Status'}
          </Link>
        </div>
      </section>
    </OrderPageLayout>
  );
}
