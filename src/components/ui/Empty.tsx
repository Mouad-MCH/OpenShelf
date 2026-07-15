import { BookX } from "lucide-react";

interface EmptyProps {
  title?: string;
  description?: string;
}

const Empty = ({
  title = "No books found",
  description = "Try adjusting your search or filters to find what you're looking for.",
}: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 rounded-card bg-card border border-border py-20 px-6">
      <div className="flex-center w-16 h-16 rounded-full bg-available/10 text-available">
        <BookX size={28} />
      </div>
      <h3 className="text-xl">{title}</h3>
      <p className="text-foreground/60 max-w-sm">{description}</p>
    </div>
  );
};

export default Empty;
