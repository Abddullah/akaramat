import axios from "axios";

export const searchUserAPI = (
  name,
  state,
  city,
  language,
  limit,
  offset,
  user_type
) => {
  let bodyFormData = new FormData();
  bodyFormData.append("name", name);
  bodyFormData.append("state", state);
  bodyFormData.append("city", city);
  bodyFormData.append("limit", limit);
  bodyFormData.append("offset", offset);
  bodyFormData.append("user_type", user_type);

  return axios({
    method: "post",
    url:
      "https://demo.akaratmisr.com:443/" +
      language +
      "en/api/people/guest/getUsersSearch/",
    headers: {
      clientkey: "34532hbjdsakjd2&&gjhjh11",
      clientsecret: "(*jh2kj36gjhasdi78743982u432j",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: bodyFormData
  });
};
