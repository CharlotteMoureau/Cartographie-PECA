import {
  buildAddressLine,
  buildPecaLink,
  createCultureMarkers,
} from "./cultureMarkerFactory.js";

export async function getCecMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/CEC.geojson",
    popupBuilder: (props) => {
      const denomination = props.denomination || "CEC";
      const address = buildAddressLine(props, {
        streetKeys: ["adresse"],
        postalKeys: ["code_postal"],
        cityKeys: ["localite"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : CEC
      ${buildPecaLink(props.denomination || "")}
    `;
    },
  });
}
