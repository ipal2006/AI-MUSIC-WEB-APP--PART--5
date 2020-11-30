song = "";
song2= "";
status = "";
left_wrist_x=0;
left_wrist_y=0;


right_wrist_x=0;
right_wrist_y=0;

function preload()
{
song = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}

function setup()
{
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log("Model is Loaded");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        console.log("Left Wrist x = "+left_wrist_x +" Left Wrist y = "+left_wrist_y);
        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;       
        console.log("Right Wrist x = "+right_wrist_x +" Right Wrist y = "+right_wrist_y);

        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("score_leftWrist "+score_leftWrist+" score_rightWrist "+score_rightWrist);   
    }

    
}
function draw()
{
    
        image(video,0,0,600,500);
        fill('#0b0236');
        stroke('#0b0236');
        
        if(score_leftWrist > 0.2)
        {
            circle(left_wrist_x,left_wrist_y,20);
            InNumberleft_wrist_y = Number(left_wrist_y);
            remove_decimals = floor(InNumberleft_wrist_y);
            volume = remove_decimals/500;
            
            

            song2.stop();
            status=song.isPlaying();
             if(status = false)
             {
                  song.play(); 
                  document.getElementById("").innerHTML="Song Name is "+"Peter Pan Bong"

             }
        }
        
        if(score_rightWrist > 0.2)
        {
            circle(right_wrist_x,right_wrist_y,20);
            InNumberright_wrist_y = Number(right_wrist_y);
            remove_decimals = floor(InNumberright_wrist_y);
            volume = remove_decimals/500;
            
            

            song.stop();
            status=song2.isPlaying();
             if(status = false)
             {
                  song2.play(); 
                  document.getElementById("").innerHTML="Song Name is "+"Harry Potter Theme Song";

             }
        }
       
}

