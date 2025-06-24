import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; 

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label: string;
  error?: string; 
  showToggle?: boolean;
  onToggleVisibility?: () => void;
  isPasswordVisible?: boolean;
  isFirstField?: boolean;
  isLastField?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
  onBlur,
  label,
  error,
  showToggle,
  onToggleVisibility,
  isPasswordVisible,
  isFirstField,
  isLastField,
}) => {
  const inputType = showToggle && isPasswordVisible ? "text" : type;
  const roundedClass = isFirstField
    ? "rounded-t-md"
    : isLastField
    ? "rounded-b-md"
    : "";

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          autoComplete={autoComplete}
          required
          className={`appearance-none rounded-none block w-full px-3 py-2 ${
            showToggle ? "pr-12" : ""
          } border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${roundedClass}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer z-20"
          >
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              className="h-5 w-5 text-gray-500"
            />
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
