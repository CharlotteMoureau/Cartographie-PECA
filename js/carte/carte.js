import { initCarte } from "./initCarte.js";
import { initGroupes } from "./groupesCouches.js";
import { initControleLayers } from "./controleLayers.js";
import { initFiltresCulture } from "./filtresCulture.js";

const map = initCarte();
const groups = initGroupes();

const overlays = {
  "Culture (tout)": groups.cultureCluster,
  "Écoles FWB": groups.ecolesGroup,
  "Zones PECA": groups.zonesPecaGroup,
  "SNCB (gares + lignes)": groups.sncbGroup,
  "TEC (lignes + arrêts)": groups.tecGroup,
};

const LAYER_MODULE_PATHS = [
  "../zones_peca.js",
  "../ecoles.js",
  "../culture/culture.js",
  "../sncb/gares_sncb.js",
  "../sncb/lignes_sncb.js",
  "../tec/lignes_tec.js",
  "../tec/arrets_tec.js",
];

const DEFAULT_VISIBLE_GROUP_KEYS = [
  "ecolesGroup",
  "zonesPecaGroup",
  "cultureCluster",
  "sncbGroup",
  "tecGroup",
];

function addDefaultLayersToMap(mapInstance, groupRegistry) {
  DEFAULT_VISIBLE_GROUP_KEYS.forEach((groupKey) => {
    groupRegistry[groupKey].addTo(mapInstance);
  });
}

async function loadLayerModules() {
  return Promise.all(LAYER_MODULE_PATHS.map((path) => import(path)));
}

async function initMapLayers() {
  try {
    const modules = await loadLayerModules();

    modules.forEach((module) => {
      module.ajouterCouche?.(map, overlays, groups);
    });

    addDefaultLayersToMap(map, groups);

    const layerControl = initControleLayers(map, overlays);
    initFiltresCulture(layerControl, groups);
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation des couches de la carte:",
      error,
    );
  }
}

initMapLayers();
