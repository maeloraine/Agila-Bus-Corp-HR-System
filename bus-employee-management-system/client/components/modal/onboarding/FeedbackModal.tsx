'use client';

import React, { useState } from 'react';
import styles from './OnboardingModal.module.css';
import { useCandidateModal, Candidate } from './CandidateModalLogic';
import { showConfirmation, showSuccess } from '@/app/utils/swal';

interface FeedbackModalProps {
  candidate: Candidate;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ candidate, onClose }) => {


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    <i className='ri-close-line'/>
                </button>
                <h2>Feedback for {candidate.firstName} {candidate.lastName}</h2>
                {/* Your feedback form here */}
            </div>
        </div>
    );
};

export default FeedbackModal;
