import React from 'react';
import { useForm } from "react-hook-form";
import { AssessmentService } from '../shared/services/assessment.service';

export function AssessmentNew(){
  const createAssessmentObject = (data)=>{
    const assessment ={
      instrument: 'Cat Behavioral Instrument', 
      catName : data.catName,
      catDateOfBirth : data.catDateOfBirth,
    }
    assessment.score = calculateScore(data)
    assessment.riskLevel = calculateRiskLevel(assessment.score)
    return assessment;
  }

  const calculateScore = (data)=>{
    let score = 0;
    score += +data.response1;
    score += +data.response2;
    score += +data.response3;
    score += +data.response4;
    score += +data.response5;
    return score;
  }

  const calculateRiskLevel = (score)=>{
    let riskLevel = 'low';
    if(score > 1) riskLevel = 'medium';
    if(score > 3) riskLevel = 'high';

    return riskLevel;
  }

  const { register, handleSubmit, errors } = useForm({shouldFocusError: true});  

  const onSubmit = async (data) => {
    const assessment = createAssessmentObject(data);
    await AssessmentService.submit(assessment);
  };

  return (
  
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 col-md-8">

          <form onSubmit={handleSubmit(onSubmit)}>
      
            <div className="form-row align-items-center mb-1">
              <div className="col-auto mr-2">
                <h5>Cat Name</h5>
                <input className="form-control form-control-sm" type="text" name="catName" id="catName-id" autoFocus ref={register({required: true, maxLength: 80})} />
              </div>
              <div className="col-auto mr-2">
                <h5>Cat Date of Birth</h5>
                <input className="form-control form-control-sm" type="date"  name="catDateOfBirth" id="catDateOfBirth-id" ref={register({ required: true })} />
              </div>
              <div className="col-auto">
                <h5>Instrument</h5>
                <input type="text" name="instrument" value="Cat Behavioral Instrument" disabled readOnly="readOnly" ref={register()}/>
              </div>
            </div>
            <div className="form-row align-items-center mb-3">
              <div className="col-auto">
              {errors.catName, errors.catDateOfBirth  && <p>Required</p>}
              </div>
            </div>


            <div className="form-row align-items-center mb-3">
              <div className="col-auto">
                <h5 className="text-decoration-underline">1. Previous contact with the Cat Judicial System:</h5>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="response1-no" name="response1" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="response1-no">No</label>
                  <br/>
                  <input className="form-check-input" type="radio" id="response1-yes" name="response1" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="response1-yes">Yes</label>
                </div>
              {errors.response1 && <p>Required</p>}
              </div>
            </div>

            <div className="form-row align-items-center mb-3">
              <div className="col-auto">
                <h5 className="text-decoration-underline">2. Physical altercations with other cats:</h5>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="response2-0" name="response2" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="response2-0">0-3 altercations</label>
                  <br/>
                  <input className="form-check-input" type="radio" id="response2-3" name="response2" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="response2-3">3+ altercations</label>
                </div>
              {errors.response2 && <p>Required</p>}
              </div>
            </div>

            <div className="form-row align-items-center mb-3">
              <div className="col-auto">
                <h5 className="text-decoration-underline">3. Physical altercations with owner (scratching, biting, etc...):</h5>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="response3-10" name="response3" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="response3-10">10+ altercations</label>       
                  <br/>
                  <input className="form-check-input" type="radio" id="response3-0" name="response3" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="response3-0">0-10 altercations </label>
                </div>
              {errors.response3 && <p>Required</p>}
              </div>
            </div>

            <div className="form-row align-items-center mb-3">
              <div className="col-auto">
                <h5 className="text-decoration-underline">4. Plays well with dogs:</h5>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="response4-no" name="response4" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label mr-30" htmlFor="response4-no">No</label>
                  <br/>
                  <input className="form-check-input" type="radio" id="response4-yes" name="response4" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="response4-yes">Yes</label>
                </div>
              {errors.response4 && <p>Required</p>}
              </div>
            </div>

            <div className="form-row align-items-center mb-2">
              <div className="col-auto">
                <h5 className="text-decoration-underline">5. Hisses at strangers:</h5>
                <div className="form-check">
                  <input className="form-check-input" type="radio" id="response5-yes" name="response5" value="1" ref={register({ required: true })}/>
                  <label className="form-check-label mr-30" htmlFor="response5-yes">Yes</label>
                  <br/>
                  <input className="form-check-input" type="radio" id="response5-no" name="response5" value="0" ref={register({ required: true })}/>
                  <label className="form-check-label" htmlFor="response5-No">No</label>
                </div>
                {errors.response5 && <p>Required</p>}
              </div>
            </div>

            <div className="form-row mb-2">
                <input type="submit"/>      
            </div>

          </form>

        </div>
      </div>
    </div>

  );
}