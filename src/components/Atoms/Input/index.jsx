import React, { useState } from 'react';
import { Field, useFormikContext, ErrorMessage } from 'formik';
import TogglePasswordIcon from '../TogglePasswordIcon';
import { StyledSelect, Error } from './Input.styles';

const Input = ({ name, type, placeholder, options, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [passwordShow, setPasswordShow] = useState(false);

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
        <StyledSelect name={name} onChange={e => setFieldValue(name, e)} options={options} {...props} />
      ) : (
        <Field name={name} type={type} className="form-control" placeholder={placeholder} {...props} />
      )}

      {/* ErrorMessage component */}
      <ErrorMessage name={name}>{msg => <Error type="invalid">{msg}</Error>}</ErrorMessage>
    </>
  );
};

export default Input;
