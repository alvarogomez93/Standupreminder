let timerID;
let timerTime;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log(request.cmd)
    if (request.cmd === 'START_TIMER') {
      timerTime = new Date(request.when);
      timerID = setTimeout(() => {
         // the time is up, alert the user.
      }, timerTime.getTime() - Date.now());
      console.log(timerID)
    } else if (request.cmd === 'GET_TIME') {
      sendResponse({ time: timerTime });
    }
});


function startTime(time) {
    console.log(time)
    chrome.extension.sendMessage({ cmd: 'START_TIMER', when: time }, function(response) {

        console.log(response)

    });
}


chrome.storage.local.get(['time_set'], (data) => {

  if (typeof data.time_set === 'undefined') {
    
    timerTime = new Date(Date.now() + 1000 * 60 * 60);
    timerID = setTimeout(() => {}, timerTime.getTime() - Date.now());

    chrome.storage.local.set({'time_set': timerTime.getTime()}, function() {
      console.log('Value is set to ' + timerTime.getTime());
    });



  }else{
    timerTime = new Date(data.time_set);
    timerID = setTimeout(() => {}, data.time_set);
    console.log(data.time_set)


  }
  




})

console.log("loaded background.js")


