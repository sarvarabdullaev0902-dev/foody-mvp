'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons broken by webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export type MapSupplier = {
  id:       number;
  name:     string;
  category: string;
  deals:    number;
  distance: string;
  area:     string;
  lat:      number;
  lng:      number;
};

const CAT_COLORS: Record<string, { bg: string; icon: string }> = {
  cafe:        { bg: '#a855f7', icon: '☕' },
  bakery:      { bg: '#eab308', icon: '🥐' },
  restaurant:  { bg: '#ef4444', icon: '🍽️' },
  supermarket: { bg: '#3b82f6', icon: '🛒' },
  pharmacy:    { bg: '#22c55e', icon: '💊' },
};

function buildIcon(category: string, deals: number, selected: boolean) {
  const c    = CAT_COLORS[category] ?? CAT_COLORS.cafe;
  const size = selected ? 44 : 36;
  return L.divIcon({
    html: `
      <div style="position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer">
        <div style="
          width:${size}px;height:${size}px;border-radius:50%;
          background:${c.bg};border:2.5px solid white;
          box-shadow:0 2px 10px rgba(0,0,0,0.3);
          display:flex;align-items:center;justify-content:center;
          font-size:${Math.round(size * 0.45)}px;
          ${selected ? `outline:2px solid ${c.bg};outline-offset:3px;` : ''}
        ">${c.icon}</div>
        <div style="
          position:absolute;top:-3px;right:-5px;
          background:#E8594F;color:white;
          font-size:9px;font-weight:700;border-radius:9999px;
          width:16px;height:16px;
          display:flex;align-items:center;justify-content:center;line-height:1;
          border:1.5px solid white;
        ">${deals > 9 ? '9+' : deals}</div>
        <div style="
          width:7px;height:7px;background:${c.bg};
          transform:rotate(45deg);margin-top:-4px;
          box-shadow:1px 1px 3px rgba(0,0,0,0.25);
        "></div>
      </div>`,
    className: '',
    iconSize:   [size + 12, size + 18],
    iconAnchor: [(size + 12) / 2, size + 18],
  });
}

// Fly to selected supplier and re-render icons when selection changes
function MapController({ suppliers, selected }: { suppliers: MapSupplier[]; selected: MapSupplier | null }) {
  const map = useMap();

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.lat, selected.lng], 15, { duration: 0.7 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  return null;
}

interface LeafletMapProps {
  suppliers:   MapSupplier[];
  filteredIds: Set<number>;
  selected:    MapSupplier | null;
  onSelect:    (s: MapSupplier) => void;
}

export default function LeafletMap({ suppliers, filteredIds, selected, onSelect }: LeafletMapProps) {
  return (
    <MapContainer
      center={[41.2995, 69.2401]}
      zoom={12}
      style={{ width: '100%', height: '100%' }}
      zoomControl
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapController suppliers={suppliers} selected={selected} />
      {suppliers.map((s) => (
        <Marker
          key={s.id}
          position={[s.lat, s.lng]}
          icon={buildIcon(s.category, s.deals, selected?.id === s.id)}
          opacity={filteredIds.has(s.id) ? 1 : 0.3}
          eventHandlers={{ click: () => onSelect(s) }}
          zIndexOffset={selected?.id === s.id ? 1000 : 0}
        />
      ))}
    </MapContainer>
  );
}
