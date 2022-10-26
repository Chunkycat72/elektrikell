import moment from "moment"; //npm package to work with date/time

const apiurl = 'https://dashboard.elering.ee/api';

//export of async function which inquires current price of electricity
//request GET /nps/price/ee/current - endpoint
//await allows to wait for response from API
//fetch returns promise and response object , if execution was succesful
//each response has function .json() that converts JSON into object
export async function getCurrentPrice() {
    const country = 'EE';
    const response = await fetch(`${apiurl}/nps/price/${country}/current`);
    return response.json();
};


export async function getPriceData() {
    //moment() - returns object with current time and date
    //.utc - converts this value into 0(zulu) time zone
    //.format - formats moment object into string with convinient reading format
    const start = moment().utc().subtract(10, 'hours').format();
    const end = moment().utc().add(30, 'hours').format();
    //URLSearchParam - turns js object into string for browser
    const params = new URLSearchParams({start, end});
    const response = await fetch(`${apiurl}/nps/price?${params}`);
    return response.json();
}
