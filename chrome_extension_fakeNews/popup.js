// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBEVfeRaHTbzsRYouJPWMsPtWHkTfTvWh0",
    authDomain: "extension-67.firebaseapp.com",
    databaseURL: "https://extension-67.firebaseio.com",
    projectId: "extension-67",
    storageBucket: "extension-67.appspot.com",
    messagingSenderId: "645693015780",
    appId: "1:645693015780:web:c2babebc71af59e6bf4ef1",
    measurementId: "G-4DF4D752YQ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}



// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) { // User is signed in!
        //alert("Logged In");
        $('#signin').hide();
        $('#checkPage').removeClass('hide');
       
         
        
        //fetches current url
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs){
        // $('#greet').text('Hello '+ $('#name').val());
        // var fetchedURL = tabs[0].url;
            $('#msg').text(tabs[0].url);
        }
        );

        $('#msg2').text("Please click the green button below to detect fake news!");


    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        //alert("Please login!");
        $('#msg2').text("Please login to detect fake news!");
    }
}

function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
}





// Returns the signed-in user's display name.
function getUserName() {
    return firebase.auth().currentUser.displayName;
}
function getEmailId() {
    return firebase.auth().currentUser.email;
}



document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('detect');
    
    initFirebaseAuth();

    if (isUserSignedIn()) {
        user = firebase.auth().currentUser.displayName;
        alert(user + ", welcome! Now you can proceed!");
    }

    checkPageButton.addEventListener('click', function () {

    }, false);

}, false);

document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('signin');
    checkPageButton.addEventListener('click', function () {

        //window.open("https://www.w3schools.com");
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

            alert("Hello " + user.displayName);

            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode);
            alert(errorMessage);
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    })
});

