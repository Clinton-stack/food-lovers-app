"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMeal(prevState, formData) {
  function isInputValid(text) {
    return text.trim() === " " || !text;
  }
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInputValid(meal.title) ||
    isInputValid(meal.summary) ||
    isInputValid(meal.instructions) ||
    isInputValid(meal.creator) ||
    isInputValid(meal.creator_email) ||
    meal.image.size === 0 ||
    !meal.image.type.includes("image") ||
    !meal.creator_email.includes("@") ||
    !meal.image
  ) {
    return{ message: "Invalid input"}
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
