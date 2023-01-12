import {FaPizzaSlice,FaHamburger} from 'react-icons/fa';
import{GiNoodles,GiChopsticks} from 'react-icons/gi';
import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Category() {
  return (
    <List>
        <SLink to={'/cuisine/Italian'}>
            <FaPizzaSlice/>
            <h4>Italian</h4>
        </SLink >
        <SLink to={'/cuisine/American'}>
            <FaHamburger/>
            <h4>American</h4>
        </SLink>
        <SLink to={'/cuisine/Thai'}>
            <GiNoodles/>
            <h4>Thai</h4>
        </SLink>
        <SLink to={'/cuisine/Japanese'}>
            <GiChopsticks/>
            <h4>Japanese</h4>
        </SLink>
    </List>
  )
}

const List=styled.div`
display:flex;
justify-content:center;
margin:2rem 0rem;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 2rem;
  text-decoration: none;
  width: 6rem;
  height: 6rem;
  background:linear-gradient( #494949, #313131);
  cursor: pointer;
  transform: scale(0.8);
  position: relative;

  h4 {
    color: #fff;
    font-size: 0.8rem;
    padding-top: 1.5rem;
  }
  svg {
    position:absolute;
    color: #fff;
    font-size: 2rem;
    padding-bottom: 1rem;
    
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
    svg {
      color: #fff;
      z-index: 2;
    }
    h4 {
      color: #fff;
    }
  }
`;

export default Category