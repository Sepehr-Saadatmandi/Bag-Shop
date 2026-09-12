import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AdminProvider } from "./context/AdminContext.tsx";
import { ContentProvider } from "./context/ContentContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdminProvider>
      <ContentProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ContentProvider>
    </AdminProvider>
  </React.StrictMode>
);
