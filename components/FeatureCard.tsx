import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
};

export default function FeatureCard({ icon: Icon, title, children }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{children}</p>
    </div>
  );
}
