import React from 'react';
import { AssessmentService } from '../shared/services/assessment.service';
import { useForm } from "react-hook-form";

export function AssessmentNew() {

  //create a form that utilizes the "onSubmit" function to send data to OCAT/client/libs and onto the OCAT/server/routes express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };
  const { register, handleSubmit } = useForm();

  return (
    <form >

      <label style={{ color: 'red' }}>First Name</label>
      <input name='Risha' />

      <label style={{ color: 'red' }}>Last Name</label>
      <input name='Risha' />


      <select name="gender" ref={register}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <button type="submit">Submit</button>

    </form>
  );
}