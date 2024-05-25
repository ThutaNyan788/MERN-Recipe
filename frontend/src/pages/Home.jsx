import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard';

export default function Home() {

    let [recipes, setRecipes] = useState([]);

    useEffect(() => {
        let fetchRecipes = async () => {
            let response = await fetch("http://localhost:4000/api/recipes");

            if (response.ok) {

                let data = await response.json();

                setRecipes(data);
            }
        }

        fetchRecipes()
    }, [])

    return (
        <div className='space-y-3'>
            {!!recipes.length && (recipes.map((recipe) => {
                return (
                  <RecipeCard key={recipe._id} recipe={recipe}/>
                )
            }))}

        </div>
    )
}
