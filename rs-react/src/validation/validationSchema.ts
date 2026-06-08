import { z } from 'zod';
import { countries } from '../data/countries';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((name) => /^[A-Z]/.test(name), 'Name must start with uppercase'),

    age: z
      .string()
      .min(1, 'Age is required')
      .refine((age) => !isNaN(Number(age)), 'Age must be a number')
      .refine((age) => Number(age) >= 0, 'Age cannot be negative'),

    email: z
      .string()
      .min(1, 'Email is required')
      .refine((email) => email.includes('@'), 'Email must contain @')
      .refine((email) => {
        const [local, domain] = email.split('@');
        return local && domain && domain.includes('.');
      }, 'Invalid email format'),

    gender: z.string().min(1, 'Gender is required'),

    terms: z
      .boolean()
      .refine((isAccepted) => isAccepted === true, 'You must accept terms'),

    country: z
      .string()
      .min(1, 'Country is required')
      .refine(
        (country) => countries.includes(country),
        'Country must be valid'
      ),

    password: z.string().min(1, 'Password is required'),

    confirmPassword: z.string().min(1, 'Confirm password is required'),

    file: z
      .custom<FileList>((val) => val instanceof FileList, {
        message: 'Image is required',
      })

      // Проверка: выбран ли файл
      .refine((files) => files.length > 0, {
        message: 'Image is required',
      })

      // Проверка формата
      .refine((files) => ['image/png', 'image/jpeg'].includes(files[0]?.type), {
        message: 'Only PNG or JPEG allowed',
      })

      // Проверка размера
      .refine((files) => files[0]?.size <= 2 * 1024 * 1024, {
        message: 'Max file size is 2MB',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type FormValues = z.infer<typeof formSchema>;
