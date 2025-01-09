export interface IBooking {
  id: string;
  bok_name: string;
  bok_email?: string;
  bok_msisdn: string;
  bok_time2Call: string;
  bok_date2Call: string;
  bok_viewed: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface IBookingDetail extends IBooking {
  bok_message: string;
}
