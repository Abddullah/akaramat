import axios from "axios";


export function logInApi(user) {
  console.log(user);
  let urlm = "";
  if (user.path === "en") {
    urlm = "https://demo.akaratmisr.com:443/en/api/auth/login";
  } else {
    urlm = "https://demo.akaratmisr.com:443/ar/api/auth/login";
  }
  console.log(user, "user in axios");
  return axios({
    method: "post",
    url: urlm,
    headers: {
      clientkey: "34532hbjdsakjd2&&gjhjh11",
      clientsecret: "(*jh2kj36gjhasdi78743982u432j"
    },
    data: {
      email: user.email,
      password: user.password
    }
  })
    .then(data => {
      console.log(data.data);
      alert("loged in");
    })
    .catch(err => {
      // console.log(err)
      var errUpdate = JSON.stringify(err);
      console.log(JSON.parse(errUpdate));
      alert(errUpdate);
    });
}


