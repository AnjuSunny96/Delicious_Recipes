import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link,useParams } from 'react-router-dom';
import { REACT_APP_API_KEY } from '../components/Constants/Constants';

function Cuisine() {

  const [cuisin,setCuisin]=useState([]);
  let params=useParams();

const getcuisine=async(name)=>{

  const check=localStorage.getItem('cuisine')

  if(check){
    setCuisin(JSON.parse(check))
  }
  else{
    const api=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_APP_API_KEY}&number=8&cuisin=${name}`);
    const data=await api.json();
    localStorage.setItem("cuisine", JSON.stringify(data.results))
    setCuisin(data.results);
  }
}
console.log("cuisines are:",cuisin)
console.log(`${params.type} cuisines are:`,cuisin)

useEffect(()=>{
   getcuisine(params.type)
},[params.type])

  return (
    <Grid>
      {cuisin.map((recipe)=>{
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

export default Cuisine