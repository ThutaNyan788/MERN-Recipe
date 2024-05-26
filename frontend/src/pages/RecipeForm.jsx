import React, { useEffect, useState } from 'react'
import plus from "./../assets/plus.svg"
import Ingredient from './../components/Ingredient';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecipeForm() {
    let { id } = useParams();
    let [ingredients, setIngredients] = useState([]);
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [newIngredient, setNewIngredient] = useState("");
    let [errors, setErrors] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {
        let fetchRecipe = async () => {
            if (id) {
                let res = await axios.get("http://localhost:4000/api/recipes/" + id);

                if (res.status === 200) {
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                    setIngredients(res.data.ingredients);

                }
            }
        }

        fetchRecipe();
    }, [])

    let addIngredient = () => {
        setIngredients((prev) => {
            return [newIngredient, ...prev]
        });

        setNewIngredient("");
    }


    let submit = async (e) => {
        e.preventDefault();

        try {
            let recipe = {
                title,
                description,
                ingredients
            };

            let res ;
            if (id) {
                 res = await axios.patch("http://localhost:4000/api/recipes/"+id, recipe);

            } else {
                 res = await axios.post("http://localhost:4000/api/recipes", recipe);

            }
            if (res.status === 200) {
                navigate("/")
            }
        } catch (error) {
            setErrors(Object.keys(error.response.data.errors));
        }

    }
    return (
        <div className='mx-auto max-w-md border-4 border-white p-4 rounded' >
            <h1 className='mb-4 text-2xl font-bold text-orange-400 text-center'>
                Recipe {id ? "Edit" : "Create"} Form
            </h1>
            <form onSubmit={submit} action="" className='space-y-5'>
                <ul className='list-disc pl-3'>
                    {!!errors.length && errors.map((error, index) => (
                        <li key={index} className='text-red-500 text-sm'>{error} is invalid value</li>
                    ))}
                </ul>
                <input type="text" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)} className='w-full p-1 rounded-sm' placeholder='Enter Title...' />

                <textarea name="" value={description} onChange={(e) => setDescription(e.target.value)} rows="5" className='w-full p-1 rounded-sm' id="" placeholder='Recipe Description...'>

                </textarea>


                <div className='flex space-x-2 items-center'>
                    <input type="text" value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} name="" id="" className='w-full p-1 rounded-sm' placeholder='Recipe Ingredient...' />
                    <img src={plus} className='cursor-pointer' onClick={addIngredient} />
                </div>

                <div>
                    <Ingredient ingredients={ingredients} />
                </div>


                <button
                    type='submit' className='w-full px-3 py-1 rounded-full bg-orange-400 text-white'>
                    {id ? "Update" : "Create"} Recipe
                </button>
            </form>
        </div>
    )
}
