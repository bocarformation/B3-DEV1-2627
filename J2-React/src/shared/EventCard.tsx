import { formatDate, type EventItem } from './events-api';

// Composant de PRÉSENTATION : il ne connaît ni l'API, ni le state. Il reçoit tout en props.
type Props = {
  event: EventItem;
  booked: boolean; // est-ce que JE l'ai réservé ?
  onBook: (eventId: string) => void;
  onCancel: (eventId: string) => void;
};

export function EventCard({ event, booked, onBook, onCancel }: Props) {
  // État DÉRIVÉ : calculé à chaque rendu, jamais stocké dans un useState.
  const remaining = event.capacity - event.booked - (booked ? 1 : 0);
  const full = remaining <= 0;

  return (
    <li className="card">
      <div>
        <strong>{event.title}</strong>
        <div className="muted">
          {event.city} · {formatDate(event.date)}
        </div>
      </div>
      <div className="row">
        <span className={full ? 'tag danger' : 'tag'}>{remaining} place(s)</span>
        {booked ? (
          <button onClick={() => onCancel(event.id)}>Annuler</button>
        ) : (
          <button disabled={full} onClick={() => onBook(event.id)}>
            {full ? 'Complet' : 'Réserver'}
          </button>
        )}
      </div>
    </li>
  );
}
