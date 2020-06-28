import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeApointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 28, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 28, 13),
      user_id: '121212',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(20, 6, 19, 10);

    createAppointment.execute({
      date: appointmentDate,
      user_id: '121212',
      provider_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '121212',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 28, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 28, 10),
        user_id: '121212',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 28, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 28, 12),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 28, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 29, 7),
        user_id: '121212',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 29, 18),
        user_id: '121212',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
