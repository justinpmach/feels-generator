export function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button {...props} className="rounded-md bg-blue-400 px-4 py-2">
      {props.children}
    </button>
  );
}
