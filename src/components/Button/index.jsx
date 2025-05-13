export const Button = ({ label, handleOnClick }) => {
  return (
    <button className="nextBtn" onClick={handleOnClick}>
      {label}
    </button>
  );
};
