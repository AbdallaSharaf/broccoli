'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to handle user click
function LocationMarker({ onSetLocation }) {
  useMapEvents({
    click(e) {
      onSetLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });

  return null;
}

export default function LocationPicker() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`
    );
    const data = await response.json();
    setResults(data);
  };

  const selectLocation = (location) => {
    setSelectedLocation({
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon),
    });
    setQuery(location.display_name);
    setResults([]);
  };

  const handleSave = async () => {
    if (!selectedLocation) return;
    console.log("location",selectedLocation ,`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lon}`)
  //   const res = await fetch('https://your-backend-api.com/api/location', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       userId: 'USER_ID', // Replace this
  //       latitude: selectedLocation.lat,
  //       longitude: selectedLocation.lon,
  //     }),
  //   });

  //   const data = await res.json();
  //   alert(data.message);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search for your address"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        style={{ padding: '8px', width: '100%', marginBottom: '8px' }}
      />

      {results.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, background: '#f9f9f9', border: '1px solid #ccc' }}>
          {results.map((res) => (
            <li
              key={res.place_id}
              onClick={() => selectLocation(res)}
              style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #ddd' }}
            >
              {res.display_name}
            </li>
          ))}
        </ul>
      )}

      <div style={{ height: '400px', marginTop: '10px' }}>
        <MapContainer
          center={[24.7136, 46.6753]} // Riyadh, KSA
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lon]} />
          )}
          <LocationMarker onSetLocation={setSelectedLocation} />
        </MapContainer>
      </div>

      {selectedLocation && (
        <button onClick={handleSave} style={{ marginTop: '12px', padding: '10px 20px' }}>
          Save Location
        </button>
      )}
    </div>
  );
}
