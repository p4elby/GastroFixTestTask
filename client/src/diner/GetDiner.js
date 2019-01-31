import React from "react";
import axios from 'axios';
import moment from "moment";


export default class GetDiner extends React.Component{
    state={
        dinerLoc : [],
        firstLoad : 0
    };
    getDinerLoc = () =>{
        axios.get('http://127.0.0.1:5000/methods/diner')
            .then(res=>{
                let dinerLoc=res.data;
            this.setState({dinerLoc});
        });
    };
    componentDidMount() {
        if (this.state.firstLoad === 0){
            this.getDinerLoc();
            this.setState({firstLoad: 1})
        }
        this.interval = setInterval(() => this.getDinerLoc(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
              return(
                  <div>{
                      this.state.dinerLoc.map((diner,index) =>
                          <table key = {index} style = {{marginTop: '5%'}}>
                              <thead>
                              <tr>
                                  <th>{moment(diner.date).format('LL')}</th>
                                  <th>{diner.title}</th>
                              </tr>
                              <tr>
                                  <th>Id : {diner._id}</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <th  style = {{border: '1px solid black'}}>Name</th>
                                  <th  style = {{border: '1px solid black'}}>Given</th>
                                  <th  style = {{border: '1px solid black'}}>Get</th>
                              </tr>
                              {diner.details.map((detail,index)=>
                                  <tr key = {index}>
                                      <td className = "text-left" style = {{border: '1px solid black'}}>{detail.worker.name}</td>
                                      <td className = "text-left" style = {{border: '1px solid black'}}>{detail.given}</td>
                                      <td className = "text-left" style = {{border: '1px solid black'}}>{detail.get}</td>
                                  </tr>
                              )}
                               </tbody>
                          </table>
                      )
                  }
                  </div>
              )
    }

}