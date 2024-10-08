### Karomi Technologies Assignment.
# Carton Packaging Animation

This project provides an interactive animation of a carton packaging process. Users can view the transition from a 2D unfolded carton to a fully formed 3D package. The dimensions of the package, including height, width, and length, can be adjusted through the user interface. Additionally, the animation can be controlled using a slider.

## Features

- **Interactive 3D Animation:** Watch the transformation of a 2D carton into a 3D package.
- **Adjustable Dimensions:** Modify the height, width, and length of the carton in real-time.
- **Slider Control:** Use a slider to control the folding and unfolding animation.

## Getting Started

### Prerequisites

To run this project, you will need:

- A modern web browser that supports WebGL
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/DeepankarGupta13/KaromiAssignment.git
    ```

3. Run in your web browser.
    ```bash
        npm install
        npm run dev
    ```

### Usage

**To Use Carton Packacing project**
In the src/main.js file call initApp() and comment initGeomChanges()
![img](image.png)
- Adjust the dimensions of the carton using the input fields provided in the UI.
- Use the slider to control the folding and unfolding animation of the carton.

**To Use Complex Geometry Alteration Project**
In the src/main.js file call initGeomChanges() and comment initApp()
![alt text](image-1.png)
- Can change the geometry of the plane by altering the width, height and eacch radius.
- double click on the text which u want to change and enter the number for that parameter and press enter this will update your parameter.

## Technologies Used

- **HTML/CSS:** For the canvas.
- **JavaScript:** To handle the logic for changing dimensions and controlling animations and UI.
- **THREE.js:** For rendering and animating the 3D carton model.
