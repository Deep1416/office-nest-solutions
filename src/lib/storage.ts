// LocalStorage helpers for demo persistence.

const K = {
  leads: "on_leads",
  bookings: "on_bookings",
  callbacks: "on_callbacks",
  offices: "on_admin_offices",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, val: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(val));
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  purpose: string;
  message?: string;
  createdAt: string;
}
export interface Booking {
  id: string;
  reference: string;
  officeId: string;
  officeName: string;
  plan: string;
  duration: string;
  customer: { name: string; email: string; phone: string; businessName: string; businessType: string; gstStatus: string; address: string };
  total: number;
  status: "received" | "payment-confirmed" | "documents-submitted" | "kyc-review" | "prepared" | "completed";
  createdAt: string;
}
export interface CallbackReq {
  id: string;
  name: string;
  phone: string;
  when: string;
  message?: string;
  createdAt: string;
}

export const leadsStore = {
  list: () => read<Lead[]>(K.leads, []),
  add: (l: Omit<Lead, "id" | "createdAt">) => {
    const all = leadsStore.list();
    all.unshift({ ...l, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    write(K.leads, all);
  },
  remove: (id: string) => write(K.leads, leadsStore.list().filter(x => x.id !== id)),
};

export const bookingsStore = {
  list: () => read<Booking[]>(K.bookings, []),
  add: (b: Booking) => {
    const all = bookingsStore.list();
    all.unshift(b);
    write(K.bookings, all);
  },
  update: (id: string, patch: Partial<Booking>) => {
    write(K.bookings, bookingsStore.list().map(b => (b.id === id ? { ...b, ...patch } : b)));
  },
  find: (ref: string, phone: string) => bookingsStore.list().find(b => b.reference.toLowerCase() === ref.toLowerCase() && b.customer.phone.includes(phone.replace(/\D/g, "").slice(-6))),
  remove: (id: string) => write(K.bookings, bookingsStore.list().filter(x => x.id !== id)),
};

export const callbacksStore = {
  list: () => read<CallbackReq[]>(K.callbacks, []),
  add: (c: Omit<CallbackReq, "id" | "createdAt">) => {
    const all = callbacksStore.list();
    all.unshift({ ...c, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    write(K.callbacks, all);
  },
  remove: (id: string) => write(K.callbacks, callbacksStore.list().filter(x => x.id !== id)),
};

export function makeBookingRef() {
  const year = new Date().getFullYear();
  const n = bookingsStore.list().length + 1;
  return `ON-${year}-${String(n).padStart(4, "0")}`;
}
