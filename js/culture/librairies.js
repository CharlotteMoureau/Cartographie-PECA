export async function getLibrairiesMarkers() {
  const res = await fetch("data/culture/librairies.geojson");
  const data = await res.json();

  const iconLibrairie = L.icon({
    iconUrl: "img/culture.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  return data.features.map((feature) => {
    const coords = feature.geometry.coordinates;
    const latlng = [coords[1], coords[0]];
    const props = feature.properties;
    const popupContent = `
      <strong>${props.denomination || "Librairie"}</strong><br>
      ${props.adresse || ""}, ${props["code_postal"] || ""} ${
      props.localite || ""
    }
    ${
      props.site_web
        ? `<br><br>
    <a href="${
      props.site_web || ""
    }" target=_blank>Consulter le site internet</a>`
        : ""
    }
    <br><br>
      Type d'opérateur culturel : Librairie labellisée
    `;
    return L.marker(latlng, { icon: iconLibrairie }).bindPopup(popupContent);
  });
}
