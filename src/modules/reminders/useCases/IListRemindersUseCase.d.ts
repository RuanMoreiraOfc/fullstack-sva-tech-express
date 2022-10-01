import type { IReminder } from '@reminders/models/Reminder';

export type {
  IListRemindersUseCase,
  IListRemindersUseCaseInput,
  IListRemindersUseCaseResponse,
};

type IListRemindersUseCaseInput = IFilterRemindersDTO;
interface IListRemindersUseCaseResponse extends Array<IReminder> {}

interface IListRemindersUseCase {
  execute: (
    data: IListRemindersUseCaseInput,
  ) => Promise<IListRemindersUseCaseResponse>;
}
