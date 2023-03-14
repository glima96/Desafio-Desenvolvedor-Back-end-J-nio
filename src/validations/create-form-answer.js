import * as yup from 'yup';

const createFormAnswerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required(),
  phone: yup.string().required(),
});

export { createFormAnswerSchema };
