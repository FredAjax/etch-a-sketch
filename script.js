let sketchArea = document.getElementById("sketch-area");
let etchaContainer = document.getElementById("container");
const colours = ["black","blue","darkgreen","fuchsia","yellow","white"];
let currentColourValue = 0;
const currentColourUi = document.getElementById("current-colour");
let nrOfTiles = 16;
let tiles = [];
let caseVal;
let isPainting;
let paintBool = false;
let animateBool = false;
let rainbowBool = false;
let rainbowColours = ["red","orange","yellow","green","blue","indigo","violet"];
let rainbowColourValue = 0;
let mouseDown = 0;
let selectedTile;
let selectedTileArray = [];

function generateTiles(){
    for(let i=0; (nrOfTiles*nrOfTiles)>i;i++){
        const div = document.createElement("div");
        div.className = "tile";
        sketchArea.appendChild(div);
    }
    document.querySelectorAll("style")[0].innerHTML = ".tile{width:calc(100%/"+nrOfTiles+");height:calc(100%/"+nrOfTiles+");}";
    tiles = [];
    tiles = document.querySelectorAll(".tile");
	testFunc();
}
generateTiles();

//Everything above is good

function fadeAnimate(){
	if(animateBool==false){
		animateBool = true;
		document.querySelectorAll("#extra-options button")[1].classList.add("active");
		tiles.forEach(tile => {
			tile.style.transition = "background-color 1s, opacity 1s ease-out";
			
		});
	}
	else{
		animateBool = false;
		document.querySelectorAll("#extra-options button")[1].classList.remove("active");
		tiles.forEach(tile => {
			tile.style.transition = "";
		});
	}
	
}

function rainbowColoursAnimate(){
	if(rainbowBool==false){
		rainbowBool = true;
		document.querySelectorAll("#extra-options button")[0].classList.add("active");
	}
	else{
		rainbowBool = false;
		document.querySelectorAll("#extra-options button")[0].classList.remove("active");
	}
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
if(isNaN(parseInt(newSize))  || parseInt(newSize)>100){
        changeSize();
    }
    else{
        nrOfTiles = newSize;
        sketchArea.innerHTML = "";
        generateTiles();
    }
}

function removeAnimation(){
    if (selectedTileArray.length !== 0) {
        selectedTileArray.forEach((tileIndex, i) => {
            setTimeout(() => {
                tiles[tileIndex].classList.remove("animate");
                if (animateBool) {
                    tiles[tileIndex].style.backgroundColor = ""; // Only clear background-color
                }
            }, i * 200); // 100ms delay for each subsequent tile
        });
        selectedTileArray = []; // Clear the array after processing
    }
}


function etchAsketch(){
	
	if(caseVal == 1){
		tiles[selectedTile].style.backgroundColor = colours[currentColourValue];
	}
	if(caseVal == 2){
		tiles[selectedTile].style.backgroundColor = colours[currentColourValue];
		tiles[selectedTile].classList.add("animate");
		removeAnimation();
		
	}
	if(caseVal == 3){
		rainbowColourValue += 1;
		if(rainbowColourValue >= (rainbowColours.length)){
			rainbowColourValue = 0;
		}
		tiles[selectedTile].style.backgroundColor = rainbowColours[rainbowColourValue];
	}
	if(caseVal == 4){
		rainbowColourValue += 1;
		if(rainbowColourValue >= (rainbowColours.length)){
			rainbowColourValue = 0;
		}
		tiles[selectedTile].style.backgroundColor = rainbowColours[rainbowColourValue];
		tiles[selectedTile].classList.add("animate");
		removeAnimation();
	}
}

function testFunc(){
tiles.forEach((element, index) => {
	        element.addEventListener("mousedown", function(){
				if(rainbowBool == true && animateBool == true){
					caseVal = 4;
				} else if(rainbowBool == true && animateBool == false){
					caseVal = 3;
				} else if(rainbowBool == false && animateBool == true){
					caseVal = 2;
				} else {
					caseVal = 1;
				}
				isPainting = true;
				selectedTile = index;
				if(selectedTileArray.includes(index)==false && animateBool == true){
					selectedTileArray.push(index);
				}
				etchAsketch();
	        });
	        element.addEventListener("mouseover", function(){
				if(isPainting == true){
					selectedTile = index;
					if(selectedTileArray.includes(index)==false  && animateBool == true){
						selectedTileArray.push(index);
					}
				}
				etchAsketch();
	        });
			element.addEventListener("mouseup", function(){
				caseVal=0;
				isPainting = false;
	    });
	});

	etchaContainer.addEventListener("mouseleave", function(){
		caseVal=0;
	});
	etchaContainer.addEventListener("mouseup", function(){
		caseVal=0;
	});}
	testFunc();