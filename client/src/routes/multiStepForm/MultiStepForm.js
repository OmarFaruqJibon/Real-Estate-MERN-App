import React, { useState } from 'react';
import './MultiStepForm.scss';

const steps = [
    'Basic Information',
    'Description',
    'Attachment',
    'Submit',
];

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [visitedSteps, setVisitedSteps] = useState([1]);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        description: '',
        image: null,
    });

    const goToStep = (step) => {
        if (!visitedSteps.includes(step)) {
            setVisitedSteps([...visitedSteps, step]);
        }
        setCurrentStep(step);
    };

    const nextStep = () => {
        const next = currentStep + 1;
        if (next <= steps.length) {
            goToStep(next);
        }
    };

    const prevStep = () => {
        const prev = currentStep - 1;
        if (prev >= 1) {
            goToStep(prev);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Form submitted!');
    };

    return (
        <div className="form-wrapper">

            <div className="stepper">
                {steps.map((stepLabel, index) => {
                    const stepNumber = index + 1;
                    const isVisited = visitedSteps.includes(stepNumber);
                    const isActive = currentStep === stepNumber;
                    return (
                        <div
                            key={stepLabel}
                            className={`step-item ${isVisited ? 'visited' : ''} ${isActive ? 'active' : ''}`}
                        >
                            <div className="step-circle">{stepNumber}</div>
                            <div className="step-label">{stepLabel}</div>
                            {stepNumber !== steps.length && <div className="step-line" />}
                        </div>
                    );
                })}
            </div>

            <form className="form-content" onSubmit={handleSubmit}>


                {currentStep === 1 && (
                    <>
                        <h2>Basic Information</h2>
                        <input type="text" name="title" placeholder="Property Title" value={formData.title} onChange={handleChange} required />
                        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                    </>
                )}


                {currentStep === 2 && (
                    <>
                        <h2>Description</h2>
                        <textarea name="description" placeholder="Property Description" value={formData.description} onChange={handleChange} required />
                    </>
                )}


                {currentStep === 3 && (
                    <>
                        <h2>Attachment</h2>
                        <input type="file" name="image" onChange={handleChange} accept="image/*" />
                    </>
                )}



                {currentStep === 4 && (
                    <>
                        <h2>Submit</h2>
                        <p><strong>Title:</strong> {formData.title}</p>
                        <p><strong>Location:</strong> {formData.location}</p>
                        <p><strong>Price:</strong> {formData.price}</p>
                        <p><strong>Description:</strong> {formData.description}</p>
                        <p><strong>Image:</strong> {formData.image ? formData.image.name : 'No file selected'}</p>
                    </>
                )}


                <div className="navigation-buttons">
                    {currentStep > 1 && <button type="button" onClick={prevStep}>Back</button>}
                    {currentStep < steps.length && (
                        <button type="button" onClick={nextStep}>
                            Save and Continue to Step {currentStep + 1}
                        </button>
                    )}
                    {currentStep === steps.length && <button type="submit">Submit</button>}
                </div>




            </form>
        </div>
    );
};

export default MultiStepForm;
