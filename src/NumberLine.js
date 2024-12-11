import React, { useState } from "react";
import Sketch from "react-p5";

const NumberLine = () => {
  const [point, setPoint] = useState(0); // track Current position of the point of no lines
  const [dragging, setDragging] = useState(false); // track the point drag by user

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 200).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(255);// Set the background color to white

    // Draw the number line
    p5.stroke(0);  // Set stroke color to black
    p5.line(50, 100, 750, 100); // Draw the main number line

    // Draw ticks and labels
    for (let i = -10; i <= 10; i++) {
      const x = p5.map(i, -10, 10, 50, 750);
      p5.line(x, 95, x, 105);
      p5.textAlign(p5.CENTER, p5.CENTER); // Alignment
      p5.text(i, x, 115);
    }

    // Draw draggable point
    const x = p5.map(point, -10, 10, 50, 750);
    p5.fill(dragging ? "red" : "blue"); // dragging color 
    p5.ellipse(x, 100, 20);

    // Display the current value
    p5.fill(0);
    p5.textSize(16);
    p5.text(`Value: ${point.toFixed(2)}`, 400, 50); // Display the point value at the top of the canvas
  };

  const mousePressed = (p5) => {
    const x = p5.map(point, -10, 10, 50, 750); //x position no line
    const d = p5.dist(p5.mouseX, p5.mouseY, x, 100); // distance of mouse click to point
    if (d < 10) {
      setDragging(true); // mouse is near then start dragging
    }
  };

  const mouseDragged = (p5) => {
    if (dragging) {
      const newPoint = Math.round(p5.map(p5.mouseX, 50, 750, -10, 10));
      setPoint(p5.constrain(newPoint, -10, 10)); // update point
    }
  };

  const mouseReleased = () => {
    setDragging(false);// stop dragging when mouse Released
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Sketch
        setup={setup}
        draw={draw}
        // Event Handler
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
      />
      {/* Reset button to set at 0 point */}
      <button onClick={() => setPoint(0)} style={{ marginTop: 20 }}> 
        Reset
      </button>
    </div>
  );
};

export default NumberLine;
