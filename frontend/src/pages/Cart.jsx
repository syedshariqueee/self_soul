import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { openCart } = useCart();

  useEffect(() => {
    openCart();
    navigate('/', { replace: true });
  }, [navigate, openCart]);

  return (
    <main className="min-h-screen bg-[#fdf6f0]">
      <Header />
      <Footer />
    </main>
  );
}
