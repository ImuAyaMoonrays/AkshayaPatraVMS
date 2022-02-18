import { EventModel } from '../models/event.model';

export class PrototypeConstants {
  static EVENTS = [
    new EventModel(0, 30, 13, 'Education', 'Jaipur, India', new Date(2022, 2, 22)),
    new EventModel(1, 15, 11, 'Food Drive', 'Jaipur, India', new Date(2022, 5, 12)),
    new EventModel(2, 50, 33, 'Food Drive', 'Bangalore, India', new Date(2022, 6, 16)),
    new EventModel(3, 15, 11, 'Water Collection', 'Mumbai, India', new Date(2022, 8, 11)),
    new EventModel(4, 5, 4, 'Education', 'Hyderabad, India', new Date(2022, 9, 29)),
    new EventModel(5, 10, 8, 'Environmental Work', 'Kolkata, India', new Date(2022, 10, 30)),
  ];
}
