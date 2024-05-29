import React, { useEffect, useState } from 'react'
import plus from "./../assets/plus.svg"
import Ingredient from './../components/Ingredient';
import axios from './../helpers/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecipeForm() {
    let { id } = useParams();
    let [ingredients, setIngredients] = useState([]);
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [newIngredient, setNewIngredient] = useState("");
    let [errors, setErrors] = useState([]);
    let [file, setFile] = useState(null);
    let [preview, setPreview] = useState(null);
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();


    useEffect(() => {
        let fetchRecipe = async () => {
            if (id) {
                let res = await axios.get("/api/recipes/" + id);

                if (res.status === 200) {
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                    setIngredients(res.data.ingredients);
                    setPreview(import.meta.env.VITE_BACKEND_URL + res.data.photo);
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
        setLoading(true);
        try {
            let recipe = {
                title,
                description,
                ingredients
            };

            let res;
            if (id) {
                res = await axios.patch("/api/recipes/" + id, recipe);

            } else {
                res = await axios.post("/api/recipes", recipe);

            }

            //file 
            let formData = new FormData;
            formData.set("photo", file);


            // upload
            let uploadRes = await axios.post(`/api/recipes/${res.data._id}/upload`,
                formData, {
                headers: {
                    Accept: "multipart/form-data"
                }
            }
            );



            if (res.status === 200) {
                setLoading(false);
                navigate("/")
            }
        } catch (error) {
            setLoading(false);
            setErrors(Object.keys(error.response.data.errors));
        }

    }

    let upload = (e) => {
        let file = e.target.files[0]
        setFile(file);

        //preview 
        let fileReader = new FileReader;

        fileReader.onload = (e) => {
            setPreview(e.target.result);
        }

        fileReader.readAsDataURL(file);
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

                <input type="file" onChange={upload} name="" id="" />
                {preview && <img src={preview} alt='' />}
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
                    type='submit' className=' flex justify-center items-center w-full px-3 py-1 rounded-full bg-orange-400 text-white'>

                    {loading && (
                        <svg className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    )}


                    {id ? "Update" : "Create"} Recipe
                </button>
            </form>
        </div>
    )
}
