import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManageOrdersPage from "./pages/ManageOrdersPage";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useMemo } from "react";
import GlobalStateProvider from "./context/Store";

function App() {
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);
  return (
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl:
          "https://d0ae-2401-4900-1cd6-75f3-18b9-658d-ffb3-f706.ngrok-free.app",
      }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "telegram-wallet",
            name: "Wallet",
            imageUrl: "https://wallet.tg/images/logo-288.png",
            aboutUrl: "https://wallet.tg/",
            universalLink: "https://t.me/wallet/start",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["ios", "android", "macos", "windows", "linux"],
          },
        ],
      }}
    >
      <BrowserRouter>
        <GlobalStateProvider>
          <div className="bg-tertiary px-2 font-Roboto min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/manageOrder/:orderId"
                element={<ManageOrdersPage />}
              />
            </Routes>
          </div>
        </GlobalStateProvider>
      </BrowserRouter>
    </TonConnectUIProvider>
  );
}

export default App;
