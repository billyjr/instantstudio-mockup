const aspectRatioOptions = [
  { label: "4:3", width: 1200, height: 900 },
  { label: "3:4", width: 900, height: 1200 },
  { label: "1:1", width: 1080, height: 1080 },
  { label: "16:9", width: 1280, height: 720 },
  { label: "9:16", width: 720, height: 1280 }
];

const sampleTitles = [
  "Editorial Portrait",
  "Studio Fashion",
  "Product Scene",
  "Sci-Fi Character",
  "Luxury Campaign",
  "Concept Art",
  "Beauty Close-Up",
  "Sports Ad",
  "Neon Poster",
  "Brand Mockup",
  "Cover Artwork",
  "Lifestyle Scene",
  "Summer Campaign",
  "Visual Identity",
  "Street Portrait",
  "Product Drop",
  "Launch Visual",
  "Motion Keyframe",
  "Lookbook Spread",
  "Gallery Study"
];

const likesPool = [
  "1.2k",
  "864",
  "522",
  "1.9k",
  "973",
  "618",
  "739",
  "1.1k",
  "452",
  "1.4k"
];

const mockPrompts = [
  "Premium editorial portrait with sculpted window light, glossy skin texture, soft film grain, and a luxury campaign framing.",
  "Streetwear campaign still with punchy contrast, oversized typography energy, and a polished studio-production finish.",
  "Product storytelling scene with reflective surfaces, controlled highlights, and a clean premium marketplace aesthetic.",
  "Cinematic concept character artwork with dramatic rim light, rich worldbuilding details, and poster-grade composition.",
  "Lifestyle brand visual with natural texture, restrained warmth, and elevated social-first art direction."
];

const mockDescriptions = [
  "A polished sample output view for reviewing the selected image at full scale before saving, organizing, or sending it into a workflow.",
  "This mock detail panel gives us a realistic place for metadata, prompt review, and handoff actions without needing backend data yet.",
  "Use this panel as the foundation for approvals, tagging, download settings, or generation history once the product flow is connected."
];

const mockTagSets = [
  ["editorial", "portrait", "premium"],
  ["campaign", "studio", "fashion"],
  ["product", "lighting", "commerce"],
  ["concept", "cinematic", "hero-frame"],
  ["lookbook", "brand", "social-first"]
];

const placeholders = Array.from({ length: 20 }, (_, index) => {
  const ratio = aspectRatioOptions[Math.floor(Math.random() * aspectRatioOptions.length)];
  const title = sampleTitles[index] || `Sample ${index + 1}`;
  const likes = likesPool[Math.floor(Math.random() * likesPool.length)];
  const bgColor = index % 2 === 0 ? "F1EEE7" : "FAF8F4";
  const textColor = index % 3 === 0 ? "4A1114" : "2B2829";
  const text = encodeURIComponent(`${title}\n${ratio.label}`);
  const imageUrl = `https://placehold.co/${ratio.width}x${ratio.height}/${bgColor}/${textColor}.png?text=${text}`;
  const modelOptions = ["Wan 2.7 Image", "GPT Image 1.5", "SeeDream 4.5", "Nano Banana 2"];
  const createdDates = [
    "Today, 14:20",
    "Today, 11:42",
    "Yesterday, 20:16",
    "Yesterday, 09:08",
    "Apr 16, 18:24"
  ];

  return {
    title,
    likes,
    imageUrl,
    imageWidth: ratio.width,
    imageHeight: ratio.height,
    aspectValue: ratio.width / ratio.height,
    aspectRatio: ratio.label,
    resolution: `${ratio.width} × ${ratio.height}`,
    model: modelOptions[index % modelOptions.length],
    credits: `${1 + (index % 4)} credits`,
    createdAt: createdDates[index % createdDates.length],
    description: mockDescriptions[index % mockDescriptions.length],
    prompt: mockPrompts[index % mockPrompts.length],
    tags: mockTagSets[index % mockTagSets.length]
  };
});

