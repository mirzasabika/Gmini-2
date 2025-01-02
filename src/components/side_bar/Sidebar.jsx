import React, { useContext, useState } from 'react'
import './Sidebar.css'

import { Assest } from '../../assets/Assest'
import { Context } from '../../context/context';

function Sidebar() {

    const [extended,setExtended]= useState(false) ;
    const {onSent,previousPrompt,setRecentPromp,newChat} = useContext(Context);

    const loadPrompt = async(prompt) =>{
      setRecentPromp(prompt)
     await onSent(prompt)
    }
    const clickFunction = ()=> setExtended(pev=>!pev);


  return (
    <div className='sidebar'>

      <div className="top">
       <img onClick={clickFunction} 
       src={Assest.menu} alt="" className="menu" />
       <div onClick={()=>newChat()} className="chat">
        <img src={Assest.plus} alt="" />
        {extended? <p>new chat</p>:null}
       </div>
      
       {extended?

      <div className="recent">

      <p className="recent_title">Recent</p>
         
         {previousPrompt.map((item,index)=>{

          return (

            <div onClick={(()=>loadPrompt(item))} className="recent-entry">
            <img src={Assest.message} alt="" />
            <p> {item.slice(0,18)}.. </p>
          </div>

          )

         })}
      
    </div> : null
      
      }
      </div>

     <div className="bottom">

      <div className="bottom_item recent-entry">
        <img src={Assest.help} alt="" />
       {extended? <p>help</p>:null}
      </div>

      <div className="bottom_item recent-entry">
        <img src={Assest.restore} alt="" />
        {extended?<p>activity</p>:null}
      </div>

      <div className="bottom_item recent-entry">
        <img src={Assest.setting} alt="" />
       {extended? <p>settings</p>:null}
      </div>
     </div>

    </div>
  )
}

export default Sidebar