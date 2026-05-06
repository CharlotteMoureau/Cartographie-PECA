import { createCultureMarkers } from "./cultureMarkerFactory.js";

export async function getRencontresMarkers() {
  return createCultureMarkers({
    geojsonPath: "data/culture/rencontres_artistiques.geojson",
    popupBuilder: (props) => `
      <strong>${props.prenom || ""} ${props.nom || ""}</strong><br>
      ${
        props.nom_d_artiste_ou_du_groupe_artistique
          ? `Nom d'artiste ou de collectif : ${props.nom_d_artiste_ou_du_groupe_artistique}`
          : ""
      }
      <p>Domaine artistique : ${props.domaine_s_artistique_s}</p>
      Type d'opérateur culturel : Créateur disponible pour des rencontres artistiques en classe
    `,
  });
}
