import { Router } from 'express';
import { formAnswerRouter } from './form-answer.routes';


const router = Router();

router.use('/form-answer', formAnswerRouter);

export { router };
