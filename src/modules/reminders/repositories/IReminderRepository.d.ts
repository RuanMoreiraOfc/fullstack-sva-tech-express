import type { IReminder } from '@reminders/models/Reminder';

export type { IReminderRepository, IFilterRemindersDTO };

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
}
