import { createContext, useState, useRef  } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider =(props)=>{

    const [input,setinput] = useState("");

    const [recentPrompt,setRecentPromp]= useState("");

    const [previousPrompt,setPreviousPrompt] = useState([]);

    const [showResult,setShowResult] = useState(false);

    const [loading,setloading] = useState(false);

    const [resultData,setResultData] = useState("");

    const [text, setText] = useState(''); // State to store the textarea value

    const [voices, setVoices] = useState([]); // State to store available voices

    const [selectedVoice, setSelectedVoice] = useState(null); // Selected voice

    const resultRef = useRef(null); // Ref for accessing the rendered HTML container

    const [isSpeaking, setIsSpeaking] = useState(true);

    const [isMuted, setIsMuted] = useState(true);


    


    const delayPara =(index,nextWord) =>{

             setTimeout(function (){
               setResultData(prev => prev+nextWord);
             },75*index)
    }

    const newChat =() =>{
        setloading(false)
        setShowResult(false)
    }

   
    const onSent = async (prompt) =>{

        setResultData("")
        setloading(true)
        setShowResult(true)
        setRecentPromp(input)
         
       
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPromp(prompt)
        } else {
            setPreviousPrompt(prev=>[...prev,input])
            setRecentPromp(input)
            response = await run(input)
        }
        
       let responseArray = response.split("**")
2
       let newResponse ="";

       for(let i=0; i<responseArray.length; i++)
       {
           if(i===0 || i%2 !== 1 ){
              newResponse += responseArray[i];
           } else{
            newResponse += "<b>"+responseArray[i]+ "</b>";
           }
       }

          let newResponse2 = newResponse.split("*").join("</br>")

   

    

      let newResponseArray = newResponse2.split(" ");

      for(let i=0; i<newResponseArray.length;i++){
           const nextWord = newResponseArray[i];
           delayPara(i ,nextWord+" ")

      }

       setloading(false)
       setinput("")
    }

 


    const contextValue ={

        previousPrompt,
        setPreviousPrompt,
        setRecentPromp,
        resultData,
        loading,
        showResult,
        recentPrompt,
        input,
        onSent,
        setinput,
        newChat,
        resultRef,
        text,
        setText,
        voices, 
        setVoices,
        selectedVoice,
         setSelectedVoice,
         isSpeaking,
         setIsSpeaking,
         isMuted, 
         setIsMuted,


    }

    return(
        <Context.Provider value ={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider