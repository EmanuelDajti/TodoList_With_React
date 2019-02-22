import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './Components/Todos';
import Addtodo from './Components/Addtodo';
import Header from './Components/layout/Header';
import About from './Components/pages/About';
// import uuid from 'uuid';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    todos:[]
  }

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}));
  }
  
  //Toggle Complete
  markComplete = (id) => {
    this.setState( {todos: this.state.todos.map(todo =>{
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;

    }) });
  }

  //Del todo

  delTodo = (id) => {

  axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
  .then(res =>  this.setState({todos:[...this.state.todos, res.data]}));
  this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]});
  }

  //Add Todo

  addtodo = (title) => {
    axios.post('http://jsonplaceholder.typicode.com/todos', {
      title,
      completed:false
    })
    .then(res => this.setState({todos:[...this.state.todos, res.data]}));
  }

  render() {
    
    return (
      <Router>
      <div className="App">
      <div className="container">
      <Header />
      <Route exact path="/" render={props => (
     <React.Fragment>
     <Addtodo addtodo={this.addtodo} />
     <Todos todos={this.state.todos} markComplete={this.markComplete}
     delTodo={this.delTodo}/>
        </React.Fragment>
      )} />
      <Route path="/about" component={About} />
     
      </div>
    </div>
    </Router>
    );
  }
}

export default App;
