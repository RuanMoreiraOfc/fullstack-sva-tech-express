import type { IReminder } from '@reminders/models/Reminder';

export type { IReminderRepository, ICreateReminderDTO, IFilterRemindersDTO };

interface ICreateReminderDTO {
  description: string;
  city?: string;
  date: Date;
}

type IFilterRemindersDTO =
  | {
      date: Date;
      startsAt?: never;
      endsAt?: never;
    }
  | {
      date?: never;
      startsAt: Date;
      endsAt: Date;
    };

interface IReminderRepository {
  list: (data: IFilterRemindersDTO) => Promise<IReminder[]>;
  create: (data: ICreateReminderDTO) => Promise<IReminder>;
}
