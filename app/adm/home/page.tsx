import LeftSidebar from '@/app/ui/doctors/left-sidebar'
import MainContent from '@/app/ui/doctors/main-content'
import RightSidebar from '@/app/ui/doctors/right-sidebar'
import { notFound } from 'next/navigation';

// export default async function Page({
//   searchParams
// }: {
//   searchParams?: {
//     query?: string
//     // otro query?: string
//   }
// }) {
//   const query = searchParams?.query || ''
//   const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
//   const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

//   const handlePersonClick = (name: string) => {
//     setSelectedPerson(name);
//     setSelectedEvent(null); // Reset event when a new person is selected
//   };

//   const handleEventClick = (eventTitle: string) => {
//     setSelectedEvent(eventTitle);
//   };

//   return (
//     <main className="flex w-full h-full">
//       <LeftSidebar query={query} />
//       <RightSidebar selectedPerson={selectedPerson} onEventClick={handleEventClick} />
//       <MainContent selectedEvent={selectedEvent} />
//     </main>
//   );
// }

// export default async function Page({
//   searchParams
// }: {
//   searchParams?: {
//     patientQuery?: string;
//     meetingQuery?: string;
//     dateQuery?: string;
//     patientId?: string;
//     meetingId?: string;
//   };
// }) {
//   const patientQuery = await searchParams?.patientQuery || '';
//   const meetingQuery = await searchParams?.meetingQuery || '';
//   const dateQuery = await searchParams?.dateQuery || '';
//   const patientId = await searchParams?.patientId || '';
//   const meetingId = await searchParams?.meetingId || '';

//   return (
//     <main className="flex w-full h-full">
//       <LeftSidebar patientQuery={patientQuery} />
//       {/* Pasamos patientId, meetingQuery y dateQuery a RightSidebar */}
//       <RightSidebar patientId={patientId} meetingQuery={meetingQuery} dateQuery={dateQuery} />
//       {/* Pasamos patientId a MainContent para mostrar los detalles */}
//       <MainContent patientId={patientId} meetingId={meetingId} />
//     </main>
//   );
// }

// page.tsx

export default function Page({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  return (
    <main className="flex w-full h-full">
      <LeftSidebar patientQuery={searchParams?.patientQuery || ''} />
      {/* Pasamos patientId, meetingQuery y dateQuery a RightSidebar */}
      <RightSidebar
        patientId={searchParams?.patientId || ''}
        meetingQuery={searchParams?.meetingQuery || ''}
        dateQuery={searchParams?.dateQuery || ''}
      />
      {/* Pasamos patientId a MainContent para mostrar los detalles */}
      <MainContent
        patientId={searchParams?.patientId || ''}
        meetingId={searchParams?.meetingId || ''}
      />
    </main>
  );
}

// page.tsx

// export default async function Page({
//   searchParams,
// }: {
//   searchParams?: {
//     patientQuery?: string;
//     meetingQuery?: string;
//     dateQuery?: string;
//     patientId?: string;
//     meetingId?: string;
//   };
// }) {
//   const { patientQuery, meetingQuery, dateQuery, patientId, meetingId } = searchParams || {};

//   // Si falta algún parámetro, mostramos un error 404
//   if (!patientId || !meetingId) {
//     return notFound();
//   }

//   return (
//     <main className="flex w-full h-full">
//       <LeftSidebar patientQuery={patientQuery || ''} />
//       <RightSidebar patientId={patientId} meetingQuery={meetingQuery || ''} dateQuery={dateQuery || ''} />
//       <MainContent patientId={patientId} meetingId={meetingId} />
//     </main>
//   );
// }
