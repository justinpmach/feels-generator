import clsx from "clsx";

export function FormGroup(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className={clsx("block w-full ", props.className)}>
      {props.children}
    </div>
  );
}
