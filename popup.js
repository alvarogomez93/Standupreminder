console.log("popup.js loaded")

// Call this when the pop-up is shown

function displayTimer(time) {
  if (time.getTime() > Date.now()) {
    setInterval(() => {
      // display the remaining time stored in variable called time in testTimer id
      document.getElementById('testTimer').innerHTML = time.toLocaleTimeString();
    }, 1000)

  }
}



chrome.runtime.sendMessage({ cmd: 'GET_TIME' }, response => {
  if (response.time) {
    const time = new Date(response.time);
    displayTimer(time)
  }
  
});






function startTime(time) {
  chrome.runtime.sendMessage({ cmd: 'START_TIMER', when: time });
}