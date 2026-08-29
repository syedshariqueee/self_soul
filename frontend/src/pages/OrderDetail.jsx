import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OrderPageLayout from '../components/order/OrderPageLayout';
import { useCart } from '../context/CartContext';
import { AUTH_EVENT, readAuthUser } from '../utils/auth';
import {
  TRACKING_STEPS,
  displayStatus,
  getOrderById,
  orderAddress,
  orderHeadline,
  orderPaymentLabel,
  orderSubline,
  patchOrder,
  trackingIdFor,
  trackingIndex,
} from '../utils/orders';

const solidBtn =
  'flex h-11 w-full items-center justify-center rounded-full bg-[#1a3636] text-[11px] font-semibold uppercase tracking-[0.12em] text-white';
const outlineBtn =
  'flex h-11 w-full items-center justify-center rounded-full border border-[#1a1a1a] bg-transparent text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a]';

function TrackingBar({ activeIndex }) {
  const progress = (activeIndex / (TRACKING_STEPS.length - 1)) * 100;

  return (
    <div className="mt-8">
      <div className="relative h-1.5 w-full rounded-full bg-[#d8d0c6]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[#1a3636]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1">
        {TRACKING_STEPS.map((step, index) => (
          <p
            key={step}
            className={`text-[10px] leading-tight sm:text-[11px] ${
              index === 0
                ? 'text-left'
                : index === TRACKING_STEPS.length - 1
                  ? 'text-right'
                  : 'text-center'
            } ${index <= activeIndex ? 'font-medium text-[#1a1a1a]' : 'text-[#8a8a8a]'}`}
          >
            {step}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { restoreItems } = useCart();
  const [order, setOrder] = useState(() => getOrderById(orderId));

  useEffect(() => {
    function sync() {
      if (!readAuthUser()) {
        navigate(`/login?next=/orders/${orderId}`);
        return;
      }
      setOrder(getOrderById(orderId));
    }
    sync();
    window.addEventListener(AUTH_EVENT, sync);
    return () => window.removeEventListener(AUTH_EVENT, sync);
  }, [navigate, orderId]);

  const status = order ? displayStatus(order) : null;
  const address = useMemo(() => (order ? orderAddress(order) : null), [order]);
  const closed = status === 'cancelled' || status === 'return_requested';

  function buyAgain() {
    restoreItems(order.items);
    navigate('/checkout');
  }

  function cancelOrder() {
    patchOrder(order.id, { status: 'cancelled', cancelledAt: new Date().toISOString() });
    navigate(`/orders/${order.id}/cancelled`);
  }

  function returnOrder() {
    patchOrder(order.id, { status: 'return_requested', returnedAt: new Date().toISOString() });
    navigate(`/orders/${order.id}/returned`);
  }

  if (!order) {
    return (
      <OrderPageLayout>
        <section className="px-4 py-20 text-center font-['Montserrat',sans-serif]">
          <h1 className="text-2xl font-semibold uppercase">Order not found</h1>
          <Link to="/orders" className="mt-4 inline-block underline underline-offset-4">
            Back to Orders
          </Link>
        </section>
      </OrderPageLayout>
    );
  }

  return (
    <OrderPageLayout>
      <section className="px-4 py-10 sm:px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[980px] font-['Montserrat',sans-serif] text-[#1a1a1a]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[22px] font-bold uppercase leading-tight tracking-wide sm:text-[28px]">
                {orderHeadline(order)}
              </h1>
              <p className="mt-2 text-sm text-[#4a4a4a]">{orderSubline(order)}</p>
            </div>
            <div className="text-sm sm:text-right">
              <p>Order ID: {order.id}</p>
              <button
                type="button"
                onClick={() => window.print()}
                className="mt-1 underline underline-offset-4"
              >
                View Invoice
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
            <div className="space-y-6">
              {(order.items || []).map((item) => (
                <div key={`${item.id}-${item.slug}`} className="flex gap-4">
                  <div className="h-[72px] w-[72px] shrink-0 overflow-hidden bg-[#efe6da]">
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide">
                      {item.title}
                      {item.qty > 1 ? ` × ${item.qty}` : ''}
                    </p>
                    {item.slug ? (
                      <Link to={`/bath/${item.slug}`} className="mt-1 inline-block text-xs underline underline-offset-4">
                        View Item
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button type="button" onClick={buyAgain} className={solidBtn}>
                Buy Again
              </button>
              {status === 'placed' || status === 'shipped' ? (
                <button type="button" onClick={cancelOrder} className={outlineBtn}>
                  Cancel Order
                </button>
              ) : null}
              {status === 'delivered' ? (
                <button type="button" onClick={returnOrder} className={outlineBtn}>
                  Return Order
                </button>
              ) : null}
              <Link to="/contact-us" className={outlineBtn}>
                Get Support
              </Link>
              <Link to="/orders" className="pt-1 text-center text-sm underline underline-offset-4">
                Back to Orders
              </Link>
            </div>
          </div>

          {closed ? (
            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold">Payment Mode/Return Account</p>
                <p className="mt-1 text-sm text-[#4a4a4a]">{orderPaymentLabel(order)}</p>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-12 text-sm">Tracking ID: {trackingIdFor(order)}</p>
              <TrackingBar activeIndex={trackingIndex(status)} />
              {address ? (
                <div className="mt-10">
                  <p className="text-sm font-semibold">Delivery Address</p>
                  <p className="mt-2 max-w-[28rem] text-sm leading-relaxed text-[#4a4a4a]">
                    {[address.name, address.lines].filter(Boolean).join(', ')}
                    {address.phone ? (
                      <>
                        <br />
                        {address.phone}
                      </>
                    ) : null}
                  </p>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </OrderPageLayout>
  );
}
