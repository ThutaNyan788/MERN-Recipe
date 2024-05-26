import React from 'react'
import Ingredient from './Ingredient'

export default function RecipeCard({recipe}) {
    return (
        <div key={recipe._id} className='bg-white p-5 rounded-2xl space-y-4'>
            <h3 className='text-xl font-bold text-orange-400'>{recipe.title}</h3>
            <p>Description</p>
            <p>
                {recipe.description}
            </p>
            <Ingredient ingredients={recipe.ingredients}/>
            <p className='text-gray'>Published at - {recipe.createdAt}</p>
        </div>
    )
}
