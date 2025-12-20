import { cn } from "@shared/utils/cn";

export type ErrorProps = {
  errorMessage?: string | null;
  className?: string;
};

export const Error = ({ errorMessage, className }: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div
      role="alert"
      aria-label={errorMessage}
      className={cn("text-xs font-semibold text-red-500", className)}
    >
      {errorMessage}
    </div>
  );
};
