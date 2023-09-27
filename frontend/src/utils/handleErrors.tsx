export const handleErrors = (
  e: unknown,
  currentErrors: object,
  errorsHandler: { (value: React.SetStateAction<object>): void; (value: React.SetStateAction<object>): void; (arg0: any): void }
) => {
  if (
    e &&
    typeof e === 'object' &&
    'data' in e &&
    typeof e.data === 'object' &&
    e.data &&
    'message' in e.data &&
    typeof e.data.message === 'string'
  ) {
    errorsHandler({ ...currentErrors, message: e.data.message })
  } else if (e && typeof e === 'object' && 'message' in e && typeof e.message === 'string') {
    errorsHandler({ ...currentErrors, message: e.message })
  } else if (
    e &&
    typeof e === 'object' &&
    'data' in e &&
    typeof e.data === 'object' &&
    e.data &&
    'message' in e.data &&
    Array.isArray(e.data.message)
  ) {
    errorsHandler({ ...currentErrors, message: e.data.message.join(' ') })
  } else {
    console.error('unhandled exception: ', e)
  }
}
