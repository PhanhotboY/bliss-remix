export interface ISessionUser {
  user: {
    id: string;
    usr_firstName: string;
    usr_lastName: string;
    usr_email: string;
    usr_msisdn: string;
  };
  tokens: { accessToken: string; refreshToken: string };
}
