function formatElapsedTime(startTime) {
    const currentTime = new Date();
    const elapsedTime = currentTime - startTime; // Difference in milliseconds
  
    let totalSeconds = Math.floor(elapsedTime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
  
    // Padding with '0' if necessary
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
  
    console.log(`\u{23F1}  Run time: ${hours}:${minutes}:${seconds}`);
}

export { formatElapsedTime }