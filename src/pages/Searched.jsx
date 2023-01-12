import React, { useEffect, useState } from 'react';
import { REACT_APP_API_KEY } from '../components/Constants/Constants';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


function Searched() {

const [searchedItems,setSearchedItems]=useState([]);
let params=useParams();


const getSearchedItem= async(search)=>{

  const check=localStorage.getItem('searchedItems');

  if(check){
    setSearchedItems(JSON.parse(check));
  }
  else{
    const api= await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${REACT_APP_API_KEY}&number=9&query=${search}`)
    const data=await api.json();
    localStorage.setItem("searchedItems",JSON.stringify(data.recipes))
    setSearchedItems(data.recipes)
  }

  
        // const api= await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${REACT_APP_API_KEY}&number=9&query=${search}`)
        // const data=await api.json();
        // console.log("searches results:",searchedItems);
        // setSearchedItems(data.recipes)
  
  
}
console.log(searchedItems)

useEffect(()=>{

  getSearchedItem(params.search);
  console.log("param search:",params.search)

},[params.search]);

  return (
    
      <Grid>
        {searchedItems.map((recipe)=>{
          return(
            <Link to={'/recipe/'+recipe.id}>
            <Card key={recipe.id}>
            <img src={recipe.image} alt="" />
            <p>{recipe.title}</p>
            </Card>
            </Link>
          )
        })}
  
      </Grid>
    
  )
}

const Grid=styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 1.5rem;
`;

const Card=styled.div`
  img{
    width: min(400px, 100%);
    border-radius: 2rem;
  }
  a{
    text-decoration: none;
  }
  p{
    text-align: center;
    padding: 1rem;
    font-weight:400;
    font-size:0.8rem;
  }
`;


export default Searched