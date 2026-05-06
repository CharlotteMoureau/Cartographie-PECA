import {
  buildAddressLine,
  createCultureMarkers,
  getFirstNonEmpty,
} from "./cultureMarkerFactory.js";

export async function getCréationMonstrMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/monstration.geojson",
    popupBuilder: (props) => {
      const denomination = getFirstNonEmpty(
        props,
        ["Dénomination"],
        "Lieu de création et de monstration",
      );
      const address = buildAddressLine(props, {
        streetKeys: ["Adresse"],
        postalKeys: ["CP"],
        cityKeys: ["Ville"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props["Unnamed: 1"] || "Lieu de création et de monstration"}
    `;
    },
  });
}
