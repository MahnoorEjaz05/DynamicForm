import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';

const FieldComponent = ({ field }) => {
  return (
    <div className="mb-3">
      <Form.Label>{field.type.charAt(0).toUpperCase() + field.type.slice(1)}</Form.Label>
      {field.type === 'text' && (
        <Field name={field.id} type="text" className="form-control" />
      )}
      {field.type === 'dropdown' && (
        <Field name={field.id} as="select" className="form-control">
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </Field>
      )}
      {field.type === 'radio' && (
        <div>
          <label className="me-3">
            <Field type="radio" name={field.id} value="yes" /> Yes
          </label>
          <label>
            <Field type="radio" name={field.id} value="no" /> No
          </label>
        </div>
      )}
      {field.type === 'checkbox' && (
        <Field type="checkbox" name={field.id} className="form-check-input" />
      )}
      {field.type === 'date' && (
        <Field name={field.id} type="date" className="form-control" />
      )}
      {field.type === 'file' && (
        <Field name={field.id} type="file" className="form-control" />
      )}
      <ErrorMessage name={field.id} component="div" className="text-danger" />
    </div>
  );
};

export default FieldComponent;
