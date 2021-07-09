import React,{Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

const name = window.location.pathname
export default class Subcategory extends Component {
    constructor(props){
        super(props)

        this.state =  {
            task:"",
        postedTasks:[],
        refresh:""
    }}


    componentDidMount(){
        axios.get("http://localhost:5000"+ name).then((response) => {
            response.data.map((element) => {
                return (
                    this.state.postedTasks.push(element.task) 
                )
            })
            this.setState({
                refresh:"",
             })
        })

    }

    taskList(){
            return this.state.postedTasks.map((currentTask, index) => {
                return(
                    <p key={index}> 
                    <input type="checkbox"/>
                        {currentTask}
                    </p>
                )
            })
                
    }

    render(){
        return(
            <div className="App">        
            <header className="App-header">
          <h1> {name.slice(3,name.length)}</h1>
        </header>
 
        <div className="tasks">{this.taskList()}</div>
        </div>
        )
    }
}