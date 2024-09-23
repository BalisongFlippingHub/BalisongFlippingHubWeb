import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CollectionContextProvider } from "./contexts/CollectionContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <CollectionContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </CollectionContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
