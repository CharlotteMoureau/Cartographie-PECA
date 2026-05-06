export function initControleLayers(map, overlays) {
  const control = L.control
    .layers(null, overlays, { collapsed: false })
    .addTo(map);

  // Add a collapse toggle button to the panel header area
  const container = control.getContainer();
  const overlaysDiv = container.querySelector(
    ".leaflet-control-layers-overlays",
  );

  const toggleBtn = L.DomUtil.create("button", "layers-panel-toggle-btn");
  toggleBtn.type = "button";
  toggleBtn.title = "Réduire le panneau";
  toggleBtn.setAttribute("aria-label", "Réduire le panneau");
  toggleBtn.textContent = "▲";

  container.insertBefore(toggleBtn, container.firstChild);

  let collapsed = false;

  L.DomEvent.on(toggleBtn, "click", (e) => {
    L.DomEvent.stopPropagation(e);
    collapsed = !collapsed;
    overlaysDiv.style.display = collapsed ? "none" : "";
    toggleBtn.textContent = collapsed ? "▼" : "▲";
    toggleBtn.title = collapsed
      ? "Développer le panneau"
      : "Réduire le panneau";
  });

  return control;
}
