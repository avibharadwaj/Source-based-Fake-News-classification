

//fetches current url
chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      // $('#greet').text('Hello '+ $('#name').val());
      var fetchedURL = tabs[0].url;
       $('#greet').text(tabs[0].url);
   }
 
);



var config = {
  apiKey: "AIzaSyAqUvUXLmXkrk7RYVBzb3FKx2xon_2GgsQ",
  authDomain: "chrome-extension-11657.firebaseapp.com",
  databaseURL: "https://chrome-extension-11657.firebaseio.com",
  projectId: "chrome-extension-11657",
  storageBucket: "chrome-extension-11657.appspot.com",
  messagingSenderId: "980569642978",
  appId: "1:980569642978:web:24a4c2915a91afe9540bbb",
  measurementId: "G-VVYD4PF62G"
};

// Initialize Firebase
firebase.analytics();

// Get a reference to the database service
var database = firebase.database();

const app = firebase.initializeApp(config);
const appDb = app.database().ref();


// instantiate global application state object for Chrome Storage and feed in firebase data
// Chrome Storage will store our global state as a a JSON stringified value.

const applicationState = { values: [] };


database.ref.child("urls").equalTo(fetchedURL).once("value",snapshot => {
  if (snapshot.exists()){
    const urlData = snapshot.val();
    console.log("URL exists!", urlData);
  }
  else{
     console.log("URL does not exist!");
  }
});