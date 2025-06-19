import React from "react";

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
  footerText: string;
  onFooterClick: () => void;
}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  children,
  footerText,
  onFooterClick,
}) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>
        {children}
        <div className="text-sm text-center">
          <p
            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            onClick={onFooterClick}
          >
            {footerText}
          </p>
        </div>
      </div>
    </div>
  );
};
