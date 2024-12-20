import { sql } from '@vercel/postgres';
import { FilteredPatientsTable, MeetingDetails, FilteredMeetingsTable } from './definitions';

// export async function fetchFilteredPatients( query: string ) {
//   try{
//     const patients = await sql<FilteredPatientsTable>`
//       SELECT
//         patient.id_patient AS id,
//         CONCAT(
//           patient.firstname, " ",
//           patient.pat_surname, " ",
//           patient.mat_surname
//         ) AS fullname,
//         patient.image_url AS image
//       FROM patients
//       WHERE
//         patient.firstname ILIKE ${`%${query}%`} OR
//         patient.pat_surname ILIKE ${`%${query}%`} OR
//         patient.mat_surname ILIKE ${`%${query}%`}
//       ORDER BY fullname ASC
//     `;
//     return patients.rows
//   } catch (error ){
//     console.error('Database Error:', error);
//     throw new Error('Fallo al obtener la lista de pacientes.');
//   }
// }

// export async function fetchFilteredPatients(patientQuery: string) {
//   try {
//     let patients;
//     if (patientQuery) {
//       // Filtra los pacientes por el nombre o apellido cuando se proporciona patientQuery
//       patients = await sql<FilteredPatientsTable>`
//         SELECT
//           patients.id_patient AS id,
//           CONCAT(
//             patients.firstname, ' ',
//             patients.pat_surname, ' ',
//             patients.mat_surname
//           ) AS fullname,
//           patients.image_url AS image
//         FROM patients
//         WHERE
//           patients.firstname ILIKE ${`%${patientQuery}%`} OR
//           patients.pat_surname ILIKE ${`%${patientQuery}%`} OR
//           patients.mat_surname ILIKE ${`%${patientQuery}%`}
//         ORDER BY fullname ASC;
//       `;
//     } else {
//       // Devuelve todos los pacientes si no hay búsqueda
//       patients = await sql<FilteredPatientsTable>`
//         SELECT
//           patients.id_patient AS id,
//           CONCAT(
//             patients.firstname, ' ',
//             patients.pat_surname, ' ',
//             patients.mat_surname
//           ) AS fullname,
//           patients.image_url AS image
//         FROM patients
//         ORDER BY fullname ASC;
//       `;
//     }
//     return patients.rows
//   } catch (error) {
//     console.error('Error al obtener pacientes:', error);
//     throw new Error('No se pudo obtener la lista de pacientes');
//   }
// }

// export async function fetchFilteredMeetings({
//   eventQuery,
//   dateQuery,
// }: {
//   eventQuery?: string;
//   dateQuery?: string;
// }) {
//   try {
//     let events;

//     if (eventQuery) {
//       // Si eventQuery está presente, hacemos la búsqueda por texto
//       events = await sql<FilteredMeetingsTable>`
//         SELECT 
//           meeting.id_meeting AS id,
//           meeting.date,
//           meetimg.anamnesis
//         FROM meetings
//         WHERE meeting.anamnesis ILIKE ${`%${eventQuery}%`}
//         ORDER BY date ASC;
//       `;
//     } else if (dateQuery) {
//       // Si dateQuery está presente, hacemos la búsqueda por fecha
//       events = await sql<FilteredMeetingsTable>`
//         SELECT 
//           meeting.id_meeting AS id,
//           meeting.date,
//           meetimg.anamnesis
//         FROM meetings
//         WHERE TO_CHAR(date, 'DDMMYYYY') = ${dateQuery}
//         ORDER BY date ASC;
//       `;
//     } else {
//       // Si no hay ningún parámetro, devolvemos todos los eventos por defecto
//       events = await sql<FilteredMeetingsTable>`
//         SELECT 
//           meeting.id_meeting AS id,
//           meeting.date,
//           meetimg.anamnesis
//         FROM meetings
//         ORDER BY date ASC;
//       `;
//     }

//     return events.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Fallo al obtener la lista de pacientes.');
//   }
// }

// export async function fetchFilteredMeetings(patientId: string, query: string, date: string) {
//   try {
//     let meetings
//     if (date) {
//       // Filtra las reuniones por fecha
//       meetings = await sql<FilteredMeetingsTable>`
//         SELECT
//           meetings.id_meeting AS id,
//           meetings.date AS date,
//           meetings.anamnesis AS anamnesis
//         FROM meetings
//         WHERE meetings.id_patient = ${patientId} AND TO_CHAR(date, 'DDMMYYYY') = ${date}
//         ORDER BY date DESC;
//       `;
//     } else if (query) {
//       // Filtra las reuniones por el término de búsqueda
//       meetings = await sql<FilteredMeetingsTable>`
//         SELECT
//           meetings.id_meeting AS id,
//           meetings.date AS date,
//           meetings.anamnesis AS anamnesis
//         FROM meetings
//         WHERE meetings.id_patient = ${patientId} AND meetings.anamnesis ILIKE ${`%${query}%`}
//         ORDER BY date DESC;
//       `;
//     } else {
//       // Devuelve todas las reuniones si no hay búsqueda
//       meetings = await sql<FilteredMeetingsTable>`
//         SELECT
//           meetings.id_meeting AS id,
//           meetings.date AS date,
//           meetings.anamnesis AS anamnesis
//         FROM meetings
//         WHERE meetings.id_patient = ${patientId}
//         ORDER BY date DESC;
//       `;
//     }
//     return meetings.rows;
//   } catch (error) {
//     console.error('Error al obtener las consultas:', error);
//     throw new Error('No se pudo obtener la lista de consultas.');
//   }
// }

