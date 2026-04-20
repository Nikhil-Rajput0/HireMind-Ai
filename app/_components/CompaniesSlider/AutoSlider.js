import SliderPlaceholder from "./SliderPlaceholder";

function AutoSlider() {
  return (
    <section className="pt-10 pb-5 flex flex-col items-center overflow-hidden w-full">
      <div>
        <h2 className="text-md lg:text-xl pb-6 text-[#40650c] font-semibold">
          Prepares For Top Most Companies
        </h2>
      </div>

      <div className="flex w-full">
        <SliderPlaceholder />
        <SliderPlaceholder />
        <SliderPlaceholder />
      </div>
    </section>
  );
}

export default AutoSlider;
