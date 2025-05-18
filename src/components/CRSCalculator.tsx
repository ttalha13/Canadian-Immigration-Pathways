import { useState } from 'react';
import { MessageSquare, X, Send, Calculator } from 'lucide-react';

class LanguagePointsCalculator {
  private testFlows = {
    IELTS: {
      questions: [
        'What is your IELTS Speaking score? (0.0-9.0)',
        'What is your IELTS Listening score? (0.0-9.0)',
        'What is your IELTS Reading score? (0.0-9.0)',
        'What is your IELTS Writing score? (0.0-9.0)'
      ],
      converter: (scores: { [key: string]: number }) => {
        const clbMap = {
          speaking: this.getIELTSCLB(scores.speaking),
          listening: this.getIELTSCLB(scores.listening),
          reading: this.getIELTSCLB(scores.reading),
          writing: this.getIELTSCLB(scores.writing)
        };
        return clbMap;
      }
    },
    CELPIP: {
      questions: [
        'What is your CELPIP Speaking score? (1-12)',
        'What is your CELPIP Listening score? (1-12)',
        'What is your CELPIP Reading score? (1-12)',
        'What is your CELPIP Writing score? (1-12)'
      ],
      converter: (scores: { [key: string]: number }) => {
        return {
          speaking: scores.speaking,
          listening: scores.listening,
          reading: scores.reading,
          writing: scores.writing
        };
      }
    },
    TEF: {
      questions: [
        'What is your TEF Speaking score? (0-450)',
        'What is your TEF Listening score? (0-360)',
        'What is your TEF Reading score? (0-300)',
        'What is your TEF Writing score? (0-450)'
      ],
      converter: (scores: { [key: string]: number }) => {
        return {
          speaking: this.getTEFCLB(scores.speaking, 'speaking'),
          listening: this.getTEFCLB(scores.listening, 'listening'),
          reading: this.getTEFCLB(scores.reading, 'reading'),
          writing: this.getTEFCLB(scores.writing, 'writing')
        };
      }
    }
  };

  private getIELTSCLB(score: number): number {
    if (score >= 9.0) return 10;
    if (score >= 8.5) return 9;
    if (score >= 7.5) return 8;
    if (score >= 6.5) return 7;
    if (score >= 6.0) return 6;
    if (score >= 5.5) return 5;
    if (score >= 5.0) return 4;
    return 3;
  }

  private getTEFCLB(score: number, skill: string): number {
    const ranges = {
      speaking: [
        { min: 393, clb: 10 },
        { min: 371, clb: 9 },
        { min: 349, clb: 8 },
        { min: 310, clb: 7 },
        { min: 271, clb: 6 },
        { min: 226, clb: 5 },
        { min: 181, clb: 4 }
      ],
      listening: [
        { min: 316, clb: 10 },
        { min: 298, clb: 9 },
        { min: 280, clb: 8 },
        { min: 249, clb: 7 },
        { min: 217, clb: 6 },
        { min: 181, clb: 5 },
        { min: 145, clb: 4 }
      ],
      reading: [
        { min: 263, clb: 10 },
        { min: 248, clb: 9 },
        { min: 233, clb: 8 },
        { min: 207, clb: 7 },
        { min: 181, clb: 6 },
        { min: 151, clb: 5 },
        { min: 121, clb: 4 }
      ],
      writing: [
        { min: 393, clb: 10 },
        { min: 371, clb: 9 },
        { min: 349, clb: 8 },
        { min: 310, clb: 7 },
        { min: 271, clb: 6 },
        { min: 226, clb: 5 },
        { min: 181, clb: 4 }
      ]
    };

    const skillRanges = ranges[skill as keyof typeof ranges];
    for (const range of skillRanges) {
      if (score >= range.min) return range.clb;
    }
    return 3;
  }

  getLanguageScores(test: string) {
    return this.testFlows[test as keyof typeof this.testFlows];
  }

  calculateLanguagePoints(clbScores: { [key: string]: number }, isFirstLanguage: boolean): number {
    let points = 0;
    const skills = ['speaking', 'listening', 'reading', 'writing'];

    if (isFirstLanguage) {
      // First Official Language
      for (const skill of skills) {
        const clb = clbScores[skill];
        if (clb >= 10) points += 32;
        else if (clb >= 9) points += 29;
        else if (clb >= 8) points += 22;
        else if (clb >= 7) points += 16;
        else if (clb >= 6) points += 8;
        else if (clb >= 5) points += 6;
        else if (clb >= 4) points += 4;
      }
    } else {
      // Second Official Language
      for (const skill of skills) {
        const clb = clbScores[skill];
        if (clb >= 5) points += 4;
        else if (clb >= 4) points += 2;
      }
    }

    return points;
  }
}

