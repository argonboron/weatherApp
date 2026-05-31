import './CitySelect.css';

const CITIES = [
  'Melbourne',
  'Edinburgh',
  'Brisbane',
  'New York',
  'London',
  'Sydney',
  'Paris',
  'Tokyo',
  'Sydney',
  'Berlin',
  'Toronto',
  'San Francisco',
  'Singapore',
  'Cape Town',
  'Dubai',
  'Hong Kong',
  'Barcelona',
  'Rome',
  'Istanbul',
];

interface CitySelectProps {
  readonly value: string;
  readonly onChange: (city: string) => void;
}

export default function CitySelect({ value, onChange }: CitySelectProps) {
  return (
    <div className="city-select-container">
      <label className="city-select-label" htmlFor="city-select-input">
        Select a City
      </label>
      <input
        id="city-select-input"
        className="city-select-input"
        type="text"
        list="city-list"
        placeholder="Search cities..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      <datalist id="city-list">
        {CITIES.map((city) => (
          <option value={city} key={city} />
        ))}
      </datalist>
    </div>
  );
}
