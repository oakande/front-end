// VARIABLES
var editMovieId = null;

// EVENTS

var signInBtn = document.querySelector('#signup-btn');
signInBtn.onclick = function() {
  $('#login-screen').fadeOut(500, function() {
    $('#signup-screen').fadeIn(500)
  });
}

var welcomeBtn = document.querySelector("#welcome-btn");
welcomeBtn.onclick = function () {
  $('#welcome-screen').fadeOut(500, function(){
    loadMovies();
  });
};

var viewAddMovie = document.querySelector("#viewAddMovie");
viewAddMovie.onclick = function () {
  $('#show-movies').fadeOut(500, function(){
    $('#add-movie').fadeIn(500);
  });
};

var goBack = document.querySelector("#go-back");
goBack.onclick = function () {
  $('#add-movie').fadeOut(500, function(){
    $('#show-movies').fadeIn(500);
  });
};

var goBackLogin = document.querySelector("#back1");
goBackLogin.onclick = function () {
  $('#signup-screen').fadeOut(500, function(){
    $('#login-screen').fadeIn(500);
  });
};

var updateBack = document.querySelector("#update-back");
updateBack.onclick = function () {
  $('#update-movie').fadeOut(500, function(){
    $('#show-movies').fadeIn(500);
      //loadMovies();
  });
}


// To save a new movie record 
var saveButton = document.querySelector("#save-button");
saveButton.onclick = function () {
  console.log("The save button was clicked.");

  var titleField = document.querySelector("#title-field");
  var genreField = document.querySelector("#genre-field");
  var yearField = document.querySelector("#year-field");
  var posterField = document.querySelector("#poster-field");
  var descrField = document.querySelector("#descr-field");

  if (titleField.value == "" || genreField.value == "" || yearField.value == "" || posterField.value == "" || descrField.value == "" ) {
    alert("All field values required");
    return false;
  } else {
    validateSuccess();
    createMovie(titleField.value, genreField.value, yearField.value, posterField.value, descrField.value);
  }

  function validateSuccess () {

    $('#add-movie').fadeOut(500, function(){
      $('#show-movies').fadeIn(500);

      // When user submits form all fields should be cleared out after validation success
      titleField.value = "";
      genreField.value = "";
      yearField.value = "";
      posterField.value = "";
      descrField.value = "";
    });
  }

};

var saveUserButton = document.querySelector("#save-user");
saveUserButton.onclick = function () {

  var fnameField = document.querySelector("#fname-field");
  var lnameField = document.querySelector("#lname-field");
  var emailField = document.querySelector("#email-field");
  var pwField = document.querySelector("#pw-field");

  if (fnameField.value == "" || lnameField.value == "" || emailField.value == "" || pwField.value == "") {
    alert("All field values required");
    return false;
  } else {  
    createUser(fnameField.value, lnameField.value, emailField.value, pwField.value);
  }

};

var verifyUserByEmail = document.querySelector("#login-btn");
verifyUserByEmail.onclick = function () {

  var email = document.querySelector("#init-email");
  var pswd = document.querySelector("#init-pw");

  if (email.value == "" || pswd.value == "") {
    alert("All field values required");
    return false;
  } else {
    verifyUser(email.value, pswd.value);
  }

}

var updateButton =  document.querySelector("#update-button");
updateButton.onclick = function () {
  //console.log("The update button was clicked.");

  var updateTitle = document.querySelector("#update-title");
  var updateGenre = document.querySelector("#update-genre");
  var updateYear = document.querySelector("#update-year");
  var updatePoster = document.querySelector("#update-poster");
  var updateDescr = document.querySelector("#update-descr");
  putMovie(updateTitle.value, updateGenre.value, updateYear.value, updatePoster.value, updateDescr.value);

  $('#update-movie').fadeOut(500, function(){
    $('#show-movies').fadeIn(500);
      loadMovies();
  });

};


// Shows the list of movies ---> GET
var showTheMovies = function (movies) {
  var list = document.querySelector("#list");
  list.innerHTML = "";

  movies.forEach(function (movie) {
    var listItem = document.createElement("li");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");

    listItem.innerHTML += '<div class="title" id="single-title">' + movie.title + '</div>';

    // define content and class for buttons
    listItem.className = "movie-card";
    editButton.innerHTML = "Edit";
    editButton.className = "edit-button";
    editButton.setAttribute("id", "edit");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "del-button";
    editButton.setAttribute("id", "del");

    // append child function to var
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    deleteButton.onclick = function () {
      deleteMovie(movie);
    };

    editButton.onclick = function () {    
      editMovieId = movie.id;
      $('#show-movies').fadeOut(500, function(){
        $('#update-movie').fadeIn(500);

        var titleInput = document.querySelector("#update-title");
        titleInput.value = movie.title;
        titleInput.setAttribute("placeholder", movie.title);

        var genreInput = document.querySelector("#update-genre");
        genreInput.value = movie.genre;
        genreInput.setAttribute("placeholder", movie.genre);

        var yearInput = document.querySelector("#update-year");
        yearInput.value = movie.year;
        yearInput.setAttribute("placeholder", movie.year);

        var posterInput = document.querySelector("#update-poster");        
        posterInput.value = movie.poster;
        posterInput.setAttribute("placeholder", movie.poster);

        var descrInput = document.querySelector("#update-descr");
        descrInput.value = movie.descr;
        descrInput.setAttribute("placeholder", movie.descr);
      });
    };

    list.appendChild(listItem);
  });
};


