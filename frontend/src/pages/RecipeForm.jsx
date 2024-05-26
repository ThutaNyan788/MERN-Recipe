import React, { useState } from 'react'
import plus from "./../assets/plus.svg"
import Ingredient from './../components/Ingredient';

export default function RecipeForm() {
    let [ingredients,setIngredients] = useState([]);
    let [newIngredient,setNewIngredient] = useState("");


    let addIngredient=()=>{
        setIngredients((prev)=>{
            return [newIngredient,...prev]
        });

        setNewIngredient("");
    }
    return (
        <div className='mx-auto max-w-md border-4 border-white p-4 rounded' >
            <h1 className='mb-4 text-2xl font-bold text-orange-400 text-center'>
                Recipe Create Form
            </h1>
            <form action="" className='space-y-5'>
                <input type="text" name="" id="" className='w-full p-1 rounded-sm' placeholder='Enter Title...' />

                <textarea name="" rows="5" className='w-full p-1 rounded-sm' id="" placeholder='Recipe Description...'>

                </textarea>


                <div className='flex space-x-2 items-center'>
                    <input type="text" value={newIngredient} onChange={(e)=>setNewIngredient(e.target.value)} name="" id="" className='w-full p-1 rounded-sm' placeholder='Recipe Ingredient...' />
                    <img src={plus} className='cursor-pointer' onClick={addIngredient}/>
                </div>

                <div>
                    <Ingredient ingredients={ingredients}/>
                </div>


                <button
                    className='w-full px-3 py-1 rounded-full bg-orange-400 text-white'>
                    Create Recipe
                </button>
            </form>
        </div>
    )
}
