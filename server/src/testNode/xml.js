function doAuthent(serverIP, username, password) {
  
    var authRq = new XMLHttpRequest();
    var serverUrl = "https://"+serverIP+":443/api/rest/"; 		
  
     authRq.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE) {
        console.log('IT DID WORK')
        if (this.status === 200) {
        console.log('can make a session')
        }
      }
    };
  
    
    authRq.open("GET", serverUrl + "authenticate?version=1.0", true, username, password);
    authRq.withCredentials = true;
    authRq.send();		
  }
  
  // function startSession() {
  //   var appliNameParams = {"applicationName":"myTestProgram"};
  //   var serverUrl = "http://"+serverIP+":80/api/rest/";

  //   var sessionRq = new XMLHttpRequest();
  //     sessionRq.onreadystatechange = function() {
  //     if (this.readyState === XMLHttpRequest.DONE) {
  //      document.getElementById("resultSession").innerHTML = "returns " + this.status;
  //      if (this.status === 200) {
  //       document.getElementById("clickSubscribe").style.visibility = "visible";
  //       document.getElementById("resultsubscribtion").innerHTML = ""; 
  //       document.getElementById("resultChunk").innerHTML = ""; 		
  //       document.getElementById("clickCloseSession").style.visibility = "visible";
  //      } else if (this.status === 403) {
  //       document.getElementById("clickCloseSession").style.visibility = "visible";
  //      }
  //     }
  //   }
  
  //   sessionRq.open("POST", serverUrl + "1.0/sessions");
  //   sessionRq.withCredentials = true;
  //   sessionRq.setRequestHeader('Content-Type', "application/json"); 
  //   sessionRq.setRequestHeader('Accept', "*/*"); 
  //   sessionRq.send(JSON.stringify(appliNameParams));
  // }
  
  // function subscribe(user) {
  //   var subscribeRq = new XMLHttpRequest();
  
  //   var subscribeTelephonyReqParams = {
  //      "filter": {
  //       "selectors": [ {
  //        "ids": [ user ],
  //        "names": [ "telephony" ]
  //       } ]
  //      },
  //      "version":"1.0"
  //   }
  
  //    subscribeRq.onreadystatechange = function() {
  //     if (this.readyState === XMLHttpRequest.DONE) {
  //      document.getElementById("resultsubscribtion").innerHTML = "returns " + this.status;
  //      if (this.status === 200) {
  //       var jsonBody = JSON.parse(this.response);
  //       var chunkUrl = jsonBody.privatePollingUrl.replace("https", "http").replace("8016", "8014");
  //       startChunkReader(chunkUrl);
  //     }
  //     }
  //   }
  
  //   subscribeRq.open("POST", serverUrl + "1.0/subscriptions");
  //   subscribeRq.withCredentials = true;
  //   subscribeRq.setRequestHeader('Content-Type', "application/json"); 
  //   subscribeRq.setRequestHeader('Accept', "*/*"); 
  //   subscribeRq.send(JSON.stringify(subscribeTelephonyReqParams));
  // }
  // function closeSession() {
  //   var sessionCloseRq = new XMLHttpRequest();
  
  //     sessionCloseRq.onreadystatechange = function() {
  //     if (this.readyState === XMLHttpRequest.DONE) {
  //      document.getElementById("resultCloseSession").innerHTML = "returns " + this.status; 
  //      document.getElementById("clickStartSession").style.visibility = "hidden";
  //      document.getElementById("clickSubscribe").style.visibility = "hidden";
  //      document.getElementById("clickReleaseCall").style.visibility = "hidden";
  //      document.getElementById("clickCloseSession").style.visibility = "hidden";
  //      document.getElementById("resultAuthent").innerHTML = ""; 
  //     }
  //   }
  //   sessionCloseRq.open("DELETE", serverUrl + "1.0/sessions");
  //   sessionCloseRq.withCredentials = true;
  //   sessionCloseRq.send();
  // }
}

doAuthent("o2g-vlab30.ale-aapp.com", 'admin', 'GEOFF')