import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface CRSData {
  maritalStatus: string;
  age: number;
  education: string;
  canadianEducation: string;
  languageTest: string;
  languageScores: {
    speaking: number;
    listening: number;
    reading: number;
    writing: number;
  };
  secondLanguageTest?: string;
  secondLanguageScores?: {
    speaking: number;
    listening: number;
    reading: number;
    writing: number;
  };
  canadianWorkExp: number;
  foreignWorkExp: number;
  certificateOfQualification: boolean;
  arrangedEmployment: boolean;
  provincialNomination: boolean;
  siblingInCanada: boolean;
}

interface Message {
  text: string;
  isUser: boolean;
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'll help you calculate your CRS score. What is your marital status? (Single/Married)",
      isUser: false
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [crsData, setCrsData] = useState<Partial<CRSData>>({});
  const [languageScores, setLanguageScores] = useState({
    speaking: 0,
    listening: 0,
    reading: 0,
    writing: 0
  });
  const [currentLanguageSkill, setCurrentLanguageSkill] = useState(0);

  const questions = [
    {
      id: 'maritalStatus',
      question: "What is your marital status? (Single/Married)",
      validate: (input: string) => {
        const status = input.toLowerCase();
        if (status !== 'single' && status !== 'married') {
          return "Please enter either 'Single' or 'Married'";
        }
        return null;
      },
      process: (input: string) => {
        setCrsData(prev => ({ ...prev, maritalStatus: input.toLowerCase() }));
        return "What is your age?";
      }
    },
    {
      id: 'age',
      question: "What is your age?",
      validate: (input: string) => {
        const age = parseInt(input);
        if (isNaN(age) || age < 17 || age > 45) {
          return "Please enter a valid age between 17 and 45";
        }
        return null;
      },
      process: (input: string) => {
        const age = parseInt(input);
        setCrsData(prev => ({ ...prev, age }));
        return "What is your highest level of education?\n\n1. Less than secondary school\n2. Secondary school\n3. One-year program\n4. Two-year program\n5. Bachelor's degree\n6. Two or more degrees (one 3+ years)\n7. Master's degree\n8. PhD\n\nPlease enter the number (1-8)";
      }
    },
    {
      id: 'education',
      question: "What is your highest level of education?",
      validate: (input: string) => {
        const choice = parseInt(input);
        if (isNaN(choice) || choice < 1 || choice > 8) {
          return "Please enter a number between 1 and 8";
        }
        return null;
      },
      process: (input: string) => {
        const educationMap = {
          '1': 'none',
          '2': 'highSchool',
          '3': 'oneYear',
          '4': 'twoYear',
          '5': 'bachelors',
          '6': 'twoOrMore',
          '7': 'masters',
          '8': 'phd'
        };
        setCrsData(prev => ({ ...prev, education: educationMap[input] }));
        return "Do you have any Canadian educational credentials?\n\n1. No Canadian education\n2. Secondary (high school) or less\n3. 1-year or 2-year diploma/certificate\n4. 3-year or longer degree/diploma\n\nPlease enter the number (1-4)";
      }
    },
    {
      id: 'canadianEducation',
      question: "Do you have any Canadian educational credentials?",
      validate: (input: string) => {
        const choice = parseInt(input);
        if (isNaN(choice) || choice < 1 || choice > 4) {
          return "Please enter a number between 1 and 4";
        }
        return null;
      },
      process: (input: string) => {
        const educationMap = {
          '1': 'none',
          '2': 'secondary',
          '3': 'oneOrTwo',
          '4': 'threeOrMore'
        };
        setCrsData(prev => ({ ...prev, canadianEducation: educationMap[input] }));
        return "Which language test did you take for your first official language?\n\n1. IELTS\n2. CELPIP\n3. TEF\n\nPlease enter the number (1-3)";
      }
    },
    {
      id: 'languageTest',
      question: "Which language test did you take?",
      validate: (input: string) => {
        const choice = parseInt(input);
        if (isNaN(choice) || choice < 1 || choice > 3) {
          return "Please enter a number between 1 and 3";
        }
        return null;
      },
      process: (input: string) => {
        const testMap = {
          '1': 'IELTS',
          '2': 'CELPIP',
          '3': 'TEF'
        };
        setCrsData(prev => ({ ...prev, languageTest: testMap[input] }));
        return "Enter your Speaking score:";
      }
    },
    {
      id: 'languageScores',
      question: "Enter your language score:",
      validate: (input: string) => {
        const score = parseFloat(input);
        if (isNaN(score)) {
          return "Please enter a valid number";
        }
        return null;
      },
      process: (input: string) => {
        const score = parseFloat(input);
        const skills = ['speaking', 'listening', 'reading', 'writing'];
        const currentSkill = skills[currentLanguageSkill];
        
        setLanguageScores(prev => ({
          ...prev,
          [currentSkill]: score
        }));
        
        if (currentLanguageSkill < 3) {
          setCurrentLanguageSkill(prev => prev + 1);
          const nextSkill = skills[currentLanguageSkill + 1];
          return `Enter your ${nextSkill.charAt(0).toUpperCase() + nextSkill.slice(1)} score:`;
        }
        
        // After all language scores are collected
        return "How many years of Canadian work experience do you have? (0-5)";
      }
    },
    {
      id: 'canadianWorkExp',
      question: "How many years of Canadian work experience do you have?",
      validate: (input: string) => {
        const years = parseInt(input);
        if (isNaN(years) || years < 0 || years > 5) {
          return "Please enter a number between 0 and 5";
        }
        return null;
      },
      process: (input: string) => {
        setCrsData(prev => ({ ...prev, canadianWorkExp: parseInt(input) }));
        return "How many years of foreign work experience do you have? (0-5)";
      }
    },
    {
      id: 'foreignWorkExp',
      question: "How many years of foreign work experience do you have?",
      validate: (input: string) => {
        const years = parseInt(input);
        if (isNaN(years) || years < 0 || years > 5) {
          return "Please enter a number between 0 and 5";
        }
        return null;
      },
      process: (input: string) => {
        setCrsData(prev => ({ ...prev, foreignWorkExp: parseInt(input) }));
        return "Do you have a certificate of qualification from a Canadian province/territory? (Yes/No)";
      }
    },
    {
      id: 'certificateOfQualification',
      question: "Do you have a certificate of qualification?",
      validate: (input: string) => {
        const answer = input.toLowerCase();
        if (answer !== 'yes' && answer !== 'no') {
          return "Please answer 'Yes' or 'No'";
        }
        return null;
      },
      process: (input: string) => {
        setCrsData(prev => ({ ...prev, certificateOfQualification: input.toLowerCase() === 'yes' }));
        return "Do you have a valid job offer supported by LMIA? (Yes/No)";
      }
    },
    {
      id: 'arrangedEmployment',
      question: "Do you have a valid job offer?",
      validate: (input: string) => {
        const answer = input.toLowerCase();
        if (answer !== 'yes' && answer !== 'no') {
          return "Please answer 'Yes' or 'No'";
        }
        return null;
      },
      process: (input: string) => {
        setCrsData(prev => ({ ...prev, arrangedEmployment: input.toLowerCase() === 'yes' }));
        return "Do you have a provincial nomination? (Yes/No)";
      }
    },
    {
      id: 'provincialNomination',
      question: "Do you have a provincial nomination?",
      validate: (input: string) => {
        const answer = input.toLowerCase();
        if (answer !== 'yes' && answer !== 'no') {
          return "Please answer 'Yes' or 'No'";
        }
        return null;
      },
      process: (input: string) => {
        const isNominated = input.toLowerCase() === 'yes';
        setCrsData(prev => ({ ...prev, provincialNomination: isNominated }));
        
        // Calculate final score here
        const finalScore = calculateCRSScore();
        return `Based on your answers, your CRS score is: ${finalScore} points`;
      }
    }
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  };

