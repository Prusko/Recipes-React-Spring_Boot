package App.Recept.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import App.Recept.Domain.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long>{
    List<Recipe> findAll();

    List<Recipe> findAllByTitleContainingIgnoreCase(String search);
}
