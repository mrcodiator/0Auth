'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

// declaring the types
interface FormState {
    step: 1 | 2 | 3;
}

// declaring the types
interface FormContextProps {
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

// initial state
const initialFormState: FormState = {
    step: 1,
};

// creating the context
const VerifyFormContext = createContext<FormContextProps | undefined>(undefined);

// creating the provider
export const VerifyFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formState, setFormState] = useState<FormState>(initialFormState);


    // memoize the context value
    const contextValue = useMemo(() => ({ formState, setFormState }), [formState, setFormState]);

    return (
        <VerifyFormContext.Provider value={contextValue}>
            {children}
        </VerifyFormContext.Provider>
    );
};

// creating the hook
export const useVerifyFormContext = () => {
    const context = useContext(VerifyFormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
