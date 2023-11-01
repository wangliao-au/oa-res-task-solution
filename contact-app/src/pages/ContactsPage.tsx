import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Title from "../components/Title";
import Contacts from "../components/Contacts";

function ContactsPage() {
  return (
    <NextUIProvider>
      <div className="h-[100vh] bg-gradient-to-r">
        <div className="flex justify-center items-center">
          <Title />
        </div>
        <div className="flex justify-center items-center">
          <Contacts />
        </div>
      </div>
    </NextUIProvider>
  );
}

export default ContactsPage;
