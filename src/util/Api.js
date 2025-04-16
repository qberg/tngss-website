import axios from "axios";

const APIBaseUrl = "https://api.tngss.in/";

export const unAuthFetch = async (path) => {
    const response = await axios
        .get(`${APIBaseUrl}` + path, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: error }));
    return response;
};