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

    // Function to update the random text based on the selected difficulty
    function updateRandomText() {
        const selectedDifficulty = difficulty.value; // Get the selected difficulty
        const randomText = getRandomText(selectedDifficulty); // Fetch a random text based on the selected difficulty
        textContainer.textContent = randomText; // Update the text container with the new random text
    }

    // Attach an event listener to the difficulty dropdown to update the random text when the difficulty changes
    difficulty.addEventListener("change", updateRandomText);

    // Attach an event listener to the user input field to start the test when the user begins typing
    userInput.addEventListener("input", startTypingTest);

    // Function to handle the start of the typing test
    function startTypingTest() {
    // Check if the test has already started
    if (!startTime) {
        // Record the current time as the start time
        startTime = Date.now();

        // Display a random text in the text container based on the selected difficulty
        const randomText = getRandomText(difficulty.value);
        textContainer.textContent = randomText;

        // Focus on the user input field
        userInput.focus();
    }
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

        // Disable the user input field
        userInput.disabled = true;

        // Reset the start time for the next test
        startTime = null;
    }

    // Attach an event listener to the user input field to stop the test when the Enter key is pressed
    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default behavior of the Enter key
            stopTypingTest(); // Call the stopTypingTest function
        }
    });

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

    // Function to highlight the user's input in real time
    function highlightTyping() {
        // Get the user's input and the sample text
        const userInputText = userInput.value;
        const sampleText = textContainer.textContent;

        // Split the user's input and the sample text into arrays of words
        const userWords = userInputText.trim().split(/\s+/);
        const sampleWords = sampleText.trim().split(/\s+/);

        // Create a new array to store the highlighted words
        const highlightedWords = [];

        // Loop through the sample words and compare them with the user's words
        for (let i = 0; i < sampleWords.length; i++) {
            if (i < userWords.length) {
                if (userWords[i] === sampleWords[i]) {
                    // If the word is correct, wrap it in a span with a blue color
                    highlightedWords.push(`<span style="color: blue;">${sampleWords[i]}</span>`);
                } else {
                    // If the word is incorrect, wrap it in a span with a red color
                    highlightedWords.push(`<span style="color: red;">${sampleWords[i]}</span>`);
                }
            } else {
                // If the word has not been typed yet, display it in the default color
                highlightedWords.push(`<span style="color: black;">${sampleWords[i]}</span>`);
            }
        }

        // Join the highlighted words into a single string and display them
        textContainer.innerHTML = highlightedWords.join(" ");
    }

    // Attach an event listener to the user input field to call highlightTyping on every input
    userInput.addEventListener("input", highlightTyping);

    // Run the displayInitialText function when the page loads
    window.addEventListener("DOMContentLoaded", displayInitialText);
})
