import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <AuthContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthContextProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
);
