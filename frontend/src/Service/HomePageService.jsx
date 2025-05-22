import axios from 'axios';

const HOMEPAGE_API_URL = "http://localhost:8080/api/v1/receptek";

const HomePageService = {
    getAllRecipes(){
        return axios.get(HOMEPAGE_API_URL);
    }
}

export default HomePageService;