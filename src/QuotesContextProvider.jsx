import { createContext, useState, useContext, useEffect } from "react";
import { quotes as initialQuotes} from "./quotes.js";

export const QuotesContext = createContext(undefined);
export const QuotesDispatchContext = createContext(undefined);

export const QuotesContextProvider = ({children}) => {
  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem("quotes");
    return saved ? JSON.parse(saved) : initialQuotes;
  });

  // Save to localStorage whenever quotes change
  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  return (
  <QuotesContext value={quotes}>
    <QuotesDispatchContext value={setQuotes}>
      {children}
    </QuotesDispatchContext>
  </QuotesContext>
  )
};


export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);