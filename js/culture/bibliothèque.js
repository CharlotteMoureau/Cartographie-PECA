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
      <strong>${props.denomination || "Bibliothèque"}</strong><br>
      ${props.adresse || ""}, ${props.cp || ""} ${props.ville || ""}<br><br>
    Type d'opérateur culturel : ${props.categorie || "Bibliothèque"}
    <br><br><a href="https://www.peca.be/recherche-operateur-culturel?tx_solr%5Bq%5D=${
      props.denomination || ""
    }" target=_blank>Voir la fiche dans le répertoire PECA</a>
    `;
    return L.marker(latlng, { icon: iconBibli }).bindPopup(popupContent);
  });
}
