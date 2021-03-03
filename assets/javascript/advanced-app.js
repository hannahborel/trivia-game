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
        answers: ["Patti the Platypus", "Chocolate the Moose","Legs the Frog","Happy The Hippo"],
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
        answers: ["Under the Magician's Spell", "One Day at Horor Land", "Welcome to the Dead House", "Diary of a Mad Mummy"],
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
    questionNumber: 0,
    counter: 20,
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

    startStyle: function(){
        $('#container').css({"background":" linear-gradient(180deg, rgba(31,70,160,0.64) 2%, rgba(23,65,155,0.70) 29%, rgba(9,23,53,0.74) 100%), url(../background.png)"})

       
    },

    loadQuestion: function(){
        timer = setInterval(game.countdown, 1000);
        game.questionNumber++;
        game.startStyle()
        // game.styleContainer();
       
        $('#subwrapper').html('<div class="time-bar" data-style="smooth" style="--duration: 30;"><div class="color-bar"></div></div><h2 class=question-heading>Question <span class="question-number">'+game.questionNumber+'</span> /10</h2><span class="line"></span>')

        $('#subwrapper').append('<h2 class="question">' + questions[game.currentQuestion].question + '</h2>')

        for(var i =0; i < questions[game.currentQuestion].answers.length; i++){
            
            var valueName = questions[game.currentQuestion].answers[i]

            $('#subwrapper').append('<div class="answer-container" id="container-'+[i]+'"><label for="answer-'+[i]+'">' + valueName +'<input type ="radio" name= "radio"  class= "answer" id="answer-' +[i]+ '" value="'+ valueName +'"> <span class="checkmark"></span></label></div>')
        }

        $('#subwrapper').append('<button id = "submit"> Submit </button>')
    },

    clickedSubmit: function(){
        game.highlightCorrect()
        $('#submit').hide();
        $('.time-bar').hide();
        const next = $('<button id="next">Next</button>')
        $('#subwrapper').append(next)

        $('input:radio').attr("disabled", true)

        userAnswer = $("input[type='radio']:checked").val()
        game.checkAnswer(userAnswer)
        console.log("---UserAnswer---",userAnswer)

    },

    checkAnswer: function(userAnswer){
        console.log(userAnswer)
        console.log(questions[game.currentQuestion].correctAnswer)
        

        if(userAnswer=== questions[game.currentQuestion].correctAnswer){
            console.log("correct")
            game.answerCorrectly();
        }else{
            game.answerIncorrecetly();
        }
    },

    highlightCorrect: function(){
        console.log('higlightCorrect()')
        
        let correctValue= questions[game.currentQuestion].correctAnswer
        console.log(correctValue)
          console.log($('div').find("input[value='" +correctValue +"']").parent())
            var parentSelector = $('div').find("input[value='" +correctValue +"']").parent()
           parentSelector.parent().addClass("correct")
    },

    answerCorrectly: function(){
        console.log("-----User Answered Correctly-----");
        clearInterval(timer);
        game.correct++
    },

    answerIncorrecetly: function(){
        console.log("-----User Answered INorrectly-----")
        clearInterval(timer);
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
        game.counter = 20;
        $('#counter').html(game.counter)
        game.currentQuestion++
        game.loadQuestion();

    }, 
    timeUp: function(){
        // game.clickedSubmit();
        clearInterval(timer);
        game.unanswered++;

        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else{

        }
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
        game.questionNumber = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion()
    },


}