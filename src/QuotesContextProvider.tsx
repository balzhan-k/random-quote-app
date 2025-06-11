import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { QuotesState } from "./types";
import {
  quotesReducer,
  QuotesAction,
  QuotesActionType,
  initialState,
} from "./quotesReducer";

export const QuotesContext = createContext<QuotesState | undefined>(undefined);
export const QuotesDispatchContext = createContext<
  React.Dispatch<QuotesAction> | undefined
>(undefined);

export const QuotesContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quotesReducer, initialState, () => {
    const saved = localStorage.getItem("appState");
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    if (state.quotes.length === 0) {
      const fetchInitialQuotes = async () => {
        try {
          const response = await fetch("/api/quotes");
          const data = await response.json();
          const formatted = data.map((q: any) => ({
            quote: q.q,
            author: q.a || "Unknown",
            likeCount: 0,
          }));
          dispatch({ type: QuotesActionType.SET_QUOTES, payload: formatted });
        } catch (error) {
          console.error("Failed to fetch initial quotes:", error);
        }
      };
      fetchInitialQuotes();
    }
  }, [state.quotes.length]);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return (
    <QuotesContext.Provider value={state}>
      <QuotesDispatchContext.Provider value={dispatch}>
        {children}
      </QuotesDispatchContext.Provider>
    </QuotesContext.Provider>
  );
};

export const useQuotesContext = () => {
  const context = useContext(QuotesContext);
  if (context === undefined) {
    throw new Error("useQuotesContext must be used within an QuotesContextProvider");
  }
  return context;
};

    export const useQuotesDispatch = () => {
  const context = useContext(QuotesDispatchContext);
  if (context === undefined) {
    throw new Error("useQuotesDispatch must be used within an QuotesContextProvider");
  }
  return context;
};
