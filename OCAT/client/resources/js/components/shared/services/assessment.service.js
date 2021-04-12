import axios from "axios";

export class AssessmentService {
    static async submit (assessment) {
        try {
            await axios.post('http://localhost:4567/api/assessment/submit', assessment).then(response => {
                if(response.data.isAssessmentCreated === 'true'){
                    alert(`Assessment was created.`);
                    window.location.reload();
                }
                else{
                    alert('Please log in.');
                    window.location.replace("http://localhost:4567/login");
                }
              })
        }
        catch (err) {
            throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
    }

    static async retrieveAll() {
        try {
            const assessments = await axios.get('http://localhost:4567/api/assessment/retrieve');
            return assessments;
        }
        catch (err) {
            throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
    }

    static async deleteAssessment(id) {
        try {
            await axios.post('http://localhost:4567/api/assessment/delete',{
                assessmentId: id
              });
            
        }
        catch (err) {
            throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
    }
}