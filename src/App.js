import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component  {
	
	constructor() {
		
		super();
		this.state = {
			data: [],
			updateList: [],
			year: [],
			currentYear: 2006,

		}
	}


    componentDidMount() {
        axios.get(`https://api.spacexdata.com/v3/launches?limit=10`)
		.then(res => {
			const data = res.data;
			this.setState({ data });
			this.setState({ updateList: this.state.data});
		})
    }
	
	filterList = (launch_year) => {
		const { data } = this.state;
        const newList = data.filter(item => item.launch_year == launch_year);
        this.setState({ updateList: newList })
        this.setState({ currentYear: launch_year })
	}
	filterBool = (launch_success) => {
		const { data } = this.state;
        const newList = data.filter(item => item.launch_year == this.state.currentYear && item.launch_success == launch_success);
        this.setState({ updateList: newList})
	}
	

	render(){
		
		
		const newArray = [];
		this.state.data.forEach(yr => {
		  if (!newArray.some(item => item.launch_year === yr.launch_year)) {
			newArray.push({ ...yr})
		  }
		});
		
		return (
		<>
			<header><h1>SpaceX Launch Program</h1></header>
			
			<div className="row">
			
				<div className="filterSection">
				    <h4>Filter</h4>
					<div className="year_filter">
					<p>Launch Year</p>
					{newArray.map((item,index) =>
						<button onClick={() => this.filterList(item.launch_year)} key={index}>{item.launch_year}</button>
					)}
					</div>
					
					<div className="launch_success">
					<p>Successful Launching</p>
					 <button onClick={() => this.filterBool(true)} value="true" >True</button>
					 <button onClick={() => this.filterBool(false)} value="false">False</button>
					 
					</div>
				
					
				</div>
				<div className="contentSection">
					{this.state.updateList.map((data, index) =>
						<div className="container" key={index}>
							<p className="name">{data.mission_name} #{index}</p>
							<img src={data.links.mission_patch} />
							<p className="mission_id">Mission Ids : {Date.now()}</p>
							<p>Launch Year: {data.launch_year}</p>
							<p>Successful Launch : {(data.launch_success).toString()}</p>
							<p>Successful Landing : {(data.land_success)}</p>
						</div>
					)}
				</div>
				
			</div>
			<footer><p><b>Developed By</b> <span>Deepak Bika</span></p></footer>
		</>
	  );
	}
	  
}

export default App;
