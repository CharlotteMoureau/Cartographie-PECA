export function ajouterCouche(map, overlays, { sncbGroup }) {
  fetch("data/sncb/lignes_sncb.geojson")
    .then((res) => res.json())
    .then((data) => {
      const lignes = L.geoJSON(data, {
        style: {
          color: "#0071b7",
          weight: 3,
          opacity: 0.8,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          const popupContent = `
              <strong>Ligne SNCB</strong><br>
              ${props.nom || props.name || "Sans nom"}
            `;
          layer.bindPopup(popupContent);
        },
      });

      lignes.addTo(map);
      sncbGroup.addLayer(lignes);
    });
}
