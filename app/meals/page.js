import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/MealsGrid";
import { getAllMeals } from "@/lib/meals";
import { Suspense } from "react";
import Loading from "./loading"
async function FetchMeals() {
    const meals = await getAllMeals()
    return   <MealsGrid meals={meals} />

}

export default function MealsPage() {
     
    return (
        <>
            <header className={classes.header} >
                <h1>Delicious meals, created
                    <span className={classes.highlight}> by you</span>
                </h1>
                <p> Choose your favorite recipe and cook it yourself. Its easy </p>
                <p className={classes.cta}>
                    <Link href="/meals/share"> Share your favorite recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<Loading/>}>
                    <FetchMeals />
                </Suspense>
            </main>
        </>
    )
}
