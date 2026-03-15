'use client';

const ICONS = [
  // Left edge — various heights
  { emoji: '🥐', top: '8%',  left: '1%',   anim: 'float-a', dur: '4s',   delay: '0s',   size: '2rem',   opacity: 0.18 },
  { emoji: '🌮', top: '28%', left: '0.5%', anim: 'float-b', dur: '5.5s', delay: '1.2s', size: '1.7rem', opacity: 0.15 },
  { emoji: '🍜', top: '52%', left: '1.5%', anim: 'float-c', dur: '6s',   delay: '0.6s', size: '1.9rem', opacity: 0.16 },
  { emoji: '🧁', top: '72%', left: '0.8%', anim: 'float-a', dur: '4.8s', delay: '2s',   size: '1.6rem', opacity: 0.14 },
  { emoji: '🍎', top: '88%', left: '2%',   anim: 'float-b', dur: '5.2s', delay: '0.4s', size: '1.8rem', opacity: 0.15 },

  // Right edge — various heights
  { emoji: '🍕', top: '14%', right: '1%',   anim: 'float-b', dur: '5s',   delay: '0.8s', size: '2.2rem', opacity: 0.16 },
  { emoji: '🥗', top: '36%', right: '0.5%', anim: 'float-c', dur: '6.5s', delay: '1.6s', size: '1.7rem', opacity: 0.14 },
  { emoji: '☕', top: '58%', right: '1.5%', anim: 'float-a', dur: '4.2s', delay: '0.2s', size: '2rem',   opacity: 0.17 },
  { emoji: '🫐', top: '78%', right: '1%',   anim: 'float-b', dur: '5.8s', delay: '1s',   size: '1.6rem', opacity: 0.13 },
  { emoji: '🍋', top: '93%', right: '2%',   anim: 'float-c', dur: '4.6s', delay: '1.8s', size: '1.8rem', opacity: 0.15 },

  // Scattered interior — slightly more inward, very low opacity
  { emoji: '🫓', top: '20%', left: '5%',    anim: 'float-c', dur: '7s',   delay: '2.5s', size: '1.5rem', opacity: 0.10 },
  { emoji: '🥝', top: '65%', right: '5%',   anim: 'float-a', dur: '6.8s', delay: '3s',   size: '1.5rem', opacity: 0.09 },
  { emoji: '🍇', top: '42%', left: '4%',    anim: 'float-b', dur: '7.5s', delay: '1.4s', size: '1.4rem', opacity: 0.09 },
  { emoji: '🥕', top: '82%', right: '5.5%', anim: 'float-c', dur: '6.2s', delay: '0.9s', size: '1.5rem', opacity: 0.10 },
];

export default function FloatingFoodIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
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
