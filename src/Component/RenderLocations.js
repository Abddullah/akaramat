import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Picker,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Item } from "native-base";
import { connect } from "react-redux";
import axios from "axios";
import IconFontFontAwesome from "react-native-vector-icons/FontAwesome";
import { TextField } from "react-native-material-textfield";
import * as Animatable from "react-native-animatable";
import MultiSelect from "react-native-multiple-select";

import { resultData } from "../Store/Action/action";
import { SearchData } from "../Store/Action/search";
import { searchUserAPI } from "../services/API/SearchUserAPI";

class RenderLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFlag: true,
      //state and cities
      stateFromApi: [],
      allCityFromApi: [],
      selectedState: "",

      //types
      selectedType: [],
      //selected subtitels for
      selectedPropertiesStatus: []
    };
  }

  componentDidMount() {
    this.getState(this);
  }

  getState() {
    return axios({
      method: "get",
      url:
        "https://demo.akaratmisr.com:443/" +
        this.props.str.language +
        "/api/location/states/1",
      headers: {
        clientkey: "34532hbjdsakjd2&&gjhjh11",
        clientsecret: "(*jh2kj36gjhasdi78743982u432j"
      }
    })
      .then(data => {
        let state = data.data.results;
        this.setState({
          stateFromApi: state
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  dropDownChangeState = (itemValue, itemIndex) => {
    if (itemIndex && itemValue) {
      this.setState({
        selectedState: itemValue
      });
      const payload = {
        selectedState: itemValue,
        selectedcity: this.state.selectedCity
      };
      this.props.searchData(payload);

      uri =
        "https://demo.akaratmisr.com:443/" +
        this.props.str.language +
        "/api/location/cities/" +
        itemValue;
      return axios({
        method: "get",
        url: uri,
        headers: {
          clientkey: "34532hbjdsakjd2&&gjhjh11",
          clientsecret: "(*jh2kj36gjhasdi78743982u432j"
        }
      })
        .then(data => {
          let city = data.data.results;

          this.setState({
            allCityFromApi: city
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useSearchAPI = () => {
    const { selectedState, selectedCity } = this.state;
    this.searchUserAPI(selectedState, selectedCity)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const {
      stateFromApi,
      allCityFromApi,
      selectedState,
      selectedCity
    } = this.state;

    return (
      <View>
        <View>
          {stateFromApi.length ? (
            <ScrollView>
              <View>
                {/* ////////////////////////////////Input State or City///////////////////////////// */}
                <View>
                  <Picker
                    mode="dropdown"
                    style={{
                      height: 50,
                      width: "92%",
                      marginLeft: 7,
                      color: "#565c66"
                    }}
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={selectedState}
                    onValueChange={(itemValue, itemIndex) =>
                      this.dropDownChangeState(itemValue, itemIndex)
                    }
                  >
                    <Picker.Item label={this.props.str.selectstate} value="" />
                    {stateFromApi.map((key, index) => {
                      return this.props.str.language === "en" ? (
                        <Picker.Item
                          label={key.name_en}
                          value={key.id}
                          key={index}
                        />
                      ) : (
                        <Picker.Item
                          label={key.name_ar}
                          value={key.id}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                  {selectedState != "" ? (
                    <Animatable.View animation="slideInLeft" iterationCount={1}>
                      <Item>
                        <Picker
                          mode="dropdown"
                          style={{
                            height: 50,
                            width: "92%",
                            marginLeft: 7,
                            color: "#565c66"
                          }}
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={selectedCity}
                          onValueChange={(itemValue, itemIndex) => {
                            this.setState({ selectedCity: itemValue });
                            const payload = {
                              selectedState: this.state.selectedState,
                              selectcity: itemValue
                            };
                            this.props.searchData(payload);
                          }}
                          onPress={() => Actions.findRepresentative()}
                        >
                          <Picker.Item
                            label={this.props.str.selectcity}
                            value=""
                            onPress={() => Actions.findRepresentative()}
                          />
                          {allCityFromApi.map((key, index) => {
                            return (
                              <Picker.Item
                                label={key.name_en}
                                value={key.id}
                                key={index}
                              />
                            );
                          })}
                        </Picker>
                      </Item>
                    </Animatable.View>
                  ) : null}
                </View>
              </View>
            </ScrollView>
          ) : (
            <ActivityIndicator
              size="small"
              color="#E94E1B"
              style={{
                color: "#E94E1B",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    str: state.root.str
  };
};
const mapDispatchToProps = dispatch => {
  return {
    searchData: payload => {
      dispatch(SearchData(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderLocations);
