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

function getOverlayControlContainer(layerControl) {
  return (
    layerControl?._container?.querySelector(
      ".leaflet-control-layers-overlays",
    ) || document.querySelector(".leaflet-control-layers-overlays")
  );
}

function insertFilterGroup(layerControl, customGroup) {
  const controlContainer = getOverlayControlContainer(layerControl);

  if (!controlContainer) {
    return null;
  }

  const { label: cultureMainLabel } = findCultureMainCheckbox(controlContainer);

  if (cultureMainLabel?.parentNode) {
    cultureMainLabel.parentNode.insertBefore(
      customGroup,
      cultureMainLabel.nextSibling,
    );
  } else if (customGroup.parentNode !== controlContainer) {
    controlContainer.appendChild(customGroup);
  }

  return controlContainer;
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

  const controlContainer = getOverlayControlContainer(layerControl);

  if (!controlContainer) {
    return;
  }

  const customGroup = document.createElement("div");
  customGroup.className = "leaflet-control-layers-group";

  const title = document.createElement("span");
  title.className = "leaflet-control-layers-group-label culture-filter-title";

  const titleText = document.createElement("span");
  titleText.textContent = "Filtres culture";

  const titleIcon = document.createElement("span");
  titleIcon.className = "culture-filter-toggle-icon";
  titleIcon.textContent = "▼";

  title.append(titleText, titleIcon);

  const filterContent = document.createElement("div");
  filterContent.className =
    "leaflet-control-layers-group-content culture-filter-content";

  filterContent.innerHTML = createFilterMarkup();

  title.addEventListener("click", () => {
    const isVisible = filterContent.classList.toggle("is-open");
    titleIcon.textContent = isVisible ? "▲" : "▼";
  });

  customGroup.appendChild(title);
  customGroup.appendChild(filterContent);

  insertFilterGroup(layerControl, customGroup);

  const checkboxEntries = CULTURE_FILTERS.map((filter) => ({
    ...filter,
    checkbox: filterContent.querySelector(`#${filter.id}`),
    markers: groups[filter.groupKey] || [],
  })).filter(({ checkbox }) => checkbox);

  let isCultureEnabled = null;
  let syncSource = null;

  const getCultureMainCheckbox = () =>
    findCultureMainCheckbox(
      getOverlayControlContainer(layerControl) || controlContainer,
    ).checkbox;

  const getCheckedCount = () =>
    checkboxEntries.filter(({ checkbox }) => checkbox.checked).length;

  const setCultureLayerEnabled = (enabled, source = "program") => {
    if (isCultureEnabled === enabled) {
      return;
    }

    isCultureEnabled = enabled;
    syncSource = source;

    if (!map) {
      return;
    }

    if (enabled) {
      if (!map.hasLayer(cultureCluster)) {
        map.addLayer(cultureCluster);
      }
    } else if (map.hasLayer(cultureCluster)) {
      map.removeLayer(cultureCluster);
    }
  };

  const syncMainCheckboxState = () => {
    const cultureMainCheckbox = getCultureMainCheckbox();

    if (!cultureMainCheckbox) {
      return;
    }

    const checkedCount = getCheckedCount();
    const allChecked = checkedCount === checkboxEntries.length;
    const anyChecked = checkedCount > 0;

    cultureMainCheckbox.checked = anyChecked;
    cultureMainCheckbox.indeterminate = anyChecked && !allChecked;
  };

  const applySubFilters = () => {
    checkboxEntries.forEach(({ checkbox, markers }) => {
      setCategoryVisible(cultureCluster, markers, checkbox.checked);
    });

    const anyChecked = getCheckedCount() > 0;
    setCultureLayerEnabled(anyChecked, "subfilter");
    syncMainCheckboxState();
  };

  const syncSubFiltersWithCultureToggle = (cultureEnabled) => {
    if (isCultureEnabled === cultureEnabled) {
      return;
    }

    checkboxEntries.forEach(({ checkbox }) => {
      checkbox.checked = cultureEnabled;
    });

    setCultureLayerEnabled(cultureEnabled, "main-toggle");
    applySubFilters();
  };

  checkboxEntries.forEach(({ checkbox, markers }) => {
    checkbox.addEventListener("change", (e) => {
      setCategoryVisible(cultureCluster, markers, e.target.checked);
      const anyChecked = getCheckedCount() > 0;
      setCultureLayerEnabled(anyChecked);
      syncMainCheckboxState();
    });
  });

  syncSubFiltersWithCultureToggle(Boolean(getCultureMainCheckbox()?.checked));

  if (map) {
    map.on("overlayadd", (e) => {
      if (e.layer === cultureCluster) {
        insertFilterGroup(layerControl, customGroup);

        if (syncSource === "subfilter") {
          isCultureEnabled = true;
          syncMainCheckboxState();
        } else {
          syncSubFiltersWithCultureToggle(true);
        }

        syncSource = null;
      }
    });

    map.on("overlayremove", (e) => {
      if (e.layer === cultureCluster) {
        insertFilterGroup(layerControl, customGroup);

        if (syncSource === "subfilter") {
          isCultureEnabled = false;
          syncMainCheckboxState();
        } else {
          syncSubFiltersWithCultureToggle(false);
        }

        syncSource = null;
      }
    });
  }
}
