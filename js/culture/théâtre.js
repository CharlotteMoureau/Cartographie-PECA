import {
  buildAddressLine,
  buildPecaLink,
  createCultureMarkers,
} from "./cultureMarkerFactory.js";

export async function getThéâtreMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/théâtre.geojson",
    popupBuilder: (props) => {
      const denomination = props.salle || "Théâtre";
      const address = buildAddressLine(props, {
        streetKeys: ["adresse"],
        postalKeys: ["code_postal"],
        cityKeys: ["ville"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props.categorie || "Concert & théâtre"}
      ${buildPecaLink(props.salle || "")}
    `;
    },
  });
}
