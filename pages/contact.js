import { useState } from 'react';
import { postData } from '../api/api';

export default function MyForm() {

    const [result, setResult] = useState('');

    const [formErrors, setFormErrors] = useState({
        'your-name': '',
        'your-email': '',
        'company-name': '',
        'your-phone': '',
        'about-techark': '',
        'techark-desc': '',
        'techark-help': '',
        "hobbies": ''
    });

    const [formData, setFormData] = useState({
        'your-name': '',
        'your-email': '',
        'company-name': '',
        'your-phone': '',
        'about-techark': '',
        'techark-desc': '',
        'techark-help': ''
    });

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        setSelectedCheckboxes((prevSelectedCheckboxes) => {
            if (checked) {
                // Add the checkbox value to the array
                return [...prevSelectedCheckboxes, value];
            } else {
                // Remove the checkbox value from the array
                return prevSelectedCheckboxes.filter((checkboxValue) => checkboxValue !== value);
            }
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.value) {
            setFormErrors((prevFormErrors) => ({
                ...prevFormErrors,
                [e.target.name]: ''
            }));

        } else {

            if (e.target.classList.contains('wpcf7-validates-as-required')) {
                setFormErrors((prevFormErrors) => ({
                    ...prevFormErrors,
                    [e.target.name]: 'Please fill out this field.'
                }));
            }
        }

    };

    const validateForm = (data) => {

        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [data['field']]: data['message']
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }

        const hobbies = "hobbies[]";
        for (const key in selectedCheckboxes) {
            formDataObj.append(hobbies, selectedCheckboxes[key]);
        }

        try {

            const response = await postData(formDataObj);
            setResult(response.message);

            for (const key in response.invalid_fields) {
                validateForm(response.invalid_fields[key]);
            }

        } catch (error) {
            setResult(error.message);

        }

    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="top-input">
                <div className="half-width">
                    <label className="title-form visuallyhidden" htmlFor="fullname">Full Name*</label>
                    <span className="wpcf7-form-control-wrap spriteimglazyload lazyloaded" data-name="fullname">
                        <input size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control"  id="fullname" placeholder="Full Name*" type="text" name="your-name" value={formData.name} onChange={handleChange} />
                    </span>
                    <p>{formErrors['your-name']}</p>
                </div>
                <div className="half-width">
                    <label className="title-form visuallyhidden" htmlFor="email">Email*</label>
                    <span className="wpcf7-form-control-wrap spriteimglazyload lazyloaded" data-name="email">
                        <input size="40" className="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email form-control"  id="email" placeholder="Email*" type="email" name="your-email" value={formData.name} onChange={handleChange} />
                    </span>
                    <p>{formErrors['your-email']}</p>
                </div>
                <div className="half-width">
                    <label className="title-form visuallyhidden" htmlFor="companyname">Company Name*</label>
                    <span className="wpcf7-form-control-wrap spriteimglazyload lazyloaded" data-name="companyname">
                        <input size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control" id="companyname"  placeholder="Company Name*" type="text" name="company-name" value={formData.name} onChange={handleChange} />
                    </span>
                    <p>{formErrors['company-name']}</p>
                </div>
                <div className="half-width">
                    <label className="title-form visuallyhidden" htmlFor="phone">Phone*</label>
                    <span className="wpcf7-form-control-wrap spriteimglazyload lazyloaded" data-name="phone">
                        <input size="40" className="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-required wpcf7-validatesvalidates-as-tel form-control"  id="phone" placeholder="Phone*" type="tel" name="your-phone" value={formData.name} onChange={handleChange} />
                    </span>
                    <p>{formErrors['your-phone']}</p>
                </div>
            </div>
            <div className="top-input">
                <div className="half-width">
                    <fieldset className="msg-left-title">
                        <legend>What are you looking to do?</legend>
                        <ul>
                            <li>
                                <input id="styled-checkbox-1" name="hobbies[]" type="checkbox" value="Website Design" onChange={handleCheckboxChange} />
                                <label htmlFor="styled-checkbox-1">Website Design</label>
                            </li>
                            <li>
                                <input id="styled-checkbox-2" name="hobbies[]" type="checkbox" value="App Development" onChange={handleCheckboxChange} />
                                <label htmlFor="styled-checkbox-2">App Development</label>
                            </li>
                            <li>
                                <input id="styled-checkbox-3" name="hobbies[]" type="checkbox" value="Software Development" onChange={handleCheckboxChange} />
                                <label htmlFor="styled-checkbox-3">Software Development</label>
                            </li>
                            <li>
                                <input id="styled-checkbox-4" name="hobbies[]" type="checkbox" value="Digital Marketing" onChange={handleCheckboxChange} />
                                <label htmlFor="styled-checkbox-4">Digital Marketing</label>
                            </li>
                            <li>
                                <input id="styled-checkbox-5" name="hobbies[]" type="checkbox" value="Other" onChange={handleCheckboxChange} />
                                <label htmlFor="styled-checkbox-5">Other</label>
                            </li>
                        </ul>
                        <p>{formErrors['hobbies']}</p>
                    </fieldset>

                </div>
                <div className="half-width">
                    <fieldset>
                        <legend>How did you hear about TechArk?</legend>
                        <span className="wpcf7-form-control-wrap spriteimglazyload lazyloaded" data-name="menu-201">
                            <select className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required" aria-required="true" aria-invalid="false" id="menu_201" name="about-techark" onChange={handleChange}>
                                <option value="">Please Select*</option>
                                <option value="Returning client">Returning client</option>
                                <option value="Recommended by 
					friend/colleague">Recommended by friend/colleague</option>
                                <option value="Social media">Social media</option>
                                <option value="Online search">Online search</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                        <p>{formErrors['about-techark']}</p>
                    </fieldset>
                    <div className="add_required_field d-none">
                        <span className="wpcf7-form-control-wrap spriteimglazyload lazyload" data-name="textarea-237">
                            <textarea cols="40" rows="10" className="wpcf7-form-control wpcf7-textarea" aria-invalid="false" placeholder="Please Specify*" id="textarea_237" name="techark-desc" onChange={handleChange} >{formData.name}</textarea>
                        </span>
                        <p>{formErrors['techark-desc']}</p>
                    </div>
                </div>
            </div>
            <div>
                <label className="title-form visuallyhidden" htmlFor="Message">How can TechArk Help?*</label>
                <span className="wpcf7-form-control-wrap spriteimglazyload lazyloaded" data-name="message">
                    <textarea cols="10" rows="2" className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required form-control" id="message" placeholder="How can TechArk help?*" name="techark-help" onChange={handleChange} >{formData.name}</textarea>
                </span>
                <p>{formErrors['techark-help']}</p>
            </div>
            <button type="submit" className="wpcf7-form-control wpcf7-submit techark-btn submainform btn">Send</button>
            <p>{result}</p>
        </form>
    );
}
