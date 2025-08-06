export async function getBiblisMarkers(icon) {
  const res = await fetch("data/culture/bibliothèques.geojson");
  const data = await res.json();

  const iconBibli = L.icon({
    iconUrl: "img/bibliothèque.svg",
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
      <strong>${props.Dénomination || "Bibliothèque"}</strong><br>
      ${props.Adresse || ""}, ${props["Code postal"] || ""} ${
      props.Localité || ""
    }
    `;
    return L.marker(latlng, { icon: iconBibli }).bindPopup(popupContent);
  });
}
