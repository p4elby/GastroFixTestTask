import React from 'react';
import axios from 'axios';


export default class DeleteDiner extends React.Component{
    state={
        title:"",
        date:"",
        id:""
    }
    onChangeId = event =>{
        this.setState({id:event.target.value})
    }
    onSubmit = event =>{
        event.preventDefault();
        const dinerId ={
            id:this.state.id
        }
        axios.delete(`http://127.0.0.1:5000/methods/diner/${dinerId.id}`)
             .then(res =>
             {
                alert("Transaction deleted")
                 console.log(res)
             })
    }
    render() {
    return (
         <div style = {{marginLeft: '30%'}}>
             <form onSubmit = {this.onSubmit}>
                 <label style = {{marginLeft: '10%'}}><b>Delete Transaction</b></label>
                 <div>
                     <div>
                         <label><b>Id transaction : </b>
                             <input type = "text"
                                    className = "form-control"
                                    onChange = {this.onChangeId}/>
                         </label>
                     </div>
                 </div>
                 <button style = {{marginLeft : '12%'}} type = "submit" className = "btn btn-primary" onClick = {this.onSubmit}>
                     Delete
                 </button>
             </form>
         </div>
    )}


}