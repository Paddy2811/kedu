import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, normalizeString } from "@/lib/utils";

// Simple reusable Combobox component (single-select)
// props: options [{value,label}], value, onChange, placeholder, disabled
export function Combobox({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  className,
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  // Close popover when disabled becomes true
  useEffect(() => {
    if (disabled && open) setOpen(false);
  }, [disabled, open]);

  const handleSelect = (val) => {
    if (val !== value) {
      onChange?.(val);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled} ref={triggerRef}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            disabled && "bg-[#EDEDED] text-muted-foreground cursor-not-allowed",
            className
          )}
        >
          {selectedLabel || <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" sideOffset={4} align="start">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={`${opt.label} ${normalizeString(opt.label)} ${opt.value}`}
                  onSelect={() => handleSelect(opt.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 