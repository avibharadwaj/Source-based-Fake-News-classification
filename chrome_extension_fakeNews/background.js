

//fetches current url
// chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
//    function(tabs){
//       // $('#greet').text('Hello '+ $('#name').val());
//        $('#greet').text(tabs[0].url);
//    }
 
// );


var firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
var database = firebase.database();


