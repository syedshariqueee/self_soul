import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import OurHeritage from './pages/OurHeritage';
import Ingredients from './pages/Ingredients';
import ClinicallyTested from './pages/ClinicallyTested';
import OurStore from './pages/OurStore';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import Faqs from './pages/Faqs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ReturnsPolicy from './pages/ReturnsPolicy';
import DeliveryInformation from './pages/DeliveryInformation';
import Bath from './pages/Bath';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutReview from './pages/CheckoutReview';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFailed from './pages/CheckoutFailed';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import OrderMessage from './pages/OrderMessage';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

function App() {
  return (
    <CartProvider>
      <Router>
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/our-heritage" element={<OurHeritage />} />
          <Route path="/our-store" element={<OurStore />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/clinically-tested" element={<ClinicallyTested />} />
          <Route path="/bath" element={<Bath />} />
          <Route path="/bath/:slug" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/orders/:orderId/cancelled" element={<OrderMessage variant="cancel" />} />
          <Route path="/orders/:orderId/returned" element={<OrderMessage variant="return" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/review" element={<CheckoutReview />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/failed" element={<CheckoutFailed />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/returns-policy" element={<ReturnsPolicy />} />
          <Route path="/delivery-information" element={<DeliveryInformation />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
