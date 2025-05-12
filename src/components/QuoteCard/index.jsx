import "./styles.css";

export const QuoteCard = ({ quote, author, likeCount }) => {
  return (
    <section className="QuoteCard">
      <p className="quote-text">{quote}</p>
      <p className="author-text">{author}</p>
      <p className="like-count">Likes: {likeCount}</p>
    </section>
  );
};
