import { getMuséesMarkers } from "./musées.js";
import { getBiblisMarkers } from "./bibliothèque.js";
import { getCCMarkers } from "./cc.js";
import { getCecMarkers } from "./cec.js";
import { getESAHRMarkers } from "./ESAHR.js";
import { getAudiovisuelMarkers } from "./audiovisuel.js";
import { getCentreArchiveMarkers } from "./centreArchive.js";
import { getCréationArtMarkers } from "./créationArtistique.js";
import { getCréationMonstrMarkers } from "./créationMonstration.js";
import { getLibrairiesMarkers } from "./librairies.js";
import { getLittMarkers } from "./littéraires.js";
import { getCinéMarkers } from "./ciné.js";
import { getThéâtreMarkers } from "./théâtre.js";
import { getRencontresMarkers } from "./rencontresArtistiques.js";

const CULTURE_CATEGORY_REGISTRY = [
  { load: getMuséesMarkers, groupKey: "muséesMarkers" },
  { load: getBiblisMarkers, groupKey: "biblisMarkers" },
  { load: getCCMarkers, groupKey: "ccMarkers" },
  { load: getCecMarkers, groupKey: "cecMarkers" },
  { load: getESAHRMarkers, groupKey: "esahrMarkers" },
  { load: getAudiovisuelMarkers, groupKey: "ocAudioMarkers" },
  { load: getCentreArchiveMarkers, groupKey: "centreArchiveMarkers" },
  { load: getCréationArtMarkers, groupKey: "créationArtMarkers" },
  { load: getCréationMonstrMarkers, groupKey: "créationMonstrMarkers" },
  { load: getLibrairiesMarkers, groupKey: "librairiesMarkers" },
  { load: getLittMarkers, groupKey: "littMarkers" },
  { load: getCinéMarkers, groupKey: "cinéMarkers" },
  { load: getThéâtreMarkers, groupKey: "théâtreMarkers" },
  { load: getRencontresMarkers, groupKey: "rencontresMarkers" },
];

async function loadCategoryMarkers(categories, groups) {
  const loadedMarkers = await Promise.all(
    categories.map(async ({ load, groupKey }) => {
      const markers = await load();
      groups[groupKey].push(...markers);
      return markers;
    }),
  );

  loadedMarkers.flat().forEach((marker) => {
    groups.cultureCluster.addLayer(marker);
  });
}

export async function ajouterCouche(map, overlays, groups) {
  await loadCategoryMarkers(CULTURE_CATEGORY_REGISTRY, groups);
}
