import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CollectionContextProvider } from "./contexts/CollectionContext.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // // <React.StrictMode>
  // <BrowserRouter>
  //   <AuthContextProvider>
  //     <CollectionContextProvider>
  //       <Routes>
  //         <Route path="/*" element={<App />} />
  //       </Routes>
  //     </CollectionContextProvider>
  //   </AuthContextProvider>
  // </BrowserRouter>
  // // </React.StrictMode>,

  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
);
