'use client'

// import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import DatePicker from "react-datepicker";
// import { fetchMeetingsByPatientId } from "@/app/lib/data";
// import { RightSidebarMeetingsTable } from "@/app/lib/definitions";
// import Search from "../components/search";

// interface RightSidebarProps {
//   selectedPerson: string | null;
//   onEventClick: (eventTitle: string) => void;
// }

// const events = [
//   { id: 1, title: 'Evento 1', date: new Date('2024-01-01T00:00:00Z') },
//   { id: 2, title: 'Evento 2', date: new Date('2024-01-05T00:00:00Z') },
//   { id: 3, title: 'Evento 3', date: new Date('2024-01-10T00:00:00Z') },
// ];

// export default function RightSidebar({ selectedPerson, onEventClick }: RightSidebarProps) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   // Filtra eventos por título y fecha
//   const filteredEvents = events.filter((event) => {
//     const matchesTitle = event.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesDate = selectedDate ? event.date.toDateString() === selectedDate.toDateString() : true;
//     return matchesTitle && matchesDate;
//   });

//   return (
//     <div className="w-3/12 bg-gray-100 p-4 overflow-y-auto h-full border-l border-gray-300">
//       <h3 className="text-lg font-semibold mb-4">Eventos</h3>

//       {/* Contenedor de buscadores */}
//       <div className="flex space-x-2 mb-4">
//         {/* Campo de búsqueda por título */}
//         <input
//           type="text"
//           placeholder="Buscar eventos..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-grow p-2 border rounded"
//         />

