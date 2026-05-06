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

const LAYER_DEFINITIONS = [
  {
    groupKey: "zonesPecaGroup",
    priority: "critical",
    paths: ["../zones_peca.js"],
  },
  {
    groupKey: "ecolesGroup",
    priority: "critical",
    paths: ["../ecoles.js"],
  },
  {
    groupKey: "cultureCluster",
    priority: "critical",
    paths: ["../culture/culture.js"],
  },
  {
    groupKey: "sncbGroup",
    priority: "deferred",
    paths: ["../sncb/gares_sncb.js", "../sncb/lignes_sncb.js"],
  },
  {
    groupKey: "tecGroup",
    priority: "deferred",
    paths: ["../tec/lignes_tec.js", "../tec/arrets_tec.js"],
  },
];

const DEFAULT_VISIBLE_GROUP_KEYS = [
  "ecolesGroup",
  "zonesPecaGroup",
  "cultureCluster",
];

const layerLoadPromises = new Map();
const loadedGroupKeys = new Set();

function addDefaultLayersToMap(mapInstance, groupRegistry) {
  DEFAULT_VISIBLE_GROUP_KEYS.forEach((groupKey) => {
    groupRegistry[groupKey].addTo(mapInstance);
  });
}

function getLayerDefinitionByGroup(groupKey) {
  return LAYER_DEFINITIONS.find(
    (definition) => definition.groupKey === groupKey,
  );
}

async function loadGroupLayerModules(groupKey) {
  if (loadedGroupKeys.has(groupKey)) {
    return;
  }

  if (layerLoadPromises.has(groupKey)) {
    return layerLoadPromises.get(groupKey);
  }

  const layerDefinition = getLayerDefinitionByGroup(groupKey);

  if (!layerDefinition) {
    return;
  }

  const loadPromise = Promise.all(
    layerDefinition.paths.map((path) => import(path)),
  ).then((modules) => {
    modules.forEach((module) => {
      module.ajouterCouche?.(map, overlays, groups);
    });

    loadedGroupKeys.add(groupKey);
  });

  layerLoadPromises.set(groupKey, loadPromise);
  return loadPromise;
}

function deferTask(callback) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback);
    return;
  }

  window.setTimeout(callback, 0);
}

async function initMapLayers() {
  try {
    addDefaultLayersToMap(map, groups);

    const layerControl = initControleLayers(map, overlays);
    initFiltresCulture(layerControl, groups);

    const criticalGroups = LAYER_DEFINITIONS.filter(
      ({ priority }) => priority === "critical",
    ).map(({ groupKey }) => groupKey);

    await Promise.all(
      criticalGroups.map((groupKey) => loadGroupLayerModules(groupKey)),
    );

    const deferredGroups = LAYER_DEFINITIONS.filter(
      ({ priority }) => priority === "deferred",
    ).map(({ groupKey }) => groupKey);

    deferredGroups.forEach((groupKey) => {
      deferTask(() => {
        loadGroupLayerModules(groupKey).catch((error) => {
          console.error(`Erreur lors du chargement de ${groupKey}:`, error);
        });
      });
    });

    map.on("overlayadd", (event) => {
      const groupKey = LAYER_DEFINITIONS.find(
        ({ groupKey: key }) => groups[key] === event.layer,
      )?.groupKey;

      if (!groupKey) {
        return;
      }

      loadGroupLayerModules(groupKey).catch((error) => {
        console.error(`Erreur lors du chargement de ${groupKey}:`, error);
      });
    });
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation des couches de la carte:",
      error,
    );
  }
}

initMapLayers();
