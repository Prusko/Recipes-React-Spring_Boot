package App.Recept.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import App.Recept.Domain.Recipe;
import App.Recept.Repository.RecipeRepository;

@Service
public class RecipeService {
    private RecipeRepository recipeRepo;

    @Autowired
    public void setRecipeRepository(RecipeRepository recipeRepo){
        this.recipeRepo = recipeRepo;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepo.findAll();
    }

    public void saveRecipe(Recipe recipe) {
        recipeRepo.save(recipe);
    }

    public Recipe findRecipeById(Long id) {
        return recipeRepo.findById(id).get();        
    }

    public void deleteRecipe(Long id) {
        recipeRepo.deleteById(id);
    }

    public List<Recipe> findAllByTitleLike(String search) {
        return recipeRepo.findAllByTitleContainingIgnoreCase(search);
    }
}
