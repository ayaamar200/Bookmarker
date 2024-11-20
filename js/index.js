//!.................. Global Variables ..................//!

// Inputs Elements
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteURL");

var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var boxModelContainer = document.getElementById("boxModal");
var closeBtn = document.getElementById("closeBtn");
var websitesList = [];

var currentIndex = 0;

// Retrieve Data

if (localStorage.getItem("websitesContainer") !== null) {
  websitesList = JSON.parse(localStorage.getItem("websitesContainer"));
  displayData();
}

//!.................. Functions ..................//!

// Create Data

function submitData() {
  if (siteNameValidation() && siteUrlValidation()) {
    var website = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };

    websitesList.push(website);

    localStorage.setItem("websitesContainer", JSON.stringify(websitesList));

    displayData();

    alert("Your Bookmark is Added Successfully!");

    clearForm();
  } else {
    boxModelContainer.classList.remove("d-none");
  }
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";

  siteNameInput.classList.remove("is-invalid");
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-invalid");
  siteUrlInput.classList.remove("is-valid");
}

function displayData() {
  var tableContent = "";
  for (var i = 0; i < websitesList.length; i++) {
    tableContent += `
        <tr> 
          <td>${i + 1}</td>
          <td class="text-capitalize">${websitesList[i].siteName}</td>
          <td>
            <button onclick="visitWebsite(${i})" type="button" class="text-capitalize btn btn-visit">
              <span class="pe-2"><i class="fa-solid fa-eye"></i></span
              >visit
            </button>
          </td>
          <td>
            <button onclick="editWebsiteInfo(${i})" type="button" class="text-capitalize btn btn-edit">
              <span class="pe-2"><i class="fa-regular fa-pen-to-square"></i></span
              >edit
            </button>
          </td>
          <td>
            <button onclick="deleteItem(${i})" type="button" class="text-capitalize btn btn-delete">
              <span class="pe-2"
                ><i class="fa-solid fa-trash-can"></i></span
              >delete
            </button>
          </td>
        </tr>
    `;
  }

  document.getElementById("tableContent").innerHTML = tableContent;
}

// Visit Website

function visitWebsite(index) {
  window.open(websitesList[index].siteUrl, "_blank");
}

// Update Data

function editWebsiteInfo(index) {
  currentIndex = index;
  siteNameInput.value = websitesList[index].siteName;
  siteUrlInput.value = websitesList[index].siteUrl;

  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function editWebsite() {
  if (siteNameValidation() && siteUrlValidation()) {
    var website = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };

    websitesList.splice(currentIndex , 1 ,website);

    localStorage.setItem("websitesContainer", JSON.stringify(websitesList));

    displayData();

    alert("Your Bookmark is Saved Successfully!");

    clearForm();
    
    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  } else {
    boxModelContainer.classList.remove("d-none");
  }
}

// Delete Data

function deleteItem(index) {
  websitesList.splice(index, 1);
  localStorage.setItem("websitesContainer", JSON.stringify(websitesList));
  displayData();
  alert("Your Bookmark is Deleted Successfully!");
}

//! Data Validation

function siteNameValidation() {
  var siteNameRegex = /^\w{3,}(\s+\w+)*$/;
  var siteName = siteNameInput.value;

  if (siteNameRegex.test(siteName)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    return false;
  }
}

function siteUrlValidation() {
  var siteUrlRegex =
    /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  var siteUrl = siteUrlInput.value;

  if (siteUrlRegex.test(siteUrl)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    return false;
  }
}

function closeBoxModal() {
  boxModelContainer.classList.add("d-none");
}
