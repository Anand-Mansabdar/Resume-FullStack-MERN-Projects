import { colorSchemes } from "../assets/assets";

const ColorSchemeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-200">
        Color Scheme
      </label>

      <div className="grid grid-cols-6 gap-3">
        {colorSchemes.map((color) => (
          <button
            key={color.id}
            onClick={() => onChange(color.id)}
            className={`relative rounded-lg transition-all ${
              value === color.id && "ring-2 ring-rose-500"
            }`}
            title={color.name}
          >
            <div className="flex h-10 overflow-hidden rounded-lg">
              {color.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-zinc-400">
        Selected: {colorSchemes.find((s) => s.id === value)?.name}
      </p>
    </div>
  );
};

export default ColorSchemeSelector;
