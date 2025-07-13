import { useReducer, useCallback } from "react";

type AuthInputFieldName = "username" | "password" | "confirmPassword";

enum AuthFormActionType {
  UPDATE_FIELD = "UPDATE_FIELD",
  TOGGLE_PASSWORD_VISIBILITY = "TOGGLE_PASSWORD_VISIBILITY",
  TOGGLE_CONFIRM_PASSWORD_VISIBILITY = "TOGGLE_CONFIRM_PASSWORD_VISIBILITY",
  SET_FORM_ERROR = "SET_FORM_ERROR",
  SET_FIELD_ERROR = "SET_FIELD_ERROR",
  RESET_FORM = "RESET_FORM",
}

export interface AuthFormState {
  username: string;
  password: string;
  confirmPassword: string;
  formError: string;
  fieldErrors: {
    [key in AuthInputFieldName]?: string; 
  };
  showPassword: boolean;
  showConfirmPassword: boolean;
}

type AuthFormAction =
  | {
      type: AuthFormActionType.UPDATE_FIELD;
      field: AuthInputFieldName;
      value: string;
    } 
  | { type: AuthFormActionType.TOGGLE_PASSWORD_VISIBILITY }
  | { type: AuthFormActionType.TOGGLE_CONFIRM_PASSWORD_VISIBILITY }
  | { type: AuthFormActionType.SET_FORM_ERROR; payload: string }
  | {
      type: AuthFormActionType.SET_FIELD_ERROR;
      field: AuthInputFieldName;
      payload?: string;
    } 
  | { type: AuthFormActionType.RESET_FORM };

const initialAuthFormState: AuthFormState = {
  username: "",
  password: "",
  confirmPassword: "",
  formError: "",
  fieldErrors: {},
  showPassword: false,
  showConfirmPassword: false,
};

function authFormReducer(
  state: AuthFormState,
  action: AuthFormAction
): AuthFormState {
  switch (action.type) {
    case AuthFormActionType.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
        fieldErrors: { ...state.fieldErrors, [action.field]: undefined },
      };
    case AuthFormActionType.TOGGLE_PASSWORD_VISIBILITY:
      return { ...state, showPassword: !state.showPassword };
    case AuthFormActionType.TOGGLE_CONFIRM_PASSWORD_VISIBILITY:
      return { ...state, showConfirmPassword: !state.showConfirmPassword };
    case AuthFormActionType.SET_FORM_ERROR:
      return { ...state, formError: action.payload };
    case AuthFormActionType.SET_FIELD_ERROR:
      return {
        ...state,
        fieldErrors: { ...state.fieldErrors, [action.field]: action.payload },
      };
    case AuthFormActionType.RESET_FORM:
      return initialAuthFormState;
    default:
      return state;
  }
}

export const useAuthForm = (isSignUpForm: boolean = false) => {
  const [state, dispatch] = useReducer(authFormReducer, initialAuthFormState);

  const handleFieldChange = useCallback(
    (field: AuthInputFieldName) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: AuthFormActionType.UPDATE_FIELD,
        field,
        value: e.target.value,
      });
    },
    []
  );

  const togglePasswordVisibility = useCallback(() => {
    dispatch({ type: AuthFormActionType.TOGGLE_PASSWORD_VISIBILITY });
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    dispatch({ type: AuthFormActionType.TOGGLE_CONFIRM_PASSWORD_VISIBILITY });
  }, []);

  const setFormError = useCallback((message: string) => {
    dispatch({ type: AuthFormActionType.SET_FORM_ERROR, payload: message });
  }, []);

  const setFieldError = useCallback(
    (field: AuthInputFieldName, message?: string) => {
      dispatch({
        type: AuthFormActionType.SET_FIELD_ERROR,
        field,
        payload: message,
      });
    },
    []
  );

  const validateField = useCallback(
    (field: AuthInputFieldName, value: string) => {
      let errorMessage: string | undefined;
      switch (field) {
        case "username":
          if (!value) {
            errorMessage = "Username is required.";
          } else if (value.length < 3 || value.length > 20) {
            errorMessage = "Username must be between 3 and 20 characters.";
          } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            errorMessage =
              "Username can only contain letters, numbers, and underscores.";
          }
          break;
        case "password":
          if (!value) {
            errorMessage = "Password is required.";
          } else if (value.length < 6) {
            errorMessage = "Password must be at least 6 characters.";
          }
          break;
        case "confirmPassword":
          if (isSignUpForm && state.password !== value) {
            errorMessage = "Passwords do not match.";
          }
          break;
      }
      setFieldError(field, errorMessage);
      return !errorMessage; 
    },
    [isSignUpForm, state.password, setFieldError]
  );

  const validateForm = useCallback(() => {
    let isValid = true;
    setFormError(""); 

    if (!validateField("username", state.username)) {
      isValid = false;
    }
    if (!validateField("password", state.password)) {
      isValid = false;
    }
    if (isSignUpForm) {
      if (!validateField("confirmPassword", state.confirmPassword)) {
        isValid = false;
      }
      if (state.password !== state.confirmPassword) {
        setFormError("Passwords do not match.");
        isValid = false;
      }
    }
    return isValid;
  }, [state, isSignUpForm, validateField, setFormError]);

  const resetForm = useCallback(() => {
    dispatch({ type: AuthFormActionType.RESET_FORM });
  }, []);

  return {
    state,
    handleFieldChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    setFormError,
    setFieldError,
    validateField,
    validateForm,
    resetForm,
  };
};
