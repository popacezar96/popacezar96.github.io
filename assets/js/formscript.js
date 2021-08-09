// AJAX code added to the form from Formspree.com to modify default behaviour on submit

var form = document.getElementById("my-form");

	 async function handleSubmit(event) {
		 event.preventDefault();
		 var status = document.getElementById("form-buttons");
		 var data = new FormData(event.target);
		 fetch(event.target.action, {
			 method: form.method,
			 body: data,
			 headers: {
					 'Accept': 'application/json'
			 }
		 }).then(response => {

			 var listItem = document.createElement("li");
			 listItem.innerHTML = "<strong>Success!</strong> I'll get back to you!"
			 listItem.setAttribute("class", "success");
			 status.appendChild(listItem);

			 form.reset();

			 setTimeout(function(){
			 	status.removeChild(status.lastElementChild);
			}, 4000);


		 }).catch(error => {

			 var listItem = document.createElement("li");
			 listItem.innerHTML = "<strong>Error!</strong> Contact me elswhere!";
			 listItem.setAttribute("class", "error");
			 status.appendChild(listItem);

	 	 	form.reset();

			setTimeout(function(){
			 status.removeChild(status.lastElementChild);
		 }, 4000);

		 });
	 }
	 form.addEventListener("submit", handleSubmit)
