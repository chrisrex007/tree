import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage.tsx";
import { AuthProvider } from "./AuthContext.tsx";
import Root from "./Components/Root.tsx";
import PrivateRoute from "./Components/PrivateRoute.tsx";
import PageNotFound from "./Components/PageNotFound.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/app" element={<App />} />
          </Route>
          <Route path="/" element={<Root />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>
);
