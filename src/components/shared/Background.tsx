import background from "../../assets/Invitation-background.jpeg";

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-[100dvh] w-screen overflow-hidden">
      <img
        src={background}
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  );
}