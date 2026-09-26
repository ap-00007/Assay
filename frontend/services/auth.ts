export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export type AuthErrorType = 
  | 'invalid_email'
  | 'incorrect_password'
  | 'account_exists'
  | 'passwords_mismatch'
  | 'weak_password'
  | 'network_error'
  | 'empty_fields'
  | null;

export interface AuthError {
  type: AuthErrorType;
  message: string;
}

export interface PasswordStrength {
  score: number; // 0 to 3 (0: None/Too weak, 1: Weak, 2: Moderate, 3: Strong)
  label: 'Weak' | 'Moderate' | 'Strong' | '';
  hasMinLength: boolean;
  hasLetter: boolean;
  hasNumberOrSpecial: boolean;
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: '',
      hasMinLength: false,
      hasLetter: false,
      hasNumberOrSpecial: false,
    };
  }

  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSpecial = /[\d!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

  let score = 0;
  if (password.length >= 6) score++;
  if (hasMinLength && (hasLetter && hasNumberOrSpecial)) score++;
  if (password.length >= 10 && hasMixedCase && hasNumberOrSpecial) score++;

  let label: 'Weak' | 'Moderate' | 'Strong' = 'Weak';
  if (score >= 3) {
    label = 'Strong';
  } else if (score === 2) {
    label = 'Moderate';
  }

  return {
    score: Math.min(score, 3),
    label,
    hasMinLength,
    hasLetter,
    hasNumberOrSpecial,
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Simulated mock database
const MOCK_REGISTERED_EMAILS = new Set([
  'ashishpanda@email.com',
  'user@assay.finance',
  'demo@assay.com',
]);

export async function loginUser(email: string, password: string, simulateError?: AuthErrorType): Promise<{ user?: User; error?: AuthError }> {
  // Artificial delay for realistic premium interaction (450ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (simulateError) {
    return { error: getAuthError(simulateError) };
  }

  if (!email || !password) {
    return { error: { type: 'empty_fields', message: 'Please enter both email and password.' } };
  }

  if (!validateEmail(email)) {
    return { error: { type: 'invalid_email', message: 'Please enter a valid email address.' } };
  }

  // Simulated credential checking
  if (password === 'wrong' || password === 'error') {
    return { error: { type: 'incorrect_password', message: 'The password you entered is incorrect. Please try again.' } };
  }

  if (email.toLowerCase().includes('network')) {
    return { error: { type: 'network_error', message: 'Unable to reach ASSAY servers. Please check your network connection.' } };
  }

  return {
    user: {
      id: 'usr_01a',
      name: email.split('@')[0].replace('.', ' '),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    }
  };
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  simulateError?: AuthErrorType
): Promise<{ user?: User; error?: AuthError }> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (simulateError) {
    return { error: getAuthError(simulateError) };
  }

  if (!name.trim() || !email.trim() || !password) {
    return { error: { type: 'empty_fields', message: 'Please fill in all required fields.' } };
  }

  if (!validateEmail(email)) {
    return { error: { type: 'invalid_email', message: 'Please enter a valid email address.' } };
  }

  if (password !== confirmPassword) {
    return { error: { type: 'passwords_mismatch', message: 'Passwords do not match. Please verify.' } };
  }

  if (password.length < 8) {
    return { error: { type: 'weak_password', message: 'Password must be at least 8 characters long.' } };
  }

  if (MOCK_REGISTERED_EMAILS.has(email.trim().toLowerCase()) || email.toLowerCase().includes('exists')) {
    return { error: { type: 'account_exists', message: 'An account with this email address already exists.' } };
  }

  if (email.toLowerCase().includes('network')) {
    return { error: { type: 'network_error', message: 'Unable to reach ASSAY servers. Please check your network connection.' } };
  }

  return {
    user: {
      id: 'usr_new',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    }
  };
}

export function getAuthError(type: AuthErrorType): AuthError {
  switch (type) {
    case 'invalid_email':
      return { type, message: 'Please enter a valid email address.' };
    case 'incorrect_password':
      return { type, message: 'The password you entered is incorrect. Please try again.' };
    case 'account_exists':
      return { type, message: 'An account with this email address already exists.' };
    case 'network_error':
      return { type, message: 'Unable to reach ASSAY servers. Please check your connection.' };
    case 'passwords_mismatch':
      return { type, message: 'Passwords do not match. Please verify.' };
    case 'weak_password':
      return { type, message: 'Password must be at least 8 characters long.' };
    default:
      return { type: 'empty_fields', message: 'Please complete all required fields.' };
  }
}
