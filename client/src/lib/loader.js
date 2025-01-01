import apiCall from "./apiCall";

export const propertyLoader = async ({ request, params }) => {
    const res = await apiCall("/posts/" + params.id);
    // console.log(res.data);
    return res.data;
};