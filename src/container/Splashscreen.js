import React, { Component } from 'react';
import { connect } from "react-redux";
import { languageSet } from '../Store/Action/action'

import { Actions } from 'react-native-router-flux'
import { Container, Header, Drawer, Left, Body, Right, Title, Item, Input, Picker, Form, Item as FormItem, Button } from 'native-base';
import { StyleSheet, View, Image, Text, AppRegistry, Alert, StatusBar, ImageBackground, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import * as Animatable from 'react-native-animatable';



class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // percent: 0,
            percent: 0,
        };


    }

    componentWillMount() {
        this._retrieveData().then((response) => {
            console.log(response, "responsewwwwww")
            if (response && response.userHave && response.value === "yes") {
                this.setState({
                    route: "tabNavigation",
                    userHave: response.userHave,
                    userDetails: response.userDetailsInParse,
                })
            }
            else if (response && response.value === "yes") {
                this.setState({
                    route: "signIn"
                })
            }
            else {
                this._storeData().then(() => {
                    this.setState({
                        route: "WalkThrough"
                    })
                })
            }

        })

    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('firstTimeLaunch', 'yes');
        } catch (error) {
            // Error saving data
        }

    };

    _retrieveData = async () => {
        console.log("working")
        try {
            const value = await AsyncStorage.getItem('firstTimeLaunch');
            console.log(value, "*******")
            if (value) {
                let userHave = await AsyncStorage.getItem('userHave');
                let userDetails = await AsyncStorage.getItem('userDetails');
                let userDetailsInParse = JSON.parse(userDetails)
                let obj = JSON.parse(userHave)
                console.log(value, obj, "*******", userDetailsInParse)
                if (obj) {
                    let objectOfUser = {
                        userHave: obj,
                        value: value,
                        userDetailsInParse: userDetailsInParse
                    }
                    return objectOfUser
                }
                else {
                    let obj = {
                        value
                    }
                    return obj
                }
                // We have data!!
            }
        } catch (error) {
            console.log(error, "asynkgeterror");
            // Error retrieving data
        }
    };

    componentDidMount() {
        setInterval(() => {
            if (this.state.percent < 100) {
                this.setState({
                    percent: this.state.percent + 5
                })
            }
        }, 10);
    }

    setLanguageEng() {
        str = {
            language: "en",
            ////////////////////////////1st slide text walkthrough screen//////////////////////////////

            signupto: "Sign up to enjoy many free services in the Best Realestate Portal in Egypt",
            searchinmore: "Search in more than 250.000 Properties in Egypt and You can sell,buy and hire workers for free in very easy way . Contact driectly with the seller ,buyer or worker without any commissions",

            ////////////////////////////2nd slide text walkthrough screen//////////////////////////////

            findyourbesttasker: "Find your best tasker among 15000+ taskers and workers on our app",
            forfirsttimeinegypt: "For first time in Egypt and Middle East, you can manage all realestate tasks you need in one place . You can find the best taskers, assign task to theme , follow him and rate him after he finish his task",

            ////////////////////////////3rd slide text walkthrough screen//////////////////////////////

            our300representative: "Our 300 Representatives at your service in all Egyptian areas",
            ifyouneedourhelpto: "If you need our help to inspect, audit , verify and secure your deal and sale... We will happy to be at your service . We have our representatives all over Egypt cities to servicing you . We can help you also in furnishing and investing your property in the best way",

            ////////////////////////////4th slide text walkthrough screen//////////////////////////////

            thousandsofagents: "Thousands of Agents and developers compete for your satisfaction",
            onlyinourappyoucan: "Only in our app you can compare offers from thousands of agents and developers very easy and select the best offer that fit your requirements and financial abilities",

            ////////////////////////////5th slide text walkthrough screen//////////////////////////////

            specialprograms: "Special Programs for Investors and Marketers",
            wehavecustomized: "We have customized programs and services for anyone need to invest in Real estate sector and also we offer partnership affiliate programs for marketers",

            // Wasi Work start From Here

            tel: 'Tel',
            facebook: 'Facebook page',
            Linkedin: 'Linkedin',
            website: 'Website',
            seo: 'SEO',
            fbAds: 'Facebook ads and campaign',
            dmp: 'Digital marketing Planning',
            vibComp: 'Viber campaigns',
            dbOffer: 'Database offerings',
            graphDes: 'Graphic designing',
            instCom: 'Instagram campaigns',
            youtCom: 'Youtube Campaigns',
            mobAppMar: 'Mobile app marketing',
            haveFundAlert2: 'Fill all the fields',
            haveFundAlert3: 'Fill all the fields and make sure to on the gps location',
            telAlert: 'Name and tel are required',
            contacUstAlert: 'Ups! You have been our service provider. If you have any question, please contact us.',

            // Wasi Work End Here

            signup: "SIGN UP",
            signup1: "Sign up",
            signin: "SIGN IN",
            login: "Login",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            phoneNumber: "Phone Number",
            forgetpassword: "Forgot your password",
            loginwithyourfacebook: "Login with your Facebook",
            loginwithyourtwitter: "Login with your Twitter",
            loginwithyourgoogle: "Login with your Google+",
            enteryouremail: "Enter your e-mail below to reset your password.",
            addyouremailaddress: "Add Your Email Address",
            submit: "Submit",
            aftersubmitpleasecheck: "After submit please check your inbox and spam folder",
            backtosignin: "Back to sign in",
            signupassallerorbuyer: "Sign up as Seller or Buyer",
            signupastasker: "Sign up as Tasker",
            signupasagentordeveloper: "Sign up as Agent or Developer",
            signupasrepresentative: "Sign up as Representative",
            signupasInternationalPartners: "Sign up as International Partners",
            signupwithyourfacebook: "Sign up with your Facebook",
            signupwithyourtwitter: "Sign up with your Twitter",
            signupwithyourgoogle: "Sign up with your Google+",
            fullname: "Full Name",
            ihaveemailaddredd: "I have email address",
            thisnumberhaswhatsapp: "This number has whatsapp",
            thisnumberhasviber: "This number has Viber",
            ireadtermsandconditions: "I read terms and conditions",
            sendactivationcode: "Send activation code to Email",
            activatemyaccountby: "Activate my account by missed call",
            youmustacceptthe: "You must accept the terms of service before you can proceed",
            buy: 'Buy now',
            seller: 'Seller or Buyer',
            tasker: 'Tasker',


            signupastasker: "Signup as tasker",
            thisisacompanyaccount: "This is a Company account",
            Searchitems: "Search Items...",
            selectcountry: "Select Country",
            selectstate: "Select State",
            selectcity: "Select City",
            selectdistricts: "Select Districts",
            selectsubdistricts: "Select Sub Districts",

            // selectstateicanwork: "Select State (I can work)",
            // selectcityicanwork: "Select City (I can work)",
            // selectdistrictsicanwork: "Select Districts (I can work)",
            // selectsubdistrictsicanwork: "Select Sub Districts (I can work)",


            city: " City",
            icanwork: "I can work",
            icancover: "I can cover area",
            icancoverstate: "I can cover area (STATE)",
            icancovercity: "I can cover area (CITY)",
            icancoverdistricts: "I can cover area (DISTRICTS)",
            icancoversubdistricts: "I can cover area (SUB DISTRICTS)",

            homeTel: "Home Tel.",
            fax: "Fax",
            address: "Address",
            description: "Description",
            uploadyourphoto: "Upload your photo",
            uploadphoto: "Upload photo",
            uploadyourdocuments: "Upload your documents",
            iwillprovidelater: "I will provide later",
            uploadyourid: "Upload your Id",
            uploadid: "Upload Id",
            uploadyourdocumentsaddress: "Upload your documents Address proof(Utility bill,bank statement,..etc)",
            uploaddocuments: "Upload documents",
            ideclareallinformation: "I declare all information above is right and I am ready to be verified",
            companyname: "Company Name",
            Register: "Register",
            reg: 'Social Registration',
            age: "Age",
            gender: "Gender",
            ispeak: "I Speak",
            computerskills: "Computer Skills",
            icancometo: "I can come to Akaratmisr.com office for personal meeting",
            ihaveacar: "I have a car",
            type: "Type",
            coverArea: 'i can work in state / province',
            startMark: 'Do you want to start working in marketing real estate? Do you have the ambition to build yourself and increase your income as soon as two hours of work per day?',
            employee: 'Are you a young university or Miss, employee or housewife?',
            ambition: 'All what you need is ambition and determination !!',
            mechanism: 'Will let you know all the mechanisms and give you everything you need to be a professional Real Estate Agent!',
            performJob: 'we will give you all the tools that will help you to perform your job and we will be with you step by step ..',
            willing: 'Every effort to find their result immediately, and results are guaranteed, God willing,',
            coupon: 'We will create Affiliate account so you can know all details of your earnings and orders used your coupons',
            jobs: 'JOIN OUR TEAM',


            // inputErrors
            pleasetypefullname: "Please type full name (required)",
            pleasetypepassword: "Please type password (required)",
            pleasetypeconfirmpassword: "Please type confirm password (required)",
            passworddoesnotmatched: "Password does not matched",
            pleasetypetypesofwork: "Please type types of work (required)",
            pleaseselectstate: "Please select state (required)",
            pleaseselectcity: "Please select city (required)",
            pleaseselectworkingstate: "Please select working state  (required)",
            pleasetypeage: "Please type age (required)",
            pleasetypetelephone: "Please type telephone number(required)",
            pleasesetyourappropriate: "Please set your appropriate language (required)",
            pleaseselectstateicancover: "Please select state i can cover (required)",
            pleaseselectcityicancover: "Please select city i can cover (required)",
            pleasetypeyouremailaddress: "Please type your email address (required)",
            pleasetypeyourcity: "Please type your city (required)",
            pleaseuploadyourphoto: "Please upload your photo (required)",
            pleaseuploadyourId: "Please upload your Id (required)",
            pleaseuploadyouraddressFile: "Please upload your addressFile (required)",

            // after login screen strings 1st page lists
            properties: "Properties",
            Tasker: "Tasker",
            hire: "Hire",
            Tasks: "Tasks",
            agentanddevelopers: "Agent and developers",
            representative: "Representative",
            projects: "Projects",
            news: "News",

            // after login screen strings 2nd page lists
            propertiescategories: "Properties Categories",
            browsetasker: "Browse Tasker",
            taskcategory: "Task Category",
            propertyforbuy: "Properties For Buy",
            propertyforrent: "Properties For Rent",
            lawyers: "Lawyers",
            doctorist: "Doctorist",
            painters: "Painters",
            floorandtiles: "Floor and Tiles Workers",
            plumbers: "Plumbers",
            carpenters: "Carpenters",
            furnituremovers: "Furniture Movers",
            roofworker: "Roof Worker",
            others: "Others",
            apartment: "Apartment",
            house: "House",
            land: "Land",
            condo: "Condo",
            chalet: "Chalet",
            villa: "Villa",
            palace: "Palace",
            commercial: "Commercial",
            administrative: "Administrative",
            agriculture: "Agriculture",
            industrial: "Industrial",
            nofound: "No Found",
            shop: "Shop",
            warehouse: "Warehouse",
            office: "Office",
            clinic: "Clinic",
            hospital: "Hospital",
            farm: "Farm",
            factory: "Factory",
            room: "Room",



            // subtitle for
            subtitlefor: "Suitable for",
            residential: "Residential",
            touristic: "Touristic",
            medical: "Medical",
            educational: "Educational",

            // Property Status",
            propertystatus: "Property Status",
            newbuilding: "New Building",
            oldbuilding: "Old Building",
            notbuildyet: "Not build yet",
            underDevelopment: "Under Development",
            halfFlasing: "Half Flashing",
            completefinishing: "Complete Finishing",
            hugeluxefinishing: "Huge luxe Finishing",
            furnished: "Furnished",
            searchforproperty: "SEARCH FOR PROPERTY",
            searchwithkeyword: "Search with keyword",
            propertycode: "Property code",
            purpose: "Purpose",
            sale: "Sale",
            rent: "Rent",
            salrorrent: "Sale or Rent",
            bedrooms: "Bedrooms",
            bathrooms: "Bathrooms",
            any: "Any",
            pricerange: "Price range",
            minimum: "Minimum",
            maximum: "Maximum",
            searchnow: "Search Now",
            search: 'Search',
            searchrequest: 'Search Request',


            // addrequest: "Add request",
            title: "Title",
            putalldetails: "Put all details as you can do, it will make it easy for the buyer to know more and contact you",
            plsputgood: "Pls put good title in brief",
            directphonenumberforthis: "Direct phone number for this property",
            result: "Result",

            //terms and conditions
            termsandcondition: "Terms and Conditions",
            thetermakaratmisr: 'The term "Akaratmisr.com" or or "us" or "we" refers to the owners of Akaratmisr.com. The term "you" refers to the user or viewer of our website. The use of this website is subject to the following terms of use:',
            thecontentofthe: "The content of the pages of this website is for your general information and use only. It is subject to change without notice.",
            neitherwenot: 'Neither we not any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.',
            youruseofanyinformation: 'Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.',
            thiswebsitecontains: 'This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.',
            alltrademarks: 'All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).',
            youruseofthis: 'Your use of this website and any dispute arising out of such use of the website is subject to the laws of the Republic of Yemen.',
            refundpolicy: 'Refund Policy',
            duetothenatureofour: 'Due to the nature of our services, we do not offer any refunds regardless of reasons and causes. All sales are final, and no unused credits can be refunded.',
            websitedisclaimer: 'Website Disclaimer',
            theinformationcontainedinthis: 'The information contained in this website is for general information purposes only. The information is provided by Akaratmisr.com and whilst we endeavor to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.',
            innoeventwillwebe: 'In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.',
            everyeffortismadeto: 'Every effort is made to keep the website up and running smoothly. However, Akaratmisr.com takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.',
            privacypolicy: 'Privacy Policy',
            thisprivacy: 'This privacy policy sets out how we use and protect any information that you give us when you use this website.',
            akaratmisrcomiscommitted: 'Akaratmisr.com is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.We may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.',
            security: 'Security',
            wearecommittedtoensuringthat: 'We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. Akaratmisr.com uses a Secure Socket Layer system (SSL) to encrypt your entire payment session. SSL is an industry standard for keeping data and information secure and is used by lending companies, banks, and credit agencies.',
            paidservices: 'Paid Services',
            theclientagress: '* The client agrees to adhere to all the terms and conditions of Akaratmisr.com',
            akaratmisrcomreservesthe: 'Akaratmisr.com reserves the right to change its terms at any time.',
            theclientagressto: 'The client agrees to post only legal and ethical content that does not violate any laws, copyrights or ownership by others.',
            pointspurchasedby: 'Points purchased by the client expired after 1 year from the date of purchase and once expired cannot be used nor refunded.',
            theclientcan: 'The client can return his points before they expire; however a 20% refund fee will be charged.',
            akaratmisrcomisnotresponsibleforanymistakes: 'Akaratmisr.com is not responsible for any mistakes or problems that happen to the client caused by the content of the listings.',
            akaratmisrcomisnotresponsibleforpoints: 'Akaratmisr.com is not responsible for points missed due to mistakes by the client.',
            thecompanycanstopusingthe: 'The company can stop using the points system at any time, and the client will be entitled for a refund equal to the value of the unused points.',
            akaratmisrcomwebsitecanstop: 'Akaratmisr.com website can stop working for hours or days due to maintenance, hacking, r technical issues or any other reason; therefore the company will not refund the client due to such challenges except if the down time exceeds 7 days within 30 days.',
            theclientcannotpost: 'The client cannot post fake listings, fake photos, duplicate listings, expired listings, or sold listings. If Akaratmisr.com finds such listings it can delete them without refunding the client the used points. If the violation is repeated Akaratmisr.com can close the client account and deduct 20% of its remaining value as violation fees.',
            theclientcommitsto: 'The client commits to removing any sold properties within 3 days of selling them, otherwise Akaratmisr.com is authorized to delete such properties without issuing any refunds.',
            theclientcannotusehis: 'The client cannot use his points to add listings for another client or any other entity.',
            akaratmisrcomcancloseany: 'Akaratmisr.com can close any clients account if it finds any signs of account manipulation, and it can charge a 20% violation fee.',
            theclientcannotshellhis: 'The client cannot sell his points to another client or any other entity.',
            akaratmisrcomreservestheright: 'Akaratmisr.com reserves the right to refuse serving any client for any reason. If the client has points in his account, the company will refund the value of the remaining points.',
            theclientisresonsibleforthe: 'The client is responsible for the security of his account, therefore we recommend safeguarding the account username and password to avoid account hijacking.',
            companiescannotusethe: 'Companies cannot use the points system to advertise a project that has more than 10 units such as Compounds, Malls, Medical and Commercial projects. Companies cannot also advertise a specific unit in such projects. In case of violating this term, Akaratmisr.com can delete such listings without compensating the advertiser for the deleted points.',
            eachpaidlistingremainslive: 'Each paid listing remains live for 30 days from the day of approval by the admin. After 30 days, the listing automatically expires, and the client can renew it by paying again for the listing.',
            akaratmisrcomisnotresponsibleifthe: 'Akaratmisr.com is not responsible if the client deletes any of the paid listings intentionally or unintentionally. Deleted listings is a permanent action, and the client cannot ask the company to reactivate the ad nor refund the listing points.',
            eachlistingshould: 'Each listing should contain details of a single property. Akaratmisr.com reserves the right to not approve or delete any listing that has details about more than one unit.',
            itsnotallowedtochange: 'Its not allowed to change the type or the location of the property once its submitted.',
            howweusecookies: 'How We Use Cookies',
            acookieisasmallfile: "A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.",
            weusetrafficlog: 'We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.',
            overallcookieshelpus: 'Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.',
            youcanchoseto: 'You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.',
            linktootherwebsites: 'Link to Other Websites',
            ourwebsitemay: 'Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.',
            ifyoubelievethatany: 'If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.',
            addproperty: 'Add Property',
            addtask: 'Add Task',
            addrequest: 'Add Request',
            descriptionandaddress: 'DESCRIPTION & ADDRESS',

            image: 'Image',
            featuredimage: 'Featured Image',
            selectfile: 'Select File',
            gallery: 'Gallery',
            embeddedvideourl: 'Embedded video url',
            estatebrochure: 'Estate brochure',
            UploadPDFDocorDocXfile: 'Upload PDF, Doc or DocX file',
            price: 'Price',
            contactusto: 'Contact us to known the price',
            beourserviceprovider: 'Be Our Service Provider',
            //for sale
            totalprice: 'Sale price',
            totalpricecurrency: 'Sale price currency',
            priceperunit: 'Price per unit',
            priceperunitcurrency: 'Price per unit currency',
            priceunit: "Price unit",
            creaditpayment: 'Credit payment',
            upfrontpayment: 'Upfront payment',
            monthlypayment: 'Monthly payment',
            quarterlypayment: 'Quarterly payment',
            yearlypayment: 'Yearly payment',
            period: 'Period',
            periodpriceunit: 'Period price unit',
            month: 'Month',
            year: 'Year',
            comments: 'Comments',

            //for rent
            rentprice: 'Rent price',
            rentpricecurrency: 'Rent price currency',
            rentpriceunit: 'Rent price unit',

            propertyistimesheare: 'Property is timeshare  system',
            pricenegotiable: 'Price Negotiable',
            usdollar: '$ - US Dollar',
            egyptainpound: 'EGP - Egyptian Pound',

            //Summary
            summary: 'Summary',
            areasize: 'Area size',
            areasizeunit: 'Area size unit',
            arce: 'Arce',
            hector: 'Hector',
            fedan: 'Fedan',
            squarefeet: 'Square Feet',
            squaremetres: 'Square Metres',




            yearbuilt: 'Year built',
            estateCondition: 'Estate Condition',
            thepropertyis: 'The property is ready for receipt',
            selectdeliverydate: 'Select Delivery Date',

            //distance
            distance: 'Distance',
            beach: 'Beach',
            bus: 'Bus',
            cafe: 'Cafe',
            gasstation: 'Gas Station',
            Hospital: 'Hospital',
            pharmacy: 'Pharmacy',
            playground: 'Playground',
            police: 'Police',
            repair: 'Repair',
            train: 'Train',
            mosque: 'Mosque',
            sportclub: 'Sport Club',
            metro: 'Metro',
            church: 'Church',
            selectunit: 'Select Unit',
            minutes: 'Minutes',
            meters: 'Meters',
            feet: 'Feet',
            kilometers: 'Kilometers',
            mile: 'Mile',

            // Amenities
            amenities: 'Amenities',
            airconditioning: 'Air Conditioning',
            balcony: 'Balcony',
            cableTV: 'Cable TV',
            computer: 'Computer',
            dishwasher: 'Dishwasher',
            grill: 'Grill',
            heater: 'Heater',
            lift: 'Lift',
            parking: 'Parking',
            pool: 'Pool',
            smooking: 'Smoking',
            washingMachine: 'Washing Machine',
            wifi: 'Wifi',

            fileattached: 'File attached',
            numberoffloors: 'Number of floors',
            postadd: 'Post add',
            fullview: 'FULL VIEW',

            aboutme: 'About me',
            thereisnodataavailable: 'There is no data available',
            contact: 'Contact',
            budget: 'Budget',
            posted: 'Posted -',
            propertyandtime: 'Property and times',
            location: 'Location',
            id: 'ID',
            views: 'Views',
            avilablefor: 'AVAILABLE FOR',
            name: 'Name',
            makephonecall: 'Make phonecall',
            districtandsubdistrict: 'District and Subdistrict',
            stateandcity: 'State and City',
            startdate: 'Start Date',
            enddata: 'End Date',
            perpose: 'Perpose',
            floor: 'Floor',
            status: 'Status',
            suitablecategories: 'Suitable Categories',


            categories: 'Categories',
            need: 'Need',
            price_max: 'Price_max in EGP',
            budgetinegp: 'Budget in EGP',
            fromdate: 'From date:',
            todate: 'To date:',
            activatemyaccount: 'Activate my account',
            verifyaccount: ' Verify account',
            thanksforsubmitting: 'Thanks for submitting your Registration. We are giving you missed call now. Kindly check your phone and enter the last 3 digits from the number called to verify your account.',
            verify: 'Verify',
            ifyoudidnotreceivethecall: '  If you did not receive the call please try another call or try to verify by sending sms',
            last3digits: 'Last 3 digits',
            ownerproperties: 'OWNER PROPERTIES',
            postedby: 'POSTED BY',
            postedbysmal: 'Posted by',
            name1: 'Name:',
            phone: 'Phone:',
            properties1: 'Properties:',
            sendmsg: 'Send Message',
            emailSubject: 'Email Subject',
            pleasetypeyourmsg: 'Please type your message',
            message: ' Message',
            helpYou: 'How can we help you',
            pleasetypeemailorphone: 'Please type email or Phone',
            pleasetypenewpassword: 'Please type new password',
            changepassword: 'Change password',
            newpassword: 'New password',
            retypenewpassword: 'Retype new password',
            updatepassword: 'UPDATE PASSWORD',
            back: 'back',
            pleasetypemessage: 'Please type message',
            pleasetypesubjectandmsg: 'Please type subject and msg',

            googlemap: 'Google Map',
            alldescriptionandaddress: 'All description & address fields are required',
            pleasefill: 'Please fill',
            distanceSmall: 'distance',
            allfieldsarerequired: 'All fields are required',
            applytask: "Apply Task",


            // muzammil

            basicInfo: 'Basic Information',
            expAndService: 'Experience & Service Quality assurance',
            personalMeeting: 'Personal Meeting',
            siteVis: 'Site Visit',
            visitOff: 'I visited the office, home or place of work of Agent/Tasker',
            overallVisit: 'My overall impression about my visit to him',

            metTaker: 'I met this agent or tasker personally',
            overallMet: 'My overall impression about my meeting with him',

            businessRef: 'The Agent/Tasker provided 3 Business references',
            refRate: 'I contacted the references and their rate for service the tasker/agent provide as the following:',
            ref1: 'Reference 1',
            ref2: 'Reference 2',
            ref3: 'Reference 3',

            profile: 'Profile',
            EditProfile: 'Edit profile',
            mypayment: 'My Payment',
            myfavorites: 'My Favorites',
            mailbox: 'Mail Box',
            investwithus: 'Invest With Us',
            promoteoursite: 'Promote Our Site',
            promotemyads: 'Promote My Ads',
            propertiesiadded: 'Properties i added',
            mybuyrequests: 'My buy requests',
            myrequiredtasks: 'My required tasks',
            postnewtask: 'Post new task',
            agent: 'Agent',
            internationalpartner: 'International partner',
            request: 'Request',
            searches: 'Searches',
            myaffiliateprogrammarketing: 'My affiliate program marketing',
            mycouponsactivities: 'My coupons activities',
            allpropertiesiadded: 'All Properties I added',
            id: '#ID',
            publishdate: "Publish Date",
            conditionstatus: "Condition Status",
            featuredactions: "Featured Actions",
            delete: "Delete",
            edit: "Edit",
            active: "Active",
            deactivate: "Deactivate",
            actions: "Actions",
            listapplicants: "List applicants",
            favoritesproperties: "Favorites Properties",
            favoritesagents: "Favorites Agents",
            favoritesTasker: "Favorites Taskers",
            favoritesInternational: "Favorites International",
            favoritesRepresentative: "Favorites Representative",
            favoritesTasks: "Favorites Tasks",
            favoritesRequests: "Favorites Requests",
            favoritesSearches: "Favorites Searches",
            mailbox: "Mail box",
            investors: "Investors",
            Immunetodoubt: "Immune to doubt that real estate will continue to be one of the most secure kinds of investment There is no doubt that the work Akarat.msr environment that allows for a lot of access to the best investment opportunities and the ability to take him from every side, where available its information and capabilities and relationships are rarely available to other entities, so that we can provide two types of services to investors or for those who want to invest in real estate",
            FixedAssets: "1-Fixed Assets Management",
            Heretheinvestor: "Here the investor has his own fixed asset and we will help him to invest it properly and securely. Akaratmisr.com .مصر will do its best to acheive the best results from the investment of that. you may have a factory or and need some partners so you can push things up. Akaratmisr.com عقارات.مصر will be with you hand by to offer you the best investment solutions for your assets. Rest assured that you will get the best solution for your asset",
            IneedAkaratmisr: "I need Akaratmisr.com عقارات.مصر help me to invest my Fixed Asset",
            CapitalInvestment: "2-Capital Investment",
            HereYouhavespecific: "Here, You have specific amount of money and need to invest in Real estate market. You will authorize Akaratmisr.comعقارات.مصر to do that on your behalf. The steps will be simple like that:",
            Filltheform: "1-Fill the form of information of the money and the field you suggest to invest in",
            teamwillgothrough: "2-Akaratmisr.com عقارات.مصر team will go through thatform and they will contact you",
            bewithyouuntil: "3-The money will be with you until Akaratmisr.com عقارات.مصر find something interesting, we will call you to offer all details to you",
            Iftheinvestmentopportunity: "4-If the investment opportunity is accepted by you, we will go further of signing agreements directly with all parties and pay the money directly without holding money in Akaratmisr.com عقارات.مصر account",
            Ihavemoney: "I have money and need Akaratmisr.com عقارات.مصر help me to invest it",
            myOutBox: "My Outbox",
            emailSend: "Email Send Succesfully",
            addInvestor: "Add Investor",
            addressOfInvestor: "Address of Investor",
            state: "State",
            myPayment: 'My Payments',
            noPayments: 'No Payment History',
            currentPackage: 'Current Package : ',
            upgradePackage: 'Upgrade your package now',
            promoteAds: 'Promote My Ads',
            promotions: 'Here Akaratmisr offers Promotions and marketing services for your ad. Simply fill this form and one of our team will contact you to design your marketing plan effectively',
            promote: 'I need akaratmisr.com to promote:',
            property: 'My Property',
            project: 'My Project',
            company: 'My Company',
            propertyCode: 'Property Code',
            projectCode: 'Project Code',
            promotionChannel: 'My preferred promotion channels',
            upgrade: 'Upgrade',

            emailCmp: 'Email campaigns',
            smsCmp: 'SMS campaigns',
            whatsappCmp: 'Whatsapp campaigns',
            fbCmp: 'Facebook campaigns',
            twtrCmp: 'Twitter campaigns',
            phoneCall: 'Phone calls',
            all: 'All',
            promoBudget: 'My proposed budget for promotion',
            PhoneNo: 'Direct phone number to discuss details',
            personName: 'Name of the person in charge',
            marketService: 'Or simply you can select from different promotion and marketing services here:',
            advertise: 'Advertise with us',
            bannerAds: 'Buy Banner Ads',
            affiliate: 'My Affiliate Dashboard',
            eng: 'English',
            arb: 'Arabic',
            selectType: 'Select Your Type',
            nextStep: 'Go to next step',
            // muzammil



            duration: "Duration",
            quoteinegp: "Quote in EGP",
            ordays: "Or Days",
            doyouhavequestionforthistask: "Do you have question for this task ?",
            pleasefillfullform: "Please fill full form",
            taskername: "Tasker Name",
            dateapplied: "Date applied",
            maximum3items: "Maximum 3 items limit",
            about: "About",
            addblog: "Add Blog",
            editblog: "Edit Blog",
            blogs: "Blogs",
            postedon: "Posted On",
            by: "By",
            resendconfirmation: "Resend Confirmation",
            addproject: "Add Project",
            editproject: "Edit Project",
            projecttype: "Project type",
            sort: "Sort",
            home_size_unit: "Home size unit",
            home_size: "Home size",

            //nabeel
            aboutMyFix: "About my Fixed Asset",
            imagesAndDoc: "Images & Documents",
            submitMyInvestors: "Submit My Investors",
            proposedVal: "Proposed value",
            docs: 'Documents',
            consistof: "Consist of",
            category: "Category",
            addnewpropertytothis: "Add new property to this project",
            upload: "UPLOAD",
            assignfromcurrentproperties: "Assign from current properties",
            ownReport: 'Please add your own report on this',
            socialId: 'Social ID',
            details: "Details",
            question: "question",
            startContract: "Start contract",
            endContract: "End contract",
            publicFeedBack: "Public feedback",
            FeedBack: "Feedback",
            thisFeedBack: "This feedback will be shared on your 's tasker profile",
            feedbackToTasker: "Feedback to tasker",
            qualityOfWork: "Quality of work",
            adhenrence: "Adhenrence to schedule",
            communication: "Communication",
            shareYourExp: "Share your experience with this tasker to site community",
            disable: "Disable",
            jobHere: 'Jobs',
            add: 'Add',
            form: 'Please fill the form',
            affiliateSys: 'Please add me to your affiliate system to promote through coupons',
            directMarket: 'For Direct Marketers',
            training: 'I am ready to attend the training',
            MarkThrough: 'I will do the marketing through',
            visits: 'Site Visits',
            markPhone: 'Marketing Phone Calls',
            both: 'Both',

            send: 'Send',
            createMessage: 'Create message',
            allTaskInState: 'All task in my state',
            myPreviousTasks: 'My previous tasks',
            tasksIappliedFor: 'Tasks i applied for',
            contactTheReq: 'Contact the request',
            plzApplyFirst: 'Please apply first',
            youCanNotcntct: 'You can not contact',
            ReviewThisTask: 'Review this task',
            Review: 'Review',
            feedbackToClient: 'Feedback to client',
            thisReview: 'This review will be shown to visitors to our site, please be as specific as',
            experience: 'Experience',
            giveFeedback: 'Give feedback',
            TaskIAppliedFor: 'Task i applied for',
            taskIWorkOnThem: 'Tasks I work on them',
            myInbox: 'My inbox',
            myProjects: 'My projects',
            varificationAndRep: 'Varification And Reports',
            agents: 'Agents',
            AgentsInCity: 'Agents in my city',
            TaskersInCity: 'Taskers in my city',
            TasksInCity: 'Tasks in my city',
            PropertiesInMyCity: 'Properties in my city',
            ProjectsInMyCity: 'Projects in my city',
            ConsistOf: 'Consists Of',
            allTaskInMyCity: 'All task in my city',
            myPhotos: 'My photos',
            save: 'Save',
            verification: 'verification',
            Report: 'Report',
            unverify: 'Unverify',
            send: 'Send',
            registerCopon: 'register_coupon',
            requestCopon: 'request_coupon',
            ourNetwork: 'Our Network',
            fund: 'I have fund',
            asset: 'I have Asset',
            money: 'About my amount of money',
            done: 'Done',
            step2: 'Continue to Step 2',
            step3: 'Continue to Step 3',
            step4: 'Continue to Step 4',
            proposed: 'PROPOSED MONEY CAN BE HOLD FOR INVESTMENT',
            province: 'State/Province',
            Gps: 'GPS Data',
            finalize: 'We are almost done. If you want to change anything before publishing this will be the best moment to do it. You can also preview how will your property look in our service',
            backStep: 'Back to Step 1',
            submitInvest: 'Submit My Investors',
            fixedAsset: 'About my Fixed Asset',
            propertyType: 'TYPE OF PROPERTY',
            pValue: 'PROPOSED VALUE',
            buyBanner: 'Buy Banner Ads',
            advertiseWithUs: 'Advertise with us',
            selectCat: 'Select Category',
            productDetail: 'Product Details',

            clicktolocation: 'Click to view location on google map',
            browse: 'Browse',
            buildingareasize: 'Building area size',
            landsizeunit: 'Land size unit',
            certification: 'Certification',
            area: 'Area',
            totalareasize: 'Total area size',
            contact: 'Contact us',
            photoId: 'Photo ID',
            addProof: 'Address Proof',

            transactionId: 'Transaction ID',
            package: 'Package',
            amount: 'Amount',
            reqDate: 'Request Date',
            free: 'Free',
            uploadPic: 'Upload your photo ID (Personal ID , Passport , ...etc)',
            uploadAdd: 'Upload address proof (Ultility bill , bank statement , ...etc)',
            profilePic: 'Profile Picture',
            changeAvtr: 'Change Avatar',
            avtr: 'Or select avatar',
            proPage: 'My profile page at akaratmisr.com:',
            link: 'https://akaratmisr.com/',
            myAccount: 'My Account',
            skype: 'Skype',
            fbAccount: 'Facebook account',
            twitrAcc: 'Twitter account',
            linkedIn: 'Linkedin account',
            google: 'Google+ account',
            sureAllow: 'Are you sure to allow this user copying your property',
            fb: 'Facebook',
            twit: 'Twitter',
            gogle: 'Google',

            update: 'Update',
            updatePackage: 'Update Your Package',
            speak: 'Speak Language',
            change: 'Change',
            akaratOff: 'I can come to Akaratmisr office',
            car: 'I have a car',
            verification: 'Verification:',
            verifyAcc: 'Verify your account',

            pricenotnegotiable: 'Price not Negotiable',
            deliverydateofthepro: 'Delivery date of the Property',
            generalamenities: 'General Amenities',
            publishedon: 'Published on',
            distanceinformation: 'Distance information',

            enterLink: 'Please enter the link, without http://',
            verifyAcc: 'Verify your account',
            joinTeam: 'JOIN OUR TEAM',
            Logout: 'Logout',
            applicants: 'Applicants',
            locationonmap: 'Location on map',
            findrepresentative: 'Find Representative',
            modal: 'Modal',

            findagent: 'Find Agent',
            findtask: 'Find Task',
            findtasker: 'Find Tasker',
            findrequest: 'Find Request',
            findproperty: 'Find Property',
            findinternationalpartner: 'Find International Partner',

            add: 'Add',
            addproperties: 'Add Properties',
            addrequest: 'Add Request',
            addtask: 'Add Task',
            addproject: 'Add Project',
            myaccount: 'My Account',
            editproperties: 'Edit Properties',
            editrequest: 'Edit Request',
            alltaskinmystate: 'All Task In My State',
            myprevioustask: 'My previous tasks',
            taskiapplied: 'Task i applied for',
            taskiworkonthem: 'Task i work on them',
            feedback: 'Feedback',
            editTask: 'Edit Task',
            searchesFavorites: 'Searches Favorites',
            rating: 'Rating',
            fullnameprofile: 'Full Name, profile page url and phone number are required',
            fullnamepageurl: 'Full Name, profile page url, phone number, age and speak language are required',
            fullnameprofiletype: 'Full Name, profile page url, phone number, type are required',
            b: '',
            verifyInfo: 'Please verify all information form below',
            nameAgent: 'Name Of Agent/ Tasker',
            note: 'Note',
            PendingProperties: 'Pending Properties',
            allpropertiesInMyCity: 'All properties in my city',
            allrequestInMyCity: 'All request in my city',
            Condition: 'Condition',
            min_price: 'Minimum Price',
            max_price: 'Maximum Price',
            imagesizetolarge: 'Image size to large',
            onlypdfallow: 'Only (doc|docx|pdf) files allow',
            selectPhoto: 'please select photo!',
            imgHasBeen: 'Image has been uploaded',
            Select: 'Select',
            inbMesToRep: 'Inbox Message To Rep',
            ActivationStatus: 'Activation Status',
            oldImages: 'Old Images',

            clickToView: 'Click to view comments',


            promoteProperty: 'Promote this property',
            copyProperty: 'Are you sure you want to copy this property?',
            reqCopy: 'Someone required to copy your property',

            thisuserdont: "This user don't have permission",
            blogposts: "Blog Posts",
            articles: "Articles",
            content: "Content",
            metadisciption: "Meta description:",
            metadisciptionforseo: "Meta description for SEO:",
            keywords: "Keywords:",
            keywordforseo: "Keyword for SEO",
            // mommo
            DeliverTheTask: 'Deliver the task',
            Process: 'Process',
            Featured: 'Featured',
            CreatedDate: 'Created date',
            misable: "Misable",

            to: 'To',
            Subject: 'Subject',
            date: 'Date',
            addInvestorMoney: 'Add Money Investor',

            // mommo



            locationservicesaredisabled: 'Location services are disabled please open your phone location',

            district: " District",
            subdistrict: " Subdistrict ",

        }

        this.props.languageSet(str, this.state.route, this.state.userHave, this.state.userDetails)
    }

    setLanguageArr() {
        str = {
            language: "ar",

            ////////////////////////////1st slide text walkthrough screen//////////////////////////////

            signupto: "اشترك للاستمتاع بالعديد من الخدمات المجانية في أفضل المواقع العقارية في مصر",
            searchinmore: "ابحث في أكثر من 250.000 عقار في مصر ويمكنك بيع وشراء وتوظيف العمال مجاناً بطريقة سهلة جداً. الاتصال مباشرة مع البائع أو المشتري أو العامل دون أي عمولات",

            ////////////////////////////2nd slide text walkthrough screen//////////////////////////////

            findyourbesttasker: "العثور على أفضل المهام الخاصة بك بين 15000 + المساعدين والعاملين على التطبيق لدينا",
            forfirsttimeinegypt: "لأول مرة في مصر والشرق الأوسط ، يمكنك إدارة جميع المهام العقارية التي تحتاج إليها في مكان واحد. يمكنك العثور على أفضل المهام ، تعيين مهمة للموضوع ، متابعته وتقييمه بعد انتهاء مهمته",

            ////////////////////////////3rd slide text walkthrough screen//////////////////////////////

            our300representative: "ممثلينا الـ 300 في خدمتكم في جميع المناطق المصرية",
            ifyouneedourhelpto: "إذا كنت بحاجة إلى مساعدتنا لفحص ومراجعة وتحقق وتأمين صفقتك وبيعها ... سنسعد أن نكون في خدمتك. لدينا ممثلينا في جميع أنحاء مدن مصر لخدمتك. يمكننا مساعدتك أيضا في تأثيث واستثمار الممتلكات الخاصة بك في أفضل طريقة",

            ////////////////////////////4th slide text walkthrough screen//////////////////////////////

            thousandsofagents: "الآلاف من الوكلاء والمطورين يتنافسون على رضاكم",
            onlyinourappyoucan: "فقط في التطبيق لدينا يمكنك مقارنة العروض من آلاف الوكلاء والمطورين من السهل جدا واختيار أفضل عرض يناسب متطلباتك وقدراتك المالية",

            ////////////////////////////5th slide text walkthrough screen//////////////////////////////

            specialprograms: "برامج خاصة للمستثمرين والمسوقين",
            wehavecustomized: "لدينا برامج وخدمات مخصصة لأي شخص يحتاج إلى الاستثمار في قطاع العقارات وأيضا نحن نقدم برامج الشراكة التابعة للمسوقين",

            // Wasi Work start From Here

            tel: 'الهاتف',
            facebook: 'صفحة الفيسبوك',
            Linkedin: 'تابعني على',
            website: 'موقع الكتروني',
            seo: 'محرك البحث الأمثل',
            fbAds: 'إعلانات الفيسبوك والحملة',
            discription: 'وصف',
            dmp: 'تخطيط التسويق الرقمي',
            vibComp: 'حملات فايبر',
            dbOffer: 'عروض قاعدة البيانات',
            graphDes: 'تصميم جرافيك',
            instCom: 'حملات انستغرام',
            youtCom: 'حملات يوتيوب',
            mobAppMar: 'تسويق تطبيقات الجوال',
            haveFundAlert2: 'ملء جميع الحقول',
            haveFundAlert3: 'املأ جميع الحقول وتأكد من وجودها على موقع GPS',
            telAlert: 'اسم وهاتف مطلوبة',
            contacUstAlert: 'يو بي إس! لقد كنت مزود الخدمة لدينا. إذا كان لديك أي سؤال ، يرجى الاتصال بنا',
            sureAllow: 'هل أنت متأكد من السماح لهذا المستخدم بنسخ الممتلكات الخاصة بك',

            // Wasi Work End Here

            signup: "سجل",
            signup1: "سجل",
            signin: "تسجيل الدخول",
            login: "تسجيل الدخول",
            email: "البريد الإلكتروني",
            password: "كلمه السر",
            confirmPassword: "تأكيد كلمة المرور",
            phoneNumber: "رقم الهاتف",
            forgetpassword: "نسيت رقمك السري",
            loginwithyourfacebook: "تسجيل الدخول مع الفيسبوك الخاص بك",
            loginwithyourtwitter: "تسجيل الدخول مع تويتر الخاص بك",
            loginwithyourgoogle: "تسجيل الدخول مع جوجل الخاص بك",
            enteryouremail: ".أدخل بريدك الإلكتروني أدناه لإعادة تعيين كلمة المرور الخاصة بك",
            addyouremailaddress: "أضف عنوان بريدك الإلكتروني",
            submit: "خضع",
            aftersubmitpleasecheck: "بعد الإرسال ، يرجى التحقق من مجلد البريد الوارد والرسائل غير المرغوب فيها",
            backtosignin: "رجوع إلى تسجيل الدخول",
            signupassallerorbuyer: "قم بالتسجيل كبائع أو مشتري",
            signupastasker: "قم بالتسجيل باسم تاسكر",
            signupasagentordeveloper: "قم بالتسجيل كوكيل أو مطور",
            signupasrepresentative: "سجل كممثل",
            signupasInternationalPartners: "قم بالتسجيل كشركاء دوليين",
            signupwithyourfacebook: "اشترك مع الفيسبوك الخاص بك",
            signupwithyourtwitter: "اشترك مع تويتر الخاص بك",
            signupwithyourgoogle: "اشترك مع جوجل + الخاص بك",
            fullname: "الاسم الكامل",
            ihaveemailaddredd: "لدي عنوان بريد الكتروني",
            thisnumberhaswhatsapp: "هذا الرقم لديه ال WhatsApp",
            thisnumberhasviber: "هذا الرقم له فايبر",
            ireadtermsandconditions: "قرأت الشروط والأحكام",
            sendactivationcode: "إرسال رمز التفعيل إلى البريد الإلكتروني",
            activatemyaccountby: "تفعيل حسابي عن طريق مكالمة لم يرد عليها",
            youmustacceptthe: "يجب عليك قبول شروط الخدمة قبل المتابعة",
            promoteProperty: 'تعزيز هذه الخاصية',
            copyProperty: 'هل أنت متأكد أنك تريد نسخ هذا العقار؟',
            reqCopy: 'شخص مطلوب لنسخ الممتلكات الخاصة بك',
            thisuserdont: "هذا المستخدم ليس لديه إذن",
            blogposts: "بلوق وظائف",
            articles: "مقالات",

            signupastasker: "الاشتراك كمسؤول",
            thisisacompanyaccount: "هذا حساب شركة",
            Searchitems: "...البحث عن العناصر",
            selectcountry: "حدد الدولة",
            selectstate: "اختر ولايه",
            selectcity: "اختر مدينة",
            selectdistricts: "اختر المناطق",
            selectsubdistricts: "اختر المناطق الفرعية",
            city: " مدينة",
            icanwork: "يمكنني العمل",
            icancover: "يمكنني تغطية المنطقة",
            icancoverstate: "يمكنني تغطية المنطقة (الولاية)",
            icancovercity: "يمكنني تغطية المنطقة (مدينة)",
            icancoverdistricts: "يمكنني تغطية المنطقة (المناطق)",
            icancoversubdistricts: "يمكنني تغطية المنطقة (المناطق الفرعية)",
            icancover: "يمكنني تغطية المنطقة",
            homeTel: "هاتف المنزل",
            fax: "فاكس",
            address: "عنوان",
            description: "وصف",
            uploadyourphoto: "رفع صورتك",
            uploadphoto: "حمل الصورة",
            uploadyourdocuments: "تحميل المستندات الخاصة بك",
            iwillprovidelater: "سأقدم لاحقا",
            uploadyourid: "قم بتحميل معرفك",
            uploadid: "رقم تعريف التحميل",
            uploadyourdocumentsaddress: "قم بتحميل مستند الإثبات الخاص بك (فواتير الخدمات ، كشف الحساب البنكي ، .. الخ)",
            uploaddocuments: "تحميل المستندات",
            ideclareallinformation: "أعلن أن جميع المعلومات الواردة أعلاه صحيحة وأستعد للتحقق منها",
            companyname: "اسم الشركة",
            Register: "تسجيل",
            age: "عمر",
            gender: "جنس",
            ispeak: "أتكلم",
            computerskills: "مهارات الحاسوب",
            icancometo: "يمكنني الحضور إلى مكتب Akaratmisr.com للاجتماع الشخصي",
            ihaveacar: "لدي سيارة",
            type: "نوع",
            clickToView: 'انقر لعرض التعليقات',


            // inputErrors
            pleasetypefullname: "يرجى كتابة الاسم الكامل (مطلوب)",
            pleasetypepassword: "يرجى كتابة كلمة المرور (مطلوب)",
            pleasetypeconfirmpassword: "يرجى كتابة تأكيد كلمة المرور (مطلوب)",
            passworddoesnotmatched: "كلمة المرور غير متطابقة",
            pleasetypetypesofwork: "يرجى كتابة أنواع العمل (مطلوب)",
            pleaseselectstate: "يرجى تحديد الدولة (مطلوب)",
            pleaseselectcity: "يرجى اختيار المدينة (مطلوب)",
            pleaseselectworkingstate: "يرجى تحديد حالة العمل (مطلوب)",
            pleasetypeage: "يرجى كتابة العمر (مطلوب)",
            pleasetypetelephone: "يرجى كتابة رقم الهاتف (مطلوب)",
            pleasesetyourappropriate: "يرجى تحديد لغتك المناسبة (مطلوب)",
            pleaseselectstateicancover: "يرجى تحديد حالة يمكنني تغطية (مطلوب)",
            pleaseselectcityicancover: "يرجى تحديد المدينة التي يمكنني تغطية (مطلوب)",
            pleasetypeyouremailaddress: "يرجى كتابة عنوان بريدك الإلكتروني (مطلوب)",
            pleasetypeyourcity: "يرجى كتابة مدينتك (مطلوب)",
            pleaseuploadyourphoto: "يرجى تحميل صورتك (مطلوب)",
            pleaseuploadyourId: "يرجى تحميل معرفك (مطلوب)",
            pleaseuploadyouraddressFile: "يرجى تحميل عنوانكالملف (مطلوب)",

            // after login screen strings 1st page lists
            properties: "الخصائص",
            Tasker: "تاسكر",
            hire: "توظيف",
            Tasks: "مهام",
            agentanddevelopers: "الوكيل والمطورين",
            representative: "وكيل",
            projects: "مشاريع",
            news: "أخبار",

            // after login screen strings 2nd page lists
            propertiescategories: "فئات العقارات",
            browsetasker: "تصفح تاسكر",
            taskcategory: "فئة المهمة",
            propertyforbuy: "خصائص للشراء",
            propertyforrent: "عقارات للإيجار",
            lawyers: "المحامين",
            doctorist: "طبيب",
            painters: "الرسامين",
            floorandtiles: "عمال الأرضيات والبلاط",
            plumbers: "السباكين",
            carpenters: "النجارين",
            furnituremovers: "نقل اثاث",
            roofworker: "عامل السقف",
            others: "الآخرين",
            apartment: "شقة",
            house: "منزل",
            land: "أرض",
            condo: "كوندو",
            chalet: "الشاليه",
            villa: "فيلا",
            palace: "قصر",
            commercial: "تجاري",
            administrative: "إداري",
            agriculture: "الزراعة",
            industrial: "صناعي",
            nofound: "لم يوجد",
            shop: "متجر",
            warehouse: "مستودع",
            office: "مكتب. مقر. مركز",
            clinic: "عيادة",
            hospital: "مستشفى",
            farm: "مزرعة",
            factory: "مصنع",
            room: "مجال",



            // subtitle for
            subtitlefor: "مناسب ل",
            residential: "سكني",
            touristic: "السياحية",
            medical: "طبي",
            educational: "تربوي",

            metTaker: 'التقيت هذا الوكيل أو تاسكر شخصيا',
            overallMet: 'انطباعي العام عن لقائي',

            // Property Status",
            propertystatus: "حالة العقار",
            newbuilding: "بناء جديد",
            oldbuilding: "المبنى القديم",
            notbuildyet: "لا تبني بعد",
            underDevelopment: "تحت التطوير",
            halfFlasing: "نصف اللمعان",
            completefinishing: "التشطيب الكامل",
            hugeluxefinishing: "التشطيب ضخمة لوكس",
            furnished: "مفروشة، مد، زود",
            searchforproperty: "بحث عن الملكية",
            searchwithkeyword: "البحث مع الكلمة الرئيسية",
            propertycode: "رمز الملكية",
            purpose: "غرض",
            sale: "تخفيض السعر",
            rent: "تأجير",
            salrorrent: "بيع أو إيجار",
            bedrooms: "غرف نوم",
            bathrooms: "الحمامات",
            any: "أي",
            pricerange: "نطاق السعر",
            minimum: "الحد الأدنى",
            maximum: "أقصى",
            searchnow: "ابحث الآن",
            // addrequest: "Add request",
            title: "عنوان",
            putalldetails: "94/5000 ضع كل التفاصيل كما يمكنك القيام به ، وسوف يسهل على المشتري معرفة المزيد والاتصال بك",
            plsputgood: "الرجاء وضع عنوان جيد في سطور",
            directphonenumberforthis: "رقم الهاتف المباشر لهذه الخاصية",
            result: "نتيجة",
            contact: 'اتصل',

            //terms and conditions
            termsandcondition: "الأحكام والشروط",
            thetermakaratmisr: 'يشير مصطلح "Akaratmisr.com" أو "نحن" أو "نحن" إلى أصحاب Akaratmisr.com. يشير مصطلح "أنت" إلى المستخدم أو المشاهد لموقعنا على الويب. يخضع استخدام هذا الموقع لشروط الاستخدام التالية:',
            thecontentofthe: "محتوى صفحات هذا الموقع هو لمعلوماتك العامة والاستخدام فقط. أنه يخضع للتغيير دون إشعار.",
            neitherwenot: 'لا نقدم أي طرف ثالث أي ضمانات أو ضمانات فيما يتعلق بدقة أو دقة أو أداء أو اكتمال أو ملاءمة المعلومات والمواد الموجودة أو المعروضة على هذا الموقع لأي غرض معين. أنت تقر بأن هذه المعلومات والمواد قد تحتوي على معلومات غير دقيقة أو أخطاء ، ونحن نستبعد صراحة المسؤولية عن أي عدم دقة أو أخطاء من هذا القبيل إلى أقصى حد يسمح به القانون.',
            youruseofanyinformation: 'إن استخدامك لأية معلومات أو مواد موجودة على هذا الموقع هو على مسؤوليتك الخاصة ، ولن نكون مسئولين عنها. تقع على عاتقك مسؤولية التأكد من أن أي منتجات أو خدمات أو معلومات متوفرة من خلال هذا الموقع الإلكتروني تلبي متطلباتك الخاصة.',
            thiswebsitecontains: 'يحتوي هذا الموقع على مواد مملوكة لنا أو مرخصة لنا. تشمل هذه المواد ، على سبيل المثال لا الحصر ، التصميم والتخطيط والمظهر والمظهر والرسومات. يحظر إعادة الإنتاج بخلاف إشعار حقوق النشر ، الذي يشكل جزءًا من هذه الشروط والأحكام.',
            alltrademarks: 'جميع العلامات التجارية الواردة في هذا الموقع والتي ليست ملكا أو مرخصة للمشغل معترف بها على الموقع. من وقت لآخر قد يحتوي هذا الموقع أيضا على روابط لمواقع أخرى. يتم توفير هذه الروابط لراحتك لتقديم مزيد من المعلومات. إنها لا تعني أننا نؤيد موقع (مواقع) الويب. نحن لا نتحمل أي مسؤولية عن محتوى موقع (مواقع) الويب المرتبط.',
            youruseofthis: 'يخضع استخدامك لهذا الموقع وأي نزاع ينشأ عن استخدام هذا الموقع لقوانين الجمهورية اليمنية.',
            refundpolicy: 'سياسة الاسترجاع',
            duetothenatureofour: 'نظرًا لطبيعة خدماتنا ، فإننا لا نقدم أي مبالغ مستردة بغض النظر عن الأسباب والأسباب. جميع المبيعات نهائية ، ولا يمكن رد أي أرصدة غير مستخدمة.',
            websitedisclaimer: 'الموقع إخلاء المسؤولية',
            theinformationcontainedinthis: 'المعلومات الواردة في هذا الموقع هي لأغراض المعلومات العامة فقط. هذه المعلومات مقدمة من Akaratmisr.com وفي الوقت الذي نسعى فيه إلى الحفاظ على المعلومات محدثة وصحيحة ، فإننا لا نقدم أية إقرارات أو ضمانات من أي نوع ، صريحة أو ضمنية ، حول اكتمالها أو دقتها أو موثوقيتها أو ملاءمتها أو توفرها مع احترام الموقع أو المعلومات أو المنتجات أو الخدمات أو الرسومات ذات الصلة الموجودة على الموقع لأي غرض. لذلك فإن أي اعتماد تقوم به على مثل هذه المعلومات هو على مسؤوليتك الخاصة.',
            innoeventwillwebe: 'لن نكون مسئولين بأي حال من الأحوال عن أي خسارة أو ضرر بما في ذلك على سبيل المثال لا الحصر ، أي خسارة أو ضرر غير مباشر أو تبعي ، أو أي خسارة أو ضرر ناتج عن فقدان البيانات أو الأرباح الناتجة عن ، أو فيما يتعلق باستخدام هذا الموقع. .',
            everyeffortismadeto: 'يتم بذل كل جهد للحفاظ على الموقع وتشغيله بسلاسة. ومع ذلك ، لا تتحمل Akaratmisr.com أية مسؤولية ، ولن تكون مسؤولة عن ، عدم إتاحة الموقع بشكل مؤقت بسبب مشاكل فنية خارجة عن إرادتنا.',
            privacypolicy: 'سياسة خاصة',
            thisprivacy: 'تحدد سياسة الخصوصية هذه كيفية استخدامنا وحماية أية معلومات تقدمها لنا عند استخدامك لهذا الموقع الإلكتروني.',
            akaratmisrcomiscommitted: 'تلتزم Akaratmisr.com بضمان حماية خصوصيتك. إذا طلبنا منك تقديم معلومات معينة يمكن التعرف عليها عند استخدامك لهذا الموقع ، فيمكنك التأكد من أنه سيتم استخدامه فقط وفقًا لبيان الخصوصية هذا. قد نقوم بتغيير هذه السياسة من وقت لآخر عن طريق تحديث هذه الصفحة . يجب عليك التحقق من هذه الصفحة من وقت لآخر للتأكد من أنك راضٍ عن أي تغييرات.',
            security: 'الأمان',
            wearecommittedtoensuringthat: 'نحن ملتزمون بضمان أمن معلوماتك. من أجل منع الوصول أو الإفصاح غير المصرح به ، قمنا بوضع إجراءات مادية وإلكترونية وإدارية مناسبة لحماية وتأمين المعلومات التي نجمعها عبر الإنترنت. يستخدم Akaratmisr.com نظام طبقة المقابس الآمنة (SSL) لتشفير جلسة الدفع بالكامل. تعد SSL معيارًا صناعيًا للحفاظ على البيانات والمعلومات آمنة ويتم استخدامها من قِبل شركات الإقراض والمصارف ووكالات الائتمان.',
            paidservices: 'الخدمات المدفوعة',
            theclientagress: '* يوافق العميل على الالتزام بكافة شروط وأحكام Akaratmisr.com',
            akaratmisrcomreservesthe: 'تحتفظ Akaratmisr.com بالحق في تغيير شروطها في أي وقت.',
            theclientagressto: 'يوافق العميل على نشر المحتوى القانوني والأخلاقي الذي لا ينتهك أي قوانين أو حقوق نشر أو ملكية من قبل الآخرين.',
            pointspurchasedby: 'النقاط التي تم شراؤها من قبل العميل منتهية الصلاحية بعد سنة واحدة من تاريخ الشراء وبمجرد انتهاء الصلاحية لا يمكن استخدامها أو استردادها.',
            theclientcan: 'يمكن للعميل إعادة نقاطه قبل انتهاء صلاحيتها ؛ ومع ذلك سيتم فرض رسوم استرداد 20 ٪.',
            akaratmisrcomisnotresponsibleforanymistakes: 'Akaratmisr.com ليست مسؤولة عن أي أخطاء أو مشاكل تحدث للعميل بسبب محتوى القوائم.',
            akaratmisrcomisnotresponsibleforpoints: 'Akaratmisr.com ليست مسؤولة عن النقاط التي فاتتها بسبب أخطاء من قبل العميل.',
            thecompanycanstopusingthe: 'يمكن للشركة التوقف عن استخدام نظام النقاط في أي وقت ، وسيحق للعميل استرداد مبلغ يعادل قيمة النقاط غير المستخدمة.',
            akaratmisrcomwebsitecanstop: 'يمكن أن يتوقف موقع Akaratmisr.com عن العمل لساعات أو أيام بسبب الصيانة أو الاختراق أو المشكلات الفنية أو لأي سبب آخر ؛ لذلك لن تقوم الشركة برد العميل بسبب مثل هذه التحديات إلا إذا تجاوز وقت التوقف 7 أيام في غضون 30 يومًا.',
            theclientcannotpost: 'لا يمكن للعميل نشر قوائم مزيفة أو صور مزيفة أو قوائم مكررة أو قوائم منتهية الصلاحية أو قوائم بيع. إذا عثر Akaratmisr.com على قوائم من هذا النوع ، فيمكنه حذفها دون رد العميل للنقاط المستخدمة. في حالة تكرار المخالفة ، يمكن أن يقوم موقع Akaratmisr.com بإغلاق حساب العميل وخصم 20٪ من قيمته المتبقية كرسوم مخالفة.',
            theclientcommitsto: 'يلتزم العميل بإزالة أي ممتلكات تم بيعها خلال 3 أيام من بيعها ، وإلا يحق لـ Akaratmisr.com حذف هذه العقارات دون إصدار أي مبالغ مستردة.',
            theclientcannotusehis: 'لا يمكن للعميل استخدام نقاطه لإضافة قوائم لعميل آخر أو أي كيان آخر.',
            akaratmisrcomcancloseany: 'بإمكان موقع Akaratmisr.com إغلاق حساب أي عميل إذا وجد أي علامات تدل على التلاعب في الحساب ، ويمكنه تحصيل رسوم مخالفة قدرها 20٪.',
            theclientcannotshellhis: 'لا يستطيع العميل بيع نقاطه إلى عميل آخر أو أي كيان آخر.',
            akaratmisrcomreservestheright: 'تحتفظ Akaratmisr.com بالحق في رفض تقديم أي عميل لأي سبب من الأسباب. إذا كان العميل لديه نقاط في حسابه ، فستقوم الشركة برد قيمة النقاط المتبقية.',
            theclientisresonsibleforthe: 'العميل مسؤول عن أمان حسابه ، لذلك نوصي بحماية اسم المستخدم وكلمة المرور للحساب لتجنب سرقة الحساب.',
            companiescannotusethe: 'لا يمكن للشركات استخدام نظام النقاط للإعلان عن مشروع يحتوي على أكثر من 10 وحدات مثل المجمعات السكنية والمراكز التجارية والمشروعات الطبية والتجارية. لا يمكن للشركات أيضا الإعلان عن وحدة محددة في هذه المشاريع. في حالة انتهاك هذا المصطلح ، يمكن لـ Akaratmisr.com حذف هذه القوائم دون تعويض المعلن عن النقاط المحذوفة.',
            eachpaidlistingremainslive: 'تبقى كل قائمة مدفوعة على الإنترنت لمدة 30 يومًا من تاريخ موافقة المشرف. بعد 30 يومًا ، تنتهي صلاحية بطاقة التعريف تلقائيًا ، ويمكن للعميل تجديدها بالدفع مرة أخرى للإدراج.',
            akaratmisrcomisnotresponsibleifthe: 'Akaratmisr.com ليست مسؤولة إذا كان العميل حذف أي من القوائم المدفوعة عن قصد أو عن غير قصد. القوائم المحذوفة هي إجراء دائم ، ولا يمكن للعميل أن يطلب من الشركة إعادة تنشيط الإعلان أو استرداد نقاط الإدراج.',
            eachlistingshould: 'يجب أن تحتوي كل قائمة على تفاصيل خاصية واحدة. تحتفظ Akaratmisr.com بالحق في عدم الموافقة أو حذف أي بطاقة تحتوي على تفاصيل حول أكثر من وحدة واحدة.',
            itsnotallowedtochange: 'لا يسمح بتغيير نوع أو موقع مكان الإقامة بمجرد تقديمه',
            howweusecookies: 'كيف نستخدم ملفات تعريف الارتباط',
            acookieisasmallfile: "ملف تعريف الارتباط هو ملف صغير يطلب الإذن ليتم وضعها على محرك الأقراص الثابت للكمبيوتر الخاص بك. بمجرد موافقتك ، تتم إضافة الملف ويساعد ملف تعريف الارتباط على تحليل حركة مرور الويب أو يتيح لك معرفة وقت زيارتك لموقع معين. تسمح ملفات تعريف الارتباط لتطبيقات الويب بالرد عليك كفرد. يمكن لتطبيق الويب تصميم عملياته وفقًا لاحتياجاتك ، ويحب ويكره من خلال جمع وتذكر المعلومات حول تفضيلاتك.",
            weusetrafficlog: 'نحن نستخدم ملفات تعريف ارتباط سجل حركة المرور لتحديد الصفحات التي يتم استخدامها. ويساعدنا ذلك في تحليل البيانات المتعلقة بحركة مرور صفحات الويب وتحسين موقعنا على الويب من أجل تكييفها وفقًا لاحتياجات العملاء. نحن نستخدم هذه المعلومات فقط لأغراض التحليل الإحصائي ومن ثم تتم إزالة البيانات من النظام.',
            overallcookieshelpus: '266/5000بشكل عام ، تساعدنا ملفات تعريف الارتباط في تزويدك بمواقع ويب أفضل ، من خلال تمكيننا من مراقبة الصفحات التي تجدها مفيدة والتي لا تفعلها. لا يمنحنا ملف تعريف الارتباط بأي طريقة الوصول إلى جهاز الكمبيوتر الخاص بك أو أي معلومات عنك ، بخلاف البيانات التي تختار مشاركتها معنا.',
            youcanchoseto: 'يمكنك اختيار لقبول أو رفض ملفات تعريف الارتباط. تقبل معظم متصفحات الويب ملفات تعريف الارتباط تلقائيًا ، ولكن يمكنك عادةً تعديل إعدادات المستعرض لرفض ملفات تعريف الارتباط إذا كنت تفضل ذلك. هذا قد يمنعك من الاستفادة الكاملة من الموقع.',
            linktootherwebsites: 'وصلة لمواقع أخرى',
            ourwebsitemay: 'قد يحتوي موقعنا على روابط لمواقع إلكترونية أخرى ذات أهمية. ومع ذلك ، بمجرد استخدامك لهذه الروابط لمغادرة موقعنا ، يجب أن تلاحظ أنه ليس لدينا أي سيطرة على هذا الموقع الآخر. لذلك ، لا يمكننا أن نكون مسؤولين عن حماية وخصوصية أي معلومات تقدمها أثناء زيارتك لهذه المواقع ولا تخضع مثل هذه المواقع لبيان الخصوصية هذا. يجب عليك توخي الحذر والنظر في بيان الخصوصية المطبق على موقع الويب المعني.',
            ifyoubelievethatany: 'إذا كنت تعتقد أن أي معلومات نمتلكها غير صحيحة أو غير كاملة ، يرجى الكتابة إلينا أو مراسلتنا عبر البريد الإلكتروني في أقرب وقت ممكن ، على العنوان المذكور أعلاه. سنقوم على الفور بتصحيح أي معلومات تم العثور عليها غير صحيحة.',

            addproperty: 'اضف العقار',
            addtask: 'إضافة مهمة',
            addrequest: 'إضافة طلب',

            descriptionandaddress: 'الوصف وعنوانه',
            visitOff: 'زرت المكتب أو المنزل أو مكان عمل الوكيل / تاسكر',
            overallVisit: 'انطباعي العام عن زيارتي له',

            image: 'صورة',
            featuredimage: 'صورة مميزة',
            selectfile: 'حدد ملف',
            gallery: 'صالة عرض',
            embeddedvideourl: 'رابط الفيديو المدمج',
            estatebrochure: 'الكتيب العقاري',
            UploadPDFDocorDocXfile: 'قم بتحميل ملف PDF أو Doc أو DocX',
            price: 'السعر',
            contactusto: 'اتصل بنا لمعرفة السعر',

            //for sale
            totalprice: 'سعر البيع',
            totalpricecurrency: 'عملة سعر البيع',
            priceperunit: 'السعر لكل وحدة',
            priceperunitcurrency: 'السعر لكل وحدة العملة',
            priceunit: "وحدة السعر",
            creaditpayment: 'دفعة ائتمانية',
            upfrontpayment: 'مقدما الدفع',
            monthlypayment: 'الدفع الشهري',
            quarterlypayment: 'دفع ربع سنوي',
            yearlypayment: 'الدفع السنوي',
            period: 'فترة',
            periodpriceunit: 'وحدة السعر الفترة',
            month: 'شهر',
            year: 'عام',

            //for rent
            rentprice: 'سعر الايجار',
            rentpricecurrency: 'سعر إيجار العملة',
            rentpriceunit: 'وحدة سعر الايجار',

            propertyistimesheare: 'الملكية هي نظام المشاركة بالوقت',
            pricenegotiable: 'السعر قابل للتفاوض',
            usdollar: 'دولار - دولار أمريكي',
            egyptainpound: 'جنيه مصرى',

            //Summary
            summary: 'ملخص',
            areasize: 'حجم المنطقة',
            areasizeunit: 'وحدة حجم المنطقة',
            arce: 'ارسي',
            hector: 'المستبد',
            fedan: 'فيدورا',
            squarefeet: 'قدم مكعب',
            squaremetres: 'متر مربع',




            yearbuilt: 'بنيت عام',
            estateCondition: 'حالة العقار',
            thepropertyis: 'الخاصية جاهزة للاستلام',
            selectdeliverydate: 'حدد تاريخ التسليم',

            //distance
            distance: 'مسافه: بعد',
            beach: 'شاطئ بحر',
            bus: 'حافلة',
            cafe: 'كافيه',
            gasstation: 'محطة غاز',
            Hospital: 'مستشفى',
            pharmacy: 'مقابل',
            playground: 'ملعب',
            police: 'شرطة',
            repair: 'يصلح',
            train: 'قطار',
            mosque: 'مسجد',
            sportclub: 'نادي رياضي',
            metro: 'مترو',
            church: 'كنيسة',
            selectunit: 'اختر الوحدة',
            minutes: 'الدقائق',
            meters: 'متر',
            feet: 'أقدام',
            kilometers: 'كم',
            mile: 'ميل',
            nextStep: 'انتقل إلى الخطوة التالية',
            reg: 'التسجيل الاجتماعي',

            // Amenities
            amenities: 'وسائل الراحة',
            airconditioning: 'تكييف',
            balcony: 'شرفة',
            cableTV: 'الكيبل التلفزيوني',
            computer: 'الحاسوب',
            dishwasher: 'غسالة أطباق',
            grill: 'شواء',
            heater: 'سخان',
            lift: 'مصعد',
            parking: 'موقف سيارات',
            pool: 'حوض السباحة',
            smooking: 'تدخين',
            washingMachine: 'غسالة',
            wifi: 'واي فاي',

            fileattached: 'ملف مرفق',
            numberoffloors: 'عدد الطوابق',
            postadd: 'إضافة الوظيفة',
            fullview: 'عرض كامل',
            fb: 'فيس بوك',
            twit: 'تغريد',
            gogle: 'جوجل',

            aboutme: 'عني',
            thereisnodataavailable: 'لا توجد بيانات متاحة',
            contact: 'اتصل',
            budget: 'ميزانية',
            posted: 'نشر -',
            propertyandtime: 'الملكية والأوقات',
            location: 'موقعك',
            id: 'هوية شخصية',
            views: 'الآراء',
            avilablefor: 'متاح لى',
            name: 'اسم',
            makephonecall: 'اجري مكالمة هاتفية',
            districtandsubdistrict: 'المقاطعة و المنطقة الفرعية',
            stateandcity: 'الدولة والمدينة',
            startdate: 'تاريخ البدء',
            enddata: 'تاريخ الانتهاء',
            perpose: 'غرض',
            floor: 'أرضية',
            status: 'الحالة',
            suitablecategories: 'فئات مناسبة',
            profile: 'الملف الشخصي',
            mypayment: 'مدفوعاتى',
            myfavorites: 'مفضلتي',
            mailbox: 'صندوق بريد',
            beourserviceprovider: 'كن مزود الخدمة لدينا',
            investwithus: 'استثمر معنا',
            promoteoursite: 'تعزيز موقعنا',
            promotemyads: 'تعزيز إعلاناتي',
            propertiesiadded: 'خصائص أضفتها',
            mybuyrequests: 'طلبات الشراء الخاصة بي',
            myrequiredtasks: 'المهام المطلوبة',
            postnewtask: 'أضف مهمة جديدة',
            agent: 'وكيل',
            internationalpartner: 'الشريك الدولي',
            request: 'طلب',
            searches: 'بحث',
            myaffiliateprogrammarketing: 'بلدي التسويق التابعة لبرنامج',
            mycouponsactivities: 'أنشطة الكوبونات الخاصة بي',
            allpropertiesiadded: 'جميع الخصائص التي أضفتها',
            id: '#هوية شخصية',
            title: "عنوان",
            publishdate: "تاريخ النشر",
            conditionstatus: "حالة الشرط",
            featuredactions: "إجراءات مميزة",
            delete: "حذف",
            edit: "تصحيح",
            active: "نشط",
            deactivate: "عطل",
            actions: "أفعال",







            categories: 'الاقسام',
            need: 'بحاجة إلى',
            price_max: 'السعر الأقصى بالجنيه',
            budgetinegp: 'الميزانية بالجنيه',
            fromdate: 'من التاريخ:',
            todate: 'حتى الآن:',
            activatemyaccount: 'تنشيط حسابي',
            verifyaccount: ' التحقق من الحساب',
            thanksforsubmitting: 'شكرا لتقديم التسجيل الخاص بك. نحن نقدم لك مكالمة لم يرد عليها الآن. يرجى التحقق من هاتفك وإدخال الأرقام الثلاثة الأخيرة من الرقم الذي تم الاتصال به للتحقق من حسابك.',
            verify: 'التحقق',
            ifyoudidnotreceivethecall: 'إذا لم تتلق المكالمة ، فيرجى تجربة مكالمة أخرى أو محاولة التحقق من خلال إرسال الرسائل القصيرة',
            last3digits: 'آخر 3 أرقام',
            ownerproperties: 'خصائص المالك',
            postedby: 'منشور من طرف',
            postedbysmal: 'منشور من طرف',
            name1: 'اسم:',
            phone: 'هاتف::',
            properties1: 'الخصائص:',
            sendmsg: 'إرسال رسالة',
            emailSubject: 'موضوع البريد الإلكتروني',
            pleasetypeyourmsg: 'من فضلك اكتب رسالتك',
            message: ' رسالة',
            pleasetypeemailorphone: 'يرجى كتابة البريد الإلكتروني أو الهاتف',
            pleasetypenewpassword: 'من فضلك اكتب كلمة سر جديدة',
            changepassword: 'غير كلمة السر',
            newpassword: 'كلمة السر الجديدة',
            retypenewpassword: 'أعد كتابة كلمة السر الجديدة',
            updatepassword: 'تطوير كلمة السر',
            back: 'الى الخلف',
            pleasetypemessage: 'يرجى كتابة الرسالة',
            pleasetypesubjectandmsg: 'يرجى كتابة الموضوع والرسالة',
            googlemap: 'خرائط جوجل',
            alldescriptionandaddress: 'جميع حقول الوصف والعنوان مطلوبة',
            pleasefill: 'يرجى ملء',
            distanceSmall: 'مسافه: بعد',
            allfieldsarerequired: 'جميع الحقول مطلوبة',
            listapplicants: "قائمة المتقدمين",
            favoritesproperties: "خصائص المفضلة",
            favoritesagents: "وكلاء المفضلة",
            applytask: "تطبيق المهمة",
            duration: "المدة الزمنية",
            quoteinegp: "اقتبس بالجنيه",
            ordays: "أو أيام",
            doyouhavequestionforthistask: "هل لديك سؤال لهذه المهمة؟",
            pleasefillfullform: "يرجى ملء النموذج الكامل",
            // listofapplicants: "قائمة المتقدمين",
            favoritesTasker: "المفضلة تاسكر",
            favoritesInternational: "المفضلة الدولية",
            favoritesRepresentative: "ممثل المفضلة",
            favoritesTasks: "المهام المفضلة",
            favoritesRequests: "طلبات المفضلة",
            favoritesSearches: "عمليات البحث المفضلة",
            mailbox: "صندوق بريد",
            investors: "المستثمرين",
            Immunetodoubt: "محصن من الشك في أن العقارات ستظل واحدة من أكثر أنواع الاستثمار أمنا. مما لا شك فيه أن بيئة العمل Akrat.msr التي تتيح لك الكثير من الوصول إلى أفضل الفرص الاستثمارية والقدرة على نقله من كل جانب ، حيث المعلومات والقدرات والعلاقات المتاحة نادراً ما تكون متاحة للكيانات ، حتى نتمكن من تقديم نوعين من الخدمات للمستثمرين أو لأولئك الذين يرغبون في الاستثمار في العقارات",
            FixedAssets: "1-إدارة الأصول الثابتة",
            Heretheinvestor: "هنا يمتلك المستثمر أصوله الثابتة الخاصة وسنساعده على استثمارها بشكل صحيح وآمن. سيبذل Akaratmisr.com .مصر قصارى جهده لتحقيق أفضل النتائج من استثمار ذلك. قد يكون لديك مصنع أو تحتاج إلى بعض الشركاء حتى تتمكن من دفع الأمور للأعلى. سيكون Akaratmisr.com عقارات.مصر معك لتقدم لك أفضل الحلول الاستثمارية لأصولك. تطمئن أنك سوف تحصل على أفضل حل للأصول الخاصة بك",
            IneedAkaratmisr: "أحتاج Akaratmisr.com عقارات.مصر ساعدني في استثمار الأصول الثابتة الخاصة بي",
            CapitalInvestment: "2-استثمار رأس المال",
            HereYouhavespecific: "هنا ، لديك مبلغ معين من المال وتحتاج إلى الاستثمار في سوق العقارات. سوف تفوض Akaratmisr.com عقارات.مصر للقيام بذلك نيابة عنك. ستكون الخطوات بسيطة مثل ذلك:",
            Filltheform: "1-املأ شكل معلومات الأموال والحقل الذي تقترح الاستثمار فيه",
            teamwillgothrough: "2- فريق Karimmisr.com عقارات.مصر سوف يتصفح هذا النموذج وسوف يقومون بالاتصال بك",
            bewithyouuntil: "3-المال سوف يكون معك حتى تجد Akaratmisr.com عقارات.مصر شيء مثير للاهتمام ، وسوف نتصل بك لتقديم كل التفاصيل لك",
            Iftheinvestmentopportunity: "4- إذا تم قبولك فرصة الاستثمار ، فسنذهب إلى أبعد من توقيع الاتفاقيات مباشرة مع جميع الأطراف وسندفع الأموال مباشرة دون الاحتفاظ بأي أموال في حساب Akaratmisr.com عقارات.مصر.",
            Ihavemoney: "عندي أموال وأحتاج إلى Akaratmisr.com عقارات.مصر ساعدني في استثمارها",
            myOutBox: "صندوق الصادر الخاص بي",
            emailSend: "تم إرسال البريد الإلكتروني بنجاح",
            addInvestor: "أضف مستثمر",
            aboutMyFix: "عن بلدي الأصول الثابتة",
            imagesAndDoc: "الصور والوثائق",
            addressOfInvestor: "عنوان المستثمر",
            submitMyInvestors: "يقدم المستثمرون",
            state: "حالة",
            proposedVal: "القيمة المقترحة",
            details: "تفاصيل",
            save: 'حفظ',

            businessRef: 'قدم الوكيل / تاسكر 3 مراجع أعمال',
            refRate: 'لقد قمت بالاتصال بالمراجع ومعدل خدمتها الذي يوفره التاجر / الوكيل على النحو التالي:',
            ref1: 'المرجع 1',
            ref2: 'المرجع 2',
            ref3: 'المرجع 3',
            note: 'ملحوظة',
            min_price: 'سعر الحد الأدنى',
            max_price: 'السعر الاقصى',
            imagesizetolarge: 'حجم الصورة إلى كبيرة',
            onlypdfallow: 'تسمح فقط ملفات (doc | docx | pdf)',

            taskername: "اسم تاسكر",
            dateapplied: "تاريخ تطبيقها",
            maximum3items: "الحد الأقصى 3 بنود الحد",
            question: "سؤال",
            startContract: "بدء العقد",
            endContract: "عقد نهاية",
            publicFeedBack: "ردود الفعل العامة",
            thisFeedBack: "ستتم مشاركة هذه التعليقات على ملف تعريف تاسكر",
            feedbackToTasker: "ردود الفعل على تاسكر",
            qualityOfWork: "جودة العمل",
            adhenrence: "الالتزام بالجدول الزمني",
            communication: "الاتصالات",
            shareYourExp: "شارك تجربتك مع هذا التاجر في مجتمع الموقع",
            disable: "تعطيل",
            about: "حول",
            addblog: "أضف مدونة",
            editblog: "تحرير المدونة",
            blogs: "المدونات",
            postedon: "نشر على",
            by: "بواسطة",
            resendconfirmation: "أعد إرسال التأكيد",
            addproject: "إضافة مشروع",
            editproject: "تحرير المشروع",
            projecttype: "نوع المشروع",
            sort: "فرز",
            home_size_unit: "وحدة حجم المنزل",
            home_size: "حجم المنزل",
            consistof: "يتألف من",
            category: "الفئة",
            addnewpropertytothis: "إضافة خاصية جديدة لهذا المشروع",
            upload: "رفع",
            assignfromcurrentproperties: "تعيين من الخصائص الحالية",
            helpYou: 'كيف يمكننا مساعدتك',
            docs: 'مستندات',
            photoId: 'معرف الصورة',
            addProof: 'العنوان والدليل',


            myPayment: 'دفعاتي',
            noPayments: 'لا يوجد تاريخ الدفع',
            currentPackage: 'الرزمة الحالية :',
            upgradePackage: 'ترقية الحزمة الخاصة بك الآن',
            promoteAds: 'تعزيز إعلاناتي',
            promotions: 'هنا يقدم Akaratmisr خدمات الترويج والتسويق لإعلانك. ما عليك سوى ملء هذا النموذج وسيقوم أحد فريقنا بالاتصال بك لتصميم خطة التسويق الخاصة بك على نحو فعال',
            promote: 'أحتاج إلى akaratmisr.com لتعزيز:',
            property: 'ملكيتي',
            project: 'مشروعي',
            company: 'شركتي',
            propertyCode: 'رمز الملكية',
            projectCode: 'رمز المشروع',
            promotionChannel: 'قنوات الترويج المفضلة',
            upgrade: 'تطوير',

            emailCmp: 'حملات البريد الإلكتروني',
            smsCmp: 'حملات الرسائل القصيرة',
            whatsappCmp: 'حملات واتس اب',
            fbCmp: 'حملات فيسبوك',
            twtrCmp: 'حملات تويتر',
            phoneCall: 'مكالمات هاتفية',
            all: 'الكل',
            promoBudget: 'ميزانيتي المقترحة للترقية',
            PhoneNo: 'رقم الهاتف المباشر لمناقشة التفاصيل',
            personName: 'اسم الشخص المسؤول',
            marketService: 'أو ببساطة يمكنك الاختيار من بين خدمات الترويج والتسويق المختلفة هنا:',
            advertise: 'أعلن معنا',
            bannerAds: 'شراء راية الإعلانات',
            add: 'إضافة',
            affiliate: 'بلدي لوحة القيادة التابعة',


            startMark: 'هل تريد أن تبدأ العمل في تسويق العقارات؟ هل لديك طموح لبناء نفسك وزيادة دخلك بمجرد ساعتين من العمل في اليوم الواحد؟',
            employee: 'هل أنت جامعة شابة أو ملكة جمال ، موظف أم ربة منزل؟',
            ambition: 'كل ما تحتاجه هو الطموح والتصميم !!',
            mechanism: 'سوف تتيح لك معرفة جميع الآليات وتعطيك كل ما تحتاجه لتكون وكيل عقارات محترف!',
            performJob: 'سنقدم لك جميع الأدوات التي ستساعدك على أداء وظيفتك وسنكون معك خطوة بخطوة ..',
            willing: 'كل جهد ممكن لإيجاد النتيجة على الفور ، والنتائج مضمونة ، إن شاء الله ،',
            coupon: 'سنقوم بإنشاء حساب التابع حتى تتمكن من معرفة جميع تفاصيل أرباحك والطلبات التي تستخدمها القسائم الخاصة بك',
            form: 'يرجى ملء الاستمارة',
            affiliateSys: 'يرجى إضافة لي إلى نظام التابعة الخاص بك للترويج من خلال كوبونات',
            directMarket: 'للمسوقين مباشرة',
            training: 'أنا مستعد لحضور التدريب',
            MarkThrough: 'سأفعل التسويق من خلال',
            visits: 'زيارات الموقع',
            markPhone: 'تسويق المكالمات الهاتفية',
            both: 'على حد سواء',
            send: 'إرسال',
            createMessage: 'إنشاء رسالة',
            allTaskInState: 'كل مهمة في ولايتي',
            myPreviousTasks: 'المهام السابقة',
            tasksIappliedFor: 'المهام التي تقدمت إليها',
            contactTheReq: 'اتصل بالطلب',
            plzApplyFirst: 'يرجى تطبيق أولا',
            youCanNotcntct: 'لا يمكنك الاتصال',
            ReviewThisTask: 'مراجعة هذه المهمة',
            Review: 'إعادة النظر',
            FeedBack: "ردود الفعل",
            thisReview: 'سيتم عرض هذا العرض لزوار موقعنا ، يرجى أن يكون محددًا مثل',
            feedbackToClient: 'Feedback to client',
            experience: 'تجربة',
            giveFeedback: 'إعطاء ردود الفعل',
            TaskIAppliedFor: ' المهمة التي تقدمت إليها',
            taskIWorkOnThem: 'المهام التي أعمل عليها',
            myInbox: 'صندوق البريد الخاص بي',
            myProjects: 'مشاريعي',
            varificationAndRep: 'التحقق والتقارير',
            agents: 'عملاء',
            AgentsInCity: 'وكلاء في مدينتي',
            TaskersInCity: 'تاسكرس في مدينتي',
            TasksInCity: 'المهام في مدينتي',
            PropertiesInMyCity: 'العقارات في مدينتي',
            ProjectsInMyCity: 'مشاريع في مدينتي',
            ConsistOf: 'يتكون من',
            allTaskInMyCity: 'كل مهمة في مدينتي',
            myPhotos: 'صوري',
            verification: 'التحقق',
            Report: 'أبلغ عن',
            unverify: 'سجل إثبات ملكية',
            send: 'إرسال',
            registerCopon: 'تسجيل القسيمة',
            requestCopon: 'طلب القسيمة',
            ourNetwork: 'شبكتنا',
            fund: 'لدي صندوق',
            asset: 'لدي الأصول',
            money: 'عن مبلغ نقودي',
            done: 'فعله',
            step2: 'تابع إلى الخطوة 2',
            step3: 'تابع إلى الخطوة 3',
            step4: 'تابع إلى الخطوة 4',
            proposed: 'يمكن اقتراح الأموال المقترحة للاستثمار',
            province: 'الولاية / المقاطعة',
            Gps: 'بيانات GPS',
            finalize: 'نحن على وشك الإنتهاء. إذا كنت ترغب في تغيير أي شيء قبل النشر ، فستكون هذه هي أفضل لحظة للقيام بذلك. يمكنك أيضًا معاينة كيف ستبدو الممتلكات في خدمتنا',
            backStep: 'العودة إلى الخطوة 1',
            submitInvest: 'يقدم المستثمرون',
            fixedAsset: 'عن بلدي الأصول الثابتة',
            propertyType: 'نوع العقار',
            pValue: 'القيمة المقترحة',
            buyBanner: 'شراء راية الإعلانات',
            advertiseWithUs: 'أعلن معنا',
            selectCat: 'اختر الفئة',
            buy: 'اشتري الآن',
            productDetail: 'تفاصيل المنتج',

            clicktolocation: 'انقر لعرض الموقع على خريطة جوجل',
            browse: 'تصفح',
            buildingareasize: 'حجم مساحة المبنى',
            landsizeunit: 'وحدة حجم الأرض',
            certification: 'شهادة',
            area: 'منطقة',
            totalareasize: 'إجمالي مساحة المساحة',
            myAccount: 'حسابي',
            joinTeam: 'انضم لفريقنا',
            selectType: 'اختر النوع الخاص بك',



            transactionId: 'معرف المعاملة',
            package: 'صفقة',
            amount: 'كمية',
            reqDate: 'تاريخ الطلب',
            search: 'بحث',
            searchrequest: 'طلب البحث',
            free: 'حر',
            EditProfile: 'تعديل الملف الشخصي',

            profilePic: 'الصوره الشخصيه',
            changeAvtr: 'تغيير الصورة الرمزية',
            avtr: 'أو حدد الصورة الرمزية',
            proPage: 'صفحة ملفي الشخصي على akaratmisr.com:',
            link: 'https://akaratmisr.com/',
            comments: 'تعليقات',

            skype: 'سكايب',
            fbAccount: 'حساب الفيسبوك',
            twitrAcc: 'حساب على موقع تويتر',
            linkedIn: 'حساب ينكدين',
            google: '+ حساب جوجل',
            update: 'تحديث',
            updatePackage: 'تحديث الحزمة الخاصة بك',
            eng: 'الإنجليزية',
            arb: 'عربى',
            speak: 'تحدث اللغة',
            coverArea: 'يمكنني العمل في الولاية / المقاطعة',
            uploadPic: 'قم بتحميل معرف صورتك (الهوية الشخصية ، جواز السفر ، ... إلخ)',
            uploadAdd: 'تحميل دليل على العنوان (فاتورة Ultility ، كشف حساب بنكي ، ... إلخ)',
            change: 'يتغيرون',
            akaratOff: 'يمكنني المجيء إلى مكتب عقاراتسمر',
            car: 'لدي سيارة',
            verification: 'التحقق:',
            verifyAcc: 'تحقق من حسابك',

            pricenotnegotiable: 'السعر غير قابل للتفاوض',
            deliverydateofthepro: 'تاريخ تسليم العقار',
            generalamenities: 'عمومی امتیازات',
            publishedon: 'نشرت على',
            distanceinformation: 'معلومات عن بعد',


            enterLink: 'يرجى إدخال الرابط ، دون HTTP: //',
            jobs: 'انضم لفريقنا',
            jobHere: 'وظائف',
            seller: 'البائع أو المشتري',
            tasker: 'تاسكر',

            applicants: 'المتقدمين',
            locationonmap: 'الموقع على الخريطة',
            findrepresentative: 'العثور على ممثل',
            modal: 'شكلي',
            findagent: 'العثور على وكيل',
            findtask: 'العثور على المهمة',
            findtasker: 'البحث تاسكر',
            findrequest: 'البحث عن طلب',
            findproperty: 'العثور على الممتلكات',
            findinternationalpartner: 'بین الاقوامی ساتھی تلاش کریں۔',
            add: 'إضافة',
            addproperties: 'إضافة خصائص',
            addrequest: 'إضافة طلب',
            addtask: 'إضافة مهمة',
            addproject: 'إضافة مشروع',
            myaccount: 'حسابي',
            editproperties: 'تحرير الخصائص',
            editrequest: 'تحرير الطلب',
            alltaskinmystate: 'كل مهمة في ولايتي',
            myprevioustask: 'المهام السابقة',
            taskiapplied: 'المهمة التي تقدمت إليها',
            taskiworkonthem: 'مهمة أنا أعمل عليها',
            feedback: 'ردود الفعل',
            editTask: 'تحرير المهمة',
            searchesFavorites: 'عمليات البحث المفضلة',
            rating: 'تقييم',
            fullnameprofile: 'الاسم الكامل ورقم صفحة الملف الشخصي ورقم الهاتف مطلوبان',
            fullnamepageurl: 'الاسم الكامل ، عنوان url لصفحة الملف الشخصي ، رقم الهاتف ، العمر واللغة المطلوبة',
            fullnameprofiletype: 'الاسم الكامل ، رابط صفحة الملف الشخصي ، رقم الهاتف ، النوع مطلوب',
            basicInfo: 'معلومات اساسية',
            expAndService: 'الخبرة وخدمة ضمان الجودة',
            personalMeeting: 'اجتماع شخصي',
            siteVis: 'زيارة موقع',
            ownReport: 'الرجاء إضافة التقرير الخاص بك على هذا',
            Logout: 'الخروج',
            verifyInfo: 'يرجى التحقق من جميع استمارة المعلومات أدناه',
            nameAgent: 'اسم الوكيل / تاسكر',
            PendingProperties: 'خصائص معلقة',
            allpropertiesInMyCity: 'جميع العقارات في مدينتي',
            allrequestInMyCity: 'كل طلب في مدينتي',
            Condition: 'شرط',
            selectPhoto: 'يرجى اختيار الصورة!',
            imgHasBeen: 'تم تحميل الصورة',
            Select: 'تحديد',
            inbMesToRep: 'صندوق الوارد',
            ActivationStatus: 'حالة التفعيل أو التشغيل',

            oldImages: 'الصور القديمة',
            DeliverTheTask: 'تسليم المهمة',
            Process: 'معالجة',
            Featured: 'متميز',
            CreatedDate: 'تاريخ الإنشاء',

            content: "يحتوى",
            metadisciption: "ميتا الوصف:",
            metadisciptionforseo: "وصف ميتا لكبار المسئولين الاقتصاديين:",
            keywords: "الكلمات الدالة:",
            keywordforseo: "الكلمة الرئيسية لكبار المسئولين الاقتصاديين",
            locationservicesaredisabled: 'تم تعطيل خدمات الموقع ، يرجى فتح موقع هاتفك',
            to: 'إلى',
            Subject: 'موضوع',
            date: 'تاريخ',

            district: " منطقة",
            subdistrict: " منطقة ثانوية ",
            misable: "تعطيل",
            addInvestorMoney: 'أضف مستثمر أموال',


        }

        this.props.languageSet(str, this.state.route, this.state.userHave, this.state.userDetails)
    }




    render() {
        return (

            (this.state.percent === 100) ? (
                <ImageBackground source={require('../assets/Images/Splash.png')}
                    style={{
                        // backgroundColor: '#fd902a',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <StatusBar
                        // backgroundColor='#fd902a'
                        barStyle="light-content"
                    />
                    <View
                        style={{
                            width: "100%",
                            marginTop: 50,
                        }}
                    >
                        <Animatable.View animation="fadeInUp" iterationCount={1}>
                            <Button
                                style={{
                                    marginTop: 20,
                                    width: "50%", height: 50, justifyContent: "center",
                                    alignItems: "center", borderRadius: 0, backgroundColor: "white",
                                    marginHorizontal: "25%"
                                }}
                                onPress={() =>
                                    this.setLanguageArr(this)
                                    // Actions.WalkThrough()
                                }
                            // onPress={this._signInGoogle}
                            >
                                <Text
                                    style={{ fontSize: 20, fontWeight: "bold" }}
                                >
                                    العربية
                                </Text>
                            </Button>
                        </Animatable.View>
                        <Animatable.View animation="fadeInDown" iterationCount={1}>
                            <Button
                                style={{
                                    marginTop: 20,

                                    width: "50%", height: 50, justifyContent: "center",
                                    alignItems: "center", borderRadius: 0, backgroundColor: "white",
                                    marginHorizontal: "25%"
                                }}
                                onPress={() =>
                                    this.setLanguageEng(this)
                                }

                            >

                                <Text
                                    style={{ fontWeight: "bold" }}
                                >
                                    English</Text>


                            </Button>
                        </Animatable.View>
                    </View>
                </ImageBackground>


            ) : (
                    <ImageBackground source={require('../assets/Images/Splash.png')}
                        style={{
                            // backgroundColor: '#fd902a',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <StatusBar
                            // backgroundColor='#fd902a'
                            barStyle="light-content"
                        />


                        <ProgressCircle
                            percent={this.state.percent}
                            radius={40}
                            borderWidth={4}
                            color="#8C7B6E"
                            shadowColor="#B6ACA4"
                            bgColor="#fff"
                        >
                            <Text style={{ fontSize: 18 }}>{this.state.percent + '%'}</Text>
                        </ProgressCircle>



                    </ImageBackground>
                )


        )
    }
}

let mapStateToProps = state => {
    return {
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,

    };
};
function mapDispatchToProps(dispatch) {
    return ({
        languageSet: (str, route, userHave, userDetails) => {
            dispatch(languageSet(str, route, userHave, userDetails))
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);