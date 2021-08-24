import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image
} from "react-native";
import { Router, Scene, Actions, Tabs } from "react-native-router-flux";
import AccountIcon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchIcon from "react-native-vector-icons/FontAwesome5";
import BrowseIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Browse from "../container/Browse";
import Search from "../container/Search/search";
import SearchForProperties from "../container/Search/FindProperties/searchforproperties";
import SecondPageList from "../container/Browse/2nd page list";
import ThirdPageList from "../container/Browse/3rd page list";
import ForthPageList from "../container/Browse/4th page list";
import FithPageList from "../container/Browse/5th page list";
import Results from "../container/Search/FindProperties/result";
import FindRepresentative from "../container/Search/FindRepresentative/findRepresentative";
import FindAgent from "../container/Search/FindAgent/findAgent";
import FindTask from "../container/Search/FindTask/findTask";
import FindTasker from "../container/Search/FindTasker/findTasker";
import FindInternational from "../container/Search/FindInteNationalPartner/findInternational";
import FindReq from "../container/Search/FindRequest/findReq";
import Modal from "../container/Search/FindRepresentative/modal";
import Account from "../container/MyAccount/Account";
import PropertiesIAdded from "../container/MyAccount/PropertiesIAdded";
import MyBuyRequests from "../container/MyAccount/MyBuyRequests";
import myRequiredTask from "../container/MyAccount/myRequiredTask";
import myProjects from "../container/MyAccount/myProjects";
import myPhotos from "../container/MyAccount/myPhotos";
import AllTaskInMyCity from "../container/MyAccount/allTaskInMyCity";
import allTaskInMyState from "../container/MyAccount/allTaskInMyState";
import myPreviousTask from "../container/MyAccount/myPreviousTask";
import TaskIAppliedFor from "../container/MyAccount/taskIAppliedFor";
import taskIWorkOnThem from "../container/MyAccount/taskIWorkOnThem";
import listOfapplyTask from "../container/MyAccount/listOfapplyTask";
import propertiesFavorite from "../container/MyAccount/propertiesFavorite";
import agentFavorites from "../container/MyAccount/agentFavorites";
import taskerFavorites from "../container/MyAccount/taskerFavorites";
import intPartFavorites from "../container/MyAccount/intPartFavorites";
import representativeFavorites from "../container/MyAccount/representativeFavorites";
import Agents from "../container/MyAccount/Agents";
import Projects from "../container/MyAccount/Projects";
import myBlogs from "../container/MyAccount/myBlogs";
import TaskersInCity from "../container/MyAccount/Taskers";
import Tasks from "../container/MyAccount/Tasks";
import Properties from "../container/MyAccount/Properties";
import pendingProperties from "../container/MyAccount/pendingProperties";
import tasksFavorites from "../container/MyAccount/tasksFavorites";
import requestsFavorites from "../container/MyAccount/requestsFavorites";
import investWithUs from "../container/MyAccount/investWithUs";
import searchesSave from "../container/MyAccount/searchesSave";
import createMessage from "../container/MyAccount/createMessage";
import outbox from "../container/MyAccount/outbox";
import MyInbox from "../container/MyAccount/myInbox";
import InboxMsgToRep from "../container/MyAccount/InboxMsgToRep";
import allPropertiesInMyCity from "../container/MyAccount/allPropertiesInMyCity";
import allRequestInCity from "../container/MyAccount/allRequestInCity";
import AddScreen from "../container/Add/add";
import AddProperty from "../container/Add/add properties/index";
import AddRequest from "../container/Add/add request/index";
import AddTask from "../container/Add/add task/index";
import AddProject from "../container/Add/add project/index";
import AddBlog from "../container/Add/add blog/index";
import addInvestor from "../Component/addInvestor";
import addInvestorMoney from "../Component/addInvestorMoney";
import Rating from "../Component/rating";
import SelectServices from "../Component/SelectServices";
import SearchLocation from "../Component/SearchLocation";
import Applicants from '../Component/applicantsList'
import FullImage from '../Component/fullImage'
import MyPayments from "../Component/MyPayments";
import PromoteMyAds from "../Component/PromoteMyAds";
import PromoteOurSite from "../Component/PromoteOurSite";
import review from "../Component/review";
import register from "../Component/register";
import OurNetwork from "../Component/OurNetwork";
import HaveFund from "../Component/HaveFund";
import HaveAsset from "../Component/HaveAsset";
import BannerAds from "../Component/BannerAds";
import AdvertiseWithUs from "../Component/AdvertiseWithUs";
import buyAds from "../Component/buyAds";
import AdvertiseDetails from "../Component/AdvertiseDetails";
import ServiceProvider from '../Component/serviceprovider'
import Contact from '../Component/Contactus'
import googlemapfullview from "../Component/googlemapfullview";
import distanceInformation from "../Component/distanceInformation";
import Profile from "../Component/Profile";
import WebView from "../Component/WebView";
import { connect } from "react-redux";
import MyVerificationAction from '../Component/verificationAction/MyVerificationAction';
import Login from '../container/Authentication/signIn'
// import Route from '../../src/navigation/Routes'


