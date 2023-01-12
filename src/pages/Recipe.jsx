import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { REACT_APP_API_KEY } from '../components/Constants/Constants'

function Recipe() {
    const[recipe,setRecipe]=useState({})
    const param=useParams();
    const [activeTab,setActiveTab]=useState('instructions')
  
const getRecipes=async()=>{
    
    const api=await fetch(`https://api.spoonacular.com/recipes/${param.id}/information?apiKey=${REACT_APP_API_KEY}`);
    const data=await api.json();
    setRecipe(data);
}

console.log("recipe of dish:",recipe)

useEffect(()=>{
getRecipes(param.id)

},[param.id])

    return (
    <Wrapper>
        <div>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt="" />
        </div>
        <Info>
            <Button className={activeTab === 'instructions' ?'active':''} onClick={()=>{setActiveTab('instructions')}}>Instructions</Button>
            <Button className={activeTab==='ingredients' ? 'active':''} onClick={()=>{setActiveTab('ingredients')}}>Ingredients</Button>

             {activeTab === 'instructions' && (
                    <div>
                    <h3 dangerouslySetInnerHTML={{__html:recipe.summary}}></h3>
                    <h3 dangerouslySetInnerHTML={{__html:recipe.instructions}}></h3>
                </div>
             )}

             {activeTab === 'ingredients' && (
                    <ul>
                    {recipe.extendedIngredients.map(({ id, original }) => (
                      <li key={id}>{original}</li>
                    ))}
                  </ul>
             )}
            
        </Info>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 10rem inherit 5rem;
  display: flex;
  @media (max-width: 1068px) {
    flex-direction: column;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
  h2 {
    margin-bottom: 2rem;
    font-size: 1rem;
  }
  h3{
    padding-top: 1.5rem;
    font-size: 0.8rem;
    font-weight: 600;

    li{
        font-size: 0.8rem;
        line-height: 1rem;
    }
  }
  img{
    width:15rem;
    height:15rem;
    object-fit:cover;
  }
  ul {
    margin-top: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  p {
    margin: 1rem 0;
    font-size: 1.1rem;
    line-height: 1.8rem;
    &:first-child {
      margin-top: 2rem;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
  @media (max-width: 1068px) {
    margin-top: 3rem;
    margin-left: 1rem;
  }
`;

export default Recipe


