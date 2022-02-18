export class EventModel {
  constructor(
    public eventId: number,
    public volunteerMax: number,
    public currentVolunteerCount: number,
    public cause: 'Education' | 'Food Drive' | 'Water Collection' | 'Environmental Work',
    public location: string,
    public date: Date,
    public isRegistered: boolean = false
  ) {}

  isEqual(event: EventModel): boolean {
    return (
      this.eventId === event.eventId &&
      this.volunteerMax === event.volunteerMax &&
      this.currentVolunteerCount === event.currentVolunteerCount &&
      this.cause === event.cause &&
      this.location === event.location &&
      this.date === event.date &&
      this.isRegistered === event.isRegistered
    );
  }
}
