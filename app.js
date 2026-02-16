let currentSection = "";
let currentIndex = 0;
let sectionData = [];

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
        section.charAt(0).toUpperCase() + section.slice(1);
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
