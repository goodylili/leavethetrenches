"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingModal } from "@/components/OnboardingModal";

export function GetAlertsButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button 
                size="sm" 
                className="rounded-none px-5 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsOpen(true)}
            >
                Get Alerts
            </Button>

            <OnboardingModal 
                open={isOpen} 
                onOpenChange={setIsOpen} 
            />
        </>
    );
}
