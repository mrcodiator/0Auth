import React from 'react'
import { useVerifyFormContext } from '@/context/verifyContext';
import { Button } from '../ui/button';
import SendEmail from './SendEmail';
import { Separator } from '../ui/separator';
import VerifyToken from './VerifyToken';
import ChangePassword from './ChangePassword';

const VerifyEmailComponent = () => {
    const { formState, setFormState } = useVerifyFormContext();

    const handleNext = () => {
        setFormState((prev) => ({ ...prev, step: prev.step === 1 ? 2 : 3 }));
    };

    const handlePrev = () => {
        setFormState((prev) => ({ ...prev, step: prev.step === 3 ? 2 : 1 }));
    };

    return (
        <div className="flex flex-col justify-between p-5 max-w-md w-full min-h-[450px]">
            <div>
                <div>
                    {formState.step === 1 && <SendEmail next={handleNext} prev={handlePrev} />}
                    {formState.step === 2 && <VerifyToken next={handleNext} prev={handlePrev} />}
                    {formState.step === 3 && <ChangePassword next={handleNext} prev={handlePrev} />}
                </div>

            </div>
            <div className="grid grid-cols-3 w-full gap-2">
                <Separator className={`h-[5px] w-full rounded-full ${formState.step === 1 ? "bg-primary" : "bg-primary/20"}`} />
                <Separator className={`h-[5px] w-full rounded-full ${formState.step === 2 ? "bg-primary" : "bg-primary/20"}`} />
                <Separator className={`h-[5px] w-full rounded-full ${formState.step === 3 ? "bg-primary" : "bg-primary/20"}`} />
            </div>
        </div>
    )
}

export default VerifyEmailComponent

