import { programmingData } from "./programmingData.js";

// Sample data for programming languages
const languages = [
  "JavaScript",
  "Python",
  "Java",
  "Ruby",
  "C++",
  "Go",
  "TypeScript",
];

// DOM elements
const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.getElementById("dropdown-content");
const dropdownButton = document.querySelector(".dropdown-btn");
const repoDetails = document.getElementById("repo-details");
const refreshBtn = document.getElementById("refresh-btn");

let selectedLanguage = null;

// Populate dropdown with programming languages
programmingData.forEach((language) => {
  const languageOption = document.createElement("div");
  languageOption.textContent = language.value;
  languageOption.addEventListener("click", () => {
    selectedLanguage = language.value;
    dropdownButton.textContent = language.value; // Update button text to selected language
    dropdown.classList.remove("active"); // Close dropdown
    fetchRandomRepository(); // Fetch repository immediately
  });
  dropdownContent.appendChild(languageOption);
});

// Toggle dropdown visibility
dropdownButton.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

// Fetch a random repository based on the selected language
async function fetchRandomRepository() {
  if (!selectedLanguage) {
    alert("Please select a programming language!");
    return;
  }

  // Show loading state
  repoDetails.innerHTML = "<p>Loading...</p>";
  repoDetails.style.display = "block";

  try {
    // Make a request to the GitHub API
    const randomQuery = `language:${selectedLanguage}`;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${randomQuery}&sort=stars&order=desc`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      // Pick a random repository from the results
      const randomRepo =
        data.items[Math.floor(Math.random() * data.items.length)];
      displayRepository(randomRepo);
    } else {
      displayError("No repositories found for this language.");
    }
  } catch (error) {
    displayError("Failed to fetch data. Please try again later.");
    console.error("Error fetching repository:", error);
  }
}

// Display repository details
function displayRepository(repo) {
  repoDetails.innerHTML = `
    <h2>${repo.full_name}</h2>
    <p><strong>Description:</strong> ${
      repo.description || "No description provided."
    }</p>
    <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
    <p><strong>Forks:</strong> ${repo.forks_count}</p>
    <p><strong>Open Issues:</strong> ${repo.open_issues_count}</p>
    <p><strong>URL:</strong> <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>
  `;
  refreshBtn.style.display = "inline-block"; // Show the "Refresh" button
}

// Display error message
function displayError(message) {
  repoDetails.innerHTML = `<p>${message}</p>`;
  refreshBtn.style.display = "none"; // Hide "Refresh" button
}

// Fetch a new repository on "Refresh" button click
refreshBtn.addEventListener("click", fetchRandomRepository);

// Close dropdown if clicked outside
window.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});
