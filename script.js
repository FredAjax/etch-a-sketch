let sketchArea = document.getElementById("sketch-area");
const colours = ["black","blue","darkgreen","fuchsia","yellow","white"];
let currentColourValue = 0;
const currentColourUi = document.getElementById("current-colour");
let nrOfTiles = 16;
let tiles = [];

function generateTiles(){
    for(let i=0; (nrOfTiles*nrOfTiles)>i;i++){
        const div = document.createElement("div");
        div.className = "tile";
        sketchArea.appendChild(div);
    }
checkForHover();
}
generateTiles();

function checkForHover(){
    document.querySelector("style").innerHTML = ".tile{width:calc(100%/"+nrOfTiles+");height:calc(100%/"+nrOfTiles+");}";
    tiles = [];
    tiles = document.querySelectorAll(".tile");
    tiles.forEach((element, index) => {
        element.addEventListener("mouseover", (e)=>{
            tiles[index].style.backgroundColor = colours[currentColourValue];
        })
    });
}

function changeColour(){
    if(currentColourValue == (colours.length-1)){
        currentColourValue = 0;
    }
    else{
        currentColourValue += 1;
    }
    currentColourUi.style.backgroundColor = colours[currentColourValue];
}

function changeSize(){
    let newSize = prompt("Enter new size (>=100)","16");
    console.log(parseInt(newSize))
if(isNaN(parseInt(newSize))  || parseInt(newSize)>100){
        alert("Must be a number and smaller than 100")
        changeSize();
    }
    else{
        nrOfTiles = newSize;
        sketchArea.innerHTML = "";
        generateTiles();
    }
}