import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutLayout from '../components/checkout/CheckoutLayout';
import OrderSummary from '../components/checkout/OrderSummary';
import { LAST_ORDER_KEY, ORDERS_KEY, formatAddress, formatPayment, readJson, writeJson } from '../utils/checkout';

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const order = readJson(LAST_ORDER_KEY, null);

  const placedOn = useMemo(() => {
    if (!order?.placedAt) return '';
    return new Date(order.placedAt).toLocaleDateString('en-IN');
  }, [order]);

  if (!order) {
    return (
      <CheckoutLayout>
        <section className="px-4 py-20 text-center font-['Montserrat',sans-serif]">
          <h1 className="text-2xl font-semibold uppercase">No order found</h1>
          <Link to="/bath" className="mt-4 inline-block underline">
            Continue shopping
          </Link>
        </section>
      </CheckoutLayout>
    );
  }

  function cancelOrder() {
    const orders = readJson(ORDERS_KEY, []).map((entry) =>
      entry.id === order.id ? { ...entry, status: 'cancelled', cancelledAt: new Date().toISOString() } : entry
    );
    writeJson(ORDERS_KEY, orders);
    writeJson(LAST_ORDER_KEY, { ...order, status: 'cancelled', cancelledAt: new Date().toISOString() });
    navigate(`/orders/${order.id}/cancelled`);
  }

  const draftLike = {
    paymentMethod: order.paymentMethod,
    paymentDetail: order.paymentDetail,
  };

  return (
    <CheckoutLayout>
      <section className="px-4 py-10 sm:px-6 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-0">
          <div className="font-['Montserrat',sans-serif] lg:pr-10">
            <h1 className="text-[28px] font-semibold uppercase leading-tight tracking-wide text-[#1a3636] sm:text-3xl">
              Thank you for ordering!
            </h1>
            <p className="mt-3 max-w-[36rem] text-sm leading-relaxed text-[#4a4a4a]">
              Your order has been placed. You will get the order confirmation through email and message.
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Name:</span> {order.customer.fullName}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {formatAddress(order.customer)}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {order.customer.mobile}
              </p>
              <p>
                <span className="font-semibold">Payment:</span> {formatPayment(draftLike)}
              </p>
            </div>
            <Link
              to={`/orders/${order.id}`}
              className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-[#1a3035] text-sm font-semibold uppercase tracking-[0.14em] text-white"
            >
              Track order
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={cancelOrder}
                className="h-11 rounded-full border border-[#1a1a1a] text-xs font-semibold uppercase tracking-wide"
              >
                Cancel order
              </button>
              <Link
                to="/contact-us"
                className="flex h-11 items-center justify-center rounded-full border border-[#1a1a1a] text-xs font-semibold uppercase tracking-wide"
              >
                Help
              </Link>
            </div>
          </div>
          <div className="lg:border-l lg:border-[#1a1a1a]/15 lg:pl-10">
            <OrderSummary
              items={order.items}
              itemCount={order.items.reduce((sum, item) => sum + item.qty, 0)}
              subtotal={order.subtotal}
              shipping={order.shipping}
              discount={order.discount}
              total={order.total}
              showPromo={false}
              orderMeta={{ placedOn, orderId: order.id }}
            />
          </div>
        </div>
      </section>
    </CheckoutLayout>
  );
}
