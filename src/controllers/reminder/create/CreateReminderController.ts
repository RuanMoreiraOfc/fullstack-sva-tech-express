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
    const { description, date: timestamp, city, color } = request.body;

    const data = this.validateData({
      description,
      date: timestampToDate(timestamp),
      color,
      city,
    });

    const json = await this.useCase.execute(data);

    response.json(json);
  }

  validateData(
    data: Partial<ICreateReminderUseCaseInput>,
  ): ICreateReminderUseCaseInput {
    // REGEX

    const REGEX_HEX_CODE = /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;
    const REGEX_HEX_CODE_WITH_ALPHA = /^#[0-9a-f]{4}(?:[0-9a-f]{4})?$/i;

    // IS VALID

    const isInvalidColor =
      typeof data.color === 'string' &&
      [REGEX_HEX_CODE, REGEX_HEX_CODE_WITH_ALPHA].every(
        (r) => r.test(data.color ?? '') === false,
      );

    //

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

    if (isInvalidColor) {
      throw new AppError({
        message: '`color` should be a hex code!',
        statusCode: 400,
      });
    }

    return data as ICreateReminderUseCaseInput;
  }
}
