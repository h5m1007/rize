import { AssertionError } from 'assert'

export function prepareStackTrace () {
  return new Error()
}

/**
 * @param fake The error which collects stack information
 * @param real The real error which contains error message.
 */
export function beautifyStack (fake: Error, real: Error) {
  const stack = fake.stack!.split('\n')
  stack.splice(1, 2)
  stack[0] = real.message
  /* istanbul ignore if */
  if (typeof jest === 'object' && real instanceof AssertionError) {
    stack[0] = ''   // Jest will show error message twice, so we remove it.
  }
  real.stack = stack.join('\n')

  return real
}

export function throwAssertionError (error: Error) {
  if (error instanceof AssertionError) {
    throw error
  }
}

process.on('unhandledRejection', throwAssertionError)
