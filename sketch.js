let num;
let mic;
let vol;
let reply;

function setup()
{
//noCanvas();	

      // Create an Audio input
    mic = new p5.AudioIn();  
    // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
    
    let speech = new p5.Speech(voiceReady);
    speech.onLoad=Voices();
    function Voices(){
        speech.listVoices();                  
        speech.setVoice('Google UK English Male');
      }  

    function voiceReady(){
        let voices = speech.voices;
        let voice = random(voices);
        speech.setVoice('Google UK English Male');
    console.log(speech.voices);
    //speech.setVoice(voice);
    speech.speak('Hello, I am your voice assistant');
    }
   
    

    let speechRec = new p5.SpeechRec('eng-US', gotSpeech);
speechRec.start(true,false)

function gotSpeech(){
    if (speechRec.resultValue)
    {
        let input = speechRec.resultString;
        
        console.log(input);
        let vol = mic.getLevel();
        console.log(vol);
        console.log(speechRec.resultConfidence);
        let heard = speechRec.resultConfidence;
        if (heard > 0.95)
        {
            
            //speech.speak(input);
            //output.html(input);
            bot.reply('local-user', input).then(function(reply)
            {
            // output.html(reply);
            
            console.log(reply);
            speech.speak(reply);
            output.html(reply);
           })
           
        } else
        {
            bot.reply('local-user', '0001001').then(function(reply) {
                // output.html(reply);
                console.log(reply);
                speech.speak(reply);
                output.html(reply);
               });
        }
    }
}

    let bot = new RiveScript();
    
    bot.loadFile("brain.rive").then(brainReady).catch(brainError);
    
    function brainReady()
    {
        console.log('Chatbot ready!')
        bot.sortReplies();
        //let num = floor(random(10))+1;
        //console.log(num);
        //let reply = bot.reply('local-user', 'set ' + num).then(function(reply) {});
    }
    
     function brainError()
    {
        console.log('Chatbot failed!')
        
    }
    
    let button = select('#submit');
    let user_input = select('#user_input');
    let output = select('#output');
    
    button.mousePressed(chat);
    
    function chat() {
        let input = user_input.value();
        output.html(input);
           
        speech.speak(input);
        //let reply = bot.reply('local-user', input);
       // bot.reply('local-user', input).then(function(reply) 
       {
           output.html(reply);
           
           speech.speak(reply);
          };
        
        }
    
        voiceReady();
}

function onEnd()
{

    console.log('ended');
}

function draw() {
    background(200);
  
    // Get the overall volume (between 0 and 1.0)
    let vol = mic.getLevel();
    fill(127);
    stroke(0);
  
    // Draw an ellipse with height based on volume
    let h = map(vol, 0, 1, height, 0);
    ellipse(width / 2, h - 25, 50, 50);
  }

