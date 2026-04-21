import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 120
const SCROLL_MULTIPLIER = 5

/*Load all frames for mobile*/
const getFramePath = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(4, '0')}.webp`

const isMobile = () => window.innerWidth <= 768

function getTextStyle(progress: number, start: number, end: number) {
  /* Peak visibility */
  const mid = (start + end) / 2

  let opacity = 0

  if (progress >= start && progress <= end) {
    if (progress < mid) {
      /* fade in */
      opacity = (progress - start) / (mid - start)
    } else {
      /* fade out */
      opacity = (end - progress) / (end - mid)
    }
  }

  /*Movement of text */
  return {
    opacity,
    transform: `translateY(${(1 - opacity) * 20}px)`
  }
}

/*This thing is that scroll to explore text */
function getScrollHintStyle(progress: number) {
  const isAtTop = progress < 0.08

  return {
    opacity: isAtTop ? 1 : 0,
  }
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mobile, setMobile] = useState(() => isMobile())
  /*This is basically everything ie progress */
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onResize = () => setMobile(isMobile())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current
      if (!container) return
      /* the god  (oddsettop - where hearo starts)*/
      const scrolled = window.scrollY - container.offsetTop
      const scrollable = container.offsetHeight - window.innerHeight  /* '-' coz u already should the start right soo */
      const p = Math.max(0, Math.min(1, scrolled / scrollable))       /* basically progress = scrolled / scrollable , the min max to ensure never >1 and <0*/

      setProgress(p)
    }

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      id="hero"
      style={{
        height: `${SCROLL_MULTIPLIER * 100}vh`, /* this makes scroll actually work ie fake tallness */
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
      }}
    >
      <div className="hero-sticky">

        {mobile
          ? <CanvasHero containerRef={containerRef} />
          : <VideoHero containerRef={containerRef} />
        }

        
        <div className="hero-text">

          <p
            className="scroll-hint"
            style={getScrollHintStyle(progress)}
          >
            Scroll to explore
          </p>

          <p className="hero-main" style={getTextStyle(progress, 0.1, 0.35)}>
  SIDDHARTH<span className="name-break"> M IYER</span>
</p>

          <p className="hero-long" style={getTextStyle(progress, 0.35, 0.65)}>
  INFLUENCER MARKETER<span className="long-break"> & TALENT MANAGER</span>
</p>

          <p className="hero-long" style={getTextStyle(progress, 0.65, 1)}>
            4+ YEARS OF EXPERIENCE
          </p>

        </div>

      </div>
    </div>
  )
}


function VideoHero({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onLoaded = () => setReady(true)
    video.addEventListener('loadedmetadata', onLoaded)

    const onScroll = () => {
      const container = containerRef.current
      if (!container || !video.duration) return

      const scrolled = window.scrollY - container.offsetTop
      const scrollable = container.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / scrollable))

      if (rafRef.current) cancelAnimationFrame(rafRef.current) /*optimization to prevent too many frame updates*/
      rafRef.current = requestAnimationFrame(() => {
        video.currentTime = progress * video.duration
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded)
      window.removeEventListener('scroll', onScroll)
    }
  }, [containerRef])

  return (
    <>
      {!ready && (
        <div className="hero-loader">
          <p>Loading...</p>
        </div>
      )}

      <video
        ref={videoRef}
        className="hero-canvas"
        src="/video/animation.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          opacity: ready ? 1 : 0,
          objectFit: 'cover',
        }}
      />
    </>
  )
}


function CanvasHero({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img?.complete) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const cw = canvas.width / dpr
    const ch = canvas.height / dpr

    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
    const x = (cw - img.naturalWidth * scale) / 2
    const y = (ch - img.naturalHeight * scale) / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
      img,
      x,
      y,
      img.naturalWidth * scale,
      img.naturalHeight * scale
    )
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr

    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const ctx = canvas.getContext('2d')
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)

    drawFrame(currentFrameRef.current)
  }

  useEffect(() => {
    const images: HTMLImageElement[] = Array.from(
      { length: TOTAL_FRAMES },
      (_, i) => {
        const img = new Image()
        img.src = getFramePath(i)
        return img
      }
    )

    imagesRef.current = images

    let loadedCount = 0

    images.forEach((img) => {
      const onLoad = () => {
        loadedCount++
        if (loadedCount === TOTAL_FRAMES) {
          resizeCanvas()
          setLoaded(true)
        }
      }

      if (img.complete) onLoad()
      else img.onload = onLoad
    })
  }, [])

  useEffect(() => {
    if (!loaded) return

    const onScroll = () => {
      const container = containerRef.current
      if (!container) return

      const scrolled = window.scrollY - container.offsetTop
      const scrollable = container.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / scrollable))

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      )

      if (frameIndex === currentFrameRef.current) return
      currentFrameRef.current = frameIndex

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex))
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [loaded, containerRef])

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <>
      {!loaded && (
        <div className="hero-loader">
          <p>Loading...</p>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="hero-canvas"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </>
  )
}