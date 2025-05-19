import { QuoteCard } from "../../components/QuoteCard";

import { useQuotesContext } from "../../QuotesContextProvider";
import { useQuoteIndexContext } from "../../QuoteIndexContextProvider";

export const MainPage = () => {
  const quotes = useQuotesContext() ?? [];
  const currentIndex = useQuoteIndexContext() ?? 0;

  return (
    <main className="">
      <QuoteCard
        quote={quotes[currentIndex]?.quote}
        author={quotes[currentIndex]?.author}
        likeCount={quotes[currentIndex]?.likeCount}
      />
    </main>
  );
};
