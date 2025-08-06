export function initCarte() {
  const map = L.map("map");
  map.fitBounds([
    [49.5, 3.0],
    [50.6, 5.9],
  ]);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  return map;
}
