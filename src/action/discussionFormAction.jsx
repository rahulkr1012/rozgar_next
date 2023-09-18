import axios from "axios";
import { getCandidateAuthHeader } from "../utils";
export const QACreateThread = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-create-thread`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const qaDiscussionForumCategory = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-discussionforum-category`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const qaDiscussionThreadList = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-discussion-thread-list`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const qaDiscussionThreadListView = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-discussion-thread-list-byViews`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const qadiscussionSearchByInput = (KEYWORD) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-discussionlist-search?KEYWORD=${KEYWORD}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
//
export const qaDiscussionThreadListBycategory = (DISCUSSION_CATEGORY) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-discussion-thread-list-by-category?DISCUSSION_CATEGORY=${DISCUSSION_CATEGORY}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
//
export const qaThreadbyId = (DISCUSSION_THREAD_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/discussion-thread-byid?DISCUSSION_THREAD_ID=${DISCUSSION_THREAD_ID}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const QAsendThreadComment = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/send-thread-comment`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const qaCommentByThreadId = (DISCUSSION_THREAD_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-discussion-comment?DISCUSSION_THREAD_ID=${DISCUSSION_THREAD_ID}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const QAsendThreadCommentReply = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/send-thread-comment-reply`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const qaCommentReplyByCommentId = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-discussion-comment-reply`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const ViewCountThread = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/view-discussion-thread`;
    return axios.put(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const LikeCountThread = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/like-discussion-thread`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
export const LikeList = (CANDIDATE_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/like-list-discussion-thread?CANDIDATE_ID=${CANDIDATE_ID}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data
    })
}
export const qaDiscussionThreadlatestTopic = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/qa-discussion-category-topic`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data
    })
}
export const CommentLikeList = (CANDIDATE_ID) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/comment-like-list-discussion-thread?CANDIDATE_ID=${CANDIDATE_ID}`;
    return axios.get(url, getCandidateAuthHeader()).then((res) => {
        return res.data
    })
}
export const CommentInsertLike = (model) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/comment-like-discussion-thread`;
    return axios.post(url, model, getCandidateAuthHeader()).then((res) => {
        return res.data;
    })
};
