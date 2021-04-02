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

function addItem(){
  var item = document.getElementById('item').value;
  var description = document.getElementById('description').value;
  var price = document.getElementById('price').value;
  //var picture = document.getElementById('password').value;
  firebase.database().ref('items/').push({
    item: item,
    description: description,
    price: price
  });
  Console.log("uploaded")
}
