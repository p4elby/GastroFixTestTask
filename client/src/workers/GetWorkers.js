import React from "react";
import axios from 'axios';


export default class GetWorkers extends React.Component{
    state ={
        workers:[{'name':"",'balance':0}],
        firstLoad : 0
    };
    getWorker = () =>{
      axios.get('http://127.0.0.1:5000/methods/workers')
        .then(res =>{
            let workers=res.data;
            this.setState({workers});
        });
    };
    componentDidMount() {
        if (this.state.firstLoad === 0){
            this.getWorker();
            this.setState({firstLoad : 1});
        }
        this.interval = setInterval(() => this.getWorker(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return(
            <table style = {{marginLeft: '5%',marginTop: '2%'}}>
                <thead>
                <tr>
                    <th style = {{border: '1px solid black'}}>Name</th>
                    <th style = {{border: '1px solid black'}}>Balance</th>
                </tr>
                </thead>
                <tbody>
                {this.state.workers.map((worker,index)=>
                    <tr key={index}>
                        <td style = {{border: '1px solid black'}}>{worker.name}</td>
                        <td style = {{border: '1px solid black'}}>{worker.balance}</td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }

}
