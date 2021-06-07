import { Component } from 'react';
import {Card} from "react-bootstrap";
import {withRouter} from "react-router-dom";
class Modelcard extends Component{

    onClick = () =>{
        console.log("OnClick called",this.props.data);
        this.props.onClick(this.props.data);
    };   
    render(){
        const Data = this.props.data;
        const styles = {border:"1px solid whitesmoke",borderRadius:"1em",marginTop:"0px",marginLeft:"0px",marginRight:"0px", background:"#1b2b33",
        color:"#fff"};
        const styles2 ={color:"#fff"};
        return (<> 
                 <div className="card-container" onClick={this.onClick}>
                <Card className="country-container" style={styles} hoverable>
                <div className="country-img">
                    <img src={Data.flag} alt={Data.name} />
                </div>
                <div className="country-details">
                    <h3 style={styles2}>{Data.name}</h3>
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
        </>);
    }
}

export default withRouter(Modelcard);
