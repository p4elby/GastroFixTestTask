import React, { Component } from "react";
import Popup from "reactjs-popup"
import './App.css';
import GetWorkers from './workers/GetWorkers'
import AddWorkers from './workers/AddWorkers'
import GetDiner from './diner/GetDiner'
import AddDiner from './diner/AddDiner'
import DeleteDiner from './diner/DeleteDiner'
export default class App extends Component {
  render() {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>
                        <div style = {{marginLeft: '15%',marginTop: '2%',width: 500}}>
                            <GetWorkers/>
                            <Popup trigger = {<button className = "btn btn-primary" style={{marginLeft: '5%',marginTop: '2%'}}>Add Worker</button>} modal >
                                {close=>(
                                    <div>
                                        <AddWorkers/>
                                        <button style = {{marginLeft: '43%', marginTop: '1%'}} className = "btn btn-danger"  onClick = {close}>Close</button>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </td>
                    <td>
                        <div style = {{marginLeft: '15%', marginTop: '2%',width: 500}}>
                            <GetDiner/>
                            <div  style = {{marginTop :'3%'}}>
                                <Popup trigger = {<button className = "btn btn-primary">Add Transaction</button>} modal >
                                     {close =>(
                                        <div>
                                            <AddDiner/>
                                            <button style = {{marginLeft: '40%', marginTop: '1%'}} className = "btn btn-danger"  onClick = {close}>Close</button>
                                        </div>
                                    )}
                                </Popup>
                                <Popup trigger = {<button className = "btn btn-primary" style = {{marginLeft :'5%'}}>Delete Transaction</button>} modal >
                                    {close =>(
                                        <div>
                                            <DeleteDiner/>
                                            <button style = {{marginLeft: '39%', marginTop: '1%'}} className = "btn btn-danger"  onClick = {close}>Close</button>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
  }
}
