export const CategorySelector = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: bigint;
  setSelectedCategory: (category: bigint) => void;
}) => {
  return (
    <div className="grid grid-cols-3 text-sm bg-secondary border border-secondary rounded-lg">
      <button
        className={`px-4 py-0 border ${
          selectedCategory === 0n
            ? "bg-secondary text-white border-secondary"
            : "bg-white text-primary border-gray-300"
        } rounded-l-lg transition-colors`}
        onClick={() => setSelectedCategory(0n)}
      >
        Dine-In
      </button>
      <button
        className={`px-4 py-2 border ${
          selectedCategory === 1n
            ? "bg-secondary text-white border-secondary"
            : "bg-white text-primary border-gray-300"
        } rounded-none transition-colors`}
        onClick={() => setSelectedCategory(1n)}
      >
        Takeaway
      </button>
      <button
        className={`px-4 py-2 border ${
          selectedCategory === 2n
            ? "bg-secondary text-white border-secondary"
            : "bg-white text-primary border-gray-300"
        } rounded-r-lg transition-colors`}
        onClick={() => setSelectedCategory(2n)}
      >
        Delivery
      </button>
    </div>
  );
};
