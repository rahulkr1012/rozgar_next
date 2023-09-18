import React, { useState } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import swal from 'sweetalert'
import { chatbot } from '@/action/chatbotAction'

const theme = {
  background: '#ffffff',
  fontFamily: 'Arial, sans-serif; Neue',
  // headerBgColor: '#f0f0f0',
  headerFontColor: '#000000',
  headerFontSize: '15px',
  botBubbleColor: '#f3f3f3',
  botFontColor: '#2a2b2a',
  userBubbleColor: '#e81c28',
  userFontColor: '#ffffff',
}

// all available config props
const config = {
  width: '300px',
  height: '400px',
  hideUserAvatar: true,
  hideBotAvatar: true,
  placeholder: 'Type here..',
  headerTitle: 'Career Assistant',

}


const Chatbot = (props) => {
     
  let [showChat, setShowChat] = useState(true)
  const startChat = () => {
    setShowChat(true)
  }
  const hideChat = () => {
    setShowChat(false)
  }

  let [data, setData] = useState({
    // welcomeeeee:'',
    q_firstname: "",
    firstname: "",
    mobilenumber: "",
    mobilevalidator: "",
    emailvalidator: "",
  })


  const onChangeHandler = (value, name) => {
    //  

    setData({ ...data, [name]: value })



  }
  onsubmit = (model) => {
    chatbot(model).then((res) => {
      this.setState({ showLoader: false })
      if (res.status) {
        this.setState({ showLoader: false })
        // swal({
        //   icon: "success",
        //   text: "You have Successfully Logged In",
        //   timer: 1000,
        //   showCancelButton: false,
        //   showConfirmButton: false
        // });
        this.props.history.goBack()
      }
    });
  }

  return (

    <ThemeProvider theme={theme}>

      <div style={{ display: showChat ? 'none' : '' }} className="chatboxmsg">

      <ChatBot
          botDelay={1000}
          speechSynthesis={{ enable: false, lang: 'en-US' }}
          recognitionEnable={false}
          // cache={true}
          message={(previousValue, steps) => {
          }}
          cacheName="chat_value"
          hideInput={true}

          steps={
            [
              // {
              //   id: 'welcome',
              //   message: 'Hello!',
              //   trigger: 'q-firstname',
              // },
              // // Paste
              // {
              //   id: 'q-firstname',
              //   message: 'What is your  name?',
              //   trigger: 'firstname',
              // },
              // {
              //   id: 'firstname',
              //   user: true,
              //   validator: (value) => {
              //     if (/^[A-Za-z]+$/.test(value)) {
              //       return true
              //     } else {
              //       return 'Please input alphabet characters only.'
              //     }
              //   },
              //   trigger: 'rmcbot',
              // }, 
              {
                id: 'welcomeeeee',
                message:
                  "Welcome to Rozgar.com, India's leading job portal",
                trigger: 'q_firstname',
                //   validator:function (value){
                //     onChangeHandler( value , this.id )
                //  }
              },

              {
                id: 'q_firstname',
                message: "What's your name?",
                trigger: 'firstname',
                // validator:function (value){
                //   onChangeHandler( value , this.id )

                // }
              },



              {
                id: 'firstname',
                user: true,
                validator: function (value) {
                  //   



                  if (/^[A-Za-z]/.test(value)) {

                    onChangeHandler(value, this.id)
                    return true
                  } else {
                    return 'Please input alphabet characters only.'
                  }
                },
                trigger: 'emailaddress',
              },

              {
                id: 'emailaddress',
                message: 'please enter your email id',
                trigger: 'emailvalidator',
              },

              {
                id: 'emailvalidator',
                user: true,
                validator: function (value) {
                  if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((value))) {

                    onChangeHandler(value, this.id)
                    return true
                  }
                  else {
                    return 'please enter correct email ID'
                  }
                },
                trigger: 'mobilenumber',
              },


              {
                id: 'mobilenumber',
                message: 'Please type your mobile number',
                // validator: function (value) {
                //   // 
                //   onChangeHandler( value , this.id )

                // },
                trigger: 'mobilevalidator',

              },



              // {
              //   id: 'mobilevalidator',
              //   user: true,
              //   validator: (value) => {
              //     if (isNaN(value)) {
              //       return 'value should be a 10 digit number';
              //     }
              //     return true;
              //   },
              //   trigger: '10',
              // },
              {
                id: 'mobilevalidator',
                user: true,
                validator: function (value) {




                  if (value.length !== 10) {

                    return 'value should be a 10 digit number';
                  }
                  onChangeHandler(value, this.id)
                  return true;
                },
                trigger: '10',
              },

              {
                id: '21',
                message:
                  'Okay! What jobs are you looking for?',
                trigger: 'qtype',
              },
              {
                id: 'qtype',
                options: [
                  { value: 1, label: 'Software & IT ', trigger: 'it' },
                  { value: 2, label: 'Recruitment', trigger: 'recruitment' },
                  { value: 3, label: 'Finance', trigger: 'finance' },
                  { value: 4, label: 'Pharma & Biotech', trigger: 'pharma' },
                  { value: 5, label: 'Other', trigger: 'otherjob' },
                ],
              },
              {
                id: 'experience1',
                options: [
                  { value: 10, label: 'i am a fresher ', trigger: '100' },
                  { value: 11, label: ' 1-3 years ', trigger: '100' },
                  { value: 12, label: '3-5 years', trigger: '100' },
                  { value: 13, label: '5-10 years', trigger: '100' },
                  { value: 14, label: '10+ years', trigger: '100' },
                ],
              },
              {
                id: 'experience2',
                options: [
                  { value: 15, label: 'i am a fresher ', trigger: '110' },
                  { value: 16, label: ' 1-3 years ', trigger: '110' },
                  { value: 17, label: '3-5 years', trigger: '110' },
                  { value: 18, label: '5-10 years', trigger: '110' },
                  { value: 19, label: '10+ years', trigger: '110' },
                ],
              },
              {
                id: 'experience3',
                options: [
                  { value: 20, label: 'i am a fresher ', trigger: '120' },
                  { value: 21, label: ' 1-3 years ', trigger: '120' },
                  { value: 22, label: '3-5 years', trigger: '120' },
                  { value: 23, label: '5-10 years', trigger: '120' },
                  { value: 24, label: '10+ years', trigger: '120' },
                ],
              },
              {
                id: 'experience4',
                options: [
                  { value: 25, label: 'i am a fresher ', trigger: '130' },
                  { value: 26, label: ' 1-3 years ', trigger: '130' },
                  { value: 27, label: '3-5 years', trigger: '130' },
                  { value: 28, label: '5-10 years', trigger: '130' },
                  { value: 29, label: '10+ years', trigger: '130' },
                ],
              },
              {
                id: 'experience5',
                options: [
                  { value: 30, label: 'i am a fresher ', trigger: '140' },
                  { value: 31, label: ' 1-3 years ', trigger: '140' },
                  { value: 32, label: '3-5 years', trigger: '140' },
                  { value: 33, label: '5-10 years', trigger: '140' },
                  { value: 34, label: '10+ years', trigger: '140' },
                ],
              },
              {
                id: 'cities',
                options: [
                  { value: 35, label: 'Delhi-NCR', trigger: '21' },
                  { value: 36, label: 'Mumbai', trigger: '21' },
                  { value: 37, label: 'Bengaluru', trigger: '21' },
                  { value: 38, label: 'Hyderabad', trigger: '21' },
                  { value: 39, label: 'Other', trigger: '21' },
                ],
              },
              {
                id: '100',
                message: 'Got it! Click on the link below to see relevant jobs',
                trigger: 'itlink',
              },
              {
                id: '110',
                message: 'Got it! Click on the link below to see relevant jobs',
                trigger: 'recruitmentlink',
              },
              {
                id: '120',
                message: 'Got it! Click on the link below to see relevant jobs',
                trigger: 'financelink',
              },
              {
                id: '130',
                message: 'Got it! Click on the link below to see relevant jobs',
                trigger: 'pharmalink',
              },
              {
                id: '140',
                message: 'Got it! Click on the link below to see relevant jobs',
                trigger: 'otherlink',
              },
              {
                id: 'itlink',
                component: <div>
                  <a
                    style={{ textDecoration: 'none' }}
                    href="https://rozgar.com/jobs-in-it-software"
                    target="_blank"
                  >
                    Click Here
                  </a>

                </div>,
                //trigger: '---',
              },
              {
                id: 'recruitmentlink',
                component: <div>
                  <a
                    style={{ textDecoration: 'none' }}
                    href="https://rozgar.com/jobs-in-recruitment-and-staffing"
                    target="_blank"
                  >
                    Click Here
                  </a>

                </div>,
                //trigger: '---',
              },
              {
                id: 'financelink',
                component: <div>
                  <a
                    style={{ textDecoration: 'none' }}
                    href="https://rozgar.com/jobs-in-banking-and-finance"
                    target="_blank"
                  >
                    Click Here
                  </a>

                </div>,
                //trigger: '---',
              },
              {
                id: 'pharmalink',
                component: <div>
                  <a
                    style={{ textDecoration: 'none' }}
                    href="https://rozgar.com/jobs-in-pharma-and-biotech"
                    target="_blank"
                  >
                    Click Here
                  </a>

                </div>,
                //trigger: '---',
              },
              {
                id: 'otherlink',
                component: <div>
                  <a
                    style={{ textDecoration: 'none' }}
                    href="https://rozgar.com/jobs-by-category"
                    target="_blank"
                  >
                    Click Here
                  </a>

                </div>,
                //trigger: '---',
              },

              // {
              //   id: 'itlink',
              //   component: <Link />,
              //   //trigger: 'qtype',
              // },
              {
                id: '10',
                message: 'Alright! Which cities are you looking for jobs in? Choose an option below.',
                trigger: 'cities',
              },

              {
                id: 'it',
                message:
                  'Got it! How much work experience do you have?',
                trigger: 'experience1',
              },
              {
                id: 'recruitment',
                message:
                  'Got it! How much work experience do you have?',
                trigger: 'experience2',
              },
              {
                id: 'finance',
                message:
                  'Got it! How much work experience do you have?',
                trigger: 'experience3',
              },
              {
                id: 'pharma',
                message:
                  'Got it! How much work experience do you have?',
                trigger: 'experience4',
              },
              {
                id: 'otherjob',
                message:
                  'Got it! How much work experience do you have?',
                trigger: 'experience5',
              },

              // {
              //   id: '6',
              //   component: <Link />,
              //   // trigger: 'q-submit',
              // },
              // {
              //   id: 'q-submit',
              //   message: 'Do you have any other questions !?',
              //   trigger: 'submit',
              // },
              // {
              //   id: 'submit',
              //   options: [
              //     { value: 'y', label: 'Yes', trigger: 'no-submit' },
              //     { value: 'n', label: 'No', trigger: 'end-message' },
              //   ],
              // },

            ]}

          // bubbleStyle={{ fontSize: '13px', padding:'8px',maxWidth:'80%' }}

          {...config}


        />
      </div>
      <div className='chatboxfooter'>
        {!showChat ? (
          <>
            <p style={{ position: 'absolute', zIndex: "999", left: "36px", top: "-7px", fontSize: "15px" }}>🟢</p>
            <button className="btn" name='chat' onClick={() => startChat()}>
              <i className="fa fa-comments fa-2x" style={{ color: "#ffffff", fontSize: "30px" }}> </i>
            </button>
          </>
        ) : (
          <>
            <p style={{ position: 'absolute', zIndex: "999", left: "36px", top: "-7px", fontSize: "15px" }}>🟢</p>
            <button className="btn" name='chats' onClick={() => hideChat()}>
              <i
                className="fa fa-comment fa-2x" style={{ color: "#ffffff", fontSize: "27px" }}></i>
            </button>
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default Chatbot
