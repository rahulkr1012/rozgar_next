import React, { Component } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import { qadiscussionSearchByInput, qaDiscussionThreadList, qaDiscussionThreadListBycategory } from '@/action/discussionFormAction';
import DiscussionForumCategory from 'components/DiscussionForumCategory/index'
import constant from 'constant'
import { SpinnerCircular } from 'spinners-react';
import Loading from 'components/Loader'
import dynamic from 'next/dynamic';
import { getLoggedInUserData } from 'nextCookie';
import { withRouter } from 'next/router';
import FilteredHeader from 'components/Filtered_Header'


let DisscussionForumCategory = dynamic(() => import('components/DiscussionForumCategory/index'), { loading: () => <Loading />, ssr: false })
 class discussionForum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: undefined,
            loader: false,
            ud:this.props.ud 
            // path: 'http://localhost:3000/discussion-forum/category'
        }
    }
    componentDidMount() {
        // console.log("history2", this.props.history.location.state);
        this.setState({ path: this.props.router.query.url })
        const { DISCUSSION_CATEGORY_ID } = this.props.router.query
        window.scroll(0, 0)
        const URL = window.location.href
        const d1 = URL.split('/category/')
        const Category = d1[1]
        // document.title = constant.title.DiscussionForumCategory.replace("carrier",Category)
        if (DISCUSSION_CATEGORY_ID) {
            this.DiscussionThreadListBycategory(DISCUSSION_CATEGORY_ID)
        } else {
            this.DiscussionSearchByInput()
        }
    }
    DiscussionSearchByInput = (Value = "") => {
        this.setState({ loader: true })
        qadiscussionSearchByInput(Value).then((res) => {
            this.setState({ list: res.result, loader: false })
        }).catch((err) => {
            alert(err);
        })
    }
    DiscussionSearchByInput1 = (Value = "") => {
        qadiscussionSearchByInput(Value).then((res) => {
            this.setState({ list: res.result })
        }).catch((err) => {
            alert(err);
        })
    }

    DiscussionThreadListBycategory = (data) => {
        qaDiscussionThreadListBycategory(data).then((res) => {
            this.setState({ list: res.result })
        }).catch((err) => {
            alert(err)
        })
        this.props.router.push({ state: '' })
    }
    render() {
        const { list, path } = this.state
        const URL = this.props.router.query.url
        const d1 = URL.split('/category/')
        const Category = d1[1]
        // document.title = constant.title.DiscussionForumCategory.replace("career",Category)

        if (path && path !== this.props.router.query.url) {
            const URL = this.props.router.query.url
            const d1 = URL.split('/category/')
            const Category = d1[1]
            document.title = constant.title.DiscussionForumCategory.replace("career",Category)

            const { DISCUSSION_CATEGORY_ID } = this.props.router.query
            window.scroll(0, 0)
            if (DISCUSSION_CATEGORY_ID) {
                this.DiscussionThreadListBycategory(DISCUSSION_CATEGORY_ID)
            } else {
                this.DiscussionSearchByInput()
            }
            this.setState({ path: this.props.router.query })
        }
        return (
            <React.Fragment>
                 <FilteredHeader ud={this.state.ud} />
                <DisscussionForumCategory
                    List={list}
                    DiscussionList={this.DiscussionThreadList}
                    DiscussionSearchByInput1={(Value) => this.DiscussionSearchByInput1(Value)}
                    DiscussionSearchByInput={(Value) => this.DiscussionSearchByInput(Value)}
                    DiscussionThreadListBycategory={(data) => this.DiscussionThreadListBycategory(data)}
                    router={this.props.router}
                    ud={this.props.ud}
                />
                {this.state.loader &&
                    <div style={{
                        position: "fixed",
                        zIndex: "999",
                        left: "0",
                        top: " 0",
                        width: " 100%",
                        height: " 100%",
                        overflow: "auto",
                        padding: "210px",
                        backgroundColor: "rgba(0, 0, 0, 0.4)"
                    }}>
                        
                        <LoadingOverlay
                            active={true}
                            spinner={<SpinnerCircular color={'rgba(0,0,0,0.44)'} secondaryColor={'rgb(230,46,45)'} />}
                        >
                        </LoadingOverlay>

                    </div>
                }
            </React.Fragment>
        )
    }
}

export default withRouter(discussionForum)

export async function getServerSideProps(context){
    const {req}  = context
  let ud = getLoggedInUserData(req) 
  
     return {
       props:{ud}
   }
   }