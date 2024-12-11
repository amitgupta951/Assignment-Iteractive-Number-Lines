# Interactive Number Line with React and P5.js

This project is an **interactive number line** created with React and the "react-p5" library.It allows users to drag a point along a horizontal number line, click it to the nearest integer, and reset it to its default position.

## Features
- A draggable point that snaps to integer values between -10 and 10.
- A visual display of the current integer value.
- A "Reset" button to reset the point to 0.
- Clean and simple user interface.

## Code Overview
- **React State**:
  - `point`: Stores the current integer value of the draggable point.
  - `dragging`: Tracks whether the user is actively dragging the point.
  
- **P5.js Functions**:
  - `setup`: Initializes the canvas (800x200px).
  - `draw`: Draws the number line, ticks, labels, and the draggable point.
  - `mousePressed`: Detects when the user clicks near the draggable point and activates dragging mode.
  - `mouseDragged`: Updates the position of the point based on the mouse's position, snapping it to the nearest integer.
  - `mouseReleased`: Deactivates dragging mode when the mouse is released.

- **Reset Button**:
  - Resets the point's value to 0 when clicked.

## Getting Started
Run the project locally using the React development server. Use the number line to explore its interactive functionality!
 