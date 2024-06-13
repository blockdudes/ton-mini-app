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

const CartFloatingButton = () => {
  const { cart } = useCart();
  return (
    <>
      <div className="fixed bottom-2 right-2">
        <Badge
          overlap="circular"
          className="m-[1px]"
          color="orange"
          content={cart.items.length}
          invisible={cart.items.length === 0}
        >
          <Link
            className="w-12 h-12 bg-primary rounded-full border-4 flex justify-center items-center"
            to="/cart"
          >
            <FaCartArrowDown color="white" />
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
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl:
          "https://402f-2401-4900-1cd6-75f3-fcb5-6d22-6154-84cc.ngrok-free.app",
      }}
    >
      <CartProvider>
        <BrowserRouter>
          <div className="bg-tertiary px-2 min-h-screen">
            <Routes>
              <Route path="/" element={<CartFloatingButton />}>
                <Route index element={<HomePage />} />
                <Route path="/menu/:restId" element={<ResturantMenuPage />} />
              </Route>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </TonConnectUIProvider>
  );
};

export default App;
