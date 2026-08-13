import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import { DatabaseContextProvider } from "./providers/database-context-provider";
import { AppRoutes } from "./routes/routes";
import "./styles/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DatabaseContextProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </DatabaseContextProvider>
  </StrictMode>,
);
