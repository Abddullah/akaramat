import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import { Container, Header, Drawer, Left, Body, Right, Title, Item, Input, Picker, Form, Item as FormItem, Button } from 'native-base';
import { StyleSheet, View, Image, Text, AppRegistry, Alert, StatusBar, ImageBackground, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";
import Carousel from 'react-native-carousel-view';



// const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',

    },
    contentContainer: {
        // flex: 1,
        // width:"80%",
        // marginTop: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },


    imgBackground: {
        width: "100%",
        height: "100%",
        backgroundColor: 'transparent',
        position: 'absolute'
    },


})
class WalkThrough extends Component {

    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
        };


    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.percent < 100) {
                this.setState({
                    percent: this.state.percent + 5
                })
            }
        }, 10);


    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Image
                    source={require('../assets/Images/Splash.png')}
                    // resizeMode="contain"
                    style={styles.imgBackground}
                />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor:"red"
                }}>
                    <View style={styles.container}>
                        <Carousel
                            // width={"80%"}
                            height={"100%"}
                            delay={5000}
                            indicatorAtBottom={false}
                            indicatorSize={25}
                            inactiveIndicatorText={'•'}
                            indicatorText="•"
                            indicatorColor="#E94E1B"
                            indicatorAtBottom={true}
                            animate={true}
                            indicatorSpace={10}



                        >
                            {/* //////////////////////////////////////////////////////////////////1st Slide////////////////////////////////////////////////////////////////// */}

                            <View style={styles.contentContainer}>
                                <View style={{ width: "90%", justifyContent: "center", alignItems: "center", }}>


                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 250 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.signupto}
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 20 }}>
                                        <Text style={{ color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.searchinmore}
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 10,
                                        width: "80%",
                                        // backgroundColor: "yellow",
                                    }}>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center", borderRadius: 8, backgroundColor: "#7B6859", borderColor: "white",
                                                borderWidth: 0.5,
                                            }}
                                            onPress={() =>
                                                Actions.signIn()
                                            }
                                        >
                                            <Text style={{ color: "white" }}>{this.props.str.signin}</Text>
                                        </Button>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 8,
                                                borderColor: "#E94E1B",
                                                borderWidth: 0.5,
                                                backgroundColor: "#E94E1B"
                                            }}
                                            onPress={() =>
                                                Actions.signUp()
                                            }
                                        >
                                            <Text style={{ color: "white" }} >{this.props.str.signup}</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>

                            {/* //////////////////////////////////////////////////////////////////2nd Slide////////////////////////////////////////////////////////////////// */}

                            <View style={styles.contentContainer}>
                                <View style={{ width: "90%", justifyContent: "center", alignItems: "center", }}>

                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 250 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.findyourbesttasker}
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 20 }}>
                                        <Text style={{ color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.forfirsttimeinegypt}
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 10,
                                        width: "80%",
                                        // backgroundColor: "yellow",
                                    }}>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center", borderRadius: 8, backgroundColor: "#7B6859", borderColor: "white",
                                                borderWidth: 0.5,
                                            }}
                                            onPress={() =>
                                                Actions.signIn()
                                            }
                                        >
                                            <Text style={{ color: "white" }}>{this.props.str.signin}</Text>
                                        </Button>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 8,
                                                borderColor: "#E94E1B",
                                                borderWidth: 0.5,
                                                backgroundColor: "#E94E1B"
                                            }}
                                            onPress={() =>
                                                Actions.signUp()
                                            }
                                        >
                                            <Text style={{ color: "white" }} >{this.props.str.signup}</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>


                            {/* //////////////////////////////////////////////////////////////////3rd Slide////////////////////////////////////////////////////////////////// */}

                            <View style={styles.contentContainer}>
                                <View style={{ width: "90%", justifyContent: "center", alignItems: "center", }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 250 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.our300representative}
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 20 }}>
                                        <Text style={{ color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.ifyouneedourhelpto}

                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 10,
                                        width: "80%",
                                        // backgroundColor: "yellow",
                                    }}>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center", borderRadius: 8, backgroundColor: "#7B6859", borderColor: "white",
                                                borderWidth: 0.5,
                                            }}
                                            onPress={() =>
                                                Actions.signIn()
                                            }
                                        >
                                            <Text style={{ color: "white" }}>{this.props.str.signin}</Text>
                                        </Button>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 8,
                                                borderColor: "#E94E1B",
                                                borderWidth: 0.5,
                                                backgroundColor: "#E94E1B"
                                            }}
                                            onPress={() =>
                                                Actions.signUp()
                                            }
                                        >
                                            <Text style={{ color: "white" }} >{this.props.str.signup}</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>

                            {/* //////////////////////////////////////////////////////////////////4th Slide////////////////////////////////////////////////////////////////// */}

                            <View style={styles.contentContainer}>
                                <View style={{ width: "90%", justifyContent: "center", alignItems: "center", }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 250 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.thousandsofagents}
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 20 }}>
                                        <Text style={{ color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.onlyinourappyoucan}

                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 10,
                                        width: "80%",
                                        // backgroundColor: "yellow",
                                    }}>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center", borderRadius: 8, backgroundColor: "#7B6859", borderColor: "white",
                                                borderWidth: 0.5,
                                            }}
                                            onPress={() =>
                                                Actions.signIn()
                                            }
                                        >
                                            <Text style={{ color: "white" }}>{this.props.str.signin}</Text>
                                        </Button>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 8,
                                                borderColor: "#E94E1B",
                                                borderWidth: 0.5,
                                                backgroundColor: "#E94E1B"
                                            }}
                                            onPress={() =>
                                                Actions.signUp()
                                            }
                                        >
                                            <Text style={{ color: "white" }} >{this.props.str.signup}</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>

                            {/* //////////////////////////////////////////////////////////////////5th Slide////////////////////////////////////////////////////////////////// */}

                            <View style={styles.contentContainer}>
                                <View style={{ width: "90%", justifyContent: "center", alignItems: "center", }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 250 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.specialprograms}
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 20 }}>
                                        <Text style={{ color: "#ffff", textAlign: "center" }}>
                                            {this.props.str.wehavecustomized}

                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 10,
                                        width: "80%",
                                        // backgroundColor: "yellow",
                                    }}>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center", borderRadius: 8, backgroundColor: "#7B6859", borderColor: "white",
                                                borderWidth: 0.5,
                                            }}
                                            onPress={() =>
                                                Actions.signIn()
                                            }
                                        >
                                            <Text style={{ color: "white" }}>{this.props.str.signin}</Text>
                                        </Button>
                                        <Button
                                            style={{
                                                width: "45%", height: 55, justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 8,
                                                borderColor: "#E94E1B",
                                                borderWidth: 0.5,
                                                backgroundColor: "#E94E1B"
                                            }}
                                            onPress={() =>
                                                Actions.signUp()
                                            }
                                        >
                                            <Text style={{ color: "white" }} >{this.props.str.signup}</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </Carousel>
                    </View>
                </View>


            </View >


            // <View style={{ flex: 1 }}>
            //     <StatusBar barStyle="light-content" />

            //     <Image
            //         source={require('../assets/Images/Splash.png')}
            //         // resizeMode="contain"
            //         style={styles.imgBackground}
            //     />


            //     <Swiper
            //         style={styles.wrapper}
            //         showsButtons={false}
            //         activeDotColor={'#E94E1B'}
            //     >




            //         <View
            //             style={styles.slide1}
            //         // style={{ backgroundColor: '#7B6859' }}
            //         >
            //             {/* <Text style={styles.text}>Hello Swiper</Text> */}

            //             <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 140 }}>
            //                 <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffff", textAlign: "center" }}>
            //                     {this.props.str.signupto}
            //                 </Text>
            //             </View>
            //             <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 20 }}>
            //                 <Text style={{ color: "#ffff", textAlign: "center" }}>
            //                     {this.props.str.searchinmore}
            //                 </Text>
            //             </View>
            //             <View style={{
            //                 flexDirection: "row",
            //                 marginTop: 25,
            //                 justifyContent: "space-between",
            //                 alignItems: "center",
            //                 marginBottom: 10,
            //                 width: "80%",
            //                 // backgroundColor: "yellow",
            //             }}>
            //                 <Button
            //                     style={{
            //                         width: "45%", height: 55, justifyContent: "center",
            //                         alignItems: "center", borderRadius: 8, backgroundColor: "#7B6859", borderColor: "white",
            //                         borderWidth: 0.5,
            //                     }}
            //                     onPress={() =>
            //                         Actions.signIn()
            //                     }
            //                 >
            //                     <Text style={{ color: "white" }}>{this.props.str.signin}</Text>
            //                 </Button>
            //                 <Button
            //                     style={{
            //                         width: "45%", height: 55, justifyContent: "center",
            //                         alignItems: "center",
            //                         borderRadius: 8,
            //                         borderColor: "#E94E1B",
            //                         borderWidth: 0.5,
            //                         backgroundColor: "#E94E1B"
            //                     }}
            //                 // onPress={() =>
            //                 //     Actions.signUp()
            //                 // }
            //                 >
            //                     <Text style={{ color: "white" }} >{this.props.str.signup}</Text>
            //                 </Button>
            //             </View>



            //         </View>
            //         <View style={styles.slide2}
            //         // style={{ activeDotColor: '#7B6859' }}
            //         >
            //             {/* <Text style={styles.text}>Beautiful</Text> */}

            //             <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 140 }}>
            //                 <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffff", textAlign: "center" }}>
            //                     {this.props.str.findyourbesttasker}
            //                 </Text>
            //             </View>
            //             <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 20 }}>
            //                 <Text style={{ color: "#ffff", textAlign: "center" }}>
            //                     {this.props.str.forfirsttimeinegypt}
            //                 </Text>
            //             </View>
            //             <View style={{
            //                 flexDirection: "row",
            //                 marginTop: 25,
            //                 justifyContent: "space-between",
            //                 alignItems: "center",
            //                 marginBottom: 10,
            //                 width: "80%",
            //                 // backgroundColor: "yellow",
            //             }}>
            //                 <Button
            //                     style={{
            //                         width: "45%", height: 55, justifyContent: "center",
            //                         alignItems: "center", borderRadius: 8, backgroundColor: "#7B6859", borderColor: "white",
            //                         borderWidth: 0.5,
            //                     }}
            //                     onPress={() =>
            //                         Actions.signIn()
            //                     }
            //                 >
            //                     <Text style={{ color: "white" }}>{this.props.str.signin}</Text>
            //                 </Button>
            //                 <Button
            //                     style={{
            //                         width: "45%", height: 55, justifyContent: "center",
            //                         alignItems: "center",
            //                         borderRadius: 8,
            //                         borderColor: "#E94E1B",
            //                         borderWidth: 0.5,
            //                         backgroundColor: "#E94E1B"
            //                     }}
            //                 // onPress={() =>
            //                 //     Actions.signUp()
            //                 // }
            //                 >
            //                     <Text style={{ color: "white" }} >{this.props.str.signup}</Text>
            //                 </Button>
            //             </View>
            //         </View>
            //         <View style={styles.slide3}

            //         >

            //             {/* <Text style={styles.text}>And simple</Text> */}

            //             <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 140 }}>
            //                 <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffff", textAlign: "center" }}>
            //                     {this.props.str.our300representative}
            //                 </Text>
            //             </View>
            //             <View style={{ justifyContent: "center", alignItems: "center", width: "90%", marginTop: 20 }}>
            //                 <Text style={{ color: "#ffff", textAlign: "center" }}>
            //                     {this.props.str.ifyouneedourhelpto}

            //                 </Text>
            //             </View>
            //             <View style={{
            //                 flexDirection: "row",
            //                 marginTop: 25,
            //                 justifyContent: "space-between",
            //                 alignItems: "center",
            //                 marginBottom: 10,
            //                 width: "80%",
            //                 // backgroundColor: "yellow",
            //             }}>
            //                 <Button
            //                     style={{
            //                         width: "45%", height: 55, justifyContent: "center",
            //                         alignItems: "center", borderRadius: 8, backgroundColor: "#7B6859", borderColor: "white",
            //                         borderWidth: 0.5,
            //                     }}
            //                     onPress={() =>
            //                         Actions.signIn()
            //                     }
            //                 >
            //                     <Text style={{ color: "white" }}>{this.props.str.signin}</Text>
            //                 </Button>
            //                 <Button
            //                     style={{
            //                         width: "45%", height: 55, justifyContent: "center",
            //                         alignItems: "center",
            //                         borderRadius: 8,
            //                         borderColor: "#E94E1B",
            //                         borderWidth: 0.5,
            //                         backgroundColor: "#E94E1B"
            //                     }}
            //                 // onPress={() =>
            //                 //     Actions.signUp()
            //                 // }
            //                 >
            //                     <Text style={{ color: "white" }} >{this.props.str.signup}</Text>
            //                 </Button>
            //             </View>
            //         </View>

            //     </Swiper>
            // </View>


        )
    }
}



let mapStateToProps = state => {
    return {
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        str: state.root.str


    };
};
function mapDispatchToProps(dispatch) {
    return ({
        languageSet: (lang) => {
            dispatch(languageSet(lang))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(WalkThrough);