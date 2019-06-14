const yup = require('yup');

const eventSchema = yup.object().shape({
  type: yup
    .string()
    .min(5)
    .required(),
  title: yup
    .string()
    .required(),
  description: yup
    .string()
    .required(),
  category: yup
    .number()
    .required(),
  event_datetime: yup
    .string()
    .required(),
  venue: yup
    .string()
    .required(),
  event_datetime: yup
    .string()
    .required(),
  alt_text: yup
    .string()
    .required(),
  alt_text: yup
    .string()
    .required(),
  is_draft: yup
    .boolean()
    .required(),
  focus_key: yup
    .string()
    .required(),
  meta: yup
    .string()
    .required(),
  publish_datetime: yup
    .string()
    .required(),
  eventTopic: yup
    .array()
    .required(),
  eventImg: yup
    .string()
})

const publicServicesSchema = yup.object().shape({
  type: yup
    .string()
    .min(5)
    .required(),
  primary_tag: yup
    .number()
    .required(),
  description: yup
    .string()
    .required(),
  focus_key: yup
    .string()
    .required(),
  alt_text: yup
    .string()
    .required(),
  meta: yup
    .string()
    .required(),
  publish_datetime: yup
    .string()
    .required(),
  title: yup
    .string()
    .required(),
  is_draft: yup
    .boolean()
    .required(),
  secondary_tag: yup
    .array()
    .required(),

})

module.exports = {
  eventSchema,
  publicServicesSchema
};