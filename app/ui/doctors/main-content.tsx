// interface MainContentProps {
//   selectedEvent: string | null;
// }

// import { fetchMeetingDetailsById } from "@/app/lib/data";
// import { MeetingDetails } from "@/app/lib/definitions";

// const eventDescriptions: { [key: string]: string } = {
//   'Evento 1': 'En el Evento 1, sucedió algo muy importante. Fue un día de muchos descubrimientos y aprendizajes.',
//   'Evento 2': 'El Evento 2 fue crucial para el desarrollo de varios proyectos. Se discutieron temas importantes.',
//   'Evento 3': 'Durante el Evento 3, se realizaron actividades de integración y se fomentó la colaboración en equipo.',
// };

// export default function MainContent({ selectedEvent }: MainContentProps) {
//   return (
//     <div className="w-7/12 bg-white p-4 overflow-y-auto h-full">
//       <h1 className="text-2xl font-bold mb-4">Contenido Principal</h1>
//       {selectedEvent ? (
//         <div>
//           <h2 className="text-xl font-semibold mb-2">{selectedEvent}</h2>
//           <p>{eventDescriptions[selectedEvent] || 'No hay descripción disponible para este evento.'}</p>
//         </div>
//       ) : (
//         <p>Seleccione un evento del menú derecho para ver los detalles.</p>
//       )}
//     </div>
//   );
// }

// MainContent.tsx
import { fetchMeetingDetails } from "@/app/lib/data";

export default async function MainContent({
  patientId,
  meetingId,
}: {
  patientId: string;
  meetingId: string;
}) {
  // Obtiene los detalles de la reunión
  const details = await fetchMeetingDetails(patientId, meetingId);

  if (!details) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500">Seleccione una reunión para ver los detalles.</p>
      </div>
    );
  }

  const { fullname, date, anamnesis, diagnosis } = details;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Detalles de la Reunión</h2>
      <p className="text-lg mb-2"><strong>Nombre del Paciente:</strong> {fullname}</p>
      <p className="text-lg mb-2"><strong>Fecha de la Reunión:</strong> {new Date(date).toLocaleDateString("es-ES")}</p>
      <p className="text-lg mb-2"><strong>Anamnesis:</strong> {anamnesis}</p>
      <p className="text-lg"><strong>Diagnóstico:</strong> {diagnosis}</p>
    </div>
  );
}
