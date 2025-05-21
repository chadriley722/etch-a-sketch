document.addEventListener('DOMContentLoaded', () => {
    // Get the container element
    const container = document.getElementById('container');
    
    // Set the grid size
    const gridSize = 16;
    
    // Create the grid squares
    createGrid(gridSize);
    
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