  const handleUserInput = () => {
    if (!userInput.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: userInput, isUser: true }]);

    // Get current question
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) {
      setMessages(prev => [...prev, { 
        text: "The calculation is complete. You can start over if you'd like.",
        isUser: false 
      }]);
      setUserInput('');
      return;
    }

    const validationError = currentQuestion.validate(userInput);

    if (validationError) {
      setMessages(prev => [...prev, { text: validationError, isUser: false }]);
    } else {
      const nextQuestion = currentQuestion.process(userInput);
      setMessages(prev => [...prev, { text: nextQuestion, isUser: false }]);
      
      // Only increment step if not processing language scores or if last language score
      if (currentQuestion.id !== 'languageScores' || currentLanguageSkill === 3) {
        setCurrentStep(prev => prev + 1);
      }
    }

    setUserInput('');
  };

  const calculateCRSScore = (): number => {
    let score = 0;

    // Core/human capital factors
    if (crsData.age !== undefined) {
      score += calculateAgePoints(crsData.age);
    }

    if (crsData.education) {
      score += calculateEducationPoints(crsData.education);
    }

    // Language scores
    score += calculateLanguagePoints(languageScores, true);

    // Canadian work experience
    if (crsData.canadianWorkExp !== undefined) {
      score += calculateWorkExperiencePoints(crsData.canadianWorkExp);
    }

    // Additional points
    if (crsData.provincialNomination) {
      score += 600;
    }

    if (crsData.arrangedEmployment) {
      score += 50;
    }

    if (crsData.certificateOfQualification) {
      score += 50;
    }

    // Canadian education points
    if (crsData.canadianEducation) {
      switch (crsData.canadianEducation) {
        case 'threeOrMore':
          score += 30;
          break;
        case 'oneOrTwo':
          score += 15;
          break;
        // No points for secondary or none
      }
    }

    return score;
  };

  const calculateAgePoints = (age: number): number => {
    if (age <= 17 || age >= 45) return 0;
    
    const agePoints = {
      18: 90, 19: 95, 20: 100, 21: 105,
      22: 110, 23: 110, 24: 110, 25: 110, 26: 110,
      27: 110, 28: 110, 29: 110, 30: 110,
      31: 105, 32: 99, 33: 94, 34: 88, 35: 77,
      36: 72, 37: 66, 38: 61, 39: 55, 40: 50,
      41: 39, 42: 28, 43: 17, 44: 6
    };

    return agePoints[age as keyof typeof agePoints] || 0;
  };

  const calculateEducationPoints = (education: string): number => {
    const points = {
      none: 0,
      highSchool: 30,
      oneYear: 90,
      twoYear: 98,
      bachelors: 120,
      twoOrMore: 128,
      masters: 135,
      phd: 140
    };
    return points[education as keyof typeof points] || 0;
  };

  const calculateLanguagePoints = (scores: { [key: string]: number }, isFirstLanguage: boolean): number => {
    let points = 0;
    const skills = ['speaking', 'listening', 'reading', 'writing'];

    if (isFirstLanguage) {
      for (const skill of skills) {
        const score = scores[skill];
        if (score >= 9) points += 32;
        else if (score >= 8) points += 29;
        else if (score >= 7) points += 22;
        else if (score >= 6) points += 16;
        else if (score >= 5) points += 8;
        else if (score >= 4) points += 6;
        else points += 0;
      }
    } else {
      for (const skill of skills) {
        const score = scores[skill];
        if (score >= 7) points += 6;
        else if (score >= 5) points += 3;
        else points += 0;
      }
    }

    return points;
  };

  const calculateWorkExperiencePoints = (years: number): number => {
    if (years >= 5) return 80;
    const points = [0, 40, 53, 64, 72];
    return points[years] || 0;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="bg-red-500 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">CRS Score Calculator</h3>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                    message.isUser
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer..."
                className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleUserInput}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;