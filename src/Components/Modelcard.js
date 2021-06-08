import { Component } from 'react';
import {Card} from 'antd';
import {withRouter} from "react-router-dom";
import ThemeContext from "../context/themeContext";
import "./Modelcard.css";
class Modelcard extends Component{
    static contextType = ThemeContext;
    onClick = () =>{
        console.log("OnClick called",this.props.data);
        this.props.onClick(this.props.data);
    };   
    render(){
        const Data = this.props.data;
        const styles1 = {border:"1px solid #1b2b33",borderRadius:"1em",marginTop:"0px",marginLeft:"0px",marginRight:"0px",color:"#fff",background:"#1b2b33"};
        const styles2 = {borderRadius:"1em",marginTop:"0px",marginLeft:"0px",marginRight:"0px",color:"#1b2b33",background:"#fff"};
        const styles3 ={color:"#fff",background:"#1b2b33"};
        const styles4 ={color:"#1b2b33",background:"#fff"};
        return (<>
                <ThemeContext.Consumer>
                {(themeContext) => (
                 <div className={
                    themeContext.theme === "light" ? "card-container-light" : "card-container-dark"
                  } onClick={this.onClick}>
                <Card className={
                    themeContext.theme === "light" ? "country-container-light" : "country-container-dark"
                  } style={themeContext.theme === "light" ? styles2:styles1} hoverable>
                <div className="country-img">
                    <img src={Data.flag} alt={Data.name} />
                </div>
                <div className={
                    themeContext.theme === "light" ? "country-details-light" : "country-details-dark"
                  }>
                    <h3 style={themeContext.theme === "light" ? styles4:styles3}>{Data.name}</h3>
                    <div className="country-text">
                        <div className="text-title">Population :</div>
                        <div className="text-content">{Data.population}</div>
                    </div>
                    <div className="country-text">
                        <div className="text-title">Region :</div>
                        <div className="text-content">{Data.region}</div>
                    </div>
                    <div className="country-text">
                        <div className="text-title">Capital :</div>
                        <div className="text-content">{Data.capital}</div>
                    </div>
                </div>
            </Card>
            </div>
                )}
            </ThemeContext.Consumer>
        </>);
    }
}

export default withRouter(Modelcard);
