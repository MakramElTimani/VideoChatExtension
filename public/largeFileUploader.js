const input = document.querySelector('#video-url-example');
const url ="http://localhost:3000/upload";

var chunkCounter;
//break into 1 MB chunks for demo purposes
const chunkSize = 1000000;  
var videoId = "";
var playerUrl = "";


input.addEventListener('change', () => {
    const file = input.files[0];
    const filename = file.name;
    const fileSize = file.size; //in bytes
    //calculate the chunks for the file
    const sizeInGB = fileSize / 1000000000; 
    // if(sizeInGB > 1){
    //     let sizeOfChunksInGB = 
    // }
});

function createChunk(file, start, end){

}