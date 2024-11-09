'use client'

import { useState } from 'react'
import LeftSidebar from '@/app/ui/doctors/left-sidebar'
import MainContent from '@/app/ui/doctors/main-content'
import RightSidebar from '@/app/ui/doctors/right-sidebar'

export default function Page() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handlePersonClick = (name: string) => {
    setSelectedPerson(name);
    setSelectedEvent(null); // Reset event when a new person is selected
  };

  const handleEventClick = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
  };

  return (
    <main className="flex w-full h-full">
      <LeftSidebar onPersonClick={handlePersonClick} />
      <RightSidebar selectedPerson={selectedPerson} onEventClick={handleEventClick} />
      <MainContent selectedEvent={selectedEvent} />
    </main>
  );
}