this.state = {
todos: [], // The actual todo data
inputVal: "", // New todo input
editingIndex: null, // Which todo is being edited (null = none)
editVal: "", // Temporary value while editing
};

{this.state.editingIndex === index ? (
// Edit mode: show input field + save/cancel buttons
) : (
// Display mode: show text + edit button
)}

State Transitions
The editing flow follows this pattern:

Enter edit mode: Click "Edit" → Store current todo text in editVal, set editingIndex
Modify: Type in input → Update editVal (temporary storage)
Save: Click "Resubmit" → Copy editVal to actual todos array, clear edit state
Cancel: Click "Cancel" → Discard editVal, clear edit state

```js
import { Component } from 'react'

class ClassInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      inputVal: '',
      editingIndex: null,
      editVal: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }))
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.inputVal.trim()) {
      this.setState((state) => ({
        todos: state.todos.concat(state.inputVal),
        inputVal: '',
      }))
    }
  }

  handleEdit(index) {
    this.setState((state) => ({
      ...state,
      editingIndex: index,
      editVal: state.todos[index],
    }))
  }

  handleEditChange(e) {
    this.setState((state) => ({
      ...state,
      editVal: e.target.value,
    }))
  }

  handleEditSubmit(index) {
    if (this.state.editVal.trim()) {
      this.setState((state) => ({
        todos: state.todos.map((todo, i) =>
          i === index ? state.editVal : todo
        ),
        editingIndex: null,
        editVal: '',
      }))
    }
  }

  cancelEdit() {
    this.setState((state) => ({
      ...state,
      editingIndex: null,
      editVal: '',
    }))
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='task-entry'>Enter a task: </label>
          <input
            type='text'
            id='task-entry'
            name='task-entry'
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type='submit'>Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={`${todo}-${index}`}>
              {this.state.editingIndex === index ? (
                <div>
                  <input
                    type='text'
                    value={this.state.editVal}
                    onChange={this.handleEditChange}
                  />
                  <button onClick={() => this.handleEditSubmit(index)}>
                    Resubmit
                  </button>
                  <button onClick={this.cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span>{todo}</span>
                  <button onClick={() => this.handleEdit(index)}>Edit</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

export default ClassInput
```
