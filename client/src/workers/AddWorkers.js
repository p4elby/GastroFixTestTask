import React from 'react';
import axios from 'axios';


export default class AddWorkers extends React.Component{
    state={
        name:""
    }
    onNameChange = event =>{
        this.setState({name : event.target.value})
    }
    onSubmit = event =>{
        event.preventDefault();
        const worker ={
            name : this.state.name
        };
        if (worker.name === ""){
            alert("Error! Name is Null")
        }else{
            axios.post('http://127.0.0.1:5000/methods/workers',{name: worker.name})
            .then(res=>
            {
                alert("Worker Add")
                console.log(res)
            })
        }
    }
    render() {
        return(
            <div>
                <form style = {{marginLeft: '25%'}}>
                    <div >
                        <label style = {{marginLeft: '15%'}}><b>Add Worker</b></label>
                        <div style = {{marginLeft: '15%'}}>
                            <div>
                                <label><b>Name : </b>
                                    <input type = "text"
                                           className = "form-control"
                                           autoComplete = "off"
                                           onChange = {this.onNameChange}/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button  style = {{marginLeft: '25% '}} type = "submit" className = "btn btn-primary" onClick = {this.onSubmit}>
                        Add
                    </button>
                </form>
            </div>
        )
    }
}