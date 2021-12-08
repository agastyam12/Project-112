// Link for Teachable Machine: https://teachablemachine.withgoogle.com/models/Ub6j7eWkp/ //

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version' , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ub6j7eWkp/model.json' , modelLoaded);

function modelLoaded(){
  console.log('Model Loaded !');
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data = "The prediction is -" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);    
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}

function gotResult(error , results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("hand_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "victory"){
            document.getElementById("emoji").innerHTML = "&#9996;";
        }
       else if(results[0].label == "best"){
            document.getElementById("emoji").innerHTML = "&#128077;";
        }
       else if(results[0].label == "amazing"){
            document.getElementById("emoji").innerHTML = "&#128076;";
        }
    }
}