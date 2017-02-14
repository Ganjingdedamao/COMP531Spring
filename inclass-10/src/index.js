//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }

    render() { return (
        <div>
            <li>
                <i className="check glyphicon glyphicon-check" onClick={() => { this.setState({done: !this.state.done})}}></i>
                <span className={this.state.done ? "completed" : ""}>{this.props.text}</span>
                <i className= "destroy glyphicon glyphicon-remove" onClick={() => {this.props.remove()}}></i>
            </li>
        </div>
        /*h("li", { id: `task${_taskId++}`}, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        ])*/
        
    )}
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
    }

    addTodo() {
        const text = document.getElementById("newTODO").value
        
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text}
            ]
        })
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })      
    }

    render() { return (
        <div>
            
            <input id="newTODO" type="text" placeholder="To Do"/>
            <button onClick={()=>this.addTodo()}>Add Item</button>
            <span className="submit">
                <a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
            </span> 
            <ul className="todo">       
                {this.state.todoItems.map((x,i) => <ToDoItem key={this.state.todoItems[i].id} text={this.state.todoItems[i].text} remove={() => this.removeTodo(this.state.todoItems[i].id) }/>)}
                
            </ul>
            
        </div>
        
        //h("div", { },
        //    h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),//<ToDoItem key="1" text="Test Item" remove={() => this.removeTodo(1) } />
        //    h("button", { onClick: addItem }, "Add Item"),
        //    h("span", { className: "submit" }, [
         //       h("a", { href: "https://webdev-rice.herokuapp.com",
         //            target: "_blank" }, "Submit your exercise"),
         //   ]),
         //   h("ul", { className: "todo" }, listItems)*/
        )
        
    }
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()