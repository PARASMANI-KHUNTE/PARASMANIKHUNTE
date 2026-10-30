import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AppRoutes } from "./App";

export function render(url) {
  return renderToString(
    <ThemeProvider>
      <ToastProvider>
        <MemoryRouter initialEntries={[url]}>
          <AppRoutes />
        </MemoryRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
