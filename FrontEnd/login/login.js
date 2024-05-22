async function postLogin () {
	document.getElementById("loginForm").addEventListener("submit", function(event) {
		event.preventDefault();
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		fetch("/user/login", {
			method: "POST",
			headers: { "Content-Type": "application.json" },
			body: JSON.stringify({
				"email": username, 
				"password": password
			})
		});
	});
};