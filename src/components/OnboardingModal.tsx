import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowRight, Globe, Mail } from "lucide-react";

interface OnboardingModalProps {
    onComplete: (country: string) => void;
}

const COUNTRIES = [
    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa",
    "Egypt",
    "Uganda",
    "Rwanda",
    "Ethiopia",
    "India",
    "Pakistan",
    "Philippines",
    "Indonesia",
    "Brazil",
    "Other"
];

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        // Check if user has already onboarded
        const hasOnboarded = localStorage.getItem("ltt_onboarded");
        if (!hasOnboarded) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        } else {
            // If onboarded, retrieve country and notify parent immediately
            const savedCountry = localStorage.getItem("ltt_country");
            if (savedCountry) {
                onComplete(savedCountry);
            }
        }
    }, [onComplete]);

    const handleNext = () => {
        setStep(2);
    };

    const handleFinish = () => {
        if (!country) return;

        // Save state
        localStorage.setItem("ltt_onboarded", "true");
        localStorage.setItem("ltt_country", country);

        setIsOpen(false);
        onComplete(country);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            // Prevent closing by clicking outside if not finished? 
            // For good UX, let's allow closing but it won't save "onboarded" state so it pops up again next time?
            // Or just let it be.
            if (!open && country) {
                handleFinish();
            } else {
                setIsOpen(open);
            }
        }}>
            <DialogContent className="sm:max-w-md border-zinc-800 bg-zinc-950 text-white">
                <DialogHeader>
                    {step === 1 ? (
                        <div className="flex flex-col items-center text-center space-y-4 pt-4">
                            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                                <Mail className="h-6 w-6 text-white" />
                            </div>
                            <DialogTitle className="text-2xl font-bold">Join the Movement</DialogTitle>
                            <DialogDescription className="text-zinc-400 text-base">
                                Get the latest visa-sponsored opportunities and scholarships delivered to your inbox.
                            </DialogDescription>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center space-y-4 pt-4">
                            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                                <Globe className="h-6 w-6 text-white" />
                            </div>
                            <DialogTitle className="text-2xl font-bold">Personalize Your Feed</DialogTitle>
                            <DialogDescription className="text-zinc-400 text-base">
                                Tell us where you are from so we can show you relevant visa & scholarship information.
                            </DialogDescription>
                        </div>
                    )}
                </DialogHeader>

                <div className="py-6">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <Input
                                placeholder="Enter your email"
                                className="bg-zinc-900 border-zinc-700 h-12 text-base text-center"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button onClick={handleNext} className="w-full h-12 text-base font-semibold rounded-lg bg-white text-black hover:bg-zinc-200">
                                Join Newsletter & Continue
                            </Button>
                            <Button variant="ghost" onClick={handleNext} className="w-full text-zinc-500 hover:text-white">
                                Skip for now
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Select value={country} onValueChange={setCountry}>
                                <SelectTrigger className="w-full h-12 bg-zinc-900 border-zinc-700">
                                    <SelectValue placeholder="Select your country of origin" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                                    <SelectGroup>
                                        <SelectLabel>Africa</SelectLabel>
                                        {COUNTRIES.filter(c => ["Nigeria", "Ghana", "Kenya", "South Africa", "Egypt", "Uganda", "Rwanda", "Ethiopia"].includes(c)).map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                        <SelectLabel>Asia & Others</SelectLabel>
                                        {COUNTRIES.filter(c => !["Nigeria", "Ghana", "Kenya", "South Africa", "Egypt", "Uganda", "Rwanda", "Ethiopia"].includes(c)).map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Button
                                onClick={handleFinish}
                                disabled={!country}
                                className="w-full h-12 text-base font-semibold rounded-lg bg-white text-black hover:bg-zinc-200 disabled:opacity-50"
                            >
                                Detailed Visa Info <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
