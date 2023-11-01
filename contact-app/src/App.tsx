import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import ContactsPage from "./pages/ContactsPage";
import Title from "./components/Title";

function App() {
  return (
    <NextUIProvider>
      <div className="h-[100vh] bg-gradient-to-r">
        <div className="flex justify-center items-center">
          <Title />
        </div>
        <div className="flex justify-center items-center">
          <ContactsPage />
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