// export async function fetchMeetingDetailsById( meetingQuery: string ) {
//   try{
//     const details = await sql<MeetingDetails>`
//       SELECT
//         meeting.id_meeting AS id,
//         CONCAT(
//           patient.firstname, " ",
//           patient.pat_surname, " ",
//           patient.mat_surname
//         ) AS fullname, 
//         meeting.date AS date, 
//         meeting.anamnesis AS anamnesis, 
//         meeting.diagnosis AS diagnosis
//       FROM meetings
//       JOIN patients ON meeting.id_patient = patient.id_patient
//       WHERE meeting.anamnesis = ${meetingQuery};
//     `;
//     return details.rows[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Fallo al obtener los detalles de la consulta.');
//   }
// }

// export async function fetchMeetingDetails(patientId: string, meetingId: string) {
//   if (!patientId || !meetingId) return null; // Si falta algún parámetro, no hacer la consulta

//   try {
//     const details = await sql<MeetingDetails>`
//       SELECT
//         patients.name AS patient_name,
//         patients.id_patient AS patient_id,
//         meetings.date AS meeting_date,
//         meetings.anamnesis,
//         meetings.diagnosis
//       FROM meetings
//       JOIN patients ON meetings.id_patient = patients.id_patient
//       WHERE patients.id_patient = ${patientId} AND meetings.id_meeting = ${meetingId}
//     `;
    
//     return details.rows[0] || null; // Devuelve el primer resultado o null si no hay datos
//   } catch (error) {
//     console.error("Error al obtener los detalles de la reunión:", error);
//     throw new Error("Fallo al obtener los detalles de la reunión.");
//   }
// }

export async function fetchFilteredPatients(patientQuery: string) {
  try {
    const patients = patientQuery
      ? await sql<FilteredPatientsTable>`
          SELECT
            patients.id_patient AS id,
            CONCAT(
              patients.firstname, ' ',
              patients.pat_surname, ' ',
              COALESCE(patients.mat_surname, '')
            ) AS fullname,
            patients.image_url AS image
          FROM patients
          WHERE 
            patients.firstname ILIKE ${`%${patientQuery}%`} OR
            patients.pat_surname ILIKE ${`%${patientQuery}%`} OR
            patients.mat_surname ILIKE ${`%${patientQuery}%`}
          ORDER BY fullname ASC
        `
      : await sql<FilteredPatientsTable>`
          SELECT
            patients.id_patient AS id,
            CONCAT(
              patients.firstname, ' ',
              patients.pat_surname, ' ',
              COALESCE(patients.mat_surname, '')
            ) AS fullname,
            patients.image_url AS image
          FROM patients
          ORDER BY fullname ASC
        `;

    return patients.rows;
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    throw new Error('No se pudo obtener la lista de pacientes');
  }
}

export async function fetchFilteredMeetings(
  patientId: string,
  query: string,
  date: string
) {
  try {
    if (!patientId) return [];

    let queryString = '';
    let queryParams: any[] = [patientId];

    if (date && query) {
      return await sql<FilteredMeetingsTable>`
        SELECT
          meetings.id_meeting AS id,
          meetings.date AS date,
          meetings.anamnesis AS anamnesis
        FROM meetings
        WHERE 
          meetings.id_patient = ${patientId}
          AND TO_CHAR(date, 'DDMMYYYY') = ${date}
          AND meetings.anamnesis ILIKE ${`%${query}%`}
        ORDER BY date DESC
      `;
    } else if (date) {
      return await sql<FilteredMeetingsTable>`
        SELECT
          meetings.id_meeting AS id,
          meetings.date AS date,
          meetings.anamnesis AS anamnesis
        FROM meetings
        WHERE 
          meetings.id_patient = ${patientId}
          AND TO_CHAR(date, 'DDMMYYYY') = ${date}
        ORDER BY date DESC
      `;
    } else if (query) {
      return await sql<FilteredMeetingsTable>`
        SELECT
          meetings.id_meeting AS id,
          meetings.date AS date,
          meetings.anamnesis AS anamnesis
        FROM meetings
        WHERE 
          meetings.id_patient = ${patientId}
          AND meetings.anamnesis ILIKE ${`%${query}%`}
        ORDER BY date DESC
      `;
    }

    const meetings = await sql<FilteredMeetingsTable>`
      SELECT
        meetings.id_meeting AS id,
        meetings.date AS date,
        meetings.anamnesis AS anamnesis
      FROM meetings
      WHERE meetings.id_patient = ${patientId}
      ORDER BY date DESC
    `;

    return meetings.rows;
  } catch (error) {
    console.error('Error al obtener las consultas:', error);
    throw new Error('No se pudo obtener la lista de consultas.');
  }
}

export async function fetchMeetingDetails(patientId: string, meetingId: string) {
  if (!patientId || !meetingId) return null;

  try {
    const details = await sql<MeetingDetails>`
      SELECT
        CONCAT(
          patients.firstname, ' ',
          patients.pat_surname, ' ',
          COALESCE(patients.mat_surname, '')
        ) AS fullname,
        patients.id_patient AS patient_id,
        meetings.date AS date,
        meetings.anamnesis,
        meetings.diagnosis
      FROM meetings
      JOIN patients ON meetings.id_patient = patients.id_patient
      WHERE 
        patients.id_patient = ${patientId} 
        AND meetings.id_meeting = ${meetingId}
    `;
    
    return details.rows[0] || null;
  } catch (error) {
    console.error("Error al obtener los detalles de la reunión:", error);
    throw new Error("Fallo al obtener los detalles de la reunión.");
  }
}
