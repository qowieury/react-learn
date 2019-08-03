import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class TodoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode : false,
      userId : this.props.userId,
      title : this.props.title,
      changedUserId : this.props.userId,
      changedTitle : this.props.title
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userId : nextProps.userId,
      title : nextProps.title,
      changedUserId : nextProps.userId,
      changedTitle : nextProps.title
    })
  }

  toggleEdit() {
    console.log("TodoBox.toggleEdit()")
    this.setState({
      editMode : !this.state.editMode,
      changedUserId : this.state.userId,
      changedTitle : this.state.title
    })
  }

  submitClicked() {
    console.log("TodoBox.submitClicked()")
    let data = {
      "userId" : this.state.changedUserId,
      "title" : this.state.changedTitle
    }

    fetch('https://jsonplaceholder.typicode.com/todos/'+this.props.todoId, {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)

     }).then(response => response.json())
     .then(json => {

       this.setState({
         userId : json.userId,
         title : json.title,
         editMode : false
       });

     })
  }

  deleteClicked() {
    console.log("TodoBox.deleteClicked()")
    fetch('https://jsonplaceholder.typicode.com/todos/'+this.props.todoId, {
      method: 'DELETE'
     }).then(response => {
      if(response.ok){
        this.props.removeTodoFromList(this.props.arrayIndex)
      }
     })

  }

  render() {
    if(!this.state.editMode){
      return(
        <div className="todoBox">
          <p><span>id: </span> <span>{this.props.todoId} </span></p>
          <p><span>userId: </span> <span>{this.state.userId} </span></p>
          <span>Title: </span> <span>{this.state.title} </span>
          <p>
            <button onClick={() => this.toggleEdit()} >edit</button>
            <button onClick={() => this.deleteClicked()}>delete</button>
          </p>
          
        </div>
      );
    }  
    return(
      <div className="todoBox">
        <p><span>userId: </span> <span><input type="number" value={this.state.changedUserId} onChange={(event) => {this.setState({changedUserId : event.target.value})}}/> </span></p>
        <span>Title: </span> <span><input type="text" value={this.state.changedTitle} onChange={(event) => {this.setState({changedTitle : event.target.value})}}/> </span>
        <p>
          <button onClick={() => this.submitClicked()}>submit</button>
          <button onClick={() => this.toggleEdit()}>cancel</button>
        </p>
        
      </div>
    );
  }
}


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList : []

    }
  }

  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => {
        this.setState({
          todoList : json
        })
        
      })
  }

  removeTodoFromList(i) {
    console.log("TodoApp.removeTodoFromList()")
    let list = this.state.todoList;
    list.splice(i,1);
    console.log(list)
    this.setState({
      todoList : list
    })
     
  }

  render() {
    return(
      <div>
        {this.state.todoList.map((todo,i) => {
          return <TodoBox key={i} arrayIndex={i} todoId={todo.id} title={todo.title} userId={todo.userId} removeTodoFromList={this.removeTodoFromList.bind(this)}/>
        })}
      </div>
    );  
  }
  
}
 
 

ReactDOM.render(<TodoApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
