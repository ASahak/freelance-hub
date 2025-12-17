import * as yup from 'yup';
import { UserRole } from '@/common/enums/user';
import { Gender } from '@libs/types/profile.type';

export const PublicProfileSchema = yup.object().shape({
  name: yup.string().required('FullName is required.'),
  city: yup.string().notRequired().default(''),
  country: yup.string().notRequired().default(''),
  hourlyRate: yup.string().notRequired().default(''),
  gender: yup.string()
    .oneOf(Object.values(Gender), 'Invalid gender selected')
    .nullable()
    .notRequired()
    .default(null)
    .transform((curr, orig) => (orig === '' ? null : curr)),
});

export const ProfessionalSchema = yup.object().shape({
  headline: yup.string().notRequired().default(''),
  bio: yup.string().notRequired().default(''),
});

export const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Current password is required to authorize changes.'),
  newPassword: yup
    .string()
    .required('New password is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .notOneOf(
      [yup.ref('currentPassword')],
      'New password cannot be the same as the old one.',
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match.')
    .required('Please confirm your new password.'),
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

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
});

export const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .notOneOf(
      [yup.ref('currentPassword')],
      'New password cannot be the same as the old one.',
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match.')
    .required('Please confirm your new password.'),
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
