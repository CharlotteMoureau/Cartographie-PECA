import {
  buildAddressLine,
  buildPecaLink,
  createCultureMarkers,
} from "./cultureMarkerFactory.js";

export async function getBiblisMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/bibliothèques.geojson",
    iconUrl: "img/bibliothèque.svg",
    popupBuilder: (props) => {
      const denomination = props.denomination || "Bibliothèque";
      const address = buildAddressLine(props, {
        streetKeys: ["adresse"],
        postalKeys: ["cp"],
        cityKeys: ["ville"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props.categorie || "Bibliothèque"}
      ${buildPecaLink(props.denomination || "")}
    `;
    },
  });
}
