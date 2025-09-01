import dayjs from 'dayjs';
export const fmtDate = (iso?: string | null) => iso ? dayjs(iso).format('YYYY-MM-DD HH:mm') : '';
export const fmtCurrencyLKR = (v?: number | null) => typeof v === 'number' ? `LKR ${v.toLocaleString('en-LK', { maximumFractionDigits: 0 })}` : '—';
