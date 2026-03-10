import { motion } from "motion/react";
import { FluidDropdown, FluidDropdownItem } from "../ui/fluid-dropdown";

type EducationStepProps = {
  value: { degree: string; major: string };
  onChange: (degree: string, major: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

const degreeItems: FluidDropdownItem[] = [
  { id: "High School", label: "High School" },
  { id: "Bachelor's", label: "Bachelor's" },
  { id: "Master's", label: "Master's" },
  { id: "PhD", label: "PhD" },
];

const majorItems: FluidDropdownItem[] = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Business",
  "Design",
  "Mathematics",
].map((m) => ({ id: m, label: m }));

import { OnboardingLayout } from "./OnboardingLayout";

export const EducationStep = ({
  value,
  onChange,
  onContinue,
  onBack,
}: EducationStepProps) => {
  const canContinue = value.degree !== "" && value.major !== "";

  return (
    <OnboardingLayout maxWidth="max-w-2xl" onBack={onBack}>
      <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/40">
        <span>Onboarding</span>
        <div className="flex items-center gap-2">
          <span className="text-white/70">Step 1 of 4</span>
          <div className="flex gap-1">
            <span className="w-6 h-[2px] bg-accent" />
            <span className="w-6 h-[2px] bg-white/20" />
            <span className="w-6 h-[2px] bg-white/20" />
            <span className="w-6 h-[2px] bg-white/20" />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/15 px-6 py-6 md:px-8 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
            Let&apos;s start with your education
          </h1>
          <p className="text-sm text-white/60">
            Tell us about your academic background.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
              Current Degree
            </label>
            <FluidDropdown
              items={degreeItems}
              value={value.degree}
              onChange={(val) => onChange(val, value.major)}
              placeholder="Select degree"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
              Branch / Major
            </label>
            <FluidDropdown
              items={majorItems}
              value={value.major}
              onChange={(val) => onChange(value.degree, val)}
              placeholder="Select major"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            disabled={!canContinue}
            onClick={onContinue}
            className={`px-6 py-2 text-xs md:text-sm tracking-[0.2em] uppercase border border-white/20 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-accent hover:border-accent hover:text-white transition-colors ${
              !canContinue ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

