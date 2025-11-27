import * as yup from 'yup';
import { UserRole } from '@/common/enums/user';

export const PublicProfileSchema = yup.object().shape({
  name: yup.string().required('FullName is required.'),
});

export const AccountSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole))
    .required('Role is required.'),
});

export const ProfileSecuritySchema = yup.object().shape({
  isTwoFactorEnabled: yup.boolean().default(false),
});

export const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long.'),
});

export const SignUpSchema = SignInSchema.concat(
  yup.object({
    role: yup
      .string()
      .oneOf(Object.values(UserRole))
      .required('Please select if you want to find work or hire talent.'),
    firstName: yup.string().required('First name is required.'),
    lastName: yup.string().required('Last name is required.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match.')
      .required('Please confirm your password.'),
  }),
);
