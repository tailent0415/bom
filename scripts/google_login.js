// google login render icon
function renderButton(){
	gapi.signin2.render('my-signin2', {
		'scope': 'profile email',
		'width': 180,
		'height': 32,
		'longtitle': true,
		'theme': 'dark',
		'onsuccess': onSuccess,
		'onfailure': onFailure
	});
};


// google login event
function onSuccess(googleUser){
	user_email = googleUser.getBasicProfile().getEmail();
	user_id = user_email.substring( 0, user_email.indexOf("@") );
	user_name = googleUser.getBasicProfile().getName();
	console.log('Logged in as: ' + user_email + user_id );
	document.getElementById("user_title").innerHTML = "Hello"+ " " + user_name;
	receive_db_info();
};


// google login failure report
function onFailure(error){
	alert(error);
};


