export default function FeatureCard({ icon, title, description }) {
  return (
    <article className="feature-card group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg sm:p-8">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20"
        aria-hidden="true"
      >
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </article>
  );
}