// post a single movie --> POST
var createMovie = function (title, genre, year, poster, descr) {
  var data = `title=${encodeURIComponent(title)}`;
  data += `&genre=${encodeURIComponent(genre)}`;
  data += `&year=${encodeURIComponent(year)}`;
  data += `&poster=${encodeURIComponent(poster)}`;
  data += `&descr=${encodeURIComponent(descr)}`;
  fetch("https://panda-movies.herokuapp.com/movies", {
    method: "POST",
    body: data,
    credentials: 'include',
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("A Movie was created.");
    loadMovies();
  });
};

var clearform = function () {
  $('#signup-screen').fadeOut(500, function(){
    $('#welcome-screen').fadeIn(500);
  });
}

var createUser = function (fname, lname, email, pw) {
  var data = `&fname=${encodeURIComponent(fname)}`;
  data += `&lname=${encodeURIComponent(lname)}`;
  data += `&email=${encodeURIComponent(email)}`;
  data += `&hash_password=${encodeURIComponent(pw)}`;
  fetch("https://panda-movies.herokuapp.com/users", {
    method: "POST",
    body: data,
    credentials: 'include',
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    if (response.status == 201) {
      alert("A User was created.");
      clearform();
    } else if (response.status == 422) {
      alert("You need a unique email");
    }
  });
};

var verifyUser = function(email, pswd){
  var data = `&email=${encodeURIComponent(email)}`;
  data += `&plain_password=${encodeURIComponent(pswd)}`;
  fetch("https://panda-movies.herokuapp.com/sessions", {
    method: "POST",
    body: data,
    credentials: 'include',
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    if(response.status == 201) {
      alert("Successfully logged in...");
    
      // Clear the login screen and load movies
      $('#login-screen').fadeOut(500, function() {
        loadMovies();
      });
    } else if(response.status == 401) {
      alert("Username/Password is incorrect");
    }
  });
}

// updates a single movie record --> PUT or UPDATE
var putMovie = function (title, genre, year, poster, descr) {
  var datas = `title=${encodeURIComponent(title)}`;
    datas += `&genre=${encodeURIComponent(genre)}`;
    datas += `&year=${encodeURIComponent(year)}`;
    datas += `&poster=${encodeURIComponent(poster)}`;
    datas += `&descr=${encodeURIComponent(descr)}`;

  fetch(`https://panda-movies.herokuapp.com/movies/${editMovieId}`, {
    method: "PUT",
    body: datas,
    credentials: 'include',
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("Movie Updated successfully");

  });
};

// Deletes a single movie --> DELETE
var deleteMovie = function (movie) {
  if (confirm("Are you sure want to delete a Movie? Horrible. " + movie.title)) {
    console.log("Deleting Movie with ID", movie.id);
    fetch(`https://panda-movies.herokuapp.com/movies/${movie.id}`, {
      method: "DELETE",
      credentials: 'include'
    }).then(function () {
      console.log("Delete Movie successful.");
      loadMovies();
    });
  }
};

// Get one single movie record
var loadMovie = function (movie) {
  fetch(`https://panda-movies.herokuapp.com/movies/${movie.id}`, {
    credentials: 'include'
  }).then(function (response) {
    response.json().then(function (theMovie) {
      console.log("The Movie:", theMovie);
    });
  });
}

// NOTE: Try to load movies even if User isn't logged in
// FAILURE: Ask User to log in
var loadMovies = function () {
  fetch("https://panda-movies.herokuapp.com/movies", {
    credentials: 'include'
  }).then(function (response) {
    if (response.status == 401) {
      // 401, ask user to login
      console.log("Not logged in..");
      $('#login-screen').fadeIn(500)
    } else if (response.status == 200) {
      response.json().then(function (theMovies) {
        $('#show-movies').fadeIn(500);
        showTheMovies(theMovies);
    });
    } else {
      // display unexpected error try again!
      console.log("Unexpected Error");
    }
  });
};

loadMovies();