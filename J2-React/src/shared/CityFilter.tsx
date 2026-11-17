import { CITIES } from './events-api';

type Props = { value: string; onChange: (city: string) => void };

export function CityFilter({ value, onChange }: Props) {
  return (
    <label className="row">
      Ville :
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {CITIES.map((c) => (
          <option key={c} value={c}>
            {c === '' ? 'Toutes' : c === 'Atlantis' ? 'Atlantis (erreur simulée)' : c}
          </option>
        ))}
      </select>
    </label>
  );
}
