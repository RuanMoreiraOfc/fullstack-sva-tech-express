import type {
  IReminderRepository,
  IFilterRemindersDTO,
} from '@reminders/repositories/IReminderRepository';
import type {
  IListRemindersUseCase,
  IListRemindersUseCaseInput,
  IListRemindersUseCaseResponse,
} from '@reminders/useCases/IListRemindersUseCase';

export { ListRemindersUseCase };

class ListRemindersUseCase implements IListRemindersUseCase {
  constructor(private readonly repository: IReminderRepository) {}

  async execute({
    date,
    startsAt,
    endsAt,
  }: IListRemindersUseCaseInput): Promise<IListRemindersUseCaseResponse> {
    const reminders = await this.repository.list({
      date,
      startsAt,
      endsAt,
    } as unknown as IFilterRemindersDTO);

    return reminders.map(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ({ id, city, color, created_at, date, description }) => {
        return {
          id,
          description,
          color,
          city,
          date,
          created_at,
        };
      },
    );
  }
}