//         {/* Selector de fecha como botón */}
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           customInput={
//             <button className="flex items-center justify-center p-2 border rounded bg-white">
//               <CalendarIcon className="h-5 w-5 text-gray-500" />
//             </button>
//           }
//           dateFormat="yyyy-MM-dd"
//           popperPlacement="bottom-start"
//         />

//         {/* Botón de limpiar fecha */}
//         {selectedDate && (
//           <button
//             onClick={() => setSelectedDate(null)}
//             className="p-2 border rounded bg-white flex items-center justify-center"
//             title="Limpiar filtro de fecha"
//           >
//             <XMarkIcon className="h-5 w-5 text-gray-500" />
//           </button>
//         )}
//       </div>

//       {selectedPerson ? (
//         <div>
//           <h4 className="text-md font-semibold mb-2">{`Eventos de ${selectedPerson}`}</h4>
//           <ul>
//             {filteredEvents.map((event) => (
//               <li
//                 key={event.id}
//                 onClick={() => onEventClick(event.title)}
//                 className="mb-2 p-2 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
//               >
//                 <h5 className="font-medium">{event.title}</h5>
//                 <p className="text-gray-500 text-sm">
//                   {event.date.toLocaleDateString('es-ES', {
//                     timeZone: 'UTC',
//                     weekday: 'short',
//                     day: '2-digit',
//                     month: '2-digit',
//                     year: 'numeric'
//                   })}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p className="text-gray-500">Seleccione una persona para ver sus eventos.</p>
//       )}
//     </div>
//   );
// }

// import { SearchMeeting } from "../components/search";
// import { fetchFilteredMeetings } from "@/app/lib/data";
// import DatePicker from "react-datepicker";
// import { useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";

// // Props recibidos: patientId, meetingQuery y dateQuery
// export default async function RightSidebar({
//   patientId,
//   meetingQuery,
//   dateQuery,
// }: {
//   patientId: string;
//   meetingQuery: string;
//   dateQuery: string;
// }) {
//   const [startDate, setStartDate] = useState<Date | null>(null);
  
//   const meetings = await fetchFilteredMeetings(patientId, meetingQuery, dateQuery);

//   return (
//     <div className="w-2/12 bg-gray-200 p-4 overflow-y-auto h-full">
//       <div className="flex items-center mb-4 space-x-2">
//         {/* Campo de búsqueda */}
//         <SearchMeeting placeholder="Buscar consulta..." queryParam="meetingQuery" />

//         {/* Botón para seleccionar fecha */}
//         <DatePicker
//           selected={startDate}
//           onChange={(date: Date | null) => {
//             setStartDate(date);
//             if (date) {
//               const formattedDate = date.toLocaleDateString("es-ES", {
//                 day: "2-digit",
//                 month: "2-digit",
//                 year: "numeric",
//               }).replace(/\D/g, ""); // Formatea como ddmmyyyy
//               updateURL("dateQuery", formattedDate);
//               clearURL("meetingQuery");
//             } else {
//               clearURL("dateQuery");
//             }
//           }}
//           placeholderText="Seleccionar fecha"
//           className="p-2 border rounded w-full"
//         />

//         {/* Botón "Cancelar" */}
//         {dateQuery && (
//           <button
//             onClick={() => {
//               setStartDate(null);
//               clearURL("dateQuery");
//             }}
//             className="p-2 border rounded text-red-500"
//           >
//             Cancelar
//           </button>
//         )}
//       </div>

//       {/* Lista de reuniones */}
//       <ul>
//         {meetings.map((meeting) => (
//           <li key={meeting.id} className="mb-2 p-2 bg-white rounded-lg shadow">
//             <p><strong>Fecha:</strong> {new Date(meeting.date).toLocaleDateString()}</p>
//             <p><strong>Anamnesis:</strong> {meeting.anamnesis}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function updateURL(queryParam: string, value: string) {
//   const { replace } = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
  
//   const params = new URLSearchParams(searchParams);
//   params.set(queryParam, value);
//   replace(`${pathname}?${params.toString()}`);
// }

// function clearURL(queryParam: string) {
//   const { replace } = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
  
//   const params = new URLSearchParams(searchParams);
//   params.delete(queryParam);
//   replace(`${pathname}?${params.toString()}`);
// }

'use client'
import { SearchMeeting } from "../components/search";
import { fetchFilteredMeetings } from "@/app/lib/data";
import { FilteredMeetingsTable } from "@/app/lib/definitions";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function RightSidebar({
  patientId,
  meetingQuery,
  dateQuery,
}: {
  patientId: string;
  meetingQuery: string;
  dateQuery: string;
}) {
  const [startDate, setStartDate] = useState<Date | null>(
    dateQuery ? new Date(
      parseInt(dateQuery.slice(4,8)), 
      parseInt(dateQuery.slice(2,4)) - 1, 
      parseInt(dateQuery.slice(0,2))
    ) : null
  );
  
  // Aquí está la corrección principal: tipamos el estado meetings
  const [meetings, setMeetings] = useState<FilteredMeetingsTable[]>([]);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadMeetings = async () => {
      if (patientId) {
        const response = await fetchFilteredMeetings(patientId, meetingQuery, dateQuery);
        // Asegurémonos de que estamos usando .rows si es un QueryResult
        setMeetings(Array.isArray(response) ? response : response.rows);
      }
    };
    loadMeetings();
  }, [patientId, meetingQuery, dateQuery]);

  const updateURL = (queryParam: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryParam, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearURL = (queryParam: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(queryParam);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-2/12 bg-gray-200 p-4 overflow-y-auto h-full">
      <div className="flex flex-col gap-4 mb-4">
        <SearchMeeting placeholder="Buscar consulta..." queryParam="meetingQuery" />
        <div className="flex gap-2">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => {
              setStartDate(date);
              if (date) {
                const formattedDate = date.toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).split('/').join('');
                updateURL("dateQuery", formattedDate);
                clearURL("meetingQuery");
              } else {
                clearURL("dateQuery");
              }
            }}
            placeholderText="Seleccionar fecha"
            className="p-2 border rounded w-full"
            dateFormat="dd/MM/yyyy"
          />
          {dateQuery && (
            <button
              onClick={() => {
                setStartDate(null);
                clearURL("dateQuery");
              }}
              className="p-2 border rounded text-red-500 hover:bg-red-50"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
      <ul>
        {meetings.map((meeting) => (
          <li 
            key={meeting.id} 
            className="mb-2 p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => updateURL("meetingId", meeting.id.toString())}
          >
            <p><strong>Fecha:</strong> {new Date(meeting.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600 truncate">
              <strong>Anamnesis:</strong> {meeting.anamnesis}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
