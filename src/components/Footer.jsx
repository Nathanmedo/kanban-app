import React from 'react'

function Footer() {

  let scrollValue = 0;
  addEventListener('scroll', ()=>{
    console.log('scrolling');
    
  })

  addEventListener('scrollend', ()=>{
    setTimeout(()=>{
      console.log('scroll ended');
    }, 1000)
    
  })
  return (
    <div className=''>Created by Nathan_medo Devs </div>
  )
}

export default Footer