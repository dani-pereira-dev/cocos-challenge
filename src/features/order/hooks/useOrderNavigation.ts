import { useState } from 'react';

export type Step = 'select' | 'form' | 'confirm' | 'result';
export type SubSheetType = 'mode' | 'price' | null;

export function useOrderNavigation() {
  const [step, setStep] = useState<Step>('select');
  const [subSheet, setSubSheet] = useState<SubSheetType>(null);

  function goBack() {
    if (subSheet) {
      setSubSheet(null);
    } else {
      setStep('select');
    }
  }

  function resetNavigation() {
    setStep('select');
    setSubSheet(null);
  }

  return { step, setStep, subSheet, setSubSheet, goBack, resetNavigation };
}
