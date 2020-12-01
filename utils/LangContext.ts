import React, { useContext } from "react";

export type AppContext = {
    casestudies: Array<object>;
    contact_footer: {
      title: string;
      p: string;
      button_text: string;
      lang: string;
    };
    cookie_message: object;
    products_section: { intro: { title: string; p: string }; products: [] };
    lang: string;
    legal_nav: object;
    nav: Array<object>;
    next_study: { p: string };
};

const LangContext = React.createContext<AppContext | null>(null);

export function useLocaleContext() {
  const context = useContext(LangContext);
  return context;
}

export const LangProvider = LangContext.Provider;
export const LangConsumer = LangContext.Consumer;
export default LangContext;
