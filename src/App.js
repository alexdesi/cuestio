import React, { Component } from 'react';
import './App.css';

class Responses extends Component {
  constructor(props) {
    super(props)
  }

  handleOnClick(e){
    this.props.handleSelectOption(e.target.value)
  }

  render() {
    return (
      this.props.responses.map(r =>
        <div>
          <input onClick={ this.handleOnClick.bind(this) } 
                 type="radio" id={`response-${r[0]}`}
                 name="response"
                 value={r[0]} />
          <label for={`response-${r[0]}`}>{r[1]}</label>
        </div>
      )
    )
  }
}

class Question extends Component {
  constructor(props){
    super(props)
    this.state = { response: -1 }
  }

  handleSelectOption(response) {
    this.setState({response: response })
  }

  handleConfirm() {
    this.props.handleNextQuestion(this.state.response)
  }

  render(){
    return(
      <div>
        <p>Question {this.props.question.id} of {this.props.questionsNumber}</p>
        <h3>{ this.props.question.body }</h3>
        <Responses responses={ this.props.question.responses }
                   handleSelectOption={ this.handleSelectOption.bind(this) } />
        <button onClick={ this.handleConfirm.bind(this) }>Confirm</button>
      </div>
    )
  }
}

class Quiz extends Component {
  constructor(props){
    super(props)
    this.state = {
                   currentQuestionId: 0,
                   responses: []
                 }
  }

  handleNextQuestion(currentResponse){
    let newResponses = this.state.responses.concat({
                           id: this.state.currentQuestionId,
                           response: currentResponse
                         })

    if (this.state.currentQuestionId < this.props.questions.length - 1) {
      this.setState({
        currentQuestionId: this.state.currentQuestionId + 1,
        responses: newResponses
      })
    } else {
      this.setState({
        currentQuestionId: this.props.questions.length - 1,
        responses: newResponses
      }, () => {
        let correctResponses = this.props.questions.filter((q, i) => {
          return(q.correctResponse == this.state.responses[i].response)
        })
        alert(correctResponses.length)
      })
    }
  }

  render(){
    return(
      <Question question={this.props.questions[this.state.currentQuestionId]}
                questionsNumber={this.props.questions.length}
                handleNextQuestion={this.handleNextQuestion.bind(this)} />
    )
  }
}

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    let questions = [{
      id: 1,
      body: 'Who invented the language Ruby?',
      responses: [[0, 'Matzumoto'], [1, 'DHH'], [2,'Linus']],
      correctResponse: 0
    },
    {
      id: 2,
      body: 'What is the superclass of Object?',
      responses: [[0, 'nil'], [1, 'BasicObject'], [2,'Integer']],
      correctResponse: 1
    },
    {
      id: 3,
      body: 'What\'s the result of [1,2,3].map{|n| n * 2} ?',
      responses: [[0, '[]'], [1, '[1,4,9'], [2,'[2,4,6]']],
      correctResponse: 2,
      last: true
    }]

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>Questions</p>

        <Quiz questions={questions} />

      </div>
    )
  }
}

export default App;
