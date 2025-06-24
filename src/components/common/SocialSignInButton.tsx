import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

interface SocialSignInButtonProps {
  text: string;
  onClick: () => void;
}

export const SocialSignInButton: React.FC<SocialSignInButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
    >
      <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2" />
      {text}
    </button>
  );
};
