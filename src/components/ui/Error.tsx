import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn't load the books. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 rounded-card bg-card border border-border py-20 px-6">
      <div className="flex-center w-16 h-16 rounded-full bg-borrowed/10 text-borrowed">
        <AlertTriangle size={28} />
      </div>
      <h3 className="text-xl">{title}</h3>
      <p className="text-foreground/60 max-w-sm">{description}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn_primary mt-2">
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
