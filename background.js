let timerID;
let timerTime;
console.log("loaded background.js")

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
    chrome.extension.sendMessage({ cmd: 'START_TIMER', when: time });
}



startTime(new Date(Date.now() + 1000 * 60 * 60));