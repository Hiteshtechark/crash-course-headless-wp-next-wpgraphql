import axios from 'axios';

export async function postData(data) {
    try {
        const response = await axios.post('https://techarkatlastg.wpengine.com/wp-json/contact-form-7/v1/contact-forms/123/feedback', data);
        return response.data;
    } catch (error) {
        // throw new Error(error.response?.data?.message || 'An error occurred');   
        console.log(error);
    }
}