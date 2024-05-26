import React from 'react'
import Ingredient from './Ingredient'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, onDeleted }) {


    let deleteRecipe = async () => {
        let res = await axios.delete(`http://localhost:4000/api/recipes/${recipe._id}`);

        if (res.status == 200) {
            onDeleted(recipe._id);
        }
    }

    return (
        <div key={recipe._id} className='bg-white p-5 rounded-2xl space-y-4'>
            <div className="flex justify-between">
                <h3 className='text-xl font-bold text-orange-400'>{recipe.title}</h3>

                <div className='space-x-3'>
                    <Link to={`/recipes/edit/${recipe._id}`} className='bg-yellow-500 px-2 py-1 rounded-lg text-white text-sm'>
                        Edit
                    </Link>


                    <button onClick={deleteRecipe} className='bg-red-500 px-2 py-1 rounded-lg text-white text-sm'>
                        Delete
                    </button>
                </div>

            </div>

            <p>Description</p>
            <p>
                {recipe.description}
            </p>
            <Ingredient ingredients={recipe.ingredients} />
            <p className='text-gray'>Published at - {recipe.createdAt}</p>
        </div>
    )
}
