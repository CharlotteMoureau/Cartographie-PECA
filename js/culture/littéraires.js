import {
  buildAddressLine,
  createCultureMarkers,
  getFirstNonEmpty,
} from "./cultureMarkerFactory.js";

export async function getLittMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/littéraires.geojson",
    popupBuilder: (props) => {
      const denomination = getFirstNonEmpty(
        props,
        ["Dénomination"],
        "OC Littéraire",
      );
      const address = buildAddressLine(props, {
        streetKeys: ["Adresse"],
        postalKeys: ["Code postal"],
        cityKeys: ["Localité"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props["Unnamed: 1"] || "OC Littéraire"}
    `;
    },
  });
}
