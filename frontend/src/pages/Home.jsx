import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import { useLocation, useNavigate } from "react-router-dom";
import axios from './../helpers/axios';

export default function Home() {

    let [recipes, setRecipes] = useState([]);
    let location = useLocation();
    let searchQuery = new URLSearchParams(location.search);
    let page = searchQuery.get("page") || 1;
    let [links, setLinks] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        let fetchRecipes = async () => {
            let response = await axios.get(`/api/recipes?page=${page}`);

            if (response.status == 200) {

                let data = response.data;

                setRecipes(data.data);
                setLinks(data.links)
                window.scroll({ top: 0, left: 0, behavior: 'smooth' })
            }
        }


        fetchRecipes()
    }, [page])

    let onDeleted = (id) => {
        if (recipes.length === 1 && parseInt(page) > 1) {
            navigate("/?page=" + (parseInt(page) - 1));
        } else {
            setRecipes((prev) => {
                return prev.filter((el) => el._id !== id);
            })
        }

    }



    return (
        <>
            <div className='grid grid-cols-3 space-x-2 space-y-3'>
                {!!recipes.length && (recipes.map((recipe) => {
                    return (
                        <RecipeCard onDeleted={onDeleted} key={recipe._id} recipe={recipe} />
                    )
                }))}

            </div>
            {!!links && <Pagination links={links} page={page} />}

        </>
    )
}
