import React, { useState} from 'react';
import { useForm } from "react-hook-form";
import { LoginService } from '../shared/services/login.service';

export function LoginForm(){

  const [signInDisplayed, setSignInDisplayed] = useState(true);
  // const [isSupervisor, setIsSupervisor] = useState(false);

  const createLoginObject = (data)=>{
    const login ={
      username: data.username, 
      password : data.password,
    }
    return login;
  }

  const createSignUpObject = (userType)=>{
    const username = document.querySelector(".username");
    const password = document.querySelector(".password");

    const signUp = {
      username: username.value, 
      password : password.value,
      isSupervisor : userType == 'supervisor'? true: false,
    }

    return signUp;
  }

  const changeFormDisplayed = ()=>{
    setSignInDisplayed(!signInDisplayed);
  }

  const submitSignUpForm = async (userType) => {
    const signUp = createSignUpObject(userType);
    await LoginService.signUp(signUp);
  }

  const { register, handleSubmit, errors } = useForm({shouldFocusError: true});  

  const onSubmit = async (data,event) => {
    const login = createLoginObject(data);
    await LoginService.login(login);
  };

  const signInForm = <div className="container">
  <div className="row justify-content-md-center">
    <div className="col-12 col-md-8">

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row mb-1">
          <div className="col-auto">
            <h5>Username</h5>
            <input className="form-control form-control-sm" type="text" name="username" autoFocus ref={register({required: true, maxLength: 50})} />
          </div>
        </div>
        <div className="form-row mb-4">
            <div className="col-auto">
                {errors.username && <p>Required</p>}
          </div>
        </div>

        <div className="form-row mb-1">
          <div className="col-auto">
            <h5>Password</h5>
            <input className="form-control form-control-sm" type="password"  name="password" ref={register({ required: true})} />
          </div>
        </div>
        <div className="form-row mb-4">
            <div className="col-auto">
                {errors.password && <p>Required</p>}
            </div>
        </div>

        <div className="form-row">
            <div className="col-auto">
                <input className="btn btn-primary" type="submit" value="Sign In"/>      
            </div>
        </div>
      </form>
      <button onClick={changeFormDisplayed} style={{textDecoration:'undErline',color:'blue', backgroundColor:'white', borderWidth:'0px'}}>sign up</button>

    </div>
  </div>
</div>

 const signUpForm = <div className="container">
 <div className="row justify-content-md-center">
   <div className="col-12 col-md-8">

     <form className ="sign-up-form">
       <div className="form-row mb-1">
         <div className="col-auto">
           <h5>Username</h5>
           <input className="form-control form-control-sm username" type="text" name="username" autoFocus ref={register({required: true, maxLength: 50})} />
         </div>
       </div>
       <div className="form-row mb-4">
           <div className="col-auto">
               {errors.username && <p>Required</p>}
         </div>
       </div>

       <div className="form-row mb-1">
         <div className="col-auto">
           <h5>Password</h5>
           <input className="form-control form-control-sm password" type="password"  name="password" ref={register({ required: true})} />
         </div>
       </div>
       <div className="form-row mb-4">
           <div className="col-auto">
               {errors.password && <p>Required</p>}
           </div>
       </div>

       <div className="form-row">
           <div className="col-auto">
           <div onClick={submitSignUpForm.bind(this,"user")} className="btn btn-primary">User Sign Up</div>    
           <div onClick={submitSignUpForm.bind(this,"supervisor")} className="btn btn-secondary" style={{marginLeft:'3rem'}}>Supervisor Sign Up</div>     
           </div>
       </div>
     </form>
     <button onClick={changeFormDisplayed} style={{textDecoration:'underline',color:'blue', backgroundColor:'white', borderWidth:'0px'}}>sign in</button>

   </div>
 </div>

</div>

  return (
  <>
    {signInDisplayed?
      signInForm
    :signUpForm}
  </>
  );
}