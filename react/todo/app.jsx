var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      tasks: [],
      increment: 0
    };
  },
  addTask: function(value) {
    var tasks = this.state.tasks;
    tasks.unshift({ id: this.state.increment + 1, value: value });
    this.setState({ tasks: tasks, increment: this.state.increment + 1 });
  },
  render: function() {
    return (
      <div>
        <TodoForm addTask={this.addTask} />
        <TodoList tasks={this.state.tasks} />
      </div>
    );
  }
});

var TodoForm = React.createClass({
  propTypes: {
    addTask: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return { value: '' };
  },
  onClick: function(e) {
    e.preventDefault();
    this.props.addTask(e.target.task.value);
    this.setState({ value: '' });
  },
  onChange: function(e) {
    this.setState({ value: e.target.value });
  },
  render: function() {
    return (
      <form onSubmit={this.onClick}>
        <input name="task" type="text" value={this.state.value} onChange={this.onChange} />
      </form>
    );
  }
});

var TodoList = React.createClass({
  propTypes: {
    tasks: React.PropTypes.array.isRequired
  },
  render: function() {
    var tasks = this.props.tasks.map(function(task) {
      return <Task key={task.id} value={task.value} />
    });
    return (
      <div>
        {tasks}
      </div>
    );
  }
});

var Task = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return { value: '' };
  },
  render: function() {
    return (
      <p>{this.props.value}</p>
    )
  }
});

React.render(
  <TodoApp />,
  document.getElementById('container')
);
