import React  from 'react';
import { withRouter } from 'react-router-dom';
import halfmoon from './halfmoon.svg';
import sunsolid from './sun2.png';
class Header extends React.Component {
	constructor(props){
		super(props);
		this.state={
			darkmode:false,
		}
	};
	root = () => {
		this.props.history.push("/");
	  };
	render() {
        
		return (
			<div className="header header-mobile">
				<div className="header-title" onClick={this.root}>
					Where in the world?
				</div>

				<div className="header-action">
					<img className="icon" src = {halfmoon} alt="HalfMoon" />
					<img className="icon" src = {sunsolid} alt="HalfMoon" />
					<div className="header-link">
						Dark Mode
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(Header);