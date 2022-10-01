import type { IPrismaClient } from '@utils/PrismaClientSingleton';
import { PrismaClientSingleton } from '@utils/PrismaClientSingleton';

import { Reminder } from '@reminders/models/Reminder';
import type {
  IReminderRepository,
  IFilterRemindersDTO,
} from '@reminders/repositories/IReminderRepository';

export { ReminderRepository };

class ReminderRepository implements IReminderRepository {
  private readonly prisma: IPrismaClient;
  constructor() {
    this.prisma = PrismaClientSingleton.getInstance().client;
  }

  async list(filter: IFilterRemindersDTO) {
    const remindersFromDb = await this.prisma.reminder.findMany({
      where: {
        date: {
          equals: filter.date,
          gte: filter.startsAt,
          lte: filter.endsAt,
        },
      },
    });

    const reminders = remindersFromDb.map((reminder) => new Reminder(reminder));

    return reminders;
  }
}
