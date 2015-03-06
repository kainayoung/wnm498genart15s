// Academy of Art University
// WNM 498 Generative Art & Creative Code
//
// Ryan Berkey
// ryan@rybotron.com


var gui,
    sound,
    FFT,
    waves = [],
    waveNum = 150,
    circleRGBA;

var ctrl = {
    vSpace: 250
};

// Preload the sound file
function preload(){
    sound = loadSound("audio/real.mp3");
}

function setup(){
    createCanvas( windowWidth, windowHeight );
    circleRGBA = color(10, 200, 180, 100);

    // Start playing the sound
    sound.play();

    // Create an FFT with a frequency range of 15
    FFT = new p5.FFT(0, 128);
    FFT.setInput(sound);

    gui = new dat.GUI();
    gui.add(ctrl, "vSpace", 0, height / 2).name("Vertical Spacing");
}

function draw() {

    background(255);

    var wave = FFT.waveform();

    // Add the new waveform to the beginning of fequencies
    waves.unshift( wave );

    // If the waveforms array is longer than the waveNum pull out the last indexed element
    if (waves.length >= waveNum){
        waves.pop();
    }

    // Vertex spacing on window width
    var xGridSize = width / wave.length;
    // Offset the matrix
    translate( xGridSize / 2,  height / 2 );

    stroke( circleRGBA, circleRGBA[3] );
    strokeWeight( 5 );
    
    // Loop through the array of frequencies and draw a line between each point of each array
    for(var j = 0; j < waves.length; j++){
        var yGridPos = map( j, 0, (waves.length - 1), -ctrl.vSpace, ctrl.vSpace);
        beginShape();
        for ( var i = 0; i < waves[j].length; i++ ) {
            var radius = xGridSize / 2;
            var xPos = xGridSize * i;
            var yPos = -waves[j][i] + yGridPos;
            vertex(xPos, yPos);
        }
        endShape();
    }

}

















