import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function RecipeUpdate() {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://recipes-spring-boot.onrender.com/api/v1/recipe/${id}`)
        .then(res => setRecipe(res.data))
    }, []);

    if (!recipe) return <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    </div>;

    const save = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);



        try {
            await fetch("http://localhost:8080/api/v1/save-recipe", {
                method: "POST",
                body: formData
            });
            navigate("/");
        } catch (error) {
            // Hibakezelés
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Form
                className="border"
                style={{ padding: "2rem", backgroundColor: "#f8f9fa", borderRadius: "8px", minWidth: "350px" }}
                encType="multipart/form-data"
                onSubmit={save}
            >
                {recipe.id && (
                    <input type="hidden" name="id" value={recipe.id} />
                )}
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" name="title" value={recipe.title} onChange={e => setRecipe({...recipe, title: e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={8} name="description" value={recipe.description} onChange={e => setRecipe({...recipe, description: e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" accept="image/*" />
                    <Form.Text className="text-muted">
                        300x220
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </Container>
    );
}

export default RecipeUpdate;