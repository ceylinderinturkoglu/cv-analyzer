import { useState } from "react";

type UseLoadingReturn = {
  activeStep: number | null; // Şu anki aktif adım (null: aktif adım yok)
  activeStepMessage: string | null; // Aktif adıma ait mesaj (null: mesaj yok)
  setActiveStep: (stepIndex: number | null) => void; // Aktif adımı ayarla
};

export const useLoading = (steps: string[]): UseLoadingReturn => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const setStep = (stepIndex: number | null) => {
    if (stepIndex !== null && (stepIndex < 0 || stepIndex >= steps.length)) {
      throw new Error("Invalid step index");
    }
    setActiveStep(stepIndex);
  };

  const activeStepMessage = activeStep !== null ? steps[activeStep] : null;

  return { activeStep, activeStepMessage, setActiveStep: setStep };
};
