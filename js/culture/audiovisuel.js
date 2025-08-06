export async function getAudiovisuelMarkers(icon) {
  const res = await fetch("data/culture/audiovisuel.geojson");
  const data = await res.json();

  const iconAudiovisuel = L.icon({
    iconUrl: "img/culture.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  return data.features.map((feature) => {
    const coords = feature.geometry.coordinates;
    const latlng = [coords[1], coords[0]];
    const props = feature.properties;
    const popupContent = `
      <strong>${props.Dénomination || "Audiovisuel"}</strong><br>
      ${props.Adresse || ""}, ${props["Code postal"] || ""} ${
      props.Ville || ""
    }<br><br>
      Type d'opérateur culturel : ${props["Unnamed: 1"] || "Audiovisuel"}
    `;
    return L.marker(latlng, { icon: iconAudiovisuel }).bindPopup(popupContent);
  });
}
