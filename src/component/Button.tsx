import clsx from "clsx";

export function Button(
  props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: "primary" | "secondary";
  }
) {
  const colors =
    (props.variant && "primary") === "primary"
      ? "bg-blue-400 hover:text-blue-500"
      : "bg-gray-400 hover:text-gray-500";

  return (
    <button {...props} className={clsx("rounded-md  px-4 py-2", colors)}>
      {props.children}
    </button>
  );
}
