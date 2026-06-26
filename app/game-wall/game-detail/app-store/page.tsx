'use client'

import { useRouter } from 'next/navigation'

const sf = (weight: 400 | 500 | 600): React.CSSProperties => ({
  fontFamily: '-apple-system, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
  fontWeight: weight,
})

const sfr = (): React.CSSProperties => ({
  fontFamily: '-apple-system, "SF Compact Rounded", system-ui, sans-serif',
  fontWeight: 600,
})

function TodayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="4.5" width="19" height="17" rx="2.5" stroke="#9ea0a1" strokeWidth="1.4"/>
      <path d="M8 2.5v4M16 2.5v4" stroke="#9ea0a1" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M2.5 9h19" stroke="#9ea0a1" strokeWidth="1"/>
      <rect x="7.5" y="13" width="3" height="3" rx="0.5" fill="#9ea0a1"/>
    </svg>
  )
}

function GamesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17.5 7h-11a3 3 0 00-2.8 2L2 15.5a2 2 0 003.6 1.2L7 15h10l1.4 1.7A2 2 0 0022 15.5L20.3 9A3 3 0 0017.5 7z" stroke="#9ea0a1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 11h2M10 10v2" stroke="#9ea0a1" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="15" cy="11" r="0.8" fill="#9ea0a1"/>
      <circle cx="17" cy="11" r="0.8" fill="#9ea0a1"/>
    </svg>
  )
}

function AppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="#9ea0a1" strokeWidth="1.4"/>
      <rect x="13" y="3" width="8" height="8" rx="2" stroke="#9ea0a1" strokeWidth="1.4"/>
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="#9ea0a1" strokeWidth="1.4"/>
      <rect x="13" y="13" width="8" height="8" rx="2" stroke="#9ea0a1" strokeWidth="1.4"/>
    </svg>
  )
}

function ArcadeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 9a6 6 0 0112 0v7a2 2 0 01-2 2H8a2 2 0 01-2-2V9z" stroke="#9ea0a1" strokeWidth="1.4"/>
      <path d="M12 12v3M10.5 13.5h3" stroke="#9ea0a1" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="8.5" cy="11" r="0.8" fill="#9ea0a1"/>
      <circle cx="15.5" cy="11" r="0.8" fill="#9ea0a1"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="#3478f6" strokeWidth="1.8"/>
      <path d="M15.5 15.5L21 21" stroke="#3478f6" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function TabItem({ label, active = false, children }: { label: string; active?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-0.5 w-[61px]">
      <div className="h-6 w-6 flex items-center justify-center">{children}</div>
      <span
        className="text-[11px] tracking-[-0.22px]"
        style={{ ...sf(400), color: active ? '#3478f6' : '#9ea0a1' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function AppStorePage() {
  const router = useRouter()

  return (
    <div className="flex flex-col w-full max-w-[390px] mx-auto bg-white min-h-screen relative overflow-hidden">

      {/* iOS Status Bar */}
      <div className="h-12 flex items-center justify-between px-[29px] shrink-0">
        <span className="text-[18px] text-black tracking-[-0.18px]" style={sf(600)}>09:47</span>
        <div className="flex items-center gap-[5px]">
          {/* Signal bars */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="8" width="3" height="4" rx="0.5" fill="black"/>
            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" fill="black"/>
            <rect x="9" y="3" width="3" height="9" rx="0.5" fill="black"/>
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="black"/>
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <circle cx="8" cy="10.5" r="1" fill="black"/>
            <path d="M5.2 7.8C6 7 6.95 6.5 8 6.5s2 .5 2.8 1.3" stroke="black" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M2.5 5C4 3.5 5.9 2.5 8 2.5S12 3.5 13.5 5" stroke="black" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          {/* Battery */}
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="black" strokeOpacity="0.35"/>
            <rect x="2" y="2" width="17" height="8" rx="2" fill="black"/>
            <path d="M23 4v4c.9-.5 1.5-1.2 1.5-2S23.9 4.5 23 4z" fill="black" fillOpacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto pb-[83px]">

        {/* Padded content wrapper */}
        <div className="px-4 flex flex-col gap-[5px] pb-[5px]">

          {/* Back */}
          <button
            onClick={() => router.push('/game-wall/game-detail?tab=missions')}
            className="flex items-center gap-[8px] h-[44px] self-start active:opacity-75"
          >
            <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
              <path d="M9.5 17.5L1.5 9.5L9.5 1.5" stroke="#3478F6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[17px] text-[#3478f6]" style={sf(400)}>Back</span>
          </button>

          {/* App Info */}
          <div className="flex items-start justify-between shrink-0">
            {/* App icon */}
            <div className="h-[118px] w-[118px] rounded-[26px] bg-black overflow-hidden shrink-0" style={{ border: '0.5px solid rgba(0,0,0,0.16)' }}>
              <img src="/game-wall/animals-coins-icon.webp" alt="Animals & Coins" className="h-full w-full object-cover" />
            </div>
            {/* Name + controls */}
            <div className="flex flex-col gap-[10px] w-[205px]">
              <div className="flex flex-col">
                <p className="text-[17px] text-black leading-[22px]" style={sf(600)}>Animals &amp; Coins</p>
                <p className="text-[15px] text-[#8a8a8d] leading-[19px]" style={sf(400)}>Join players in this animal adventure game.</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <button onClick={() => router.push('/game-wall/game-detail/gameplay')} className="h-[28px] w-[72px] rounded-[25px] bg-[#3478f6] flex items-center justify-center active:opacity-75">
                  <span className="text-[16px] text-white" style={sf(500)}>Get</span>
                </button>
                {/* Share */}
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                  <path d="M9 14V1M9 1L5 5M9 1l4 4" stroke="#3478f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 11v8a1 1 0 001 1h14a1 1 0 001-1v-8" stroke="#3478f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* App Data — 3 stats */}
          <div className="flex items-center py-2.5 w-full">
            <div className="flex-1 flex flex-col gap-1 items-center">
              <p className="text-[11px] text-[#8d8f93] leading-5 uppercase" style={sf(400)}>1.05M Ratings</p>
              <p className="text-[23px] text-[#8d8f93] leading-none" style={sfr()}>4.9</p>
              <p className="text-[11px] text-[#8d8f93]" style={sf(400)}>★★★★★</p>
            </div>
            <div className="w-px h-10 bg-[#c6c6c8]" />
            <div className="flex-1 flex flex-col gap-1 items-center">
              <p className="text-[11px] text-[#8d8f93] leading-5 uppercase" style={sf(400)}>Age Rating</p>
              <p className="text-[23px] text-[#8d8f93] leading-none" style={sfr()}>9+</p>
              <p className="text-[11px] text-[#8d8f93] leading-[14px]" style={sf(400)}>Years Old</p>
            </div>
            <div className="w-px h-10 bg-[#c6c6c8]" />
            <div className="flex-1 flex flex-col gap-1 items-center">
              <p className="text-[11px] text-[#8d8f93] leading-5 uppercase" style={sf(400)}>Chart</p>
              <div className="flex items-baseline">
                <span className="text-[13px] text-[#8d8f93] leading-[22px]" style={sfr()}>#</span>
                <span className="text-[23px] text-[#8d8f93] leading-none" style={sfr()}>3</span>
              </div>
              <p className="text-[11px] text-[#8d8f93] leading-[14px]" style={sf(400)}>Adventure</p>
            </div>
          </div>

        </div>

        {/* Screenshots — horizontally scrollable, bleeds to edge */}
        <div className="flex gap-2.5 pl-4 overflow-x-auto pb-[5px]" style={{ scrollSnapType: 'x mandatory' }}>
          <div className="h-[498px] w-[230px] rounded-[23px] overflow-hidden shrink-0" style={{ scrollSnapAlign: 'start' }}>
            <img src="/game-wall/animals-coins-ss1.webp" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="h-[498px] w-[230px] rounded-[23px] overflow-hidden shrink-0" style={{ scrollSnapAlign: 'start' }}>
            <img src="/game-wall/animals-coins-ss2.webp" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="h-[498px] w-[230px] rounded-[23px] overflow-hidden shrink-0 mr-4" style={{ scrollSnapAlign: 'start' }}>
            <img src="/game-wall/animals-coins-ss3.webp" alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Padded content below screenshots */}
        <div className="px-4 flex flex-col gap-[5px]">

          {/* Device row */}
          <div
            className="flex items-center justify-between py-2.5 w-full"
            style={{ borderBottom: '0.5px solid #c6c6c8' }}
          >
            <div className="flex items-center gap-1.5 text-[#8a898e]">
              <svg width="13" height="19" viewBox="0 0 13 19" fill="none">
                <rect x="0.75" y="0.75" width="11.5" height="17.5" rx="2.25" stroke="#8a898e" strokeWidth="1.2"/>
                <path d="M4.5 2.5h4" stroke="#8a898e" strokeWidth="1" strokeLinecap="round"/>
                <circle cx="6.5" cy="16" r="0.8" fill="#8a898e"/>
              </svg>
              <span className="text-[13px] text-[#8a898e]" style={sf(400)}>iPhone App</span>
            </div>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#8a898e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Description */}
          <p className="text-[15px] text-black leading-normal" style={sf(400)}>
            {`Join players around the globe in this animal adventure game. Build treasure islands and bridges, raid your friends' bases, collect coins, unlock new pet characters, and go on a journey to explore the legendary animal kingdom!\n\nBuild animal treasure islands, conquer different islands, steal coins from other players, including your friends, win mini-games to find loot, and become the true ruler of the animal kingdom!`}
          </p>

        </div>

      </div>

      {/* iOS Bottom Tab Bar — fixed */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] h-[83px] flex items-start justify-around px-2 pt-2"
        style={{ background: 'rgba(252,252,252,0.9)', backdropFilter: 'blur(9px)', boxShadow: '0px -0.5px 0px 0px rgba(0,0,0,0.3)' }}
      >
        <TabItem label="Today"><TodayIcon /></TabItem>
        <TabItem label="Games"><GamesIcon /></TabItem>
        <TabItem label="App"><AppIcon /></TabItem>
        <TabItem label="Arcade"><ArcadeIcon /></TabItem>
        <TabItem label="Search" active><SearchIcon /></TabItem>
      </div>

    </div>
  )
}
