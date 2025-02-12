import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
}

export function Steps({ currentStep }: StepperProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="flex-col sm:grid-cols-4 hidden sm:grid gap-4">
        <StepItem
          number={1}
          label="Choose Date"
          isActive={currentStep === 1}
          isCompleted={currentStep > 1}
        />
        <StepItem
          number={2}
          label="Select Package"
          isActive={currentStep === 2}
          isCompleted={currentStep > 2}
        />
        <StepItem
          number={3}
          label="Addons"
          isActive={currentStep === 3}
          isCompleted={currentStep > 3}
        />
        <StepItem
          number={4}
          label="Payment"
          isActive={currentStep === 4}
          isCompleted={currentStep > 4}
        />
      </div>
    </div>
  );
}

interface StepItemProps {
  number: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

function StepItem({ number, label, isActive, isCompleted }: StepItemProps) {
  return (
    <div className="flex items-center sm:justify-center">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 text-sm sm:text-base font-semibold transition-colors",
            isActive && "border-primary bg-primary text-primary-foreground",
            isCompleted && "border-primary bg-primary text-primary-foreground",
            !isActive && !isCompleted && "border-muted text-muted-foreground"
          )}
        >
          {number}
        </div>
        <span
          className={cn(
            "text-sm sm:text-base font-medium",
            isActive && "text-primary",
            isCompleted && "text-primary",
            !isActive && !isCompleted && "text-muted-foreground"
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
