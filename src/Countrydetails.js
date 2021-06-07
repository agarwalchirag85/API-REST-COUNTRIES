import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';

class Countrydetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.location.state.details;		
	};
	
	getBtn = (country) => {
		return (
			<Button className="border-btn" type="primary" onClick={() => this.props.history.push('/')}>
				{country}
			</Button>
		);
	};

	render() {
	const details = this.state;
		console.log(details, details.name);
		return (
			<>
				<Header history={this.props.history} />
				<div className="country-details-container">
					<div className="back-btn">
						<Button
							type="primary"
							icon={<ArrowLeftOutlined />}
							onClick={() => this.props.history.push('/')}
						>
							Back
						</Button>
					</div>
					<div className="country-details-content">
						<div className="content-img">
							<img src={details.flag} alt={details.name} />
						</div>
						<div className="content-details">
							<h2>{details.name}</h2>

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
									{details.borders.map((country, idx) => this.getBtn(country))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(Countrydetails);
