import apiCall from "./apiCall";
import { defer } from 'react-router-dom';

export const propertyLoader = async ({ request, params }) => {
    const res = await apiCall("/posts/" + params.id);
    // console.log(res.data);
    return res.data;
};

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1]
    const postPromise = await apiCall("/posts?" + query);
    return defer({
        postResponse: postPromise,
    });
};



export const profileLoader = async () => {
    const postPromise = apiCall("/users/profilePosts");
    return defer({
        postResponse: postPromise,
    });
};