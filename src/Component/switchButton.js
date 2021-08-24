
import React, { Component } from 'react';
import { Switch } from 'react-native';
import { connect, } from "react-redux";


class SwitchButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price: this.props.selected === true ? true : false,
        }
    }


    componentWillReceiveProps(props) {
        const { selected } = props

        if (selected) {
            this.setState({
                price: true
            })
        }
    }

    switchButton = () => {
        // if (this.props.selected === true || this.props.selected === false) {

        //     this.setState({ selected: !this.state.selected })
        //     this.props.getData(this.state.selected, this.props.name)

        // } else {

        this.setState({ price: !this.state.price })
        this.props.getData(this.state.price, this.props.name)

        // }
    }
    render() {
        return (
            // this.state.selected === true || this.state.selected === false ?
            // <Switch value={this.state.selected} onValueChange={this.switchButton} />
            // :
            <Switch value={this.state.price} onValueChange={this.switchButton} />
        );
    }
}


let mapStateToProps = state => {
    return {
        str: state.root.str
    };
};
function mapDispatchToProps(dispatch) {
    return ({

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SwitchButton);

