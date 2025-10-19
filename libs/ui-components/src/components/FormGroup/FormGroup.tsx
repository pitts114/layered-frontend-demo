import React from 'react';

export interface FormGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  children: React.ReactNode;
}

export const FormGroup: React.FC<FormGroupProps> = ({ legend, children, className = '', ...props }) => {
  return (
    <fieldset className={`w-full ${className}`} {...props}>
      {legend && <legend className="text-gray-700 text-sm font-semibold mb-3">{legend}</legend>}
      <div className="space-y-3">{children}</div>
    </fieldset>
  );
};
