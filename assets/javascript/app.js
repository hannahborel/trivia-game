$('#start').on('click', function(){
   game.start();
})

var questions = [
    {
        question: "What do the initials of JNCO jeans stand for?",
        answers: ["Jean Nigel Company", "James Nathan Company", "Nothing. It was chosen at random.", "Jeans Never Compromise Originality"],
        correctAnswer: "Nothing. It was cosen at random."
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
        question: "Who did former president Bill Clinton defeat in 1996 to stay on for a second term?",
        answers: ["Bob Dole", "Al Gore", "Ralph Nadar", "John Kerry"],
        correctAnswer: "Bob Dole"
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

var game ={
    correct: 0,
    incorrect: 0,
    counter: 120,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.couter<=0){
            console.log("Time is up!")
            game.done();
        }
    },
    start: function(){
        timer = setInterval(game.countdown,1000)
        $('#subwrapper').prepend("<h2> Time Remaining: <span id ='counter'> 120 </span> Seconds </h2>")
        $('#start').remove();
        for(var i= 0; i < questions.length; i++){
            $('#subwrapper').append('<h2>' + questions[i].question + '</h2>');
            for(var ii = 0; ii < questions[i].answers.length; ii++){
                $('#subwrapper').append("<input type= 'radio' name='question-" + i + "' value= '" + questions[i].answers[ii] + "'>" + questions[i].answers[ii])
            }
        }
        
    }
}