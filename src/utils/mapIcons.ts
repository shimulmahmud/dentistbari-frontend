import L from "leaflet";

// Google Maps-style red pin marker
const DefaultIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// Set default icon for all markers
export const setDefaultIcon = () => {
  // @ts-expect-error - Internal Leaflet method
  delete L.Icon.Default.prototype._getIconUrl;
  L.Marker.prototype.options.icon = DefaultIcon;
};

export { DefaultIcon };
export default DefaultIcon;