function CRSCalculator() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({
    age: 0,
    education: 0,
    firstLanguage: 0,
    secondLanguage: 0,
    canadianWorkExp: 0,
    foreignWorkExp: 0,
    certificateOfQualification: 0,
    arrangedEmployment: 0,
    nomination: 0,
    adaptability: 0
  });

  const [formData, setFormData] = useState({
    age: '',
    education: '',
    maritalStatus: '',
    spouseEducation: '',
    spouseLanguage: '',
    spouseWorkExp: '',
    firstLanguageTest: 'IELTS',
    secondLanguageTest: 'TEF',
    canadianWorkExp: '',
    foreignWorkExp: '',
    certificateOfQualification: 'no',
    arrangedEmployment: 'no',
    nomination: 'no',
    canadianFamily: 'no',
    canadianEducation: 'no',
    canadianWorkExpSpouse: 'no'
  });

  const steps = [
    {
      title: 'Personal Information',
      fields: [
        {
          label: 'Age',
          type: 'number',
          name: 'age',
          min: 17,
          max: 99,
          required: true
        },
        {
          label: 'Marital Status',
          type: 'select',
          name: 'maritalStatus',
          options: [
            { value: 'single', label: 'Single' },
            { value: 'married', label: 'Married/Common-Law' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'Education',
      fields: [
        {
          label: 'Level of Education',
          type: 'select',
          name: 'education',
          options: [
            { value: 'none', label: 'None, or less than secondary (high school) - 0 points' },
            { value: 'highSchool', label: 'Secondary diploma (high school) - 30 points' },
            { value: 'oneyearDegree', label: 'One-year program at university/college - 90 points' },
            { value: 'twoyearDegree', label: 'Two-year program at university/college - 98 points' },
            { value: 'threeyearDegree', label: 'Bachelor\'s degree (3+ year program) - 120 points' },
            { value: 'twoOrMoreDegrees', label: 'Two or more degrees (one 3+ years) - 128 points' },
            { value: 'masters', label: 'Master\'s degree - 135 points' },
            { value: 'phd', label: 'PhD - 140 points' }
          ],
          required: true
        },
        {
          label: 'Canadian Education',
          type: 'select',
          name: 'canadianEducation',
          options: [
            { value: 'no', label: 'No Canadian Education' },
            { value: 'oneOrTwo', label: '1-2 year credential' },
            { value: 'threeOrMore', label: '3+ year credential' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'Language Skills',
      fields: [
        {
          label: 'First Official Language Test',
          type: 'select',
          name: 'firstLanguageTest',
          options: [
            { value: 'IELTS', label: 'IELTS' },
            { value: 'CELPIP', label: 'CELPIP' },
            { value: 'TEF', label: 'TEF' }
          ],
          required: true
        },
        {
          label: 'Second Official Language Test',
          type: 'select',
          name: 'secondLanguageTest',
          options: [
            { value: 'none', label: 'None' },
            { value: 'TEF', label: 'TEF' },
            { value: 'IELTS', label: 'IELTS' },
            { value: 'CELPIP', label: 'CELPIP' }
          ],
          required: false
        }
      ]
    },
    {
      title: 'Work Experience',
      fields: [
        {
          label: 'Canadian Work Experience (years)',
          type: 'select',
          name: 'canadianWorkExp',
          options: [
            { value: '0', label: 'None' },
            { value: '1', label: '1 year' },
            { value: '2', label: '2 years' },
            { value: '3', label: '3 years' },
            { value: '4', label: '4 years' },
            { value: '5+', label: '5 or more years' }
          ],
          required: true
        },
        {
          label: 'Foreign Work Experience (years)',
          type: 'select',
          name: 'foreignWorkExp',
          options: [
            { value: '0', label: 'None' },
            { value: '1', label: '1-2 years' },
            { value: '3', label: '3 years or more' }
          ],
          required: true
        }
      ]
    },
    {
      title: 'Additional Factors',
      fields: [
        {
          label: 'Certificate of Qualification',
          type: 'select',
          name: 'certificateOfQualification',
          options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
          ],
          required: true
        },
        {
          label: 'Arranged Employment',
          type: 'select',
          name: 'arrangedEmployment',
          options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
          ],
          required: true
        },
        {
          label: 'Provincial Nomination',
          type: 'select',
          name: 'nomination',
          options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
          ],
          required: true
        },
        {
          label: 'Canadian Family Member',
          type: 'select',
          name: 'canadianFamily',
          options: [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
          ],
          required: true
        }
      ]
    }
  ];

  const calculateAgePoints = (age: number): number => {
    if (age <= 17 || age >= 45) return 0;
    
    // Age points according to official CRS scoring
    switch (age) {
      case 18: return 90;
      case 19: return 95;
      case 20: return 100;
      case 21: return 105;
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
      case 27:
      case 28:
      case 29:
      case 30: return 110;
      case 31: return 105;
      case 32: return 99;
      case 33: return 94;
      case 34: return 88;
      case 35: return 77;
      case 36: return 72;
      case 37: return 66;
      case 38: return 61;
      case 39: return 55;
      case 40: return 50;
      case 41: return 39;
      case 42: return 28;
      case 43: return 17;
      case 44: return 6;
      default: return 0;
    }
  };

  const calculateEducationPoints = (education: string) => {
    const educationPoints = {
      none: 0, // Less than secondary (high school)
      highSchool: 30, // Secondary diploma (high school)
      oneyearDegree: 90, // One-year program
      twoyearDegree: 98, // Two-year program
      threeyearDegree: 120, // Bachelor's degree (three or more year program)
      twoOrMoreDegrees: 128, // Two or more certificates/diplomas/degrees, one being 3+ years
      masters: 135, // Master's degree
      phd: 140 // PhD
    };

    return educationPoints[education as keyof typeof educationPoints] || 0;
  };

  const calculateCanadianWorkExpPoints = (years: string) => {
    const workExpPoints = {
      '0': 0,
      '1': 40,
      '2': 53,
      '3': 64,
      '4': 72,
      '5+': 80
    };

    return workExpPoints[years] || 0;
  };

  const calculateForeignWorkExpPoints = (years: string) => {
    const workExpPoints = {
      '0': 0,
      '1': 13,
      '3': 25
    };

    return workExpPoints[years] || 0;
  };

  const calculateAdditionalPoints = () => {
    let points = 0;

    // Provincial Nomination
    if (formData.nomination === 'yes') points += 600;

    // Arranged Employment
    if (formData.arrangedEmployment === 'yes') points += 50;

    // Canadian Education
    if (formData.canadianEducation === 'oneOrTwo') points += 15;
    if (formData.canadianEducation === 'threeOrMore') points += 30;

    // Canadian Family Member
    if (formData.canadianFamily === 'yes') points += 15;

    // Certificate of Qualification
    if (formData.certificateOfQualification === 'yes') points += 50;

    return points;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Calculate points based on input
    if (name === 'age') {
      setScores(prev => ({ ...prev, age: calculateAgePoints(parseInt(value)) }));
    } else if (name === 'education') {
      setScores(prev => ({ ...prev, education: calculateEducationPoints(value) }));
    } else if (name === 'canadianWorkExp') {
      setScores(prev => ({ ...prev, canadianWorkExp: calculateCanadianWorkExpPoints(value) }));
    } else if (name === 'foreignWorkExp') {
      setScores(prev => ({ ...prev, foreignWorkExp: calculateForeignWorkExpPoints(value) }));
    }

    // Recalculate additional points
    setScores(prev => ({ ...prev, adaptability: calculateAdditionalPoints() }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <button
        onClick={() => setShowCalculator(!showCalculator)}
        className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <Calculator className="h-6 w-6" />
        <span className="text-lg font-semibold">
          {showCalculator ? 'Hide CRS Calculator' : 'Calculate Your CRS Score'}
        </span>
      </button>

      {showCalculator && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Step {currentStep + 1}: {steps[currentStep].title}
            </h2>
            <div className="mt-4 mb-8 bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <form className="space-y-6">
            {steps[currentStep].fields.map((field, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    required={field.required}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    required={field.required}
                    min={field.min}
                    max={field.max}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors ml-auto"
                >
                  Next
                </button>
              ) : (
                <div className="ml-auto text-right">
                  <div className="text-3xl font-bold text-red-500">
                    {totalScore}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total CRS Score
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CRSCalculator;