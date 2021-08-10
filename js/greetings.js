const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("h1#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const link = document.querySelector("a");

function askSavedName() {
	loginForm.classList.remove(HIDDEN_CLASSNAME);
	loginForm.addEventListener("submit", onLoginSubmit);
}

function onLoginSubmit(event) {
	event.preventDefault(); // stops event's default behavior
	loginForm.classList.add(HIDDEN_CLASSNAME);
	const typedUsername = loginInput.value;
	localStorage.setItem(USERNAME_KEY, typedUsername);
	paintGreetings(typedUsername);
}

function paintGreetings(username) {
	greeting.innerText = `Hello ${username}`;
	greeting.classList.remove(HIDDEN_CLASSNAME);
}

// Start
const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
	// show the form
	askSavedName();
} else {
	//show the greeting
	paintGreetings(savedUserName);
}
