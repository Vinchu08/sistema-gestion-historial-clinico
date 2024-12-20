const doctors = [
    {
      firstname: "Juan",
      pat_surname: "Pérez",
      mat_surname: "López",
      address: "Calle Falsa 123, Ciudad",
      phone: "1234567890",
      email: "juan.perez@example.com",
      image_url: "http://localhost:3000/public/patients/chico1.png",
      username: "juanperez",
      password: "password123", // La contraseña se debe cifrar antes de insertar en la base de datos
    },
    {
      firstname: "María",
      pat_surname: "González",
      mat_surname: null, // Apellido materno opcional
      address: "Avenida Siempre Viva 742, Ciudad",
      phone: "0987654321",
      email: "maria.gonzalez@example.com",
      image_url: "http://localhost:3000/public/patients/chica1.png",
      username: "mariagonzalez",
      password: "securepass456",
    },
  ];
  
  const patients = [
    {
      firstname: "Carlos",
      pat_surname: "Ramírez",
      mat_surname: "Martínez",
      address: "Calle Luna 45, Ciudad",
      phone: "2345678901",
      ref_phone: "3456789012",
      email: "carlos.ramirez@example.com",
      image_url: "http://localhost:3000/public/patients/chico2.png"
    },
    {
      firstname: "Ana",
      pat_surname: "Sánchez",
      mat_surname: null, // Apellido materno opcional
      address: "Calle Sol 67, Ciudad",
      phone: "4567890123",
      ref_phone: "5678901234",
      email: "ana.sanchez@example.com",
      image_url: "http://localhost:3000/public/patients/chica2.png"
    },
  ];
  
  const meetings = [
    {
      id_doctor: 1, // Relacionado con un doctor existente
      id_patient: 1, // Relacionado con un paciente existente
      date: new Date("2023-07-01T10:00:00"), // Fecha y hora de la reunión
      anamnesis: "Dolor de cabeza persistente desde hace una semana.",
      diagnosis: "Migraña crónica. Se recomienda tratamiento con analgésicos.",
    },
    {
      id_doctor: 2,
      id_patient: 2,
      date: new Date("2023-07-02T14:30:00"),
      anamnesis: "Dolor en la pierna derecha tras una caída.",
      diagnosis: "Contusión en la pierna derecha. Reposo y aplicación de hielo.",
    },
  ];

  export { doctors, patients, meetings };
