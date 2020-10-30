/**
 * useErrorsWithClearOnInput - required fields validation hook
 *
 * @return [errors, setErrors, fieldValidator]
 *
 * @param fields - dictionary of (required) fields
 * @param fieldError - custom field error
 * @param validationError - custom throwed error
 */
import { Dispatch, SetStateAction } from 'react';
export declare const useErrorsWithClearOnInput: <T extends unknown = any>(fields: Record<any, any>, fieldError?: T | undefined, validationError?: string | undefined) => [Record<string, T>, Dispatch<SetStateAction<Record<string, T>>>, () => void];
