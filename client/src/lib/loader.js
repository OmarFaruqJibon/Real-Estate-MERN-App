import apiCall from "./apiCall";

export const propertyLoader = async ({ request, params }) => {
    const res = await apiCall("/posts/" + params.id);
    // console.log(res.data);
    return res.data;
};

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1]
    const res = await apiCall("/posts?" + query);

    return res.data;
};