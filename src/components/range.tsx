type RangeStepProps = {
  value?: string;
  onChange: (eValue: string) => void;
};
const RangeStep = (props: RangeStepProps) => {
  const { value, onChange } = props;
  return (
    <>
      <div className="flex items-center justify-between">
        <label className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
          Easy
        </label>
        <label className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
          Medium
        </label>
        <label className="block  text-sm font-medium text-gray-900 dark:text-gray-300">
          Hard
        </label>
      </div>
      <div>
        <input
          id="steps-range"
          type="range"
          min="0"
          max="2"
          value={value ?? "0"}
          step="1"
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    </>
  );
};

export default RangeStep;
