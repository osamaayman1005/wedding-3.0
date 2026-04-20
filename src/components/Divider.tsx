export function Divider() {
  return (
    <div aria-hidden="true" className="my-10 flex items-center justify-center gap-5">
      <div className="h-px w-24 soft-divider md:w-32" />
      <div className="h-9 w-9 rounded-full ring-1 ring-sage-700/25 bg-ivory/80 shadow-glow grid place-items-center">
        <div className="h-2 w-2 rounded-full bg-sage-700/70" />
      </div>
      <div className="h-px w-24 soft-divider md:w-32" />
    </div>
  )
}

