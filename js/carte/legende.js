const LEGEND_ITEMS = [
  {
    type: "icon",
    src: "img/école.svg",
    bg: "#00008B",
    label: "École FWB",
  },
  {
    type: "icon",
    src: "img/culture.svg",
    bg: "#ffffff",
    border: "#D86F6F",
    label: "Opérateur culturel",
  },
  {
    type: "icon",
    src: "img/train.svg",
    bg: "#0071b7",
    label: "Gare SNCB",
  },
  {
    type: "icon",
    src: "img/bus noir.svg",
    bg: "#f3cb14",
    label: "Arrêt TEC",
  },
  {
    type: "line",
    color: "#0071b7",
    label: "Ligne SNCB",
  },
  {
    type: "line",
    color: "#f3cb14",
    label: "Ligne TEC",
  },
  {
    type: "zone",
    label: "Zone PECA (couleur par zone)",
  },
];

function buildLegendHTML() {
  const rows = LEGEND_ITEMS.map((item) => {
    let symbol;

    if (item.type === "icon") {
      const border = item.border
        ? `border: 2px solid ${item.border};`
        : "border: 2px solid rgba(255,255,255,0.6);";
      symbol = `
        <span class="legend-icon-wrap" style="background:${item.bg};${border}">
          <img src="${item.src}" class="legend-icon-img" />
        </span>`;
    } else if (item.type === "line") {
      symbol = `
        <span class="legend-line-wrap">
          <span class="legend-line" style="background:${item.color};"></span>
        </span>`;
    } else {
      symbol = `<span class="legend-zone-wrap"><span class="legend-zone-swatch"></span></span>`;
    }

    return `<div class="legend-row">${symbol}<span class="legend-label">${item.label}</span></div>`;
  }).join("");

  return `
    <div class="legend-header">
      <img src="img/Logo PECA rond.png" class="legend-logo" />
      <span>Légende</span>
      <button class="legend-toggle-btn" title="Masquer la légende" aria-label="Masquer la légende">▼</button>
    </div>
    <div class="legend-body">${rows}</div>`;
}

export function initLegende(map) {
  const LegendControl = L.Control.extend({
    options: { position: "bottomleft" },

    onAdd() {
      const container = L.DomUtil.create("div", "legend-control");
      container.innerHTML = buildLegendHTML();

      const body = container.querySelector(".legend-body");
      const btn = container.querySelector(".legend-toggle-btn");
      let collapsed = false;

      btn.addEventListener("click", () => {
        collapsed = !collapsed;
        body.style.display = collapsed ? "none" : "";
        btn.textContent = collapsed ? "▲" : "▼";
        btn.title = collapsed ? "Afficher la légende" : "Masquer la légende";
      });

      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      return container;
    },
  });

  new LegendControl().addTo(map);
}
