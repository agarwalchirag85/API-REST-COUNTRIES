import React ,{Component}from 'react';
import Modelcard from "./Modelcard";
import { debounce } from "lodash";
import { Input, Menu, Dropdown, Button,Row, Col } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import "./Country.css";
class Country extends Component{

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
      }, 500);

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
      const menu = (<Menu onClick={this.handleClick} selectedKeys={this.state.current} mode="horizontal" className="dropdown">
      <Menu.Item key="africa">Africa</Menu.Item>
      <Menu.Item key="americas">Americas</Menu.Item>
      <Menu.Item key="asia">Asia</Menu.Item>
      <Menu.Item key="europe">Europe</Menu.Item>
      <Menu.Item key="oceania">Oceania</Menu.Item>
      </Menu>);

        return (
        <>
            <Header  history={this.props.history}/>
            <div className="view-container view-container-mobile">
					<div className="search-container mobile">
						<div className="searchdiv">
             <form onSubmit={this.handleSubmit}>
            <Input size="large" placeholder="search with country name" prefix={<SearchOutlined /> } onChange={e => this.handleChange(e.target.value)} className="searchbar"/>
            </form>
            </div>
            <div className="dropdowndiv">
						<Dropdown classname="dropdown" overlay={menu}>
							<Button>
								Filter by Region <DownOutlined />
							</Button>
						</Dropdown>
						</div>
          </div>
          <Row>
						<Col gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="contry-container">
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
        </>
    );
    }
}

export default withRouter(Country);