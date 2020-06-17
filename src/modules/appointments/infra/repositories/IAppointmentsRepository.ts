/** Métodos que o repositório Appointments precisa ter */
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IApppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
