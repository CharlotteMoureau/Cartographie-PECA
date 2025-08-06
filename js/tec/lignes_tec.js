export function ajouterCouche(map, overlays, { tecGroup }) {
  fetch("data/tec/lignes_tec.geojson")
    .then((res) => res.json())
    .then((data) => {
      const lignes = L.geoJSON(data, {
        chunkedLoading: true,
        style: {
          color: "#f3cb14",
          weight: 3,
          opacity: 1,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          const popupContent = `
              <strong>Ligne TEC</strong><br>
              ${props.FIRST_LGN_ || "Sans nom"}
            `;
          layer.bindPopup(popupContent);
        },
      });

      lignes.addTo(map);
      tecGroup.addLayer(lignes);
    });
}
