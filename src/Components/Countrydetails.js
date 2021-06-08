import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import ThemeContext from "../context/themeContext";
import './Countrydetails.css';

class Countrydetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {states:this.props.location.state.details, countrylist: []};		
				
	};

	componentDidMount = async() => {
		await this.performApicallcountryname();
   };

	performApicallcountryname=async()=>
    {
		let arr=[];let temp=[];
        this.state.states.borders.map((country, idx) => arr.push(country));
		for(let i=0;i<arr.length;i++){
        let response=await fetch('https://restcountries.eu/rest/v2/alpha/'+arr[i]);
        response = await response.json();
		temp.push(response.name);
		}
		console.log(temp);
		this.setState({countrylist:temp});
    }

	getBtn = (country,idx) => {
		const styles3 ={color:"#fff",background:"#1b2b33"};
        const styles4 ={color:"#1b2b33",background:"#fff"};
		return (
			<ThemeContext.Consumer>
			{(themeContext) => (	
			<Button className={
				themeContext.theme === "light" ? "border-btn-light" : "border-btn-dark"
			  } type="primary" onClick={() => this.props.history.push('/')} style={themeContext.theme === "light" ? styles4:styles3} >
				{this.state.countrylist[idx]}
			</Button>
			)}
			</ThemeContext.Consumer>
		);
	};

	render() {
	    const details = this.state.states;
		const styles3 ={color:"#fff",background:"#1b2b33"};
        const styles4 ={color:"#1b2b33",background:"#fff"};
		console.log(details, details.name);
		return (
			<>
			<ThemeContext.Consumer>
			{(themeContext) => (
             <div
             className={
               themeContext.theme === "light" ? "main-light" : "main-dark"
             }
           >
            <Header  history={this.props.history} theme={themeContext.theme}
              onThemeChange={themeContext.onThemeChange} />
				<div  className={
               themeContext.theme === "light" ? "country-details-container-light" : "country-details-container-dark"
             }>
					<div className="back-btn">
						<Button
							type="primary"
							icon={<ArrowLeftOutlined />}
							onClick={() => this.props.history.push('/')}
							style={themeContext.theme === "light" ? styles4:styles3}
						>
							Back
						</Button>
					</div>
					<div  className={
               themeContext.theme === "light" ? "country-details-content-light" : "country-details-content-dark"
             }>
						<div className="content-img">
							<img src={details.flag} alt={details.name} />
						</div>
						<div className="content-details">
							<h2 style={themeContext.theme === "light" ? styles4:styles3}>{details.name}</h2>

							<div className="text-desc">
								<div className="textLeft">
									<div className="country-text">
										<div className="text-title">Native Name :</div>
										<div className="text-content">{details.nativeName}</div>
									</div>

									<div className="country-text">
										<div className="text-title">Population :</div>
										<div className="text-content">{details.population}</div>
									</div>

									<div className="country-text">
										<div className="text-title">Region :</div>
										<div className="text-content">{details.region}</div>
									</div>

									<div className="country-text">
										<div className="text-title">Sub Region :</div>
										<div className="text-content">{details.subregion}</div>
									</div>

									<div className="country-text">
										<div className="text-title">Capital :</div>
										<div className="text-content">{details.capital}</div>
									</div>
								</div>

								<div className="textRight">
									<div className="country-text">
										<div className="text-title">Top Level Domain :</div>
										{details.topLevelDomain.map((tld, idx) => (
											<div className="text-content">{tld}</div>
										))}
									</div>

									<div className="country-text">
										<div className="text-title">Currencies :</div>
										<div className="text-content">{details.currencies[0].name}</div>
									</div>

									<div className="country-text">
										<div className="text-title">Languages :</div>
										{details.languages.map((lag, idx) => (
											<div className="text-content">{lag.name}</div>
										))}
									</div>
								</div>
							</div>

							<div className="country-text">
								<div className="text-title">Border Countries :</div>
								<div className="border-country-btn">
									{details.borders.map((country, idx) =>this.getBtn(country,idx))}
								</div>
							</div>
						</div>
					</div>
				</div>
				</div>
			)}
			</ThemeContext.Consumer>
			</>
		)}
}

export default withRouter(Countrydetails);
