let userInput = document.getElementById("inputField");
let list = document.getElementById("todoList");

function add() {
  if (userInput.value === "") {
    alert("You must write something!");
  } else {
    let liElement = document.createElement("li");
    liElement.innerHTML = userInput.value;
    list.appendChild(liElement);

    let liEdit = document.createElement("button");
    liEdit.classList.add("edit-Btn");
    let liEditText = document.createTextNode("i");
    liEdit.setAttribute("onclick", "edit(this)");
    liEdit.appendChild(liEditText);
    liElement.appendChild(liEdit);

    let liDelete = document.createElement("button");
    liDelete.classList.add("del-Btn");
    let liDeleteText = document.createTextNode("X");
    liDelete.setAttribute("onclick", "del(this)");
    liDelete.appendChild(liDeleteText);
    liElement.appendChild(liDelete);
  }
  userInput.value = "";
}

function deleteAll() {
  list.innerHTML = "";
}

function edit(edit) {
  edit.parentNode.firstChild.nodeValue = prompt("Add a new task!");
}

function del(del) {
  del.parentNode.remove();
}
