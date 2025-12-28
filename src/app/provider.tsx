"use client";
import React, { createContext, useState } from "react";

export const LanguageContext = createContext({
  lang: "pl",
  setLang: (_: string) => {},
});

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState("pl");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
