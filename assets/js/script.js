document.addEventListener("DOMContentLoaded", function() {
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

    let startTime; // Variable to store the start time
    const userInput =  document.getElementById("user-input");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const resultTime =  document.getElementById("resultTime");
    const textContainer = document.querySelector(".random-text");
    const difficulty = document.getElementById("difficultySelect");
    const resultWpm = document.getElementById("resultWPM");
    const level = document.getElementById("resultLevel");

    // Function to get a random text based on the selected difficulty
    function getRandomText(difficulty) {
        const options = texts[difficulty];
        return options[Math.floor(Math.random() * options.length)];
    }

    // Function to display a random text on page load
    function displayInitialText() {
        const randomText = getRandomText("easy"); // Always fetch a random text from the "easy" level
        textContainer.textContent = randomText;
    }

    // Event listener for the Start button
    startButton.addEventListener("click", function () {
        // Get a random text based on the selected difficulty
        const randomText = getRandomText(difficulty.value);

        // Display the random text in the text container
        textContainer.textContent = randomText;

        // Enable the user input field
        userInput.disabled = false;
    });


    // Function to handle the start of the typing test
    function startTypingTest() {
        // Record the current time as the start time
        startTime = Date.now();

        // Disable the start button and enable the stop button
        startButton.disabled = true;
        stopButton.disabled = false;

        // Enable the user input field
        userInput.disabled = false;
        userInput.value = "";
        userInput.focus();
    }

    // Function to handle the end of the typing test
    function stopTypingTest() {
        // Record the current time as the end time
        const endTime = Date.now();

        // Calculate the elapsed time in seconds
        const elapsedTime = ((endTime - startTime) / 1000).toFixed(2) + "s";

        // Display the elapsed time in the results area
        resultTime.textContent = elapsedTime;

        // Calculate and display WPM and difficulty level
        displayResults();

        // Disable the stop button and enable the start button
        stopButton.disabled = true;
        startButton.disabled = false;

        // Disable the user input field
        userInput.disabled = true;
    }

    // Function to calculate the number of correctly typed words
    function calculateCorrectWords(userInputText, sampleText) {
        const userWords = userInputText.trim().split(/\s+/);
        const sampleWords = sampleText.trim().split(/\s+/);
        let correctWords = 0;

        // Compare each word in the user's input with the sample text
        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        return correctWords;
    }

    // Function to calculate and display the WPM and difficulty level
    function displayResults() {
        // Get the user's input and the sample text
        const userInputText = userInput.value;
        const sampleText = textContainer.textContent;

        // Calculate the number of correctly typed words
        const correctWords = calculateCorrectWords(userInputText, sampleText);

        // Calculate the elapsed time in minutes
        const elapsedTimeInMinutes = (Date.now() - startTime) / 60000;

        // Calculate WPM (Words Per Minute)
        const wpm = Math.round(correctWords / elapsedTimeInMinutes);

        // Display the WPM and difficulty level in the results area
        resultWpm.textContent = wpm;
        level.textContent = difficulty.value.charAt(0).toUpperCase() + difficulty.value.slice(1);
    }
     // Run the displayInitialText function when the page loads
    window.addEventListener("DOMContentLoaded", displayInitialText);

    // Attach event listeners to the start and stop buttons
    startButton.addEventListener("click", startTypingTest);
    stopButton.addEventListener("click", stopTypingTest);
})
