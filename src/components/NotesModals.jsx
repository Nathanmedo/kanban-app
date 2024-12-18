import React, { useState } from 'react'
import { FaCheck, FaXing, FaXmark } from 'react-icons/fa6';
import { useAppContext } from '../AppContext';

function NotesModals({ sectionId, cards }) {
    console.log(sectionId);
    const{ modalData,
        noteState,
        setModalData,
        setNoteState,
        showModal, 
        setShowModal,
        todoState,
        setTodoState,
        inprogressState,
        completedState}= useAppContext();

    console.log(modalData, showModal);

    function checkForCard(){
        if(modalData){
            let findNote = cards.find( eachCard => ((eachCard.id).toString() === (modalData.id).toString()) );
            return findNote
        }else{
            //! creating a new id (managing)
            
            const id = Date.now()
            return {id, noteTitle: '', details: ''};
        }
    }

    const [  currentNoteModal, setCurrentNoteModal ] = useState(
        checkForCard
    )
    console.log(currentNoteModal);
    if(!currentNoteModal){
        return <div>Loading...</div>
    }
    console.log(currentNoteModal);
    
    const [noteData, setNoteData ] = useState({
        ...currentNoteModal,
        noteTitle: currentNoteModal.noteTitle,
        details: currentNoteModal.details
    })

    function updateCards(sectionId, cardId, noteData){
        console.log(sectionId, cardId);
        const updatedCards = noteState.map( eachSection => (
            (eachSection.id).toString() == (sectionId).toString() ?
            {
                ...eachSection, 
                cards: eachSection.cards.map( eachCard => (
                    (eachCard.id).toString() === (cardId).toString() ?
                    {
                        ...eachCard,
                        noteTitle: noteData.noteTitle,
                        details: noteData.details
                    }: eachCard
                ))
            } : eachSection
        ));
        console.log(updatedCards);
        return updatedCards;
    }

    function addCards(sectionId, noteData){
        console.log('running the add object func ');

        const updatedArray = noteState.map( eachSection => (
            (eachSection.id).toString() === (sectionId).toString() ? {
                ...eachSection,
                
                //if the card already exists, update it, otherwise add the new card
                cards: eachSection.cards.some(card => (card.id).toString() === (noteData.id).toString()) ? 
                eachSection.cards.map(eachCard => (
                    (eachCard.id).toString() === (noteData.id).toString() 
                        ? { ...eachCard, ...noteData } 
                        : eachCard
                )) 
                : [...eachSection.cards, noteData] // Add the new card if it doesn't exist
        } : eachSection
        ))
        console.log('Updated Note State:', updatedArray);
        return updatedArray
    }

    function handleInputChange(sectionId, cardId, fieldName, newData){
        setNoteData(prevState => ({
            ...prevState,
            [fieldName]: newData
        }));

        const updatedCards = {
            ...noteData,
            [fieldName]: newData
        };
        if(noteData.noteTitle.trim() != '' || noteData.details.trim() != ''){

            //check if card exists.
            let findNote = noteState
            .find(eachSection => eachSection.id.toString() === sectionId.toString())
            ?.cards.find(eachCard => eachCard.id.toString() === currentNoteModal.id.toString());
            console.log(findNote);

            if(findNote){
                const refreshState = updateCards(sectionId, cardId, updatedCards);
                setNoteState(refreshState);
            }
            if(!findNote){
                
                const refreshedCards = addCards(1, updatedCards);
                setNoteState(refreshedCards);

            }
        }
    }



  return (
    <>
        <div className=' fixed z-50 inset-0'>
            <div className='grid grid-col-1 relative h-[100%] justify-items-center font-Poppins bg-red-100'>
                <button className='absolute rounded font-semibold text-[20px] right-8 top-5 px-3 text-gray-800 h-[30px] flex items-center justify-center gap-4'>
                    <FaCheck />
                </button>
                <button 
                onClick={()=>setShowModal(false)}
                className='absolute font-semibold left-8 top-5 px-3 text-[20px] text-gray-800 h-[30px] flex items-center justify-center'>
                    <FaXmark />
                </button>
                <form autoFocus={showModal ?? true} className='w-[80%] mt-6'>
                    <textarea type="text"
                    value={noteData.noteTitle}
                    cols={5}
                    onChange={(e)=>{
                        const newTitle = e.target.value;
                        handleInputChange(sectionId, currentNoteModal.id, 'noteTitle', newTitle);
                        console.log(newTitle);
                    }}
                    autoCapitalize='true'
                    maxLength={100}
                    className=' outline-none w-[100%] py-4 font-bold text-3xl bg-inherit my-6 '
                    placeholder='Title'/>
                    <hr className='w-full h-[3px] bg-gray-800'/>
                    <textarea
                    value={noteData.details}
                    onChange={(e)=>{
                        const newDetails = e.target.value;
                        handleInputChange(sectionId, currentNoteModal.id, 'details', newDetails)
                    }}
                    placeholder='Write out your Goals...'
                    className='w-full my-3 h-full text-md bg-inherit outline-none'>
                    </textarea>
                </form>
            </div>
        </div>
    </>
  )
}

export default NotesModals;