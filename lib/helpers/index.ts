export const getRandomColor = (name: string) => {
  const hash = name
    ?.split("")
    .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const tailwindColors = [
    "bg-red-700",
    "bg-orange-700",
    "bg-amber-700",
    "bg-yellow-700",
    "bg-lime-700",
    "bg-green-700",
    "bg-emerald-700",
    "bg-teal-700",
    "bg-cyan-700",
    "bg-sky-700",
    "bg-blue-700",
    "bg-indigo-700",
    "bg-violet-700",
    "bg-purple-700",
    "bg-fuchsia-700",
    "bg-pink-700",
    "bg-rose-700",
    "bg-stone-700",
    "bg-neutral-700",
    "bg-zinc-700",
    "bg-gray-700",
    "bg-slate-700",
  ];
  return tailwindColors[hash % tailwindColors.length];
};
