var countDownDate;
var x;

// Attach event listener once DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // When the form is submitted, call startTimer
  document.getElementById('timerForm').addEventListener('submit', startTimer);
});

function startTimer(event) {
  event.preventDefault(); // Prevent page refresh

  // Clear any previous error messages
  document.getElementById("errorMsg").textContent = "";

  // Parse the user's input for newTime
  var newTime = parseInt(document.getElementById("time").value, 10);

  // Validate the input
  if (isNaN(newTime) || newTime <= 0) {
    document.getElementById("errorMsg").textContent = "Please enter a valid positive number for minutes.";
    return; // Stop execution if invalid
  }

  // Calculate the future end time (in milliseconds)
  countDownDate = new Date().getTime() + (newTime * 60 * 1000);

  // Clear any previous intervals
  clearInterval(x);

  // Update the countdown every second
  x = setInterval(function() {
    // Get the current time
    var now = new Date().getTime();
    // Distance between now and the countdown end
    var distance = countDownDate - now;

    // Calculate minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

    // Change background color based on remaining time
    if (distance < 60000) {
      document.body.style.backgroundColor = "red";
    } else if (distance < 120000) {
      document.body.style.backgroundColor = "yellow";
    } else {
      document.body.style.backgroundColor = "green";
    }

    // Check if the countdown has finished
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timer").innerHTML = "Time's up!";
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";

      // Check if the user has enabled sound
      if (document.getElementById("enableSound").checked) {
        document.getElementById("alarmSound").play().catch(function(err) {
          console.log("Sound playback failed or was prevented by the browser:", err);
        });
      }
    }
  }, 1000);
}
