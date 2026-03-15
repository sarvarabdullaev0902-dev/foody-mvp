'use client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons broken by webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const CAT_COLORS: Record<string, { bg: string; icon: string }> = {
  cafe:        { bg: '#a855f7', icon: '☕' },
  bakery:      { bg: '#eab308', icon: '🥐' },
  restaurant:  { bg: '#ef4444', icon: '🍽️' },
  supermarket: { bg: '#3b82f6', icon: '🛒' },
  pharmacy:    { bg: '#22c55e', icon: '💊' },
  store:       { bg: '#f97316', icon: '🏪' },
};

function buildIcon(category: string) {
  const c = CAT_COLORS[category] ?? { bg: '#E8594F', icon: '📍' };
  return L.divIcon({
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer">
        <div style="
          width:40px;height:40px;border-radius:50%;
          background:${c.bg};border:2.5px solid white;
          box-shadow:0 2px 10px rgba(0,0,0,0.3);
          display:flex;align-items:center;justify-content:center;
          font-size:18px;
        ">${c.icon}</div>
        <div style="
          width:8px;height:8px;background:${c.bg};
          transform:rotate(45deg);margin-top:-5px;
          box-shadow:1px 1px 3px rgba(0,0,0,0.25);
        "></div>
      </div>`,
    className: '',
    iconSize:   [52, 58],
    iconAnchor: [26, 58],
  });
}

interface ListingMapProps {
  lat:      number;
  lng:      number;
  category: string;
}

export default function ListingMap({ lat, lng, category }: ListingMapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      zoomControl
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} icon={buildIcon(category)} />
    </MapContainer>
  );
}
