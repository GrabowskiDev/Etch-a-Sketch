//Initial values
let hexColor;
let hsl = {};

//Make a container with 16x16 squares (divs)(grid)  
function makeGrid(gridNum) {
    if(isNaN(gridNum) || gridNum<=0 || gridNum>128) return alert('Please input a number in range 1-128');

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

//Random value with given range not greater than 100 or worse than 0
function randomValue(value, range) {
    if(value+range>100) return value + getRandomInt((-range*2)+(100-value), 100-value);
    if(value<range) return value + getRandomInt(-value, range*2-value);
    return value + getRandomInt(-range, range);
}

//Applying mesh color to given div
function applyMesh(div) {
    newL = randomValue(hsl.l, 10);
    div.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${newL}%)`;
}

//Changing background input color box to current color
function changeInputBoxColor(color) {
    colorBox.style.backgroundColor = color;
}

//user will pick a hex color by typing it in a box.
function color(ele) {
    if(event.key === 'Enter') { 
        hsl = HEXtoHSL(ele.value);
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
    makeGrid(parseInt(prompt("Enter how many boxes in each row")));
});

//Title gradient created from given color
function makeGradientTitle() {
    //We remove any colors from gradient
    let gradientColors = "";
    for(i=0; i<5; i++) {
        newL = randomValue(hsl.l, 13);
        //we add that to our string
        gradientColors += `, hsl(${hsl.h}, ${hsl.s}%, ${newL}%)`;
    }
    //we make gradient with colors on string
    title.style.cssText = `background: linear-gradient(to right${gradientColors});
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent;`
}