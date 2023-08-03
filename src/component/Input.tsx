import { Error } from "~/component/Error";

export function Input(
  props: React.ComponentPropsWithoutRef<"input"> & {
    errors?: boolean;
  }
) {
  const errors = props.errors;
  const errorStyles = errors
    ? "border-2 border-red-500"
    : "border border-gray-400";
  return (
    <>
      <input
        {...props}
        className={`w-full rounded ${errorStyles} z-20 px-4 py-2 dark:text-gray-800`}
      />
      {errors && (
        <div className="relative">
          <Error hasErrors={errors} />
        </div>
      )}
    </>
  );
}
