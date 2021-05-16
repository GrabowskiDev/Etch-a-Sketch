//Initial values
let hexColor;

//RGB variables
let r;
let g;
let b;

//HSL variables
let h;
let s;
let l;

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

//Convert Hex to HSL
function HEXtoHSL(hex) {
    hex = hex.replace(/#/g, '');
    if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (!result) {
        return null;
    }
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return {
        h: h,
        s: s,
        l: l
    };
}

//Random mesh pattern for given color, with given range of mesh
function randomColor(color, range) {
    if(color>range) color=color+getRandomInt(-range,range);
    else color=color+getRandomInt(-color,range*2-color);
    return color;
}

//Applying mesh color to given div
function applyMesh(div) {
    newL = randomColor(l, 10);
    
    div.style.backgroundColor = `hsl(${h}, ${s}%, ${newL}%)`;
}

//Changing background input color box to current color
function changeInputBoxColor(color) {
    colorBox.style.backgroundColor = color;
}

//user will pick a hex color by typing it in a box.
function color(ele) {
    if(event.key === 'Enter') { 
        hsl = HEXtoHSL(ele.value);
        h = hsl.h;
        s = hsl.s;
        l = hsl.l;

        hexToRgb(ele.value.slice(1));
        makeGradientTitle();
        changeInputBoxColor(ele.value);
    }
}

//Query Selectors
const mainBox = document.querySelector('.mainBox');
const makeGridButton = document.querySelector('#newGridButton');
const title = document.querySelector('.title');
const colorBox = document.querySelector('#colorInput');


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
        newL = randomColor(l, 10);
        //we add that to our string
        gradientColors += `, hsl(${h}, ${s}%, ${newL}%)`;
    }
    //we make gradient with colors on string
    //title.style.background = `linear-gradient(to right${gradientcolors})`;
    title.style.cssText = `background: linear-gradient(to right${gradientColors});
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent;`
}