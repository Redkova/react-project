import { describe, it, expect } from 'vitest';
import { formSchema } from './validationSchema';
import { countries } from '../data/countries';

function createFileList(files: File[]): FileList {
  return {
    0: files[0],
    length: files.length,
    item: (i: number) => files[i] ?? null,
  } as unknown as FileList;
}

describe('formSchema', () => {
  const base = {
    name: 'John',
    age: '25',
    email: 'john@mail.com',
    gender: 'male',
    terms: true,
    country: countries[0],
    password: 'Aa1!',
    confirmPassword: 'Aa1!',
  };

  it('rejects name not starting with uppercase', () => {
    const file = new File(['x'], 'img.png', { type: 'image/png' });

    const result = formSchema.safeParse({
      ...base,
      name: 'john',
      file: createFileList([file]),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'Name must start with uppercase'
    );
  });

  it('rejects negative age', () => {
    const file = new File(['x'], 'img.png', { type: 'image/png' });

    const result = formSchema.safeParse({
      ...base,
      age: '-5',
      file: createFileList([file]),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Age cannot be negative');
  });

  it('rejects invalid email format', () => {
    const file = new File(['x'], 'img.png', { type: 'image/png' });

    const result = formSchema.safeParse({
      ...base,
      email: 'invalid',
      file: createFileList([file]),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Email must contain @');
  });

  it('rejects email without domain dot', () => {
    const file = new File(['x'], 'img.png', { type: 'image/png' });

    const result = formSchema.safeParse({
      ...base,
      email: 'john@mail',
      file: createFileList([file]),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Invalid email format');
  });

  it('rejects unaccepted terms', () => {
    const file = new File(['x'], 'img.png', { type: 'image/png' });

    const result = formSchema.safeParse({
      ...base,
      terms: false,
      file: createFileList([file]),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('You must accept terms');
  });

  it('rejects invalid country', () => {
    const file = new File(['x'], 'img.png', { type: 'image/png' });

    const result = formSchema.safeParse({
      ...base,
      country: 'Narnia',
      file: createFileList([file]),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Country must be valid');
  });

  it('rejects missing file', () => {
    const result = formSchema.safeParse({
      ...base,
      file: createFileList([]),
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Image is required');
  });
});
