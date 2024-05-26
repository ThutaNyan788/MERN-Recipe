import React from 'react'

export default function Ingredient({ingredients}) {
    return (
        <div className='space-x-2'>
            Ingredients -
            {!!ingredients.length && ingredients.map((ingredient, index) => {
                return (
                    <span key={index} className='bg-orange-400 text-white  px-2 py-1 text-sm rounded-full '>
                        {ingredient}
                    </span>
                )
            })}

        </div>
    )
}
