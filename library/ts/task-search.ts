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

//Class for task card variables (can maybe be turned into a single Task class?)
class TaskCard
{
    //The following are the task variables
    id: number;
    name: string;
    mainType: string;
    subType: string;
    problem: string;
    assignedTo: string;
    urgency: number;
    additionalInfo: string;

    constructor(initID: number, initName: string, initMainType: string, initSubType: string, initProblem: string, initAssignedTo: string,
        initUrgency: number, initAdditionalInfo: string)
    {
        this.id = initID;
        this.name = initName;
        this.mainType = initMainType;
        this.subType = initSubType;
        this.problem = initProblem;
        this.assignedTo = initAssignedTo;
        this.urgency = initUrgency;
        this.additionalInfo = initAdditionalInfo;
    }
}

function searchHandler()
{
    $(".searchResults").children().remove();
    let searchQuery: string = <string> $("#taskSearchBox").val(); // Gets the searchbox value
    getQueryResults(searchQuery);
}
function addCards(listOfCards: string[])
{
    for(let card of listOfCards)
    {
        $(".searchResults").append(card);
    }
}
function getQueryResults(searchQuery : string)
{
    let taskArray: TaskCard[] = [];

    db.collection("tasks").get().then(function(querySnapshot: any){
        querySnapshot.forEach(function(doc : any){
            let newTask: TaskCard = getTaskFromDoc(doc);
            taskArray.push(newTask);
        });
        let listOfCards: string[] = createHTMLTaskCards(taskArray);
        addCards(listOfCards);
    });
}
function getTaskFromDoc(doc: any): TaskCard
{
    let task: TaskCard;
    let taskData: any = doc.data();
    task = new TaskCard(taskData["ID"], taskData["Name"], taskData["MainType"], taskData["SubType"], taskData["Problem"], taskData["AssignedTo"],
                        taskData["Urgency"], taskData["Additional"]);

    return task;
}
function createHTMLTaskCards(taskArray: TaskCard[]): string[]
{
    let listOfHTMLCards: string[] = [];
    
    for(let task of taskArray)
    {
        let newCard: string = '<div class="w3-card w3-border w3-round-xlarge">';

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