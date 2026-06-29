'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const SLIDES = [
  { game: 'Dice Dreams',             earn: 'Earn $815', bg: '/game-wall/featured-carousel.png' },
  { game: 'Star Trek: Fleet Command', earn: 'Earn $550', bg: '/game-wall/carousel-star-trek.jpg' },
  { game: 'Family Island',           earn: 'Earn $375', bg: '/game-wall/carousel-family-island.jpg' },
  { game: 'Scrabble GO',             earn: 'Earn $150', bg: '/game-wall/carousel-scrabble-go.jpg' },
  { game: 'Bingo Blitz',             earn: 'Earn $330', bg: '/game-wall/carousel-bingo-blitz.png' },
]

const GAMES = [
  { id: 'candy-crush',        title: 'Candy crush Saga',           description: 'Your Relaxing Puzzle Escape!',                                              earn: 'Earn $55',  image: '/game-wall/candy-crush.png' },
  { id: 'animals-coins',      title: 'Animals & Coins',             description: 'Spin, raid and build your island empire as the ultimate coin master.',        earn: 'Earn $340', image: '/game-wall/animals-coins-card-bg.png', navigable: true },
  { id: 'monopoly-go',        title: 'Monopoly GO!',                description: 'Roll, Build, dream & Scheme!',                                               earn: 'Earn $630', image: '/game-wall/monopoly-go.png' },
  { id: 'solitaire',          title: 'Solitaire.com: Classic Cards', description: 'Relax and enjoy classic solitaire anytime, anywhere',                        earn: 'Earn $105', image: '/game-wall/solitaire.png' },
  { id: 'raid',               title: 'RAID: Shadow Legends',        description: 'RPG, Fantasy & Live PvP Arena',                                               earn: 'Earn $840', image: '/game-wall/raid-shadow-legends.png' },
  { id: 'block-jam',          title: 'Block Jam 3D: Color Puzzle',  description: 'Match bright 3D blocks and relax with endless puzzles!',                      earn: 'Earn $255', image: '/game-wall/block-jam-3d.png' },
  { id: 'tetris',             title: 'Tetris Block Party',          description: 'Tetris® Block Party: The Ultimate Block Puzzle Adventure! 🧩🎉',              earn: 'Earn $235', image: '/game-wall/tetris-block-party.png' },
]

// Asset URLs — stored in /public/game-wall/
const A = {
  logo:          '/game-wall/logo.svg',
  avatar:        '/game-wall/avatar.png',
  money:         '/game-wall/money.svg',
  ticketIcon:    '/game-wall/tickets.svg',
  bell:          '/game-wall/notification-bell.svg',
  infoCircle:    '/game-wall/info-circle.svg',
  carousel:      '/game-wall/featured-carousel.png',
  carouselDots:  '/game-wall/carousel-dots.png',
  layoutIcon:    '/game-wall/layout-icon.png',
  filter:        '/game-wall/filter.svg',
  search:        '/game-wall/search.svg',
  sort:          '/game-wall/sort.svg',
  chevronRight:  '/game-wall/chevron-right.svg',
  navHome:       '/game-wall/nav-home.svg',
  navGames:      '/game-wall/nav-games.svg',
  navDeals:      '/game-wall/nav-deals.svg',
  navSurveys:    '/game-wall/nav-surveys.svg',
  navGiveaways:  '/game-wall/nav-giveaways.svg',
  navShopping:   '/game-wall/nav-shopping.svg',
}

function fireClarity(event: string, data?: Record<string, string>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = typeof window !== 'undefined' ? (window as any).clarity : null
  if (!c) return
  if (data) Object.entries(data).forEach(([k, v]) => c('set', k, v))
  c('event', event)
}

const pp = (weight: 400 | 500 | 600 | 700): React.CSSProperties => ({
  fontFamily: 'var(--font-poppins), sans-serif',
  fontWeight: weight,
})

const hv = (weight: 400 | 700): React.CSSProperties => ({
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  fontWeight: weight,
})

