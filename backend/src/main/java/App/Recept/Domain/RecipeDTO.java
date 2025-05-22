package App.Recept.Domain;

import java.util.Base64;

public class RecipeDTO {
    private Long id;
    private String title;
    private String description;
    private String imageBase64;
    
    public RecipeDTO(Recipe r) {
        this.id = r.getId();
        this.title = r.getTitle();
        this.description = r.getDescription();
        if (r.getImageData() != null) {
            this.imageBase64 = Base64.getEncoder().encodeToString(r.getImageData());
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }
    
}