const toDoForm = document.getElementById("todo-form"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let idNumber = 1;

let toDos = [];

function saveToDos() {
	localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
	//delete from HTMLDocument
	const targetToDo = event.target.parentElement;
	targetToDo.remove();
	//update the toDos in localStorage
	const cleanToDos = toDos.filter(
		(toDo) => toDo.id !== parseInt(targetToDo.id)
	);
	toDos = cleanToDos;
	saveToDos();
}

function paintToDo(newToDoObj) {
	const toDo = document.createElement("li");
	toDo.id = newToDoObj.id;
	const toDoName = document.createElement("span");
	toDoName.innerText = newToDoObj.text;
	const delBtn = document.createElement("button");
	delBtn.innerText = "❌";
	delBtn.addEventListener("click", deleteToDo);
	const newId = idNumber;
	idNumber += 1;

	toDo.appendChild(toDoName);
	toDo.appendChild(delBtn);
	toDoList.appendChild(toDo);
}

function handleToDoSubmit(event) {
	event.preventDefault();
	const newToDoObj = {
		text: toDoInput.value,
		id: idNumber,
	};
	toDoInput.value = "";
	toDos.push(newToDoObj);
	paintToDo(newToDoObj);
	saveToDos();
}

// Start
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
	const parsedToDos = JSON.parse(savedToDos);
	toDos = parsedToDos; // update toDos with localStorage
	parsedToDos.forEach(paintToDo);
}
toDoForm.addEventListener("submit", handleToDoSubmit);
