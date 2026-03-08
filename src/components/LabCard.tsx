interface LabCardProps {
  title: string;
  description: string;
  category: string;
}

const LabCard = ({ title, description, category }: LabCardProps) => {
  return (
    <div className="group rounded-lg border border-border bg-card/50 p-5 transition-all duration-300 hover:border-foreground/10 hover:bg-card">
      <span className="font-mono text-[11px] text-muted-foreground/60 uppercase tracking-widest">
        {category}
      </span>
      <h3 className="text-sm font-medium text-foreground mt-2 mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default LabCard;
