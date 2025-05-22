package App.Recept.Domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "receptek")
public class Recipe {
    @Id
    @SequenceGenerator(name = "recipe_sequence", allocationSize = 1, sequenceName = "recipe_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,  generator = "recipe_sequence")
    private Long id;
    private String title;
    @Column(columnDefinition = "text")
    private String description;

    private String imageType;
    private byte[] imageData;
    public Recipe() {
    }
    public Recipe(String title, String description, String imageType, byte[] imageData) {
        this.title = title;
        this.description = description;
        this.imageType = imageType;
        this.imageData = imageData;
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
    public String getImageType() {
        return imageType;
    }
    public void setImageType(String imageType) {
        this.imageType = imageType;
    }
    public byte[] getImageData() {
        return imageData;
    }
    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    

}
