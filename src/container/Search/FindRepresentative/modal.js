import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
  Left,
  Right,
  Text,
  Radio,
  Button
} from "native-base";
import { connect } from "react-redux";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

export default class Modal extends Component {
  render() {
    return (
      <View>
        <Text>My Account!!</Text>
      </View>
    );
  }
}
