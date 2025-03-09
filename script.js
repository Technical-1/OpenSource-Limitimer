var countDownDate;
var x;

// Attach event listener once DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  // When the form is submitted, call startTimer
  document.getElementById('timerForm').addEventListener('submit', startTimer);

  // Resume timer if there's an unfinished countdown in localStorage
  var savedDate = localStorage.getItem("countDownDate");
  if (savedDate) {
    var now = new Date().getTime();
    var distance = parseInt(savedDate, 10) - now;
    if (distance > 0) {
      countDownDate = parseInt(savedDate, 10);
      clearInterval(x);
      x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

        if (distance < 60000) {
          document.body.style.backgroundColor = "red";
        } else if (distance < 120000) {
          document.body.style.backgroundColor = "yellow";
        } else {
          document.body.style.backgroundColor = "green";
        }

        if (distance < 0) {
          clearInterval(x);
          document.getElementById("timer").innerHTML = "Time's up!";
          document.body.style.backgroundColor = "black";
          document.body.style.color = "white";

          if (document.getElementById("enableSound").checked) {
            document.getElementById("alarmSound").play().catch(function(err) {
              console.log("Sound playback failed or was prevented by the browser:", err);
            });
          }

          localStorage.removeItem("countDownDate");
        }
      }, 1000);
    } else {
      // If it's already expired or not valid, remove it
      localStorage.removeItem("countDownDate");
    }
  }

  // Event listener for Stop button
  document.getElementById('stopButton').addEventListener('click', stopTimer);
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

  // Store the new end time in localStorage
  localStorage.setItem("countDownDate", countDownDate);

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

      // Remove from localStorage once finished
      localStorage.removeItem("countDownDate");
    }
  }, 1000);
}

// NEW: Function to stop the current timer
function stopTimer() {
  // Clear interval to stop the countdown
  clearInterval(x);

  // Remove any saved end time so it doesn't resume on refresh
  localStorage.removeItem("countDownDate");

  // Reset the timer display
  document.getElementById("timer").innerHTML = "Timer Stopped";

  // Revert body styles (optional, you can set to a default or your preference)
  document.body.style.backgroundColor = "";
  document.body.style.color = "";
}
