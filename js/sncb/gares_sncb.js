export function ajouterCouche(map, overlays, { sncbGroup }) {
  fetch("data/sncb/gares_sncb.geojson")
    .then((res) => res.json())
    .then((data) => {
      const icon = L.icon({
        iconUrl: "img/train.svg",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const clusterGares = L.markerClusterGroup({
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `
                <div class="cluster-content">
                  <img src="img/train.svg" class="cluster-icon" />
                  <span>${count}</span>
                </div>
              `,
            className: "marker-cluster marker-cluster-gares",
            iconSize: L.point(40, 40),
          });
        },
      });

      const geojsonLayer = L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, { icon });
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          const popupContent = `
              <strong>Gare de ${
                props.STATION_GA || props.name || "Gare"
              }</strong><br>
            `;
          layer.bindPopup(popupContent);
        },
      });

      clusterGares.addLayer(geojsonLayer);
      clusterGares.addTo(map);
      sncbGroup.addLayer(clusterGares);
    });
}
