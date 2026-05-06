import {
  buildAddressLine,
  buildPecaLink,
  createCultureMarkers,
} from "./cultureMarkerFactory.js";

export async function getCréationArtMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/création_artistique.geojson",
    popupBuilder: (props) => {
      const denomination = props.nom_de_l_operateur || "Création Artistique";
      const address = buildAddressLine(props, {
        streetKeys: ["adresse"],
        postalKeys: ["code_postal"],
        cityKeys: ["Localité"],
      });

      return `
      <strong>${denomination}</strong><br>
      ${address}<br><br>
      Type d'opérateur culturel : ${props.categorie_principale || "Création Artistique"}
      ${buildPecaLink(props.nom_de_l_operateur || "")}
    `;
    },
  });
}
