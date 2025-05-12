import { createContext, useState, useContext } from "react";

export const QuoteIndexContext = createContext(undefined);
export const QuoteIndexDispatchContext = createContext(undefined);

export const QuoteIndexContextProvider = ({children}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  return (
  <QuoteIndexContext value={quoteIndex}>
    <QuoteIndexDispatchContext value={setQuoteIndex}>
      {children}
    </QuoteIndexDispatchContext>
  </QuoteIndexContext>
  )
};


export const useQuoteIndexContext = () => useContext(QuoteIndexContext);
export const useQuoteIndexDispatchContext = () => useContext(QuoteIndexDispatchContext);