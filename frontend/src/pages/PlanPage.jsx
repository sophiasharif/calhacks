import {React, useState, useEffect} from 'react';
import "./PlanPage.scss";

export const PlanPage = () => {
    return (
        <div className = "mainContainer">
            <div className = "leftContainer">
                <form className = "startForm">
                    <div className = "formContainer">
                        <div className = "bigTitle">Before You Start...</div>
                        <div className = "subTitle">Who are you talking to?</div>
                        <input type="text" className = "audienceField" placeholder = "College Students, 3rd graders..." required></input>
                        <div className = "subTitle">What kind of feedback would you like to receive?</div>
                        <div className = "checkboxContainer">
                            <div className='checkboxRow'>
                                <input type = "checkbox" className = "checkboxOption" value = "Real-Time Correction" id = "input1"/>
                                <label for = "input1" className = "label1">Real-Time Correction</label>
                            </div>
                            <div className = 'checkboxRow'>
                                <input type = "checkbox" className = "checkboxOption" value = "Real-Time Suggestions" id = "input2"/>
                                <label for = "input2" className = "label2">Real-Time Suggestions</label>
                            </div>
                            <div className = 'checkboxRow'>
                                <input type = "checkbox" className = "checkboxOption" value = "End of Lecture Feedback" id = "input3"/>
                                <label for = "input3" className = "label3">End of Lecture Feedback</label>
                            </div>
                        </div>
                        <div className = "buttonContainer">
                            <button className = "start">Start</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className = "rightContainer">
                <div className = "mediumTitle">Add your Lesson Plan</div>
                <textarea className ="lessonPlanBox" placeholder = "Paste your lesson plan here..."/>
            </div>
        </div>
    )
}
