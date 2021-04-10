const { Assessments } = require(`../Database`);
exports.submit = (assessment, value, riskLevel) => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {
      const date = new Date();
      const shortDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      let db_data = { 
        'cat_name': assessment.catName,
        'cat_date_of_birth':assessment.catDateOfBirth,
        'instrument': assessment.instrument,
        'score': assessment.score,
        'risk_level': assessment.riskLevel,
        'created_at': shortDate,
        'deleted_at': null
      }
      //inserting assessment data into the database
      let assesment = Assessments.forge(db_data).save(null, { method: 'insert' })
      resolve(assesment);

    } catch (err) {
      reject();
    }
  });
};

exports.retrieve = () => {
  return new Promise(async (resolve, reject) => { 
    try {
      let assesmentList = await new Assessments().where({deleted_at: null}).fetchAll().catch(function (e) {
        console.log('error in retrieving assessments')
        resolve(assesmentList.toJSON());
      });

      resolve(assesmentList.toJSON());

    } catch (err) {
      console.log('errrorrrr==>', err)
      reject();
    }
  });
};


exports.delete = (assessmentId) => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {
      const date = new Date();
      await new Assessments({'id':assessmentId}).fetch()
      .then(function (model) {
        if (model) {
          var params = { 'deleted_at': date }
           model.save(params, {
            method: 'update',
            patch: true
          });
        } 
      })
      .then(()=>{resolve()})
      .catch(function (err) {
          
          resolve();
      });

    } catch (err) {
      reject();
    }
  });
};
  