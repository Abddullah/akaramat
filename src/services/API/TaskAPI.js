import axios from "axios";

export const taskApi = () => {
  return axios({
    method: "get",
    url:
      "https://demo.akaratmisr.com:443/" +
      // this.props.str.language +
      "en/api/dataselect/taskerTypes",
    headers: {
      clientkey: "34532hbjdsakjd2&&gjhjh11",
      clientsecret: "(*jh2kj36gjhasdi78743982u432j"
    }
  });
};
