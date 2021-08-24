import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, StatusBar, RefreshControl,
    Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Badge, Picker, Item } from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';
import { ImagePicker, Permissions, Constants, FileSystem } from 'expo';
// import Drawer from '../../Component/drawer';
import ApplyTask from '../Component/applyTask';
import InfiniteScroll from 'react-native-infinite-scroll';
import SendMsgToTasker from "../Component/sendMsgToTasker";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
class MyPhotosBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gallery1: null,
            gallery2: null,
            gallery3: null,
            gallery4: null,
            gallery5: null,
            gallery6: null,
            selectedValue0: "Actions",
            activity: false,
            moreloader: false,
            emailSendingFlag: false,
            emailSendingFlag1: false,
            isloader: true,
            isModalVisible: false,
            featuredimage: null,
            featuredimageLocal: null,
            borderColorRend: [],
            page: 0,

        }
    }
    componentWillMount() {

        var { height, width } = Dimensions.get('window');
        this.setState({
            screenHeight: height,
            screenWidth: width,
        })

        this.setState({
            token: this.props.userCredentials.token,
        }, () => {
            console.log(this.state.token, this.props.userCredentials.token, "token", "tasker")
        })
        this._onRefreshTasker()
    }
    requestOnServer = (functionName, uri, id) => {
        console.log(functionName, uri, "functionName, uri", this.props.userCredentials.token)
        return axios({
            method: 'get',
            url: uri,
            headers: {
                "token": `bearer ${this.props.userCredentials.token}`,
                'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
                'cache-control': 'no-cache',
                "clientsecret": '(*jh2kj36gjhasdi78743982u432j',
                "clientkey": '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                "Allow-Cross-Origin": '*',
            },
        }).then(data => {
            if (functionName === "_onRefreshTasker") {
                console.log(data.data.results, "response");
                this.setState({
                    taskerData: data.data.results,
                    isloader: false,
                    page: 10,
                    borderColorRend: [],
                    delete: null
                    // selectedValue: data.data.results.status === "Active" ? "Deactive" : "Active"
                })
            }
            else if (functionName === "_onEndReached") {
                let clonetaskerData = this.state.taskerData
                let responseAPI = data.data.results
                for (var i = 0; i < responseAPI.length; i++) {
                    clonetaskerData.push(responseAPI[i])
                }
                console.log(responseAPI, "reachend")
                this.setState({
                    moreloader: false,
                    page: this.state.page + 10,
                    taskerData: clonetaskerData
                })
            }
            else if (functionName === "onChangeStatus") {
                console.log(data.data.results, "response");
                alert(data.data.message)
                this._onRefreshTasker()

            }

        }).catch(err => {
            var errUpdate = JSON.stringify(err);
            console.log(JSON.parse(errUpdate));
            console.log(err)
            alert(err.message)
            this.setState({
                err: err.message,
                isloader: false
            })
        })

    }
    _onRefreshTasker(bol) {
        console.log("work", this.state.token)
        let uri;
        this.setState({
            isloader: bol ? null : true
        })

        uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/people/guest/getUserDetail/" + this.props.userCredentials.user_id

        this.requestOnServer("_onRefreshTasker", uri)
    }
    _onEndReached() {
        alert("word")
        this.setState({
            moreloader: true
        })
        let uri;
        if (this.props.rout === "RequestsRepresent") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/guest/getProjectsList/10/" + this.state.page
        }
        else if (this.props.rout === "allTaskInCity") {
            console.log("work")
            uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/task/user/getTasksInCity/10/" + this.state.page
        }

        this.requestOnServer("_onEndReached", uri)
    }
    onChangeStatus = (value, id, status, index, obj) => {
        console.log(value, id, status, "value", obj)
        this.setState({
            [`selectedValue ${index}`]: value
        })
        if (value === this.props.str.deactivate) {
            console.log("workk")
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/user/disactiveProject/" + id
            this.requestOnServer("onChangeStatus", uri, id)
        }
        else if (value === this.props.str.active) {
            let uri = "https://demo.akaratmisr.com:443/" + this.props.str.language + "/api/project/user/disactiveProject/" + id
            this.requestOnServer("onChangeStatus", uri, id)
        }

    }
    concate() {
        alert("worki h")
        // console.log(DataOfTasker,"monkey")
        // for(var i = 0; i<DataOfTasker.length;i++){
        //     console.log(DataOfTasker[i],"wah",i)

        // }
    }
    routeChange(DataOfTasker) {
        // alert("chalu"+iAdded)
        Actions.FithPageList({ propertyData: DataOfTasker })
    }


    featuredimage = async () => {
        this.setState({
            borderColorRend: [],
            delete: false,
        })
        // alert("work")
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
        });
        console.log(result, "result");
        if (!result.cancelled) {
            // let uri= result.uri
            // console.log(uri, "uri");
            // // uri.replace("file://", "");
            // var res = uri.replace("file://", "");
            console.log(result, "result");
            this.getFileSize(result.uri).then((size) => {
                let inkb = size / 1024
                let inMb = inkb / 1024
                console.log(inMb, "size")
                if (inMb < 2) {
                    this.setState({ featuredimage: result.uri, featuredimageLocal: result.uri, });
                }
                else {
                    alert(this.props.str.imagesizetolarge)
                }
            })



        }
    }
    getFileSize = async fileUri => {
        let fileInfo = await FileSystem.getInfoAsync(fileUri);
        return fileInfo.size;
    };
    imageAttach(old) {
        var bodyFormData = new FormData();
        // if (this.state.featuredimage) {
        this.setState({
            isloader: true
        })
        console.log("featuredimage", old.gallery_src);

        // featuredimage
        // let uriPartsProfile = this.state.featuredimage.split('.');
        // let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        // bodyFormData.append('gallery[0]', {
        //     uri: this.state.featuredimage,
        //     name: `photo.${fileTypeProfile}`,
        //     type: `image/${fileTypeProfile}`,
        // });

        for (var i = 1; i <= old.gallery_src.length; i++) {
            console.log(`gallery[${i}]`, i, `gallery$[i]`)
            let uriPartsProfile = old.gallery_src[i - 1].split('.');
            let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
            bodyFormData.append(`gallery[${i - 1}]`, {
                uri: old.gallery_src[i - 1],
                name: `photo.${fileTypeProfile}`,
                type: `image/${fileTypeProfile}`,
            });
        }
        console.log(bodyFormData, "bodyFormData");
        // if (old.length > 0) {
        //     let uriPartsProfile = old[0].split('.');
        //     let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        //     bodyFormData.append('oldgallery[0]', {
        //         uri: old[0],
        //         name: `photo.${fileTypeProfile}`,
        //         type: `image/${fileTypeProfile}`,
        //     }
        //     );
        //     console.log('oldgallery[]', bodyFormData, this.state.token, this.state.featuredimage, fileTypeProfile)
        // }

        // if (this.state.taskerData.length > 0) {
        //     for(var i =0; i<this.state.taskerData.length;i++){

        //         // featuredimage
        //         let uriPartsProfile = this.state.featuredimage.split('.');
        //         let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
        //         bodyFormData.append('gallery[]', {
        //             uri: this.state.taskerData[i]
        //             // name: `photo.${fileTypeProfile}`,
        //             // type: `image/${fileTypeProfile}`,
        //         });
        //     }


        // }

        var options = {
            method: 'POST',
            url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/user/updateGallery',
            headers:
            {
                token: "bearer " + this.state.token,
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',

            },
            data: bodyFormData
        };
        console.log(bodyFormData, '****61');
        axios(options)
            .then((data) => {
                console.log(data, "data ressppp", data.data)
                // alert(JSON.stringify(data.data.message))
                // Actions.tabbar({ type: "reset" });
                // Actions.tabNavigation();
                this.setState({
                    loaderFlag: !this.state.loaderFlag,
                    featuredimage: null,
                    featuredimageLocal: null,
                    gallery1: null,
                    gallery2: null,
                    gallery3: null,
                    gallery4: null,
                    gallery5: null,
                    gallery6: null,
                })
                if (data.data.results === "0") {
                    alert(this.props.str.imgHasBeen)
                }
                else {
                    alert(data.data.results)
                }
                this._onRefreshTasker()
            }).catch((err) => {
                console.log(err, 'ERRROR')
                this.setState({
                    loaderFlag: !this.state.loaderFlag,
                    isloader: false,

                })
            })

        // }
        // else {
        //     alert(this.props.str.selectPhoto)
        //     this.setState({
        //         loaderFlag: !this.state.loaderFlag,
        //         isloader: false,
        //     })
        // }
    }
    delete() {
        // let taskerData.gallery_src
        console.log(this.state.taskerData, "aaa", this.state.deleteIndex)
        let flag = true
        let taskerDataClone = this.state.taskerData
        taskerDataClone.gallery.splice(this.state.deleteIndex, 1)
        taskerDataClone.gallery_src.splice(this.state.deleteIndex, 1)
        this.setState({
            borderColorRend: [],
            delete: null
        })
        var bodyFormData = new FormData();
        console.log(taskerDataClone.gallery_src, "aaasssrccc")
        if (taskerDataClone.gallery_src.length > 0) {
            // alert("if")
            for (var i = 0; i < taskerDataClone.gallery_src.length; i++) {
                console.log(`gallery[${i}]`, i, "------------------")
                let uriPartsProfile = taskerDataClone.gallery_src[i].split('.');
                let fileTypeProfile = uriPartsProfile[uriPartsProfile.length - 1];
                bodyFormData.append(`gallery[${i}]`, {
                    uri: taskerDataClone.gallery_src[i],
                    name: `photo.${fileTypeProfile}`,
                    type: `image/${fileTypeProfile}`,
                });
            }
        }
        else {
            // alert("else")
            bodyFormData.append("gallery[0]", undefined);
            flag = false
        }
        console.log(bodyFormData, "boooody")
        var options = {
            method: 'POST',
            url: 'https://demo.akaratmisr.com:443/' + this.props.str.language + '/api/people/user/updateGallery',
            headers:
            {
                token: "bearer " + this.state.token,
                clientsecret: '(*jh2kj36gjhasdi78743982u432j',
                clientkey: '34532hbjdsakjd2&&gjhjh11',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',

            },
            data: flag === true ? bodyFormData : null
        };
        axios(options)
            .then((data) => {
                this._onRefreshTasker(true)
                // alert("delet")
                console.log(data, "delets ressppp", data.data)
            }).catch((err) => {
                console.log(err, 'ERRROR')
                let error = JSON.stringify(err)
                console.log(JSON.parse(error))

                // console.log(JSON.stringify(err.))


                this.setState({
                    // loaderFlag: !this.state.loaderFlag,
                    // isloader: false,
                })
            })

        console.log(taskerDataClone, "taskerDataClone")
    }
    _toggleModal(close) {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        let taskerDataClone;
        if (this.state.taskerData && close &&
            (this.state.gallery1 || this.state.gallery2 || this.state.gallery3 || this.state.gallery4
                || this.state.gallery5 || this.state.gallery6)) {
            // alert("aa",close)
            taskerDataClone = this.state.taskerData
            for (var i = 1; i < 7; i++) {
                let state =
                    console.log(this.state[`gallery${i}`], "**///")
                if (this.state[`gallery${i}`]) {
                    taskerDataClone.gallery_src.push(this.state[`gallery${i}`])
                }
            }
            this.setState({
                taskerData: taskerDataClone
            })
            this.imageAttach(taskerDataClone)

        }
    }

    galleryImage = async (serial) => {
        let result = await ImagePicker.launchImageLibraryAsync({
        });
        console.log(result, "resultphoto");
        if (!result.cancelled) {
            this.setState({ [`gallery${serial}`]: result.uri, });
        }
    };


    render() {
        // alert(this.props.userCredentials.user_id, "555")
        return (
            <>
                <View >
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 0.4, justifyContent: 'center', alignItems: "center" }}>
                            <View style={{ width: "80%", flex: 1, justifyContent: "center", alignItems: "center", }}>
                                <View style={{ flex: 0.8, flexWrap: "wrap", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("1") }}>
                                        {
                                            (this.state.gallery1) ? (
                                                <Image source={{ uri: this.state.gallery1 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center",  }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("2") }}>
                                        {
                                            (this.state.gallery2) ? (
                                                <Image source={{ uri: this.state.gallery2 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("3") }}>
                                        {
                                            (this.state.gallery3) ? (
                                                <Image source={{ uri: this.state.gallery3 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("4") }}>
                                        {
                                            (this.state.gallery4) ? (
                                                <Image source={{ uri: this.state.gallery4 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("5") }}>
                                        {
                                            (this.state.gallery5) ? (
                                                <Image source={{ uri: this.state.gallery5 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "white", width: "30%", height: "46%", margin: "1%", justifyContent: "center", alignItems: "center" }} onPress={() => { this.galleryImage("6") }}>
                                        {
                                            (this.state.gallery6) ? (
                                                <Image source={{ uri: this.state.gallery6 }} style={{ width: 55, height: 55, marginHorizontal: 6, marginTop: 2 }} />
                                            ) : (
                                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image style={{ height: 55, width: 55, }} source={require("../assets/Images/defaultImage.png")} />
                                                        {/* <Text >Select Image</Text> */}
                                                    </View>
                                                )
                                        }
                                    </TouchableOpacity>

                                </View>

                                <TouchableOpacity style={{ flex: 0.2, backgroundColor: "white", width: "95%", height: "10%", justifyContent: "center", alignItems: "center" }} onPress={() => this._toggleModal(true)}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>{this.props.str.Select}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>




                {(this.state.delete) ?
                    (
                        <View >

                            <TouchableOpacity
                                style={{ position: "absolute", zIndex: 1, bottom: 12, right: 40 }}
                                onPress={() => { this.delete() }}  >

                                <AntDesign name='delete' style={{ color: "#fff", fontWeight: "bold", fontSize: 27, }} />
                            </TouchableOpacity>
                        </View>
                    ) :
                    (null)}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({
                            borderColorRend: [],
                            delete: false
                        })

                    }} style={{
                        flex: 1, width: "100%",
                        // backgroundColor:"red"
                    }}>

                    {/* //////////////////////////////////////Properties i added////////////////////////////////////// */}
                    {
                        // (this.state.taskerData) ? (
                        (this.state.isloader === true || !this.state.taskerData) ? (
                            <View style={{
                                justifyContent: 'center',
                                alignItems: "center",
                                height: this.state.screenHeight / 1.25
                            }}>
                                <ActivityIndicator size="large" color="#E94E1B" />
                                <Text style={{ marginTop: 10 }} >Loading....</Text>
                            </View>
                        ) : <InfiniteScroll
                            horizontal={false}  //true - if you want in horizontal
                            // onLoadMoreAsync={this._onEndReached.bind(this, "_onEndReached")}
                            distanceFromEnd={12} // distance in density-independent pixels from the right end
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.activity}
                                    onRefresh={this._onRefreshTasker.bind(this, "_onRefreshTasker")} />
                            }
                        >

                                {
                                    (this.state.taskerData.length != 0) ? (
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 5 }}>
                                            {
                                                this.state.taskerData.gallery_src.map((DataOfTasker, index) => {
                                                    console.log(DataOfTasker, index, "DataOfTasker, index")
                                                    return (
                                                        <TouchableOpacity
                                                            activeOpacity={0.6}
                                                            onLongPress={() => {
                                                                let cloneborderColorRend = this.state.borderColorRend
                                                                cloneborderColorRend.splice(0, 1, index)
                                                                this.setState({
                                                                    borderColorRend: cloneborderColorRend,
                                                                    delete: true,
                                                                    deleteData: DataOfTasker,
                                                                    deleteIndex: index
                                                                }, () => { console.log("wrk", this.state.deleteIndex) })
                                                            }}
                                                            onPress={() => { Actions.FullImage({ DataOfTasker }) }} style={{}}>
                                                            <Image
                                                                style={{ margin: 2, width: this.state.screenWidth / 3.2, height: this.state.screenWidth / 3.2, borderWidth: this.state.borderColorRend[0] === index ? 2.5 : 1, borderColor: this.state.borderColorRend[0] === index ? "orange" : "#908073" }}
                                                                source={{ uri: DataOfTasker }}
                                                            />
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                            {
                                                (this.state.featuredimageLocal) ? (
                                                    <TouchableOpacity onPress={() => Actions.FullImage({ DataOfTasker: this.state.featuredimageLocal })}>
                                                        <Image style={{ margin: 2, width: this.state.screenWidth / 3.2, height: this.state.screenWidth / 3.2, borderWidth: 1, borderColor: "#908073" }} source={{ uri: this.state.featuredimageLocal }} />
                                                    </TouchableOpacity>
                                                )
                                                    : null
                                            }
                                            <TouchableOpacity

                                                // onPress={this.featuredimage}
                                                onPress={() => this._toggleModal()}


                                                style={{ margin: 2, width: this.state.screenWidth / 3.2, height: this.state.screenWidth / 3.2, borderWidth: 1, borderColor: "#908073", justifyContent: "center", alignItems: "center" }}>
                                                {/* <Image
                                                    style={{ margin: 2, width: this.state.screenWidth / 3.2, height: this.state.screenWidth / 3.2, borderWidth: 1, borderColor: "#908073" }}
                                                    source={{ uri: "https://pngimage.net/wp-content/uploads/2018/05/add-image-png-8.png" }}
                                                /> */}


                                                <MaterialIcons name="add-circle-outline" size={75} style={{}} />
                                            </TouchableOpacity>

                                            {
                                                (this.state.moreloader === true) ? (
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        alignItems: "center",
                                                        marginBottom: 20,
                                                        marginTop: 20,
                                                    }}>
                                                        <ActivityIndicator size="large" color="#E94E1B" />
                                                    </View>
                                                ) : null
                                            }
                                        </View>

                                    ) : null
                                }
                                {/* {(this.state.isloader) ?
                                    (
                                        <ActivityIndicator size="large" color="#E94E1B" />
                                    ) :
                                    (
                                        <TouchableOpacity style={{ margin: 10, backgroundColor: "#E94E1B", width: "25%", height: "10%", justifyContent: "center", alignItems: "center" }}
                                            onPress={() => this.imageAttach(this.state.taskerData.gallery_src)}>
                                            <Text style={{ fontSize: 13, color: "white" }}>{this.props.str.save}</Text>
                                        </TouchableOpacity>
                                    )} */}

                            </InfiniteScroll>
                        // ) : null
                    }


                </TouchableOpacity >
            </>
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
        // languageSet: (lang) => {
        //     dispatch(languageSet(lang))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPhotosBody);
const styles = StyleSheet.create({
});  
