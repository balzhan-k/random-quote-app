import {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
} from "react";
import { quotes as initialQuotes } from "./quotes";
import { ReactNode } from "react";
import { Quote } from "./types";

export const QuotesContext = createContext<Quote[] | undefined>(undefined);
export const QuotesDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<Quote[]>> | undefined
>(undefined);

export const QuotesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem("quotes");
    return saved ? JSON.parse(saved) : initialQuotes;
  });

  // Save to localStorage whenever quotes change
  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={setQuotes}>
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);
