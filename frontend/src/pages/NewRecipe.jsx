import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

function NewRecipePage() {
    const navigate = useNavigate();

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
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" name="title" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={8} name="description" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" accept="image/*" required />
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

export default NewRecipePage;