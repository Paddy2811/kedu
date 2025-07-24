import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, description, action, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          {variant === 'error' && (
            <AlertCircle className="w-[18px] h-[18px] text-[#E03E59]" />
          )}
          {variant === 'success' && (
            <CheckCircle2 className="w-[18px] h-[18px] text-[#52C41A]" />
          )}
          <div className="flex-1 pr-6">
                <ToastDescription>{description}</ToastDescription>
            </div>
            {action}
            <ToastClose />
          </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
