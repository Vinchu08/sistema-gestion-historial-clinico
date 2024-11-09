import { useState } from "react";
import Search from "../components/search";

interface LeftSidebarProps {
  onPersonClick: (name: string) => void;
}

const people = [
  { id: 1, name: 'Person 1', avatar: '/customers/amy-burns.png' },
  { id: 2, name: 'Person 2', avatar: '/customers/balazs-orban.png' },
  { id: 3, name: 'Person 3', avatar: '/customers/delba-de-oliveira.png' },
];

export default function LeftSidebar({ onPersonClick }: LeftSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra las personas en función del término de búsqueda
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-2/12 bg-gray-200 p-4 overflow-y-auto h-full">
      <h3 className="text-lg font-semibold mb-4">Personas</h3>
      
      {/* Campo de búsqueda */}
      <Search placeholder="Buscar pacientes..." />

      <ul>
        {filteredPeople.map((person) => (
          <li
            key={person.id}
            onClick={() => onPersonClick(person.name)}
            className="mb-2 p-2 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-300 transition flex items-center space-x-3"
          >
            <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full" />
            <span>{person.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}