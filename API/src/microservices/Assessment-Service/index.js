const { Assessments } = require(`../Database`);
exports.submit = (assessment, value, riskLevel) => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {
      const date = new Date();

      let db = {
        'id': 1,
        'cat_name': assessment.Firstname,
        'cat_date_of_birth':new Date(2021, 11, 17),
        'instrument': 'instrument',
        'score': 0,
        'risk_level': 'medium',
        'created_at': new Date(2021, 11, 17),
        'deleted_at': null
      }
      //inserting assessment data into the database
      let assesment = Assessments.forge(db).save(null, { method: 'insert' })
      resolve(assesment);

    } catch (err) {
      reject();
    }
  });
};