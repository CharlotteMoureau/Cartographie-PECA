import {
  buildAddressLine,
  buildPecaLink,
  createCultureMarkers,
} from "./cultureMarkerFactory.js";

export async function getCCMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/Centres_Culturels.geojson",
    popupBuilder: (props) => {
      const denomination = props.denomination || "Centre culturel";
      const address = buildAddressLine(props, {
        streetKeys: ["rue"],
        postalKeys: ["code_postal"],
        cityKeys: ["localite"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}
      <br><br>Type d'opérateur culturel : Centre culturel
      ${buildPecaLink(props.denomination || "")}
    `;
    },
  });
}
