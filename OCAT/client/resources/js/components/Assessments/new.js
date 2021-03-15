import React, { useState } from 'react';
import { AssessmentService } from '../shared/services/assessment.service';
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
export function AssessmentNew() {

  //create a form that utilizes the "onSubmit" function to send data to OCAT/client/libs and onto the OCAT/server/routes express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };
  const { register, handleSubmit } = useForm();
  const [date, setDate] = useState(new Date())
  // const spanStyles = {
  //   color: "green",
  // };
  const handleChange = date => setDate(date);

  return (
    <form style={{ backgroundColor: 'transparent', height: 200, flexdirection: 'column' }}>

    {/* <label style={spanStyles}>First Name</label>
    <input name='Risha' /> */}

    <div className="form-control">
      <label>Enter Instrument Name</label><br/>
      <input type="text" name="first_name" ref={register} />
    </div>

    <div className="form-control">
      <label>Enter Cat Name</label><br/>
      <input type="text" name="last_name" ref={register} />
    </div>

    <div className="form-control">
      <label>Cat Date of Birth</label>
      <DatePicker selected={date} onChange={handleChange} />
    </div>

    <div className="form-control">
      <label>Previous contact with the Cat Judicial System</label><br/>
      <input type="text" name="last_name" ref={register} />
    </div>


    <div className="form-control">
      <label>Physical altercations with other cats</label><br/>
      <input type="text" name="last_name" ref={register} />
    </div>

    <div className="form-control">
      <label>Physical altercations with owner (scratching, biting, etc...)</label><br/>
      <input type="text" name="last_name" ref={register} />
    </div>


    {/* <select name="gender" ref={register}>
      <option value="female">female</option>
      <option value="male">male</option>
      <option value="other">other</option>
    </select> */}
    <button type="submit"   onClick={() => onSubmit('j')}>Submit</button>
  
  </form>
  );
}