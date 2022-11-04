import React, { useCallback } from "react";

import { FIELD_BASE_STYLE } from "./constants";
import { FormFieldProps } from "./FormField";

interface TextInputProps
  extends FormFieldProps<string>,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {}

export function TextInput({ control, style, ...inputProps }: TextInputProps) {
  const onChange = useCallback(
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      control.set(e.target.value);
    },
    [control]
  );

  return (
    <input
      type="text"
      name={control.key}
      placeholder={control.key}
      {...inputProps}
      style={{ ...FIELD_BASE_STYLE, ...style }}
      value={control.get()}
      onChange={onChange}
    />
  );
}
