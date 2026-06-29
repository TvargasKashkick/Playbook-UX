'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const SLIDES = [
  { game: 'Dice Dreams',             earn: 'Earn $815', bg: '/game-wall/featured-carousel.png' },
  { game: 'Star Trek: Fleet Command', earn: 'Earn $550', bg: '/game-wall/carousel-star-trek.jpg' },
  { game: 'Family Island',           earn: 'Earn $375', bg: '/game-wall/carousel-family-island.jpg' },
  { game: 'Scrabble GO',             earn: 'Earn $150', bg: '/game-wall/carousel-scrabble-go.jpg' },
  { game: 'Bingo Blitz',             earn: 'Earn $330', bg: '/game-wall/carousel-bingo-blitz.png' },
]

const A = {
  logo:         '/game-wall/logo.svg',
  avatar:       '/game-wall/avatar.png',
  money:        '/game-wall/money.svg',
  ticketIcon:   '/game-wall/tickets.svg',
  bell:         '/game-wall/notification-bell.svg',
  navHome:      '/game-wall/nav-home.svg',
  navGames:     '/game-wall/nav-games.svg',
  navDeals:     '/game-wall/nav-deals.svg',
  navSurveys:   '/game-wall/nav-surveys.svg',
  navGiveaways: '/game-wall/nav-giveaways.svg',
  navShopping:  '/game-wall/nav-shopping.svg',
}

const COMMUNITY_PICKS = [
  { title: 'The Grand Mafia',    value: '$225', image: '/game-wall/cp-grand-mafia.png' },
  { title: 'Domino Dreams',      value: '$610', image: '/game-wall/cp-domino-dreams.png' },
  { title: 'RAID: Shadow Le...', value: '$740', image: '/game-wall/cp-raid.png' },
  { title: "Taylor's Secret...", value: '$570', image: '/game-wall/cp-taylors-secret.png', badge: 'recommended' as const },
  { title: 'Cube Master',        value: '$500', image: '/game-wall/cp-cube-master.png' },
  { title: "June's Journey...",  value: '$420', image: '/game-wall/cp-junes-journey.png' },
  { title: 'Legendale: Adve...', value: '$335', image: '/game-wall/cp-legendale.png' },
  { title: 'Toon Blast!',        value: '$220', image: '/game-wall/cp-toon-blast.png' },
]

const BIG_REWARDS = [
  { title: 'Bingo Blitz',   value: '$330', image: '/game-wall/br-bingo-blitz.png' },
  { title: 'Box Jam',       value: '$225', image: '/game-wall/br-box-jam.png', badge: 'new' as const },
  { title: 'Monopoly GO',   value: '$225', image: '/game-wall/br-monopoly-go.png' },
  { title: 'Bubble Far...', value: '$480', image: '/game-wall/br-bubble.png' },
  { title: '3 Tiles',       value: '$225', image: '/game-wall/br-3-tiles.png' },
  { title: 'Colorwood...',  value: '$125', image: '/game-wall/br-colorwood.png' },
  { title: 'Cook & Merge', value: '$225', image: '/game-wall/br-cook-merge.png' },
]

const REWARD_RUSH = [
  { title: 'Spin Arena Cash',   category: 'Casino',      value: '$460', image: '/game-wall/rr-spin-arena.png' },
  { title: 'Solitaire Cash',    category: 'Skill-based', value: '$630', image: '/game-wall/rr-solitaire-cash.png' },
  { title: 'Club Vegas: Sloys', category: 'Casino',      value: '$580', image: '/game-wall/rr-club-vegas.png' },
]

const NEXT_OBSESSION = [
  { type: 'video', src: '/game-wall/monopoly-go-preview.mp4' },
  { type: 'image', src: '/game-wall/no-2.png'                },
  { type: 'image', src: '/game-wall/no-3.png'                },
  { type: 'video', src: '/game-wall/solitaire-preview.mp4'   },
  { type: 'video', src: '/game-wall/raid-preview.mp4'        },
  { type: 'video', src: '/game-wall/block-jam-preview.mp4'   },
] as const

const FASTEST_REWARD = [
  { image: '/game-wall/fr-1.png' },
  { image: '/game-wall/fr-2.png' },
  { image: '/game-wall/fr-3.png' },
  { image: '/game-wall/fr-4-top10.png', badge: 'top10' as const },
  { image: '/game-wall/fr-5.png' },
  { image: '/game-wall/fr-6.png' },
]

