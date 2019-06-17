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
  website: yup.string().matches(
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    ).required(),
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
  facebook: yup
    .string()
    .matches(
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    )
    .notRequired(),
  twitter: yup
    .string()
    .matches(
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    )
    .notRequired(),
  instagram: yup
    .string()
    .matches(
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
    )
});

exports.fetchPostSchema = yup.object().shape({
  postId: yup.number(),
  postType: yup.string().matches(/(\bevent\b)|(\bpublic_service\b)/)
});
