import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import ContactsPage from "./pages/ContactsPage";

function App() {
  return (
    <NextUIProvider>
      <ContactsPage />
    </NextUIProvider>
  );
}

export default App;
