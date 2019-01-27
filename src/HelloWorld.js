import React, { Component } from 'react';
import './HelloWorld.css'

class HelloWorld extends Component {

    constructor(props) {
        super(props);
        this.state = { greeting: props.greeting, name: props.name };
        this.frenchify = this.frenchify.bind(this)
    }

    render() {
        return <div className="HelloWorld">{this.state.greeting} {this.state.name}<br/>
        <button className="btn btn-primary" onClick={this.frenchify}>Frenchify!</button></div>
    }

    frenchify() {
        this.setState({greeting: 'Bonjour'});
    }
}

export default HelloWorld;