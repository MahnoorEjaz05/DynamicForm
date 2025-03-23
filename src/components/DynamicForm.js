import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { Form as BootstrapForm, Button, FormGroup, FormLabel, Card, Container, Row, Col } from 'react-bootstrap';

const DynamicForm = () => {
  const [fields, setFields] = useState([]);

  const addField = (fieldType) => {
    setFields([...fields, { type: fieldType, id: Date.now() }]);
  };

  const initialValues = fields.reduce((acc, field) => {
    acc[field.id] = '';
    return acc;
  }, {});

  const validationSchema = Yup.object().shape(
    fields.reduce((acc, field) => {
      acc[field.id] = field.type === 'phone'
        ? Yup.string().required('Phone number is required')
        : Yup.string().required('Required');
      return acc;
    }, {})
  );

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4 border-0">
        <h2 className="text-center mb-4">Build Your Own Form</h2>
        
        <div className="mb-4 d-flex flex-wrap justify-content-center gap-2">
          <Button variant="primary" onClick={() => addField('text')}>+ Text Field</Button>
          <Button variant="secondary" onClick={() => addField('dropdown')}>+ Dropdown</Button>
          <Button variant="warning" onClick={() => addField('radio')}>+ Radio</Button>
          <Button variant="info" onClick={() => addField('checkbox')}>+ Checkbox</Button>
          <Button variant="success" onClick={() => addField('phone')}>+ Phone</Button>
          <Button variant="danger" onClick={() => addField('date')}>+ Date</Button>
          <Button variant="dark" onClick={() => addField('file')}>+ File</Button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form as={BootstrapForm}>
              <Row>
                {fields.map((field) => (
                  <Col md={6} key={field.id} className="mb-4">
                    <Card className="p-3 border-0 shadow-sm">
                      <FormGroup>
                        {field.type === 'text' && (
                          <>
                            <FormLabel>Text Field</FormLabel>
                            <Field name={field.id} className="form-control border border-primary" placeholder="Enter text" />
                          </>
                        )}

                        {field.type === 'dropdown' && (
                          <>
                            <FormLabel>Dropdown</FormLabel>
                            <Field as="select" name={field.id} className="form-select border border-secondary">
                              <option value="">Select an option</option>
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                            </Field>
                          </>
                        )}

                        {field.type === 'radio' && (
                          <>
                            <FormLabel>Radio Button</FormLabel>
                            <div className="d-flex gap-3">
                              <Field type="radio" name={field.id} value="yes" className="form-check-input" /> Yes
                              <Field type="radio" name={field.id} value="no" className="form-check-input" /> No
                            </div>
                          </>
                        )}

                        {field.type === 'checkbox' && (
                          <>
                            <FormLabel>Checkbox</FormLabel>
                            <div>
                              <Field type="checkbox" name={field.id} className="form-check-input me-2" />
                              Check this box
                            </div>
                          </>
                        )}

                        {field.type === 'phone' && (
                          <>
                            <FormLabel>Phone Number</FormLabel>
                            <PhoneInput
                              country={'us'}
                              onChange={(value) => setFieldValue(field.id, value)}
                              inputClass="form-control border border-success"
                            />
                          </>
                        )}

                        {field.type === 'date' && (
                          <>
                            <FormLabel>Date Picker</FormLabel>
                            <Field type="date" name={field.id} className="form-control border border-danger" />
                          </>
                        )}

                        {field.type === 'file' && (
                          <>
                            <FormLabel>File Upload</FormLabel>
                            <input
                              type="file"
                              className="form-control border border-dark"
                              onChange={(event) => setFieldValue(field.id, event.currentTarget.files[0])}
                            />
                          </>
                        )}
                      </FormGroup>
                    </Card>
                  </Col>
                ))}
              </Row>

              <div className="text-center mt-4">
                <Button type="submit" className="px-4">Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default DynamicForm;
