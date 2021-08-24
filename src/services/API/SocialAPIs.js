import axios from "axios";

const Base_URL = lang => {
  return `https://demo.akaratmisr.com:443/${lang}/api/auth/`;
};

export const authWithFacebook = async data => {
  const { lang, bodyFormData } = data;
  const url = `${Base_URL(lang)}registerFacebook`;
  // console.log("URL>>>", user);
  // const response = await axios({
  //   method: "POST",
  //   url,
  //   headers: {
  //     clientkey: "34532hbjdsakjd2&&gjhjh11",
  //     clientsecret: "(*jh2kj36gjhasdi78743982u432j"
  //   },
  //   data: {
  //     user_type,
  //     token
  //   }
  // });

  // const response = fetch(url, {
  //   method: "POST",
  //   headers: {
  //     clientkey: "34532hbjdsakjd2&&gjhjh11",
  //     clientsecret: "(*jh2kj36gjhasdi78743982u432j",
  //     "Content-Type": "application/json"
  //   },
  //   body: bodyFormData
  // });
  // return response;

  var options = {
    method: 'POST',
    url,
    headers:
    {
      clientsecret: '(*jh2kj36gjhasdi78743982u432j',
      clientkey: '34532hbjdsakjd2&&gjhjh11',
      "Content-Type": "application/json",
    },
    data: bodyFormData
  };
  return axios(options)
    .then((data) => {
      // console.log(data.data.results, 'afsdafsaDATAT')
      return data
    }).catch((err) => {
      return err
      // console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
    })


};

export const authWIthTwitter = async data => {
  const { lang, user_type, oauth_token, oauth_token_access } = data;
  // console.log(">>>>>>>>>>>>>>>>>>>>>", data.oauth_token);
  const url = `${Base_URL(lang)}registerTwitter`;
  // console.log("URL>>>", url);

  // const response = await axios({
  //   method: "post",
  //   url: `${Base_URL(lang)}registerTwitter`,
  //   headers: {
  //     clientkey: "34532hbjdsakjd2&&gjhjh11",
  //     clientsecret: "(*jh2kj36gjhasdi78743982u432j"
  //   },
  //   data: {
  //     user_type,
  //     token
  //   }
  //   });

  //   return response;
  // };
  const response = fetch(url, {
    method: "POST",
    headers: {
      clientkey: "34532hbjdsakjd2&&gjhjh11",
      clientsecret: "(*jh2kj36gjhasdi78743982u432j",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      oauth_token,
      user_type,
      oauth_token_access
    })
  });

  return response.then((res) => {
    return res.json().then((response) => {
      return response
    })
  })
};

export const authWithGoogle = async data => {
  const { lang, user_type, token } = data;
  console.log(">>>>>>>>>>>>>>>>>>>>>", token);
  const url = `${Base_URL(lang)}registerGoogle`;

  const response = fetch(url, {
    method: "POST",
    headers: {
      clientkey: "34532hbjdsakjd2&&gjhjh11",
      clientsecret: "(*jh2kj36gjhasdi78743982u432j",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token_id: token,
      user_type
    })
  });

  return response.then((res) => {
    return res.json().then((response) => {
      return response
    })
  })


};
