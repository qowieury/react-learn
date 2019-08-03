import React from 'react';
import './index.css';
import TodoBox from './TodoBox';
import { connect } from 'react-redux'

class TodoApp extends React.Component {

  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => {
        this.props.load_todo(json);
        
      })
  }

  render() {
    return(
      <div>
        {this.props.todoList.map((todo,i) => {
          return <TodoBox key={i} arrayIndex={i} todoId={todo.id} title={todo.title} userId={todo.userId} />
        })}
      </div>
    );  
  }
  
}

const mapStateToProps = state => ({
  todoList: state.todoList
});

const mapDispatchToProps = dispatch => ({
  load_todo: (data) => dispatch({type: 'LOAD_TODO', data: data})
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);