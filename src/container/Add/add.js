import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Text, Container } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";

class AddScreen extends Component {

  componentWillMount() {

  }

  render() {
    return (
      <Container style={{ flex: 1, width: "100%", alignItems: "center", }}>
        <View style={{ flex: 5, width: "90%", }}>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              if (this.props.userDetails.user_type != 6) {
                Actions.AddProperty({ addproperty: "addproperty", })
              }
              else {
                alert(this.props.str.thisuserdont)
              }
            }}
          >
            <Text >{this.props.str.addproperty}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              if (this.props.userDetails.user_type != 6) {
                Actions.AddTask({ addtask: "addtask", })
              }
              else {
                alert(this.props.str.thisuserdont)
              }
            }}
          // onPress={() => { Actions.AddTask({ addtask: "addtask", }) }}
          >
            <Text >{this.props.str.addtask}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              if (this.props.userDetails.user_type != 6) {
                Actions.AddRequest({ addrequest: "addrequest", })
              }
              else {
                alert(this.props.str.thisuserdont)
              }
            }}
          // onPress={() => { Actions.AddRequest({ addrequest: "addrequest", }) }}
          >
            <Text >{this.props.str.addrequest}</Text>
          </TouchableOpacity>

          {
            (this.props.userDetails.user_type == 6 && this.props.userDetails.current_package == "Diamond Package" || this.props.userDetails.current_package == "Platinum Extra Package") ? (
              <TouchableOpacity style={styles.listView}
                onPress={() => { Actions.AddProject({ addrequest: "addproject", }) }} >
                <Text >{this.props.str.addproject}</Text>
              </TouchableOpacity>
            ) : null
          }

          {
            (this.props.userDetails.user_type == 5) ? (
              <TouchableOpacity style={styles.listView}
                onPress={() => { Actions.AddProject({ addrequest: "addproject", }) }} >
                <Text >{this.props.str.addproject}</Text>
              </TouchableOpacity>
            ) : null
          }
          {
            (this.props.userDetails.user_type == 5) ? (
              <TouchableOpacity style={styles.listView}
                onPress={() => { Actions.AddBlog({ addblog: "addblog", }) }} >
                <Text >{this.props.str.addblog}</Text>
              </TouchableOpacity>
            ) : null
          }

        </View>
      </Container>
    );
  }
}



let mapStateToProps = state => {
  return {
    str: state.root.str,
    userDetails: state.root.userDetails,
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    // languageSet: (lang) => {
    //     dispatch(languageSet(lang))
    // },
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);

const styles = StyleSheet.create({
  listView: {
    width: "100%", height: 40, marginTop: 10,
    borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
    justifyContent: 'center'
  },
  listText: {
    justifyContent: "flex-start",
    textAlign: "left",
    alignSelf: "stretch",
    fontSize: 16
  }
});
// title: {
//   justifyContent: "flex-start",
//   textAlign: "left",
//   alignSelf: "stretch"
// }



// AddScreen