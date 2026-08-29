import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrderPageLayout from '../components/order/OrderPageLayout';
import { AUTH_EVENT, readAuthUser } from '../utils/auth';
import { displayStatus, formatPlacedDate, orderHeadline, ordersForUser } from '../utils/orders';

function statusLabel(status) {
  if (status === 'cancelled') return 'Cancelled';
  if (status === 'return_requested') return 'Return requested';
  if (status === 'delivered') return 'Delivered';
  if (status === 'shipped') return 'In transit';
  return 'Placed';
}

export default function Orders() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => readAuthUser());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    function sync() {
      const stored = readAuthUser();
      if (!stored) {
        navigate('/login?next=/orders');
        return;
      }
      setUser(stored);
      setTick((value) => value + 1);
    }
    sync();
    window.addEventListener(AUTH_EVENT, sync);
    return () => window.removeEventListener(AUTH_EVENT, sync);
  }, [navigate]);

  const orders = useMemo(() => ordersForUser(user?.email), [user, tick]);

  if (!user) return null;

  return (
    <OrderPageLayout>
      <section className="px-4 py-12 sm:px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[980px] font-['Montserrat',sans-serif]">
          <h1 className="text-[32px] font-medium uppercase tracking-[0.08em] text-[#1B3638] sm:text-[40px]">
            Orders
          </h1>

          {orders.length === 0 ? (
            <div className="mt-16 text-center text-sm text-[#6b756f]">
              <p>You have no orders yet.</p>
              <Link to="/bath" className="mt-4 inline-block text-[#1a3636] underline underline-offset-4">
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="mt-10 space-y-4">
              {orders.map((order) => {
                const status = displayStatus(order);
                return (
                  <Link
                    key={order.id}
                    to={`/orders/${order.id}`}
                    className="block border border-[#d8d0c6] bg-[#f7efe3] px-5 py-5 transition-colors hover:bg-[#f3eadc]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-[#1a1a1a]">
                          {orderHeadline(order)}
                        </p>
                        <p className="mt-1 text-xs text-[#6b756f]">Placed on {formatPlacedDate(order.placedAt)}</p>
                        <p className="mt-1 text-xs text-[#6b756f]">Order ID: {order.id}</p>
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1a3636]">
                        {statusLabel(status)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[#4a4a4a]">
                      {(order.items || []).map((item) => item.title).join(', ') || 'Items'}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </OrderPageLayout>
  );
}
