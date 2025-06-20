export interface Quote {
  id?: string;
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
