import React, { useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});

  const questionsByGender = {
    Male: [
      {
        text: "Select your primary health concern:",
        name: "healthConcern",
        options: ["Hair Loss", "Sexual Health", "Beard Growth"],
      },
      {
        text: "Please select your hair stage:",
        name: "hairStage",
        options: [
          "Stage 1 (Slightly hair loss)",
          "Stage 2 (Hair line receding)",
          "Stage 3 (Developing bald spot)",
          "Stage 4 (Visible bald spot)",
          "Stage 5 (Balding from crown area)",
          "Stage 6 (Advanced balding)",
          "Heavy Hair Fall",
          "Coin Size Patch",
        ],
      },
      {
        text: "Do you have dandruff?",
        name: "dandruff",
        options: ["Yes", "No"],
      },
      {
        text: "Select your dandruff stage:",
        name: "dandruffStage",
        options: ["Low", "Mild", "Moderate", "Severe"],
        conditional: (responses) => responses.dandruff === "Yes",
      },
      {
        text: "Are you experiencing hair thinning or bald spots?",
        name: "thinningOrBaldSpots",
        options: [
          "Yes, both",
          "Yes, thinning only",
          "Yes, bald spots only",
          "No",
          "I'm not sure",
        ],
      },
    ],
    Female: [
      {
        text: "What does your hair look like naturally?",
        name: "naturalHair",
        options: ["Straight", "Curly", "Wavy", "Coily"],
      },
      {
        text: "What is your current goal?",
        name: "goal",
        options: ["Control hair fall", "Regrow Hair"],
      },
      {
        text: "Do you feel more hair fall than usual?",
        name: "hairFall",
        options: ["Yes, extreme", "Mild", "No"],
      },
      {
        text: "Choose your main concern:",
        name: "mainConcern",
        options: [
          "Hair thinning",
          "Coin size patches",
          "Medium widening",
          "Advanced widening",
          "Less volume on sides",
        ],
      },
    ],
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid phone number is required (10 digits)";
    if (!formData.age.trim() || parseInt(formData.age) < 18)
      newErrors.age = "Age must be 18 or older";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateForm()) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      const questions = questionsByGender[formData.gender] || [];
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        alert("Form Submitted!");
        console.log("Form Data:", formData);
        console.log("Responses:", responses);
      }
    }
  };

  const handlePrevious = () => {
    if (step === 3 && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (step === 1) {
      setFormData({ ...formData, [name]: value });
    } else {
      setResponses({ ...responses, [name]: value });
    }
  };

  const renderStageContent = () => {
    if (step === 1) {
      return (
        <div>
          <p className="text-lg mb-4 text-center">Hi! I'm  Noa<br></br>May I have your details to proceed? <br></br>Please enter your personal details:</p>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <p className="text-lg">Thank you for your details! Click Next to proceed with the questionnaire.</p>
      );
    } else if (step === 3) {
      const questions = questionsByGender[formData.gender] || [];
      const currentQuestion = questions[currentQuestionIndex];

      if (currentQuestion?.conditional && !currentQuestion.conditional(responses)) {
        setCurrentQuestionIndex((prev) => prev + 1);
        return null;
      }

      return (
        <div>
          <p className="mb-4">{currentQuestion.text}</p>
          {currentQuestion.options.map((option, idx) => (
            <label key={idx} className="block mb-2">
              <input
                type="radio"
                name={currentQuestion.name}
                value={option}
                checked={responses[currentQuestion.name] === option}
                onChange={handleInputChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center h-screen mt-16">
      <span className="bg-green-300 w-full sm:w-[600px] text-green-600 font-bold text-center text-2xl font-mono rounded-tr-xl rounded-tl-xl p-3">
        Self Assessment
      </span>
      <div className="bg-white shadow-lg rounded-lg w-full sm:w-[600px] p-6">
        {renderStageContent()}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            {step === 3 && currentQuestionIndex === (questionsByGender[formData.gender]?.length || 0) - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
