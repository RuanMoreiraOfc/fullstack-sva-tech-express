import { ReminderRepository } from '@reminders/repositories/implementations/ReminderRepository';
import { ListRemindersUseCase } from '@reminders/useCases/implementations/ListRemindersUseCase';
import { ListRemindersController } from './ListRemindersController';

export { controller as ListRemindersController };

const repository = new ReminderRepository();
const useCase = new ListRemindersUseCase(repository);
const controller = new ListRemindersController(useCase);
