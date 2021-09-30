import express from "express";
import { Recipe } from "../models/recipe.js";

const router = express.Router();

router.get("/get-recipe", async (req, res) => {
  const recipe = await Recipe.find();

  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.json({ message: "Error!" });
  }
});

router.post("/add-recipe", async (req, res) => {
  const { name, ingredients, procedure, src } = req.body;

  const isRecipe = await Recipe.findOne({ name: name });

  if (!isRecipe) {
    const recipe = new Recipe({ name, ingredients, procedure, src });
    recipe.save();

    res.status(200).json(`${name} saved successfully`);
  } else {
    res.status(402).json(`${name} already exists`);
  }
});

router.post("/edit-recipe/:id", async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, procedure, src } = req.body;

  const isRecipe = await Recipe.findOne({ _id: id });

  if (isRecipe) {
    isRecipe.name = name;
    isRecipe.ingredients = ingredients;
    isRecipe.procedure = procedure;
    isRecipe.src = src;

    await isRecipe.save();

    res.status(200).json(`${name} saved successfully`);
  } else {
    res.status(402).json(`Error saving data`);
  }
});

export { router };
