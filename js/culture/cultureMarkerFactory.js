const MARKER_SHADOW_URL =
  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

function createCultureIcon(iconUrl) {
  return L.icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: MARKER_SHADOW_URL,
  });
}

export function getFirstNonEmpty(props, keys, fallback = "") {
  for (const key of keys) {
    const value = props[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }
  return fallback;
}

export function buildAddressLine(
  props,
  { streetKeys = [], postalKeys = [], cityKeys = [] },
) {
  const street = getFirstNonEmpty(props, streetKeys);
  const postal = getFirstNonEmpty(props, postalKeys);
  const city = getFirstNonEmpty(props, cityKeys);
  const cityPart = [postal, city].filter(Boolean).join(" ");

  if (street && cityPart) {
    return `${street}, ${cityPart}`;
  }

  return street || cityPart;
}

export function buildPecaLink(searchValue) {
  if (!searchValue) {
    return "";
  }

  return `<br><br><a href="https://www.peca.be/recherche-operateur-culturel?tx_solr%5Bq%5D=${encodeURIComponent(
    searchValue,
  )}" target=_blank>Voir la fiche dans le répertoire PECA</a>`;
}

export async function createCultureMarkers({
  geojsonPath,
  popupBuilder,
  iconUrl = "img/culture.svg",
}) {
  const res = await fetch(geojsonPath);
  const data = await res.json();
  const icon = createCultureIcon(iconUrl);

  return data.features.map((feature) => {
    const coords = feature.geometry.coordinates;
    const latlng = [coords[1], coords[0]];
    const props = feature.properties;

    return L.marker(latlng, { icon }).bindPopup(popupBuilder(props));
  });
}
