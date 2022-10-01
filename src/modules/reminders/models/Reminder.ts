import type { Reminder as ReminderBase } from '@prisma/client';

export { Reminder };
export type { IReminder };

interface IReminder extends ReminderBase {}

class Reminder implements IReminder {
  constructor(private readonly data: IReminder) {}

  get id() {
    return this.data.id;
  }

  get description() {
    return this.data.description;
  }

  get city() {
    return this.data.city;
  }

  get color() {
    return this.data.color;
  }

  get date() {
    return this.data.date;
  }

  get created_at() {
    return this.data.created_at;
  }
}
