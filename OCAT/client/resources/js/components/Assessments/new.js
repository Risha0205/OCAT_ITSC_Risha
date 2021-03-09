import React from 'react';
import { AssessmentService } from '../shared/services/assessment.service';
import { useForm } from "react-hook-form";
import './styles.css'
export function AssessmentNew() {

  //create a form that utilizes the "onSubmit" function to send data to OCAT/client/libs and onto the OCAT/server/routes express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };

  const { register, handleSubmit, errors } = useForm();
  const spanStyles = {
    color: "green",

  };

  return (
    <form style={{ backgroundColor: 'transparent', height: 200, flexdirection: 'column' }}>

      {/* <label style={spanStyles}>First Name</label>
      <input name='Risha' /> */}

      <div className="form-control">
        <label>First Name</label>
        <input type="text" name="first_name" ref={register} />
      </div>

      <div className="form-control">
        <label>Last Name</label>
        <input type="text" name="last_name" ref={register} />
      </div>


      <select name="gender" ref={register}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <button type="submit">Submit</button>

    </form>



  );
}

