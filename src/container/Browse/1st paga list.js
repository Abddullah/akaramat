import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from "native-base";
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Notifications from "../../Component/notification"
import { hideTaber,setUserDetails, setLoginUser } from "../../Store/Action/action";
// import TabNavigation from '../../navigation/TabNavigation';
import axios from 'axios'


class FirstPageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailSendingFlag: false,
      notificationsShow: false
    }
  }

  ApiRequest = async (url) => {

    var header1 = {
      token: "bearer " + this.props.userCredentials.token,
      clientsecret: '(*jh2kj36gjhasdi78743982u432j',
      clientkey: '34532hbjdsakjd2&&gjhjh11',
      "Content-Type": "application/json",
    }

    var options = {
      method: 'GET',
      url: url,
      headers: header1,
    };
    return await axios(options)
      .then((data) => {
        return data
      }).catch((err) => {
        return err
      })

  }
// componentWillMount
componentWillMount() {
    this.ApiRequest(`https://demo.akaratmisr.com:443/${this.props.str.language}/api/people/user/getLoggedInUserDetail`).then((response) => {
      console.log(response, "loginuserdetails")
      if (response) {
        this.props.setLoginUser(response.data.results)
      }
    }).catch((err) => {
      console.log(err, "err user details")

    })

    return axios({
      method: 'get',
      url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + this.props.userCredentials.user_id,
      headers: {
        "clientkey": "34532hbjdsakjd2&&gjhjh11",
        "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
      },
    })
      .then(data => {
        console.log(data.data.results, "userdetailsInBrowse")
        this.props.setUserDetails(data.data.results)
        // this._storeDetails(data.data.results).then((bol) => {
        // })
        // Actions.tabNavigation()
        // this.setState({
        //   loginLoader: !this.state.loginLoader
        // })
      })
      .catch(err => {
        console.log(err)
        alert(err.message)
      })


  }

  emailSending() {
    this.setState({
      emailSendingFlag: !this.state.emailSendingFlag
    })
  }
  render() {
    return (
      <View style={{
        flex: 1, width: "100%",
        // backgroundColor: "yellow"
      }}>

        <View style={{
          flex: 1.18,
          // height: 40,
          backgroundColor: '#E94E1B',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: "row",
          width: "100%"
        }}>

          {
            (this.props.str.language === "en" || this.props.str.language === "ar") ? (
              <>
                <View style={{ flex: 0.5, width: "90%", flexDirection: "row", marginTop: "7%" }}>
                  <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.browse.toUpperCase()}</Text>
                </View>

                <View style={{ flex: 0.5, flexDirection: "row-reverse", alignItems: "flex-end", marginTop: "7%", marginLeft: "5%" }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        notificationsShow: !this.state.notificationsShow
                      })}
                  >
                    <Icon name='bell' style={{ textAlign: "right", fontSize: 19, color: "white" }} />
                  </TouchableOpacity>
                </View>
                {/* <View style={{ flex: 0.5, flexDirection: "row-reverse", alignItems: "flex-end", marginTop: "7%", marginLeft: "5%" }}>
                  <TouchableOpacity
                    onPress={() => this.props.hideTaber()}
                  >
                    <Icon name='logout' style={{ textAlign: "right", fontSize: 19, color: "white" }} />
                  </TouchableOpacity>
                </View> */}
              </>

            ) :
              <>
                {/* <View style={{ flex: 0.5, width: "90%", flexDirection: "row", marginTop: "7%" }}>
                  <TouchableOpacity style={{ marginLeft: "10%", }}
                    onPress={() =>
                      this.setState({
                        notificationsShow: !this.state.notificationsShow
                      })}
                  >
                    <Icon name='bell' style={{ textAlign: "right", fontSize: 19, color: "white" }} />
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 0.5, flexDirection: "row-reverse", alignItems: "flex-end", marginTop: "7%", marginLeft: "5%" }}>
                  <Text style={{ marginLeft: "10%", color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.browse.toUpperCase()}</Text>
                </View> */}
              </>
          }


        </View>


        <View style={{ flex: 8, width: "90%", marginHorizontal: "5%" }}>

          {
            (this.state.notificationsShow === true) ? (<Notifications forReloadNotification={this.state.notificationsShow} />) : null
          }

          <TouchableOpacity style={styles.listView}
            onPress={() => {
              Actions.SecondPageList({
                Properties: "Properties",
              })
            }}
          >
            <Text >{this.props.str.properties}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              Actions.SecondPageList({
                Tasker: "Tasker",
              })
            }} >
            <Text >{this.props.str.Tasker}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              Actions.SecondPageList({
                Tasks: "Tasks",
              })
            }} >
            <Text >{this.props.str.Tasks}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              Actions.SecondPageList({
                Agent: "Agent",
              })
            }} >
            <Text >{this.props.str.agentanddevelopers}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              Actions.SecondPageList({
                Representative: "Representative",
              })
            }}>
            <Text >{this.props.str.representative}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              Actions.SecondPageList({
                Projects: "Projects",
              })
            }}>
            <Text >{this.props.str.projects}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              Actions.SecondPageList({
                jobs: 'jobs',
              })
            }}>
            <Text >{this.props.str.jobHere}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listView}
            onPress={() => {
              Actions.SecondPageList({
                News: "News",
              })
            }}>
            <Text >{this.props.str.news}</Text>
          </TouchableOpacity>

        </View>

        {/* <TabNavigation /> */}
      </View >

    );
  }
}



let mapStateToProps = state => {
  return {
    str: state.root.str,
    userCredentials: state.root.userCredentials,
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    hideTaber: () => {
      dispatch(hideTaber())
    },
    setLoginUser: data => {
      dispatch(setLoginUser(data));
    },
    setUserDetails: (userData) => {
      dispatch(setUserDetails(userData));
    },
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstPageList);

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