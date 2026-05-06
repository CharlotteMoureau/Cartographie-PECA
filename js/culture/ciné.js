import {
  buildAddressLine,
  createCultureMarkers,
  getFirstNonEmpty,
} from "./cultureMarkerFactory.js";

export async function getCinéMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/cinéma.geojson",
    iconUrl: "img/ciné.svg",
    popupBuilder: (props) => {
      const denomination = getFirstNonEmpty(
        props,
        ["Dénomination du lieu"],
        "Cinéma",
      );
      const address = buildAddressLine(props, {
        streetKeys: ["Adresse"],
        postalKeys: ["Code postal"],
        cityKeys: ["Ville"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props.Catégorie || "Salle projection & Cinéma"}
    `;
    },
  });
}
