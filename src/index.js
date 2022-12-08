import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

let key = 4;

function List(props) {
  return (
    <div className="todolist">
      <span>{props.name}</span>
      <button className="button" id={props.id} onClick={props.handleDelete}>
        Delete
      </button>
    </div>
  );
}

function TodoList(props) {
  // let count = 1;
  const arrayOfTodos = props.todos;
  const todos = arrayOfTodos.map((todo) => (
    <List
      name={todo.title}
      key={todo.key}
      id={todo.key}
      handleDelete={props.handleDelete}
    />
  ));

  return <div className="todocontainer">{todos}</div>;
}

function Form(props) {
  return (
    <form id="form" onSubmit={props.handleSubmit}>
      <label id="label">
        Enter todo:
        <br />
        <input
          className="textInput"
          type="text"
          value={props.inputValue}
          onChange={props.onValueChange}
        />
      </label>
      <input className="submitInput" type="submit" value="Submit" />
    </form>
  );
}

class TodoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { title: "wash", key: 1 },
        { title: "cook", key: 2 },
        { title: "movies", key: 3 },
      ],
      inputValue: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
  }

  handleSubmit(e) {
    // console.log("eeee===", e.target[0].value);
    if (e.target[0].value.trim() === "") return;
    this.setState({
      todos: [...this.state.todos, { title: e.target[0].value, key: key++ }],
      inputValue: "",
    });
    e.preventDefault();
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleDeleteButton(e) {
    // console.log(e.target.id);
    // console.log(e);
    let id = e.target.id;
    let filteredTodos = this.state.todos;
    // console.log(filteredTodos);
    filteredTodos = filteredTodos.filter((todo) => {
      return todo.key !== Number(id);
    });

    // console.log(filteredTodos);

    this.setState({
      todos: filteredTodos,
    });
  }

  render() {
    return (
      <div>
        {/* "Hello World" */}
        <Form
          handleSubmit={this.handleSubmit}
          onValueChange={this.handleChange}
          inputValue={this.state.inputValue}
        />
        <TodoList
          todos={this.state.todos}
          handleDelete={this.handleDeleteButton}
        />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TodoTable />);
