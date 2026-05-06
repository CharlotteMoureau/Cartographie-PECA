import {
  buildAddressLine,
  buildPecaLink,
  createCultureMarkers,
} from "./cultureMarkerFactory.js";

export async function getLibrairiesMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/librairies.geojson",
    popupBuilder: (props) => {
      const denomination = props.denomination || "Librairie";
      const address = buildAddressLine(props, {
        streetKeys: ["adresse"],
        postalKeys: ["code_postal"],
        cityKeys: ["localite"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}
      <br><br>
      Type d'opérateur culturel : Librairie labellisée
      ${buildPecaLink(props.denomination || "")}
      `;
    },
  });
}
