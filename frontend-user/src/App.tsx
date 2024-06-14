import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import ResturantMenuPage from "./pages/ResturantMenuPage";
import { FaCartArrowDown } from "react-icons/fa6";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useMemo } from "react";
import { Badge } from "@material-tailwind/react";
import { CartProvider, useCart } from "./hooks/useCart";
import RecentOrders from "./pages/RecentOrders";

const CartFloatingButton = () => {
  const { cart } = useCart();
  return (
    <>
      <div className="absolute bottom-2 right-2">
        <Badge
          overlap="circular"
          className="m-[1px]"
          color="orange"
          content={cart.items.length}
          invisible={cart.items.length === 0}
        >
          <Link
            className="w-16 aspect-square bg-primary rounded-full border-4 flex justify-center items-center"
            to="/cart"
          >
            <FaCartArrowDown color="white" size={20} />
          </Link>
        </Badge>
      </div>
      <Outlet />
    </>
  );
};

const App = () => {
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  console.log(manifestUrl);

  return (
    <div className="bg-tertiary px-2 font-Roboto">
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
        actionsConfiguration={{
          twaReturnUrl: "https://frontend-tele.netlify.app/",
        }}
      >
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CartFloatingButton />}>
                <Route index element={<HomePage />} />
                <Route path="/menu/:restId" element={<ResturantMenuPage />} />
              </Route>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/recent-orders">
                <Route index element={<RecentOrders />} />
                <Route
                  path="/recent-orders/:restaurantId"
                  element={<RecentOrders />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TonConnectUIProvider>
    </div>
  );
};

export default App;