const height = 28;
const TabIcon = ({ selected, title }) => {
  return (
    <View>
      <Text style={{ color: selected ? "red" : "black" }}>{title}</Text>;
    </View>
  );
};
// 915021//
// 915021 icon color change//

const IconBrowse = () => {
  return (
    <BrowseIcon color="#908073" name="apps" size={height} />
  );

};
const IconSearch = () => {
  return (
    <AccountIcon color="#908073" name="search" size={height} />
  );
}

const IconAdd = () => {
  return (
    <Ionicons color="#908073" name="md-add-circle-outline" size={height} />
  );
};

const IconMyAccount = () => {
  return (
    <BrowseIcon color="#908073" name="comment-account-outline" size={height} />
  );
}


class TabNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "browse"


    }
  }

  render() {
    // console.log(this.props.childProps,"childProps")
    return (
      // <View style={{ flex: 1, backgroundColor: "red" }}>

      //   {/* header */}
      //   <View style={{ flex: 1.2, backgroundColor: "yellow" }} >

      //   </View>

      //   {/* body */}
      //   <View style={{ flex: 8, backgroundColor: "green" }}>
      //     <Browse />
      //   </View>

      //   {/* footer */}
      //   <View style={{ flex: 0.8, backgroundColor: "orange" }}>
      //     <View style={{ flexDirection: "row", }}>
      //       <TouchableOpacity
      //         onPress={() => {
      //           alert("working")
      //           this.setState({
      //             route: "browse"
      //           })
      //         }
      //         }
      //       >
      //         <IconBrowse />
      //       </TouchableOpacity>

      //       <TouchableOpacity>
      //         <IconSearch />
      //       </TouchableOpacity>

      //       <TouchableOpacity>
      //         <IconAdd />
      //       </TouchableOpacity>

      //       <TouchableOpacity>
      //         <IconMyAccount />
      //       </TouchableOpacity>
      //     </View>


      //   </View>
      // </View>




      <Router
        navigationBarStyle={{ backgroundColor: "#E94E1B" }}
        titleStyle={{ color: "white" }}
        tintColor="white"
      >

        <Scene hideNavBar  >
          <Tabs
            hideTabBar={this.props.tabs}
            key="tabbar"
            hideTabBar={this.props.hidaTabBar}
            // wrap={true}
            // tabs={false}
            tabBarStyle={{ backgroundColor: "#FFFFFF" }}
            activeTintColor="#f27500"
          >

            <Scene title={this.props.str.browse} icon={IconBrowse} hideNavBar={true} >
              <Scene key="browse" component={Browse} />
              <Scene key="SecondPageList" component={SecondPageList} hideNavBar={true} />
              <Scene key="ThirdPageList" component={ThirdPageList} hideNavBar={true} />
              <Scene key="ForthPageList" component={ForthPageList} hideNavBar={true} />
              <Scene key="FithPageList" component={FithPageList} hideNavBar={true} />
              <Scene key="SearchForProperties" component={SearchForProperties} hideNavBar={true} />
              <Scene title={this.props.str.findrequest} key="findreq" component={FindReq} hideNavBar={false} />
              <Scene key="Results" component={Results} hideNavBar={true} />
              <Scene title={this.props.str.applicants} key="Applicants" component={Applicants} />
              <Scene title={this.props.str.locationonmap} key="googlemapfullview" component={googlemapfullview} />
              <Scene title={this.props.str.distanceinformation} key="distanceInformation" component={distanceInformation} />
              <Scene key="MyInbox" hideNavBar={true} component={MyInbox} />
              {/* <Scene key='signIn' component={Login} hideNavBar={true} /> */}
              <Scene key="WebView" hideNavBar={true} component={WebView} />
              <Scene key="createMessage" hideNavBar={true} component={createMessage} />


            </Scene>


            <Scene title={this.props.str.search} icon={IconSearch}>
              <Scene key="search" component={Search} />
              <Scene title={this.props.str.findrepresentative} key="findRepresentative" component={FindRepresentative} />
              <Scene title={this.props.str.modal} key="location" component={Modal} direction="vertical" />
              <Scene title={this.props.str.result} key="searchlocation" component={SearchLocation} direction="vertical" />
              <Scene key="SearchForProperties" component={SearchForProperties} hideNavBar={true} />
              <Scene key="Results" component={Results} hideNavBar={true} />
              <Scene key="ForthPageList" component={ForthPageList} hideNavBar={true} />
              <Scene key="FithPageList" component={FithPageList} hideNavBar={true} />
              <Scene title={this.props.str.distanceinformation} key="distanceInformation" component={distanceInformation} hideNavBar={true} />
              <Scene title={this.props.str.findagent} key="findAgent" component={FindAgent} />
              <Scene title={this.props.str.findtask} key="findTask" component={FindTask} />
              <Scene title={this.props.str.findrequest} key="findreq" component={FindReq} />
              <Scene title="Services " key="selectServices" component={SelectServices} />
              <Scene title={this.props.str.findtasker} key="findTasker" component={FindTasker} />
              <Scene title={this.props.str.findinternationalpartner} key="findInternational" component={FindInternational} />
            </Scene>


            <Scene title={this.props.str.add} icon={TabIcon} icon={IconAdd}>
              <Scene title={this.props.str.add} key="addcheck" component={AddScreen} />
              <Scene title={this.props.str.addproperties} key="AddProperty" component={AddProperty} hideTabBar={true} />
              <Scene title={this.props.str.addrequest} key="AddRequest" component={AddRequest} hideTabBar={true} />
              <Scene title={this.props.str.addtask} key="AddTask" component={AddTask} hideTabBar={true} />
              <Scene title={this.props.str.addproject} key="AddProject" component={AddProject} hideTabBar={true} />
              <Scene title={this.props.str.addblog} key="AddBlog" component={AddBlog} hideTabBar={true} />
            </Scene>

            <Scene
              key="myaccount"
              title={this.props.str.myaccount}
              icon={TabIcon}
              icon={IconMyAccount}
              tabBarStyle={{ backgroundColor: "#FFFFFF" }}
            >
              <Scene key="account" hideNavBar={true} component={Account} />
              <Scene key="PropertiesIAdded" hideNavBar={true} component={PropertiesIAdded} />
              <Scene title={this.props.str.editproperties} key="EditProperties" component={AddProperty} hideTabBar={true} />
              <Scene key="MyBuyRequests" hideNavBar={true} component={MyBuyRequests} />
              <Scene key="myBlogs" hideNavBar={true} component={myBlogs} />
              <Scene title={this.props.str.editrequest} key="EditRequest" component={AddRequest} hideTabBar={true} />
              <Scene key="myRequiredTask" hideNavBar={true} component={myRequiredTask} />
              <Scene key="Agents" hideNavBar={true} component={Agents} />
              <Scene key="allPropertiesInMyCity" hideNavBar={true} component={allPropertiesInMyCity} />
              <Scene key="allRequestInCity" hideNavBar={true} component={allRequestInCity} />
              <Scene key="pendingProperties" hideNavBar={true} component={pendingProperties} />
              <Scene key="Tasks" hideNavBar={true} component={Tasks} />
              <Scene key="AllTaskInMyCity" hideNavBar={true} component={AllTaskInMyCity} />
              <Scene key="Projects" hideNavBar={true} component={Projects} />
              <Scene key="Properties" hideNavBar={true} component={Properties} />
              <Scene key="TaskersInCity" hideNavBar={true} component={TaskersInCity} />
              <Scene key="myProjects" hideNavBar={true} component={myProjects} />
              <Scene key="myPhotos" hideNavBar={true} component={myPhotos} />
              <Scene key="FullImage" hideNavBar={true} component={FullImage} />
              <Scene title={this.props.str.alltaskinmystate} key="allTaskInMyState" hideNavBar={true} component={allTaskInMyState} />
              <Scene title={this.props.str.myprevioustask} key="myPreviousTask" hideNavBar={true} component={myPreviousTask} />
              <Scene title={this.props.str.taskiapplied} key="TaskIAppliedFor" hideNavBar={true} component={TaskIAppliedFor} />
              <Scene title={this.props.str.taskiworkonthem} key="taskIWorkOnThem" hideNavBar={true} component={taskIWorkOnThem} />
              <Scene title={this.props.str.feedback} key="review" hideNavBar={true} component={review} />
              <Scene key="listOfapplyTask" hideNavBar={true} component={listOfapplyTask} />
              <Scene title={this.props.str.editTask} key="EditTask" component={AddTask} hideTabBar={true} />
              <Scene title={this.props.str.editproject} key="EditProject" component={AddProject} hideTabBar={true} />
              <Scene title={this.props.str.editblog} key="EditBlog" component={AddBlog} hideTabBar={true} />
              <Scene key="propertiesFavorite" hideNavBar={true} component={propertiesFavorite} />
              <Scene key="agentFavorites" hideNavBar={true} component={agentFavorites} />
              <Scene key="taskerFavorites" hideNavBar={true} component={taskerFavorites} />
              <Scene key="intPartFavorites" hideNavBar={true} component={intPartFavorites} />
              <Scene key="representativeFavorites" hideNavBar={true} component={representativeFavorites} />
              <Scene key="tasksFavorites" hideNavBar={true} component={tasksFavorites} />
              <Scene key="requestsFavorites" hideNavBar={true} component={requestsFavorites} />
              {/* <Scene key="mailBox" hideNavBar={true} component={mailBox} /> */}
              <Scene key="investWithUs" hideNavBar={true} component={investWithUs} />
              <Scene key="outbox" hideNavBar={true} component={outbox} />
              <Scene key="MyInbox" hideNavBar={true} component={MyInbox} />
              <Scene key="InboxMsgToRep" hideNavBar={true} component={InboxMsgToRep} />
              <Scene key="createMessage" hideNavBar={true} component={createMessage} />
              <Scene key="addInvestor" hideNavBar={true} component={addInvestor} />
              <Scene key="addInvestorMoney" hideNavBar={true} component={addInvestorMoney} />
              <Scene key="MyPayments" hideNavBar={true} component={MyPayments} />
              <Scene key="PromoteAds" hideNavBar={true} component={PromoteMyAds} />
              <Scene key="PromoteOurSite" hideNavBar={true} component={PromoteOurSite} />
              <Scene key="Register" hideNavBar={true} component={register} />
              <Scene key="OurNetwork" hideNavBar={true} component={OurNetwork} />
              <Scene key="HaveFund" hideNavBar={true} component={HaveFund} />

              <Scene key="HaveAsset" hideNavBar={true} component={HaveAsset} />
              <Scene key="bannerAds" hideNavBar={true} component={BannerAds} />
              <Scene key="advertiseWithUs" hideNavBar={true} component={AdvertiseWithUs} />
              <Scene key="BuyAds" hideNavBar={true} component={buyAds} />
              <Scene key="AdvertiseDetail" hideNavBar={true} component={AdvertiseDetails} />
              <Scene key="Profile" hideNavBar={true} component={Profile} />
              <Scene key="WebView" hideNavBar={true} component={WebView} />
              <Scene key="beourserviceprovider" hideNavBar={true} component={ServiceProvider} />
              <Scene key="contact" hideNavBar={true} component={Contact} />
              <Scene title={this.props.str.searchesFavorites} key="searchesSave" component={searchesSave} />
              <Scene title={this.props.str.rating} key="Rating" component={Rating} />
              <Scene key="MyVerification" hideNavBar={true} component={MyVerificationAction} />
              <Scene key="SecondPageList" component={SecondPageList} hideNavBar={true} />
              <Scene key="ThirdPageList" component={ThirdPageList} hideNavBar={true} />
              <Scene key="ForthPageList" component={ForthPageList} hideNavBar={true} />
              <Scene key="FithPageList" component={FithPageList} hideNavBar={true} />
              <Scene title={this.props.str.applicants} key="Applicants" component={Applicants} />
              <Scene title={this.props.str.locationonmap} key="googlemapfullview" component={googlemapfullview} />
              <Scene title={this.props.str.distanceinformation} key="distanceInformation" component={distanceInformation} hideNavBar={true} />
            
              <Scene key="browse" component={Browse} />

              {/* <Scene key='signIn' component={Login} hideNavBar={true} /> */}
              {/* <Scene key="tabNavigation" component={TabNavigation} hideNavBar={true} /> */}
              {/* <Scene key="Route" component={Route} hideNavBar={true} /> */}


            </Scene>
          </Tabs>
          {/* <Scene key='signIn' component={Login} hideNavBar={true} /> */}

        </Scene>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    str: state.root.str,
    tabs: state.root.tabs,
    hidaTabBar: state.root.hidaTabBar
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    // languageSet: (lang) => {
    //     dispatch(languageSet(lang))
    // },
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(TabNavigation);