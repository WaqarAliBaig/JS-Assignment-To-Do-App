const firebaseConfig = {
  apiKey: "AIzaSyDdY6MsqVwmZwxSwJN3eWse86WTSvAdjCE",
  authDomain: "toda-app-97983.firebaseapp.com",
  databaseURL: "https://toda-app-97983-default-rtdb.firebaseio.com",
  projectId: "toda-app-97983",
  storageBucket: "toda-app-97983.appspot.com",
  messagingSenderId: "957963936846",
  appId: "1:957963936846:web:0f9489fab67509178e8f1f",
};

const app = firebase.initializeApp(firebaseConfig);

let userInput = document.getElementById("inputField");
let list = document.getElementById("todoList");

// Todo App with firebase Database
firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    let liElement = document.createElement("li"); // create li element in HTML form JS
    let liText = document.createTextNode(data.val().value);
    liElement.appendChild(liText); // create appendChild method to put text in the li element
    // liElement.innerHTML = userInput.value;
    list.appendChild(liElement);

    // Dynamically created Edit Button in HTML from JS
    let liEdit = document.createElement("button"); // create button element in HTML
    liEdit.classList.add("edit-Btn"); // add edit button in HTML
    let liEditText = document.createTextNode("i"); // create text node for editing text in HTML
    liEdit.setAttribute("id", data.val().key); // 
    liEdit.setAttribute("onclick", "edit(this)");
    liEdit.appendChild(liEditText); 
    liElement.appendChild(liEdit);

    // Dynamically created Delete Button in HTML from JS
    let liDelete = document.createElement("button"); // create button element in HTML
    liDelete.classList.add("del-Btn"); // add delete button in HTML
    let liDeleteText = document.createTextNode("X"); // create text node for deleting text in HTML
    liDelete.setAttribute("id", data.val().key);
    liDelete.setAttribute("onclick", "del(this)");
    liDelete.appendChild(liDeleteText);
    liElement.appendChild(liDelete);
    // }
    userInput.value = "";
  });

function add() {
  if (userInput.value === "") {
    alert("You must write something!");
  } else {
    let key = firebase.database().ref("todos").push().key;

    let obj = {
      value: userInput.value,
      key: key,
    };

    firebase.database().ref("todos").child(key).set(obj);
  }
}

function deleteAll() {
  firebase.database().ref("todos").remove();
  list.innerHTML = "";
}

function edit(edit) {
  let userInput = prompt("Add a new task!");
  edit.parentNode.firstChild.nodeValue = userInput;

  let editTodo = {
    value: userInput,
    key: edit.id,
  };

  firebase.database().ref("todos").child(edit.id).set(editTodo);
}

function del(del) {
  firebase.database().ref("todos").child(del.id).remove();
  del.parentNode.remove();
}
