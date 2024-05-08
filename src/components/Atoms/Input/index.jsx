import React, { useState, useEffect } from 'react';
import { Field, useFormikContext, ErrorMessage } from 'formik';
import Select from 'react-select';
import TogglePasswordIcon from '../TogglePasswordIcon';
import { Error } from './Input.styles';

const Input = ({ name, type, placeholder, value, options, ...props }) => {
  const { setFieldValue, values } = useFormikContext();
  const [passwordShow, setPasswordShow] = useState(false);

  // Set the value of the field based on the 'value' prop if provided and not controlled by Formik
  useEffect(() => {
    if (value !== undefined && !values[name]) {
      setFieldValue(name, value);
    }
  }, [value, name, setFieldValue, values]);

  return (
    <>
      {type === 'password' ? (
        <>
          <Field
            name={name}
            type={passwordShow ? 'text' : 'password'}
            className="form-control"
            placeholder={placeholder}
            {...props}
          />
          <TogglePasswordIcon onClick={() => setPasswordShow(!passwordShow)} {...props} />
        </>
      ) : type === 'checkbox' ? (
        <Field name={name} type={type} className="form-check-input" />
      ) : type === 'select' ? (
        <Select
          name={name}
          onChange={e => setFieldValue(name, e)}
          options={options}
          value={values[name] || value} // Use Formik values if available, otherwise use the prop value
          {...props}
        />
      ) : (
        <Field
          name={name}
          type={type}
          className="form-control"
          placeholder={placeholder}
          value={values[name] || value} // Use Formik values if available, otherwise use the prop value
          {...props}
        />
      )}

      {/* ErrorMessage component */}
      <ErrorMessage name={name}>{msg => <Error type="invalid">{msg}</Error>}</ErrorMessage>
    </>
  );
};

export default Input;
