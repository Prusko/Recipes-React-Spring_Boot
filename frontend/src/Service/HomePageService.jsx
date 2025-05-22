import axios from 'axios';

const HOMEPAGE_API_URL = "https://recipes-spring-boot.onrender.com/api/v1/receptek";

const HomePageService = {
    getAllRecipes(){
        return axios.get(HOMEPAGE_API_URL);
    }
}

export default HomePageService;