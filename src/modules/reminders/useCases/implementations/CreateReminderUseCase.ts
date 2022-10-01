import { AppError } from '@errors/AppError';

import type {
  ICreateReminderDTO,
  IReminderRepository,
} from '@reminders/repositories/IReminderRepository';
import type { ICreateReminderUseCase } from '@reminders/useCases/ICreateReminderUseCase';

export { CreateReminderUseCase };

class CreateReminderUseCase implements ICreateReminderUseCase {
  constructor(private readonly repository: IReminderRepository) {}

  async execute(data: ICreateReminderDTO) {
    const reminderAlreadyExists = await this.repository.findUniqueInDay({
      description: data.description,
      date: data.date,
    });

    if (reminderAlreadyExists !== null) {
      throw new AppError({
        message: 'Reminder already exists!',
        statusCode: 409,
      });
    }

    const reminder = await this.repository.create(data);

    return {
      id: reminder.id,
      description: reminder.description,
      city: reminder.city,
      date: reminder.date,
      created_at: reminder.created_at,
    };
  }
}
