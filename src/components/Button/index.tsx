interface ButtonProps {
  label: string;
  handleClick: () => void;
}

export const Button = ({ label, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition-colors"
    >
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-93.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32Z" />
      </svg>
    </button>
  );
};
