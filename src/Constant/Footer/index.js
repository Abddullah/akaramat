import React, { Component } from "react";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

import { Actions } from "react-native-router-flux";
import { changeRoute } from "../Helper/index";
import TopHeader from "../Header";

export default class FooterTabs extends Component {
  constructor() {
    super();
    this.state = {
      selectedNav: "Demo4"
    };
  }


  Change = (myRoute, screenName) => {
    const { changeRender } = this.props;
    changeRender(myRoute);
    this.setState({
      selectedNav: screenName
    });
  };

  renderImage() {
    return (
      <View style={{ position: "absolute", bottom: 30, left: "42%" }}>
        <Button transparent onPress={() => this.Change("react")}>
          <Image
            source={require("../../assets/Images/add.png")}
            style={[styles.inner]}
          />
        </Button>
      </View>
    );
  }

  render() {
    return [
      <Container style={[styles.container]}>
        <Content />
        <Footer style={{ borderTopWidth: 2, borderTopColor: "#f7c3ad" }}>
          <FooterTab
            style={{
              borderTopWidth: 2,
              borderTopColor: "#f94c02",
              backgroundColor: "white"
            }}
          >
            <View style={{ borderTopWidth: 2, borderTopColor: "black" }} />

            <Button vertical onPress={() => this.Change( "account")}>
              <Image
                source={require("../../assets/Images/user.png")}
                style={[
                  styles.img,
                  this.state.selectedNav === "account" && styles.currentScreen
                ]}
              />
              <Text style={styles.icon}>My Account</Text>
            </Button>

            <Button vertical onPress={() => this.Change("react")}>
              <Image
                source={require("../../assets/Images/commentary.png")}
                style={
                  this.state.selectedNav === "react" && styles.currentScreen
                }
              />
              <Text style={styles.icon}>React</Text>
            </Button>

            <Button vertical>
              <Text
                style={{
                  fontSize: 10,
                  prosition: "relative",
                  bottom: 1,
                  top: 9,
                  color: "brown"
                }}
              >
                Add
              </Text>
            </Button>

            <Button
              vertical
              active={false}
              onPress={() => this.Change("Find", "findRepresentative")}
            >
              <Image
                source={require("../../assets/Images/search.png")}
                style={
                  this.state.selectedNav === "find" && styles.currentScreen
                }
              />
              <Text style={styles.icon}>Find</Text>
            </Button>

            <Button vertical
              onPress={() => {
                Actions.search()
              }}

            >
              <Image
                source={require("../../assets/Images/app.png")}
                style={
                  this.state.selectedNav === "browse" && styles.currentScreen
                }
              />
              <Text style={styles.icon}>Browse</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>,
      this.renderImage()
    ];
  }
}

const styles = StyleSheet.create({
  img: {
    color: "brown",
    height: 20,
    width: 20
  },
  icon: {
    color: "brown",
    fontSize: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inner: {
    width: 50,
    height: 50,
    marginTop: 5
  },
  add: {
    overflow: "visible",
    width: 100,
    height: 100
  },
  currentScreen: {
    backgroundColor: "lightgrey"
  }
});
