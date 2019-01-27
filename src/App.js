import React, {Component} from 'react';
import './App.css'
import {Button, InputGroup, FormGroup, FormControl} from 'react-bootstrap'
import MapWrapper from "./MapWrapper";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {gmaps: true};
        this.submitSelection = this.submitSelection.bind(this);
        this.alertCorners = this.alertCorners.bind(this);
    }

    render() {
        return (<div className="App container" >

            <form>
                <FormGroup>
                    <InputGroup bsSize="large" >
                        <FormControl  id="search" type="text" placeholder="Search" />
                        <InputGroup.Button >
                            <Button bsStyle="primary" onClick={this.alertCorners} componentClass={InputGroup.Button} id="input-addon">Confirm selection</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>

            <MapWrapper gmaps={this.state.gmaps} submitSelection={this.submitSelection}/>
        </div>)
    }

    alertCorners() {
        alert(this.state.selection.bounds.ga.j)
    }

    submitSelection(selection) {
        console.log("FUCK");
        this.setState({selection: selection});
    }



}

export default App;