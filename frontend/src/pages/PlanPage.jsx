import { React, useState, useEffect } from "react";
import "./PlanPage.scss";
import { useForm } from "react-hook-form";
import { LESSON_CONTEXT, summarizeLessonPlan } from "../helpers/GPTEndpoints";

import { useNavigate } from "react-router-dom";

export const PlanPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		console.log(data);

		let lessonSummary = "";

		if (data.lessonPlan) {
			const lessonJSON = await summarizeLessonPlan(data.lessonPlan);
			const lessonObject = JSON.parse(lessonJSON);
			lessonSummary = lessonObject.summary;
		}

		const audienceSentence = `Speech intended audience: ${data.audience}.`;
		const summaryText = `The context for the speech: ${lessonSummary}.`;

		let contextText = "";

		if (data.audience) {
			contextText += audienceSentence + "\n";
		}

		if (lessonSummary) {
			contextText += summaryText + "\n";
		}

		LESSON_CONTEXT.text = contextText;
		navigate("/live");
	};

	return (
		<div className="mainContainer">
			<div className="leftContainer">
				<form className="startForm" onSubmit={handleSubmit(onSubmit)}>
					<div className="formContainer">
						<div className="bigTitle">Before You Start...</div>
						<div className="subTitle">Who are you talking to?</div>
						<input
							type="text"
							className="audienceField"
							placeholder="College Students, 3rd graders..."
							required
							{...register("audience")}
						></input>
						<div className="subTitle">
							What kind of feedback would you like to receive?
						</div>
						<div className="checkboxContainer">
							<div className="checkboxRow">
								<input
									type="checkbox"
									className="checkboxOption"
									value="Real-Time Correction"
									id="input1"
									{...register("enableCorrection")}
								/>
								<label htmlFor="input1" className="label1">
									Real-Time Correction
								</label>
							</div>
							<div className="checkboxRow">
								<input
									type="checkbox"
									className="checkboxOption"
									value="Real-Time Suggestions"
									id="input2"
									{...register("enableSuggestions")}
								/>
								<label htmlFor="input2" className="label2">
									Real-Time Suggestions
								</label>
							</div>
							<div className="checkboxRow">
								<input
									type="checkbox"
									className="checkboxOption"
									value="End of Lecture Feedback"
									id="input3"
									{...register("enableRecap")}
								/>
								<label htmlFor="input3" className="label3">
									End of Lecture Feedback
								</label>
							</div>
						</div>
						<div className="buttonContainer">
							<button className="start">Start</button>
						</div>
					</div>
				</form>
			</div>
			<div className="rightContainer">
				<div className="mediumTitle">Add your Lesson Plan</div>
				<textarea
					{...register("lessonPlan")}
					className="lessonPlanBox"
					placeholder="Paste your lesson plan here..."
				/>
			</div>
		</div>
	);
};
