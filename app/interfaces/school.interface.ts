import { SCHOOL } from '../constants/school.constant';

export interface ISchool {
  id: string;
  sch_avatar: string;
  sch_name: string;
  sch_slug: string;
  sch_type: Values<typeof SCHOOL.TYPE>['slug'];
  sch_model: Values<typeof SCHOOL.PROGRAM>['slug'];
  sch_address: {
    province: string;
    district: string;
    street: string;
  };
  sch_age: {
    from: string;
    to: string;
  };
  sch_tuition: {
    from: number;
    to: number;
  };
}

export interface ISchoolDetail extends ISchool {
  sch_program: Values<typeof SCHOOL.PROGRAM>['slug'];
  sch_information: {
    introduction?: string;
    infrastructure?: string;
    service?: string;
    curriculum?: string;
    workforce?: string;
    policy?: string;
  };
  sch_contact: {
    email: string;
    msisdn: string;
    facebook?: string;
    instagram?: string;
    website?: string;
    map: string;
  };
  updatedAt: string;
  createdAt: string;
}
