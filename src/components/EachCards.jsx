import React, { useLayoutEffect, useRef, useState } from 'react'
import { FaCheck, FaPencil, FaXmark } from 'react-icons/fa6';
import { useAppContext } from '../AppContext';
import NotesModals from './NotesModals';
import Draggable, { DraggableCore } from 'react-draggable';
import gsap, {Power2, Power4} from 'gsap';
import useWindowSize from '../customHooks/useWindowSize';

function EachCards({ eachCard, sectionId, cards }) {

    const { windowWidth }= useWindowSize();

    const { setModalData,
            showModal,
            setShowModal,
            noteState,
            setNoteState,
            todoState,
            setTodoState,
            inprogressState,
            setInprogressState,
            completedState,
            setCompletedState
        } = useAppContext();

        const [ showConfirmModal, setShowConfirmModal ] = useState(false)
        
    const { id, noteTitle, details } = eachCard;
    
    function ConfirmDelete({sectionId, cardId}){
        const handleDeleteNote = (sectionId, cardId) =>{
            const updatedState = noteState.map(eachSection => (
                (eachSection.id).toString() == (sectionId).toString() ? 
                {
                    ...eachSection,
                    cards: eachSection.cards.filter( eachCard => (
                        (eachCard.id).toString() !== (cardId).toString()
                    ))
                }: eachSection
            ))
            setNoteState(updatedState);
        } 

        const confirmModalRef = useRef(null)
        useLayoutEffect(()=> {
            const timeline = gsap.timeline();
            let cxt = gsap.context(()=>{
                timeline.to('#modal_box', {scale: 1, duration: .6, ease: Power2})
                .to('#modal_head', {y: 0, ease:Power4}, '<.3')
                .to('#modal_details', { y: 0, ease: Power4, opacity: 100, 'webkitFilter': 'blur(0px)', duration: .5})
                .to('#modal_button', { y: 0, ease:Power4, duration: .4, 'webkitFilter': 'blur(0px)', opacity: 1, stagger: .4}, '<.3')
            }, confirmModalRef)

            return ()=> cxt.revert();
        }, [showConfirmModal])

        const listViewport =  windowWidth < 920 ? 'w-[90%]' : windowWidth < 1024 ? 'w-[80%]' : 'w-[60%]';

        return (
            
            <>
             {/* backdrop filters only work when background is set to transparent */}
            <div 
            ref={confirmModalRef}
            className={` ${ showConfirmModal ? 'visible opacity-100' : 'opacity-0 invisible'} flex justify-center items-center transition duration-150 z-[200] fixed inset-0 bg-transparent backdrop-blur-[2px]`}> 
                <div
                id='modal_box' 
                className={` ${listViewport} overflow-hidden scale-50 h-[310px] bg-white shadow-md flex items-center flex-col`}>
                    <div 
                    id='modal_head'
                    className={`w-[100%] translate-y-[-100%] text-white h-[50px] flex z-10 items-center justify-start px-2 py-2 capitalize ${ sectionId == 1 ? 'bg-gray-600' : sectionId == 2 ? 'bg-yellow-600' : 'bg-green-700' }`}>
                        are you sure you want to remove this task?
                    </div>
                    <div 
                    id='modal_details'
                    className='flex flex-col px-2 py-3 justify-start translate-y-[-80%] z-[8] opacity-0 blur-sm bg-gray-200 w-[90%] h-[170px] mx-3 my-3'>
                        <div className='line-clamp-1 font-bold uppercase'>{eachCard.noteTitle}</div>
                        <div className=' line-clamp-5'>{eachCard.details}</div>
                    </div>
                    <button
                    id='modal_button'
                    className='w-[90%] bg-gray-200 mb-1 hover:shadow-md translate-y-[80%] opacity-0 blur-sm hover:font-semibold transition duration-150 hover:bg-gray-300 flex items-center justify-center'
                    onClick={()=>handleDeleteNote(sectionId, cardId)}
                    >Yes</button>
                    <button
                    id='modal_button'
                    className='w-[90%] bg-gray-200 hover:bg-gray-300 hover:shadow-md translate-y-[100%] opacity-0 blur-sm hover:font-semibold duration-150 flex items-center justify-center'
                    onClick={()=> setShowConfirmModal(false)}
                    >No</button>
                </div>
            </div>
            </>
        )
    }

    const handleDragStop = (e)=>{
        console.log('Onstop event on draggable is running!!!');
    }

    function moveCard(sectionId, cardId){
        console.log('movecard function');
        const updatedCards = noteState.map( (eachSection, index) => {
            const getSectionIndex = noteState.findIndex( eachSection => ((eachSection.id).toString() === (sectionId).toString()));
            console.log(getSectionIndex);
            let sectionCards = eachSection.cards;
            if(getSectionIndex == index){
                //find card Index from id
                let cardIndex = sectionCards.findIndex( card => ( (card.id).toString() === (cardId).toString()));

                //remove card from its origin array
                const [ movedCard ] = sectionCards.splice( cardIndex, 1);

                //form the next sectionIndex
                const nextSection = getSectionIndex + 1 ;

                //modify the next section cards array
                noteState[nextSection].cards.push(movedCard);
            }
            //return the sectioncards
            return {...eachSection, cards: sectionCards};
        });
        console.log(updatedCards);
        setNoteState(updatedCards)
    }
    

  return (
    <>
        { showModal && <NotesModals {...{sectionId, cardId: id, cards}} />}
        <ConfirmDelete {...{sectionId, cardId: id}}/>
            <div className=' flex cursor-pointer border-gray-600 border-2 justify-start font-Poppins my-2 flex-col'>
                <div className= {`${sectionId == 1 ? 'bg-gray-600 text-white' : sectionId == 2 ? 'bg-yellow-600 text-white' : 'bg-green-700 text-white'} px-2 grid h-[40px] card-header-grid overflow-hidden group`}>
                    <h4 className='font-medium h-[100%] items-center flex'>
                        {noteTitle.length ?
                        noteTitle.length > 25 ? `${noteTitle.slice(0, 25)}...`  :  noteTitle
                        :<div className='text-gray-800'>No Title</div>}</h4>
                    <div className='flex gap-2 h-[100%] z-40 items-center'>
                        <button
                        onClick={()=>{
                            setShowModal(true),
                            setModalData(eachCard)
                        }}>
                            <FaPencil className='translate-y-8 opacity-75 hover:opacity-100 group-hover:translate-y-0 duration-200'/>
                        </button>
                        { sectionId != 3 && <button
                        onClick={()=>moveCard(sectionId, id)}
                        >
                            <FaCheck className=' translate-y-8 opacity-75 hover:opacity-100 group-hover:translate-y-0 duration-200 delay-150'/>
                        </button>}
                        <button
                        onClick={()=> setShowConfirmModal(true)}
                        >
                            <FaXmark className='opacity-75 hover:opacity-100 hover:scale-110 transition duration-150'/>
                        </button>
                    </div>
                </div>
                <div className=' text-sm px-2 line-clamp-2 font-light my-2'>{
                        details.length ? details : "No Text..."
                    }
                </div>
            </div>
    </>

  )
}

export default EachCards