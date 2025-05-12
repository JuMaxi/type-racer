// Predefined texts for each difficulty level
const texts = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "Practice makes perfect."
    ],
    medium: [
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "In the middle of every difficulty lies opportunity."
    ],
    hard: [
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        "Life is not measured by the number of breaths we take, but by the moments that take our breath away."
    ]
};

// Function to get a random text based on the selected difficulty
function getRandomText(difficulty) {
    const options = texts[difficulty];
    return options[Math.floor(Math.random() * options.length)];
}

// Function to display a random text on page load
function displayInitialText() {
    const randomText = getRandomText("easy"); // Always fetch a random text from the "easy" level
    const textContainer = document.querySelector(".random-text");
    textContainer.textContent = randomText;
}

// Event listener for the Start button
document.getElementById("startButton").addEventListener("click", function () {
    // Get the selected difficulty level
    const difficulty = document.getElementById("difficultySelect").value;

    // Get a random text based on the selected difficulty
    const randomText = getRandomText(difficulty);

    // Display the random text in the text container
    const textContainer = document.querySelector(".random-text");
    textContainer.textContent = randomText;

    // Enable the user input field
    document.getElementById("user-input").disabled = false;
});

// Run the displayInitialText function when the page loads
window.addEventListener("DOMContentLoaded", displayInitialText);