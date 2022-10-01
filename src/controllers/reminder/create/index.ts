import { ReminderRepository } from '@reminders/repositories/implementations/ReminderRepository';
import { CreateReminderUseCase } from '@reminders/useCases/implementations/CreateReminderUseCase';
import { CreateReminderController } from './CreateReminderController';

export { controller as CreateReminderController };

const repository = new ReminderRepository();
const useCase = new CreateReminderUseCase(repository);
const controller = new CreateReminderController(useCase);
