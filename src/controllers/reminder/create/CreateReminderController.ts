import timestampToDate from '@utils/timestampToDate';

import type { Request, Response } from 'express';

import { AppError } from '@errors/AppError';

import type {
  ICreateReminderUseCase,
  ICreateReminderUseCaseInput,
} from '@reminders/useCases/ICreateReminderUseCase';

export { CreateReminderController };

class CreateReminderController {
  constructor(private readonly useCase: ICreateReminderUseCase) {}

  async handle(request: Request, response: Response) {
    const { description, date: timestamp, city } = request.body;

    const data = this.validateData({
      description,
      date: timestampToDate(timestamp),
      city,
    });

    const json = await this.useCase.execute(data);

    response.json(json);
  }

  validateData(
    data: Partial<ICreateReminderUseCaseInput>,
  ): ICreateReminderUseCaseInput {
    if (data.date === undefined) {
      throw new AppError({
        message: 'Invalid `date` timestamp!',
        statusCode: 400,
      });
    }

    if (data.description === undefined) {
      throw new AppError({
        message: '`descriptions` is required!',
        statusCode: 400,
      });
    }

    return data as ICreateReminderUseCaseInput;
  }
}
