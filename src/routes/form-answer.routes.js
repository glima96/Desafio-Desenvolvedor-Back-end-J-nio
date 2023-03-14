import { Router } from 'express';
import {
  isValid,
  parse,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import { FormAnswer } from '../models/FormAnswer';
import { createFormAnswerSchema } from '../validations/create-form-answer';

const formAnswerRouter = Router();

formAnswerRouter.get('/', async (req, res) => {
  const { startDate, endDate } = req.query;
  const parsedStartDate = parse(startDate, 'dd/MM/yyyy', new Date());
  const parsedEndDate = parse(endDate, 'dd/MM/yyyy', new Date());
  let createdAtQuery;

  if (startDate && !isValid(parsedStartDate)) {
    return res.status(400).json({ error: 'Invalid start date' });
  }

  if (endDate && !isValid(parsedEndDate)) {
    return res.status(400).json({ error: 'Invalid end date' });
  }

  console.log({ parsedStartDate, parsedEndDate });

  if (startDate && endDate) {
    createdAtQuery = {
      // SELECT * from forms_answers WHERE date BETWEEN min AND max
      [Op.between]: [startOfDay(parsedStartDate), endOfDay(parsedEndDate)],
    };
  } else if (startDate) {
    // SELECT * FROM forms_answers WHERE date >= min
    createdAtQuery = {
      [Op.gte]: startOfDay(parsedStartDate),
    };
  } else if (endDate) {
    // SELECT * FROM forms_answers WHERE date <= max
    createdAtQuery = {
      [Op.lte]: endOfDay(parsedEndDate),
    };
  }

  const list = await FormAnswer.findAll({ where: { createdAt: createdAtQuery } });

  return res.json(list);
});

formAnswerRouter.post('/', async (req, res) => {
  try {
    createFormAnswerSchema.validateSync(req.body);
  } catch (e) {
    return res.status(400).json({ error: e.errors[0] });
  }

  const emailAlreadyExists = await FormAnswer.findOne({ where: { email: req.body.email } });

  if (emailAlreadyExists) {
    return res.status(400).json({ error: 'Email ja consta na base' });
  }

  const answer = await FormAnswer.create(req.body);

  return res.status(201).json(answer);
});

export { formAnswerRouter };
