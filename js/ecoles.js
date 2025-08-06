export function ajouterCouche(map, overlays, { ecolesGroup }) {
  fetch("data/écoles.geojson")
    .then((res) => res.json())
    .then((data) => {
      const icon = L.icon({
        iconUrl: "img/école b.svg",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const clusterEcoles = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `
                  <div class="cluster-content">
                    <img src="img/école.svg" class="cluster-icon" />
                    <span>${count}</span>
                  </div>
                `,
            className: "marker-cluster marker-cluster-ecoles",
            iconSize: L.point(40, 40),
          });
        },
      });

      const geojsonLayer = L.geoJSON(data, {
        chunkedLoading: true,
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, { icon });
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          const popupContent = `
              <strong>${props["Nom d'etablissement"] || "inconnu"}</strong><br>
              Commune : ${props["Commune de l'implantation"] || ""}<br>
              Numéro FASE implantation : <strong>${
                props["Fase Impl_"] || "inconnu"
              }</strong><br>
              Type d'enseignement : <em>${props["Niveau"] || ""} ${
            props["Genre"] || "inconnu"
          }</em>
            `;
          layer.bindPopup(popupContent);
        },
      });

      clusterEcoles.addLayer(geojsonLayer);
      clusterEcoles.addTo(map);
      ecolesGroup.addLayer(clusterEcoles);
    });
}
