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

function addToBasket(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //add to basket for signed in user
    
    } else {
      // User is signed out
     
      function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

      function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        var cookieID = JSON.stringify(ca);
        var trimleft = cookieID.slice(15);
        //trimright is temp id
        var trimright = trimleft.slice(0, trimleft.length - 76);
        
        function updateBasket(){
          //get current
          var database = firebase.database().ref('tempUser/' + trimright);
          database.on('value', (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              //get basket number from json
              var currentBasket = Object.values(data);
              //turn to number from string
              let number = parseFloat(currentBasket) ;
              //add one to basket
              var newNumber = number + 1;
              //upload new number to db
              firebase.database().ref('tempUser/' + trimright).update({
                basket: newNumber,
              });

            }

            else {
              console.log("add one to basket");
              //update
              firebase.database().ref('tempUser/' + trimright).update({
                basket: 1,
              });
            }

          });
        }
      updateBasket();
      }
      setCookie();
      getCookie();
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
  $(".fullscreen-container").fadeTo(200, 1);
  //doesn't work
  $('body').css("overflow", "hidden");
  $("#closeButton").click(function() {
    $(".fullscreen-container").fadeOut(200);
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


//function addToBasket(itemID){
  //var user = firebase.auth().currentUser;
  //var email = user.email
  //firebase.database().ref('users/' + email).set({
    //email: user.email,
    //itemID: itemID,
  //});
//}


