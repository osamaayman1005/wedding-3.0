import { FloralCorner } from './FloralArtwork'

type Corner = 'tl' | 'tr' | 'bl' | 'br'

export function OrnamentCorner({ corner }: { corner: Corner }) {
  const anchor =
    corner === 'tl'
      ? 'left-0 top-0'
      : corner === 'tr'
        ? 'right-0 top-0'
        : corner === 'bl'
          ? 'left-0 bottom-0'
          : 'right-0 bottom-0'
  const artwork =
    corner === 'tl'
      ? 'left-[-24px] top-[-24px]'
      : corner === 'tr'
        ? 'right-[-24px] top-[-24px]'
        : corner === 'bl'
          ? 'left-[-24px] bottom-[-24px]'
          : 'right-[-24px] bottom-[-24px]'
  return (
    <FloralCorner
      mirrored={corner === 'tr' || corner === 'br'}
      className={`${anchor} ${artwork}`}
    />
  )
}
