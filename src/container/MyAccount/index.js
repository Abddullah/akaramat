import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Container } from "native-base";
import { Actions } from "react-native-router-flux";
import Account from "../MyAccount/Account";

export default class Browse extends Component {


  render() {
    return (
      <Container style={{ flex: 1 }}>
        <View
          style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
        >
          <Account />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    width: "100%",
    height: "7.5%",
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#BEBCBC",
    justifyContent: "center"
  },
  listText: {
    marginLeft: 10,
    color: "#000"
  }
});
