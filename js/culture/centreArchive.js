import {
  buildAddressLine,
  createCultureMarkers,
  getFirstNonEmpty,
} from "./cultureMarkerFactory.js";

export async function getCentreArchiveMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/centreArchive.geojson",
    popupBuilder: (props) => {
      const denomination = getFirstNonEmpty(
        props,
        ["Dénomination"],
        "CentreArchive",
      );
      const address = buildAddressLine(props, {
        streetKeys: ["Adresse"],
        postalKeys: ["Code postal"],
        cityKeys: ["Localité"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props["Unnamed: 1"] || "Centre d'archives"}
    `;
    },
  });
}
