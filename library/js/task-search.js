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
//Class for task card variables (can maybe be turned into a single Task class?)
var TaskCard = /** @class */ (function () {
    function TaskCard(initID, initName, initMainType, initSubType, initProblem, initAssignedTo, initUrgency, initAdditionalInfo) {
        this.id = initID;
        this.name = initName;
        this.mainType = initMainType;
        this.subType = initSubType;
        this.problem = initProblem;
        this.assignedTo = initAssignedTo;
        this.urgency = initUrgency;
        this.additionalInfo = initAdditionalInfo;
    }
    return TaskCard;
}());
function searchHandler() {
    var searchQuery = $("#taskSearchBox").val(); // Gets the searchbox value
    getQueryResults(searchQuery);
}
function addCards(listOfCards) {
    for (var _i = 0, listOfCards_1 = listOfCards; _i < listOfCards_1.length; _i++) {
        var card = listOfCards_1[_i];
        $(".searchResults").append(card);
    }
}
function getQueryResults(searchQuery) {
    var taskArray = [];
    db.collection("tasks").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var newTask = getTaskFromDoc(doc);
            taskArray.push(newTask);
        });
        var listOfCards = createHTMLTaskCards(taskArray);
        addCards(listOfCards);
    });
}
function getTaskFromDoc(doc) {
    var task;
    var taskData = doc.data();
    task = new TaskCard(taskData["ID"], taskData["Name"], taskData["MainType"], taskData["SubType"], taskData["Problem"], taskData["AssignedTo"], taskData["Urgency"], taskData["Additional"]);
    return task;
}
function createHTMLTaskCards(taskArray) {
    var listOfHTMLCards = [];
    for (var _i = 0, taskArray_1 = taskArray; _i < taskArray_1.length; _i++) {
        var task = taskArray_1[_i];
        var newCard = '<div class="w3-card w3-border w3-round-xlarge">';
        newCard += "<div>ID: " + task.id + "</div>";
        newCard += "<div>Name: " + task.name + "</div>";
        newCard += "<div>Type: " + task.mainType + "</div>";
        newCard += "<div>Sub Type: " + task.subType + "</div>";
        newCard += "<div>Problem" + task.problem + "</div>";
        newCard += "<div>Assigned To: " + task.assignedTo + "</div>";
        newCard += "<div>Urgency: " + task.urgency + "</div>";
        newCard += "<div>Additional Information: " + task.additionalInfo + "</div>";
        newCard += "</div>";
        listOfHTMLCards.push(newCard);
    }
    return listOfHTMLCards;
}
