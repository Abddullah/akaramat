import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Constants, Google, GoogleSignIn } from "expo";
import twitter from "react-native-simple-twitter";
import { TWLoginButton } from "react-native-simple-twitter";
import firebase from "firebase";
import ErrorMessage from "../../../Component/errorMessage";
import { Tabs, Button, View } from "native-base";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Alert
} from "react-native";
// import Loading from '../Component/Loader';

import { signinAction } from "../../../Store/Action/action";
import {
  authWithFacebook,
  authWIthTwitter,
  authWithGoogle
} from "../../../services/API/SocialAPIs";
import { LoginUser } from "../../../Store/Action/auth.js";
twitter.setConsumerKey(
  "K5Y9vTVcGIPX7IgwGxSqqafSM",
  "frPcctjOGXuMfaEWLYJpJKaqMvM1uF0TNGhSfLS4EAOghydKG0"
);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  socialSignUp(social) {

    let obj = {
      social
    }

    Actions.registerUserType(obj)

  }

  render() {
    // console.log(this.props, "signup");
    return (
      <ImageBackground
        source={require("../../../assets/Images/background.png")}
        style={{
          // backgroundColor: '#fd902a',
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ScrollView
          style={{
            width: "100%"
            // backgroundColor: "red",
          }}
          contentContainerStyle={styles.contentContainer}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              marginHorizontal: "10%"
              // backgroundColor: "yellow",
            }}
          >
            <Image
              style={{ width: 220, height: 200 }}
              source={require("../../../assets/Images/logo.png")}
              resizeMode="contain"
            />
            <Button
              full
              style={{
                height: 55,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginTop: -18,
                borderWidth: 0.5,
                borderColor: "white",
                backgroundColor: "#ffff"
              }}
              onPress={() => Actions.SignupasSellerorbuyer()}
            >
              <Text style={{ color: "#7B6859", fontWeight: "bold" }}>
                {this.props.str.signupassallerorbuyer}
              </Text>
            </Button>
            <Button
              full
              style={{
                height: 55,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10,
                borderWidth: 0.5,
                borderColor: "white",
                backgroundColor: "#ffff"
              }}
              onPress={() => {
                Actions.SignupasTasker();
              }}
            >
              <Text style={{ color: "#7B6859", fontWeight: "bold" }}>
                {this.props.str.signupastasker}
              </Text>
            </Button>
            <Button
              full
              style={{
                height: 55,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10,
                borderWidth: 0.5,
                borderColor: "white",
                backgroundColor: "#ffff"
              }}
              onPress={() => {
                Actions.SignupasAgentorDeveloper();
              }}
            >
              <Text style={{ color: "#7B6859", fontWeight: "bold" }}>
                {this.props.str.signupasagentordeveloper}
              </Text>
            </Button>
            <Button
              full
              style={{
                height: 55,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10,
                borderWidth: 0.5,
                borderColor: "white",
                backgroundColor: "#ffff"
              }}
              onPress={() => {
                Actions.SignupasRepresentative();
              }}
            >
              <Text style={{ color: "#7B6859", fontWeight: "bold" }}>
                {this.props.str.signupasrepresentative}
              </Text>
            </Button>
            <Button
              full
              style={{
                height: 55,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                marginTop: 10,
                borderWidth: 0.5,
                borderColor: "white",
                backgroundColor: "#ffff"
              }}
              onPress={() => {
                Actions.SignupasInternationalPartners();
              }}
            >
              <Text style={{ color: "#7B6859", fontWeight: "bold" }}>
                {this.props.str.signupasInternationalPartners}
              </Text>
            </Button>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: 15
              }}
            >
              <Button
                style={{
                  width: "100%",
                  height: 45,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginTop: 0,
                  borderWidth: 0.5,
                  // borderColor: "white",
                  backgroundColor: "#4D69A2"
                }}
                onPress={() => this.socialSignUp('facebook')}
              >
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>

                    <Ionicons
                      name="logo-facebook"
                      style={{ top: 0, fontSize: 20, color: "white" }}
                    />
                  </View>
                  <View style={{ flex: 7, justifyContent: "center", }}>
                    <Text style={[{ color: "white", fontSize: 13, }, this.props.str.language === "ar" ? { marginRight: 20 } : null]}>
                      {this.props.str.signupwithyourfacebook}
                    </Text>
                  </View>



                </View>
              </Button>

              <Button
                style={{
                  width: "100%",
                  height: 45,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginTop: 5,
                  borderWidth: 0.5,
                  // borderColor: "white",
                  backgroundColor: "#0099F1"
                }}
                onPress={() => this.socialSignUp('twitter')}
              >
                <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
                  <Ionicons
                    name="logo-twitter"
                    style={{ top: 0, fontSize: 20, color: "white" }}
                  />
                </View>
                <View style={{ flex: 7, justifyContent: "center", }}>
                  <Text style={[{ color: "white", fontSize: 13, }, this.props.str.language === "ar" ? { marginRight: 20 } : null]}>
                    {this.props.str.signupwithyourtwitter}
                  </Text>
                </View>

              </Button>

              <Button
                style={{
                  width: "100%",
                  height: 45,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginTop: 5,
                  borderWidth: 0.5,
                  // borderColor: "white",
                  backgroundColor: "#D73D32"
                }}
                onPress={() => this.socialSignUp('google')}
              >
                <View
                  style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                >

                  <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
                    <Entypo
                      name="google-"
                      style={{ top: 0, fontSize: 20, color: "white" }}
                    />
                  </View>
                  <View style={{ flex: 7, justifyContent: "center", }}>

                    <Text style={[{ color: "white", fontSize: 13, }, this.props.str.language === "ar" ? { marginRight: 20 } : null]}>
                      {this.props.str.signupwithyourgoogle}
                    </Text>
                  </View>


                </View>
              </Button>
            </View>
            <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
              <Text
                onPress={() =>
                  Actions.signIn()
                }
                style={{ color: "white", fontSize: 12, textAlign: "center" }}>{this.props.str.backtosignin}</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

let mapStateToProps = state => {
  return {
    isLoader: state.root.isLoader,
    isError: state.root.isError,
    errorMessage: state.root.errorMessage,
    str: state.root.str,
    user: state.auth.user
  };
};
function mapDispatchToProps(dispatch) {
  return {
    getUserSignIn: data => {
      dispatch(signinAction(data));
    },
    LoginUser: user => dispatch(LoginUser(user))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40
  }
});
