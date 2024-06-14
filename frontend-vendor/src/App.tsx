import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManageOrdersPage from "./pages/ManageOrdersPage";
import UpdateMenuPage from "./pages/UpdateMenuPage";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useMemo } from "react";
import GlobalStateProvider from "./context/Store";

function App() {
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <GlobalStateProvider>
        <BrowserRouter>
          <div className="bg-tertiary px-2  min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/manageOrder/:orderId"
                element={<ManageOrdersPage />}
              />
              <Route path="/updateMenu/" element={<UpdateMenuPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </GlobalStateProvider>
    </TonConnectUIProvider>
  );
}

export default App;
