import { initCarte } from "./initCarte.js";
import { initGroupes } from "./groupesCouches.js";
import { initControleLayers } from "./controleLayers.js";
import { initFiltresCulture } from "./filtresCulture.js";

const map = initCarte();
const {
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
  librairiesMarkers,
  littMarkers,
  cinéMarkers,
  théâtreMarkers,
} = initGroupes();

const overlays = {
  "Culture (tout)": cultureCluster,
  "Écoles FWB": ecolesGroup,
  "Zones PECA": zonesPecaGroup,
  "SNCB (gares + lignes)": sncbGroup,
  "TEC (lignes + arrêts)": tecGroup,
};

Promise.all([
  import("../zones_peca.js"),
  import("../ecoles.js"),
  import("../culture/culture.js"),
  import("../sncb/gares_sncb.js"),
  import("../sncb/lignes_sncb.js"),
  import("../tec/lignes_tec.js"),
  import("../tec/arrets_tec.js"),
]).then((modules) => {
  modules.forEach((m) =>
    m.ajouterCouche?.(map, overlays, {
      ecolesGroup,
      zonesPecaGroup,
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
      librairiesMarkers,
      littMarkers,
      cinéMarkers,
      théâtreMarkers,
      sncbGroup,
      tecGroup,
    })
  );

  [ecolesGroup, zonesPecaGroup, cultureCluster, sncbGroup, tecGroup].forEach(
    (g) => g.addTo(map)
  );

  const layerControl = initControleLayers(map, overlays);
  initFiltresCulture(layerControl, {
    muséesMarkers,
    biblisMarkers,
    ccMarkers,
    cecMarkers,
    esahrMarkers,
    ocAudioMarkers,
    centreArchiveMarkers,
    créationArtMarkers,
    créationMonstrMarkers,
    librairiesMarkers,
    littMarkers,
    cinéMarkers,
    théâtreMarkers,
    cultureCluster,
  });
});
