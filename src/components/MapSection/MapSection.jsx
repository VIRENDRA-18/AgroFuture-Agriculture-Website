// src/components/MapSection.jsx
import React, { useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf, FaTint, FaThermometerHalf } from "react-icons/fa";

// Fix default icon paths in Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
});

const FARMS = [
  {
    id: 1,
    name: "North Field",
    position: [28.6448, 77.2167],
    soil: { ph: 6.7, moisture: 58, fertility: 82 },
    weather: { temp: 29, humidity: 62, condition: "Sunny" },
    crops: ["Wheat", "Chickpea", "Mustard"],
  },
  {
    id: 2,
    name: "River Edge",
    position: [28.5355, 77.3910],
    soil: { ph: 7.2, moisture: 71, fertility: 76 },
    weather: { temp: 27, humidity: 70, condition: "Partly Cloudy" },
    crops: ["Rice", "Sugarcane", "Maize"],
  },
];

function FlyTo({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) map.flyTo(center, 14, { duration: 1.2 });
  }, [center, map]);
  return null;
}

const Stat = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-white/60">{icon}</div>
    <div>
      <div className="text-xs text-gray-600">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  </div>
);

export default function MapSection() {
  const [activeFarm, setActiveFarm] = useState(null);
  const center = useMemo(() => [28.61, 77.21], []);
  const mapRef = useRef(null);

  return (
    <section className="relative py-20 bg-gray-50" id="map">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-800">Interactive Farm Map</h2>
          <p className="text-gray-600">Click a plot to view soil, weather & crop recommendations.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <MapContainer
              ref={mapRef}
              center={center}
              zoom={11}
              className="h-[520px] w-full"
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FlyTo center={activeFarm?.position} />
              {FARMS.map((f) => (
                <Marker key={f.id} position={f.position} eventHandlers={{ click: () => setActiveFarm(f) }}>
                  <Popup>
                    <div className="font-semibold">{f.name}</div>
                    <div className="text-xs text-gray-600">Tap to open details ➜</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Details Drawer (right) */}
          <AnimatePresence>
            {activeFarm && (
              <motion.aside
                key={activeFarm.id}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="bg-white rounded-2xl shadow-xl p-6 h-[520px] overflow-y-auto sticky top-24"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-green-800">{activeFarm.name}</h3>
                    <p className="text-gray-500 text-sm">Plot insights</p>
                  </div>
                  <button
                    onClick={() => setActiveFarm(null)}
                    className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <Stat icon={<FaLeaf />} label="Soil pH" value={activeFarm.soil.ph} />
                  <Stat icon={<FaTint />} label="Moisture" value={`${activeFarm.soil.moisture}%`} />
                  <Stat icon={<FaThermometerHalf />} label="Fertility" value={`${activeFarm.soil.fertility}%`} />
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 border border-emerald-200">
                  <div className="text-sm text-gray-600">Weather</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-2xl font-bold text-green-800">{activeFarm.weather.temp}°C</div>
                    <div className="text-sm text-gray-600">
                      {activeFarm.weather.condition} • {activeFarm.weather.humidity}% humidity
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm text-gray-600 mb-2">Recommended Crops</div>
                  <div className="flex flex-wrap gap-2">
                    {activeFarm.crops.map((c) => (
                      <span key={c} className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
