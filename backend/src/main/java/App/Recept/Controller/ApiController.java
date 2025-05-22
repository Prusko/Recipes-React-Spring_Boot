package App.Recept.Controller;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import App.Recept.Domain.RecipeDTO;
import App.Recept.Domain.Recipe;
import App.Recept.Service.RecipeService;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("http://localhost:3000")
public class ApiController {
    private RecipeService recipeService;

    @Autowired
    public void setRecipeRepository(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @RequestMapping("/receptek")
    public List<RecipeDTO> getReceptek() {
        return recipeService.getAllRecipes().stream()
                .map(RecipeDTO::new)
                .collect(Collectors.toList());
    }

    @RequestMapping("/save-recipe")
    public void saveRecipe(@RequestParam(value = "id", required = false) Long id, @RequestParam("title") String title,
            @RequestParam("description") String description, @RequestParam("image") MultipartFile image)
            throws IOException {
        Recipe recipe;

        if (id != null) {
            recipe = recipeService.findRecipeById(id);
            recipe.setTitle(title);
            recipe.setDescription(description);
            if (!image.isEmpty()) {
                recipe.setImageType(image.getContentType());
                recipe.setImageData(image.getBytes());
            }
        } else {
            recipe = new Recipe();
            recipe.setTitle(title);
            recipe.setDescription(description);
            if (!image.isEmpty()) {
                recipe.setImageType(image.getContentType());
                recipe.setImageData(image.getBytes());
            }
        }
        recipeService.saveRecipe(recipe);
    }

    @GetMapping("/recipe/{id}")
    public RecipeDTO showRecipe(@PathVariable Long id) {
        Recipe recipe = recipeService.findRecipeById(id);
        return new RecipeDTO(recipe);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRecipe(@PathVariable("id") Long id) {
        recipeService.deleteRecipe(id);
    }

    @GetMapping("/recipe/title={search}")
    public List<RecipeDTO> getAllRecipeByTitle(@PathVariable("search") String search){
        return recipeService.findAllByTitleLike(search).stream()
        .map(RecipeDTO::new)
        .collect(Collectors.toList());
    }
}
