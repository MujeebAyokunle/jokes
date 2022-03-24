
import React, { useCallback } from 'react';
import './Homescreen.scss'

const Categories = ({ categories, categoryfunc }) => {

    const jokesCategory = ['#ffbe5b', '#57dbe6', '#ffdf5b', '#ff5b5b', '#57e690', '#ff915b', '#8fe360', '#ffbe5b', '#ff915b', '#ffdf5b', '#8fe360', '#57e690', '#ff5b5b', '#57dbe6']

    const categoryCb = (category, color) => {

        return categoryfunc(category, color)
    }

    return (
        <div className='category-container' >
            {
                categories.map((obj, index) => (
                    <div onClick={() => categoryCb(obj.category, jokesCategory[index])} key={index} style={{ backgroundColor: jokesCategory[index], cursor: 'pointer' }} className='category-button' >
                        <p > {obj.category.toUpperCase()} </p>
                    </div>
                ))
            }
            <div onClick={() => categoryCb("", "#cfb995")} style={{ backgroundColor: 'white', border: '1px solid #cfb995', cursor: 'pointer' }} className='category-button' >
                <p style={{ color: '#cfb995' }} > VIEW ALL
                    <span style={{ float: 'right' }} > <img alt='' src={require('../assets/assets_Homework_Front-End_01/path-copy-7.png')} /> </span>
                </p>
            </div>
        </div>
    );
}

export default Categories;
