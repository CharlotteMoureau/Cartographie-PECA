export function ajouterCouche(map, overlays, { zonesPecaGroup }) {
  const couleurs = [
    "#b6b5eb",
    "#575756",
    "#f7c26c",
    "#8bb31d",
    "#0085c0",
    "#ad498d",
    "#312783",
    "#e73458",
    "#009f8c",
    "#ef7d00",
  ];
  const zoneCouleurs = {};
  let couleurIndex = 0;

  fetch("data/zones_peca.geojson")
    .then((res) => res.json())
    .then((data) => {
      const layer = L.geoJSON(data, {
        style: (feature) => {
          const zone =
            feature.properties.Zone_PECA || `Zone ${couleurIndex + 1}`;
          if (!zoneCouleurs[zone]) {
            zoneCouleurs[zone] = couleurs[couleurIndex % couleurs.length];
            couleurIndex++;
          }
          return {
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillColor: zoneCouleurs[zone],
            fillOpacity: 0.6,
          };
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          const popupContent = `
            <strong>${props.nom || ""}</strong><br>
            <em>${props.Zone_PECA || ""}</em>
          `;
          layer.bindPopup(popupContent);
        },
      });

      zonesPecaGroup.addLayer(layer); // ✅ Ajout au groupe
      layer.bringToBack(); // Optionnel : pour rester en fond
    });
}
