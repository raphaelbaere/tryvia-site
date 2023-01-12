import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import questionsAPI from '../API/questionsAPI';
import Header from '../Components/Header';
// import Timer from '../Components/Timer';
import '../style/answersColors.style.css';
import shuffle from '../util/shuffle';

class Game extends Component {
  state = {
    currentQuestion: 0,
    questions: [],
    hasAnswered: false,
    category: '',
    difficulty: '',
    text: '',
    correctAnswer: '',
    incorrectAnswers: [],
    shuffledAnswers: [],

    // This property is managed by 'Timer' child component
    /* timerHandle: {
      timerFinished: false,
      timerValueWhenFinished: 0,
      startTimer: this.mockTimer,
      stopTimer: this.mockTimer,
    }, */
  };

  componentDidMount() {
    // const { timerHandle: { startTimer } } = this.state;
    const token = localStorage.getItem('token');
    this.getQuestions(token);
    // startTimer();
  }

  // mockTimer = () => {};

  setQuestions = () => {
    const { questions, currentQuestion } = this.state;
    const { category, difficulty, question } = questions[currentQuestion];
    const correctAnswer = questions[currentQuestion].correct_answer;
    const incorrectAnswers = questions[currentQuestion].incorrect_answers;

    this.setState({
      category,
      difficulty,
      text: question,
      shuffledAnswers: shuffle([correctAnswer, ...incorrectAnswers]),
      correctAnswer,
      incorrectAnswers,
      hasAnswered: false,
    });
  };

  getQuestions = async (token) => {
    const { history } = this.props;
    const response = await questionsAPI(token);

    // If response_code is invalid, return to initial page
    if (!response) history.push('/');

    this.setState({
      questions: response,
    }, this.setQuestions);
  };

  triggerAnswer = () => {
    // const { timerHandle: { stopTimer } } = this.state;
    // stopTimer();
    this.setState({ hasAnswered: true });
  };

  renderShuffledAnswer = () => {
    const { correctAnswer, shuffledAnswers, hasAnswered } = this.state;

    let currentWrongIndex = 0;
    return shuffledAnswers.map((answer) => {
      let dataTestId;
      let eleClass;
      if (answer !== correctAnswer) {
        dataTestId = `wrong-answer-${currentWrongIndex}`;
        eleClass = 'wrong';
        currentWrongIndex += 1;
      } else {
        dataTestId = 'correct-answer';
        eleClass = 'correct';
      }
      return (
        <button
          key={ dataTestId }
          type="button"
          className={ hasAnswered ? eleClass : '' }
          data-testid={ dataTestId }
          onClick={ this.triggerAnswer }
          disabled={ hasAnswered }
        >
          { answer }
        </button>
      );
    });
  };

  changeQuestion = () => {
    const { currentQuestion } = this.state;
    const totalQuestions = 4;
    if (currentQuestion < totalQuestions) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
      }));
    }
    this.setQuestions();
  };

  render() {
    const {
      hasAnswered,
      category,
      text,
      difficulty,
      incorrectAnswers,
      currentQuestion,
      questions } = this.state;
    // const { setState } = this;
    // const { prop1, dispatch } = this.props;
    console.log(hasAnswered, difficulty, incorrectAnswers);
    return (
      <div>
        <Header />
        {/* <Timer parentSetState={ setState } /> */}
        <div id="game-questions">
          <h2>{ currentQuestion + 1 }</h2>
          <h3 data-testid="question-category">{ category }</h3>
          <h3 data-testid="question-text">{ text }</h3>
          <div data-testid="answer-options">
            { this.renderShuffledAnswer() }
          </div>
          {(hasAnswered && currentQuestion < questions.length - 1)
          && (
            <button
              type="button"
              onClick={ this.changeQuestion }
              data-testid="btn-next"
            >
              Next
            </button>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Game.propTypes = {
  // prop1: PropTypes.string.isRequired,
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Game);
