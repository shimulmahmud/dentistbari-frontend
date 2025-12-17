import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { setDefaultIcon, DefaultIcon } from "../utils/mapIcons";

interface LocationMapProps {
  position: [number, number];
  zoom?: number;
  className?: string;
  popupText?: string;
}

export function LocationMap({
  position,
  zoom = 15,
  className = "",
  popupText = "Dentist Bari",
}: LocationMapProps) {
  // Set default icon on component mount
  useEffect(() => {
    setDefaultIcon();
  }, []);

  return (
    <div className={`w-full h-80 rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={DefaultIcon}>
          <Popup>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-red-500 mr-1 flex-shrink-0" />
              <span className="text-sm">{popupText}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LocationMap;
