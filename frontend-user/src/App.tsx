import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import ResturantMenuPage from "./pages/ResturantMenuPage";
import { FaCartArrowDown } from "react-icons/fa6";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useMemo } from "react";

function App() {
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  console.log(manifestUrl);

  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl:
          "https://216a-2401-4900-1cd6-75f3-6c18-44e9-2b2b-f73c.ngrok-free.app",
      }}
    >
      <BrowserRouter>
        <div className="bg-tertiary px-2  min-h-screen">
          <Link to="/cart">
            <div className="w-12 bg-primary h-12 rounded-full fixed bottom-2 right-2 border-4 flex justify-center items-center">
              <FaCartArrowDown color="white" />
            </div>
          </Link>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu/:restId" element={<ResturantMenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TonConnectUIProvider>
  );
}

export default App;
