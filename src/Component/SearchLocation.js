import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text
} from "native-base";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import InfiniteScroll from "react-native-infinite-scroll";

import { resultData } from "../Store/Action/action";
import { searchUserAPI } from "../services/API/SearchUserAPI";

class SearchLocation extends Component {
  constructor() {
    super();
    this.state = {
      activity: false,
      limit: 5,
      isLoader: true,
      responseAPI: null,
      isRefresh: false
    };
  }

  componentDidMount() {
    this.callApi();
  }

  callApi = () => {
    const {
      selectedState,
      selectcity,
      language,
      userType,
      userName
    } = this.props;
    searchUserAPI(userName, selectedState, selectcity, language, 10, 0, userType)
      .then(response => {
        const responseAPI = response.data.results;
        this.setState({
          responseAPI,
          isLoader: false
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  renderCard = () => {
    const { responseAPI } = this.state;

    return (
      <View style={{ backgroundColor: "white" }}>
        {responseAPI.length ? (
          responseAPI.map((v, i) => {
            let profileImage = v.avatar_photo;
            return (
              <TouchableOpacity style={{ marginLeft: ".3%" }}>
                <Card>
                  <CardItem>
                    <Body
                      style={{
                        marginLeft: -5,
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <View>
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            flexDirection: "row"
                          }}
                          source={{
                            uri: profileImage
                          }}
                        />
                      </View>
                      <Text>
                        {"  "} {v.user_name} {"  "}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          })
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>No Match Found!</Text>
          </View>
        )}
      </View>
    );
  };

  _Infinite = () => {
    const { selectedState, selectcity } = this.props.selectedData;
    const { language } = this.props.str;
    const { limit } = this.state;
    const { userName } = this.props;
    this.setState({ limit: limit + 5, isLoader: true });
    searchUserAPI(
      userName,
      selectedState,
      selectcity,
      language,
      limit + 10,
      0,
      5
    )
      .then(res => {
        const responseAPI = res.data.results;
        this.setState({
          responseAPI
        });
        this.setState({ isLoader: false });
      })
      .catch(e => {
        console.log(e);
      });
  };

  refreshData = () => {
    const { selectedState, selectcity } = this.props.selectedData;
    const { language } = this.props.str;
    const { userName } = this.props;

    this.setState({ isRefresh: true });
    searchUserAPI(userName, selectedState, selectcity, language, 5, 0, 5)
      .then(res => {
        const responseAPI = res.data.results;

        this.props.resultData(responseAPI);
        this.setState({ isRefresh: false });
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { isLoader, responseAPI, isRefresh } = this.state;
    return (
      <View style={{ backgroundColor: "white", height: "100%" }}>
        {isRefresh && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20%",
              backgroundColor: "white"
            }}
          >
            <ActivityIndicator size="large" color="#E94E1B" />
            <Text style={{ marginTop: 10 }}>Loading....</Text>
          </View>
        )}

        {!responseAPI ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20%",
              backgroundColor: "white"
            }}
          >
            <ActivityIndicator size="large" color="#E94E1B" />
            <Text style={{ marginTop: 10 }}>Loading....</Text>
          </View>
        ) : (
          !isRefresh && (
            <InfiniteScroll
              horizontal={false} //true - if you want in horizontal
              onLoadMoreAsync={this._Infinite}
              distanceFromEnd={12} // distance in density-independent pixels from the right end
              refreshControl={
                <RefreshControl
                  refreshing={this.state.activity}
                  onRefresh={this.refreshData}
                />
              }
            >
              {this.renderCard()}

              {isLoader && (
                <ActivityIndicator
                  size="large"
                  color="#E94E1B"
                  style={{ padding: "5%", backgroundColor: "white" }}
                />
              )}
            </InfiniteScroll>
          )
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    str: state.root.str,
    searchResult: state.root.searchResult,
    selectedData: state.root.searchData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    resultData: searchResult => {
      dispatch(resultData(searchResult));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchLocation);
