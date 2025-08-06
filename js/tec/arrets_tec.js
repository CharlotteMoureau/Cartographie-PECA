export function ajouterCouche(map, overlays, { tecGroup }) {
  fetch("data/tec/arrêts_tec.geojson")
    .then((res) => res.json())
    .then((data) => {
      const icon = L.icon({
        iconUrl: "img/bus jaune.svg",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const clusterArrets = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `
                    <div class="cluster-content">
                      <img src="img/bus noir.svg" class="cluster-icon" />
                      <span>${count}</span>
                    </div>
                  `,
            className: "marker-cluster marker-cluster-arrets",
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
              <strong>Arrêt de bus</strong><br>
              ${props.ARRET_NOM || ""}
            `;
          layer.bindPopup(popupContent);
        },
      });

      clusterArrets.addLayer(geojsonLayer);
      clusterArrets.addTo(map);
      tecGroup.addLayer(clusterArrets);
    });
}
