"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ComboboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    options: string[];
    onValueChange?: (value: string) => void;
}

export function ComboboxInput({
    className,
    options,
    value,
    onChange,
    onValueChange,
    ...props
}: ComboboxInputProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value?.toString() || "");
    const [filteredOptions, setFilteredOptions] = React.useState<string[]>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setInputValue(value?.toString() || "");
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        // Standard onChange
        if (onChange) onChange(e);
        // Custom onValueChange
        if (onValueChange) onValueChange(newValue);

        if (newValue.trim() === "") {
            setFilteredOptions(options); // Show all if cleared
            setIsOpen(true);
            return;
        }

        const filtered = options.filter((option) =>
            option.toLowerCase().includes(newValue.toLowerCase())
        );
        setFilteredOptions(filtered);
        setIsOpen(true);
    };

    const handleSelectOption = (option: string) => {
        setInputValue(option);
        if (onValueChange) onValueChange(option);
        
        // Create a synthetic event for standard onChange if needed
        // This is a bit hacky but works for simple use cases
        if (onChange) {
            const event = {
                target: { value: option },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
        }
        
        setIsOpen(false);
    };

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        if (inputValue.trim() === "") {
            setFilteredOptions(options);
        } else {
             const filtered = options.filter((option) =>
                option.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
        setIsOpen(true);
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <Input
                {...props}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className={cn("w-full", className)}
                autoComplete="off"
            />
            {isOpen && filteredOptions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-2xl border border-zinc-900 bg-black p-2 shadow-2xl animate-in fade-in-0 zoom-in-95">
                    {filteredOptions.map((option) => (
                        <div
                            key={option}
                            className={cn(
                                "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-zinc-300",
                                inputValue === option ? "bg-zinc-900 text-white" : "hover:bg-zinc-900 hover:text-white"
                            )}
                            onClick={() => handleSelectOption(option)}
                        >
                            {option}
                            {inputValue === option && (
                                <Check className="ml-auto h-4 w-4 text-zinc-400" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
