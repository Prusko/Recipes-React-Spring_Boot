import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Recipe.css';

function Recipe() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/recipe/${id}`)
            .then(res => { console.log(res.data); setRecipe(res.data); });
    }, [id]);

    if (!recipe) return <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    </div>;

    const handleDelete = async () => {
        if (window.confirm("Want to Delete?")) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/delete/${id}`);
                navigate("/");
            } catch (error) {
                alert("Hiba történt a törlés során!");
            }
        }
    }

    return (
        <div className="container recipe-responsive-container">
            <Container
                className="d-flex flex-column align-items-center p-0"
            >
                {recipe.imageBase64 &&
                    <img
                        src={`data:${recipe.imageType};base64,${recipe.imageBase64}`}
                        alt={recipe.title}
                        className="w-100 recipe-image"
                    />
                }
                <h1 className="mt-4 text-center">{recipe.title}</h1>
                <p className="recipe-description">
                    {recipe.description
                        .split('\n')
                        .map((line, idx) =>
                            <span key={idx}>• {line}<br /></span>
                        )
                    }
                </p>
                <div className="mb-4 recipe-btn-row">
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    <Link to={`/recipe/update/${id}`} className="btn btn-primary">Update</Link>
                </div>
            </Container>
        </div>
    );
}

export default Recipe;