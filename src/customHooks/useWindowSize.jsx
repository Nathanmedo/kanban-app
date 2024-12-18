import React, { useEffect, useState } from 'react'

function useWindowSize() {
    const [ windowHeight, setWindowHeight ] = useState(window.innerHeight)
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);


    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            setWindowHeight(windowHeight);
            setWindowWidth(windowWidth);
        });
    }, [])
  return {
    windowHeight,
    windowWidth
  }
}

export default useWindowSize