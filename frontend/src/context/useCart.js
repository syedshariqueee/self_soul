// Separated into its own file to satisfy Vite Fast Refresh requirements.
// Fast Refresh requires files to export ONLY components OR only non-components.
// CartContext.jsx exports CartProvider (component) + useCart (hook) — mixing
// them breaks HMR. Moving useCart here fixes the incompatibility.
export { useCart } from './CartContext';
