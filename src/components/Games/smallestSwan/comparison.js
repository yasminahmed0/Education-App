class Quiz extends React.Component {
  constructor(props) {
    super(props);

    var dataSet = [
    {
      question: "What is 8 x 1?",
      answers: [
      "1",
      "8",
      "16",
      "9"],

      correct: 1 },

    {
      question: "Who is Steve Jobs?",
      answers: [
      "CEO of Microsoft",
      "Barber in NY",
      "Movie Star",
      "CEO of Apple"],

      correct: 3 },

    {
      question: "Metallica is a ____ band",
      answers: [
      "Blues",
      "Hard-Rock",
      "Jazz",
      "Metal"],

      correct: 3 },

    {
      question: "IS is a ____",
      answers: [
      "Word",
      "Band",
      "Terror Group",
      "Brand"],

      correct: 2 },

    {
      question: "Who was Einstein",
      answers: [
      "A Scientist",
      "A Dentist",
      "A Serial Killer",
      "None of the above"],

      correct: 0 },

    {
      question: "JavaScript can be used in ____ development",
      answers: [
      "Back-End",
      "Front-End",
      "ReactJS",
      "All of the Above"],

      correct: 3 },

    {
      question: "Hitler was a",
      answers: [
      "Mass Murderer",
      "Dictator",
      "Jew",
      "None of the above",
      "All of the above"],

      correct: 4 },

    {
      question: "Korn is a",
      answers: [
      "Nu-Metal band",
      "Religion",
      "Singer"],

      correct: 0 },

    {
      question: "Windows computers are",
      answers: [
      "Horrible",
      "Great",
      "Cheap",
      "Invented by Bill Gates"],

      correct: 3 },

    {
      question: "The BigBan stands in",
      answers: [
      "Egypt",
      "London",
      "Amsterdam",
      "NewYork"],

      correct: 1 }];



    this.state = { current: 0, dataSet: dataSet, correct: 0, incorrect: 0 };
    this.handleClick = this.handleClick.bind(this);

  } // end constructor

  handleClick(choice) {
    if (choice == this.state.dataSet[this.state.current].correct) {
      this.setState({ correct: this.state.correct + 1 });
    } else {
      this.setState({ incorrect: this.state.incorrect + 1 });
    }

    if (this.state.current == 9) {
      this.setState({ current: 0 });
      this.setState({ incorrect: 0 });
      this.setState({ correct: 0 });
    } else {
      this.setState({ current: this.state.current + 1 });
    }
  }

  render() {
    return (
      React.createElement("div", null,
      React.createElement(ScoreArea, { correct: this.state.correct, incorrect: this.state.incorrect }),
      React.createElement(QuizArea, { handleClick: this.handleClick, dataSet: this.state.dataSet[this.state.current] })));


  }}


function Question(props) {
  var style = {
    color: "red" };

  return (
    React.createElement("h1", { style: style }, props.dataSet.question));

}

function Answer(props) {
  var style = {
    width: "100%",
    height: 50,
    color: "blue" };

  return (
    React.createElement("div", null,
    React.createElement("button", { style: style, onClick: () => props.handleClick(props.choice) }, props.answer)));


}

function AnswerList(props) {
  var answers = [];
  for (let i = 0; i < props.dataSet.answers.length; i++) {if (window.CP.shouldStopExecution(0)) break;
    answers.push(React.createElement(Answer, { choice: i, handleClick: props.handleClick, answer: props.dataSet.answers[i] }));
  }window.CP.exitedLoop(0);
  return (
    React.createElement("div", null,
    answers));


}

function QuizArea(props) {
  var style = {
    width: "25%",
    display: "block",
    textAlign: "center",
    boxSizing: "border-box",
    float: "left",
    padding: "0 2em" };

  return (
    React.createElement("div", { style: style },
    React.createElement(Question, { dataSet: props.dataSet }),
    React.createElement(AnswerList, { dataSet: props.dataSet, handleClick: props.handleClick })));


}

function TotalCorrect(props) {
  var style = {
    display: "inline-block",
    padding: "1em",
    background: "#eee",
    margin: "0 1em 0 0" };

  return (
    React.createElement("h2", { style: style }, "Correct: ", props.correct));

}

function TotalIncorrect(props) {
  var style = {
    display: "inline-block",
    padding: "1em",
    background: "#eee",
    margin: "0 0 0 1em" };

  return (
    React.createElement("h2", { style: style }, "Incorrect: ", props.incorrect));

}

function ScoreArea(props) {
  var style = {
    width: "100%",
    display: "block",
    textAlign: "left",
    float: "left",
    padding: "2em" };

  return (
    React.createElement("div", { style: style },
    React.createElement(TotalCorrect, { correct: props.correct }),
    React.createElement(TotalIncorrect, { incorrect: props.incorrect })));


}

ReactDOM.render(
React.createElement(Quiz, null),
document.getElementById("root"));
