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

export async function ajouterCouche(map, overlays, groups) {
  const categories = [
    { load: getMuséesMarkers, target: groups.muséesMarkers },
    { load: getBiblisMarkers, target: groups.biblisMarkers },
    { load: getCCMarkers, target: groups.ccMarkers },
    { load: getCecMarkers, target: groups.cecMarkers },
    { load: getESAHRMarkers, target: groups.esahrMarkers },
    { load: getAudiovisuelMarkers, target: groups.ocAudioMarkers },
    { load: getCentreArchiveMarkers, target: groups.centreArchiveMarkers },
    { load: getCréationArtMarkers, target: groups.créationArtMarkers },
    { load: getCréationMonstrMarkers, target: groups.créationMonstrMarkers },
    { load: getLibrairiesMarkers, target: groups.librairiesMarkers },
    { load: getLittMarkers, target: groups.littMarkers },
    { load: getCinéMarkers, target: groups.cinéMarkers },
    { load: getThéâtreMarkers, target: groups.théâtreMarkers },
    { load: getRencontresMarkers, target: groups.rencontresMarkers },
  ];

  const loadedMarkers = await Promise.all(
    categories.map(async ({ load, target }) => {
      const markers = await load();
      target.push(...markers);
      return markers;
    }),
  );

  loadedMarkers.flat().forEach((marker) => {
    groups.cultureCluster.addLayer(marker);
  });
}
