import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react';

const createContextApi = createContext();

function AppContext({children}) {

    const notesData = [
        {
            id: 1,
            title: 'To Do',
            cards: [
                {
                    noteTitle: 'Create Goals',
                    details: 'Write details about your goals!',
                }
            ]
        },
        {
            id: 2,
            title: 'In Progress',
            cards: [
                {
                    noteTitle: 'Your Goals in Progress',
                    details: 'Uncompleted tasks in progress!',
                }
            ]
        },
        {
            id: 3,
            title: 'Completed',
            cards: [
                {
                    noteTitle: 'Complete Your Goals',
                    details: 'This is the completed goals section!',
                }
            ]
        }
    ]

    //TODO: create a unique id for each objects in the cards array based off from the origin ID.
    notesData.map((eachdata) => {
        const goalProgressId = eachdata.id;
        const updatedCards = eachdata.cards.map((card, index) => ({...card, id: `${goalProgressId}_${index}`}))
    
        //?Updated cards array containing the id object property in each object
        eachdata.cards = updatedCards;
    });
    console.log(notesData);

    const [noteState, setNoteState ] = useState(JSON.parse(localStorage.getItem('noteData'))||notesData);
    const [todoState, setTodoState ] = useState(noteState[0].cards)
    const [inprogressState, setInprogressState ] = useState(noteState[1].cards)
    const [completedState, setCompletedState ] = useState(noteState[2].cards)

    useEffect(()=>{
        function updateLocaleStorage(){
            localStorage.setItem('noteData', JSON.stringify(noteState))
        }
        updateLocaleStorage();
    }, [noteState])


    

    const [ showModal, setShowModal ]= useState(false);
    const [ modalData, setModalData ]= useState({});



    console.log(todoState, inprogressState, completedState);
    
  return (
    <createContextApi.Provider
    value={{
        noteState, 
        setNoteState,
        modalData, 
        setModalData,
        showModal, 
        setShowModal,
        todoState,
        setTodoState,
        inprogressState,
        setInprogressState,
        setCompletedState,
        completedState
    }}>
        {children}
    </createContextApi.Provider>
  )
}

export const useAppContext = () => useContext(createContextApi);
export default AppContext;