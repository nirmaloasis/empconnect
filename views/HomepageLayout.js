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
    Visibility,Dropdown
} from 'semantic-ui-react'

export default class HomepageLayout extends Component {
    state = {activeItem : 'Home', selectedLocation : 'Bangalore'}

    componentDidMount(){
        function displayLocation(latitude,longitude){
            var request = new XMLHttpRequest();

            var method = 'GET';
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
            var async = true;

            request.open(method, url, async);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var data = JSON.parse(request.responseText);
                    alert(request.responseText); // check under which type your city is stored, later comment this line
                    var addressComponents = data.results[0].address_components;
                    for(var i=0;i<addressComponents.length;i++){
                        var types = addressComponents[i].types
                        //alert(types);
                        if(types=="locality,political"){
                            alert(addressComponents[i].long_name); // this should be your city, depending on where you are
                        }
                    }
                    //alert(address.city.short_name);
                }
            };
            request.send();
        };

        var successCallback = function(position){
            var x = position.coords.latitude;
            var y = position.coords.longitude;
            displayLocation(x,y);
        };


        navigator.geolocation.getCurrentPosition(successCallback);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    handleLocationChange = (e) => this.setState({ selectedLocation: e.target.value })
    render() {
        const { activeItem, selectedLocation } = this.state
        return (
            <div>
                    <Segment
                        inverted
                        textAlign='center'
                        vertical
                    >
                            <Menu fixed="top" inverted compact size='large'>
                                <Container>
                                    <Menu.Item><span style={{fontSize: '20px', fontWeight: 'bold'}}>Employee Connect</span></Menu.Item>
                                    <Menu.Item as='a' name="Home" onClick={this.handleItemClick} active={activeItem === 'Home'}>Home</Menu.Item>
                                    <Menu.Item as='a' name="Classifieds" onClick={this.handleItemClick}  active={activeItem === 'Classifieds'}>Classifieds</Menu.Item>
                                    <Menu.Item as='a' name="Events" onClick={this.handleItemClick} active={activeItem === 'Events'}>Events</Menu.Item>
                                    <Menu.Item as='a' name="Achievements" onClick={this.handleItemClick} active={activeItem === 'Achievements'}>Achievements</Menu.Item>
                                    <Menu.Item position='right'>
                                        <Menu.Item>Welcome User</Menu.Item>
                                        <Dropdown
                                            button
                                            className='icon'
                                            floating
                                            labeled
                                            icon='world'
                                            options={[{ key: 'Bangalore', text: 'Bangalore', value: 'Bangalore' },{ key: 'Pune', text: 'Pune', value: 'Pune' }]}
                                            text={selectedLocation}
                                            placeholder="Select Location"
                                            onChange={this.handleLocationChange}
                                        />
                                    </Menu.Item>
                                </Container>
                            </Menu>
                    </Segment>
                

                <Segment style={{ padding: '50em' }} vertical>
                    Hi
                </Segment>
                <Segment inverted vertical style={{ padding: '5em 0em' }}>
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='About' />
                                    <List link inverted>
                                        <List.Item as='a'>Sitemap</List.Item>
                                        <List.Item as='a'>Contact Us</List.Item>
                                        <List.Item as='a'>Religious Ceremonies</List.Item>
                                        <List.Item as='a'>Gazebo Plans</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='Services' />
                                    <List link inverted>
                                        <List.Item as='a'>Banana Pre-Order</List.Item>
                                        <List.Item as='a'>DNA FAQ</List.Item>
                                        <List.Item as='a'>How To Access</List.Item>
                                        <List.Item as='a'>Favorite X-Men</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Header as='h4' inverted>Footer Header</Header>
                                    <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            </div>
        )
    }
}