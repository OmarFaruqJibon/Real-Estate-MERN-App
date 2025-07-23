import apiCall from "./apiCall";
import { defer } from "react-router-dom";

export const propertyLoader = async ({ request, params }) => {
  try {
    const res = await apiCall("/posts/" + params.id);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to load property:", error);
    throw error;
  }
};

export const listPageLoader = async ({ request, params }) => {
  try {
    const query = request.url.split("?")[1];
    const postPromise = await apiCall("/posts?" + query);
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Failed to load list Page:", error);
    throw error;
  }
};

export const profileLoader = async () => {
  try {
    const postPromise = apiCall("/users/profilePosts");
    const chatPromise = apiCall("/chats");
    return defer({
      postResponse: postPromise,
      chatResponse: chatPromise,
    });
  } catch (error) {
    console.error("Failed to load profile Page:", error);
    throw error;
  }
};
