import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { DatabaseContextProvider } from "./providers/database-context-provider";
import { AppRoutes } from "./routes/routes";
import "./styles/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DatabaseContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DatabaseContextProvider>
  </StrictMode>,
);
