'use client';

import { useEffect, useState } from 'react';

export function useSecurityQuestionsLogic() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState({ answer: false });
  const [showError, setShowError] = useState(false);

  // Fetch question on load
  useEffect(() => {
    // Replace this with an actual API call if needed
    const fetchQuestion = async () => {
      // Example fetch
      const res = await fetch('/api/user/security-question');
      const data = await res.json();
      setQuestion(data.question);

      setQuestion("What is your childhood nickname?"); // Mocked
    };

    fetchQuestion();
  }, []);

  const handleAnswerChange = (v: string) => {
    setAnswer(v);
    if (errors.answer) setErrors((e) => ({ ...e, answer: false }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer.trim() === '') {
      setErrors({ answer: true });
      setShowError(true);
      return;
    }

    setShowError(false);
    alert('Answer submitted!');
    // Optionally send to backend
    setAnswer('');
  };

  return {
    question,
    answer,
    errors,
    showError,
    handleAnswerChange,
    handleSubmit,
  };
}
