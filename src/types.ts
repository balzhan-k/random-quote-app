export interface Quote {
  quote: string;
  author: string;
  likeCount: number;
  createdBy?: string;
  likedBy?: string[];
}

export interface QuotesState {
  quotes: Quote[];
  currentQuoteIndex: number | null;
  showQuote: boolean;
}
