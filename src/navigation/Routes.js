import React, { Component } from 'react';
import { Router, Scene, Actions, Tabs } from 'react-native-router-flux'
// import Stapers from '../container/Browse/add properties/addPostSteper';

import Splash from '../container/Splashscreen'
import WalkThrough from '../container/Walkthrough'
import Login from '../container/Authentication/signIn'
import ForgotPassword from '../container/Authentication/forgetYourPassword'
import SignUp from '../container/Authentication/signup/signup'
import PropertiesIAdded from '../container/MyAccount/PropertiesIAdded'
import SignupasSellerorbuyer from '../container/Authentication/signup/signupasSellerorbuyer'
import SignupasTasker from '../container/Authentication/signup/signupasTasker'
import SignupasAgentorDeveloper from '../container/Authentication/signup/signupasAgentorDeveloper'
import SignupasRepresentative from '../container/Authentication/signup/signupasRepresentative'
import SignupasInternationalPartners from '../container/Authentication/signup/signupasInternationalPartners'
import TabNavigation from './TabNavigation';
import SearchForProperties from '../container/Search/FindProperties/searchforproperties';
import TermsAndCondition from '../container/Authentication/termsAndCondition';
import VeryfyAcc from '../container/Authentication/veryfy';
// import SecondPageList from "../container/Browse/2nd page list";
// import ThirdPageList from "../container/Browse/3rd page list";
// import ForthPageList from "../container/Browse/4th page list";
// import FithPageList from "../container/Browse/5th page list";
import registerUserType from "../container/Authentication/signup/registerUserType";
import registerUser from "../container/Authentication/signup/RegisterUser";
// import Browse from "../container/Browse";


class Route extends Component {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: "#f27500" }}
        titleStyle={{ color: "white" }}
        tintColor="white">
        <Scene >
          <Scene key='Splash' component={Splash} hideNavBar={true} initial />
          <Scene key='WalkThrough' component={WalkThrough} hideNavBar={true} />
          <Scene key='signIn' component={Login} hideNavBar={true} />
          <Scene key='forGotPassword' component={ForgotPassword} hideNavBar={true} />
          <Scene key='signUp' component={SignUp} hideNavBar={true} />
          <Scene key='SignupasSellerorbuyer' component={SignupasSellerorbuyer} hideNavBar={true} />
          <Scene key='SignupasTasker' component={SignupasTasker} hideNavBar={true} />
          <Scene key='SignupasAgentorDeveloper' component={SignupasAgentorDeveloper} hideNavBar={true} />
          <Scene key='SignupasRepresentative' component={SignupasRepresentative} hideNavBar={true} />
          <Scene key='SignupasInternationalPartners' component={SignupasInternationalPartners} hideNavBar={true} />
          <Scene key='SearchForProperties' component={SearchForProperties} hideNavBar={true} />
          <Scene key='TermsAndCondition' component={TermsAndCondition} hideNavBar={true} />
          <Scene key='VeryfyAcc' component={VeryfyAcc} hideNavBar={true} />
          <Scene key='PropertiesIAdded' component={PropertiesIAdded} hideNavBar={true} />
          <Scene key="registerUserType" hideNavBar={true} component={registerUserType} />
          <Scene key="registerUser" hideNavBar={true} component={registerUser} />
          <Scene key="tabNavigation" component={TabNavigation} hideNavBar={true} />






          {/* 
          <Scene key="browse" component={Browse} />
          <Scene key="SecondPageList" component={SecondPageList} hideNavBar={true} /><Scene key="ThirdPageList" component={ThirdPageList} hideNavBar={true} />
          <Scene key="ThirdPageList" component={ThirdPageList} hideNavBar={true} />
          <Scene key="ForthPageList" component={ForthPageList} hideNavBar={true} />
          <Scene key="FithPageList" component={FithPageList} hideNavBar={true} /> */}









        </Scene>
      </Router>
    )
  }
}

export default Route;


{/* <Text style={styles.marginText}
                >
                    @–read terms of use
                </Text> */}