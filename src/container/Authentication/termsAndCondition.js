import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    Picker,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import {
    Container, Header, Content, Tab, Tabs, Button, Input,
    Item, View, CheckBox, H2
} from 'native-base';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux'
import { setCountries, } from '../../Store/Action/action';
import axios from 'axios';
// import { signupassallerorbuyer } from "../../../services/API/signup"
// import ErrorMessage from '../../Component/errorMessage';
import { Ionicons } from '@expo/vector-icons';
import { TextField } from 'react-native-material-textfield';
import * as Animatable from 'react-native-animatable';



class TermsAndCondition extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: "white",
                width: "100%"
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
                    <View style={{ width: "90%", flexDirection: "row", marginTop: "7%" }}>
                        <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: 16 }}>{this.props.str.termsandcondition}</Text>
                    </View>
                </View>

                <View style={{ flex: 8, width: "100%", }}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={{ width: "90%", marginHorizontal: "5%" }}>

                            <H2 style={{ marginTop: 15 }}>{this.props.str.termsandcondition}</H2>

                            <Text style={{ marginTop: 15 }}>{this.props.str.thetermakaratmisr}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.thecontentofthe}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.neitherwenot}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.youruseofanyinformation}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.thiswebsitecontains}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.alltrademarks}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.youruseofthis}</Text>

                            <H2 style={{ marginTop: 15 }}>{this.props.str.refundpolicy}</H2>

                            <Text style={{ marginTop: 15 }}>{this.props.str.duetothenatureofour}</Text>

                            <H2 style={{ marginTop: 15 }}>{this.props.str.websitedisclaimer}}</H2>

                            <Text style={{ marginTop: 15 }}>{this.props.str.theinformationcontainedinthis}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.innoeventwillwebe}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.everyeffortismadeto}</Text>

                            <H2 style={{ marginTop: 15 }}>{this.props.str.privacypolicy}</H2>

                            <Text style={{ marginTop: 15 }}>{this.props.str.thisprivacy}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.akaratmisrcomiscommitted}</Text>

                            <H2 style={{ marginTop: 15 }}>{this.props.str.security}</H2>

                            <Text style={{ marginTop: 15 }}>{this.props.str.wearecommittedtoensuringthat}</Text>

                            <H2 style={{ marginTop: 15 }}>{this.props.str.paidservices}</H2>

                            <Text style={{ marginTop: 15 }}>{this.props.str.theclientagress}</Text>

                            <Text style={{ marginTop: 15, marginLeft: "7%" }}>{this.props.str.akaratmisrcomreservesthe}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.theclientagressto}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.pointspurchasedby}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.theclientcan}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.akaratmisrcomisnotresponsibleforanymistakes}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.akaratmisrcomisnotresponsibleforpoints}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.thecompanycanstopusingthe}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.akaratmisrcomwebsitecanstop}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.theclientcannotpost}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.theclientcommitsto}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.theclientcannotusehis}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.akaratmisrcomcancloseany}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.theclientcannotshellhis}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.akaratmisrcomreservestheright}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.theclientisresonsibleforthe}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.companiescannotusethe}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.eachpaidlistingremainslive}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.akaratmisrcomisnotresponsibleifthe}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.eachlistingshould}</Text>

                            <Text style={{ marginTop: 5, marginLeft: "7%" }}>{this.props.str.itsnotallowedtochange}</Text>

                            <H2 style={{ marginTop: 15 }}>{this.props.str.howweusecookies}</H2>

                            <Text style={{ marginTop: 15 }}>{this.props.str.acookieisasmallfile}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.weusetrafficlog}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.overallcookieshelpus}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.youcanchoseto}</Text>

                            <H2 style={{ marginTop: 15 }}>{this.props.str.linktootherwebsites}</H2>

                            <Text style={{ marginTop: 15 }}>{this.props.str.ourwebsitemay}</Text>

                            <Text style={{ marginTop: 15 }}>{this.props.str.ifyoubelievethatany}</Text>


                            {/* <Text style={{ marginTop: 15 }}></Text>
                            <H2 style={{ marginTop: 15 }}></H2>
                            <Text style={{ marginTop: 5, marginLeft: "7%" }}></Text> */}

                        </View>
                    </ScrollView>
                </View>

            </View >
        );
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
        // setCountries: (data) => {
        //     dispatch(setCountries(data))
        // },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCondition);


const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 70,
        backgroundColor: "white",

    },


});