export type FeedbackItem = {
  id: string;
  name?: string;
  email?: string;
  rating?: number | null;
  message: string;
  createdAt: string;
  replied?: boolean;
  reply?: string;
  repliedAt?: string | null;
};

const STORAGE_KEY = 'mynvestor_feedbacks_v1';

function readAll(): FeedbackItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FeedbackItem[];
  } catch (e) {
    console.error('Failed to read feedback store', e);
    return [];
  }
}

function writeAll(items: FeedbackItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to write feedback store', e);
  }
}

export function getFeedbacks(): FeedbackItem[] {
  return readAll().sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
}

export function addFeedback(item: Omit<FeedbackItem, 'id' | 'createdAt' | 'replied' | 'repliedAt' | 'reply'>) {
  const all = readAll();
  const id = `F${Date.now()}`;
  const now = new Date().toISOString();
  const newItem: FeedbackItem = { id, ...item, createdAt: now, replied: false, repliedAt: null };
  all.push(newItem);
  writeAll(all);
  return newItem;
}

export function updateFeedback(id: string, patch: Partial<FeedbackItem>) {
  const all = readAll();
  const idx = all.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...patch } as FeedbackItem;
  if (patch.reply && !patch.repliedAt) {
    updated.repliedAt = new Date().toISOString();
  }
  all[idx] = updated;
  writeAll(all);
  return updated;
}

export function clearFeedbacks() {
  writeAll([]);
}

// --- Mock data seeding (useful for dev/demo) ---
export function seedMockFeedbacks() {
  const existing = readAll();
  if (existing && existing.length > 0) return;

  const now = () => new Date().toISOString();

  const samples: FeedbackItem[] = [
    {
      id: 'mock-1',
      name: 'Aisha Khan',
      email: 'aisha.khan@example.com',
      rating: 4,
      message: 'I like the new dashboard but the portfolio chart seems to lag on mobile.',
      createdAt: now(),
      replied: false,
      reply: undefined,
      repliedAt: null,
    },
    {
      id: 'mock-2',
      name: 'Carlos Mendez',
      email: 'carlos.m@example.com',
      rating: 2,
      message: 'I was charged an unexpected fee last week. Please advise.',
      createdAt: now(),
      replied: true,
      reply: 'Hi Carlos — sorry about that. We reviewed your account and refunded the fee. Please check your transactions.',
      repliedAt: now(),
    },
    {
      id: 'mock-3',
      name: 'Emily Zhang',
      email: 'emily.z@example.com',
      rating: null,
      message: 'How do I update my linked bank account? The form keeps failing.',
      createdAt: now(),
      replied: false,
      reply: undefined,
      repliedAt: null,
    },
  ];

  writeAll(samples);
}

// Auto-seed when empty (helpful for demo / local dev). Only seeds if store is empty.
try {
  seedMockFeedbacks();
} catch (e) {
  // ignore seeding errors in environments without localStorage
}
