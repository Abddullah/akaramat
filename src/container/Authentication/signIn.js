import React, { Component } from "react";
import { connect } from "react-redux";
import { signinAction } from "../../Store/Action/action";
import { Actions } from "react-native-router-flux";
import { LoginUser } from "../../Store/Action/auth.js";
import { setUserCredentials } from "../../Store/Action/action";
import { setUserDetails, showNav } from "../../Store/Action/action";
import ResendCode from '../../Component/resendCode';

import twitter from "react-native-simple-twitter";
twitter.setConsumerKey(
  "K5Y9vTVcGIPX7IgwGxSqqafSM",
  "frPcctjOGXuMfaEWLYJpJKaqMvM1uF0TNGhSfLS4EAOghydKG0"
);
import { TWLoginButton } from "react-native-simple-twitter";
// import firebase from 'firebase'
// import ErrorMessage from '../Component/errorMessage';

import {
  authWithFacebook,
  authWIthTwitter,
  authWithGoogle
} from "../../services/API/SocialAPIs";

import {
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert, AsyncStorage

} from "react-native";

import {
  Container,
  Header,
  Content,
  Tab,
  Tabs,
  Button,
  Input,
  Item,
  View,
  Icon
} from "native-base";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialIcons
} from "@expo/vector-icons";
import { logInApi } from "../../services/API/loginAPI";
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginLoader: false,
      flag: false,
      reSendFlag: false,
      resendCode: false,

     // sallerbuyer 
      // email: "03413542800",
      // sallerbuyer with facebook
      email: "nabeelshahid2@gmail.com",
      // email: "03464100928",
      // tasker 
      // email: "03479009425",
      // email: "03452153709",
      // representative 
      // email: "dhobishow@gmail.com",
      // representative 
      // email: "mynameismuzammilhussainshah@gmail.com",
      // representative
      // email: "thanhthanhnguyen959@gmail.com",
      // representative
      // email: "03042437719",
      // international partner 
      // email: "abddullahshah@gmail.com",
      // email: "olxwalybhai@gmail.com",
      // email: "mynameisabdullah1@hotmail.com",
      // email: "thanhnguyenthi087@gmail.com",

      password: "123456",

      // thanhnguyenthi087@gmail.com / 12345678
      // email: "nguyenminhtienit@gmail.com",
      // password: "12345678"

      // email: "",
      // password: "",
    };
  }

  ApiRequest = async (url, obj) => {
    return await fetch(url, {
      method: "POST",
      headers: {
        clientkey: "34532hbjdsakjd2&&gjhjh11",
        clientsecret: "(*jh2kj36gjhasdi78743982u432j",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then((res) => {
        return res.json()
      })
      .then((response) => {
        console.log(response, 'response')
        if (response.status === 1000) {
          this.setState({
            loginLoader: true
          })
          return response
        } else {
          alert(response.message)
        }
      })
      .catch((err) => {
        return err
      })

  }
  _storeData = async (results) => {
    // console.log(results, "ressss")
    let obj = JSON.stringify(results)
    // console.log(obj, "obj")
    try {
      await AsyncStorage.setItem('userHave', obj);
      // alert("try")
    } catch (error) {
      console.log(error, "eeeeeee")
      alert("catch")
      // Error saving data
    }

  };
  _storeDetails = async (results) => {
    // console.log(results, "ressss")
    let obj = JSON.stringify(results)
    // console.log(obj, "obj")
    try {
      await AsyncStorage.setItem('userDetails', obj);
      // alert("try")
    } catch (error) {
      console.log(error, "eeeeeee")
      alert(error)
      // Error saving data
    }

  };

  signIn() {
    if (this.state.email === "" || this.state.password === "") {
      alert(this.props.str.pleasetypeemailorphone);
    }
    else {
      // alert("working")
      this.setState({
        loginLoader: !this.state.loginLoader
      })
      let urlm = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/auth/login";
      return axios({
        method: "post",
        url: urlm,
        headers: {
          clientkey: "34532hbjdsakjd2&&gjhjh11",
          clientsecret: "(*jh2kj36gjhasdi78743982u432j"
        },
        data: {
          email: this.state.email,
          password: this.state.password,
        }
      })
        .then(data => {
          this.props.showNav()
          // console.log(data.data.results, "user tocken and id");
          this.props.setUserCredentials(data.data.results)

          this._storeData(data.data.results).then((bol) => {
            // console.log(bol, "bol")
          })


          return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + data.data.results.user_id,
            headers: {
              "clientkey": "34532hbjdsakjd2&&gjhjh11",
              "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
          })
            .then(data => {
              console.log(data.data.results, "user details")
              this.props.setUserDetails(data.data.results)
              this._storeDetails(data.data.results).then((bol) => {
                // console.log(bol, "bol")
              })
              Actions.tabNavigation()
              this.setState({
                loginLoader: !this.state.loginLoader
              })
            })
            .catch(err => {
              console.log(err)
              alert(err.message)
            })
        })
        .catch(err => {
          var errUpdate = JSON.stringify(err);
          console.log(errUpdate, "errUpdate")
          alert(JSON.stringify(err.response.data.message))
          if (JSON.stringify(err.response.data.status === 1001)) {
            // alert("active")
            this.setState({
              reSendFlag: !this.state.reSendFlag
            }, () => {
              setTimeout(() => {
                this.setState({
                  reSendFlag: !this.state.reSendFlag
                })
              }, 10000)

            })
          }
          this.setState({
            loginLoader: !this.state.loginLoader
          })
        });
    }
  }


  reSendCode() {
    this.setState({
      resendCode: !this.state.resendCode
    })
    // if (this.state.email === "") {
    //   alert(this.props.str.pleasetypeemailorphone);
    // }
    // else {
    //   if (this.state.email.match("^[a-zA-Z0-9]*$")) {
    //     // alert('aplanumeric');
    //     this.setState({
    //       loginLoader: !this.state.loginLoader
    //     })
    //     var bodyFormData = new FormData();
    //     bodyFormData.append("phone", this.state.email);
    //     bodyFormData.append("country_code", "PK");
    //     let urlm = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/auth/recallToVerify";
    //     return axios({
    //       method: "post",
    //       url: urlm,
    //       headers: {
    //         clientkey: "34532hbjdsakjd2&&gjhjh11",
    //         clientsecret: "(*jh2kj36gjhasdi78743982u432j"
    //       },
    //       data: bodyFormData
    //     })
    //       .then(data => {
    //         // console.log(data.data.results, "then");
    //         alert(JSON.stringify(data.data.message))

    //         // alert("Please cheack confirmation code");
    //         this.setState({
    //           loginLoader: !this.state.loginLoader
    //         })
    //         Actions.VeryfyAcc({
    //           phone: this.state.email,
    //         })
    //       })
    //       .catch(err => {
    //         var errUpdate = JSON.stringify(err);
    //         // console.log(JSON.parse(errUpdate), "catch");
    //         alert(JSON.stringify(err.response.data.message))
    //         this.setState({
    //           loginLoader: !this.state.loginLoader
    //         })
    //       });
    //   }
    //   else {
    //     this.setState({
    //       loginLoader: !this.state.loginLoader
    //     })
    //     var bodyFormData = new FormData();
    //     bodyFormData.append("email", this.state.email);
    //     // bodyFormData.append("country_code", "PK");
    //     let urlm = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/auth/resendConfirmCodeEmail";
    //     return axios({
    //       method: "post",
    //       url: urlm,
    //       headers: {
    //         clientkey: "34532hbjdsakjd2&&gjhjh11",
    //         clientsecret: "(*jh2kj36gjhasdi78743982u432j"
    //       },
    //       data: bodyFormData
    //     })
    //       .then(data => {
    //         // console.log(data.data.results, "then");
    //         // alert("Please cheack confirmation code");
    //         alert(JSON.stringify(data.data.message))
    //         this.setState({
    //           loginLoader: !this.state.loginLoader
    //         })

    //       })
    //       .catch(err => {
    //         var errUpdate = JSON.stringify(err);
    //         console.log(JSON.parse(errUpdate), "catch");
    //         alert(JSON.stringify(err.response.data.message))
    //         this.setState({
    //           loginLoader: !this.state.loginLoader
    //         })
    //       });
    //   }
    // }
  }

  // Somewhere in your code
  facebookSignIn = async () => {
    const { type, token, expires,
      permissions,
      declinedPermissions, } = await Expo.Facebook.logInWithReadPermissionsAsync(
        // "282381055768937",
        "1966680640019758",
        // "333976297442383",
        {
          permissions: ["public_profile"]
        }
      );
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = authWithFacebook({ lang: "en", user_type: 2, token });
      // console.log(response, "respo")
      response
        .then(async res => {
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
          );

          const result = await response.json();
          console.log(result, response, token, type, "respo")

          const url = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/auth/loginFacebook";
          let obj = {
            token: token
          }
          this.ApiRequest(url, obj).then((response) => {
            if (response) {
              this.props.setUserCredentials(response.results)
              return axios({
                method: 'get',
                url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + response.results.user_id,
                headers: {
                  "clientkey": "34532hbjdsakjd2&&gjhjh11",
                  "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
                },
              })
                .then(data => {
                  console.log(data.data.results, "user details")
                  this.setState({
                    loginLoader: false
                  })
                  this.props.setUserDetails(data.data.results)
                  this._storeDetails(data.data.results).then((bol) => {
                    // console.log(bol, "bol")
                  })
                  Actions.tabNavigation()
                })
                .catch(err => {
                  this.setState({
                    loginLoader: false
                  })
                  console.log(err)
                  alert(err.message)
                })

            }
          }).catch((err) => {
            this.setState({
              loginLoader: false
            })
            console.log(err)
            alert(err.message)
          })







          // Alert.alert("Logged in!", `Hi your tocken ${token}! `);
          // this.props.LoginUser(result);
          // this.props.setUserDetails(data.data.results)
          // Actions.tabNavigation();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  googleLogin = async () => {
    console.log("working")
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "898164944740-6mrfj0l1e5i7b0qsu6h4diqv0mp4mm25.apps.googleusercontent.com",
        iosClientId:
          "813965692962-6p4djqr35ja6m1r68437u22vnmrufhca.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        behavior: "web"
      });

      console.log(result, 'result');

      if (result.type === "success") {
        const token = result.idToken;
        console.log(token);
        const url = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/auth/loginGoogle";
        let obj = {
          token_id: token
        }
        this.ApiRequest(url, obj).then((response) => {
          if (response) {

            this.props.setUserCredentials(response.results)
            return axios({
              method: 'get',
              url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + response.results.user_id,
              headers: {
                "clientkey": "34532hbjdsakjd2&&gjhjh11",
                "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
              },
            })
              .then(data => {
                console.log(data.data.results, "user details")
                this.setState({
                  loginLoader: false
                })
                this.props.setUserDetails(data.data.results)
                this._storeDetails(data.data.results).then((bol) => {
                  // console.log(bol, "bol")
                })
                Actions.tabNavigation()
              })
              .catch(err => {
                this.setState({
                  loginLoader: false
                })
                console.log(err)
                alert(err.message)
              })

          }
        }).catch((err) => {
          this.setState({
            loginLoader: false
          })
          console.log(err)
          alert(err.message)
        })

      } else {
        this.setState({
          loginLoader: false
        })
        Alert.alert("canceld");
      }
    } catch (e) {
      this.setState({
        loginLoader: false
      })
      Alert.alert(e, "error");
      return { error: true };
    }
  }

  onGetAccessToken = async (token) => {
    console.log(token, 'token')
    try {
      const { oauth_token, oauth_token_secret } = token;
      const url = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/auth/loginTwitter";
      let obj = {
        oauth_token,
        oauth_token_access: oauth_token_secret
      }
      this.ApiRequest(url, obj).then((response) => {
        if (response) {

          this.props.setUserCredentials(response.results)
          return axios({
            method: 'get',
            url: "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + response.results.user_id,
            headers: {
              "clientkey": "34532hbjdsakjd2&&gjhjh11",
              "clientsecret": "(*jh2kj36gjhasdi78743982u432j",
            },
          })
            .then(data => {
              console.log(data.data.results, "user details")
              this.setState({
                loginLoader: false
              })
              this.props.setUserDetails(data.data.results)
              this._storeDetails(data.data.results).then((bol) => {
                // console.log(bol, "bol")
              })
              Actions.tabNavigation()
            })
            .catch(err => {
              this.setState({
                loginLoader: false
              })
              console.log(err)
              alert(err.message)
            })
        }

      }).catch((err) => {
        this.setState({
          loginLoader: false
        })
        console.log(err)
        alert(err.message)
      })
    } catch (e) {
      this.setState({
        loginLoader: false
      })
      Alert.alert(e, "error");
      return { error: true };
    }
  }

  onSuccess = () => {
    console.log("success");
  };

  onError = () => {
    console.log("error");
    alert("error");
  };

  onClose = () => {
    console.log("close");
  };

  resendElement() {
    setTimeout(() => {
      return (
        <Text onPress={() => this.reSendCode(this)} style={{ color: "#B7AEA8", fontSize: 15 }}>
          {this.props.str.resendconfirmation}
        </Text>
      )
    }, 3000)

    // (this.state.loginLoader === false) ? (
    //   (this.state.reSendFlag === true) ? (
    //     setTimeout(() => {
    //       return (
    //         <Text onPress={() => this.reSendCode(this)} style={{ color: "#B7AEA8", fontSize: 15 }}>
    //           Resend Confirmation
    //        </Text>
    //       )
    //     }, 3000)

    //   ) : null
    // ) : null
  }

  render() {
    let { flag } = this.state;
    return (
      <ImageBackground
        source={require("../../assets/Images/background.png")}
        style={{
          // backgroundColor: '#fd902a',
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {
          (this.state.resendCode === true) ? (
            <ResendCode />
          ) : null
        }
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
              source={require("../../assets/Images/logo.png")}
              resizeMode="contain"
            />
            <View
              style={{
                marginTop: 15,
                height: 50,
                width: "100%",
                flexDirection: "row",
                borderWidth: 0.5,
                borderColor: "white",
                borderRadius: 5
              }}
            >
              <Input
                placeholder={this.props.str.email}
                placeholderStyle={{ fontSize: 10 }}
                placeholderTextColor="white"
                style={{ marginLeft: 15, fontSize: 15, color: "white" }}
                onChangeText={email => {
                  this.setState({ email: email });
                }}
                value={this.state.email}
              />
              <MaterialIcons
                name="person-outline"
                style={{
                  marginRight: 20,
                  top: 13,
                  fontSize: 22,
                  color: "white"
                }}
              />
            </View>
            <View
              style={{
                marginTop: 15,
                height: 50,
                width: "100%",
                flexDirection: "row",
                borderWidth: 0.5,
                borderColor: "white",
                borderRadius: 5
              }}
            >
              <Input
                // secureTextEntry={this.state.password == "" ? false : true}
                secureTextEntry={true}
                placeholder={this.props.str.password}
                // placeholderStyle={{
                //   // textAlign: 'right',
                //   // flexDirection: 'row-reverse',
                //   fontSize: 10,
                //   // marginLeft: this.props.str.language === "ar" ? "10%" : 15,
                // }}
                placeholderTextColor="white"
                style={{
                  marginLeft: this.props.str.language === "ar" ? "0%" : 15,
                  fontSize: 15,
                  color: "white",
                  textAlign: this.props.str.language === "ar" ? "right" : "left",
                }}
                onChangeText={password => {
                  this.setState({ password: password });
                }}
                value={this.state.password}
              />
              {/* <Icon name='key-variant' /> */}
              <Entypo
                name="key"
                style={{
                  marginRight: 20,
                  top: 13,
                  fontSize: 22,
                  color: "white"
                }}
              />
            </View>

            {this.state.loginLoader === true ? (
              <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
            ) : (
                <Button
                  full
                  style={{
                    height: 55,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    marginTop: 20,
                    borderWidth: 0.5,
                    borderColor: "white",
                    backgroundColor: "#ffff"
                  }}
                  onPress={
                    // () => Actions.tabNavigation()
                    () => this.signIn(this)
                  }
                >
                  <View style={{ flexDirection: "row", }}>
                    <Icon name="unlock" style={{ top: 0, fontSize: 20, color: "#7B6859" }} />
                    <Text style={{ color: "#7B6859", fontWeight: "bold", marginLeft: 10 }}>
                      {this.props.str.login}
                    </Text>
                  </View>
                </Button>
              )}

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
              onPress={() => Actions.signUp()}
            >
              <View
                style={{
                  flexDirection: "row",
                  // flexWrap: "wrap",
                  // justifyContent: "space-between",
                  // width: this.props.str.signup1 === "سجل" ? "20%" : "30%"
                }}
              >
                <FontAwesome
                  name="edit"
                  style={{ top: 1, fontSize: 20, color: "#7B6859" }}
                />

                <Text style={{ color: "#7B6859", fontWeight: "bold", marginLeft: 10 }}>
                  {this.props.str.signup1}
                </Text>
              </View>
            </Button>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
                marginTop: 15
              }}
            >
              <Button
                style={{
                  width: "100%",
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginTop: 5,
                  borderWidth: 0.5,
                  // borderColor: "white",
                  backgroundColor: "#4D69A2"
                }}
                onPress={this.facebookSignIn}
              >
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons
                      name="logo-facebook"
                      style={{ top: 0, fontSize: 15, color: "white" }}
                    />
                  </View>
                  <View style={{ flex: 7, justifyContent: "center", }}>
                    <Text style={{ color: "white", fontSize: 10, alignItems: "center", justifyContent: "center", marginRight: 20 }}>
                      {this.props.str.loginwithyourfacebook}
                    </Text>
                  </View>
                </View>

                {/* <View
                  style={{
                    flexDirection: "row",
                    // flexWrap: "wrap",
                    // justifyContent: "space-between",
                    // width:
                    //   this.props.str.loginwithyourfacebook ===
                    //     "تسجيل الدخول مع جوجل الخاص بك"
                    //     ? "90%"
                    //     : "80%"
                  }}
                >
                  <Ionicons
                    name="logo-facebook"
                    style={{ top: 0, fontSize: 15, color: "white" }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {this.props.str.loginwithyourfacebook}
                  </Text>
                </View> */}
              </Button>

              <Button
                style={{
                  width: "100%",
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginTop: 5,
                  borderWidth: 0.5,
                  // borderColor: "white",
                  backgroundColor: "#0099F1"
                }}
              >
                <TWLoginButton
                  style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                  // style={{
                  //   flexDirection: "row",
                  //   // flexWrap: "wrap",
                  //   // justifyContent: "space-between",
                  //   // width:
                  //   //   this.props.str.loginwithyourtwitter ===
                  //   //     "تسجيل الدخول مع تويتر الخاص بك"
                  //   //     ? "90%"
                  //   //     : "70%"
                  // }}
                  type="TouchableOpacity"
                  onPress={this.onPress}
                  onGetAccessToken={this.onGetAccessToken}
                  onSuccess={this.onSuccess}
                  onClose={this.onClose}
                  onError={this.onError}
                >
                  <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons
                      name="logo-twitter"
                      style={{
                        top: 0,
                        fontSize: 15,
                        color: "white",
                        left: 0
                      }}
                    />
                  </View>
                  <View style={{ flex: 7, justifyContent: "center", }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 20
                      }}
                    >
                      {this.props.str.loginwithyourtwitter}
                    </Text>
                  </View>



                </TWLoginButton>
              </Button>

              <Button
                style={{
                  width: "100%",
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginTop: 5,
                  borderWidth: 0.5,
                  // borderColor: "white",
                  backgroundColor: "#D73D32"
                }}
                onPress={this.googleLogin}
              >
                <View
                  style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                >


                  <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
                    <Entypo
                      name="google-"
                      style={{ top: 0, fontSize: 15, color: "white" }}
                    />
                  </View>
                  <View style={{ flex: 7, justifyContent: "center", }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 20
                      }}
                    >
                      {this.props.str.loginwithyourgoogle}
                    </Text>
                  </View>



                </View>
              </Button>
            </View>
            <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
              {
                (this.state.loginLoader === false) ? (
                  (this.state.reSendFlag === true) ? (
                    <Text onPress={() => this.reSendCode(this)} style={{ color: "#B7AEA8", fontSize: 15 }}>
                      {this.props.str.activatemyaccount}
                    </Text>
                  ) : null
                ) : null
              }
              <Text
                onPress={() => Actions.forGotPassword()}
                style={{ color: "#B7AEA8", fontSize: 15 }}
              >
                {this.props.str.forgetpassword}
              </Text>


            </View>
          </View>
        </ScrollView>
      </ImageBackground >
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoader: state.root.isLoader,
    isError: state.root.isError,
    errorMessage: state.root.errorMessage,
    str: state.root.str,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserSignIn: data => {
      dispatch(signinAction(data));
    },
    setUserCredentials: (userCredentials) => {
      dispatch(setUserCredentials(userCredentials));
    },
    setUserDetails: (userData) => {
      dispatch(setUserDetails(userData));
    },
    showNav: () => {
      dispatch(showNav());
    },

    LoginUser: user => dispatch(LoginUser(user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40
  }
});
