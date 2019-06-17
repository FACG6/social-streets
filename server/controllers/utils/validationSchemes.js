const yup = require("yup");

exports.userPostSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(3)
    .required(),
  last_name: yup
    .string()
    .min(3)
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .required(),
  orgnisation: yup
    .string()
    .min(5)
    .required(),
  businestype: yup.string().required(),
  website: yup.string().required(),
  address: yup
    .string()
    .min(5)
    .required(),
  country: yup
    .string()
    .min(3)
    .required(),
  city: yup
    .string()
    .min(3)
    .required(),
  postal: yup
    .string()
    .min(4)
    .required(),
  facebook: yup.string().notRequired(),
  twitter: yup.string().notRequired(),
  instagram: yup.string().notRequired()
});

exports.fetchPostSchema = yup.object().shape({
  postId: Number(),
  postType: String()
    .trim()
    .match(/(\bevent\b)|(\bpublic_service\b)/)
});
