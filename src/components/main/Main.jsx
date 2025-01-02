import React, { useContext,useEffect} from 'react'
import'./Main.css'
import { Assest } from '../../assets/Assest'
import { Context } from '../../context/context'


const Main =()=> {

const {resultData,loading, showResult,recentPrompt, input, onSent,setinput,setText,text, resultRef,isSpeaking,isMuted,  setIsMuted } = useContext(Context)


// *******************************speaker logic*******************************
function toggleSound()  {
  setIsMuted((prevState) => !prevState); // Toggle between true and false
};

  showResult ?

   // Effect to update text when resultData changes
   useEffect(() => {
    if (resultData) {
      setText(resultData); // Update text when resultData changes
    }
  }, [resultData]) :  window.speechSynthesis.cancel(); 


  const cancelSpeak = () =>{
    if(isSpeaking){
   window.speechSynthesis.cancel()
   }

  toggleSound ();
  setIsMuted(!isMuted)

  }


  // Function to handle speech synthesis
  const handleSpeak = () => {
    if (text.trim() !== '') {
       // Clean the text by removing HTML tags
       const cleanText = stripHtmlTags(text);

      const speech = new SpeechSynthesisUtterance();
      speech.text = cleanText// Set the text from the state
      window.speechSynthesis.speak(speech); // Speak the text
    }
   
    toggleSound();
    setIsMuted(!isMuted)

  };

  const stripHtmlTags = (htmlText) => {
    // Create a temporary div to use the browser's HTML parser
    const div = document.createElement('div');
    div.innerHTML = htmlText; // Insert the HTML into the div
    return div.textContent || div.innerText || ''; // Return plain text (stripped of HTML)
  };


  return (
    <div className="main">

        <div className="nav">
            <p>Gemini</p>
            <img src={Assest.user_img} alt="" />
        </div>

        <div className="main_container">

          {!showResult ?<>
          
            <div className="greet">
            <p><span>hello dev</span></p>
            <p>how can i help you today?</p>
          </div>

          <div className="cards">

            
          <div className="card" onClick={() => handleCardClick('road_trip')}>
            <p>suggest beautiful places to see on an upcoming road trip</p>
            <img src={Assest.compass} alt="" />
          </div>

          <div className="card"  onClick={() => handleCardClick('urban_planning')}>
            <p>briefly summarize this concept: urban planning</p>
            <img src={Assest.blub} alt="" />
          </div>

          <div className="card" onClick={() => handleCardClick('team_bonding')}>
            <p>brianstorm team bonding activities for our work retreat </p>
            <img  className="message"src={Assest.message} alt="" />
          </div>


          <div className="card" onClick={() => handleCardClick('code_improvement')}>
            <p>improve the readability of the following code</p>
            <img src={Assest.code} alt="" />
          </div>
          </div>
          </> 
          :<div className="result">

            <div className="result_title">
               <div className="title_data">
               <img src={Assest.user_img} alt="" />
               <p><b>{recentPrompt} </b></p>
               </div>
             
              {!loading? <div> 
                {isMuted?
                  <img className="img2"  onClick={handleSpeak} src={Assest.mute} alt="" />
                 
                :<img className="img1" onClick={cancelSpeak} src={Assest.sound} alt="" />
               
                } 
              
               
               </div>:null}
            </div>
            <div className="result_data">
              <img src={Assest.Gemini_icon} alt="" />
              { loading ? 
               <div className="loader">
                <hr />
                <hr />
                <hr />

               </div> 
               :  <p  dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
              
            </div>
            
          </div>
          }
         
          

          

          <div className="main_bottom">
            <div className="search_box">
              <input onChange={(e)=>setinput(e.target.value)}  type="text"  placeholder='Enter the prompt here'/>

              <div className='images'>
                <img src={Assest.gallery} alt="" />
                <div className="mics">
                <img src={Assest.mic} alt="" />
                {/* <img src={Assest.mutemic} alt="" /> */}
                </div>
                {input?<img onClick={()=>onSent()} src={Assest.send} alt="" />:null}
              </div>
              
              </div>
              <p className="bottom_info">gemini may display inaccurate info, including about people, so double-check its responses.your privacy and gemini apps </p>
          </div>

        </div>
    </div>
  )
}

export default Main