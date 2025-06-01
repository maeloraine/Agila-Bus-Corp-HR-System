'use client';

import { useRouter } from 'next/navigation';
import styles from './SecurityQuestions.module.css';
import { useSecurityQuestionsLogic } from './SecurityQuestionsLogic';

export default function SecurityQuestionsPage() {
  const router = useRouter();
  const {
    question, // new: single question from backend or mock
    answer,
    errors,
    showError,
    handleAnswerChange,
    handleSubmit,
  } = useSecurityQuestionsLogic();

  return (
    <div className={styles.base}>
      <div className={styles.questionsContainer}>
        <h1>Security Question</h1>
        <h5>Please answer the question to proceed.</h5>

        <form onSubmit={handleSubmit} noValidate>
          <label className={styles.label}>Your Security Question</label>
          <div className={styles.input} style={{border: 'none' }}>
            {question || 'Loading...'}
          </div>

          <label htmlFor="answer" className={styles.label}>Your Answer</label>
          <input
            id="answer"
            type="text"
            placeholder="Answer"
            className={`${styles.input} ${errors.answer ? styles.fieldError : ''}`}
            value={answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />

          {showError && (
            <p className={styles.errorText}>Answer is required.</p>
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