export default function GameWallPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'available' | 'my-games'>('available')
  const [current, setCurrent] = useState(0)
  const [noTransition, setNoTransition] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [gameDownloaded, setGameDownloaded] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)

  // Track = real slides + clone of first slide for seamless looping
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
      setShowDownloadModal(true)
      setGameDownloaded(true)
      router.replace('/game-wall')
    }
  }, [])

  // When we land on the clone (index 5), wait for animation to finish
  // then silently snap back to index 0
  useEffect(() => {
    if (current !== SLIDES.length) return
    const timeout = setTimeout(() => {
      setNoTransition(true)
      setCurrent(0)
    }, 500)
    return () => clearTimeout(timeout)
  }, [current])

  // Re-enable transition one frame after the silent snap
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
        Version A
      </div>

      {/* ── Header ───────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-20 bg-white flex h-[56px] items-center justify-between px-4 shrink-0"
        style={{ boxShadow: '0px 4px 2px rgba(0,0,0,0.25)' }}
      >
        {/* KashKick logo */}
        <div className="h-[31px] w-8 shrink-0">
          <img src={A.logo} alt="KashKick" className="h-full w-full object-contain" />
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <div className="h-[34px] w-[34px] flex items-center justify-center">
            <img src={A.bell} alt="Notifications" className="h-6 w-6 object-contain" />
          </div>

          {/* Cash balance */}
          <div className="flex items-center gap-[6px] h-8 px-[6px] py-0.5 bg-[#e5ffef] border border-[#39d667] rounded">
            <img src={A.money} alt="" className="h-[15px] w-[20px] object-contain shrink-0" />
            <span className="text-[14px] leading-5 text-[#484649] whitespace-nowrap" style={hv(700)}>
              $0.00
            </span>
          </div>

          {/* Ticket balance */}
          <div className="flex items-center gap-[6px] h-8 px-[6px] py-0.5 bg-white border border-[#8bbfff] rounded">
            <img src={A.ticketIcon} alt="" className="h-[18px] w-[19px] object-contain shrink-0" />
            <span className="text-[14px] leading-5 text-[#484649] whitespace-nowrap" style={hv(700)}>
              0
            </span>
          </div>

          {/* Avatar */}
          <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
            <img src={A.avatar} alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {/* ── Scrollable body ──────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>

        {/* Page title */}
        <div className="flex items-center justify-between p-4 bg-white">
          <p className="text-[14px] leading-5 text-[#7629a2] whitespace-nowrap shrink-0" style={pp(600)}>
            Games
          </p>
          <button
            onClick={() => setShowInfoModal(true)}
            className="relative h-6 w-6 shrink-0 flex items-center justify-center active:opacity-75"
          >
            <span className="absolute -inset-2.5" />
            <svg width="24" height="24" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          {/* Slides track — TRACK includes clone of slide 0 at end for seamless loop */}
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
                {/* Background — replace null with image path when assets arrive */}
                {slide.bg
                  ? <img src={slide.bg} alt={slide.game} className="absolute inset-0 w-full h-full object-cover" />
                  : <div className="absolute inset-0 bg-[#c6c6c6]" />
                }
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(48.63deg, rgba(67,15,102,0.8) 8.98%, rgba(0,0,0,0) 99.16%)' }}
                />
                {/* Title + earn tag */}
                <div className="absolute left-4 flex flex-col gap-2" style={{ top: 113 }}>
                  <span className="text-[14px] leading-5 text-white whitespace-nowrap" style={pp(600)}>
                    {slide.game}
                  </span>
                  <div className="h-6 px-3 bg-[#67e58c] rounded-[24px] flex items-center justify-center self-start">
                    <span className="text-[14px] leading-5 text-[#320b4d] whitespace-nowrap" style={pp(600)}>
                      {slide.earn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
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

        {/* Tab bar */}
        <div className="bg-[#faf2fc] flex items-end h-16 shrink-0">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex items-center justify-center w-[120px] h-12 border-t border-l border-r rounded-tl-[12px] rounded-tr-[12px] min-h-[44px] transition-colors active:opacity-75 ${
              activeTab === 'available'
                ? 'bg-white border-[#8e3bb8]'
                : 'bg-[#f0dff7] border-[#cd95e5]'
            }`}
          >
            <span
              className="text-[16px] leading-5 text-[#5f1c8c] tracking-[0.1px] whitespace-nowrap"
              style={activeTab === 'available' ? hv(700) : hv(400)}
            >
              Available
            </span>
          </button>
          <button
            onClick={() => setActiveTab('my-games')}
            className={`flex items-center justify-center w-[120px] h-12 border-t border-l border-r rounded-tl-[12px] rounded-tr-[12px] min-h-[44px] transition-colors active:opacity-75 ${
              activeTab === 'my-games'
                ? 'bg-white border-[#8e3bb8]'
                : 'bg-[#f0dff7] border-[#cd95e5]'
            }`}
          >
            <span
              className="text-[16px] leading-5 text-[#5f1c8c] tracking-[0.1px] whitespace-nowrap"
              style={activeTab === 'my-games' ? hv(700) : hv(400)}
            >
              My Games
            </span>
          </button>
        </div>

        {/* ── Available tab content ─────────────────────────── */}
        {activeTab === 'available' && (
          <>
            {/* Controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#e6e1e5]">
              <div className="flex items-center gap-4">
                {/* Filter pill */}
                <button
                  onClick={() => { fireClarity('category_row_tap', { row: 'filter' }) }}
                  className="flex items-center gap-2 h-12 px-6 py-1 bg-[#7629a2] rounded-[24px] min-h-[44px]"
                >
                  <img src={A.filter} alt="" className="h-5 w-5 object-contain shrink-0" />
                  <span className="text-[16px] leading-none text-white whitespace-nowrap" style={hv(700)}>
                    (36)
                  </span>
                </button>
                {/* Search */}
                <button
                  onClick={() => {}}
                  className="relative h-12 w-12 rounded-[24px] bg-[#faf2fc] flex items-center justify-center min-h-[44px] min-w-[44px]"
                >
                  <img src={A.search} alt="Search" className="h-8 w-8 object-contain" />
                </button>
              </div>
              {/* Sort */}
              <button
                onClick={() => {}}
                className="relative h-12 w-12 rounded-[24px] bg-[#faf2fc] flex items-center justify-center min-h-[44px] min-w-[44px]"
              >
                <img src={A.sort} alt="Sort" className="h-8 w-8 object-contain" />
              </button>
            </div>

            {/* Game cards */}
            <div className="flex flex-col gap-4 px-4 pt-4 pb-8 bg-white">
              {GAMES.map((game) => {
                if (game.navigable && gameDownloaded) return null
                return (
                  <div
                    key={game.id}
                    onClick={game.navigable ? () => router.push('/game-wall/game-detail') : undefined}
                    className={`flex flex-col w-full rounded-[16px] min-w-[320px]${game.navigable ? ' active:opacity-75' : ''}`}
                    style={{ boxShadow: '0px 4px 6px rgba(0,0,0,0.16)' }}
                  >
                    <div className="h-[200px] w-full rounded-t-[16px] overflow-hidden bg-[#c6c6c6]">
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white flex flex-col rounded-b-[16px]">
                      <div className="px-4 py-2 border-b border-[#e0e0e0]">
                        <p className="text-[20px] leading-7 text-[#484649] w-full" style={pp(600)}>{game.title}</p>
                        <p className="text-[16px] leading-[22px] text-[#484649] w-full" style={hv(400)}>{game.description}</p>
                      </div>
                      <div className="flex items-center justify-between px-4 py-[7px] h-16">
                        <button
                          onClick={(e) => { e.stopPropagation(); fireClarity('game_card_learn_more', { game: game.id }) }}
                          className="flex items-center gap-1 h-12 px-3 rounded-[100px] min-h-[44px] w-[127px]"
                        >
                          <span className="text-[18px] leading-[22px] text-[#7629a2] whitespace-nowrap" style={pp(700)}>Learn more</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); fireClarity('game_card_earn', { game: game.id }); if (game.navigable) router.push('/game-wall/game-detail') }}
                          className="flex items-center gap-1 h-12 pl-5 pr-[9px] py-3 bg-[#0c7a20] rounded-[100px] min-h-[44px] min-w-[104px] active:opacity-75"
                        >
                          <span className="text-[16px] leading-6 text-white text-center whitespace-nowrap" style={pp(700)}>{game.earn}</span>
                          <div className="relative h-6 w-6 shrink-0">
                            <img src={A.chevronRight} alt="" className="absolute inset-0 w-full h-full object-contain" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* ── My Games tab content ──────────────────────────── */}
        {activeTab === 'my-games' && (
          <div className="flex flex-col gap-4 px-4 pt-4 pb-12 bg-white">
            {gameDownloaded ? (
              <>
                {[
                  { id: 'animals-coins', title: 'Animals & Coins', description: 'Spin, raid and build your island empire as the ultimate coin master.', earn: 'Earn $340', image: '/game-wall/animals-coins-card-bg.png', navigable: true },
                  { id: 'phase-10',      title: 'Phase 10: Casual Card Game',  description: 'Race to complete 10 phases in this beloved rummy inspired card game.', earn: 'Earn $360', image: '/game-wall/phase-10.png' },
                  { id: 'scrabble-go',   title: 'Scrabble GO: Fun with Words', description: 'Play Word Games with Friends!',                                          earn: 'Earn $150', image: '/game-wall/scrabble-go.png' },
                ].map((game) => (
                  <div
                    key={game.id}
                    onClick={game.navigable ? () => router.push('/game-wall/game-detail') : undefined}
                    className={`flex flex-col w-full rounded-[16px] min-w-[320px]${game.navigable ? ' active:opacity-75' : ''}`}
                    style={{ boxShadow: '0px 4px 6px rgba(0,0,0,0.16)' }}
                  >
                    <div className="h-[200px] w-full rounded-t-[16px] overflow-hidden bg-[#c6c6c6]">
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white flex flex-col rounded-b-[16px]">
                      <div className="px-4 py-2 border-b border-[#e0e0e0]">
                        <p className="text-[20px] leading-7 text-[#484649] w-full" style={pp(600)}>{game.title}</p>
                        <p className="text-[16px] leading-[22px] text-[#484649] w-full" style={hv(400)}>{game.description}</p>
                      </div>
                      <div className="flex items-center justify-between px-4 py-[7px] h-16">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 h-12 px-3 rounded-[100px] min-h-[44px] w-[127px]"
                        >
                          <span className="text-[18px] leading-[22px] text-[#7629a2] whitespace-nowrap" style={pp(700)}>Learn more</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); if (game.navigable) router.push('/game-wall/game-detail') }}
                          className="flex items-center gap-1 h-12 pl-5 pr-[9px] py-3 bg-[#0c7a20] rounded-[100px] min-h-[44px] min-w-[104px] active:opacity-75"
                        >
                          <span className="text-[16px] leading-6 text-white text-center whitespace-nowrap" style={pp(700)}>{game.earn}</span>
                          <div className="relative h-6 w-6 shrink-0">
                            <img src={A.chevronRight} alt="" className="absolute inset-0 w-full h-full object-contain" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center gap-3 py-4 w-full">
                <DotLottieReact
                  src="/game-wall/ninja-throwing-dice.lottie"
                  autoplay
                  loop
                  style={{ width: 240, height: 240 }}
                />
                <div className="flex flex-col items-center gap-3 px-4 w-full">
                  <p className="text-[28px] leading-8 text-black text-center tracking-[-0.28px]" style={pp(600)}>
                    No Games in Progress
                  </p>
                  <p className="text-[16px] leading-[21px] text-black text-center w-full" style={hv(400)}>
                    Take part and complete any available Games and they will be displayed here.
                  </p>
                  <div className="flex flex-col gap-3 w-full mt-1">
                    <button
                      onClick={() => setActiveTab('available')}
                      className="w-full h-10 bg-[#7629a2] rounded-[24px] flex items-center justify-center min-h-[44px] active:opacity-75"
                    >
                      <span className="text-[16px] text-white whitespace-nowrap" style={pp(700)}>See Available Games</span>
                    </button>
                    <button
                      onClick={() => {}}
                      className="w-full h-10 bg-[#7629a2] rounded-[24px] flex items-center justify-center min-h-[44px]"
                    >
                      <span className="text-[16px] text-white whitespace-nowrap" style={pp(700)}>See Available Deals</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Bottom navigation ────────────────────────────────── */}
      <nav className="bg-[#7629a2] flex items-center justify-center h-16 px-2 gap-[13px] shrink-0">
        {/* Home */}
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-12 rounded-[6px]">
          <img src={A.navHome} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Home</span>
        </button>

        {/* Games — active */}
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] bg-[#fc0] rounded-[6px]">
          <img src={A.navGames} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-[#320b4d] whitespace-nowrap" style={pp(500)}>Games</span>
        </button>

        {/* Deals */}
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] rounded-[6px]">
          <img src={A.navDeals} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Deals</span>
        </button>

        {/* Surveys */}
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] rounded-[6px]">
          <img src={A.navSurveys} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Surveys</span>
        </button>

        {/* Giveaways */}
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] rounded-[6px]">
          <img src={A.navGiveaways} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Giveaways</span>
        </button>

        {/* Shopping */}
        <button className="flex flex-col items-center justify-center gap-[2px] h-12 w-[47px] rounded-[6px]">
          <img src={A.navShopping} alt="" className="h-6 w-6 object-contain" />
          <span className="text-[8px] text-white whitespace-nowrap" style={pp(500)}>Shopping</span>
        </button>
      </nav>

      {/* ── Download Confirmed bottom sheet ─────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${showDownloadModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowDownloadModal(false)}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto z-50 bg-white rounded-tl-[16px] rounded-tr-[16px] flex flex-col transition-transform duration-300 ease-out ${showDownloadModal ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-16 h-1 bg-[#e0e0e0] rounded-full" />
        </div>

        {/* Illustration */}
        <div className="flex justify-center pt-2 pb-0">
          <img src="/game-wall/download-confirmed.svg" alt="Download Confirmed" className="w-[220px] h-auto object-contain" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1 px-6 pb-6 pt-4 text-center">
          <p className="text-[20px] leading-7 text-[#7629a2]" style={pp(600)}>Animals &amp; Coins</p>
          <p className="text-[14px] leading-5 text-[#484649]" style={hv(400)}>
            Start playing now to earn your first reward the clock is ticking!
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e0e0e0] w-full shrink-0" />

        {/* Footer */}
        <div className="h-20 flex items-center justify-center shrink-0">
          <button
            onClick={() => setShowDownloadModal(false)}
            className="bg-[#7629a2] h-12 w-[184px] rounded-[100px] flex items-center justify-center min-h-[44px] active:opacity-75"
          >
            <span className="text-[16px] leading-6 text-white" style={pp(700)}>Continue</span>
          </button>
        </div>
      </div>

      {/* ── Info bottom sheet ────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${showInfoModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowInfoModal(false)}
      />

      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto z-50 bg-white rounded-tl-[16px] rounded-tr-[16px] flex flex-col max-h-[90vh] transition-transform duration-300 ease-out ${showInfoModal ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-16 h-[5px] bg-[#e6e1e5] rounded-full" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4 flex flex-col gap-4">
          {/* Illustration */}
          <div className="flex justify-center">
            <img src="/game-wall/modal-illustration.svg" alt="" className="w-[240px] h-[184px] object-contain" />
          </div>

          {/* Text block */}
          <div className="flex flex-col gap-2">
            <p className="text-[26px] leading-[34px] text-[#7629a2]" style={pp(600)}>
              Accept the Challenge
            </p>
            <p className="text-[16px] leading-[22px] text-[#320b4d]" style={hv(400)}>
              Convert your gaming skills into money! Play top games, complete levels, and earn kash while having fun.
            </p>

            {/* Numbered list */}
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

            {/* Master Tip blurb */}
            <div className="flex items-center gap-2 bg-[#faf2fc] rounded-[8px] px-4 py-2">
              <img src="/game-wall/modal-sensei-avatar.png" alt="" className="w-8 h-8 rounded-full shrink-0 object-cover" />
              <p className="text-[12px] leading-4 text-black" style={hv(400)}>
                <span style={hv(700)}>Master Tip: </span>
                Focus on <span style={hv(700)}>one game at a time</span> to maximize earnings!
              </p>
            </div>

            {/* Learn more */}
            <p className="text-[14px] leading-5 text-[#5f1c8c] underline" style={hv(400)}>
              Learn more
            </p>
          </div>
        </div>

        {/* Footer */}
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
