import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,Dropdown,
    Tab,Label,Input,Dimmer,Loader
} from 'semantic-ui-react'

import ClassifiedTile from './ClassifiedTile'
//import data from './data'
import axios from 'axios'
export default class Classifieds extends Component {
   constructor(props){
       super(props);
       this.state = {
           activeItem:"all",
           data:[],
           action:"loader",
           res:[]
       }
       this.handleItemClick = this.handleItemClick.bind(this);
   }
   componentWillMount(){
       this.renderTiles();
   }
   renderTiles(){
        var update = this.setState.bind(this)  
        axios.get('/get-classifieds')
        .then(function (response) {
        update({data:response.data.data,action:"normal",rsp:response.data.data})
        })
        .catch(function (error) {
        console.log(error);
        });

   }
   handleItemClick(e, { name }) {
    var newData;   
    if(name == "all"){
        this.setState({action:"loader"}) 
        this.renderTiles();
    }
    else if(name == "add"){
         newData =this.state.rsp.filter(e => e.ntId === "npsaa" )         
    }
    else   
      newData = this.state.rsp.filter(e => e.category.toLowerCase() == name)
       //console.log(newData)
       this.setState({ activeItem: name,
                             data:newData
                             })
      }
    render() {
        //var activeItem = this.state.activeItem;
        var {action,activeItem} = this.state
        return (
            <div>
                <Segment style={{ padding: '6em 0em' }} vertical>
                    <Grid container stackable verticalAlign='top'>
                    <Grid.Row id="clasifiedTile">
                      <Grid.Column width={4}>
                      <Menu pointing secondary vertical>
                        <Menu.Item>
                        Home

                        <Menu.Menu>
                        <Menu.Item name='all' active={activeItem === 'all'} onClick={this.handleItemClick}>
                            All Listing
                        </Menu.Item>
                            <Menu.Item name='add' active={activeItem === 'add'} onClick={this.handleItemClick}>
                            My Listing
                            </Menu.Item>
                        </Menu.Menu>
                        </Menu.Item>
                          <Menu.Item name='cars' active={activeItem === 'cars'} onClick={this.handleItemClick}>
                        <Icon name='car' />
                        Cars
                        </Menu.Item>
                        <Menu.Item name='bikes' active={activeItem === 'bikes'} onClick={this.handleItemClick}>
                        <Icon name='bicycle' />
                        Bikes
                        </Menu.Item>
                        <Menu.Item name='electronics' active={activeItem === 'electronics'} onClick={this.handleItemClick}>
                        <Icon name='mobile' />
                        Electronics
                        </Menu.Item>
                        <Menu.Item name='homeappliances' active={activeItem === 'homeappliances'} onClick={this.handleItemClick}>
                        <Icon name='tv' />
                        Home Appliances
                        </Menu.Item>
                        <Menu.Item name='realestate' active={activeItem === 'realestate'} onClick={this.handleItemClick}>
                        <Icon name='home' />
                         Real Estate
                        </Menu.Item>

                        <Menu.Item name='books' active={activeItem === 'books'} onClick={this.handleItemClick}>
                        <Icon name='book' />
                         Books
                        </Menu.Item>

                    </Menu>
                 </Grid.Column>
                 <Grid.Column width={12}>
                 {(action == "loader")?<Dimmer active inverted>
                                     <Loader inverted inline='centered'  size='large'>Fetching Listing...</Loader>
                                   </Dimmer>:
                <ClassifiedTile data={this.state.data}/>
                }
                 </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>
        )
    }
}