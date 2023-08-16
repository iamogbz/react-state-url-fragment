import { useCallback, useState } from "react";

import { ObjectEntry } from "../../utils/object";
import { useCounter } from "./useCounter";

type SimpleFormFields = Record<string, unknown>;
const Value = Symbol("__value__");
export type FormField<T> = {
  [Value]: T;
  key: string;
  get(): T;
  set(v: T): void;
};
type FormFields<T extends SimpleFormFields> = {
  [k in keyof T]: FormField<T[k]>;
};
type FormSubmissionValues<T extends SimpleFormFields> = {
  [k in keyof T]: T[k];
};
type FormSubmissionResult = {
  success: boolean;
  error?: unknown;
};

interface UseFormResult<T extends SimpleFormFields> {
  actions: {
    submit: () => Promise<FormSubmissionResult>;
  };
  fields: FormFields<T>;
  status: {
    isSubmitting: boolean;
  };
}

interface FormEventHandlers<T extends SimpleFormFields> {
  submit?: (values: FormSubmissionValues<T>) => Promise<FormSubmissionResult>;
}

const NoSubmissionHandlerError = new Error("No submit handler provided");

function useForm<T extends SimpleFormFields>(
  fields: FormFields<T>,
  handlers?: FormEventHandlers<T>,
): UseFormResult<T> {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(
    async function submitForm() {
      try {
        setIsSubmitting(true);
        const currentValues = Object.fromEntries(
          Object.entries(fields).map(
            ([key, value]: ObjectEntry<typeof fields>) => [key, value.get()],
          ),
        ) as FormSubmissionValues<T>;
        const result = await handlers?.submit?.(currentValues);
        return (
          result ?? {
            success: false,
            error: NoSubmissionHandlerError,
          }
        );
      } catch (error) {
        return { success: false, error };
      } finally {
        setIsSubmitting(false);
      }
    },
    [fields, handlers],
  );

  const actions = { submit };

  const status = { isSubmitting };

  return { actions, fields, status };
}

export function useSimpleForm<T extends SimpleFormFields>(
  initialFields: T,
  eventHandlers?: FormEventHandlers<T> & {
    change?: (
      fieldName: keyof T,
      newValue: T[keyof T],
      oldValue: T[keyof T],
    ) => void;
  },
): UseFormResult<T> {
  const [, updateCounter] = useCounter();
  const { change, ...handlers } = eventHandlers ?? {};
  const [fields] = useState(
    () =>
      Object.fromEntries(
        Object.entries(initialFields).map(([key, value]) => {
          const initialValue = value as T[string];
          const formField: FormField<T[string]> = {
            key,
            [Value]: initialValue,
            get: () => formField[Value],
            set: (newValue) => {
              change?.(key, newValue, formField[Value]);
              updateCounter(((formField[Value] = newValue), 1));
            },
          };
          return [key, formField];
        }),
      ) as FormFields<T>,
  );

  return useForm(fields, handlers);
}
