//Deploy to firebase hosting:
//firebase login
//firebase init
//firebase deploy

const firebaseConfig = {
  apiKey: "AIzaSyDFiEslRAD0j1Vsdl1kFVRzWa-UsOCVA_U",
  authDomain: "zayo-ellie.firebaseapp.com",
  databaseURL: "https://zayo-ellie-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zayo-ellie",
  storageBucket: "zayo-ellie.appspot.com",
  messagingSenderId: "1078737100689",
  appId: "1:1078737100689:web:9144d372748b5d8d1d8430",
  measurementId: "G-1MBNMH1GQR"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();


function createUser(){
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}

function createNewAccount(){
  //var firstname = document.getElementById('first_name').value;
  //var lastname = document.getElementById('last_name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}



//to do: 
//hide body scroll
//body click closes modal
$(function() {
  $("#registerButton").click(function() {
    $(".fullscreen-container").fadeTo(200, 1);
    //doesn't work
    $('body').css("overflow", "hidden");
  });
  $("#closeButton").click(function() {
    $(".fullscreen-container").fadeOut(200);
  });
});

//doesn't work
$(window).click(function() {
//Hide the menus if visible
});
$('.fullscreen-container').click(function(event){
    event.stopPropagation();
});