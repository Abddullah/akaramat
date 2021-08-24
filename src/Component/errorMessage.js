import React, { Component } from 'react';
import { View, Text, StyleSheet, style } from 'react-native';


class ErrorMessage extends Component {

    render() {
        return (
            <View>
                <Text style={styles.errorStyle}>{this.props.errorMessge}</Text>
            </View>
        );
    }
}

export default ErrorMessage;



const styles = StyleSheet.create({

    errorStyle: {
        color: "red",
        textAlign: "center",
        width: '80%', marginLeft: '10%', marginRight: '10%', 
        top:10

    }


});

