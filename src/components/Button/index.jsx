import './styles.css';

export const Button = ( {label, handleOnClick}) => {
  return (
  <button
    className="btn"
    onClick={handleOnClick}>
    {label}
  </button>
  );
}





