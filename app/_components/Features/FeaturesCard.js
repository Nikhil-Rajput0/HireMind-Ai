import Image from "next/image";

function FeaturesCard({ type, heading, text, image }) {
  return (
    <div>
      <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-lg ring-1 ring-gray-300/80 shadow-md/50 p-8">
        <div className="flex flex-col gap-6 ">
          <div>
            <p className="bg-green-500 rounded-full px-2 py-1 inline-flex">
              {type}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{heading}</h2>
          </div>
          <div className="mx-auto w-full">
            <Image
              quality={75}
              loading="eager"
              alt="Features logo"
              width={220}
              objectFit="cover"
              src={image}
              className="rounded-3xl"
            />
          </div>
          <div>
            <p className="text-[16px] font-light text-gray-700">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesCard;
