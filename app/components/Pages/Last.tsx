import ScrollFloat from "../ScrollFloat/ScrollFloat";

export default function Last() {
  return (
    <div className="mx-auto h-screen bg-[#131320] flex justify-center items-center text-9xl">
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        Fatiya Quzza.
      </ScrollFloat>
    </div>
  );
}
