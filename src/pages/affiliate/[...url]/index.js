import React, { Component } from 'react'
import { withRouter } from "next/router";
import { getLoggedInUserData } from 'nextCookie';
import { getAffiliatebyId } from '@/action/dashboard';
import { AddAffliateAnalytics, selectCountry } from '@/action/jobsByActions';
import Footer from 'components/common/footer';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            affiliateurl:'',
            country:'',
        };

    }

    componentDidMount() {
        selectCountry().then((res) => {
            this.handleSubmit(res)
          })
          this.affiliate()
         
    }

    affiliate=()=>{
        let url = this.props.router.query.url
        getAffiliatebyId(url).then((res) => {
            if (res.status) {
                this.setState({affiliateurl:res.result.list[0]})
                if(res.result.list[0].POST_BACK_URL){
                    setTimeout(() => {
                        this.props.router.push(res.result.list[0].POST_BACK_URL)
                    }, 0)
                   
                }

            }
           
        }).catch((err) => {
            console.log(err)
        })

    }

  handleSubmit(res) {
        let model = {
        ID:this.state.affiliateurl&&this.state.affiliateurl.ID,
        AFFLIATE_CLICKS:1,
        LONGT: res.longitude,
        LATT: res.latitude,
        IP_ADDRRESS: res.IPv4,
        CITY: res.city,
        }
            AddAffliateAnalytics(model).then(res => {
                if (res.status) {
                    // swal({
                    //     icon: "success",
                    //     text: "Enquiry Submitted successfully ",
                    //     timer: 2000,
                    //     showCancelButton: false,
                    //     showConfirmButton: false,
                    // });
                   
                }
                else {
                    console.log(res.error)
                }

            }).catch(err => {
                console.log(err)
            })
    }


  render() {
      return (
    <React.Fragment>
        </React.Fragment>
    )
  }
}
export async function getServerSideProps(context) {
    const { req } = context
    let ud = getLoggedInUserData(req)
    return {
        props: {
            ud: ud
        }, // will be passed to the page component as props
    }

}

export default withRouter(index)