const CULTURE_FILTERS = [
  { id: "filter-biblis", label: "Bibliothèques", groupKey: "biblisMarkers" },
  {
    id: "filter-centreArchive",
    label: "Centres d'archives",
    groupKey: "centreArchiveMarkers",
  },
  { id: "filter-cc", label: "Centres culturels", groupKey: "ccMarkers" },
  {
    id: "filter-cec",
    label: "Centres d'expression et de créativité",
    groupKey: "cecMarkers",
  },
  {
    id: "filter-créArt",
    label: "Création artistique",
    groupKey: "créationArtMarkers",
  },
  {
    id: "filter-esahr",
    label: "ESAHR (académies et conservatoires)",
    groupKey: "esahrMarkers",
  },
  {
    id: "filter-librairies",
    label: "Librairies labellisées",
    groupKey: "librairiesMarkers",
  },
  {
    id: "filter-monstr",
    label: "Lieux de création et de monstration",
    groupKey: "créationMonstrMarkers",
  },
  { id: "filter-musees", label: "Musées", groupKey: "muséesMarkers" },
  {
    id: "filter-ocAudio",
    label: "Opérateurs culturels audiovisuel",
    groupKey: "ocAudioMarkers",
  },
  {
    id: "filter-ocLitt",
    label: "Opérateurs culturels littéraires",
    groupKey: "littMarkers",
  },
  {
    id: "filter-rencontres",
    label: "Rencontres artistiques en classe",
    groupKey: "rencontresMarkers",
  },
  {
    id: "filter-ciné",
    label: "Salles de projection et cinémas",
    groupKey: "cinéMarkers",
  },
  {
    id: "filter-théâtre",
    label: "Salles de concert et théâtres",
    groupKey: "théâtreMarkers",
  },
];

function createFilterMarkup() {
  return CULTURE_FILTERS.map(
    ({ id, label }) =>
      `<label><input type="checkbox" id="${id}" checked /> ${label}</label>`,
  ).join("\n");
}

function findCultureMainCheckbox(controlContainer) {
  const labels = controlContainer.querySelectorAll("label");

  for (const label of labels) {
    if (label.textContent.includes("Culture (tout)")) {
      return {
        checkbox: label.querySelector('input[type="checkbox"]'),
        label,
      };
    }
  }

  return { checkbox: null, label: null };
}

function setCategoryVisible(cultureCluster, markers, visible) {
  markers.forEach((marker) => {
    if (visible) {
      cultureCluster.addLayer(marker);
    } else {
      cultureCluster.removeLayer(marker);
    }
  });
}

export function initFiltresCulture(layerControl, groups) {
  const { cultureCluster } = groups;
  const map = layerControl?._map;

  const controlContainer = document.querySelector(
    ".leaflet-control-layers-overlays",
  );

  if (!controlContainer) {
    return;
  }

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

  filterContent.innerHTML = createFilterMarkup();

  title.addEventListener("click", () => {
    const isVisible = filterContent.style.display === "block";
    filterContent.style.display = isVisible ? "none" : "block";
    title.querySelector("span").textContent = isVisible ? "▼" : "▲";
  });

  customGroup.appendChild(title);
  customGroup.appendChild(filterContent);

  const { checkbox: cultureMainCheckbox, label: cultureMainLabel } =
    findCultureMainCheckbox(controlContainer);

  if (cultureMainLabel?.parentNode) {
    cultureMainLabel.parentNode.insertBefore(
      customGroup,
      cultureMainLabel.nextSibling,
    );
  }

  const checkboxEntries = CULTURE_FILTERS.map((filter) => ({
    ...filter,
    checkbox: filterContent.querySelector(`#${filter.id}`),
    markers: groups[filter.groupKey] || [],
  })).filter(({ checkbox }) => checkbox);

  let isCultureEnabled = null;

  const applySubFilters = () => {
    checkboxEntries.forEach(({ checkbox, markers }) => {
      setCategoryVisible(cultureCluster, markers, checkbox.checked);
    });
  };

  const syncSubFiltersWithCultureToggle = (cultureEnabled) => {
    if (isCultureEnabled === cultureEnabled) {
      return;
    }

    checkboxEntries.forEach(({ checkbox }) => {
      checkbox.checked = cultureEnabled;
      checkbox.disabled = !cultureEnabled;
    });

    isCultureEnabled = cultureEnabled;
    applySubFilters();
  };

  checkboxEntries.forEach(({ checkbox, markers }) => {
    checkbox.addEventListener("change", (e) => {
      setCategoryVisible(cultureCluster, markers, e.target.checked);
    });
  });

  if (cultureMainCheckbox) {
    syncSubFiltersWithCultureToggle(cultureMainCheckbox.checked);

    cultureMainCheckbox.addEventListener("change", (e) => {
      syncSubFiltersWithCultureToggle(e.target.checked);
    });
  }

  if (map) {
    map.on("overlayadd", (e) => {
      if (e.layer === cultureCluster) {
        syncSubFiltersWithCultureToggle(true);
      }
    });

    map.on("overlayremove", (e) => {
      if (e.layer === cultureCluster) {
        syncSubFiltersWithCultureToggle(false);
      }
    });
  }
}
