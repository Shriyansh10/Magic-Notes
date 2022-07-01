console.log("Welcome to Console");

showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  let notesTitle = localStorage.getItem("notesTitle");

  if (notes == null || notesTitle == null) {
    notesObj = [];
    notesTitleObj = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitleObj = JSON.parse(notesTitle);
  }

  if (addTxt.value.length == 0 || addTitle.value.length == 0) {
    swal("Oops", "Title/Details is missing!!!", "error");
  } else {
    notesObj.push(addTxt.value);
    notesTitleObj.push(addTitle.value);
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("notesTitle", JSON.stringify(notesTitleObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesTitle = localStorage.getItem("notesTitle");

  if (notes == null || notesTitle == null) {
    notesObj = [];
    notesTitleObj = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitleObj = JSON.parse(notesTitle);
  }
  // console.log(notesObj);
  let html = "";
  notesObj.forEach(function (element, index) {
    // console.log(notesObj[index]);

    html += `<div class="myNotes card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${index + 1}. ${notesTitleObj[index]}</h5>
          <p class="card-text">${element}</p>
          <button class="btn btn-primary" onclick="deleteNode(this.id)" id="${index}" >Delete Note</button>
        </div>
      </div>`;
  });
  // console.log(html);
  
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show here. Use 'Add Note' to add some notes`;
  }
}

function deleteNode(index) {
  // console.log("deleting", index);
  let notes = localStorage.getItem("notes");
  let notesTitle = localStorage.getItem("notesTitle");

  if (notes == null || notesTitle == null) {
    notesObj = [];
    notesTitleObj = [];
  } else {
    notesObj = JSON.parse(notes);
    notesTitleObj = JSON.parse(notesTitle);
  }
  notesObj.splice(index, 1);
  notesTitleObj.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("notesTitle", JSON.stringify(notesTitleObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let val = search.value.toLowerCase();
  let notesElem = document.getElementsByClassName("myNotes");
  Array.from(notesElem).forEach(function (element) {
    let elemtxt = element.getElementsByTagName("p")[0].innerHTML.toLowerCase();
    let titletxt = element
      .getElementsByTagName("h5")[0]
      .innerHTML.toLowerCase();
    // console.log(elemtxt);
    if (elemtxt.includes(val) || titletxt.includes(val)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
