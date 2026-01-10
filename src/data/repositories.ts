import type { Repository } from '../components/RepositoryCard';

export const repositories: Repository[] = [
  {
    name: 'PyNuxtBase',
    description: 'PyNuxtBase provides a complete full-stack foundation with Nuxt 4.x frontend, FastAPI/Django backend, and modern authentication - all ready to go.',
    url: 'https://github.com/andrewmarconi/PyNuxtBase',
    tags: ['Nuxt', 'FastAPI', 'Django', 'PostgreSQL'],
  },
  {
    name: 'MoodBench',
    description: 'MoodBench is an automated benchmarking framework that fine-tunes, evaluates, and compares small language models for sentiment analysis. It uses Parameter-Efficient Fine-Tuning (PEFT) with LoRA.',
    url: 'https://github.com/andrewmarconi/MoodBench',
    tags: ['AI/ML', 'PEFT', 'LoRA', 'Sentiment Analysis'],
  },
  {
    name: 'bias-in-generative-ai',
    description: 'A simple testing suite to detect and measure bias in various generative AI models',
    url: 'https://github.com/andrewmarconi/bias-in-generative-ai',
    tags: ['AI Ethics', 'Testing', 'Bias Detection'],
  },
  {
    name: 'portraits',
    description: 'A Multimodal AI Generation Suite. Generate professional images, videos, speech, and morphing effects using state-of-the-art AI models.',
    url: 'https://github.com/andrewmarconi/portraits',
    tags: ['AI', 'Computer Vision', 'Audio', 'Multimodal'],
  },
  {
    name: 'flytrap',
    description: 'Real-time object detection and tracking using YOLO11 with SRT (Secure Reliable Transport) video streams. Tracks vehicles, people, and bicycles with direction detection, speed calculation, and automation.',
    url: 'https://github.com/andrewmarconi/flytrap',
    tags: ['YOLO11', 'Object Detection', 'Computer Vision', 'SRT'],
  },
];
