/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

/**
 * useErrorsWithClearOnInput - required fields validation hook
 *
 * @return [errors, setErrors, fieldValidator]
 *
 * @param fields - dictionary of (required) fields
 * @param fieldError - custom field error
 * @param validationError - custom throwed error
 */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { has, isEmpty, omit } from 'ramda';
import { ENTITY_ERRORS } from '~/application';
import i18n from "~/i18n";

export const useErrorsWithClearOnInput = <T extends any = any>(
  fields: Record<any, any>,
  fieldError?: T,
  validationError?: string
): [
  Record<string, T>,
  Dispatch<SetStateAction<Record<string, T>>>,
  () => void
] => {
  const [errors, setErrors] = useState<Record<string, T>>({});

  Object.entries(fields).forEach(([key, val]) =>
    useEffect(() => {
      if (has(key, errors)) setErrors(omit([key], errors));
    }, [key, val])
  );

  const fieldValidator = useCallback(() => {
    const faulty = Object.entries(fields).reduce(
      (acc, [key, val]) => (isEmpty(val) ? { ...acc, [key]: fieldError } : acc),
      {}
    );

    setErrors(faulty);

    if (Object.values(faulty).length) {
      throw new Error(validationError || i18n.t(ENTITY_ERRORS.FIELD_IS_REQUIRED));
    }
  }, [fieldError, fields, validationError]);

  return [errors, setErrors, fieldValidator];
};
