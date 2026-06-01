import clsx from "clsx";

interface LabelProps {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}

export default function Label({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: LabelProps) {
  return (
    <div
      className={clsx(
        "absolute z-10 flex items-center rounded-md bg-black px-2 py-1 text-xs text-white",
        {
          "bottom-2 left-2": position === "bottom",
          "left-2 top-2": position === "center",
        }
      )}
    >
      <span className="mr-1 font-semibold">{title}</span>
      <span>{amount} {currencyCode}</span>
    </div>
  );
}