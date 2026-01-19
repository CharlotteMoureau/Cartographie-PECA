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
      <strong>${props.denomination || "Audiovisuel"}</strong><br>
      ${props.adresse || ""}, ${props.code_postal || ""} ${
      props.ville || ""
    }<br><br>
      Type d'opérateur culturel : ${props.categorie || "Audiovisuel"}
    <br><br><a href="https://www.peca.be/recherche-operateur-culturel?tx_solr%5Bq%5D=${
      props.denomination || ""
    }" target=_blank>Voir la fiche dans le répertoire PECA</a>
      `;
    return L.marker(latlng, { icon: iconAudiovisuel }).bindPopup(popupContent);
  });
}
