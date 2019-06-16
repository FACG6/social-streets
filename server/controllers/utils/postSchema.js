const yup = require('yup');

const eventSchema = yup.object().shape({
  title: yup
    .string()
    .max(60)
    .required(),
  description: yup
    .string()
    .min(10)
    .required(),
  category: yup.number().required(),
  event_datetime: yup.string().required(),
  venue: yup.string().required(),
  alt_text: yup.string().required(),
  website: yup.string().required(),
  is_draft: yup.boolean().required(),
  focus_key: yup.string().required(),
  meta: yup
    .string()
    .min(5)
    .required(),
  publish_datetime: yup.string().required(),
  eventTopic: yup.array().required(),
});

const publicServiceSchema = yup.object().shape({
  primary_tag: yup.number().required(),
  description: yup
    .string()
    .min(10)
    .required(),
  focus_key: yup.string().required(),
  alt_text: yup.string().required(),
  meta: yup
    .string()
    .min(5)
    .required(),
  publish_datetime: yup.string().required(),
  title: yup
    .string()
    .max(60)
    .required(),
  is_draft: yup.boolean().required(),
  secondary_tag: yup.array().required(),
});

module.exports = {
  eventSchema,
  publicServiceSchema,
};
