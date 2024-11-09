interface MainContentProps {
  selectedEvent: string | null;
}

const eventDescriptions: { [key: string]: string } = {
  'Evento 1': 'En el Evento 1, sucedió algo muy importante. Fue un día de muchos descubrimientos y aprendizajes.',
  'Evento 2': 'El Evento 2 fue crucial para el desarrollo de varios proyectos. Se discutieron temas importantes.',
  'Evento 3': 'Durante el Evento 3, se realizaron actividades de integración y se fomentó la colaboración en equipo.',
};

export default function MainContent({ selectedEvent }: MainContentProps) {
  return (
    <div className="w-7/12 bg-white p-4 overflow-y-auto h-full">
      <h1 className="text-2xl font-bold mb-4">Contenido Principal</h1>
      {selectedEvent ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">{selectedEvent}</h2>
          <p>{eventDescriptions[selectedEvent] || 'No hay descripción disponible para este evento.'}</p>
        </div>
      ) : (
        <p>Seleccione un evento del menú derecho para ver los detalles.</p>
      )}
    </div>
  );
}