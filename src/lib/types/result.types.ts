/**
 * Wrapper for a value. It holds a `value` on success or an `error` on failure.
 *
 * @example
 *     // Successful result with a value
 *     const successResult: Result<number> = {
 *         ok: true,
 *         value: 10,
 *     };
 *
 *     // Failed result with an error
 *     const failedResult: Result<number> = {
 *         ok: false,
 *         error: new Error("Something went wrong!"),
 *     };
 *
 * @template T - The type of the value on `success`.
 * @template E - The type of error, defaulting to `Error`.
 * @see {@link Error} for the default error type.
 */
export type Result<T, E = Error> =
    | {
          ok: true;
          value: T;
      }
    | {
          ok: false;
          error: E;
      };
