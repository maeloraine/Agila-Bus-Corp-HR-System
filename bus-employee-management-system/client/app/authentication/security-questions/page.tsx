'use client';

import { useRouter } from 'next/navigation';
import styles from './SecurityQuestions.module.css';
import { useSecurityQuestionsLogic } from './SecurityQuestionsLogic';

export default function SecurityQuestionsPage() {
  const router = useRouter();
  const {
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
  } = useSecurityQuestionsLogic();

  return (
    <div className={styles.base}>
      <div className={styles.questionsContainer}>
        <h1>Set Security Questions</h1>
        <h5>Select three questions and provide your answers.</h5>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="q1" className={styles.label}>Security Question 1</label>
          <select
            id="q1"
            className={`${styles.select} ${errors.q1 ? styles.fieldError : ''}`}
            value={q1}
            onChange={e => handleQ1Change(e.target.value)}
          >
            <option value="">Select a question…</option>
            {QUESTIONS.map((q, i) => (
              <option key={i} value={q}>{q}</option>
            ))}
          </select>

          <label htmlFor="a1" className={styles.label}>Answer</label>
          <input
            id="a1"
            type="text"
            placeholder="Answer"
            className={`${styles.input} ${errors.a1 ? styles.fieldError : ''}`}
            value={a1}
            onChange={e => handleA1Change(e.target.value)}
          />

          <label htmlFor="q2" className={styles.label}>Security Question 2</label>
          <select
            id="q2"
            className={`${styles.select} ${errors.q2 ? styles.fieldError : ''}`}
            value={q2}
            onChange={e => handleQ2Change(e.target.value)}
          >
            <option value="">Select a question…</option>
            {q2Options.map((q, i) => (
              <option key={i} value={q}>{q}</option>
            ))}
          </select>

          <label htmlFor="a2" className={styles.label}>Answer</label>
          <input
            id="a2"
            type="text"
            placeholder="Answer"
            className={`${styles.input} ${errors.a2 ? styles.fieldError : ''}`}
            value={a2}
            onChange={e => handleA2Change(e.target.value)}
          />

          <label htmlFor="q3" className={styles.label}>Security Question 3</label>
          <select
            id="q3"
            className={`${styles.select} ${errors.q3 ? styles.fieldError : ''}`}
            value={q3}
            onChange={e => handleQ3Change(e.target.value)}
          >
            <option value="">Select a question…</option>
            {q3Options.map((q, i) => (
              <option key={i} value={q}>{q}</option>
            ))}
          </select>

          <label htmlFor="a3" className={styles.label}>Answer</label>
          <input
            id="a3"
            type="text"
            placeholder="Answer"
            className={`${styles.input} ${errors.a3 ? styles.fieldError : ''}`}
            value={a3}
            onChange={e => handleA3Change(e.target.value)}
          />

          {showError && (
            <p className={styles.errorText}>
              Please fill in every question and answer.
            </p>
          )}

          <div className={styles.cancelButton}>
            <button type="button" onClick={() => router.push('/authentication/login')}>
              Cancel
            </button>
          </div>

          <div className={styles.submitButton}>
            <button type="submit">Submit</button>
          </div>
        </form>

        <a onClick={() => router.push('/authentication/login')} className={styles.backLink}>
          Back to Login
        </a>
      </div>
    </div>
  );
}
