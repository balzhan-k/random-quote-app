import React from "react";
import { useAuth } from "../../AuthContextProvider";

import { AuthFormContainer } from "../../components/common/AuthFormContainer";
import { InputField } from "../../components/common/InputField";
import { SocialSignInButton } from "../../components/common/SocialSignInButton";
import { useAuthForm } from "../../hooks/useAuthForm";

interface SignUpPageProps {
  onLoginClick: () => void;
  onSignUpSuccess: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onLoginClick,
  onSignUpSuccess,
}) => {
  const {
    state,
    handleFieldChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    setFormError,
    validateField,
    validateForm,
  } = useAuthForm(true); 
  const {
    username,
    password,
    confirmPassword,
    formError,
    fieldErrors,
    showPassword,
    showConfirmPassword,
  } = state;

  const { signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      await signup(username, password);
      onSignUpSuccess();
    } catch (err: any) {
      setFormError(err.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <AuthFormContainer
      title="Sign up for an account"
      footerText="Already have an account? Log In"
      onFooterClick={onLoginClick}
    >
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <InputField
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Username"
          value={username}
          onChange={handleFieldChange("username")}
          onBlur={(e) => validateField("username", e.target.value)}
          label="Username"
          isFirstField
          error={fieldErrors.username}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={handleFieldChange("password")}
          onBlur={(e) => validateField("password", e.target.value)}
          label="Password"
          showToggle
          onToggleVisibility={togglePasswordVisibility}
          isPasswordVisible={showPassword}
          error={fieldErrors.password}
        />
        <InputField
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleFieldChange("confirmPassword")}
          onBlur={(e) => validateField("confirmPassword", e.target.value)}
          label="Confirm Password"
          showToggle
          onToggleVisibility={toggleConfirmPasswordVisibility}
          isPasswordVisible={showConfirmPassword}
          isLastField
          error={fieldErrors.confirmPassword}
        />

        {formError && (
          <p className="mt-2 text-center text-sm text-red-600">{formError}</p>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-4">
          <SocialSignInButton
            text="Sign Up with Google"
            onClick={async () => {
              await loginWithGoogle();
              onSignUpSuccess();
            }}
          />
        </div>
      </form>
    </AuthFormContainer>
  );
};
