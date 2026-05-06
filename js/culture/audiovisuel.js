import {
  buildAddressLine,
  buildPecaLink,
  createCultureMarkers,
} from "./cultureMarkerFactory.js";

export async function getAudiovisuelMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/audiovisuel.geojson",
    popupBuilder: (props) => {
      const denomination = props.denomination || "Audiovisuel";
      const address = buildAddressLine(props, {
        streetKeys: ["adresse"],
        postalKeys: ["code_postal"],
        cityKeys: ["ville"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props.categorie || "Audiovisuel"}
      ${buildPecaLink(props.denomination || "")}
      `;
    },
  });
}
