import {
  buildAddressLine,
  createCultureMarkers,
  getFirstNonEmpty,
} from "./cultureMarkerFactory.js";

export async function getMuséesMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/musées.geojson",
    iconUrl: "img/musée.svg",
    popupBuilder: (props) => {
      const denomination = getFirstNonEmpty(props, ["Dénomination"], "Musée");
      const address = buildAddressLine(props, {
        streetKeys: ["Adresse"],
        postalKeys: ["Code postal"],
        cityKeys: ["Localité"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props["Unnamed: 1"] || "Musée"}
    `;
    },
  });
}
