"use client";

import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const phoneCountries = [
  { id: "za", label: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { id: "bw", label: "Botswana", dialCode: "+267", flag: "🇧🇼" },
  { id: "ls", label: "Lesotho", dialCode: "+266", flag: "🇱🇸" },
  { id: "sz", label: "Eswatini", dialCode: "+268", flag: "🇸🇿" },
  { id: "na", label: "Namibia", dialCode: "+264", flag: "🇳🇦" },
  { id: "zw", label: "Zimbabwe", dialCode: "+263", flag: "🇿🇼" },
  { id: "zm", label: "Zambia", dialCode: "+260", flag: "🇿🇲" },
  { id: "mz", label: "Mozambique", dialCode: "+258", flag: "🇲🇿" },
  { id: "mw", label: "Malawi", dialCode: "+265", flag: "🇲🇼" },
  { id: "ng", label: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { id: "ke", label: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { id: "gh", label: "Ghana", dialCode: "+233", flag: "🇬🇭" },
  { id: "ug", label: "Uganda", dialCode: "+256", flag: "🇺🇬" },
  { id: "tz", label: "Tanzania", dialCode: "+255", flag: "🇹🇿" },
  { id: "gb", label: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { id: "us", label: "United States", dialCode: "+1", flag: "🇺🇸" },
  { id: "ca", label: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { id: "au", label: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { id: "ae", label: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { id: "in", label: "India", dialCode: "+91", flag: "🇮🇳" },
] as const;

export const defaultPhoneCountry = "za";

export function formatInternationalPhone(countryId: string, localNumber: string) {
  const country = phoneCountries.find((item) => item.id === countryId) ?? phoneCountries[0];
  const digits = localNumber.replace(/\D/g, "").replace(/^0+/, "");

  return digits ? `${country.dialCode} ${digits}` : "";
}

export function PhoneNumberField({
  countryId,
  localNumber,
  onCountryChange,
  onLocalNumberChange,
}: {
  countryId: string;
  localNumber: string;
  onCountryChange: (countryId: string) => void;
  onLocalNumberChange: (number: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Phone className="h-3.5 w-3.5" /> Phone Number
      </label>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <Select value={countryId} onValueChange={onCountryChange}>
          <SelectTrigger className="h-10 border-border bg-background/60">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {phoneCountries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.flag} {country.label} ({country.dialCode})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="tel"
          inputMode="tel"
          required
          placeholder="71 234 5678"
          value={localNumber}
          onChange={(e) => onLocalNumberChange(e.target.value)}
          maxLength={24}
          className="h-10 border-border bg-background/60"
        />
      </div>
    </div>
  );
}