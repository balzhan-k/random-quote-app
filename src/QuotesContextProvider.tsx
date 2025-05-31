import {
  createContext,
  useReducer,
  useContext,
  useEffect,
 ReactNode
} from "react";
import { quotes as initialQuotes } from "./quotes";
import { Quote } from "./types";
import { quotesReducer, QuotesAction, QuotesActionType } from "./quotesReducer";

export const QuotesContext = createContext<Quote[] | undefined>(undefined);
export const QuotesDispatchContext = createContext<React.Dispatch<QuotesAction> | undefined>(undefined);

export const QuotesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [quotes, dispatch] = useReducer(
    quotesReducer,
    initialQuotes,
    () => {
    const saved = localStorage.getItem("quotes");
    return saved ? JSON.parse(saved) : initialQuotes;
    }
  );

  // Save to localStorage whenever quotes change
  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  return (
    <QuotesContext.Provider value={quotes}>
      <QuotesDispatchContext.Provider value={dispatch}>
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => useContext(QuotesContext);
export const useQuotesDispatchContext = () => useContext(QuotesDispatchContext);
