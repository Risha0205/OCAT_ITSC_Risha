const { Users } = require(`../Database`);
const { Password } = require(`../../utils`);

exports.login = (login) => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {

      let user = await new Users().where({username: login.username}).fetch().catch(function (e) {
        console.log('error in retrieving supervisor information')
        resolve(createBadAttemptUser());
      });

      //no user with that username
      if(!user) resolve(createBadAttemptUser());
      const supervisor = user.toJSON();

      await validatePassword(login.password, supervisor,onPasswordsCompare.bind(this, supervisor));
      
      function onPasswordsCompare(user, isSame){
        if(!isSame ) resolve(createBadAttemptUser());
        user.isLoggedIn = true;
        resolve (user);
        console.log('isSame--->',isSame)
        console.log('user--->',user)
        console.log('user.isLoggedIn--->',user.isLoggedIn)
      }

    } catch (err) {
      reject();
    }
  });


  async function validatePassword(password, supervisor, callBack){
    await Password.comparePassword(password.trim(),supervisor.password, callBack);
  }

  function createBadAttemptUser(){
    user ={};
    user.isLoggedIn = false;
    user.is_supervisor = false;
    user.username = '';
    return user;
  }

};

exports.signUp = (login) => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {

      const isUserNew = await isUserNameNew(login.username);
      if(isUserNew){
        let user = await createUser(login);
        const newUser = await new Users(user).save().catch(function (e) {
          resolve(newUser);
        });
      
        resolve('true');
    }

    resolve('false');

    } catch (err) {
      reject();
    }
  });

  async function createUser(login){
    let password = await getEncryptedPassword(login.password);
      let user = { 
        'first_name': '',
        'last_name':'',
        'username': login.username,
        'password': password,
        'is_supervisor': login.isSupervisor,
      }
      return user
  }

  async function getEncryptedPassword(password){
    let encryptedPassword = await Password.getEncryptedPassword(password);
    return encryptedPassword;
  }

  async function isUserNameNew(username){
    let user = await new Users().where({username: username}).fetch().catch(function (e) {
      console.log('error in retrieving user information',e)
      resolve();
    });
    return user?  false: true;
  }
};