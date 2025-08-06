export async function getCCMarkers(icon) {
  const res = await fetch("data/culture/Centres_Culturels.geojson");
  const data = await res.json();

  const iconCC = L.icon({
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
      <strong>${props.Dénomination || "Centre culturel"}</strong><br>
      ${props.rue || ""}, ${props.code_postal || ""} ${props.localite || ""}
    `;
    return L.marker(latlng, { icon: iconCC }).bindPopup(popupContent);
  });
}
