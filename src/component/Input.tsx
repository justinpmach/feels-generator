export function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className="w-full rounded border border-gray-400 px-4 py-2 dark:text-gray-800"
    />
  );
}
