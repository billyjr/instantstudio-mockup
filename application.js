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
const sidebarToggle = document.getElementById("sidebarToggle");
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

let sampleDialog = null;

placeholders.forEach((item) => {
  const card = document.createElement("article");
  card.className = "masonry-item group relative overflow-hidden rounded-xl bg-white shadow-card cursor-pointer";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open ${item.title}`);
  card.innerHTML = `
    <img src="${item.imageUrl}" alt="${item.title}" class="h-auto w-full object-cover" loading="lazy" decoding="async" />
    <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(74,17,20,0.22),rgba(74,17,20,0.03),transparent)] opacity-0 transition duration-200 group-hover:opacity-100"></div>
    <div class="absolute inset-x-3 top-3 flex translate-y-1 items-center justify-between opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
      <span class="rounded-full bg-white px-[10px] py-[5px] text-[12px] font-medium text-instant-ink shadow-border">${item.title}</span>
      <button class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-secondary shadow-border transition hover:bg-brand-orange50/40">
        <i class="fi fi-rr-bookmark text-[13px]"></i>
      </button>
    </div>
    <div class="absolute inset-x-3 bottom-3 flex translate-y-1 items-center justify-between opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
      <div class="flex items-center gap-2">
        <button class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-secondary shadow-border transition hover:bg-brand-orange50/40">
          <i class="fi fi-rr-heart text-[13px]"></i>
        </button>
        <button class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-secondary shadow-border transition hover:bg-brand-orange50/40">
          <i class="fi fi-rr-folder-plus text-[13px]"></i>
        </button>
        <button class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-secondary shadow-border transition hover:bg-brand-orange50/40">
          <i class="fi fi-rr-trash text-[13px]"></i>
        </button>
      </div>
      <span class="rounded-full bg-white px-[10px] py-[5px] text-[12px] font-medium text-instant-ink shadow-border">${item.likes}</span>
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

  gallery.appendChild(card);
});

const setMobileTab = (panel) => {
  const showWorkbench = panel === "workbench";
  workbenchPanel.classList.toggle("is-active", showWorkbench);
  outputsPanel.classList.toggle("is-active", !showWorkbench);
  mobileWorkbenchTab.classList.toggle("is-active", showWorkbench);
  mobileOutputsTab.classList.toggle("is-active", !showWorkbench);
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
  if (mobileBreakpoint.matches) {
    closeMobileMenu();
    return;
  }

  const isCollapsed = sidebar.classList.toggle("is-collapsed");
  sidebarToggle.setAttribute("aria-expanded", String(!isCollapsed));
  sidebarToggle.setAttribute("aria-label", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
});

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
  }
};

if (mobileBreakpoint.addEventListener) {
  mobileBreakpoint.addEventListener("change", syncResponsiveState);
} else {
  mobileBreakpoint.addListener(syncResponsiveState);
}

syncResponsiveState();

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
    })
    .on("hide", () => {
      root.style.overflow = "";
    });
}
