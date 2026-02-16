let currentSection = "";
let currentIndex = 0;
let sectionData = [];

// Section descriptions (first line in modal)
const sectionDescriptions = {
  anchors: "Your daily orientation to stay grounded and focused.",
  financial: "Guidance for making calm, practical financial choices.",
  immigration: "Navigate systems and paperwork without losing confidence.",
  burnout: "Strategies to function and reset while exhausted.",
  relationships: "Support for handling isolation, marriage strain, and connection.",
  reset: "Immediate grounding and calming guidance."
};

// Load preview anchor
function loadPreview() {
  fetch("data/anchors.json")
    .then(res => res.json())
    .then(data => {
      document.getElementById("anchorPreview").innerText = data[0];
    });
}

loadPreview();

function openSection(section) {
  currentSection = section;
  currentIndex = 0;

  fetch(`data/${section}.json`)
    .then(res => res.json())
    .then(data => {
      sectionData = data;
      document.getElementById("modalTitle").innerText =
        section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1');
      document.getElementById("modalDescription").innerText = sectionDescriptions[section] || "";
      document.getElementById("modalText").innerText = sectionData[currentIndex];
      document.getElementById("modal").classList.remove("hidden");
    });
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function nextItem() {
  currentIndex = (currentIndex + 1) % sectionData.length;
  document.getElementById("modalText").innerText = sectionData[currentIndex];
}
