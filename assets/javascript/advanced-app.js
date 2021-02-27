$('#start').on('click', function(){

    $('#start').remove();
    $('#title-wrapper').remove();
    game.loadQuestion();
})



$(document).on('click','#submit', function(){
   game.clickedSubmit()
})
$(document).on('click','#next', function(){
   game.clickedNext()
})
$(document).on('click', '#resest', function(){
    game.reset();
})

var questions = [
    {
        question: "What do the initials of JNCO jeans stand for?",
        answers: ["Jean Nigel Company", "James Nathan Company", "Nothing. It was chosen at random.", "Jeans Never Compromise Originality"],
        correctAnswer: "Nothing. It was chosen at random."
    },
    {
        question: "Which of the following is not an original Beanie Baby?",
        answers: ["Patti the Platypus", "Chocolate the Moose","Legs the Frog","Happy the Hippo"],
        correctAnswer: "Happy The Hippo"
    },
    {
        question: "Which movie became the first to gross $1 billion at the box office in 1998?",
        answers: ["Titanic", "The Matrix", "Fast and The Furious", "Pulp Fiction"],
        correctAnswer: "Titanic"
    },
    {
        question: "What was the name of the beloved teacher on Boy Meets World?",
        answers: ["Michael Feeney", "Robert Feeney", "George Feeney", "Daniel Feeny"],
        correctAnswer: "George Feeney"
    },
    {
        question: "Which historical figures were at the center of the very first Got Milk? commercial in 1993?",
        answers: ["Alexander Hamilton and Aaron Burr", "George Washington and Abe Lincoln", "Albert Einstein and Amelia Earhart", "Thomas More and Thomas Jefferson"],
        correctAnswer: "Alexander Hamilton and Aaron Burr"
    },
    {
        question: "In which '90s movie did Col. Nathan R. Jessup say 'You can't handle the truth'?",
        answers: ["Saving Private Ryan", "The Red Line", "A Few Good Men", "Gettysberg"],
        correctAnswer: "A Few Good Men"
    },
    {
        question: "Who sang the song 'Closing Time' ?",
        answers: ["Sound Garden", "Perl Jam", "Oasis", "Semisonic"],
        correctAnswer: "Semisonic"
    },
    {
        question: "What's the first book in R.L. Stine's 'Goosebumps' series?",
        answers: ["Under the Magician's Spell", "One Day at Horor Land", "Welcome to Dead House", "Diary of a Mad Mummy"],
        correctAnswer: "Welcome to the Dead House"
    },
    {
        question: "What was the name of the handheld digital pet which was created in the 90s and started a worldwide craze?",
        answers: ["Tamagotchi", "Pocket Pet", "Petagotchi", "Play Pet"],
        correctAnswer: "Tamagotchi"
    },
    {
        question: "What were REM losing in their 1991 hit single?",
        answers: ["Thier Religion", "Their Mind", "Their Keys", "Their Love"],
        correctAnswer: "Thier Religion"
    },
]

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("Time Up")
            game.timeUp();
        }
    },
    loadQuestion: function(){
        // timer = setInterval(game.countdown, 1000);
        // game.styleContainer();
        $('#subwrapper').html('<h2> <span id="counter"> 30 </span> <h2>')
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>')

        for(var i =0; i < questions[game.currentQuestion].answers.length; i++){
            
            var valueName = questions[game.currentQuestion].answers[i]

            $('#subwrapper').append('<div class="answer-container" id="container-'+[i]+'">' + valueName +'<input type ="checkbox" class= "answer" id="answer-' +[i]+ '" name= "answer" value="'+ valueName +'" ></div>')
        }

        $('#subwrapper').append('<button id = "submit"> Submit </button>')
        
    },

    clickedSubmit: function(){
        $('#submit').hide();
        const next = $('<button id="next">Next</button>')
        $('#subwrapper').append(next)

        userAnswer = $("input:checked").val()
        game.checkAnswer(userAnswer)
        console.log(userAnswer)

    },

    checkAnswer: function(userAnswer){
        console.log(userAnswer)
        console.log(questions[game.currentQuestion].correctAnswer)
        

        if(userAnswer.toLowerCase()=== questions[game.currentQuestion].correctAnswer.toLowerCase()){
            console.log("correct")
            game.answerCorrectly();
        }else{
            game.answerIncorrecetly();
        }
    },

    answerCorrectly: function(){
        console.log("-----User Answered Correctly-----");

        let selected = $("input:checked")[0].id;
        console.log("Answer Selected: ",selected)
        $('#'+selected).parent().addClass("correct")

        // clearInterval(timer);
        game.correct++
    },

    answerIncorrecetly: function(){
        console.log("-----User Answered INorrectly-----");
        console.log("----Answer Object------: ", questions[game.currentQuestion].correctAnswer)

        $(".answer").each(function(){
            let selected = $("input:checked")[0].id;
            if($(this).val().toLowerCase() === questions[game.currentQuestion].correctAnswer.toLowerCase()){
                console.log("CORRECT: ", $(this).val())
                $(this).parent().addClass("correct")
                $('#'+selected).parent().addClass("incorrect")
            }else{
                console.log("*Incorrect Answers*: ", $(this).val().toLowerCase())
            }
        })
        game.incorrect++
    },

    clickedNext: function(){

        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results);
        }else{
            setTimeout(game.nextQuestion);
        }   
    },

    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter)
        game.currentQuestion++
        game.loadQuestion();

    }, 
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2> Out of Time! </h2>')
        $('#subwrapper').append('<h3> Correct Answer :   ' + questions[game.currentQuestion].correctAnswer +'</h3>')
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else{
            setTimeout(game.nextQuestion,3*1000);
        }
        game.styleResult();
    }, 

    results: function(){
        // clearInterval(timer);
        $('#subwrapper').html(" ")
        $('#subwrapper').append('<h3>correct: ' + game.correct + '</h3>');
        $('#subwrapper').append('<h3>incorrect: ' + game.incorrect+ '</h3>');
        $('#subwrapper').append('<h3>unanswered: ' + game.unanswered+ '</h3>');
        $('#subwrapper').append('<button id = "reset> Reset </button>');
        game.styleFinal();
    },

    reset: function(){
        game.currentQuestion =0 ;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion()
    },
    // styleResult: function(){

    //    document.querySelector("h2").style.cssText = "font-family: 'Bad Script', cursive; font-size: 4rem;letter-spacing: .1rem, color: hsl(0, 45%, 94%); text-shadow: 0px 0px 1px #ffff, 0px 0px 3px #ffff, 0 0 6px #f25757, 0 0 10px #f25757, 0 0 15px #f25757, 0 0 20px #e50b0b, 0 0 25px #e50b0b, 0 0 30px #e50b0b, 0 0 35px rgb(231, 58, 58); padding: 0 3.5rem 0 3.5rem;"

    //    document.querySelector('h3').style.cssText =  "color: white; font-family: Lucida Grande; text-shadow: 1px 1px 2px black;"
    // },

    // styleFinal: function(){
        
    //    document.querySelector('#container').style.cssText = "box-shadow: 0 0 0.1vw  0.4vw #fff7f7,   0 0 0.4vw  0.6vw #e97272, 0 0   4vw  0.4vw #e50b0b, inset 0 0 1.5vw  0.4vw #e50b0b, inset 0 0 0.4vw  0.2vw #e97272, inset 0 0 0.5vw  0.2vw #fff7f7; border-radius: 1.5rem; padding: 5px"

    //    let myElements = document.querySelectorAll("h3");

    //         for (let i = 0; i < myElements.length; i++) {

    //         myElements[i].style.cssText = "margin: 0; font-family: 'Bad Script', cursive; font-size: 4rem; color: #ffffff; letter-spacing: .1rem, line-height: 1; color: hsl(0, 45%, 94%); text-shadow: 0px 0px 1px #ffff, 0px 0px 3px #ffff, 0 0 6px #f25757, 0 0 10px #f25757, 0 0 15px #f25757, 0 0 20px #e50b0b, 0 0 25px #e50b0b, 0 0 30px #e50b0b, 0 0 35px rgb(231, 58, 58); padding: 0 3.5rem 0 3.5rem;"
            
    //         }

    // },
    // styleContainer: function(){
        
    //    document.querySelector('#container').style.cssText = "width: 900px"

    // },
   

}