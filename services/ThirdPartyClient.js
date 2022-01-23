
import axios from "axios";
import config from "./Config";
import headerHelper from "./HeaderHelper";

const ThirdPartyClient = (endpoint, method = 'GET', body, header="application/json") => {
    return axios({
        method,
        url: `http://202.92.4.184:8686/Covid19NetworkAPI/api/v1/${endpoint}`,
        data: body,
        params: method === 'GET' ? body : undefined,
        headers: headerHelper(header)
    });
};

export default ThirdPartyClient; 