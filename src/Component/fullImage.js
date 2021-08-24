import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";


class FullImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount() {
        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
            screenWidth: width,
        })
    }

    render() {
        console.log(this.props.DataOfTasker,"DataOfTaskesssr")
        return (
            <View style={{
                flex: 1,
                backgroundColor: "black",
            
            }}>
               
                    <Image
                        style={{  flex: 1,
                            resizeMode: 'contain', }}
                        source={{ uri: this.props.DataOfTasker }}
                    />

                

            </View >
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
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(FullImage);

const styles = StyleSheet.create({

});  
