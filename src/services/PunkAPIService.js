import axios from "axios";

const baseURL = "https://api.punkapi.com/v2/beers";
export const fetchBeers = async (searchQuery, page = 1, take = 50,) => {
    let params = {
        page: page,
        per_page: take,
        ...searchQuery ? {beer_name: searchQuery} : {}
    }
    return await axios.get(baseURL, {params});
};

export const processData = (data) => {
    for (let beer of data) {
        beer.price = (Number(beer['target_fg']) / 100).toFixed(2);
        beer.discounted_price = (Number(beer['target_og']) / 100).toFixed(2);
        delete beer['target_fg']
        delete beer['target_og']
        delete beer['ebc']
        delete beer['ph']
        delete beer['srm']
        delete beer['description']
        delete beer['attenuation_level']
        delete beer['volume']
        delete beer['boil_volume']
        delete beer['method']
        delete beer['ingredients']
        delete beer['food_pairing']
        delete beer['brewers_tips']
        delete beer['method']
    }
    return data;
}
