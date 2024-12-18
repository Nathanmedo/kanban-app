import React, { useState } from 'react'
import { useAppContext } from '../AppContext'
import ListsComponent from './ListsComponent';
import useWindowSize from '../customHooks/useWindowSize';
import AddGoals from './AddGoals';
import { FaPlus } from 'react-icons/fa6';

function NoteSection() {
  const { noteState, setNoteState, setModalData, setShowModal } = useAppContext();
  const { windowWidth } = useWindowSize();
  const [ showAddTab, setShowAddTab ] = useState(false)


  //TODO: manage the grid according to the viewport size
  const listViewport =  windowWidth < 920 ? 'grid-cols-1' : windowWidth < 1024 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <>
      <button 
      onClick={()=> {
        setModalData(null),
        setShowModal(true)
      }}
      className='fixed bottom-10 rounded-full z-[1000] bg-green-700 text-white h-[50px] px-5 flex items-center justify-center right-10'><FaPlus /></button>
      <main className='w-full h-[100svh] grid justify-center'>
          <div className={` ${listViewport} grid my-10 gap-12 md:gap-16 lg:gap-[140px]`}>
            {[...noteState].map((eachListSection, index)=>(
              <ListsComponent
              eachListSection={eachListSection}
              key={eachListSection.id}/>
            ))}
          </div>
      </main>
    </>
  )
}

export default NoteSection;