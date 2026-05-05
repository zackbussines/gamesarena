import { Game } from './types';

export const GAMES: Game[] = [
  {
    id: 'minecraft',
    title: 'Minecraft',
    icon: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=300&fit=crop',
    size: '1.2 GB',
    price: '$6.99',
    description: 'Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode, crafting weapons and armor to fend off dangerous mobs.',
    screenshots: [
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1605898835373-523612439d44?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=800&h=450&fit=crop'
    ],
    features: ['Full Cross-Play Supported', 'Zero Microtransactions', 'Uncapped FPS']
  },
  {
    id: 'gta-v',
    title: 'GTA V: Mobile Edition',
    icon: 'https://images.unsplash.com/photo-1605898835373-523612439d44?w=300&h=300&fit=crop',
    size: '3.8 GB',
    price: '$19.99',
    description: 'Experience the acclaimed open-world gameplay of Grand Theft Auto V, now optimized for premium mobile devices. Follow the lives of three very different criminals as they risk everything in a series of daring and dangerous heists.',
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop'
    ],
    features: ['Ray-Tracing Enabled', 'Mobile Exclusive Controls', 'High Fidelity Audio']
  },
  {
    id: 'resident-evil-4',
    title: 'Resident Evil 4',
    icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop',
    size: '2.5 GB',
    price: '$59.99',
    description: 'Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, has been assigned to rescue the president\'s kidnapped daughter.',
    screenshots: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&h=450&fit=crop'
    ],
    features: ['HDR10+ Graphics', 'DualSense Support', '120 FPS Mode']
  },
  {
    id: 'valorant-mobile',
    title: 'Valorant Mobile',
    icon: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=300&fit=crop',
    size: '1.8 GB',
    price: 'Free',
    description: 'A 5v5 character-based tactical shooter. Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities.',
    screenshots: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&h=450&fit=crop'
    ],
    features: ['Low Latency Servers', 'Competitive Integrity', 'Custom HUD']
  }
];
