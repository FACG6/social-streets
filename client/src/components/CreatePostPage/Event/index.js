import React from "react";
import { Button, Input, Form } from "antd";
import { withFormik, Form as FormikForm, Field as FormikField } from "formik";
import * as yup from "yup";
import { SelectMenu } from "./../helper";
import "./style.css";

const FormItem = Form.Item;

const InnerForm = ({
  values,
  errors,
  touched,
  setFieldTouched,
  setFieldValue,
  handleSubmit,
  eventTypeValues,
  eventTopicValues,
}) => {
  return (
    <FormikForm onSubmit={handleSubmit}>
      <FormItem>
        <FormikField
          name="title"
          render={({ field }) => (
            <>
              <label htmlFor="title" style={{ display: "block" }}>
                Title
              </label>
              <Input
                id="title"
                {...field}
                placeholder="Event’s Title"
                style={{ background: "#fafafa" }}
              />
              {errors.title && touched.title && (
                <span className="error">{errors.title}</span>
              )}
            </>
          )}
        />
        <FormikField
          name="eventType"
          render={({ field }) => {
            console.log(field);
            return (
              <>
                <SelectMenu
                  {...field}
                  className="main--postType"
                  options={eventTypeValues}
                  onChange={value => setFieldValue("eventType", value)}
                  onBlur={() => setFieldTouched("eventType", true)}
                  value={values.eventType}
                  htmlFor="eventType"
                  style={{ display: "block" }}
                  labelchildren="Event Type"
                />
                {errors.eventType && touched.eventType && (
                  <span className="error">{errors.eventType}</span>
                )}
              </>
            );
          }}
        />
        <FormikField
          name="eventTopic"
          render={({ field }) => (
            <>
              <SelectMenu
                {...field}
                className="main--postType"
                options={eventTopicValues}
                onChange={value => setFieldValue("eventTopic", value)}
                onBlur={() => setFieldTouched("eventTopic", true)}
                value={values.eventTopic}
                htmlFor="eventTopic"
                style={{ display: "block" }}
                labelchildren="Event Topic"
              />
              {errors.eventTopic && touched.eventTopic && (
                <span className="error">{errors.eventTopic}</span>
              )}
            </>
          )}
        />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </FormItem>
    </FormikForm>
  );
};

const EventFrom = withFormik({
  mapPropsToValues({ title, eventType, eventTopic }) {
    return {
      title: title,
      eventType: eventType,
      eventTopic: eventTopic
    };
  },
  validationSchema: yup.object().shape({
    title: yup
      .string()
      .min(5)
      .required("Title is required"),
    eventType: yup.string().required("Event Type is required"),
    eventTopic: yup.string().required("Event Topic is required")
  }),
  handleSubmit(values) {
    console.log("Form values", values);
  }
})(InnerForm);

export default EventFrom;
