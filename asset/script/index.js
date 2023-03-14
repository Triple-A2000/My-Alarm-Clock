'use strict';

/*
    JavaScript basics
    Ayomide Boye-Ogundiya

    Alarm Clock

*/

// Get the clock and time elements
const clock = document.querySelector(".clock");
const hoursSpan = clock.querySelector(".hours");
const minutesSpan = clock.querySelector(".minutes");
const secondsSpan = clock.querySelector(".seconds");

// Update the clock time every second
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  hoursSpan.innerText = hours;
  minutesSpan.innerText = minutes;
  secondsSpan.innerText = seconds;
}

setInterval(updateTime, 1000);

// Get the alarm elements
const alarmForm = document.querySelector(".alarm-form");
const alarmButton = document.getElementById("alarmButton");
const alarmSound = document.getElementById("alarmSound");
const snoozeButton = document.getElementById("snoozeButton");
const snoozeCountdown = document.getElementById("snoozeCountdown");
let alarmTimeout;

// Set the alarm
function setAlarm(e) {
  e.preventDefault();
  const hours = parseInt(document.getElementById("hours").value);
  const minutes = parseInt(document.getElementById("minutes").value);
  if (isNaN(hours) || isNaN(minutes) || hours > 23 || hours < 0 || minutes > 59 || minutes < 0) {
    alert("Please enter a valid time");
    return;
  }
  const now = new Date();
  const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
  const alarmTimeString = alarmTime.toLocaleTimeString("en-US", { hour12: false });
  alarmButton.innerText = `Alarm Set for ${alarmTimeString}`;
  alarmButton.classList.remove("playing");
  clearInterval(alarmTimeout);
  alarmTimeout = setTimeout(playAlarm, alarmTime - now);
}

alarmForm.addEventListener("submit", setAlarm);

// Play the alarm
function playAlarm() {
  alarmButton.classList.add("playing");
  alarmSound.play();
  snoozeButton.style.display = "inline-block";
  snoozeCountdown.innerText = "5";
  let snoozeCount = 5;
  const snoozeInterval = setInterval(() => {
    snoozeCount--;
    snoozeCountdown.innerText = snoozeCount.toString();
    if (snoozeCount === 0) {
      clearInterval(snoozeInterval);
      snoozeButton.style.display = "none";
      alarmButton.innerText = "Alarm Off";
      alarmButton.classList.remove("playing");
      alarmSound.pause();
      alarmSound.currentTime = 0;
    }
  }, 1000);
}

// Snooze the alarm
snoozeButton.addEventListener("click", () => {
  clearInterval(alarmTimeout);
  alarmButton.classList.remove("playing");
  snoozeButton.style.display = "none";
  alarmSound.pause();
  alarmSound.currentTime = 0;
  setTimeout(playAlarm, 5000);
});

