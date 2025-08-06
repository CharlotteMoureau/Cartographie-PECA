export function initGroupes() {
  const ecolesGroup = L.layerGroup();
  const zonesPecaGroup = L.layerGroup();
  const sncbGroup = L.layerGroup();
  const tecGroup = L.layerGroup();

  const cultureCluster = L.markerClusterGroup({
    iconCreateFunction: (cluster) => {
      const count = cluster.getChildCount();
      return L.divIcon({
        html: `
          <div class="cluster-content">
            <img src="img/culture.svg" class="cluster-icon" />
            <span>${count}</span>
          </div>
        `,
        className: "marker-cluster marker-cluster-culture",
        iconSize: L.point(40, 40),
      });
    },
  });

  const muséesMarkers = [];
  const biblisMarkers = [];
  const ccMarkers = [];
  const cecMarkers = [];
  const esahrMarkers = [];
  const ocAudioMarkers = [];
  const créationArtMarkers = [];
  const centreArchiveMarkers = [];
  const créationMonstrMarkers = [];
  const librairiesMarkers = [];
  const littMarkers = [];
  const cinéMarkers = [];
  const théâtreMarkers = [];

  return {
    ecolesGroup,
    zonesPecaGroup,
    sncbGroup,
    tecGroup,
    cultureCluster,
    muséesMarkers,
    biblisMarkers,
    ccMarkers,
    cecMarkers,
    esahrMarkers,
    ocAudioMarkers,
    centreArchiveMarkers,
    créationArtMarkers,
    créationMonstrMarkers,
    littMarkers,
    librairiesMarkers,
    cinéMarkers,
    théâtreMarkers,
  };
}
