import PhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

export interface PhoneInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  id?: string;
  defaultCountry?: Country;
}

const PhoneInputComponent = ({ value, onChange, disabled, className, placeholder, id, defaultCountry = "EG" }: PhoneInputProps) => {
    return (
      <PhoneInput
        international
        defaultCountry={defaultCountry as Country}
        value={value}
        onChange={onChange}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          "[&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:outline-none [&_input]:focus:ring-0",
          "[&_.PhoneInputCountry]:mr-2 [&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center",
          "[&_.PhoneInputCountryIcon]:mr-2",
          "[&_.PhoneInputCountrySelect]:appearance-none [&_.PhoneInputCountrySelect]:bg-transparent",
          "[&_.PhoneInputCountrySelect]:border-0 [&_.PhoneInputCountrySelect]:outline-none [&_.PhoneInputCountrySelect]:cursor-pointer",
          className
        )}
      />
    );
};

PhoneInputComponent.displayName = "PhoneInputComponent";

export { PhoneInputComponent };
