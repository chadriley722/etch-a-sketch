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
            
            // Add custom data attribute to track interactions for darkening effect
            square.dataset.interactions = 0;
            
            // Add event listener for hover effect with rainbow colors and darkening
            square.addEventListener('mouseover', () => {
                // Get current interaction count
                let interactions = parseInt(square.dataset.interactions) || 0;
                
                if (interactions === 0) {
                    // First interaction - set a random rainbow color
                    square.style.backgroundColor = getRandomRainbowColor();
                } else {
                    // Subsequent interactions - darken the existing color
                    darkenSquare(square);
                }
                
                // Increment interaction count
                square.dataset.interactions = interactions + 1;
            });
            
            // Add the square to the container
            container.appendChild(square);
        }
    }
    
    // Function to get a random rainbow color (ROYGBIV)
    function getRandomRainbowColor() {
        const colors = [
            '#FF0000', // Red
            '#FF7F00', // Orange
            '#FFFF00', // Yellow
            '#00FF00', // Green
            '#0000FF', // Blue
            '#4B0082', // Indigo
            '#8B00FF'  // Violet (corrected from pink)
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Function to darken a square by 10% each time
    function darkenSquare(square) {
        const currentColor = square.style.backgroundColor;
        // Parse RGB values from the format "rgb(r, g, b)"
        const rgbValues = currentColor.match(/\d+/g);
        
        if (rgbValues && rgbValues.length === 3) {
            let r = parseInt(rgbValues[0]);
            let g = parseInt(rgbValues[1]);
            let b = parseInt(rgbValues[2]);
            
            // Reduce each color component by 10% of its original value
            // This ensures we reach black (0,0,0) after 10 interactions
            r = Math.max(0, r - Math.round(r * 0.1));
            g = Math.max(0, g - Math.round(g * 0.1));
            b = Math.max(0, b - Math.round(b * 0.1));
            
            square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
    }
});
