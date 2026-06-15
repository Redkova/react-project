import { describe, it, expect } from 'vitest';
import { getPasswordStrength } from './getPasswordStrength';

describe('getPasswordStrength', () => {
  it('detects uppercase letters', () => {
    expect(getPasswordStrength('A').hasUpper).toBe(true);
    expect(getPasswordStrength('a').hasUpper).toBe(false);
  });

  it('detects lowercase letters', () => {
    expect(getPasswordStrength('a').hasLower).toBe(true);
    expect(getPasswordStrength('A').hasLower).toBe(false);
  });

  it('detects numbers', () => {
    expect(getPasswordStrength('1').hasNumber).toBe(true);
    expect(getPasswordStrength('abc').hasNumber).toBe(false);
  });

  it('detects special characters', () => {
    expect(getPasswordStrength('!').hasSpecial).toBe(true);
    expect(getPasswordStrength('abc')).toMatchObject({ hasSpecial: false });
  });

  it('returns correct structure for a strong password', () => {
    const result = getPasswordStrength('Aa1!');

    expect(result).toEqual({
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
    });
  });

  it('returns correct structure for a weak password', () => {
    const result = getPasswordStrength('abc');

    expect(result).toEqual({
      hasUpper: false,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
    });
  });

  it('handles empty string', () => {
    const result = getPasswordStrength('');

    expect(result).toEqual({
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
    });
  });
});
