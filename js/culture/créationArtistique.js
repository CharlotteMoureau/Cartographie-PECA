export async function getCréationArtMarkers(icon) {
  const res = await fetch("data/culture/création_artistique.geojson");
  const data = await res.json();

  const iconCréationArt = L.icon({
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
      <strong>${props.nom_de_l_operateur || "Création Artistique"}</strong><br>
      ${props.adresse || ""}, ${props.code_postal || ""} ${
      props.Localité || ""
    }<br><br>
    Type d'opérateur culturel : ${
      props.categorie_principale || "Création Artistique"
    }
    <br><br><a href="https://www.peca.be/recherche-operateur-culturel?tx_solr%5Bq%5D=${
      props.nom_de_l_operateur || ""
    }" target=_blank>Voir la fiche dans le répertoire PECA</a>
    `;
    return L.marker(latlng, { icon: iconCréationArt }).bindPopup(popupContent);
  });
}
