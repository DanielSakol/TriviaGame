$(document).ready(function () { 

    const triviaTitle = $("<h1>");
    let modal = document.getElementById("questions");
    let modalT = document.getElementById("timer");
    $(triviaTitle).text("90's Movie Trivia");
    $("#gametitle").append(triviaTitle);
    //directions
    const gameStart = $("<h2>");
    $(gameStart).text("Alllllllrighty Then! Let's Test Your 90's Movie Knowledge:  You Have 10 Seconds Per Question (so only click 'PLAY NOW' when ready!)");
    $("#directions").append(gameStart);
    //start button
    let startButton = $("<h2>").text("PLAY NOW");
    $("#button").append(startButton);
    $("#button").click(function(){
        $("#button").hide("#button");
        modal.style.display = "block";
        modalT.style.display = "block";
      });
    //make timer
    let IntervalId; //set time for game
    let timeRunning = false;
    let timer = 10;
    //Let variables
    $(document).ready(function(){
        $(":button").css("background-color", "red");
      });
    const triviaGame = [{
        question: "What year was Wayne's World released?",
        choices: ["A. 1992", "B. 1993", "C. 1995", "D. 1990"],
        answer: 1,
    }, {
        question: "What was the name of Gary Oldman's character in The Fifth Element? ",
        choices: ["A. Zoob", "B. Zord", "C. Korb", "D.  Zorg"],
        answer: 4,
    }, {
        question: "All of these Jim Carrey movies were released in 1994, EXCEPT for:",
        choices: ["A.  Dumb and Dumber", "B.  Batman Forever", "C.  The Mask", "D.  Ace Ventura: Pet Detective"],
        answer: 2,
    }, {
        question: "Brandon Lee was accidentally killed in the filming of which 1994 movie?",
        choices: ["A.  Blown Away", "B.  Stargate", "C.  The Crow", "D.  True Lies"],
        answer: 3,
    }, {
        question: "How late is 'Empire Records' open until?",
        choices: ["A.  10:00pm", "B.  Whenever they feel like closing", "C.  Midnight", "D.  They never close"],
        answer: 3,
    }, {
        question: "Which actor recieved an Academy Award for their role in the movie Goodfellas?",
        choices: ["A.  Ray Liotta", "B.  Robert De Niro", "C.  Al Pacino", "D.  Joe Pesci"],
        answer: 4,
    }, {
        question: "Which of these 90's Disney movies came out first?",
        choices: ["A.  Aladdin", "B.  Lion King", "C.  Beauty and the Beast", "D.  The Mighty Ducks"],
        answer: 1,
    }]
    let correctAnswer = 0; 
    let wrongAnswer = 0; 
    let userAnswer = "";//blank
    let noAnswer = 0;
    let tempArray = [];
    let select; //user selections
    let index = 0; //for answers array
    let i = 0; 
    //---------------------------------Functions and Conditions-----------------------------------------//
    //Function for button that starts game when button is click.//
    $(startButton).on("click", function(){
        startButton.hide();
        startTimer();
        startGame();
        for (let i = 0; i < triviaGame.length; i++);
            tempArray.push(triviaGame[i]);
            console.log(i);
    });
    //Function for starting timer.//
    function startTimer() {
        if (!timeRunning) {
            IntervalId = setInterval(timeDecrease, 1000);
            timeRunning = true;
        }
    
    function timeDecrease() {
        $("#timer").html("<h4>Time Remaining: " + timer + "</h4>")
        timer--;
        if (timer === -1) {
            stopTimer();
            wrongAnswer++;  
            if(index < triviaGame.length - 1){
                timer = 10;
                index++
                startTimer();
                startGame();
                $(noAnswer).text("OUT OF TIME!");
            }else {
                alert("Game Over") 
                stopTimer()
                showScore()
            }
           
        }
    }
    //end timer
    }
    function stopTimer() {
        clearInterval(IntervalId);
        timeRunning = false;
        }
    //Function that holds and displays the game data at start//
    function startGame (){
        
        console.log(index);
        select = triviaGame[index];
        console.log(select);
        $("#questions").html("<h4>" + select.question + "</h4>");
            for (let i = 0; i < select.choices.length; i++){
                console.log(select.choices[i], "these are our choices")
                //fancy template literals
                $("#questions").append(`<div value=${i}  class="options">${select.choices[i]}</div>`);
            }
            answer = select.answer
    }
    function showScore(){
       
        $("#questions").empty();
        $("#questions").append(`
        <div> Results:</div> 
        <div> Correct Answers: ${correctAnswer}</div>
        <div> Wrong Answers: ${wrongAnswer}</div>
        `)
    }
    //Function for logging player click and display//
    $(document).on("click", ".options", function() {
        
        userAnswer = parseInt($(this).attr("value"));
        console.log(userAnswer, "user answer:")
        if (userAnswer === answer) {
            correctAnswer++;
            if(index < triviaGame.length - 1){
                index++
               
                timer = 10;
                startGame();
            }else{
                alert("You're done! Click OK to see how you did!")
                stopTimer();
                showScore();
            }
           
        }else if (userAnswer !== answer) {
            wrongAnswer++;
            if(index < triviaGame.length - 1) {
                index++
               
                timer= 10;
                startGame();
            } else{
                alert("Let's See How You Did!")
                stopTimer();
                showScore();
            }
        }
        
    })
    
});
