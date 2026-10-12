type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ id, eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`mb-10 max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{subtitle}</p> : null}
    </div>
  );
}
