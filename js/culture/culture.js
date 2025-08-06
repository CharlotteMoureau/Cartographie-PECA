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

export async function ajouterCouche(map, overlays, groups) {
  const icon = L.icon({
    iconUrl: "img/culture.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  const musées = await getMuséesMarkers(icon);
  musées.forEach((m) => {
    groups.muséesMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const biblis = await getBiblisMarkers(icon);
  biblis.forEach((m) => {
    groups.biblisMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const cc = await getCCMarkers(icon);
  cc.forEach((m) => {
    groups.ccMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const cec = await getCecMarkers(icon);
  cec.forEach((m) => {
    groups.cecMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const esahr = await getESAHRMarkers(icon);
  esahr.forEach((m) => {
    groups.esahrMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const ocAudio = await getAudiovisuelMarkers(icon);
  ocAudio.forEach((m) => {
    groups.ocAudioMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const centreArchive = await getCentreArchiveMarkers(icon);
  centreArchive.forEach((m) => {
    groups.centreArchiveMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const créationArt = await getCréationArtMarkers(icon);
  créationArt.forEach((m) => {
    groups.créationArtMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const créationMonstr = await getCréationMonstrMarkers(icon);
  créationMonstr.forEach((m) => {
    groups.créationMonstrMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const librairies = await getLibrairiesMarkers(icon);
  librairies.forEach((m) => {
    groups.librairiesMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const litt = await getLittMarkers(icon);
  litt.forEach((m) => {
    groups.littMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const ciné = await getCinéMarkers(icon);
  ciné.forEach((m) => {
    groups.cinéMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });

  const théâtre = await getThéâtreMarkers(icon);
  théâtre.forEach((m) => {
    groups.théâtreMarkers.push(m);
    groups.cultureCluster.addLayer(m);
  });
}
