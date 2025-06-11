export interface Quote {
  quote: string;
  author: string;
  likeCount: number;
}

export interface QuotesState {
  quotes: Quote[];
  currentQuoteIndex: number | null;
  showQuote: boolean;
}
