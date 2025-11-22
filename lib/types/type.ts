// LOGIN FORM
export type LoginState = {
  error: string | null;
  issues: Record<string, string[]>;
};

export const initialState: LoginState = {
  error: null,
  issues: {},
};

// ////////////////////////////////
// SIGNUP FORM
export type SignUpState = {
  error: string | null;
  issues: Record<string, string[]>;
  infoMessage?: string | null;
};

export const registerState: SignUpState = {
  error: null,
  issues: {},
};

