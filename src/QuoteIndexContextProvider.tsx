import { createContext, useState, useContext } from "react";

export const QuoteIndexContext = createContext<number | null>(null);
export const QuoteIndexDispatchContext = createContext<React.Dispatch<React.SetStateAction<number>> | null>(null);

export const QuoteIndexContextProvider = ({children}: {children: React.ReactNode}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  return (
  <QuoteIndexContext.Provider value={quoteIndex}>
    <QuoteIndexDispatchContext.Provider value={setQuoteIndex}>
      {children}
    </QuoteIndexDispatchContext.Provider>
  </QuoteIndexContext.Provider>
  )
};


export const useQuoteIndexContext = () => useContext(QuoteIndexContext as React.Context<number>);
export const useQuoteIndexDispatchContext = () => useContext(QuoteIndexDispatchContext as React.Context<React.Dispatch<React.SetStateAction<number>>>);