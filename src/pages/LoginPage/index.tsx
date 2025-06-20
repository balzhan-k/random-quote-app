import React from "react";
import { useAuth } from "../../AuthContextProvider";

import { AuthFormContainer } from "../../components/common/AuthFormContainer";
import { InputField } from "../../components/common/InputField";
import { SocialSignInButton } from "../../components/common/SocialSignInButton";
import { useAuthForm } from "../../hooks/useAuthForm";

interface LoginPageProps {
  onSignUpClick: () => void;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onSignUpClick,
  onLoginSuccess,
}) => {
  const {
    state,
    handleFieldChange,
    togglePasswordVisibility,
    setFormError,
    validateField,
    validateForm,
  } = useAuthForm();
  const { username, password, formError, fieldErrors, showPassword } = state;
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      await login(username, password);
      onLoginSuccess();
    } catch (err: any) {
      setFormError(
        err.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <AuthFormContainer
      title="Log in to your account"
      footerText="Don't have an account? Sign up"
      onFooterClick={onSignUpClick}
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
          onBlur={() => validateField("username", username)}
          label="Username"
          isFirstField
          error={fieldErrors.username}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={handleFieldChange("password")}
          onBlur={() => validateField("password", password)}
          label="Password"
          showToggle
          onToggleVisibility={togglePasswordVisibility}
          isPasswordVisible={showPassword}
          isLastField
          error={fieldErrors.password}
        />

        {formError && (
          <p className="mt-2 text-center text-sm text-red-600">{formError}</p>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log in
          </button>
        </div>
        <div className="mt-4">
          <SocialSignInButton
            text="Log in with Google"
            onClick={async () => {
              await loginWithGoogle();
              onLoginSuccess();
            }}
          />
        </div>
      </form>
    </AuthFormContainer>
  );
};
