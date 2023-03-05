import { indexOf } from 'lodash';
import React from 'react';
// import Navbar from "../components/Navbar";
//QUERY - are critical actions classified separately from normal suggestions?
//how does dismissing suggestions work
const criticalActions=0;
const suggestiondata = [
  {
    suggestionid: '1',
    description: 'User3 is overworked'
  },
  {
    suggestionid: '2',
    description: 'Testing is behind schedule'
  },
  {
    suggestionid: '3',
    description: 'User4 does not have the necessary skillset'
  }
  
]

function RenderingSuggestions(){
    const allsuggestions=suggestiondata.map(
        (element)=>{
            return( 
              <div className="mainbody_container">
                <h3>{element.suggestionid}</h3>
                <p>{element.description}</p>
                <button> Dismiss suggestion</button>
              </div>               
            )
        }
    )
    return(
        <div>
                {allsuggestions}                 
        </div>
    )
  }

export const SuggestionsForm = () => {
  return (
    <>
    {/* <Navbar /> */}
    <div className='main_container'>
      <p className='sug-title'>Suggestions</p>
      <div className='menu_container'>
      <p> {suggestiondata.length} Suggestions, {criticalActions} Critical Actions</p>
      </div>
    <RenderingSuggestions />  
    </div>

    </>
  );
};
  
export default SuggestionsForm;
