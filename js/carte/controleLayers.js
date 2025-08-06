export function initControleLayers(map, overlays) {
  return L.control.layers(null, overlays, { collapsed: false }).addTo(map);
}
