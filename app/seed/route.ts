import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { doctors, patients, meetings } from '../lib/placeholder-data';

// Conectar a la base de datos
const client = await db.connect();

// Crear la tabla 'doctor'
async function seedDoctors() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS doctor (
        id_doctor SERIAL PRIMARY KEY,
        firstname VARCHAR(100) NOT NULL,
        pat_surname VARCHAR(30),
        mat_surname VARCHAR(30),
        address VARCHAR(300) NOT NULL,
        phone VARCHAR(10) NOT NULL,
        email VARCHAR(50) UNIQUE,
        username VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;
  
    const insertedDoctors = await Promise.all(
      doctors.map(async (doctor) => {
        const hashedPassword = await bcrypt.hash(doctor.password, 10);
        return client.sql`
          INSERT INTO doctor (firstname, pat_surname, mat_surname, address, phone, email, username, password)
          VALUES (${doctor.firstname}, ${doctor.pat_surname}, ${doctor.mat_surname}, ${doctor.address}, ${doctor.phone}, ${doctor.email}, ${doctor.username}, ${hashedPassword})
          ON CONFLICT (email) DO NOTHING;
        `;
      })
    );
  
    return insertedDoctors;
  }
  
  // Crear la tabla 'patient'
  async function seedPatients() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS patient (
        id_patient SERIAL PRIMARY KEY,
        firstname VARCHAR(100) NOT NULL,
        pat_surname VARCHAR(30),
        mat_surname VARCHAR(30),
        address VARCHAR(300) NOT NULL,
        phone VARCHAR(10) NOT NULL,
        ref_phone VARCHAR(10) NOT NULL,
        email VARCHAR(50) UNIQUE
      );
    `;
  
    const insertedPatients = await Promise.all(
      patients.map((patient) =>
        client.sql`
          INSERT INTO patient (firstname, pat_surname, mat_surname, address, phone, ref_phone, email)
          VALUES (${patient.firstname}, ${patient.pat_surname}, ${patient.mat_surname}, ${patient.address}, ${patient.phone}, ${patient.ref_phone}, ${patient.email})
          ON CONFLICT (email) DO NOTHING;
        `
      )
    );
  
    return insertedPatients;
  }
  
  // Crear la tabla 'meeting'
  async function seedMeetings() {
    await client.sql`
      CREATE TABLE IF NOT EXISTS meeting (
        id_meeting SERIAL PRIMARY KEY,
        id_doctor INT REFERENCES doctor(id_doctor),
        id_patient INT REFERENCES patient(id_patient),
        date TIMESTAMP NOT NULL,
        anamnesis VARCHAR(200),
        diagnosis TEXT
      );
    `;
  
    const insertedMeetings = await Promise.all(
        meetings.map((meeting) =>
            client.sql`
            INSERT INTO meeting (id_doctor, id_patient, date, anamnesis, diagnosis)
            VALUES (
                ${meeting.id_doctor},
                ${meeting.id_patient},
                ${meeting.date.toISOString().substring(0, 19).replace("T", " ")}, 
                ${meeting.anamnesis}, 
                ${meeting.diagnosis}
            )
            ON CONFLICT (id_meeting) DO NOTHING;
            `
        )
        // En la linea 86 sale error si solamente coloco ${meeting.date}
        // por lo que convierto la fecha en en formato YYYY-MM-DDTHH:MM:SS.sssZ con toISOString()
        // substring(0, 19) recorta la parte de milisegundos y la Z al final del formato
        // y finalmente replace("T", " ") reemplaza la T con un espacio para que sea compatible con SQL
    );
      
    return insertedMeetings;
  }
  
  // Función para inicializar las tablas y poblar con datos de ejemplo
  export async function GET() {
    return Response.json({
      message:
        'Uncomment this file and remove this line. You can delete this file when you are finished.',
    });
    try {
      await client.sql`BEGIN`;
      await seedDoctors();
      await seedPatients();
      await seedMeetings();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }
  