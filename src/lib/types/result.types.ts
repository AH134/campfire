/**
 * Wrapper for a value. It holds a `value` on success or an `error` on failure.
 *
 * @example
 *     // Successful result with the data
 *     const successResult: Result<number> = {
 *         success: true,
 *         data: 10,
 *     };
 *
 *     // Failed result with an error
 *     const failedResult: Result<number> = {
 *         sucess: false,
 *         error: new Error("Something went wrong!"),
 *     };
 *
 * @template T - The type of the data on `success`.
 * @template E - The type of error, defaulting to `Error`.
 * @see {@link Error} for the default error type.
 */
export type Result<T, E = Error> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          error: E;
      };
