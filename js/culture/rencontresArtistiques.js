export async function getRencontresMarkers(icon) {
  const res = await fetch("data/culture/rencontres artistiques.geojson");
  const data = await res.json();

  const iconRencontres = L.icon({
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
      <strong>${props.prenom || ""} ${props.nom || ""}</strong><br>
      ${
        props.nom_d_artiste_ou_du_groupe_artistique
          ? `Nom d'artiste ou de collectif : ${props.nom_d_artiste_ou_du_groupe_artistique}`
          : ""
      }
      <p>Domaine artistique : ${props.domaine_s_artistique_s}</p>
      Type d'opérateur culturel : Créateur disponible pour des rencontres artistiques en classe
    `;
    return L.marker(latlng, { icon: iconRencontres }).bindPopup(popupContent);
  });
}
