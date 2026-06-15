import type { Strength } from '../utils/getPasswordStrength';

export const usePasswordValidation = (strength: Strength, value: string) => {
  const isValid =
    strength.hasUpper &&
    strength.hasLower &&
    strength.hasNumber &&
    strength.hasSpecial;

  const showRules = !isValid && value.length > 0;

  return { isValid, showRules };
};
