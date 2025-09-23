import * as yup from 'yup'
import { UserRole } from '@/common/enums/user'

export const SignUpSchema = yup.object().shape({
  userType: yup
    .string()
    .oneOf(Object.values(UserRole))
    .required('Please select if you want to find work or hire talent.'),
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('Please confirm your password.')
})
