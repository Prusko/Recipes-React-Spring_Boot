import { useState, useEffect } from "react";
import HomePageService from "../Service/HomePageService";
import { Link } from 'react-router-dom';

function Home() {
    const [recipes, setrecipes] = useState([]);

    useEffect(() => {
        HomePageService.getAllRecipes()
            .then(res => {
                setrecipes(res.data)
            })
    }, []);

    return (
        <div className="d-flex flex-wrap gap-4 justify-content-center">
            {recipes.map(
                recipe =>
                    <Link
                        to={`/recipe/${recipe.id}`}
                        className="recipe-card shadow-lg bg-white rounded-bottom mb-4"
                        key={recipe.id}
                        style={{
                            maxWidth: '300px',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '0',
                            marginTop: '30px',
                            transition: 'ease .12s',
                            textDecoration: 'none',
                            color: 'black'
                        }}
                    >
                        <img
                            src={`data:${recipe.imageType};base64,${recipe.imageBase64}`}
                            alt={recipe.title}
                            className="w-100"
                            style={{
                                maxWidth: '300px',
                                borderTopLeftRadius: '1rem',
                                borderTopRightRadius: '1rem',
                                objectFit: 'cover'
                            }}
                        />
                        <h1 className="fs-4 text-center p-3 m-0">{recipe.title}</h1>
                    </Link>
            )}
        </div>
    );
}

export default Home;