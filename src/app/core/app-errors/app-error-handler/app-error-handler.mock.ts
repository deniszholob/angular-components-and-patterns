import { HttpErrorResponse } from '@angular/common/http';

import { AppError } from '../app-error.model';

export type AnyError = HttpErrorResponse | AppError | Error | unknown;
export interface SbErrorDisplay {
  title: string;
  content: string;
  action: () => never;
}

const ERROR_STRING = 'Expected Error for Testing';

// #region General Errors
export const MOCK_Error_NULL = null;
export const MOCK_Error_STRING: Error = new Error(ERROR_STRING);
export const MOCK_Error_EMPTY: Error = new Error();

const MOCK_Error_TRACE_errorText = `Cannot match any routes. URL Segment: 'invalid_route'`;
const MOCK_Error_TRACE_error = `Uncaught (in promise): Error ${MOCK_Error_TRACE_errorText}
Error: ${MOCK_Error_TRACE_errorText}
at resolvePromise (zone.js:1213)
at zone.js:1133
at ZoneDelegate.invokeTask (zone.js:399)
at Object.onInvokeTask (core.js:28692)
at ZoneDelegate.invokeTask (zone.js:398)
at Zone.runTask (zone.js:167)
at drainMicroTaskQueue (zone.js:569)
`;
export const MOCK_Error_TRACE = new Error(MOCK_Error_TRACE_error);
// #endregion

// #region App Errors
export const MOCK_AppError_EMPTY = new AppError({});

export const MOCK_AppError_FULL = new AppError({
  recommendedAction: 'Recommended Action',
  description: 'Description',
  details: 'Details',
  title: 'Title',
});
// #endregion

// #region Server Errors
export const MOCK_ServerError_EMPTY = new HttpErrorResponse({
  error: {},
  status: 0,
  statusText: '',
});

export const MOCK_ServerError_FULL = new HttpErrorResponse({
  error: { message: 'message' },
  status: 500,
  statusText: 'Server Error',
});

// #endregion

// #region All Errors
const ALL_ERRORS = new Map<string, AnyError>([
  ['MOCK_Error_NULL', MOCK_Error_NULL],
  ['MOCK_Error_STRING', MOCK_Error_STRING],
  ['MOCK_Error_EMPTY', MOCK_Error_EMPTY],
  ['MOCK_Error_TRACE', MOCK_Error_TRACE],
  ['MOCK_AppError_EMPTY', MOCK_AppError_EMPTY],
  ['MOCK_AppError_FULL', MOCK_AppError_FULL],
  ['MOCK_ServerError_EMPTY', MOCK_ServerError_EMPTY],
  ['MOCK_ServerError_FULL', MOCK_ServerError_FULL],
]);

export const KNOWN_ERRORS_DISPLAY: SbErrorDisplay[] = Array.from(
  ALL_ERRORS.entries(),
).map(
  ([key, value]: [string, AnyError]): SbErrorDisplay =>
    errorToErrorDisplay(key, value),
);
// #endregion

// #region Util

export function errorToErrorDisplay(
  title: string,
  error: AnyError,
): SbErrorDisplay {
  return {
    title,
    content: JSON.stringify(error, jsonStringifyErrorReplacer, 2),
    action: () => {
      throw error;
    },
  };
}

/** @see https://stackoverflow.com/questions/18391212/is-it-possible-to-stringify-an-error-using-json-stringify */
function jsonStringifyErrorReplacer(key: string, value: unknown): unknown {
  if (value instanceof Error) {
    const error: Record<string, unknown> = {};

    Object.getOwnPropertyNames(value).forEach((propName: string): void => {
      error[propName] = value[propName as keyof Error];
    });

    return error;
  }

  return value;
}
// #endregion