const gallery = document.getElementById("gallery");
const mobileBackdrop = document.getElementById("mobileBackdrop");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileWorkbenchTab = document.getElementById("mobileWorkbenchTab");
const mobileOutputsTab = document.getElementById("mobileOutputsTab");
const workbenchPanel = document.getElementById("workbenchPanel");
const outputsPanel = document.getElementById("outputsPanel");
const sidebar = document.getElementById("sidebar");
const sidebarHeader = sidebar ? sidebar.querySelector(".sidebar-header") : null;
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarToggleIcon = sidebarToggle ? sidebarToggle.querySelector(".sidebar-toggle-icon") : null;
const mobileBreakpoint = window.matchMedia("(max-width: 960px)");
const generationDialogElement = document.getElementById("generation-dialog");
const sampleDialogElement = document.getElementById("sample-dialog");
const sampleDialogImage = document.getElementById("sampleDialogImage");
const sampleDialogTitle = document.getElementById("sample-dialog-title");
const sampleDialogEyebrow = document.getElementById("sampleDialogEyebrow");
const sampleDialogDescription = document.getElementById("sampleDialogDescription");
const sampleDialogModel = document.getElementById("sampleDialogModel");
const sampleDialogRatio = document.getElementById("sampleDialogRatio");
const sampleDialogResolution = document.getElementById("sampleDialogResolution");
const sampleDialogCreated = document.getElementById("sampleDialogCreated");
const sampleDialogCredits = document.getElementById("sampleDialogCredits");
const sampleDialogPrompt = document.getElementById("sampleDialogPrompt");
const sampleDialogTags = document.getElementById("sampleDialogTags");
const sampleDialogDrawerToggle = document.getElementById("sampleDialogDrawerToggle");

let sampleDialog = null;
let galleryRenderFrame = null;
let galleryResizeObserver = null;
let sidebarToggleRevealTimeout = null;

