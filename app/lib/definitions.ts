export type PatientsTable = {
  id: number
  firstname: string
  pat_surname: string
  mat_surname: string
  address: string
  phone: string
  ref_phone: string
  email: string
  image_url: string
};

// export type FilteredPatientsTable = {
//   id: number
//   fullname: string
//   image: string
// };

// export type FilteredMeetingsTable = {
//   id: number;
//   date: string;
//   anamnesis: string;
// };

// export type MeetingDetails = {
//   id: number;
//   fullname: string;
//   date: string;
//   anamnesis: string;
//   diagnosis: string;
// };

import { VercelPoolClient } from '@vercel/postgres';

export interface FilteredPatientsTable {
  id: number;
  fullname: string;
  image: string;
}

export interface FilteredMeetingsTable {
  id: number;
  date: string | Date;
  anamnesis: string;
}

export interface MeetingDetails {
  fullname: string;
  patient_id: number;
  date: Date;
  anamnesis: string;
  diagnosis: string;
}

// Tipo auxiliar para los resultados de consultas
export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
  command: string;
  oid: number;
  fields: any[];
}
