import axios from 'axios';



export function signupassallerorbuyer(cloneData) {
    var bodyFormData = new FormData();
    for (var key in cloneData) {
        if (cloneData[key] && cloneData[key] !== undefined) {
            bodyFormData.append(key, cloneData[key]);
        }
    }
    var options = {
        method: 'POST',
        url: 'https://demo.akaratmisr.com:443/en/api/auth/registerSellerOrBuyer',
        headers:
        {
            'postman-token': '553d07fc-3950-1199-efd9-6b5b5f8315a2',
            'cache-control': 'no-cache',
            clientsecret: '(*jh2kj36gjhasdi78743982u432j',
            clientkey: '34532hbjdsakjd2&&gjhjh11',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            "Allow-Cross-Origin": '*',
        },
        data: bodyFormData
    };
    console.log(bodyFormData, '****61', cloneData);
    axios(options)
        .then((data) => {
            alert(JSON.stringify(data))
            console.log(data, 'DATAT')
        }).catch((err) => {
            console.log(JSON.parse(JSON.stringify(err)), 'ERRROR')
        })

}






export function signupastasker(user) {
    console.log(user, "working on axios")

}

export function signupasAgentorDeveloper(user) {
    console.log(user, "working on axios SignupasAgentorDeveloper")

}


export function signupasRepresentative(user) {
    console.log(user, "working on axios SignupasAgentorDeveloper")

}



export function signupasInternationalPartners(user) {
    console.log(user, "working on axios SignupasAgentorDeveloper")

}