import { useState, useRef, useEffect } from 'react';
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
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = CITIES.filter((city) => city.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="city-select-container" ref={ref}>
      <label className="city-select-label" htmlFor="city-select-input">
        Select a City
      </label>
      <input
        id="city-select-input"
        className="city-select-input"
        type="text"
        placeholder="Search cities..."
        value={open ? search : value}
        onFocus={() => {
          setOpen(true);
          setSearch(value);
        }}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
        autoComplete="off"
      />
      {open && (
        <div className="city-dropdown" role="listbox" aria-label="City options">
          {filtered.length === 0 && (
            <div
              className="city-dropdown-option"
              role="option"
              aria-disabled="true"
              aria-selected="false"
              tabIndex={-1}
            >
              No results
            </div>
          )}
          {filtered.map((city, idx) => (
            <div
              key={city}
              role="option"
              aria-selected={city === value}
              tabIndex={0}
              className={'city-dropdown-option' + (city === value ? ' selected' : '')}
              onClick={() => {
                onChange(city);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onChange(city);
                  setOpen(false);
                }
                if (e.key === 'ArrowDown') {
                  const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                  next?.focus();
                }
                if (e.key === 'ArrowUp') {
                  const prev = e.currentTarget.previousElementSibling as HTMLElement | null;
                  prev?.focus();
                }
                if (e.key === 'Escape') {
                  setOpen(false);
                }
              }}
              onTouchStart={() => {
                onChange(city);
                setOpen(false);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
