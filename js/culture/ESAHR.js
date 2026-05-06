import {
  buildAddressLine,
  createCultureMarkers,
  getFirstNonEmpty,
} from "./cultureMarkerFactory.js";

export async function getESAHRMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/ESAHR.geojson",
    popupBuilder: (props) => {
      const denomination = getFirstNonEmpty(props, ["Dénomination"], "ESAHR");
      const address = buildAddressLine(props, {
        streetKeys: ["Adresse"],
        postalKeys: ["Code postal"],
        cityKeys: ["Ville"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props.Type || "ESAHR"}
    `;
    },
  });
}
