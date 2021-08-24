
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, StatusBar, ScrollView, ListView,
  RefreshControl, Picker, ActivityIndicator,
  TouchableHighlight, Alert, TextInput, UselessTextInput, Switch
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Item, Input, CheckBox, DatePicker } from 'native-base';
import { connect, } from "react-redux";
import axios from 'axios';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { setStepsForAddProperties } from '../../../Store/Action/action'
import Textarea from 'react-native-textarea';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { DocumentPicker, ImagePicker, FileSystem } from 'expo';
import Modal from "react-native-modal";


class AddBlog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaderFlag: false,
      blogCatogery: "blog",
      featuredimage: null,


    }
  }

  componentWillMount() {
    this.setState({
      token: this.props.userCredentials.token,
    })
    console.log(this.props.blogId, "blogId")

    if (this.props.blogDataForEdit) {
      this.setState({
        blogCatogery: this.props.blogDataForEdit.type,
        title: this.props.blogDataForEdit.title,
        content: this.props.blogDataForEdit.description,
        metadisciption: this.props.blogDataForEdit.meta_desc,
        keywords: this.props.blogDataForEdit.keywords,
        featuredimage: this.props.blogDataForEdit.featured_img_src,

      })
    }
  }
  getFileSize = async fileUri => {
    let fileInfo = await FileSystem.getInfoAsync(fileUri);
    return fileInfo.size;
  };
  featuredimage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result, "result");
    if (!result.cancelled) {
      this.getFileSize(result.uri).then((size) => {
        let inkb = size / 1024
        let inMb = inkb / 1024
        console.log(inMb, "size")
        if (inMb < 2) {
          this.setState({ featuredimage: result.uri });
        }
        else {
          alert(this.props.str.imagesizetolarge)
        }
      })

    }
  }


  addPost() {
    this.setState({
      loaderFlag: !this.state.loaderFlag
    })
    cloneData = {
      type: this.state.blogCatogery,
      title: this.state.title,
      description: this.state.content,
      meta_desc: this.state.metadisciption,
      keywords: this.state.keywords,

    }
    var bodyFormData = new FormData();

    for (var key in cloneData) {
      if (cloneData[key] && cloneData[key] !== undefined && cloneData[key].length !== 0) {
        if (Array.isArray(cloneData[key])) {
          var arr = cloneData[key];
          for (var i = 0; i < arr.length; i++) {
            bodyFormData.append(key + "[]", arr[i]);
          }
        }
        else {
          bodyFormData.append(key, cloneData[key]);
        }
      }
    }
    if (this.props.blogId) {
      bodyFormData.append("blog_id", this.props.blogId);
    }
    if (this.state.featuredimage != null) {
      console.log(this.state.featuredimage, "uriFromApi")
      let uriPartsProfile = this.state.featuredimage.split('.');
      let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
      bodyFormData.append('featured_img', {
        uri: this.state.featuredimage,
        name: `photo.${fileTypeProfile}`,
        type: `image/${fileTypeProfile}`,
      });
    }

    let urlm;
    if (this.props.blogId) {
      urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/blog/user/editBlog'
    }
    else {
      urlm = 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/blog/user/addBlog'
    }
    var options = {
      method: 'POST',
      url: urlm,
      headers:
      {
        token: "bearer " + this.state.token,
        'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
        'cache-control': 'no-cache',
        clientsecret: '(*jh2kj36gjhasdi78743982u432j',
        clientkey: '34532hbjdsakjd2&&gjhjh11',
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        "Allow-Cross-Origin": '*',
      },
      data: bodyFormData
    };
    axios(options)
      .then((data) => {
        console.log(data, "data")
        alert(JSON.stringify(data.data.message))
        Actions.tabbar({ type: "reset" });
        Actions.tabNavigation();
        this.setState({
          loaderFlag: !this.state.loaderFlag
        })
      }).catch((err) => {
        alert(JSON.stringify(err.response.data.message))
        console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
        this.setState({
          loaderFlag: !this.state.loaderFlag
        })
      })
  }







  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        // backgroundColor: '#808080',
        backgroundColor: "white",
        width: "100%",

      }}>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", }}>
          <ScrollView contentContainerStyle={styles.contentContainer} style={{ width: "100%", }}>
            <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>

              {/* Input blogCatogery */}

              <View style={{ marginTop: 20, width: "100%", alignItems: "center", justifyContent: "center", }}>
                <Item>
                  <Picker
                    mode="dropdown"
                    style={{ height: 50, width: "90%", color: "black" }}
                    placeholderStyle={{ color: "#E94E1C" }}
                    placeholderIconColor="#E94E1C"
                    selectedValue={this.state.blogCatogery}
                    onValueChange={
                      (itemValue, itemIndex) => this.setState({ blogCatogery: itemValue })
                    }
                  >
                    <Picker.Item label={this.props.str.blogposts} value="blog" key={"blog"} />
                    <Picker.Item label={this.props.str.articles} value="article" key={"article"} />
                    <Picker.Item label={this.props.str.news} value="news" key={"news"} />
                  </Picker>
                </Item>
              </View>

              {/* Title */}

              <View style={{ marginTop: 25 }}>
                <Item style={styles.input}>
                  <Input
                    // keyboardType={"number"}
                    placeholder={this.props.str.title}
                    placeholderStyle={{ fontSize: 10 }}
                    placeholderTextColor="#b3b3b3"
                    label={this.props.str.title}
                    style={{ fontSize: 15 }}
                    onChangeText={(e) => { this.setState({ title: e }) }}
                    value={this.state.title}
                  />
                  <Icon name='format-title' style={{ marginRight: 10, fontSize: 19, color: "#1E90FF" }} />
                </Item>
              </View>

              {/* Content */}

              <View style={styles.container}>
                <View style={{ width: "100%", padding: "5%", backgroundColor: "#F8F8F8" }}>
                  <Text style={{ color: "black", marginBottom: 10 }}>{this.props.str.content}</Text>
                  <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={(e) => { this.setState({ content: e }) }}
                    defaultValue={this.state.content}
                    maxLength={500}
                    // placeholder={}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </View>

              {/* metadisciption */}

              <View style={styles.container}>
                <View style={{ width: "100%", padding: "5%", backgroundColor: "#F8F8F8" }}>
                  <Text style={{ color: "black", marginBottom: 10 }}>{this.props.str.metadisciption}</Text>
                  <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={(e) => { this.setState({ metadisciption: e }) }}
                    defaultValue={this.state.metadisciption}
                    maxLength={500}
                    placeholder={this.props.str.metadisciptionforseo}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </View>


              {/* keywords */}
              <View style={{ width: "100%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>
                <View style={{ marginTop: 0 }}>
                  <Item style={styles.input}>
                    <Input
                      // keyboardType={"numeric"}
                      placeholder={this.props.str.keywords}
                      placeholderStyle={{ fontSize: 10 }}
                      placeholderTextColor="#b3b3b3"
                      label={this.props.str.keywords}
                      style={{ marginLeft: 5, fontSize: 15, }}
                      onChangeText={(e) => { this.setState({ keywords: e }) }}
                      value={this.state.keywords} />
                    <IconEntypo name='keyboard' style={{ marginRight: 15, fontSize: 19, color: "#1E90FF" }} />
                  </Item>
                </View>
              </View>

              <View style={{ width: "90%", marginHorizontal: "5%", justifyContent: "center", alignItems: "center", }}>

                {/* ////////////////////////////////featuredimage///////////////////////////// */}

                <View style={{ marginTop: 15, height: 70, width: "90%", flexDirection: "row", borderWidth: 1, borderColor: "#1E90FF", borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                  <View style={{ width: "40%", marginVertical: 0, }}>
                    {
                      (this.state.featuredimage != null) ? (
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginHorizontal: "10%", marginVertical: 5, flexWrap: "wrap" }}>
                          <Image style={{ height: 55, width: 55, marginHorizontal: 6, marginTop: 2 }} source={{ uri: this.state.featuredimage }} />
                        </View>
                      )
                        : <Text style={{ color: "black", fontWeight: "bold" }}>{this.props.str.featuredimage}</Text>
                    }
                  </View>

                  <View style={{ width: "40%", height: 40, marginVertical: 50, justifyContent: "center", alignItems: "center", }}>
                    <TouchableOpacity onPress={this.featuredimage} style={{ backgroundColor: "green", height: 40, width: "90%", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 10 }}>{this.props.str.featuredimage}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {
                (this.state.loaderFlag != true) ? (
                  <TouchableOpacity
                    style={{ marginTop: 25, width: "90%", height: 35, borderWidth: 1, borderRadius: 0, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}
                    onPress={this.addPost.bind(this)}
                  >
                    <Text>{this.props.str.submit}</Text>
                  </TouchableOpacity>
                ) : <ActivityIndicator style={{ top: 20, marginBottom: 20 }} />
              }
            </View>
          </ScrollView>
        </View>
      </View >
    );
  }
}


let mapStateToProps = state => {
  return {
    str: state.root.str,
    userCredentials: state.root.userCredentials

  };
};
function mapDispatchToProps(dispatch) {
  return ({
    setStepsForAddProperties: (steps) => {
      dispatch(setStepsForAddProperties(steps))
    },
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },
  textareaContainer: {
    height: 220,
    width: "110%",
    padding: 5,
    backgroundColor: '#F8F8F8',
    width: "100%"
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },

  contentContainer: {
    paddingBottom: 40,

  },
  listView: {
    width: "100%", height: 35, marginTop: 10,
    borderBottomWidth: 0.5, borderBottomColor: "#BEBCBC",
    justifyContent: 'center'
  },
  listText: {
    marginLeft: 10, color: "#000"
  },

  input: { justifyContent: 'center', alignItems: 'center', width: '90%', },

});  
