const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");
const toggleBtn = document.getElementById("toggleFormat");
const changeBgBtn = document.getElementById("changeBgBtn");
const bgInput = document.getElementById("bgInput");

let is24HourFormat = false; // Track the current format (12-hour by default)

function updateClock() {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let ampm = "AM";

  if (!is24HourFormat) {
    if (h >= 12) {
      ampm = "PM";
      h = h > 12 ? h - 12 : h;
    } else {
      ampm = "AM";
    }
  }

  // Format hours, minutes, and seconds
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  // Update the clock display
  hourEl.innerText = h;
  minuteEl.innerText = m;
  secondEl.innerText = s;
  ampmEl.innerText = is24HourFormat ? "" : ampm;
}

// Toggle between 12-hour and 24-hour format
toggleBtn.addEventListener("click", () => {
  is24HourFormat = !is24HourFormat;
  toggleBtn.innerText = is24HourFormat ? "Switch to 12-hour format" : "Switch to 24-hour format";
  updateClock();
});

// Allow users to select a background image
changeBgBtn.addEventListener("click", () => {
  bgInput.click(); // Open file input dialog
});

bgInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.body.style.backgroundImage = `url(${e.target.result})`;
      document.body.style.backgroundSize = "cover"; // Ensure the image covers the background
    };
    reader.readAsDataURL(file);
  }
});

// Call updateClock immediately and set interval for continuous update
updateClock();
setInterval(updateClock, 1000);
