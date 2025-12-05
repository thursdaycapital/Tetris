// 音效系统 - 使用 Web Audio API 生成经典俄罗斯方块音效

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'square', volume: number = 0.3) {
    if (!this.audioContext || !this.enabled) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.warn('Failed to play sound:', e);
    }
  }

  // 移动音效
  playMove() {
    this.playTone(220, 0.05, 'square', 0.1);
  }

  // 旋转音效
  playRotate() {
    this.playTone(330, 0.1, 'square', 0.15);
  }

  // 放置音效
  playPlace() {
    this.playTone(165, 0.1, 'square', 0.2);
  }

  // 消除单行
  playLineClear() {
    const frequencies = [220, 277, 330, 440];
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.15, 'square', 0.25);
      }, i * 50);
    });
  }

  // 消除多行
  playMultiLineClear(lines: number) {
    const baseFreq = 220;
    for (let i = 0; i < lines; i++) {
      setTimeout(() => {
        this.playTone(baseFreq * (1 + i * 0.2), 0.2, 'square', 0.3);
      }, i * 80);
    }
  }

  // 游戏结束音效
  playGameOver() {
    const frequencies = [220, 196, 175, 165];
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.3, 'sine', 0.4);
      }, i * 200);
    });
  }

  // 等级提升音效
  playLevelUp() {
    const frequencies = [330, 440, 554, 659];
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.2, 'square', 0.3);
      }, i * 100);
    });
  }
}

export const soundManager = new SoundManager();

// 震动反馈工具
export function vibrate(pattern: number | number[]) {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      console.warn('Vibration not supported');
    }
  }
}

// 消除方块时的震动
export function vibrateOnLineClear(lines: number) {
  if (lines === 1) {
    vibrate(50);
  } else if (lines === 2) {
    vibrate([50, 30, 50]);
  } else if (lines === 3) {
    vibrate([50, 30, 50, 30, 50]);
  } else if (lines >= 4) {
    vibrate([100, 50, 100, 50, 100, 50, 100]);
  }
}

