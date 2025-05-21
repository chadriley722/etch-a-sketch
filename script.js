document.addEventListener('DOMContentLoaded', () => {
    // Get the DOM elements
    const container = document.getElementById('container');
    const changeSizeBtn = document.getElementById('change-size');
    const sizeInput = document.getElementById('size-input');
    
    // Set the default grid size
    let gridSize = 16;
    
    // Create the initial grid
    createGrid(gridSize);
    
    // Add event listener for the change size button
    changeSizeBtn.addEventListener('click', changeGridSize);
    
    // Function to change the grid size
    function changeGridSize() {
        // Get the value from the input field
        let newSize = sizeInput.value;
        
        // Convert input to a number and validate
        newSize = parseInt(newSize);
        
        // Check if the input is valid
        if (isNaN(newSize) || newSize <= 0) {
            alert('Please enter a valid positive number between 1 and 100!');
            return;
        }
        
        // Limit the maximum size to 100
        if (newSize > 100) {
            alert('Maximum grid size is 100x100!');
            newSize = 100;
            sizeInput.value = 100; // Update the input field
        }
        
        // Update the grid size and recreate the grid
        gridSize = newSize;
        createGrid(gridSize);
        
        // Clear the input field after changing the grid
        sizeInput.value = '';
    }
    
    // Function to create the grid
    function createGrid(size) {
        // Clear any existing grid
        container.innerHTML = '';
        
        // Calculate total number of squares
        const totalSquares = size * size;
        
        // Create the squares and add them to the container
        for (let i = 0; i < totalSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('grid-square');
            
            // Set the width and height to ensure proper sizing
            // This helps ensure the flex layout works correctly
            square.style.flexBasis = `calc(100% / ${size})`;
            
            // Add hover effect to change background color
            square.addEventListener('mouseover', () => {
                square.style.backgroundColor = '#333'; // Dark gray color
            });
            
            // Add the square to the container
            container.appendChild(square);
        }
    }
});
