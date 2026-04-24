import Image from "next/image";

function FeaturesCard({ type, heading, text, image }) {
  return (
    <div
      className="
        group relative
        bg-white/70 backdrop-blur-xl
        border border-gray-200/60
        rounded-2xl
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-2
        transition-all duration-500
        p-6 lg:p-8
        overflow-hidden
      "
    >
      {/* subtle gradient glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-green-100/40 to-transparent" />

      <div className="relative flex flex-col gap-5">
        {/* Tag */}
        <span
          className="
          inline-block w-fit
          text-xs md:text-sm font-medium
          px-3 py-1
          rounded-full
          bg-linear-to-r from-green-500 to-emerald-400
          text-white
          shadow-sm
        "
        >
          {type}
        </span>

        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
          {heading}
        </h2>

        {/* Image */}
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={image}
            alt="feature"
            className="
              w-full h-44 object-cover
              transition-transform duration-500
              group-hover:scale-110
            "
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-60" />
        </div>

        {/* Text */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

export default FeaturesCard;
