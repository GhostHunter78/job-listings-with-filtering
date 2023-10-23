"use strict";
import data from "./data.json" assert { type: "json" };
const cardsDiv = document.querySelector(".cards-div");
const filteredButtonsWindow = document.querySelector(
  ".selected-buttons-and-clear"
);
const selectedButtonsDiv = document.querySelector(".selected-buttons-div");

const clear = document.querySelector(".clear");

const selectedFilters = [];
const jobCards = [];

function displayJobs(jobs) {
  cardsDiv.innerHTML = "";

  jobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    jobCards.push(card);

    if (index === 0) {
      card.classList.add("first-card");
    }

    function createLanguagesButton() {
      let newLanguagesButton = "";
      for (let i = 0; i < job.languages.length; i++) {
        newLanguagesButton += `<button onClick="handleButtonClick(this)" class="role ">${job.languages[i]}</button>`;
      }

      return newLanguagesButton;
    }

    function createToolsButton() {
      let newToolsButton = "";
      for (let i = 0; i < job.tools.length; i++) {
        newToolsButton += `<button onClick="handleButtonClick(this)" class="role ">${job.tools[i]}</button>`;
      }

      return newToolsButton;
    }

    card.innerHTML = ` 
      <div class="content-and-buttonsDiv">
      <img class="logo" src="${job.logo}" alt="${job.company} Logo">
      <div class="content">
      <div class="company-new-featured">
      <p class="company-name">${job.company}</p>
      ${job.newAdded ? '<div class="new">NEW!</div>' : ""}
      ${job.featured ? '<div class="featured">FEATURED</div>' : ""}
      </div>
      <h3 class="job-position">${job.position}</h3>
      <div class="postedAt-contract-location">
      <p class="grey-word">${job.postedAt}</p>
      <div class="grey-dot"></div>
      <p class="grey-word">${job.contract}</p>
      <div class="grey-dot"></div>
      <p class="grey-word">${job.location}</p>
      </div>
      <div class="grey-line"></div>
      </div>
      </div>
      <div class="buttons-div">
      <button onClick="handleButtonClick(this)" class="role" >${
        job.role
      }</button>
      <button onClick="handleButtonClick(this)" class="role">${
        job.level
      }</button>
      ${createLanguagesButton()}
      ${createToolsButton()} 
          </div>
    
    `;

    cardsDiv.appendChild(card);
  });
}

displayJobs(data);

clear.addEventListener("click", () => {
  selectedFilters.splice(0, selectedFilters.length);
  filteredButtonsWindow.style.display = "none";
  selectedButtonsDiv.innerHTML = "";
  filterCards(selectedFilters);
});

window.handleButtonClick = (button) => {
  const buttonText = button.textContent;
  if (!selectedFilters.includes(buttonText)) {
    selectedFilters.push(buttonText);

    const selectedAndRemoveButtonsDiv = document.createElement("div");
    selectedAndRemoveButtonsDiv.classList.add("selected-and-remove-buttons");

    const selectedElement = document.createElement("button");
    selectedElement.classList.add("role");
    selectedElement.textContent = buttonText;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");

    const removeIcon = document.createElement("img");
    removeIcon.src = "./assets/icons/icon-remove.svg";
    removeIcon.classList.add("remove-icon");

    selectedAndRemoveButtonsDiv.appendChild(selectedElement);
    selectedAndRemoveButtonsDiv.appendChild(removeButton);
    selectedElement.appendChild(removeIcon);
    selectedButtonsDiv.appendChild(selectedAndRemoveButtonsDiv);
    removeButton.appendChild(removeIcon);

    filteredButtonsWindow.style.display = "flex";
    selectedButtonsDiv.style.display = "flex";
    selectedAndRemoveButtonsDiv.style.display = "flex";
  }

  filterCards(selectedFilters);
};

selectedButtonsDiv.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const index = selectedFilters.indexOf(clickedElement);

  if (clickedElement.classList.contains("remove-button")) {
    clickedElement.parentElement.remove();
    selectedFilters.splice(index, 1);
    filterCards(selectedFilters);

    if (selectedButtonsDiv.children.length === 0) {
      selectedFilters.splice(0, selectedFilters.length);
      filteredButtonsWindow.style.display = "none";
      selectedButtonsDiv.innerHTML = "";
    }
  } else if (clickedElement.classList.contains("remove-icon")) {
    const parentdiv = clickedElement.closest("div");
    if (parentdiv) {
      parentdiv.remove();
      selectedFilters.splice(index, 1);
      filterCards(selectedFilters);
    }
    if (selectedButtonsDiv.children.length === 0) {
      selectedFilters.splice(0, selectedFilters.length);
      filteredButtonsWindow.style.display = "none";
      selectedButtonsDiv.innerHTML = "";
      filterCards(selectedFilters);
    }
  }
});

function filterCards() {
  const filteredData = data.filter((job) => {
    return selectedFilters.every((button) => {
      return (
        job.role.includes(button) ||
        job.languages.includes(button) ||
        job.level.includes(button) ||
        job.tools.includes(button)
      );
    });
  });

  displayJobs(filteredData);
}
