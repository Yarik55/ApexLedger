// ApexLedger client portal — shared Supabase setup.
// The anon (publishable) key is safe to expose: every table is protected by
// Row Level Security, so a signed-in client can only ever read their own rows.
const SUPABASE_URL = 'https://azlshevldygfrvckeftw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_7j1CkP3d-hH9xSgXzglRog_Y3V_T8ZO';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const fmtMoney = (n) =>
  '$' + Math.abs(n || 0).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtDate = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};
