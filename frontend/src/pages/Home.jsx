import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import {useLocation,useNavigate} from "react-router-dom";

export default function Home() {

    let [recipes, setRecipes] = useState([]);
    let location = useLocation();
    let searchQuery = new URLSearchParams(location.search);
    let page = searchQuery.get("page") || 1;
    let [links,setLinks] = useState(null);
    let navigate = useNavigate();
    
    useEffect(() => {
        let fetchRecipes = async () => {
            let response = await fetch(`http://localhost:4000/api/recipes?page=${page}`);

            if (response.ok) {

                let data = await response.json();

                setRecipes(data.data);
                setLinks(data.links)
                window.scroll({top:0,left:0,behavior:'smooth'})
            }
        }
        

        fetchRecipes()
    }, [page])

    let onDeleted=(id)=>{
        if(recipes.length === 1 && parseInt(page) > 1){
            navigate("/?page="+(parseInt(page)-1));
        }else{
            setRecipes((prev)=>{
                return prev.filter((el)=> el._id !== id);
            })
        }
        
    }



    return (
        <div className='space-y-3'>
            {!!recipes.length && (recipes.map((recipe) => {
                return (
                  <RecipeCard onDeleted={onDeleted} key={recipe._id} recipe={recipe}/>
                )
            }))}

            {!!links && <Pagination links={links} page={page}/>}
        </div>
    )
}
