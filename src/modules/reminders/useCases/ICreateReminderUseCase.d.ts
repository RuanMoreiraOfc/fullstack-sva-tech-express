import type { ICreateReminderDTO } from '@reminders/repositories/IReminderRepository';

export type {
  ICreateReminderUseCase,
  ICreateReminderUseCaseInput,
  ICreateReminderUseCaseResponse,
};

interface ICreateReminderUseCaseInput extends ICreateReminderDTO {}

interface ICreateReminderUseCaseResponse {
  id: string;
  description: string;
  city: string | null;
  date: Date;
  created_at: Date;
}

interface ICreateReminderUseCase {
  execute: (
    data: ICreateReminderUseCaseInput,
  ) => Promise<ICreateReminderUseCaseResponse>;
}
