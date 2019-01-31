import React from 'react';
import axios from 'axios';


export default class AddDiner  extends React.Component{
    state={
        title:"",
        date:"",
        details:[{worker:{name:""},given:0.0,get:0.0}],
    };
    onChangeTitle = event =>{
        this.setState({title : event.target.value})
    };
    onChangeDate = event =>{
        this.setState({date:event.target.value})
    };
    handleChange = event =>{
        let details = [...this.state.details];
        if (isNaN(event.target.value) || event.target.value === ""){
            details[event.target.dataset.id][event.target.className] = (0.0).toString();
        }else{
            details[event.target.dataset.id][event.target.className] = event.target.value;
        }
        this.setState({ details });
    };
    onNameChange = event =>{
        let details = [...this.state.details];
        details[event.target.dataset.id][event.target.className].name = event.target.value;
        this.setState({ details });
    };
    onSubmit = event => {
        event.preventDefault();
        let currentCheck = 0.0;
        let currentCheckAfterRound = 0.0;
        let currentBalance = 0.0;
        let nameWorkerState = 0;
        const diner = {
            title: this.state.title,
            date: new Date(this.state.date).getTime(),
            details: this.state.details
        };
        diner.details.map((detail) => {
            currentCheck += parseFloat(detail.given)+(parseFloat(detail.get)*(-1));
            currentBalance += parseFloat(detail.given)+parseFloat(detail.get);
            detail.given = (parseFloat(detail.given)).toFixed(1);
            detail.get = (parseFloat(detail.get)).toFixed(1);
            currentCheckAfterRound += parseFloat(detail.given)+(parseFloat(detail.get)*(-1));
            if (detail.worker.name === ""){
                nameWorkerState = 1;
                return(
                    alert("Worker Name is Null")
                )
            }
            return(0)
        });
        let difference =currentCheck - currentCheckAfterRound;
        if (difference !== 0.0){
             diner.details[0].given=(parseFloat(diner.details[0].given)+0.1).toString();
             diner.details[0].get=(parseFloat(diner.details[0].get)-0.1).toString();
        }
        if (currentBalance !== 0.0 || isNaN(currentBalance)) {
            return (
                alert("Error!Check amount is not 0!")
            )
        } else {
            if (diner.title === "") {
                return (
                    alert("Error! Title is Null!")
                )
            } else {
                if (isNaN(diner.date)) {
                    return(
                        alert("Error! Date is Null!")
                    )
                }else {
                    if (nameWorkerState === 0){
                        axios.post('http://127.0.0.1:5000/methods/diner',{title : diner.title,date: diner.date,details:diner.details}).then(res=>{
                            alert("Transaction Add");
                            console.log(res);
                        })
                    }else{
                        return(
                            alert("Check Worker Name")
                        )
                    }

                }
            }
        }
    };
    addWorker = event =>{
        event.preventDefault();
        this.setState((prevState) =>({
            details:[...prevState.details,{'worker':{'name':''},'given':0.0,'get':0.0}]
        }))
    };
    render() {
        let detail = this.state.details;
        return(
            <div>
                <form>
                    <label>Add Transaction</label>
                    <div>
                        <div>
                            <label> Title
                                <input type = "text"
                                       className = "form-control"
                                       autoComplete = "off"
                                       onChange = {this.onChangeTitle}/>
                            </label>
                            <label>Date
                                <input type = "date"
                                       className = "form-control"
                                       autoComplete = "off"
                                       onChange = {this.onChangeDate}/>
                            </label>
                            <button onClick = {this.addWorker}>Add new Worker to Transaction</button>
                            {
                                detail.map((val,index) =>
                                    {
                                        let workerId = `worker-${index}`,getId=`get-${index}`,givenId=`given-${index}`;
                                        return(
                                            <div key = {index}>
                                                <label>{`Worker ${index+1} : `}</label><br/>
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <th>
                                                            <span>Name : </span>
                                                            <input type = "text"
                                                                   name = {workerId}
                                                                   data-id = {index}
                                                                   autoComplete = "off"
                                                                   id = {workerId}
                                                                   onChange = {this.onNameChange}
                                                                   value = {this.state.value}
                                                                   className = "worker"/>
                                                        </th>
                                                        <th>
                                                            <span>Given : </span>
                                                            <input type = "text"
                                                                   name = {givenId}
                                                                   data-id = {index}
                                                                   id = {givenId}
                                                                   autoComplete = "off"
                                                                   onChange = {this.handleChange}
                                                                   value = {this.state.value}
                                                                   className = "given"/>
                                                        </th>
                                                        <th>
                                                            <span>Get  :({"<0"}) </span>
                                                            <input type = "text"
                                                                   name = {getId}
                                                                   data-id = {index}
                                                                   id = {getId}
                                                                   autoComplete = "off"
                                                                   onChange = {this.handleChange}
                                                                   value = {this.state.value}
                                                                   className = "get"/>
                                                        </th>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        )
                                    }
                                    )
                            }
                        </div>
                    </div>
                    <button style = {{marginLeft: '40%',marginTop: '2%'}} type = "submit" className = "btn btn-primary" onClick = {this.onSubmit}>
                        Add
                    </button>
                </form>
            </div>
        )
    }
}