const pp = (weight: 400 | 500 | 600 | 700): React.CSSProperties => ({
  fontFamily: 'var(--font-poppins), sans-serif',
  fontWeight: weight,
})

const hv = (weight: 400 | 500 | 700): React.CSSProperties => ({
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontWeight: weight,
})

function ValuePill({ value }: { value: string }) {
  return (
    <div
      className="flex items-center justify-center px-[4.98px] rounded-[124.49px] shrink-0"
      style={{ background: 'linear-gradient(to top, #0c7a20, #2e9945)', height: 24.898 }}
    >
      <span className="text-[14px] text-white whitespace-nowrap" style={{ ...hv(700), lineHeight: '19.918px' }}>{value}</span>
    </div>
  )
}

function CategorySection({ title, children, pb }: { title: string; children: React.ReactNode; pb?: number }) {
  return (
    <div className="bg-white flex flex-col shrink-0 w-full" style={pb ? { paddingBottom: pb } : undefined}>
      <div className="p-[16px]">
        <p className="text-[18px] leading-[26px] text-[#320b4d]" style={pp(600)}>{title}</p>
      </div>
      {children}
    </div>
  )
}

function SectionRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: 'auto', width: '100%', paddingBottom: 16, scrollSnapType: 'x mandatory', scrollPaddingLeft: 16, scrollbarWidth: 'none' } as React.CSSProperties}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingLeft: 16, paddingRight: 16, minWidth: 'max-content' }}>
        {children}
      </div>
    </div>
  )
}

