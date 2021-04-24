//Initial values
let hexColor;

let r;
let g;
let b;

//Make a container with 16x16 squares (divs)(grid)  
function makeGrid(gridNum) {
    //Clear already existing grid
    mainBox.innerHTML = '';
    //The script will add a choosen number of divs to
    //parent div in for loop
    for(i=0; i<gridNum*gridNum; i++) {
        //Add css rule to parent div with grid-template-columns: repeat()
        ////calculate size using mainbox size and gridNum
        mainBox.setAttribute('style', `grid-template-columns: repeat(${gridNum}, ${512/gridNum}px [col-start]);`);
        const childBox = document.createElement('div');    
        childBox.classList.add('box');
        mainBox.appendChild(childBox);
    }
    //Declare new nodelist everytime new grid is made
    mainBoxAddEventListener();
}

/*                  Mesh Pattern                    */

//Random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Convert Hex values to RGB values
function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;

    return r + "," + g + "," + b;
}

//Random mesh pattern for given color
function randomColor(color) {
    if(color>20) color=color+getRandomInt(-20,20);
    else color=color+getRandomInt(-color,40-color);
    return color;
}

//Applying mesh color to given div
function applyMesh(div) {
    newR = randomColor(r);
    newG = randomColor(g);
    newB = randomColor(b);
    
    div.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
}

//user will pick a hex color by typing it in a box.
function color(ele) {
    if(event.key === 'Enter') { 
        hexToRgb(ele.value.slice(1));
        makeGradientTitle();
    }
}

//Query Selectors
const mainBox = document.querySelector('.mainBox');
const makeGridButton = document.querySelector('#newGridButton');
const title = document.querySelector('.title');


//On start of page, make grid 16x16
makeGrid(16);

//Add event listener to every child of mainBox
function mainBoxAddEventListener() {
    mainBox.childNodes.forEach((div) => {
        div.addEventListener('mouseover', () => {
            //if mouse is over, apply mesh
            applyMesh(div);
        });
    });
}

//Button that will make new grid of squares (AxA)
makeGridButton.addEventListener('click', () => {
    //Prompt will ask for a value
    //This value will then be send to making container function
    makeGrid(prompt("Enter how many boxes in each row"));
});

//Title gradient created from given color
function makeGradientTitle() {
    //We remove any colors from gradient
    let gradientColors = "";
    //We want to repeat it 5 times
    for(i=0; i<5; i++) {
        //We random each color
        newR = randomColor(r);
        newG = randomColor(g);
        newB = randomColor(b);
        //we add that to our string
        gradientColors += `, rgb(${newR}, ${newG}, ${newB})`;
    }
    //we make gradient with colors on string
    title.style.background = `linear-gradient(to right${gradientColors})`;
    title.style.color = 'transparent';
    title.style.backgroundClip = 'text';
}