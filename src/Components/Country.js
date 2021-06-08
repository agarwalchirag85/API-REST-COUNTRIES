import React ,{Component}from 'react';
import Modelcard from "./Modelcard";
import { debounce } from "lodash";
import {Menu, Dropdown, Button,Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from 'react-router-dom';
import Header from './Header';
import "./Country.css";
import ThemeContext from "../context/themeContext";
class Country extends Component{
  static contextType = ThemeContext;
    constructor(props)
    {
        super(props);
        this.state={
            allcountrylist:[],
            searchstring:"",
            visiblesearch:false,
            allsearchlist:[],
            allregionlist:[],
            currentregion:"",
        }

    };
    componentDidMount = async() => {
         await this.performApicall();
    };

    performApicall=async()=>
    {
        let response=await fetch('https://restcountries.eu/rest/v2/all');
        response = await response.json();
        this.setState({allcountrylist:response});
    }

    performApicallsearch=async()=>
    {
        console.log(this.state.searchstring);
        let response=await fetch('https://restcountries.eu/rest/v2/name/'+this.state.searchstring);
        response = await response.json();
        this.setState({allsearchlist:response});
    }

    handleCountryCardClick = (country) => {
		console.log("ProjectViews onClick called",this.props);
		this.props.history.push({
			pathname: '/Countrydetails',
			state: { details: country }
		  });
	};

    getDashboard = (data,key) => {
        return (
                <Modelcard data={data} onClick={this.handleCountryCardClick} key={key} />
  
            );
      };

    handleChange=debounce((text) => {
        this.setState({searchstring:text,visiblesearch:true});
        this.performApicallsearch();
      }, 300);

    handleSubmit=(event)=>{
        event.preventDefault();
    }

    handleClick = async(e) => {
        console.log('click', e.key);
        this.setState({current:e.key});
        let response=await fetch('https://restcountries.eu/rest/v2/region/'+e.key).then((data) => data.json());
        this.setState({allregionlist:response});
      };
      
  
    render()
    {
      const styles3 ={color:"#fff",background:"#1b2b33"};
      const styles4 ={color:"#1b2b33",background:"#fff"};
      const menu = ( <Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal" className="dropdown">
      <Menu.Item key="africa" >Africa</Menu.Item>
      <Menu.Item key="americas">Americas</Menu.Item>
      <Menu.Item key="asia" >Asia</Menu.Item>
      <Menu.Item key="europe" >Europe</Menu.Item>
      <Menu.Item key="oceania" >oceania</Menu.Item>
      </Menu>);
        
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
          <div className={themeContext.theme  === "light" ? "view-container-light" : "view-container-dark"}>
					<div className="search-container mobile">
        <div className={themeContext.theme  === "light" ? "search-light" : "search-dark"}>
        <SearchIcon
          style={{
            color: themeContext.theme  === "light" ? "var(--light-text)" : "hsl(0, 0%, 100%)",
            margin: "0 10px",
          }}
        />
          <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={(event) =>this.handleChange(event.target.value)}
          style={themeContext.theme === "light" ? styles4:styles3}
        />
        </form>
      </div>
            <div className="dropdowndiv" >
						<Dropdown classname="dropdown" overlay={menu} 
          style={themeContext.theme === "light" ? styles4:styles3}
          >
							<Button  style={themeContext.theme === "light" ? styles4:styles3}>
								Filter by Region <DownOutlined />
							</Button>
						</Dropdown>
						</div>
          </div>
          <Row>
            {console.log(this.props.theme)}
						<Col gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  className={themeContext.theme  === "light" ? "contry-container-light" : "contry-container-dark"}>
							<div>
								<Row justify="center">
            {this.state.visiblesearch? (
              this.state.allsearchlist.map((data,key) => this.getDashboard(data,key))):( this.state.current ? (
              this.state.allregionlist.map((data,key) => this.getDashboard(data,key))):(
            this.state.allcountrylist.map((data,key) => this.getDashboard(data,key))))}
            </Row>
            </div>
            </Col>
            </Row>
        </div>
        </div>
            )}
        </ThemeContext.Consumer>
        </>
    );
    }
}

export default withRouter(Country);