import ScrollFloat from "../ScrollFloat/ScrollFloat";

export default function Last() {
  return (
    <div className="mx-auto h-screen bg-[#131320] flex justify-center items-center text-center px-4 py-8">
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white">
          Fatiya Quzza.
        </h1>
      </ScrollFloat>
    </div>
  );
}
