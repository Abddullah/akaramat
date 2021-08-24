import React, { Component } from "react";
import { Container, Content, List, ListItem, Text } from "native-base";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

class Search extends Component {
  render() {
    return (
      <View style={{
        flex: 1, width: "100%",
        backgroundColor: "white"
      }}>
        <View style={{ flex: 8, width: "90%", marginHorizontal: "5%" }}>
         
          <TouchableOpacity style={styles.listView}
            // style={styles.container}
            onPress={() => Actions.SearchForProperties()}
          >
            <Text
            // style={styles.title}
            >{this.props.str.findproperty}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listView}
            // style={styles.container}
            onPress={() => Actions.findreq()}
          >
            <Text >{this.props.str.findrequest}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listView}
            // style={styles.container}
            onPress={() => Actions.findTasker()}
          >
            <Text >{this.props.str.findtasker}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listView}
            // style={styles.container}
            onPress={() => Actions.findTask()}
          >
            <Text >{this.props.str.findtask}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listView}
            // style={styles.container}
            onPress={() => Actions.findAgent()}
          >
            <Text >{this.props.str.findagent}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listView}
            // style={styles.container}
            onPress={() => Actions.findInternational()}
          >
            <Text >{this.props.str.findinternationalpartner}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listView}
            // style={styles.container}
            onPress={() => Actions.findRepresentative()}
          >
            <Text >{this.props.str.findrepresentative}</Text>
          </TouchableOpacity>

        </View>

      </View>

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
    // resultData: (searchResult) => {
    //     dispatch(resultData(searchResult))
    // },
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  listView: {
    width: "100%", height: 40, marginTop: 10,
    borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    // alignItems: "flex-start"
  },
  title: {
    justifyContent: "flex-start",
    textAlign: "left",
    alignSelf: "stretch"
  }
});
