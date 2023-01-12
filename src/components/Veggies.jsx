import React, { useEffect, useState } from "react";
import { REACT_APP_API_KEY } from "./Constants/Constants";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Veggies() {

  const [veg,setVeg]=useState([]);

  const getVeg= async()=>{

    const check=localStorage.getItem('vegg');

    //Checking Local Storage
    if(check){
        setVeg(JSON.parse(check)) //get data from LS as Javascript Object using parse();
    }
    else{
        const api=await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${REACT_APP_API_KEY}&number=9&tags=vegetarian`);
        const data= await api.json();
        localStorage.setItem("vegg",JSON.stringify(data.recipes)) //set data in LS as JSON format(JSON format is string).
        setVeg(data.recipes);
    }
  }

  useEffect(()=>{

    getVeg();  },[])

  
  return(
    <div>
    <Wrapper>
        <h3>Our Veggetarian Picks</h3>
        <Splide options={{
            perPage:3,
            arrows:false,
            pagination:false,
            drag:'free',
            gap:"5rem"
        }}>
            {veg.map((recipe)=>{
                return(
                    <SplideSlide>
                    <Card>
                      <Link to={'/recipe/'+recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image}/>
                    <Gradient/>
                    </Link>
                    </Card>
                    </SplideSlide>
                )
            })}
            </Splide>
  </Wrapper>
</div>
  )
}


export default Veggies


const Wrapper=styled.div`
margin:4rem 0rem`;

const Card=styled.div`
min-height:15rem;
border-radius:2rem;
overflow:hidden;
position:relative;

img{
    border-radius:2rem;
    position:absolute;
    left:1px;
    width:100%;
    height:100%;
    object-fit:cover;
}
p{
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align:center;
    font-weight:600;
    font-size:1rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center;
}
`;

const Gradient=styled.div`
    z-index:3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`;





