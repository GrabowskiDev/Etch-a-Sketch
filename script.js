//Query Selectors
const mainBox = document.querySelector('.mainBox');

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
}

//Change the color to random variation of color on hover
    //colors in rgb format, if not, they will be converted
    //user will pick a color, whether in hex or rgb
    ////user will pick a color by typing it in a box.
    //random mesh pattern will be created by changing
    //each value by random number in range from x to y
    
//Button that will make new grid of squares (AxA)
    //Prompt will ask for a value
    //This value will then be send to making container function

//On start of page, make grid 16x16
makeGrid(16);