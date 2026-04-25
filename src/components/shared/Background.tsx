import background from "../../assets/Invitation-background.jpeg";

export function Background() {
  return (
    <div 
      className="fixed inset-0 -z-10 w-full overflow-hidden pointer-events-none"
      style={{
        // We make it slightly taller than the screen to cover the UI shift
        height: '115vh', 
        // We pull it up slightly so the center remains the center
        top: '-5vh', 
        // Force hardware acceleration for smoothness
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <img
        src={background}
        alt=""
        className="block h-full w-full object-cover"
        style={{
           // Ensures the image stays sharp and doesn't "pop"
           backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
}