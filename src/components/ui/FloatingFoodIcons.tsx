'use client';

const ICONS = [
  // Left edge
  { emoji: '🥐', top: '4%',  left: '1%',   anim: 'float-a', dur: '4s',   delay: '0s',   size: '2rem',   opacity: 0.28 },
  { emoji: '🌮', top: '18%', left: '0.5%', anim: 'float-b', dur: '5.5s', delay: '1.2s', size: '1.8rem', opacity: 0.25 },
  { emoji: '🍜', top: '33%', left: '1.5%', anim: 'float-c', dur: '6s',   delay: '0.6s', size: '2rem',   opacity: 0.26 },
  { emoji: '🧁', top: '48%', left: '0.8%', anim: 'float-a', dur: '4.8s', delay: '2s',   size: '1.8rem', opacity: 0.24 },
  { emoji: '🍎', top: '62%', left: '1.5%', anim: 'float-b', dur: '5.2s', delay: '0.4s', size: '1.9rem', opacity: 0.25 },
  { emoji: '🥑', top: '76%', left: '0.8%', anim: 'float-c', dur: '6.3s', delay: '1.7s', size: '1.7rem', opacity: 0.23 },
  { emoji: '🍓', top: '90%', left: '2%',   anim: 'float-a', dur: '4.5s', delay: '0.9s', size: '1.8rem', opacity: 0.24 },

  // Right edge
  { emoji: '🍕', top: '8%',  right: '1%',   anim: 'float-b', dur: '5s',   delay: '0.8s', size: '2.2rem', opacity: 0.26 },
  { emoji: '🥗', top: '22%', right: '0.5%', anim: 'float-c', dur: '6.5s', delay: '1.6s', size: '1.8rem', opacity: 0.24 },
  { emoji: '☕', top: '38%', right: '1.5%', anim: 'float-a', dur: '4.2s', delay: '0.2s', size: '2rem',   opacity: 0.27 },
  { emoji: '🫐', top: '53%', right: '1%',   anim: 'float-b', dur: '5.8s', delay: '1s',   size: '1.7rem', opacity: 0.23 },
  { emoji: '🍋', top: '67%', right: '1.5%', anim: 'float-c', dur: '4.6s', delay: '1.8s', size: '1.9rem', opacity: 0.25 },
  { emoji: '🍩', top: '81%', right: '0.8%', anim: 'float-a', dur: '5.4s', delay: '0.5s', size: '1.8rem', opacity: 0.24 },
  { emoji: '🥞', top: '95%', right: '2%',   anim: 'float-b', dur: '6.1s', delay: '2.2s', size: '1.7rem', opacity: 0.23 },

  // Interior — slightly more inward
  { emoji: '🫓', top: '12%', left: '5%',    anim: 'float-c', dur: '7s',   delay: '2.5s', size: '1.6rem', opacity: 0.18 },
  { emoji: '🥝', top: '27%', right: '5%',   anim: 'float-a', dur: '6.8s', delay: '3s',   size: '1.6rem', opacity: 0.17 },
  { emoji: '🍇', top: '43%', left: '4%',    anim: 'float-b', dur: '7.5s', delay: '1.4s', size: '1.5rem', opacity: 0.17 },
  { emoji: '🥕', top: '57%', right: '5.5%', anim: 'float-c', dur: '6.2s', delay: '0.9s', size: '1.6rem', opacity: 0.18 },
  { emoji: '🧀', top: '71%', left: '4.5%',  anim: 'float-a', dur: '7.2s', delay: '1.1s', size: '1.5rem', opacity: 0.16 },
  { emoji: '🌽', top: '85%', right: '4%',   anim: 'float-b', dur: '6.6s', delay: '2.8s', size: '1.6rem', opacity: 0.17 },
  { emoji: '🍊', top: '96%', left: '5.5%',  anim: 'float-c', dur: '5.9s', delay: '1.3s', size: '1.5rem', opacity: 0.16 },
];

export default function FloatingFoodIcons() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      {ICONS.map(({ emoji, top, left, right, anim, dur, delay, size, opacity }) => (
        <div
          key={`${emoji}-${top}`}
          className="absolute select-none"
          style={{
            top,
            left,
            right,
            fontSize: size,
            opacity,
            animation: `${anim} ${dur} ease-in-out ${delay} infinite`,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}
