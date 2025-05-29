'use client';

import { useState, useMemo } from 'react';

export const QUESTIONS: string[] = [
  'In what city did you meet your first spouse/partner?',
  "What is your mother's middle name?",
  "What is your oldest sibling's middle name?",
  'What was the name of the first school you attended?',
  'What was your childhood nickname?',
  // …add more if desired
];

export function useSecurityQuestionsLogic() {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [errors, setErrors] = useState({
    q1: false, a1: false,
    q2: false, a2: false,
    q3: false, a3: false,
  });
  const [showError, setShowError] = useState(false);

  // filter out already-selected questions
  const q2Options = useMemo(
    () => QUESTIONS.filter((q) => q !== q1),
    [q1]
  );
  const q3Options = useMemo(
    () => QUESTIONS.filter((q) => q !== q1 && q !== q2),
    [q1, q2]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      q1: q1 === '',
      a1: a1.trim() === '',
      q2: q2 === '',
      a2: a2.trim() === '',
      q3: q3 === '',
      a3: a3.trim() === '',
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setShowError(true);
      return;
    }

    setShowError(false);
    alert('Security questions saved!');
    // reset
    setQ1(''); setQ2(''); setQ3('');
    setA1(''); setA2(''); setA3('');
    setErrors({ q1: false, a1: false, q2: false, a2: false, q3: false, a3: false });
  };

  // clear individual error on change
  const handleQ1Change = (v: string) => {
    setQ1(v);
    if (errors.q1) setErrors((e) => ({ ...e, q1: false }));
  };
  const handleA1Change = (v: string) => {
    setA1(v);
    if (errors.a1) setErrors((e) => ({ ...e, a1: false }));
  };
  const handleQ2Change = (v: string) => {
    setQ2(v);
    if (errors.q2) setErrors((e) => ({ ...e, q2: false }));
  };
  const handleA2Change = (v: string) => {
    setA2(v);
    if (errors.a2) setErrors((e) => ({ ...e, a2: false }));
  };
  const handleQ3Change = (v: string) => {
    setQ3(v);
    if (errors.q3) setErrors((e) => ({ ...e, q3: false }));
  };
  const handleA3Change = (v: string) => {
    setA3(v);
    if (errors.a3) setErrors((e) => ({ ...e, a3: false }));
  };

  return {
    QUESTIONS,
    q1, q2, q3,
    a1, a2, a3,
    errors,
    showError,
    q2Options,
    q3Options,
    handleQ1Change,
    handleA1Change,
    handleQ2Change,
    handleA2Change,
    handleQ3Change,
    handleA3Change,
    handleSubmit,
  };
}