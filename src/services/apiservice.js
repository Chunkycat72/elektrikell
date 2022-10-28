import moment from "moment";

const apiurl = 'https://dashboard.elering.ee/api';

export async function getCurrentPrice(selectedCountry) {
    const country = selectedCountry.key;
    const response = await fetch(`${apiurl}/nps/price/${country}/current`);
    return response.json();
};


export async function getPriceData() {
    const start = moment().utc().subtract(10, 'hours').format();
    const end = moment().utc().add(30, 'hours').format();
    const params = new URLSearchParams({start, end});
    const response = await fetch(`${apiurl}/nps/price?${params}`);
    return response.json();
}
