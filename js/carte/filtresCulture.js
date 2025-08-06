export function initFiltresCulture(
  layerControl,
  {
    muséesMarkers,
    biblisMarkers,
    ccMarkers,
    cecMarkers,
    esahrMarkers,
    ocAudioMarkers,
    centreArchiveMarkers,
    créationArtMarkers,
    créationMonstrMarkers,
    librairiesMarkers,
    littMarkers,
    cinéMarkers,
    théâtreMarkers,
    cultureCluster,
  }
) {
  const controlContainer = document.querySelector(
    ".leaflet-control-layers-overlays"
  );

  const customGroup = document.createElement("div");
  customGroup.className = "leaflet-control-layers-group";

  const title = document.createElement("span");
  title.className = "leaflet-control-layers-group-label";
  title.innerHTML = `Filtres culture <span style="float:right;">▼</span>`;
  title.style.cursor = "pointer";
  title.style.padding = "5px";
  title.style.background = "#f0f0f0";
  title.style.borderRadius = "4px";
  title.style.display = "block";

  const filterContent = document.createElement("div");
  filterContent.className = "leaflet-control-layers-group-content";
  filterContent.style.display = "none";
  filterContent.style.padding = "5px 10px";
  filterContent.style.background = "#fff";
  filterContent.style.border = "1px solid #ccc";
  filterContent.style.borderRadius = "4px";
  filterContent.style.marginTop = "5px";

  filterContent.innerHTML = `
    <label><input type="checkbox" id="filter-biblis" checked /> Bibliothèques</label>
    <label><input type="checkbox" id="filter-centreArchive" checked /> Centres d'archives</label>
    <label><input type="checkbox" id="filter-cc" checked /> Centres culturels</label>
    <label><input type="checkbox" id="filter-cec" checked /> Centres d'expression et de créativité</label>
    <label><input type="checkbox" id="filter-créArt" checked /> Création artistique</label>
    <label><input type="checkbox" id="filter-esahr" checked /> ESAHR (académies et conservatoires)</label>
    <label><input type="checkbox" id="filter-librairies" checked /> Librairies labellisées</label>
    <label><input type="checkbox" id="filter-monstr" checked /> Lieux de création et de monstration</label>
    <label><input type="checkbox" id="filter-musees" checked /> Musées</label>
    <label><input type="checkbox" id="filter-ocAudio" checked /> Opérateurs culturels audiovisuel</label>
    <label><input type="checkbox" id="filter-ocLitt" checked /> Opérateurs culturels littéraires</label>
    <label><input type="checkbox" id="filter-ciné" checked /> Salles de projection et cinémas</label>
    <label><input type="checkbox" id="filter-théâtre" checked /> Salles de concert et théâtres</label>
    `;

  title.addEventListener("click", () => {
    const isVisible = filterContent.style.display === "block";
    filterContent.style.display = isVisible ? "none" : "block";
    title.querySelector("span").textContent = isVisible ? "▼" : "▲";
  });

  customGroup.appendChild(title);
  customGroup.appendChild(filterContent);

  const labels = controlContainer.querySelectorAll("label");
  labels.forEach((label) => {
    if (label.textContent.includes("Culture (tout)")) {
      label.parentNode.insertBefore(customGroup, label.nextSibling);
    }
  });

  const checkboxHandlers = [
    { id: "filter-biblis", markers: biblisMarkers },
    { id: "filter-centreArchive", markers: centreArchiveMarkers },
    { id: "filter-cc", markers: ccMarkers },
    { id: "filter-cec", markers: cecMarkers },
    { id: "filter-créArt", markers: créationArtMarkers },
    { id: "filter-esahr", markers: esahrMarkers },
    { id: "filter-librairies", markers: librairiesMarkers },
    { id: "filter-monstr", markers: créationMonstrMarkers },
    { id: "filter-musees", markers: muséesMarkers },
    { id: "filter-ocAudio", markers: ocAudioMarkers },
    { id: "filter-ocLitt", markers: littMarkers },
    { id: "filter-ciné", markers: cinéMarkers },
    { id: "filter-théâtre", markers: théâtreMarkers },
  ];

  checkboxHandlers.forEach(({ id, markers }) => {
    document.getElementById(id).addEventListener("change", (e) => {
      markers.forEach((m) => {
        e.target.checked
          ? cultureCluster.addLayer(m)
          : cultureCluster.removeLayer(m);
      });
    });
  });
}
