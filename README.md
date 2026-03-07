# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Restaurant Detail Page (New Feature)

The application now includes a fully working **Restaurant Detail** view built with React and Tailwind CSS. Features:

1. Dynamic route: `/restaurant/:id` opens when a restaurant card is clicked in the **Restaurants** list.
2. Mock data is stored in `src/Data/menuData.js` with additional restaurant fields (banner, delivery time, cost for two, address, open/closed status, free delivery, menu items).
3. Top header shows restaurant information with a banner image and badges.
4. Search bar and category filter allow users to drill into menu items.
5. Menu items are displayed with veg/non‑veg dots, price, description, and add‑to‑cart controls.
6. Cart managed via a React Context (`src/context/CartContext.jsx`) with persistence in localStorage.
7. Floating "View Cart" button shows totals and navigates to the **checkout** page.
8. Loading spinner, error handling, and responsive design included.

---

## Checkout Flow

- Route: `/checkout` when user clicks the floating cart button.
- Address section with validation and ability to save (prefills from logged-in user if available).
- Order summary shows item list with quantity controls and removal, plus subtotal, delivery fee, platform fee, discount, and grand total.
- Coupon application supports `SAVE10` for 10% off.
- Payment methods: COD, UPI, Card (card fields shown when selected).
- Place Order button simulates processing, disables when cart or address missing.
- After placing order navigates to `/order-success` with order ID and estimated delivery.

### Order Success

- Displays order ID, thank you message and estimated delivery.
- "Track Order" button routes to /order (placeholder).

To try it out, start the dev server (`npm run dev`) and navigate to **Restaurants**; click any card to view its menu.  
You can add items to the cart and then click the floating button to go to the new **Checkout** page.

