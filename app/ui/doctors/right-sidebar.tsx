import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DatePicker from "react-datepicker";


interface RightSidebarProps {
  selectedPerson: string | null;
  onEventClick: (eventTitle: string) => void;
}

const events = [
  { id: 1, title: 'Evento 1', date: new Date('2024-01-01T00:00:00Z') },
  { id: 2, title: 'Evento 2', date: new Date('2024-01-05T00:00:00Z') },
  { id: 3, title: 'Evento 3', date: new Date('2024-01-10T00:00:00Z') },
];

export default function RightSidebar({ selectedPerson, onEventClick }: RightSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Filtra eventos por título y fecha
  const filteredEvents = events.filter((event) => {
    const matchesTitle = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate ? event.date.toDateString() === selectedDate.toDateString() : true;
    return matchesTitle && matchesDate;
  });

  return (
    <div className="w-3/12 bg-gray-100 p-4 overflow-y-auto h-full border-l border-gray-300">
      <h3 className="text-lg font-semibold mb-4">Eventos</h3>

      {/* Contenedor de buscadores */}
      <div className="flex space-x-2 mb-4">
        {/* Campo de búsqueda por título */}
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded"
        />

        {/* Selector de fecha como botón */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          customInput={
            <button className="flex items-center justify-center p-2 border rounded bg-white">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
            </button>
          }
          dateFormat="yyyy-MM-dd"
          popperPlacement="bottom-start"
        />

        {/* Botón de limpiar fecha */}
        {selectedDate && (
          <button
            onClick={() => setSelectedDate(null)}
            className="p-2 border rounded bg-white flex items-center justify-center"
            title="Limpiar filtro de fecha"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      {selectedPerson ? (
        <div>
          <h4 className="text-md font-semibold mb-2">{`Eventos de ${selectedPerson}`}</h4>
          <ul>
            {filteredEvents.map((event) => (
              <li
                key={event.id}
                onClick={() => onEventClick(event.title)}
                className="mb-2 p-2 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
              >
                <h5 className="font-medium">{event.title}</h5>
                <p className="text-gray-500 text-sm">
                  {event.date.toLocaleDateString('es-ES', {
                    timeZone: 'UTC',
                    weekday: 'short',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">Seleccione una persona para ver sus eventos.</p>
      )}
    </div>
  );
}