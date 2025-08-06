export async function getMuséesMarkers() {
  const res = await fetch("data/culture/musées.geojson");
  const data = await res.json();

  const iconMusée = L.icon({
    iconUrl: "img/musée.svg",
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
      <strong>${props.Dénomination || "Musée"}</strong><br>
      ${props.Adresse || ""}, ${props["Code postal"] || ""} ${
      props.Localité || ""
    }
    `;
    return L.marker(latlng, { icon: iconMusée }).bindPopup(popupContent);
  });
}