function PortraitCard({ imageSrc, title, value, badge, onClick }: {
  imageSrc?: string; title?: string; value?: string
  badge?: 'recommended'; onClick?: () => void
}) {
  return (
    <div
      className={`flex flex-col gap-[8px] items-start shrink-0 w-[128px]${onClick ? ' active:opacity-75' : ''}`}
      style={{ scrollSnapAlign: 'start' } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="relative h-[192px] rounded-[12px] shrink-0 w-full bg-[#c6c6c6] overflow-hidden">
        {imageSrc && <img src={imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        {badge === 'recommended' && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[24px] px-[8px] bg-[#fc0] border-t border-l border-r border-[#ffe785] rounded-tl-[8px] rounded-tr-[8px] drop-shadow-[0px_-1px_1px_rgba(0,0,0,0.25)]">
            <span className="text-[12px] text-[#320b4d] whitespace-nowrap" style={hv(700)}>Recommended</span>
          </div>
        )}
      </div>
      {title && (
        <div className="flex flex-col leading-[0] shrink-0 whitespace-nowrap">
          <p className="text-[14px] leading-[20px] text-[#484649]" style={pp(600)}>{title}</p>
        </div>
      )}
      {value && <ValuePill value={value} />}
    </div>
  )
}

function SmallSquareCard({ title, value, imageSrc, badge }: {
  title: string; value: string; imageSrc?: string; badge?: 'new'
}) {
  return (
    <div className="flex flex-col gap-[8px] items-start shrink-0" style={{ scrollSnapAlign: 'start' } as React.CSSProperties}>
      <div className="relative bg-[#c6c6c6] rounded-[12px] shrink-0 overflow-hidden" style={{ width: 96, height: 96 }}>
        {imageSrc && <img src={imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        {badge === 'new' && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[24px] px-[8px] bg-[#77ffbe] border-t border-l border-r border-[#2db250] rounded-tl-[8px] rounded-tr-[8px] drop-shadow-[0px_-1px_1px_rgba(0,0,0,0.25)]">
            <span className="text-[12px] text-[#320b4d] whitespace-nowrap" style={hv(700)}>New!</span>
          </div>
        )}
      </div>
      <div className="flex flex-col leading-[0] shrink-0 whitespace-nowrap">
        <p className="text-[14px] text-[#484649]" style={{ ...pp(600), lineHeight: '20px' }}>{title}</p>
      </div>
      <ValuePill value={value} />
    </div>
  )
}

function WideCard({ imageSrc }: { imageSrc?: string | null }) {
  return (
    <div
      className="relative w-[320px] h-[160px] rounded-[12px] bg-[#c6c6c6] shrink-0 overflow-hidden"
      style={{ scrollSnapAlign: 'start' } as React.CSSProperties}
    >
      {imageSrc && <img src={imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />}
    </div>
  )
}

function VideoCard({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-[320px] h-[160px] rounded-[12px] bg-[#c6c6c6] shrink-0 overflow-hidden"
      style={{ scrollSnapAlign: 'start' } as React.CSSProperties}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
      />
    </div>
  )
}

function ImagePortraitCard({ imageSrc, badge, onClick }: {
  imageSrc?: string; badge?: 'recommended' | 'top10'; onClick?: () => void
}) {
  return (
    <div
      className={`relative w-[128px] h-[192px] rounded-[12px] bg-[#c6c6c6] overflow-hidden shrink-0${onClick ? ' active:opacity-75' : ''}`}
      style={{ scrollSnapAlign: 'start' } as React.CSSProperties}
      onClick={onClick}
    >
      {imageSrc && <img src={imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />}
      {badge === 'recommended' && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[24px] px-[8px] bg-[#fc0] border-t border-l border-r border-[#ffe785] rounded-tl-[8px] rounded-tr-[8px] drop-shadow-[0px_-1px_1px_rgba(0,0,0,0.25)]">
          <span className="text-[12px] text-[#320b4d] whitespace-nowrap" style={hv(700)}>Recommended</span>
        </div>
      )}
      {badge === 'top10' && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center h-[24px] px-[8px] bg-[#f89e36] border-t border-l border-r border-[#ffe785] rounded-tl-[8px] rounded-tr-[8px] drop-shadow-[0px_-1px_1px_rgba(0,0,0,0.25)]">
          <span className="text-[12px] text-[#320b4d] whitespace-nowrap" style={hv(700)}>Top 10</span>
        </div>
      )}
    </div>
  )
}

function KeepPlayingCard({
  thumbnailSrc,
  missionText,
  countdown,
  onMissions,
  onPlay,
}: {
  thumbnailSrc?: string
  missionText: string
  countdown: string
  onMissions?: () => void
  onPlay?: () => void
}) {
  return (
    <div
      className="flex flex-col gap-[8px] items-start shrink-0"
      style={{ width: 295, scrollSnapAlign: 'start' } as React.CSSProperties}
    >
      {/* Thumbnail with play overlay and progress bar */}
      <div
        className="relative h-[174px] w-full rounded-[12px] bg-[#c4c4c4] overflow-hidden"
        style={{ boxShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
      >
        {thumbnailSrc && (
          <img src={thumbnailSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        {/* Play button overlay */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-[37px]${onPlay ? ' active:opacity-75' : ''}`}
          style={{ width: 74, height: 74, background: 'rgba(118,41,162,0.2)' }}
          onClick={onPlay}
        >
          <div className="flex flex-col gap-[8px] items-center">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M0 0L14 8L0 16V0Z" fill="white" />
            </svg>
            <span className="text-[16px] leading-[22px] text-white" style={pp(600)}>Play</span>
          </div>
        </div>
        {/* Progress bar */}
        <div
          className="absolute bg-white rounded-[8px] flex items-center justify-between"
          style={{ bottom: 10, left: 8, right: 8, paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8 }}
        >
          <img src="/game-wall/kp-progress-arrow.svg" alt="" className="absolute left-0 top-0" style={{ width: 59, height: 20 }} />
          <span className="relative text-[11px] text-[#320b4d] whitespace-nowrap" style={hv(400)}>{missionText}</span>
          <div className="flex items-center gap-[2px] relative">
            <img src="/game-wall/clock.svg" alt="" style={{ width: 16, height: 16, flexShrink: 0 }} />
            <span className="text-[12px] leading-4 text-[#320b4d] whitespace-nowrap" style={hv(500)}>{countdown}</span>
          </div>
        </div>
      </div>
      {/* Missions button */}
      <button
        onClick={onMissions}
        className={`flex items-center justify-center gap-[4px] w-full h-[40px] rounded-[100px] bg-white border border-[#7629a2]${onMissions ? ' active:opacity-75' : ''}`}
        style={{ paddingLeft: 19, paddingRight: 9 }}
      >
        <span className="text-[16px] leading-6 text-[#7629a2] whitespace-nowrap" style={pp(700)}>Missions</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#7629a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

function MoreGamesCard() {
  return (
    <div
      className="bg-white flex flex-col items-center justify-between px-[16px] py-[8px] rounded-[24px] shrink-0"
      style={{
        width: 156,
        height: 221,
        boxShadow: '0px 4px 2px rgba(0,0,0,0.25)',
        scrollSnapAlign: 'start',
      } as React.CSSProperties}
    >
      <div className="w-full flex items-start">
        <img src="/game-wall/plus-circle.svg" alt="" style={{ width: 40, height: 40, flexShrink: 0 }} />
      </div>
      <div className="relative shrink-0" style={{ width: 80, height: 80 }}>
        <img src="/game-wall/kp-more-games-circle.svg" alt="" className="absolute inset-0 w-full h-full" />
        <div className="absolute" style={{ top: 10, left: 10, width: 60, height: 60 }}>
          <img src="/game-wall/kp-more-games-gamepad.svg" alt="" className="w-full h-full object-contain" />
        </div>
      </div>
      <div className="flex flex-col items-start w-full">
        <span className="text-[12px] leading-[16px] text-[#320b4d]" style={hv(400)}>Personalized Picks</span>
        <span className="text-[26px] leading-[34px] text-[#320b4d]" style={pp(600)}>+ Games</span>
      </div>
    </div>
  )
}

function RewardRushCard({ imageSrc, title, category, value }: {
  imageSrc: string; title: string; category: string; value: string
}) {
  return (
    <div className="bg-[#fffbfe] border border-[#f0dff7] flex gap-[8px] items-center overflow-hidden p-[8px] rounded-[16px] shrink-0 w-full">
      <div className="relative rounded-[12px] shrink-0 overflow-hidden" style={{ width: 66.9, height: 66.9 }}>
        <img src={imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[4px] items-start">
        <div className="flex flex-col leading-[0] whitespace-nowrap">
          <p className="text-[14px] leading-[20px] text-[#320b4d]" style={pp(600)}>{title}</p>
          <p className="text-[12px] leading-[16px] text-[#787579]" style={hv(400)}>{category}</p>
        </div>
        <ValuePill value={value} />
      </div>
    </div>
  )
}

const COUNTDOWN_MS = (6 * 24 * 60 * 60 + 18 * 60 * 60 + 6 * 60) * 1000

function formatCountdown(ms: number): string {
  const total = Math.max(0, ms)
  const totalSec = Math.floor(total / 1000)
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const mins = Math.floor((totalSec % 3600) / 60)
  return `${days}d ${hours}h ${String(mins).padStart(2, '0')}m`
}

export default function VersionBPage() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [noTransition, setNoTransition] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [gameDownloaded, setGameDownloaded] = useState(false)
  const [countdownText, setCountdownText] = useState(formatCountdown(COUNTDOWN_MS))
  const countdownEnd = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)

  const TRACK = [...SLIDES, SLIDES[0]]

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(prev => prev + 1)
    }, 3500)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetTimer])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('downloaded') === 'true') {
      setGameDownloaded(true)
      setShowDownloadModal(true)
      router.replace('/version-b')
    }
  }, [])

  useEffect(() => {
    if (!gameDownloaded) return
    if (!countdownEnd.current) {
      countdownEnd.current = Date.now() + COUNTDOWN_MS
    }
    const tick = () => {
      setCountdownText(formatCountdown(countdownEnd.current! - Date.now()))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [gameDownloaded])

  useEffect(() => {
    if (current !== SLIDES.length) return
    const t = setTimeout(() => {
      setNoTransition(true)
      setCurrent(0)
    }, 500)
    return () => clearTimeout(t)
  }, [current])

  useEffect(() => {
    if (!noTransition) return
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setNoTransition(false))
    )
    return () => cancelAnimationFrame(raf)
  }, [noTransition])

  const goTo = (idx: number) => {
    setNoTransition(false)
    setCurrent(idx)
    resetTimer()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      goTo(diff > 0
        ? (current + 1) % SLIDES.length
        : (current - 1 + SLIDES.length) % SLIDES.length
      )
    }
  }

  const activeDot = current % SLIDES.length

  return (
    <div className="flex flex-col h-screen w-full max-w-[390px] mx-auto bg-white relative overflow-hidden">

      {/* Dev badge — remove before study goes live */}
      <div className="fixed top-3 right-3 z-50 bg-green-500 text-white text-[10px] font-bold px-2 py-[3px] rounded pointer-events-none">
        Version B
      </div>

      {/* ── Header ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-20 bg-white flex h-[56px] items-center justify-between px-4 shrink-0"
        style={{ boxShadow: '0px 4px 2px rgba(0,0,0,0.25)' }}
      >
        <div className="h-[31px] w-8 shrink-0">
          <img src={A.logo} alt="KashKick" className="h-full w-full object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[34px] w-[34px] flex items-center justify-center">
            <img src={A.bell} alt="Notifications" className="h-6 w-6 object-contain" />
          </div>
          <div className="flex items-center gap-[6px] h-8 px-[6px] py-0.5 bg-[#e5ffef] border border-[#39d667] rounded">
            <img src={A.money} alt="" className="h-[15px] w-[20px] object-contain shrink-0" />
            <span className="text-[14px] leading-5 text-[#484649] whitespace-nowrap" style={hv(700)}>$0.00</span>
          </div>
          <div className="flex items-center gap-[6px] h-8 px-[6px] py-0.5 bg-white border border-[#8bbfff] rounded">
            <img src={A.ticketIcon} alt="" className="h-[18px] w-[19px] object-contain shrink-0" />
            <span className="text-[14px] leading-5 text-[#484649] whitespace-nowrap" style={hv(700)}>0</span>
          </div>
          <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
            <img src={A.avatar} alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {/* ── Scrollable body ─────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' } as React.CSSProperties}>

        {/* Page title */}
        <div className="flex items-center justify-between p-4 bg-white">
          <p className="text-[14px] leading-5 text-[#7629a2] whitespace-nowrap shrink-0" style={pp(600)}>Games</p>
          <button
            onClick={() => setShowInfoModal(true)}
            className="relative h-6 w-6 shrink-0 flex items-center justify-center active:opacity-75"
          >
            <span className="absolute -inset-2.5" />
            <svg width="24" height="24" viewBox="0 0 12 12" fill="none">
              <path d="M6 0C2.67188 0 0 2.69531 0 6C0 9.32812 2.67188 12 6 12C9.30469 12 12 9.32812 12 6C12 2.69531 9.30469 0 6 0ZM6 3C6.39844 3 6.75 3.35156 6.75 3.75C6.75 4.17188 6.39844 4.5 6 4.5C5.57812 4.5 5.25 4.17188 5.25 3.75C5.25 3.35156 5.57812 3 6 3ZM6.9375 9H5.0625C4.73438 9 4.5 8.76562 4.5 8.4375C4.5 8.13281 4.73438 7.875 5.0625 7.875H5.4375V6.375H5.25C4.92188 6.375 4.6875 6.14062 4.6875 5.8125C4.6875 5.50781 4.92188 5.25 5.25 5.25H6C6.30469 5.25 6.5625 5.50781 6.5625 5.8125V7.875H6.9375C7.24219 7.875 7.5 8.13281 7.5 8.4375C7.5 8.76562 7.24219 9 6.9375 9Z" fill="#7629A2"/>
            </svg>
          </button>
        </div>

        {/* Featured carousel */}
        <div
          className="relative h-[188px] w-full shrink-0 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full"
            style={{
              width: `${TRACK.length * 100}%`,
              transform: `translateX(-${current * (100 / TRACK.length)}%)`,
              transition: noTransition ? 'none' : 'transform 500ms ease-in-out',
            }}
          >
            {TRACK.map((slide, i) => (
              <div key={i} className="relative h-full" style={{ width: `${100 / TRACK.length}%` }}>
                {slide.bg
                  ? <img src={slide.bg} alt={slide.game} className="absolute inset-0 w-full h-full object-cover" />
                  : <div className="absolute inset-0 bg-[#c6c6c6]" />
                }
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(48.63deg, rgba(67,15,102,0.8) 8.98%, rgba(0,0,0,0) 99.16%)' }}
                />
                <div className="absolute left-4 flex flex-col gap-2" style={{ top: 113 }}>
                  <span className="text-[14px] leading-5 text-white whitespace-nowrap" style={pp(600)}>{slide.game}</span>
                  <div className="h-6 px-3 bg-[#67e58c] rounded-[24px] flex items-center justify-center self-start">
                    <span className="text-[14px] leading-5 text-[#320b4d] whitespace-nowrap" style={pp(600)}>{slide.earn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute left-0 right-0 flex justify-center gap-2" style={{ top: 164, padding: '4px 0' }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full transition-opacity duration-300 ${i === activeDot ? 'bg-white opacity-100' : 'bg-white opacity-40'}`}
              />
            ))}
          </div>
        </div>

        {/* ── Keep Playing (post-download) ─────────────────── */}
        {gameDownloaded && (
          <div className="flex flex-col shrink-0">
            <div className="bg-white px-4 py-4">
              <p className="text-[18px] leading-[26px] text-[#320b4d]" style={pp(600)}>Keep Playing</p>
            </div>
            <div
              className="bg-[#f0dff7]"
              style={{ boxShadow: 'inset 0px -4px 4px rgba(0,0,0,0.2), inset 0px 4px 4px rgba(0,0,0,0.2)' }}
            >
              <div style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', scrollPaddingLeft: 16, scrollbarWidth: 'none' } as React.CSSProperties}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16, minWidth: 'max-content' }}>
                  <KeepPlayingCard
                    thumbnailSrc="/game-wall/kp-thumbnail-1.png"
                    missionText="Complete Level 4"
                    countdown="6d 112h 11m"
                  />
                  <KeepPlayingCard
                    thumbnailSrc="/game-wall/kp-thumbnail-2.png"
                    missionText="Reach Island 3"
                    countdown={countdownText}
                    onPlay={() => router.push('/version-b/game-detail/gameplay')}
                  onMissions={() => router.push('/version-b/game-detail?tab=missions')}
                  />
                  <MoreGamesCard />
                  <KeepPlayingCard
                    thumbnailSrc="/game-wall/kp-thumbnail-3.png"
                    missionText="Complete Level 5"
                    countdown="6d 13h 03m"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── KashKick Community Picks ──────────────────────── */}
        <CategorySection title="KashKick Community Picks">
          <SectionRow>
            {COMMUNITY_PICKS.map((g, i) => (
              <PortraitCard key={i} imageSrc={g.image} title={g.title} value={g.value} badge={g.badge} />
            ))}
          </SectionRow>
        </CategorySection>

        {/* ── Because You Like Merge Games ─────────────────── */}
        <CategorySection title="Because You Like Merge Games">
          <SectionRow>
            <ImagePortraitCard imageSrc="/game-wall/mg-dice-dreams.png" />
            {!gameDownloaded && (
              <ImagePortraitCard
                imageSrc="/game-wall/animals-coins-portrait.png"
                onClick={() => router.push('/version-b/game-detail')}
              />
            )}
            <ImagePortraitCard imageSrc="/game-wall/mg-recommended.png" badge="recommended" />
            <ImagePortraitCard imageSrc="/game-wall/mg-4.png" />
            <ImagePortraitCard imageSrc="/game-wall/mg-5.png" />
            <ImagePortraitCard imageSrc="/game-wall/mg-6.png" />
          </SectionRow>
        </CategorySection>

        {/* ── Big Rewards, Small Sessions ──────────────────── */}
        <CategorySection title="Big Rewards, Small Sessions">
          <SectionRow>
            {BIG_REWARDS.map((g, i) => (
              <SmallSquareCard key={i} title={g.title} value={g.value} imageSrc={g.image} badge={g.badge} />
            ))}
          </SectionRow>
        </CategorySection>

        {/* ── Reward Rush ──────────────────────────────────── */}
        <CategorySection title="Reward Rush">
          <div className="flex flex-col gap-[16px] px-[16px] pb-[16px]">
            {REWARD_RUSH.map((g, i) => (
              <RewardRushCard key={i} imageSrc={g.image} title={g.title} category={g.category} value={g.value} />
            ))}
          </div>
        </CategorySection>

        {/* ── Your Next Obsession ──────────────────────────── */}
        <CategorySection title="Your Next Obsession">
          <SectionRow>
            {NEXT_OBSESSION.map((card, i) =>
              card.type === 'video'
                ? <VideoCard key={i} src={card.src} />
                : <WideCard key={i} imageSrc={card.src} />
            )}
          </SectionRow>
        </CategorySection>

        {/* ── Fastest to First Reward ──────────────────────── */}
        <CategorySection title="Fastest to First Reward" pb={64}>
          <SectionRow>
            {FASTEST_REWARD.map((g, i) => (
              <ImagePortraitCard key={i} imageSrc={g.image} badge={g.badge} />
            ))}
          </SectionRow>
        </CategorySection>

      </main>

      {/* ── Bottom navigation ──────────────────────────────── */}
      <nav className="bg-[#7629a2] flex items-center justify-center h-16 px-2 gap-[13px] shrink-0">
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-12 rounded-[6px]">
          <img src={A.navHome} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Home</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] bg-[#fc0] rounded-[6px]">
          <img src={A.navGames} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-[#320b4d] whitespace-nowrap" style={pp(500)}>Games</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] rounded-[6px]">
          <img src={A.navDeals} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Deals</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] rounded-[6px]">
          <img src={A.navSurveys} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Surveys</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] rounded-[6px]">
          <img src={A.navGiveaways} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Giveaways</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] rounded-[6px]">
          <img src={A.navShopping} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Shopping</span>
        </button>
      </nav>

      {/* ── Download Confirmed bottom sheet ────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${showDownloadModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowDownloadModal(false)}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto z-50 bg-white rounded-tl-[16px] rounded-tr-[16px] flex flex-col transition-transform duration-300 ease-out ${showDownloadModal ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-16 h-1 bg-[#e0e0e0] rounded-full" />
        </div>
        <div className="flex justify-center pt-2 pb-0">
          <img src="/game-wall/download-confirmed.svg" alt="Download Confirmed" className="w-[220px] h-auto object-contain" />
        </div>
        <div className="flex flex-col items-center gap-1 px-6 pb-6 pt-4 text-center">
          <p className="text-[20px] leading-7 text-[#7629a2]" style={pp(600)}>Animals &amp; Coins</p>
          <p className="text-[14px] leading-5 text-[#484649]" style={hv(400)}>
            Start playing now to earn your first reward the clock is ticking!
          </p>
        </div>
        <div className="h-px bg-[#e0e0e0] w-full shrink-0" />
        <div className="h-20 flex items-center justify-center shrink-0">
          <button
            onClick={() => setShowDownloadModal(false)}
            className="bg-[#7629a2] h-12 w-[184px] rounded-[100px] flex items-center justify-center min-h-[44px] active:opacity-75"
          >
            <span className="text-[16px] leading-6 text-white" style={pp(700)}>Continue</span>
          </button>
        </div>
      </div>

      {/* ── Info bottom sheet ───────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${showInfoModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowInfoModal(false)}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto z-50 bg-white rounded-tl-[16px] rounded-tr-[16px] flex flex-col max-h-[90vh] transition-transform duration-300 ease-out ${showInfoModal ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-16 h-[5px] bg-[#e6e1e5] rounded-full" />
        </div>
        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 flex flex-col gap-4">
          <div className="flex justify-center">
            <img src="/game-wall/modal-illustration.svg" alt="" className="w-[240px] h-[184px] object-contain" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[26px] leading-[34px] text-[#7629a2]" style={pp(600)}>Accept the Challenge</p>
            <p className="text-[16px] leading-[22px] text-[#320b4d]" style={hv(400)}>
              Convert your gaming skills into money! Play top games, complete levels, and earn kash while having fun.
            </p>
            <div>
              <p className="text-[14px] leading-5 text-black" style={hv(700)}>How to Earn:</p>
              <ol className="list-decimal pl-5 text-[14px] leading-5 text-black" style={hv(400)}>
                <li>Pick a game you&apos;ve never played.</li>
                <li>Check game details, goals, and rewards.</li>
                <li>Tap <span style={hv(700)}>Begin Challenge</span> to install the game.</li>
                <li><span style={hv(700)}>Allow tracking</span> in KashKick and the game app.</li>
                <li>Play and earn!</li>
              </ol>
            </div>
            <div className="flex items-center gap-2 bg-[#faf2fc] rounded-[8px] px-4 py-2">
              <img src="/game-wall/modal-sensei-avatar.png" alt="" className="w-8 h-8 rounded-full shrink-0 object-cover" />
              <p className="text-[12px] leading-4 text-black" style={hv(400)}>
                <span style={hv(700)}>Master Tip: </span>
                Focus on <span style={hv(700)}>one game at a time</span> to maximize earnings!
              </p>
            </div>
            <p className="text-[14px] leading-5 text-[#5f1c8c] underline" style={hv(400)}>Learn more</p>
          </div>
        </div>
        <div className="border-t border-[#e6e1e5] h-20 flex items-center justify-center shrink-0">
          <button
            onClick={() => setShowInfoModal(false)}
            className="bg-[#7629a2] h-12 w-[184px] rounded-[100px] flex items-center justify-center min-h-[44px] active:opacity-75"
          >
            <span className="text-[16px] leading-6 text-white" style={pp(700)}>Close</span>
          </button>
        </div>
      </div>

    </div>
  )
}
