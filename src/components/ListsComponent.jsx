import React, { useState } from 'react'
import { FaBusinessTime, FaCheck, FaListCheck } from 'react-icons/fa6'
import useWindowSize from '../customHooks/useWindowSize'
import EachCards from './EachCards';
import { useAppContext } from '../AppContext';

function ListsComponent({eachListSection}) {

    const { id, title, cards } = eachListSection;

    const { windowWidth } = useWindowSize();

    const cardViewPort = windowWidth < 768 ? 'w-[280px]' 
    : windowWidth < 1024 ? 'w-[300px]' 
    : 'w-[400px]';


  return (
    <div 
    id={eachListSection.id}
    className={cardViewPort}>
        {title === 'To Do' ? 
        <h3
        className='header-grid font-semi-bold'>To Do List <FaListCheck  className='text-red-500'/> </h3>:
        title === 'In Progress' ?
        <h3 className='header-grid font-semi-bold'>In Progress <FaBusinessTime className='text-yellow-500'/> </h3>:

        <h3 className='header-grid font-semi-bold'>Completed <FaCheck className='text-green-500'/> </h3>
        }
        <div className='cards-wrapper'>
          {
            cards.map( eachCard => (
              <EachCards 
              key={eachCard.id}
              sectionId = {id}
              cards={cards}
              eachCard={eachCard}/>
            ))
          }
        </div>
    </div>
  )
}

export default ListsComponent;