import React, { Component } from "react";
import { Constants } from "expo";
import { connect } from "react-redux";

import { Text, Image, TouchableOpacity, View } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Item,
  Input
} from "native-base";

class HeaderNav extends Component {
  render() {
    console.log(this.props)
    return (
      <Container>
        <Header
          style={{
            backgroundColor: "#E94E1B",
            color: "white",
            fontSize: 10,
          }}
        >
          <Body>
            <Text style={{ fontSize: 11, color: "white" }}>SearchFilters</Text>
          </Body>
          <Right>
            <Item
              regular
              style={{
                width: 150,
                marginTop: 10,
                height: 40,
                color: "white",
                backgroundColor: "#b22525",
                borderColor: "#ed4802",
                borderRadius: 10,
                textAlign: "right"
              }}
            >
              <Input
                style={{ color: "#fff", textAlign: "right", fontSize: 10 }}
                placeholderTextColor="white"
                placeholder="Search"
              />
              <Icon name="search" style={{ color: "white", fontSize: 15 }} />
            </Item>
          </Right>
        </Header>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderNav);
