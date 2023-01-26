import React, { useState, useCallback } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Formik, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

function MCQForm(props) {
  const [correctAnswer, setCorrectAnswer] = useState("");

  const getInit = () => {};
  const schema = Yup.object().shape({
    mcqQuestion: Yup.string().max(255).required("You must enter a name"),
    mcqChoice: Yup.array().of(
      Yup.string().max(255).required("You must enter choice description")
    ),
    mcqMarks: Yup.number("Must be a number")
      .integer("Must be an Integer")
      .positive("Must be a positive integer")
      .required("You must enter marks for MCQ"),
    mcqTime: Yup.number("Must be a number")
      .integer("Must be an Integer")
      .positive("Must be a positive integer")
      .required("You must enter time for MCQ"),
    //correctChoice: Yup.string().required,
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={props.handleFormSubmit}
      initialValues={{
        mcqQuestion: "",
        mcqChoice: [],
        correctChoice: "",
        mcqMarks: "",
        mcqTime: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="validationFormik02">
            <Form.Label>MCQ Question</Form.Label>
            <Form.Control
              type="text"
              name="mcqQuestion"
              value={values.mcqQuestion}
              onChange={handleChange}
              isInvalid={!!errors.mcqQuestion}
            />

            <Form.Control.Feedback type="invalid">
              {errors.mcqQuestion}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationFormik01">
            <Form.Label>Choices</Form.Label>
            <FieldArray
              name="mcqChoice"
              render={(arrayHelpers) => {
                const mcqChoice = values.mcqChoice;
                return (
                  <div>
                    {mcqChoice && mcqChoice.length > 0
                      ? mcqChoice.map((user, index) => (
                          <div key={index} className="py-2">
                            <InputGroup>
                              <InputGroup.Radio
                                name="upload_radio"
                                checked={
                                  correctAnswer ===
                                    values.mcqChoice.at(index) &&
                                  correctAnswer != ""
                                }
                                value={values.mcqChoice.at(index)}
                                onChange={(e) => {
                                  values.correctChoice = e.target.value;
                                  setCorrectAnswer(e.target.value);
                                }}
                              />
                              <Form.Control
                                type="text"
                                name={`mcqChoice.${index}`}
                                value={values.mcqChoice.at(index)}
                                onChange={handleChange}
                                isInvalid={!!errors.mcqChoice}
                              />
                              <Button
                                variant="outline-success"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                  values.correctChoice =
                                    correctAnswer === values.mcqChoice.at(index)
                                      ? ""
                                      : correctAnswer;
                                  setCorrectAnswer(values.correctChoice);
                                }}
                              >
                                -
                              </Button>
                              <Form.Control.Feedback type="invalid">
                                <ErrorMessage name={`mcqChoice.${index}`} />
                              </Form.Control.Feedback>
                            </InputGroup>
                          </div>
                        ))
                      : null}
                    <div className="py-2">
                      <Button
                        variant="outline-success"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add Choice
                      </Button>
                    </div>
                    <Form.Label>Marks</Form.Label>
                    <Form.Control
                      type="number"
                      name="mcqMarks"
                      value={values.mcqMarks}
                      onChange={handleChange}
                      isInvalid={!!errors.mcqMarks}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.mcqMarks}
                    </Form.Control.Feedback>
                    <Form.Label>Time in second</Form.Label>
                    <Form.Control
                      type="number"
                      name="mcqTime"
                      value={values.mcqTime}
                      onChange={handleChange}
                      isInvalid={!!errors.mcqTime}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.mcqTime}
                    </Form.Control.Feedback>
                    <div className="py-2">
                      <Button variant="outline-success" type="save">
                        Save
                      </Button>
                    </div>
                  </div>
                );
              }}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default MCQForm;
