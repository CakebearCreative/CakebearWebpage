function loadContent(fileName, targetId, clickedElement, titleId) {
    // Path to the directory containing the .txt files
    const baseDir = 'prompts/';

    // Construct the full URL to the .txt file
    const filePath = baseDir + fileName;

    // Fetch and display the content
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            // Replace newlines with <br> tags
            const formattedData = data.replace(/\n/g, '<br>');
            document.getElementById(targetId).innerHTML = formattedData;
            //document.getElementById(targetId).textContent = data;
            document.getElementById(titleId).textContent = clickedElement.textContent;
            // Update the active prompt styling
            updateActivePromptStyle(clickedElement);
        })
        .catch(error => console.error('Error loading content:', error));
}


function updateActivePromptStyle(clickedElement) {
    const allPrompts = document.querySelectorAll('.sidebar a'); // Adjust the selector as needed
    allPrompts.forEach(prompt => {
        prompt.classList.remove('active-prompt');
    });

    // Add 'active-prompt' class to the clicked prompt
    // Assuming 'this' refers to the clicked anchor element
    clickedElement.classList.add('active-prompt');
}
