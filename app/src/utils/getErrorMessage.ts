import { IApiError } from '@/common/types/api'

export const isApiError = (error: unknown): error is IApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'message' in error
  )
}

export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error
  }

  if (error instanceof Error || isApiError(error)) {
    return error.message
  }

  // Fallback for completely unknown errors
  return 'An unexpected error occurred. Please try again.'
}
