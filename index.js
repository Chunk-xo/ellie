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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var useremail = user.email;
    console.log(useremail);
    $("#hello").append("<p>Hello", useremail, "</p>");
    $('#signoutNav').show();
    $('#accountNav').hide();
  
  } else {
    // User is signed out
    $('#signoutNav').hide();
    $('#accountNav').show();

  }
});

function isUserSignedIn(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //User is signed in
      var userIdenity = user.uid;
      addToBasket(userIdenity);
    } else {
      // User is signed out, generate cookie and trigger basked
      setCookie();
    }
  });
};

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  getCookie(cname);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  var cookieID = JSON.stringify(ca);
  var trimleft = cookieID.slice(15);
  var sessionID = trimleft.slice(0, trimleft.length - 76);
  addToTempBasket(sessionID);
}

function addToTempBasket(sessionID){

  firebase.database().ref('tempUser/' + sessionID).once('value', function (snapshot) {
    var data = snapshot.val();
    
    if (data == null) {
      //update
      firebase.database().ref('tempUser/' + sessionID).set({
        basket: 1,
      });
    }
    
    else {
      //get basket number from json
      var currentBasket = Object.values(data);
      console.log(currentBasket);
      //turn to number from string
      var number = currentBasket[0];
      //let number = parseFloat(data);
      //add one to basket
      var newNumber = number + 1;
      //upload new number to db
      firebase.database().ref('tempUser/' + sessionID).set({
        basket: newNumber,
      });
    }

  });
}

function addToBasket(userIdenity){
  firebase.database().ref('user/' + userIdenity).once('value', function (snapshot) {
    var data = snapshot.val();
    
    if (data == null) {
      //update
      firebase.database().ref('user/' + userIdenity).set({
        basket: 1,
      });
    }
    
    else {
      //get basket number from json
      var currentBasket = Object.values(data);
      console.log(currentBasket);
      //turn to number from string
      var number = currentBasket[0];
      //let number = parseFloat(data);
      //add one to basket
      var newNumber = number + 1;
      //upload new number to db
      firebase.database().ref('user/' + userIdenity).set({
        basket: newNumber,
      });
    }

  });
}

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
      function sendEmailVerification() {
        // [START auth_send_email_verification]
        firebase.auth().currentUser.sendEmailVerification()
          .then(() => {
            // Email verification sent!
            // ...
          });
        // [END auth_send_email_verification]
      }
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}

function loginAccount(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_signin_password]
}

function sendPasswordReset() {
  const email = document.getElementById('email').value;
  // [START auth_send_password_reset]
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_send_password_reset]
}

function signout(){
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
}


function showLoginBox(){
  $("#accountOverlay").fadeTo(200, 1);
  $("#accountPopUp").fadeTo(200, 1);
  $("#closeAccountBox").click(function() {
    $(".fullscreen-container").fadeOut(200);
  });

  //$(".fullscreen-container").click(function() {
    //$(".fullscreen-container").fadeOut(200);
  //});
}

function showBasketBox(){
  $("#basketOverlay").fadeTo(200, 1);
  $("#basketPopUp").fadeTo(200, 1);
  $("#closeBasketBox").click(function() {
    $(".fullscreen-container").fadeOut(200);
  });

  //$(".fullscreen-container").click(function() {
    //$(".fullscreen-container").fadeOut(200);
  //});

}


