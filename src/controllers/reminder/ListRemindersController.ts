import timestampToDate from '@utils/timestampToDate';

import type { Request, Response } from 'express';

import { AppError } from '@errors/AppError';

import type {
  IListRemindersUseCase,
  IListRemindersUseCaseInput,
} from '@reminders/useCases/IListRemindersUseCase';

export { ListRemindersController };

class ListRemindersController {
  constructor(private readonly useCase: IListRemindersUseCase) {}

  async handle(request: Request, response: Response) {
    const { date, starts_at: startsAt, ends_at: endsAt } = request.query;

    const data = this.validateData({
      date: timestampToDate(date),
      startsAt: timestampToDate(startsAt),
      endsAt: timestampToDate(endsAt),
    });

    const json = await this.useCase.execute(data);

    response.json(json);
  }

  validateData(
    data: Partial<IListRemindersUseCaseInput>,
  ): IListRemindersUseCaseInput {
    const dataValidEntries = Object.entries(data).map(
      ([key, value]) => [key, Boolean(value)] as [string, boolean],
    );

    // INVALID BOOLEAN

    const isAllInvalid = dataValidEntries.every(
      ([_key, isDefined]) => !isDefined,
    );
    const isDateInvalid = dataValidEntries
      .filter(([key]) => key === 'date')
      .some(([_key, isDefined]) => !isDefined);

    // INVALID COUNT

    const intervalInvalidCount = dataValidEntries.filter(
      ([key, isDefined]) => key !== 'date' && !isDefined,
    ).length;

    //

    if (isAllInvalid) {
      throw new AppError({
        message: 'No parameters have been passed!',
        statusCode: 400,
      });
    }

    if (isDateInvalid && intervalInvalidCount !== 0) {
      throw new AppError({
        message: 'Pass all parameters for interval [`starts_at` & `ends_at`]!',
        statusCode: 400,
      });
    }

    if (!isDateInvalid && intervalInvalidCount !== 2) {
      throw new AppError({
        message:
          'Both is not allowed, pass [`date`] or [`starts_at` & `ends_at`] only!',
        statusCode: 400,
      });
    }

    //

    return data;
  }
}
