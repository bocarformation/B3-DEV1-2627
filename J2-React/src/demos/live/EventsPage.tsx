// LIVE 1 - ÉCRAN DE DÉPART. C'est CE fichier que le formateur modifie en direct.
import { useState } from 'react';
import { fetchEvents, type EventItem } from '../../shared/events-api';
import { EventCard } from '../../shared/EventCard';
import { CityFilter } from '../../shared/CityFilter';

export function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [city, setCity] = useState('');

  // Aujourd'hui on charge au CLIC. Objectif : charger tout seul à l'affichage (useEffect).
  const load = async () => {
    setEvents(await fetchEvents(city));
  };

  return (
    <div>
      <div className="row">
        <CityFilter value={city} onChange={setCity} />
        <button onClick={load}>Charger</button>
      </div>
      <ul className="list">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            booked={false}
            onBook={(id) => console.log('TODO réserver', id)}
            onCancel={(id) => console.log('TODO annuler', id)}
          />
        ))}
      </ul>
    </div>
  );
}
