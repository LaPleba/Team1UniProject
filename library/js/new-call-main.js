	loadPath([]);   
    
    var path = [];
    var pathname = "";
        
        function upLevel(){
        		path.pop();
        		loadPath(path);
        }
        
        //This function adds items visually to the issueBrowser box
        function addItem(item, index) {
        		document.getElementById("issueBrowser").innerHTML += "<div class='w3-button w3-bar' id='"+index+"' onclick='openItem("+index+")'>"+item+"</div>";
        }
        
        //This opens items in the issueBrowser box
        function openItem(item) {
            if (path.length<2) {
        			path[path.length] = item;
        			loadPath(path);
        		}
        		else {
        			loadPath(path);
        			document.getElementById(item).className = "w3-button w3-bar w3-blue";
        		}
        }
        
        //this function takes an array of integers, to a maximum length of 2, and opens the corresponding file path
        function loadPath(path){
        		document.getElementById("issueBrowser").innerHTML = "";
        		switch(path.length) {
        			case 0:
        				for (var x = 0; x<issues.length; x++) {
        					addItem(issues[x][0], x);
        				}
        				pathname="/";
        				break;
        				
        			case 1:
        				for (var x = 1; x<issues[path[0]].length; x++) {
        					addItem(issues[path[0]][x][0], x)
        				}
        				pathname="/"+issues[path[0]][0].toString()+"/";
        				break;
        				
        			case 2:
        				for (var x = 1; x<issues[path[0]][path[1]].length; x++) {
        					addItem(issues[path[0]][path[1]][x], x)
        				}
        				pathname="/"+issues[path[0]][0]+"/"+issues[path[0]][path[1]][0];
        				break;
        		}
        		document.getElementById("path").innerHTML = pathname;
        		
        }