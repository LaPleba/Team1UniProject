//Note the following requires are for the Typescript Compilers benefit and should be removed from the compiled JS file

const firebase = require("../../node_modules/firebase");
// Required for side-effects
require("../../node_modules/firebase/firestore");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyADO8TYrvY9YQ06tnr0oScByw2rXbUWI90",
    authDomain: "team1-helpdesk.firebaseapp.com",
    databaseURL: "https://team1-helpdesk.firebaseio.com",
    projectId: "team1-helpdesk",
    storageBucket: "team1-helpdesk.appspot.com",
    messagingSenderId: "469732965366"
    };

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
  });

function searchHandler()
{
    let searchQuery = <string> $("#taskSearchBox").val(); // Get's the searchbox value

    getQueryResults;
}
function getQueryResults(searchQuery : string)
{
    db.collection("tasks").get().then(function(querySnapshot: any){
        querySnapshot.forEach(function(doc : any){
            console.log(doc.id(), " => " , doc.data());
        });
    });
}