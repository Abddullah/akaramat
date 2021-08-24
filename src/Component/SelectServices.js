import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  ListItem,
  Left,
  Right,
  Radio,
  Icon
} from "native-base";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Picker,
  Text,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import DownIcon from "react-native-vector-icons/AntDesign";

// import { servicesApi } from "../services/API/servicesAPI";

import { taskApi } from '../services/API/TaskAPI'

export default class SelectServices extends Component {
  constructor() {
    super();
    this.state = {
      response: null,
      servicesName: [],
      selected2: "select"
    };
  }

  componentDidMount() {
    taskApi()
      .then(data => {
        let state = data.data.results;
        let array = [];
        for (let r in state) {
          array.push(state[r]);
        }
        this.setState({ servicesName: array });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  render() {
    let { response, servicesName } = this.state;
    return (
      <Form>
        {servicesName.length ? (
          <Picker
            note
            mode="dropdown"
            style={{
              height: 50,
              width: "92%",
              marginLeft: 7,
              color: "#565c66"
            }}
            selectedValue={this.state.selected2}
            onValueChange={this.onValueChange2.bind(this)}
          >
            <Picker.Item label="Select Service" value="" />
            {servicesName.map(item => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        ) : (
          <ActivityIndicator
            size="small"
            color="#E94E1B"
            style={{
              color: "#E94E1B",
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        )}
      </Form>
    );
  }
}