const createPhotoCard = (item) => {
  const card = document.createElement("article");
  card.className = "gallery-item photo-card group relative overflow-hidden cursor-pointer";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open ${item.title}`);
  card.innerHTML = `
    <img src="${item.imageUrl}" alt="${item.title}" class="photo-card-image h-auto w-full object-cover" loading="lazy" decoding="async" />
    <div class="photo-card-scrim"></div>
    <div class="photo-card-top">
      <span class="photo-card-select" aria-hidden="true">
        <i class="fi fi-rr-check text-[12px]"></i>
      </span>
      <button class="photo-card-action" aria-label="More actions">
        <i class="fi fi-rr-menu-dots-vertical text-[13px]"></i>
      </button>
    </div>
    <div class="photo-card-bottom">
      <div class="photo-card-meta">
        <span class="photo-card-date">${item.createdAt}</span>
        <span class="photo-card-title">${item.title}</span>
      </div>
      <span class="photo-card-count">${item.likes}</span>
    </div>
  `;

  const openSampleDialog = () => {
    if (!sampleDialog) {
      return;
    }

    sampleDialogImage.src = item.imageUrl;
    sampleDialogImage.alt = item.title;
    sampleDialogTitle.textContent = item.title;
    sampleDialogEyebrow.textContent = `${item.aspectRatio} sample output`;
    sampleDialogDescription.textContent = item.description;
    sampleDialogModel.textContent = item.model;
    sampleDialogRatio.textContent = item.aspectRatio;
    sampleDialogResolution.textContent = item.resolution;
    sampleDialogCreated.textContent = item.createdAt;
    sampleDialogCredits.textContent = item.credits;
    sampleDialogPrompt.textContent = item.prompt;
    sampleDialogTags.innerHTML = item.tags
      .map((tag) => `<span class="sample-dialog-tag">${tag}</span>`)
      .join("");
    sampleDialog.show();
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    openSampleDialog();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openSampleDialog();
    }
  });

  return card;
};

const getJustifiedLayoutConfig = () => {
  const width = gallery.clientWidth || outputsPanel.clientWidth || window.innerWidth;

  if (width <= 640) {
    return { targetRowHeight: 150, gap: 10, minItemsPerRow: 2 };
  }

  if (width <= 960) {
    return { targetRowHeight: 176, gap: 10, minItemsPerRow: 2 };
  }

  if (width <= 1280) {
    return { targetRowHeight: 188, gap: 12, minItemsPerRow: 3 };
  }

  return { targetRowHeight: 210, gap: 12, minItemsPerRow: 3 };
};

const appendRow = (fragment, items, config, forceTargetHeight = false) => {
  if (!items.length) {
    return;
  }

  const row = document.createElement("div");
  row.className = "gallery-row";
  row.style.setProperty("--gallery-gap", `${config.gap}px`);

  const containerWidth = gallery.clientWidth || outputsPanel.clientWidth || window.innerWidth;
  const totalAspectRatio = items.reduce((sum, item) => sum + item.aspectValue, 0);
  const totalGapWidth = config.gap * Math.max(0, items.length - 1);
  const availableWidth = Math.max(0, containerWidth - totalGapWidth);
  const computedHeight = availableWidth / totalAspectRatio;
  const minRowHeight = containerWidth <= 640 ? 112 : 138;
  const rowHeight = forceTargetHeight
    ? Math.max(minRowHeight, Math.min(config.targetRowHeight, computedHeight))
    : Math.min(config.targetRowHeight * 1.12, Math.max(minRowHeight, computedHeight));

  items.forEach((item, index) => {
    const card = createPhotoCard(item);
    const isLastItem = index === items.length - 1;
    const width = isLastItem
      ? Math.max(1, availableWidth - Array.from(row.children).reduce((sum, child) => sum + parseInt(child.style.width, 10), 0))
      : Math.max(1, Math.floor(rowHeight * item.aspectValue));

    card.style.width = `${width}px`;
    card.style.height = `${Math.round(rowHeight)}px`;
    row.appendChild(card);
  });

  fragment.appendChild(row);
};

const renderGallery = () => {
  if (!gallery) {
    return;
  }

  const config = getJustifiedLayoutConfig();
  const fragment = document.createDocumentFragment();
  let currentRow = [];
  let aspectAccumulator = 0;
  const containerWidth = gallery.clientWidth || outputsPanel.clientWidth || window.innerWidth;
  const targetAspectSum = (containerWidth - config.gap * (config.minItemsPerRow - 1)) / config.targetRowHeight;

  placeholders.forEach((item) => {
    currentRow.push(item);
    aspectAccumulator += item.aspectValue;

    if (currentRow.length >= config.minItemsPerRow && aspectAccumulator >= targetAspectSum) {
      appendRow(fragment, currentRow, config);
      currentRow = [];
      aspectAccumulator = 0;
    }
  });

  if (currentRow.length) {
    appendRow(fragment, currentRow, config, true);
  }

  gallery.replaceChildren(fragment);
};

const queueGalleryRender = () => {
  if (galleryRenderFrame) {
    window.cancelAnimationFrame(galleryRenderFrame);
  }

  galleryRenderFrame = window.requestAnimationFrame(() => {
    renderGallery();
    galleryRenderFrame = null;
  });
};

const setSampleDrawerExpanded = (expanded) => {
  if (!sampleDialogElement || !sampleDialogDrawerToggle) {
    return;
  }

  sampleDialogElement.classList.toggle("is-drawer-expanded", expanded);
  sampleDialogDrawerToggle.setAttribute("aria-expanded", String(expanded));
  sampleDialogDrawerToggle.setAttribute(
    "aria-label",
    expanded ? "Collapse image information" : "Expand image information"
  );
};

const syncSidebarToggleIcon = (isCollapsed) => {
  if (!sidebarToggleIcon) {
    return;
  }

  sidebarToggleIcon.classList.remove("fi-rr-angle-square-left", "fi-rr-angle-square-right");
  sidebarToggleIcon.classList.add(isCollapsed ? "fi-rr-angle-square-right" : "fi-rr-angle-square-left");
};

const setMobileTab = (panel) => {
  const showWorkbench = panel === "workbench";
  workbenchPanel.classList.toggle("is-active", showWorkbench);
  outputsPanel.classList.toggle("is-active", !showWorkbench);
  mobileWorkbenchTab.classList.toggle("is-active", showWorkbench);
  mobileOutputsTab.classList.toggle("is-active", !showWorkbench);

  if (!showWorkbench) {
    queueGalleryRender();
  }
};

const closeMobileMenu = () => {
  sidebar.classList.remove("is-mobile-open");
  mobileBackdrop.classList.remove("is-open");
};

const openMobileMenu = () => {
  sidebar.classList.add("is-mobile-open");
  mobileBackdrop.classList.add("is-open");
};

sidebarToggle.addEventListener("click", () => {
  if (sidebarToggleRevealTimeout) {
    window.clearTimeout(sidebarToggleRevealTimeout);
  }

  sidebar.classList.add("is-toggle-suppressed");

  if (mobileBreakpoint.matches) {
    closeMobileMenu();
    sidebarToggle.blur();
    return;
  }

  const isCollapsed = sidebar.classList.toggle("is-collapsed");
  sidebarToggle.setAttribute("aria-expanded", String(!isCollapsed));
  sidebarToggle.setAttribute("aria-label", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
  syncSidebarToggleIcon(isCollapsed);
  sidebarToggle.blur();

  if (!isCollapsed) {
    sidebarToggleRevealTimeout = window.setTimeout(() => {
      sidebar.classList.remove("is-toggle-suppressed");
      sidebarToggleRevealTimeout = null;
    }, 220);
  }
});

if (sidebarHeader) {
  sidebarHeader.addEventListener("mouseleave", () => {
    sidebar.classList.remove("is-toggle-suppressed");
    if (sidebarToggleRevealTimeout) {
      window.clearTimeout(sidebarToggleRevealTimeout);
      sidebarToggleRevealTimeout = null;
    }
  });
}

if (sidebar) {
  syncSidebarToggleIcon(sidebar.classList.contains("is-collapsed"));
}

mobileMenuButton.addEventListener("click", () => {
  if (sidebar.classList.contains("is-mobile-open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

mobileBackdrop.addEventListener("click", closeMobileMenu);
mobileWorkbenchTab.addEventListener("click", () => setMobileTab("workbench"));
mobileOutputsTab.addEventListener("click", () => setMobileTab("outputs"));

const syncResponsiveState = () => {
  if (mobileBreakpoint.matches) {
    sidebar.classList.remove("is-collapsed");
    sidebarToggle.setAttribute("aria-expanded", "false");
    sidebarToggle.setAttribute("aria-label", "Close sidebar");
    setMobileTab(mobileOutputsTab.classList.contains("is-active") ? "outputs" : "workbench");
  } else {
    closeMobileMenu();
    workbenchPanel.classList.add("is-active");
    outputsPanel.classList.remove("is-active");
    mobileWorkbenchTab.classList.add("is-active");
    mobileOutputsTab.classList.remove("is-active");
    sidebarToggle.setAttribute("aria-expanded", String(!sidebar.classList.contains("is-collapsed")));
    sidebarToggle.setAttribute("aria-label", sidebar.classList.contains("is-collapsed") ? "Expand sidebar" : "Collapse sidebar");
    queueGalleryRender();
  }
};

if (mobileBreakpoint.addEventListener) {
  mobileBreakpoint.addEventListener("change", syncResponsiveState);
} else {
  mobileBreakpoint.addListener(syncResponsiveState);
}

syncResponsiveState();
queueGalleryRender();

window.addEventListener("resize", queueGalleryRender);

if (window.ResizeObserver && outputsPanel) {
  galleryResizeObserver = new window.ResizeObserver(() => {
    queueGalleryRender();
  });
  galleryResizeObserver.observe(outputsPanel);
}

if (window.A11yDialog && generationDialogElement) {
  const generationDialog = new window.A11yDialog(generationDialogElement);
  const root = document.documentElement;

  generationDialog
    .on("show", () => {
      root.style.overflow = "hidden";
    })
    .on("hide", () => {
      root.style.overflow = "";
    });
}

if (window.A11yDialog && sampleDialogElement) {
  sampleDialog = new window.A11yDialog(sampleDialogElement);
  const root = document.documentElement;

  sampleDialog
    .on("show", () => {
      root.style.overflow = "hidden";
      setSampleDrawerExpanded(false);
    })
    .on("hide", () => {
      root.style.overflow = "";
      setSampleDrawerExpanded(false);
    });
}

if (sampleDialogDrawerToggle) {
  sampleDialogDrawerToggle.addEventListener("click", () => {
    const isExpanded = sampleDialogElement.classList.contains("is-drawer-expanded");
    setSampleDrawerExpanded(!isExpanded);
  });
}
