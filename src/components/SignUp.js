import React, { Component } from 'react';
//import { fbApp, firestoreDB } from '../firebase';
import firebase from '../firebase'
import M from "materialize-css"; 
import './resources/refined.css'

export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            email: null,
            password: null,
            userType: 'child',
            //id: null,
            error: {
                message: '' 
            }
        }
        this.submitForm = this.submitForm.bind(this)   
    }
    componentDidMount(){
        M.AutoInit();
    }

    submitForm(e){
        e.preventDefault();
        const { username, email, password, userType } = this.state;
        //var db = firebase.firestore()
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(UserCredential => {
            //auth state changes here so what is user doc not finished and strore tries  to get data?
             firebase.firestore().collection("Users").doc(UserCredential.user.uid).set({
                name: username,
                Type: userType
            }) //can this cause issue if the if statements are executed before User db is filled
            if(userType === "child"){
                firebase.firestore().collection("Children").doc(UserCredential.user.uid).set({
                    name: username,
                    email: email,
                    age: 0,
                    goal: ""
                }).then(() => {
                    window.location.assign("/dashboard")
                })
            }
            else{
                firebase.firestore().collection("Parent").doc(UserCredential.user.uid).set({
                    name: username,
                    email: email,
                    children: []
                }).then(() => {
                    window.location.assign("/dashboard")
                })
            }   
        })
        .catch(error => {
            this.setState({ error })
        })        
    }  
        
    signOut(){
        firebase.auth().signOut()
    } 

    handleChange = e => {
        e.preventDefault(); //stops data appearing in url
        const { name, value } = e.target; //name=firstname or email etc
        this.setState({ [name]: value })  //[name] means name is a key -> becomes email: value and password: value
        console.log(this.state)
    }

    handleAdd = e => {
        e.preventDefault();
        //console.log("e.target.value "+e.target.value.toLowerCase())
        //const valueG  = e.target.value;   
        this.setState({
            userType: e.target.value.toLowerCase()
        })
    }
    
    render() {
        return (
            <div className="row container" id="Sign-Up"> 
            <div className="row"><h4 className="grey-text text-darken-3">Sign Up</h4></div>
            <div className="row"><h6 className="grey-text text-darken-3">Signing up allows you to save progress and for parents to monitor childrens process<br />Nice quick and easy!</h6></div>
                <div className="col s12 signup" >
                     <form onSubmit={this.submitForm}>      
                            <table className="signtable">
                                <tbody>
                                    <tr>
                                  <td><label htmlFor="username">Name</label></td> 
                                  <td> <input name="username" type="text" onChange={this.handleChange} /> <br /></td> 
                                   </tr>
                                   <tr>
                                   <td> <label htmlFor="email">Email</label></td>
                                   <td><input name="email" type="email" onChange={this.handleChange} /> <br /></td>
                                   </tr>
                                   <tr>
                                   <td><label htmlFor="password">Password</label></td>
                                   <td><input name="password" type="password" onChange={this.handleChange} /> <br /></td>
                                   </tr>
                                   
                                   <tr>
                                   <td><label>Account Type:</label></td> 
                                    <td>
                                    <select onChange={this.handleAdd}>
                                        <option value="Child">Child</option>
                                       <option value="Parent">Parent</option>
                                    </select>
                                        </td>
                                   </tr>
                                  
                                   
                                   {/* <div className="createAccount"> */}
                                    <tr className="signupt"><td colSpan="2"><small className="row col">By clicking submit, you agree to our <a className="teal-text text-lighten-2 modal-trigger" href="#terms">terms</a> and have read our <a className="teal-text text-lighten-2 modal-trigger" href="#privacy">data use policy</a> </small></td><td></td></tr>
                                  
                                       
                                    <tr className="signupt">
                                        <td colSpan="2"> <button className="btn waves-effect waves-light signupt" type="submit" name="action">Submit<i className="material-icons right">send</i></button></td>
                                    </tr>
                                    <tr><td ><small>Already Have an Account? Click <a href="#Sign-in" className="teal-text text-lighten-2">here</a></small><br /></td></tr>
                                   {/* </div> */}
                                   <tr><td colSpan="2">{this.state.error.message}</td></tr>
                                   
                                   </tbody>
                               </table>
                          </form>
                          <div id="privacy" className="modal">
                                        <div className="modal-content">
                                            <h5 className="teal-text text-lighten-2">Privacy Policy </h5>
                                            <div className="modaltext">
  
                                                <p>Effective date: March 24, 2019</p>


                                                <p>Swan Academics ("us", "we", or "our") operates the www.swanacademics.co.uk website (hereinafter referred to as the "Service").</p>

                                                <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy  for Swan Academics is created with the help of the <a href="https://privacypolicies.com/privacy-policy-generator/">PrivacyPolicies.com Privacy Policy Generator</a>.</p>

                                                <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from www.swanacademics.co.uk</p>


                                                <h5>Information Collection And Use</h5>

                                                <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>

                                                <h6>Types of Data Collected</h6>

                                                <h6>Personal Data</h6>

                                                <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>

                                                <ul>
                                                <li>Email address</li><li>First name and last name</li><li>Cookies and Usage Data</li>
                                                </ul>

                                                <h6>Usage Data</h6>

                                                <p>We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

                                                <h6>Tracking & Cookies Data</h6>
                                                <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
                                                <p>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p>
                                                <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. You can learn more how to manage cookies in the <a href="https://privacypolicies.com/blog/how-to-delete-cookies/">Browser Cookies Guide</a>.</p>
                                                <p>Examples of Cookies we use:</p>
                                                <ul>
                                                    <li><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
                                                    <li><strong>Preference Cookies.</strong> We use Preference Cookies to remember your preferences and various settings.</li>
                                                    <li><strong>Security Cookies.</strong> We use Security Cookies for security purposes.</li>
                                                </ul>

                                                <h6>Use of Data</h6>
                                                    
                                                <p>Swan Academics uses the collected data for various purposes:</p>    
                                                <ul>
                                                    <li>To provide and maintain the Service</li>
                                                    <li>To notify you about changes to our Service</li>
                                                    <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                                                    <li>To provide customer care and support</li>
                                                    <li>To provide analysis or valuable information so that we can improve the Service</li>
                                                    <li>To monitor the usage of the Service</li>
                                                    <li>To detect, prevent and address technical issues</li>
                                                </ul>

                                                <h6>Disclosure Of Data</h6>

                                                <h5>Legal Requirements</h5>
                                                <p>Swan Academics may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                                                <ul>
                                                    <li>To comply with a legal obligation</li>
                                                    <li>To protect and defend the rights or property of Swan Academics</li>
                                                    <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                                                    <li>To protect the personal safety of users of the Service or the public</li>
                                                    <li>To protect against legal liability</li>
                                                </ul>

                                                <h6>Security Of Data</h6>
                                                <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

                                                <h5>Service Providers</h5>
                                                <p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
                                                <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>



                                                <h6>Links To Other Sites</h6>
                                                <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
                                                <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>


                                                <h6>Children's Privacy</h6>
                                                <p>Our Service does address Children </p>
                                                <p>We collect very minimil information regarding to children including their name and email address. This is used soley for login puposes and will never be shared with any third party nor will the childrens email be used to contact them. Game play scores are stored so that it can be used to track progress and this is not shared. </p>


                                                <h6>Changes To This Privacy Policy</h6>
                                                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                                                <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p>
                                                <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>


                                                <h6>Contact Us</h6>
                                                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                                                <ul>
                                                        <li>By email: swanacademics@gmail.com</li>
                                                 </ul>
                                           
                                            </div>
                                            </div>
                                            <div className="modal-footer">
                                            <a className="modal-close waves-effect waves-green btn-flat">Close</a>
                                            </div>
                                        </div>
                                        
                                        <div id="terms" className="modal">
                                        <div className="modal-content">
                                            <h5 className="teal-text text-lighten-2">Terms</h5>
                                            <div className="modaltext">
                                            <p>These terms and conditions outline the rules and regulations for the use of Swan Academics's Website.</p> <br />
                                            <p>By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Swan Academics's website 
                                            if you do not accept all of the terms and conditions stated on this page.</p><br/>
                                            <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
                                            and any or all Agreements: “Client”, “You” and “Your” refers to you, the person accessing this website
                                            and accepting the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers
                                            to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves, or either the Client
                                            or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake
                                            the process of our assistance to the Client in the most appropriate manner, whether by formal meetings
                                            of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect
                                            of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law
                                            of . Any use of the above terminology or other words in the singular, plural,
                                            capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
                                            <h5>Cookies</h5>
                                            <p>We employ the use of cookies. By using Swan Academics's website you consent to the use of cookies 
                                            in accordance with Swan Academics’s privacy policy.</p>
                                            <p>Most of the modern day interactive web sites
                                            use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site
                                            to enable the functionality of this area and ease of use for those people visiting. Some of our 
                                            affiliate / advertising partners may also use cookies.</p>
                                            <h5>License</h5>
                                            <p>Unless otherwise stated, Swan Academics and/or it’s licensors own the intellectual property rights for
                                            all material on Swan Academics. All intellectual property rights are reserved. You may view and/or print
                                            pages from https://www.swanacademics.co.uk for your own personal use subject to restrictions set in these terms and conditions.</p>
                                            <p>You must not:</p><br/>
                                            <ol>
                                                <li>Republish material from https://www.swanacademics.co.uk</li>
                                                <li>Sell, rent or sub-license material from https://www.swanacademics.co.uk</li>
                                                <li>Reproduce, duplicate or copy material from https://www.swanacademics.co.uk</li>
                                            </ol>
                                            <p>Redistribute content from Swan Academics (unless content is specifically made for redistribution).</p>
                                            </div>
                                            </div>
                                            <div className="modal-footer">
                                            <a className="modal-close waves-effect waves-green btn-flat">Close</a>
                                            </div>
                                        </div>
                          </div>
                         
                      
          </div> 

        )
    }
}

