import React  from 'react';
import { withRouter } from 'react-router-dom';
// import halfmoon from './halfmoon.svg';
// import sunsolid from './sun2.png';
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import './Header.css';
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
			<div className={this.props.theme  === "light" ? "header-light header-mobile" : "header-dark header-mobile"}>
				<div className={this.props.theme  === "light" ? "header-title-light" : "header-title-dark"} onClick={this.root}>
					Where in the world?
				</div>

				{/* <div className="header-action">
					<img className="icon" src = {halfmoon} alt="HalfMoon" />
					<img className="icon" src = {sunsolid} alt="HalfMoon" />
					<div className="header-link">
						Dark Mode
					</div>
				</div> */}
				        <div>
          {this.props.theme === "dark" ? (
            <p
              className="mode-text-dark"
              onClick={() => {
               this.props.onThemeChange("light");
              }}
            >
              <Brightness7Icon
                style={{ fontSize: 18, verticalAlign: "middle" }}
              />{" "}
              Light Mode
            </p>
          ) : (
            <p
              className="mode-text-light"
              onClick={() => {
                this.props.onThemeChange("dark");
              }}
            >
              <Brightness4Icon
                style={{
                  fontSize: 18,
                  verticalAlign: "middle",
                  color: "var(--light-text)",
                }}
              />{" "}
              Dark Mode
            </p>
          )}
        </div>
			</div>
		);
	}
}
export default withRouter(Header);