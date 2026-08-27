/* ============================================================================
   APEX COACH — Trainer Portal (demo)
   Static SPA, no backend. Data mirrors the gym-demo seeds so the two apps
   feel like they share a customer base.
   ============================================================================ */
(function () {
  'use strict';

  // ---- seed data (mirrors gym-demo mock-api.js trainers + members) ---------
  const TRAINERS = [
    { id: 1, code: 'TRN-0001', name: 'Bilal Ahmed',  phone: '03009991101', section: 'men',   salary: 40000, commission: 20, hire: '2026-01-10', notes: 'Powerlifting + hypertrophy', rating: 4.7 },
    { id: 2, code: 'TRN-0002', name: 'Hassan Iqbal', phone: '03009991102', section: 'men',   salary: 35000, commission: 15, hire: '2026-02-15', notes: 'Cardio / weight loss',       rating: 4.5 },
    { id: 3, code: 'TRN-0003', name: 'Ayesha Malik', phone: '03009991103', section: 'women', salary: 42000, commission: 25, hire: '2026-03-01', notes: 'Post-natal fitness specialist', rating: 4.9 },
    { id: 4, code: 'TRN-0004', name: 'Junaid Anwar', phone: '03009991104', section: 'both',  salary: 45000, commission: 18, hire: '2025-11-20', notes: 'Head trainer',              rating: 4.8 },
    { id: 5, code: 'TRN-0005', name: 'Sarah Khalid', phone: '03009991105', section: 'women', salary: 30000, commission: 10, hire: '2026-04-05', notes: 'On maternity leave (inactive)', rating: 4.6 }
  ];

  // Progress rows: { date, weight, chest, waist, arms, thighs, notes }
  const MEMBERS = [
    // MEN
    { id: 1, code: '1001', name: 'Ahmed Raza',    phone: '03001112201', section: 'men',   type: 'Premium',  monthly: 5000, ptf: 3000, due: 0,    nextDue: '2026-07-10', assigned: 1, lastCheckin: '2026-06-28', status: 'active',
      height: 178, goal: 'gain', targetWeight: 82, goalNotes: 'Lean bulk to 82 kg by Sept — strength + slight cut cycle.',
      progress: [
        { date: '2026-01-10', weight: 73.5, chest: 96,  waist: 82, arms: 33, thighs: 54, notes: 'Baseline' },
        { date: '2026-02-10', weight: 74.8, chest: 97,  waist: 82, arms: 34, thighs: 55, notes: 'Volume up' },
        { date: '2026-03-15', weight: 76.2, chest: 98,  waist: 83, arms: 35, thighs: 56, notes: 'Bench PR 90kg' },
        { date: '2026-04-20', weight: 77.5, chest: 99,  waist: 83, arms: 35, thighs: 57, notes: 'Squat PR 130' },
        { date: '2026-05-25', weight: 78.4, chest: 100, waist: 84, arms: 36, thighs: 57, notes: 'Deload week' },
        { date: '2026-06-28', weight: 79.1, chest: 101, waist: 84, arms: 36, thighs: 58, notes: 'On track' }
      ]
    },
    { id: 2, code: '1002', name: 'Bilal Hussain', phone: '03001112202', section: 'men',   type: 'Standard', monthly: 3500, ptf: 2000, due: 3500, nextDue: '2026-06-05', assigned: 1, lastCheckin: '2026-06-25', status: 'active',
      height: 172, goal: 'lose', targetWeight: 78, goalNotes: 'Fat loss cut — high protein, 3 lifting days + 2 cardio.',
      progress: [
        { date: '2026-01-05', weight: 92.0, chest: 108, waist: 100, arms: 35, thighs: 62, notes: 'Baseline' },
        { date: '2026-02-06', weight: 90.3, chest: 107, waist: 98,  arms: 35, thighs: 62, notes: 'Losing water' },
        { date: '2026-03-10', weight: 88.5, chest: 106, waist: 96,  arms: 35, thighs: 61, notes: 'Steady' },
        { date: '2026-04-12', weight: 87.1, chest: 105, waist: 94,  arms: 35, thighs: 61, notes: 'Cardio up' },
        { date: '2026-05-15', weight: 86.0, chest: 104, waist: 93,  arms: 35, thighs: 60, notes: 'Weekend cheat' },
        { date: '2026-06-25', weight: 85.3, chest: 103, waist: 92,  arms: 35, thighs: 60, notes: 'Missed 2 sessions' }
      ]
    },
    { id: 3, code: '1003', name: 'Usman Tariq',   phone: '03001112203', section: 'men',   type: 'Premium',  monthly: 5000, ptf: 3500, due: 0,    nextDue: '2026-07-12', assigned: 4, lastCheckin: '2026-06-29', status: 'active',
      height: 183, goal: 'gain', targetWeight: 95, goalNotes: 'Powerlifting comp prep — Sept 2026. Focus S/B/D 1RMs.',
      progress: [
        { date: '2026-01-12', weight: 84.0, chest: 105, waist: 88, arms: 38, thighs: 60, notes: 'Base cycle' },
        { date: '2026-02-15', weight: 86.2, chest: 106, waist: 89, arms: 39, thighs: 62, notes: 'Volume week' },
        { date: '2026-03-20', weight: 88.4, chest: 107, waist: 89, arms: 40, thighs: 63, notes: 'S 160/B 110/D 190' },
        { date: '2026-04-22', weight: 90.1, chest: 108, waist: 90, arms: 41, thighs: 64, notes: 'Peaking' },
        { date: '2026-05-28', weight: 91.5, chest: 109, waist: 91, arms: 41, thighs: 65, notes: 'Mock meet' },
        { date: '2026-06-29', weight: 92.3, chest: 110, waist: 91, arms: 42, thighs: 65, notes: 'S 175/B 122/D 205' }
      ]
    },
    { id: 4, code: '1004', name: 'Hamza Sheikh',  phone: '03001112204', section: 'men',   type: 'Standard', monthly: 3500, ptf: 0,    due: 7000, nextDue: '2026-05-01', assigned: null, lastCheckin: '2026-05-12', status: 'inactive',
      height: 176, goal: 'maintain', targetWeight: null, goalNotes: 'Lapsed member.',
      progress: [
        { date: '2026-01-04', weight: 81.0, chest: 100, waist: 88, arms: 34, thighs: 58, notes: 'Baseline' },
        { date: '2026-02-10', weight: 80.5, chest: 100, waist: 88, arms: 34, thighs: 58, notes: '' },
        { date: '2026-05-12', weight: 82.4, chest: 101, waist: 89, arms: 34, thighs: 58, notes: 'Stopped attending' }
      ]
    },
    { id: 5, code: '1005', name: 'Zain Malik',    phone: '03001112205', section: 'men',   type: 'Premium',  monthly: 5000, ptf: 4000, due: 0,    nextDue: '2026-07-20', assigned: 2, lastCheckin: '2026-06-29', status: 'active',
      height: 180, goal: 'lose', targetWeight: 75, goalNotes: 'Post-wedding cut — steady 0.5 kg/wk, no crash diet.',
      progress: [
        { date: '2026-01-08', weight: 89.0, chest: 106, waist: 96, arms: 34, thighs: 60, notes: 'Baseline' },
        { date: '2026-02-08', weight: 87.5, chest: 105, waist: 94, arms: 34, thighs: 60, notes: 'Consistent' },
        { date: '2026-03-14', weight: 85.8, chest: 104, waist: 92, arms: 34, thighs: 60, notes: 'Cardio 4x/wk' },
        { date: '2026-04-18', weight: 84.0, chest: 103, waist: 91, arms: 34, thighs: 59, notes: 'Down 5 kg' },
        { date: '2026-05-22', weight: 82.5, chest: 102, waist: 89, arms: 34, thighs: 59, notes: 'Feeling great' },
        { date: '2026-06-29', weight: 81.2, chest: 101, waist: 88, arms: 34, thighs: 58, notes: 'On target' }
      ]
    },
    { id: 6, code: '1006', name: 'Faisal Iqbal',  phone: '03001112206', section: 'men',   type: 'Standard', monthly: 3500, ptf: 0,    due: 0,    nextDue: '2026-07-02', assigned: 4, lastCheckin: '2026-06-27', status: 'active',
      height: 174, goal: 'gain', targetWeight: 70, goalNotes: 'New starter — build baseline strength + add 5 kg lean.',
      progress: [
        { date: '2026-05-02', weight: 62.0, chest: 90, waist: 78, arms: 30, thighs: 50, notes: 'Baseline' },
        { date: '2026-06-01', weight: 63.5, chest: 91, waist: 78, arms: 31, thighs: 51, notes: 'Onboarding done' },
        { date: '2026-06-27', weight: 64.8, chest: 92, waist: 79, arms: 31, thighs: 52, notes: 'Learning form' }
      ]
    },
    // WOMEN
    { id: 7, code: '2001', name: 'Ayesha Khan',   phone: '03001112301', section: 'women', type: 'Ladies',   monthly: 4000, ptf: 3000, due: 0,    nextDue: '2026-07-18', assigned: 3, lastCheckin: '2026-06-28', status: 'active',
      height: 162, goal: 'lose', targetWeight: 55, goalNotes: 'Steady fat loss + build glute/leg strength.',
      progress: [
        { date: '2026-01-18', weight: 68.0, chest: 92, waist: 78, arms: 28, thighs: 56, notes: 'Baseline' },
        { date: '2026-02-20', weight: 66.5, chest: 91, waist: 76, arms: 28, thighs: 55, notes: '' },
        { date: '2026-03-22', weight: 64.8, chest: 90, waist: 74, arms: 28, thighs: 55, notes: 'Loving squats' },
        { date: '2026-04-25', weight: 63.2, chest: 89, waist: 72, arms: 28, thighs: 54, notes: '' },
        { date: '2026-05-28', weight: 61.8, chest: 88, waist: 71, arms: 28, thighs: 54, notes: 'Feeling strong' },
        { date: '2026-06-28', weight: 60.7, chest: 88, waist: 70, arms: 28, thighs: 53, notes: 'Almost there' }
      ]
    },
    { id: 8, code: '2002', name: 'Sana Ali',      phone: '03001112302', section: 'women', type: 'Ladies',   monthly: 4000, ptf: 2500, due: 4000, nextDue: '2026-06-22', assigned: 3, lastCheckin: '2026-06-24', status: 'active',
      height: 158, goal: 'gain', targetWeight: 55, goalNotes: 'Build up from underweight — protein-first, 3 lifting days.',
      progress: [
        { date: '2026-02-22', weight: 46.0, chest: 82, waist: 66, arms: 24, thighs: 46, notes: 'Baseline' },
        { date: '2026-03-25', weight: 47.5, chest: 82, waist: 66, arms: 24, thighs: 47, notes: 'Diet plan' },
        { date: '2026-04-28', weight: 48.8, chest: 83, waist: 67, arms: 25, thighs: 47, notes: '' },
        { date: '2026-05-30', weight: 49.6, chest: 83, waist: 67, arms: 25, thighs: 48, notes: 'Missed a week' },
        { date: '2026-06-24', weight: 50.2, chest: 84, waist: 67, arms: 25, thighs: 48, notes: 'Recovering pace' }
      ]
    },
    { id: 9, code: '2003', name: 'Maria Yousuf',  phone: '03001112303', section: 'women', type: 'Ladies',   monthly: 4000, ptf: 2000, due: 0,    nextDue: '2026-07-30', assigned: 4, lastCheckin: '2026-06-29', status: 'active',
      height: 165, goal: 'lose', targetWeight: 60, goalNotes: 'Post-natal — cleared by GP, easing back in.',
      progress: [
        { date: '2026-03-30', weight: 72.0, chest: 96, waist: 84, arms: 30, thighs: 58, notes: 'Baseline (post-partum 4mo)' },
        { date: '2026-04-30', weight: 70.5, chest: 95, waist: 82, arms: 30, thighs: 57, notes: 'Core rehab' },
        { date: '2026-05-30', weight: 68.8, chest: 94, waist: 80, arms: 30, thighs: 56, notes: '' },
        { date: '2026-06-29', weight: 67.2, chest: 93, waist: 78, arms: 30, thighs: 55, notes: 'Feeling herself again' }
      ]
    },
    { id:10, code: '2004', name: 'Hina Riaz',     phone: '03001112304', section: 'women', type: 'Ladies',   monthly: 4000, ptf: 0,    due: 0,    nextDue: '2026-07-11', assigned: null, lastCheckin: '2026-06-28', status: 'active',
      height: 168, goal: 'maintain', targetWeight: null, goalNotes: 'General wellness — no PT yet, doing group classes.',
      progress: [
        { date: '2026-05-11', weight: 58.0, chest: 87, waist: 68, arms: 26, thighs: 52, notes: 'Baseline' },
        { date: '2026-06-11', weight: 57.5, chest: 87, waist: 68, arms: 26, thighs: 52, notes: '' }
      ]
    }
  ];

  // Mock this-month sessions (day-of-week 0-6, hour 24h, member id, note)
  const SESSIONS = {
    1: [ // Bilal — 4 men (Ahmed, Bilal H., + occasional visits)
      { day: 1, hour: 7, member: 1, note: 'Chest + tri' }, { day: 1, hour: 18, member: 2, note: 'Deadlift' },
      { day: 2, hour: 7, member: 1, note: 'Back' }, { day: 2, hour: 18, member: 2, note: 'Squat' },
      { day: 3, hour: 7, member: 1, note: 'Legs' },
      { day: 4, hour: 7, member: 1, note: 'Shoulders' }, { day: 4, hour: 18, member: 2, note: 'Bench' },
      { day: 5, hour: 8, member: 1, note: 'Push / pull' }
    ],
    2: [ // Hassan — Zain
      { day: 1, hour: 9, member: 5, note: 'Cardio 40m' }, { day: 3, hour: 9, member: 5, note: 'HIIT' }, { day: 5, hour: 9, member: 5, note: 'Steady state' }
    ],
    3: [ // Ayesha — Ayesha Khan + Sana
      { day: 1, hour: 10, member: 7, note: 'Full body' }, { day: 2, hour: 10, member: 8, note: 'Core' },
      { day: 3, hour: 10, member: 7, note: 'Lower' }, { day: 4, hour: 10, member: 8, note: 'Upper' },
      { day: 5, hour: 10, member: 7, note: 'Mobility' }, { day: 6, hour: 11, member: 8, note: 'Weekend' }
    ],
    4: [ // Junaid — 3 members (Usman, Faisal, Maria)
      { day: 1, hour: 17, member: 3, note: 'Bench 1RM' }, { day: 1, hour: 19, member: 6, note: 'Onboarding' },
      { day: 2, hour: 17, member: 3, note: 'Squat 1RM' }, { day: 2, hour: 16, member: 9, note: 'Post-natal' },
      { day: 3, hour: 17, member: 3, note: 'DL 1RM' }, { day: 3, hour: 16, member: 9, note: 'Post-natal' },
      { day: 4, hour: 17, member: 6, note: 'Program' }, { day: 4, hour: 16, member: 9, note: 'Post-natal' },
      { day: 5, hour: 17, member: 3, note: 'Deload' }
    ],
    5: [] // Sarah — on leave
  };

  // 6-month earnings history per trainer (rough numbers)
  const EARNINGS = {
    1: [{ m: 'Jan', v: 46000 }, { m: 'Feb', v: 48000 }, { m: 'Mar', v: 51000 }, { m: 'Apr', v: 52000 }, { m: 'May', v: 55000 }, { m: 'Jun', v: 58000 }],
    2: [{ m: 'Jan', v: 36000 }, { m: 'Feb', v: 36500 }, { m: 'Mar', v: 37000 }, { m: 'Apr', v: 38000 }, { m: 'May', v: 38500 }, { m: 'Jun', v: 40000 }],
    3: [{ m: 'Jan', v: 47000 }, { m: 'Feb', v: 49000 }, { m: 'Mar', v: 52000 }, { m: 'Apr', v: 54000 }, { m: 'May', v: 56000 }, { m: 'Jun', v: 58500 }],
    4: [{ m: 'Jan', v: 52000 }, { m: 'Feb', v: 54000 }, { m: 'Mar', v: 55000 }, { m: 'Apr', v: 57500 }, { m: 'May', v: 60000 }, { m: 'Jun', v: 62000 }],
    5: [{ m: 'Jan', v: 32000 }, { m: 'Feb', v: 32500 }, { m: 'Mar', v: 33000 }, { m: 'Apr', v: 0 }, { m: 'May', v: 0 }, { m: 'Jun', v: 0 }]
  };

  const LS = 'apexcoach_v1';
  const state = { session: null, tab: 'dashboard' };

  const $ = (s, r = document) => r.querySelector(s);
  const escHtml = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtRs = (n) => 'Rs ' + Number(n || 0).toLocaleString('en-PK');
  const initials = (name) => (name || '').split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

  // ---- session store ------------------------------------------------------
  function saveSession() { try { localStorage.setItem(LS, JSON.stringify(state.session)); } catch (_) {} }
  function loadSession() { try { state.session = JSON.parse(localStorage.getItem(LS)) || null; } catch (_) { state.session = null; } }
  function clearSession() { try { localStorage.removeItem(LS); } catch (_) {} state.session = null; }

  // ---- login --------------------------------------------------------------
  function initLogin() {
    const sel = $('#loginTrainer');
    sel.innerHTML = TRAINERS.map((t) => `<option value="${t.id}">${escHtml(t.name)} (${escHtml(t.code)})</option>`).join('');
    $('#loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = parseInt(sel.value, 10);
      const pin = ($('#loginPin').value || '').trim();
      const t = TRAINERS.find((x) => x.id === id);
      if (!t) return;
      if (t.phone.slice(-4) !== pin) { alert('That PIN doesn\'t match. Hint: last 4 digits of the trainer\'s phone.'); return; }
      state.session = { id: t.id };
      saveSession();
      enterApp();
    });
  }

  // ---- app router ---------------------------------------------------------
  function enterApp() {
    const loginView = $('#loginView');
    if (loginView) loginView.classList.add('hide');
    $('#appView').classList.remove('hide');
    const t = currentTrainer();
    if (!t) return; // guard: no valid trainer session, don't try to paint

    $('#sideAv').textContent = initials(t.name);
    $('#sideName').textContent = t.name;
    $('#sideRole').textContent = t.section === 'both' ? 'All sections' : (t.section === 'men' ? 'Men section' : 'Women section');
    $('#drawerAv').textContent = initials(t.name);
    $('#drawerName').textContent = t.name;
    renderNav();
    setTab(state.tab || 'dashboard');
  }

  function renderNav() {
    const tabs = [
      { key: 'dashboard', label: 'Dashboard', ico: '◈' },
      { key: 'members',   label: 'My Members', ico: '◍' },
      { key: 'schedule',  label: 'This Week',  ico: '◑' },
      { key: 'earnings',  label: 'Earnings',   ico: '◐' },
      { key: 'profile',   label: 'Profile',    ico: '◉' }
    ];
    const html = tabs.map((t) => `<a href="#" data-tab="${t.key}" class="${state.tab === t.key ? 'active' : ''}"><span class="ico">${t.ico}</span>${escHtml(t.label)}</a>`).join('');
    $('#sidebarNav').innerHTML = html;
    $('#drawerNav').innerHTML = html;
    document.querySelectorAll('[data-tab]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      setTab(a.getAttribute('data-tab'));
      closeDrawer();
    }));
  }

  function setTab(key) {
    state.tab = key;
    state.detailMemberId = null;
    document.querySelectorAll('[data-tab]').forEach((a) => a.classList.toggle('active', a.getAttribute('data-tab') === key));
    const main = $('#mainContent');
    if (key === 'dashboard') { main.innerHTML = renderDashboard(); bindDashboard(); }
    else if (key === 'members') { main.innerHTML = renderMembers(); bindMembers(); }
    else if (key === 'schedule') main.innerHTML = renderSchedule();
    else if (key === 'earnings') main.innerHTML = renderEarnings();
    else if (key === 'profile') main.innerHTML = renderProfile();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function openMember(id) {
    state.detailMemberId = id;
    $('#mainContent').innerHTML = renderMemberDetail(id);
    bindMemberDetail(id);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // ---- data helpers -------------------------------------------------------
  function currentTrainer() { return TRAINERS.find((t) => t.id === state.session?.id) || null; }
  function myMembers() { const id = state.session?.id; return MEMBERS.filter((m) => m.assigned === id); }
  function latestWeight(m) { const p = m.progress || []; return p.length ? p[p.length - 1].weight : null; }
  function firstWeight(m) { const p = m.progress || []; return p.length ? p[0].weight : null; }
  function weightDelta(m) {
    const f = firstWeight(m), l = latestWeight(m);
    return (f == null || l == null) ? null : (l - f);
  }
  function bmi(m) {
    const w = latestWeight(m); if (w == null || !m.height) return null;
    const hM = m.height / 100;
    return w / (hM * hM);
  }
  function bmiLabel(v) {
    if (v == null) return { txt: '—', cls: 'muted' };
    if (v < 18.5) return { txt: 'Underweight', cls: 'amber' };
    if (v < 25) return { txt: 'Healthy', cls: 'green' };
    if (v < 30) return { txt: 'Overweight', cls: 'amber' };
    return { txt: 'Obese', cls: 'red' };
  }
  function goalProgress(m) {
    // Returns { pct, direction, remaining } for the goal — pct 0..100 how close to target.
    const first = firstWeight(m), latest = latestWeight(m), target = m.targetWeight;
    if (first == null || latest == null || target == null) return null;
    const total = target - first;
    if (total === 0) return { pct: 100, direction: m.goal, remaining: 0 };
    const done = latest - first;
    const pct = Math.max(0, Math.min(100, Math.round((done / total) * 100)));
    return { pct, direction: m.goal, remaining: Math.abs(target - latest) };
  }
  function daysSince(dateStr) {
    if (!dateStr) return null;
    return Math.round((new Date('2026-06-29') - new Date(dateStr)) / 86400000);
  }
  function searchMembers(list, q) {
    q = (q || '').trim().toLowerCase();
    if (!q) return list;
    return list.filter((m) => {
      const goalTxt = (m.goal || '') + ' ' + (m.goalNotes || '');
      return (m.name + ' ' + m.code + ' ' + m.phone + ' ' + m.type + ' ' + goalTxt).toLowerCase().indexOf(q) >= 0;
    });
  }
  function mySessions() { const id = state.session?.id; return SESSIONS[id] || []; }
  function myEarnings() { const id = state.session?.id; return EARNINGS[id] || []; }
  function thisMonthEarn() { const e = myEarnings(); return e.length ? e[e.length - 1].v : 0; }
  function totalPtfCommission() {
    const t = currentTrainer(); if (!t) return 0;
    const ptfSum = myMembers().filter((m) => m.status === 'active').reduce((s, m) => s + Number(m.ptf || 0), 0);
    return Math.round(ptfSum * (t.commission / 100));
  }

  // ---- renderers ----------------------------------------------------------
  function renderDashboard() {
    const t = currentTrainer();
    const mem = myMembers();
    const activeMem = mem.filter((m) => m.status === 'active').length;
    const sessions = mySessions().length;
    const earnedThisMonth = thisMonthEarn();
    const commission = totalPtfCommission();
    const nextSession = mySessions()[0];
    const nextMember = nextSession ? MEMBERS.find((m) => m.id === nextSession.member) : null;

    return `
      <div class="page-head">
        <div>
          <h1 class="serif">Welcome back, ${escHtml(t.name.split(' ')[0])}.</h1>
          <p class="sub">Here's how your practice is doing this month.</p>
        </div>
        <span class="demo-chip">Demo data</span>
      </div>

      <div class="stats">
        <div class="stat"><span class="k">Active Members</span><span class="v gold">${activeMem}</span><span class="delta">${mem.length - activeMem} inactive</span></div>
        <div class="stat"><span class="k">Sessions This Week</span><span class="v blue">${sessions}</span><span class="delta">Across ${new Set(mySessions().map(s => s.member)).size} client${new Set(mySessions().map(s => s.member)).size === 1 ? '' : 's'}</span></div>
        <div class="stat"><span class="k">Earned in June</span><span class="v green">${fmtRs(earnedThisMonth)}</span><span class="delta">Base ${fmtRs(t.salary)} + comm.</span></div>
        <div class="stat"><span class="k">PTF Commission MTD</span><span class="v gold">${fmtRs(commission)}</span><span class="delta">${t.commission}% of Rs ${myMembers().filter(m => m.status === 'active').reduce((s, m) => s + Number(m.ptf || 0), 0).toLocaleString('en-PK')} PTF</span></div>
      </div>

      <div class="card">
        <div class="card-head"><h2 class="serif">Next up</h2><span class="sub">Upcoming session</span></div>
        <div class="card-body">
          ${nextSession && nextMember ? `
            <div class="row-mem" style="gap:1rem;">
              <div class="av" style="width:52px;height:52px;">${initials(nextMember.name)}</div>
              <div>
                <b style="font-size:1.05rem;">${escHtml(nextMember.name)}</b>
                <small>${nextSession.hour}:00 · ${escHtml(nextSession.note)}</small>
              </div>
              <div style="margin-left:auto; text-align:right;">
                <div class="mono">Member</div>
                <div style="font-family:'Instrument Serif'; font-size:1.1rem;">${escHtml(nextMember.code)}</div>
              </div>
            </div>` : `<div class="empty">No sessions on the books this week.</div>`}
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h2 class="serif">Members needing attention</h2><span class="sub">Overdue fees or long absence</span></div>
        ${(() => {
          const flags = mem.filter((m) => m.due > 0 || (m.lastCheckin && (new Date('2026-06-29') - new Date(m.lastCheckin)) / 86400000 > 5));
          if (!flags.length) return `<div class="empty">Everyone's paid up and checking in regularly. Nice work.</div>`;
          return `<table><thead><tr><th>Member</th><th>Reason</th><th style="text-align:right;">Amount</th></tr></thead><tbody>${flags.map(m => {
            const daysAgo = m.lastCheckin ? Math.round((new Date('2026-06-29') - new Date(m.lastCheckin)) / 86400000) : null;
            const reason = m.due > 0 ? `Fee overdue since ${m.nextDue}` : `Last seen ${daysAgo} days ago`;
            return `<tr data-mem="${m.id}" style="cursor:pointer;"><td><div class="row-mem"><div class="av">${initials(m.name)}</div><div><b>${escHtml(m.name)}</b><small>${escHtml(m.code)} · ${escHtml(m.type)}</small></div></div></td><td>${escHtml(reason)}</td><td style="text-align:right; font-family:'Instrument Serif'; font-size:1.05rem; ${m.due ? 'color:var(--red)' : ''}">${m.due ? fmtRs(m.due) : '—'}</td></tr>`;
          }).join('')}</tbody></table>`;
        })()}
      </div>
    `;
  }

  function renderMembers() {
    const mem = myMembers();
    return `
      <div class="page-head">
        <div><h1 class="serif">My members</h1><p class="sub">${mem.length} assigned · ${mem.filter(m => m.status === 'active').length} active</p></div>
        <span class="demo-chip">Tap a row for details</span>
      </div>

      <div class="search-row">
        <input id="memberSearch" class="search-input" placeholder="Search name, code, phone, goal…" value="${escHtml(state.memberQuery || '')}">
        <div class="chip-row">
          <button class="chip ${!state.goalFilter ? 'active' : ''}" data-goal="">All goals</button>
          <button class="chip ${state.goalFilter === 'lose' ? 'active' : ''}" data-goal="lose">Fat loss</button>
          <button class="chip ${state.goalFilter === 'gain' ? 'active' : ''}" data-goal="gain">Muscle gain</button>
          <button class="chip ${state.goalFilter === 'maintain' ? 'active' : ''}" data-goal="maintain">Maintain</button>
        </div>
      </div>

      <div class="card">
        <div id="memberTableWrap">${renderMemberRows(mem)}</div>
      </div>
    `;
  }

  function renderMemberRows(list) {
    let mem = searchMembers(list, state.memberQuery);
    if (state.goalFilter) mem = mem.filter((m) => m.goal === state.goalFilter);
    if (mem.length === 0) return `<div class="empty">Nothing matches. Try clearing the filters.</div>`;

    return `
      <table>
        <thead><tr>
          <th>Member</th><th>Goal</th><th>Progress</th><th>Latest weight</th><th>BMI</th><th>Last seen</th><th>Fee status</th>
        </tr></thead>
        <tbody>${mem.map((m) => {
          const gp = goalProgress(m);
          const delta = weightDelta(m);
          const b = bmi(m); const bl = bmiLabel(b);
          const goalIco = m.goal === 'lose' ? '↓' : m.goal === 'gain' ? '↑' : '≈';
          const goalCls = m.goal === 'lose' ? 'red' : m.goal === 'gain' ? 'green' : 'muted';
          return `
            <tr data-mem="${m.id}" style="cursor:pointer;">
              <td><div class="row-mem"><div class="av">${initials(m.name)}</div><div><b>${escHtml(m.name)}</b><small>${escHtml(m.code)} · ${escHtml(m.type)}</small></div></div></td>
              <td>
                <span class="pill ${goalCls}">${goalIco} ${m.goal}</span>
                ${m.targetWeight ? `<br><small style="color:var(--cream-4);">Target ${m.targetWeight} kg</small>` : ''}
              </td>
              <td>${gp ? `
                <div class="track" style="width:120px;"><div class="fill" style="width:${gp.pct}%; background:${gp.pct >= 100 ? 'var(--green)' : 'linear-gradient(90deg,var(--gold),var(--gold-2))'};"></div></div>
                <small style="color:var(--cream-4);">${gp.pct}%${gp.remaining ? ` · ${gp.remaining.toFixed(1)} kg to go` : ' · reached'}</small>
              ` : `<small style="color:var(--cream-4);">No target set</small>`}</td>
              <td>
                ${latestWeight(m) != null ? `<b>${latestWeight(m).toFixed(1)} kg</b>` : '—'}
                ${delta != null ? `<br><small style="color:${delta < 0 ? 'var(--red)' : delta > 0 ? 'var(--green)' : 'var(--cream-4)'};">${delta > 0 ? '+' : ''}${delta.toFixed(1)} kg total</small>` : ''}
              </td>
              <td>${b != null ? `<b>${b.toFixed(1)}</b><br><small class="pill ${bl.cls}" style="font-size:.6rem;">${bl.txt}</small>` : '—'}</td>
              <td>${m.lastCheckin ? `${daysSince(m.lastCheckin)}d ago` : '—'}</td>
              <td>${m.due > 0 ? `<span class="pill red">${fmtRs(m.due)} due</span>` : `<span class="pill green">paid</span>`}</td>
            </tr>`;
        }).join('')}</tbody>
      </table>
    `;
  }

  function bindMembers() {
    const inp = $('#memberSearch');
    if (inp) inp.addEventListener('input', () => {
      state.memberQuery = inp.value;
      $('#memberTableWrap').innerHTML = renderMemberRows(myMembers());
      bindMemberRowClicks();
    });
    document.querySelectorAll('.chip[data-goal]').forEach((el) => el.addEventListener('click', () => {
      state.goalFilter = el.getAttribute('data-goal');
      const wrap = $('#memberTableWrap');
      if (wrap) wrap.innerHTML = renderMemberRows(myMembers());
      document.querySelectorAll('.chip[data-goal]').forEach((c) => c.classList.toggle('active', c.getAttribute('data-goal') === state.goalFilter));
      bindMemberRowClicks();
    }));
    bindMemberRowClicks();
  }

  function bindMemberRowClicks() {
    document.querySelectorAll('tr[data-mem]').forEach((tr) => tr.addEventListener('click', () => openMember(parseInt(tr.getAttribute('data-mem'), 10))));
  }

  function bindDashboard() {
    document.querySelectorAll('tr[data-mem]').forEach((tr) => tr.addEventListener('click', () => openMember(parseInt(tr.getAttribute('data-mem'), 10))));
  }

  // ---- member detail ------------------------------------------------------
  function progressSvg(m) {
    const p = m.progress || [];
    if (p.length < 2) return `<div class="empty" style="padding:2rem;">Not enough data points yet. Log a second entry to draw a trend.</div>`;
    const w = 640, h = 220, padX = 40, padY = 30;
    const weights = p.map((r) => r.weight);
    let min = Math.min(...weights), max = Math.max(...weights);
    if (m.targetWeight != null) { min = Math.min(min, m.targetWeight); max = Math.max(max, m.targetWeight); }
    const range = Math.max(1, max - min);
    // 10% padding around range
    min -= range * 0.15; max += range * 0.15;
    const xStep = (w - padX * 2) / Math.max(1, p.length - 1);
    const yFor = (v) => padY + (h - padY * 2) * (1 - (v - min) / (max - min));
    const points = p.map((r, i) => `${padX + i * xStep},${yFor(r.weight)}`).join(' ');
    const targetY = m.targetWeight != null ? yFor(m.targetWeight) : null;

    return `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; display:block;">
        <defs>
          <linearGradient id="g${m.id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(201,162,74,.35)"/>
            <stop offset="100%" stop-color="rgba(201,162,74,0)"/>
          </linearGradient>
        </defs>
        <!-- baseline -->
        <line x1="${padX}" y1="${h - padY}" x2="${w - padX}" y2="${h - padY}" stroke="rgba(244,241,234,.08)" />
        ${targetY != null ? `
          <line x1="${padX}" y1="${targetY}" x2="${w - padX}" y2="${targetY}" stroke="rgba(226,193,105,.35)" stroke-dasharray="4 4" />
          <text x="${w - padX - 6}" y="${targetY - 6}" fill="var(--gold-2)" font-size="11" text-anchor="end">Target ${m.targetWeight} kg</text>
        ` : ''}
        <!-- fill under line -->
        <polygon points="${points} ${padX + (p.length - 1) * xStep},${h - padY} ${padX},${h - padY}" fill="url(#g${m.id})"/>
        <!-- line -->
        <polyline points="${points}" fill="none" stroke="var(--gold-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- points -->
        ${p.map((r, i) => `<circle cx="${padX + i * xStep}" cy="${yFor(r.weight)}" r="4" fill="var(--ink)" stroke="var(--gold-2)" stroke-width="2"><title>${r.date} — ${r.weight} kg</title></circle>`).join('')}
        <!-- x labels: first + last -->
        <text x="${padX}" y="${h - 8}" fill="var(--cream-4)" font-size="10">${p[0].date}</text>
        <text x="${w - padX}" y="${h - 8}" fill="var(--cream-4)" font-size="10" text-anchor="end">${p[p.length - 1].date}</text>
      </svg>
    `;
  }

  function renderMemberDetail(id) {
    const m = MEMBERS.find((x) => x.id === id);
    if (!m) return `<div class="empty">Member not found.</div>`;
    const b = bmi(m); const bl = bmiLabel(b);
    const delta = weightDelta(m);
    const gp = goalProgress(m);
    const latest = m.progress && m.progress.length ? m.progress[m.progress.length - 1] : null;

    return `
      <div class="page-head">
        <div>
          <a href="#" id="backToMembers" style="color:var(--cream-4); font-size:.8rem; letter-spacing:.1em; text-transform:uppercase;">← Back to members</a>
          <h1 class="serif" style="margin-top:.5rem;">${escHtml(m.name)}</h1>
          <p class="sub">${escHtml(m.code)} · ${escHtml(m.phone)} · ${escHtml(m.type)} · ${escHtml(m.section)} section</p>
        </div>
        <button class="cta" style="width:auto; padding:.7rem 1.25rem; margin-top:0;" id="logProgressBtn">＋ Log progress</button>
      </div>

      <div class="stats">
        <div class="stat"><span class="k">Current weight</span><span class="v gold">${latestWeight(m) != null ? latestWeight(m).toFixed(1) + ' kg' : '—'}</span><span class="delta">${delta != null ? (delta > 0 ? '+' : '') + delta.toFixed(1) + ' kg since baseline' : ''}</span></div>
        <div class="stat"><span class="k">Target</span><span class="v blue">${m.targetWeight ? m.targetWeight + ' kg' : '—'}</span><span class="delta">${gp ? gp.remaining.toFixed(1) + ' kg to go' : ''}</span></div>
        <div class="stat"><span class="k">BMI</span><span class="v ${b != null ? (bl.cls === 'green' ? 'green' : bl.cls === 'red' ? 'red' : 'gold') : ''}">${b != null ? b.toFixed(1) : '—'}</span><span class="delta">${bl.txt}</span></div>
        <div class="stat"><span class="k">Height</span><span class="v">${m.height ? m.height + ' cm' : '—'}</span><span class="delta">${gp ? gp.pct + '% of goal' : ''}</span></div>
      </div>

      <div class="card">
        <div class="card-head">
          <h2 class="serif">Goal</h2>
          <span class="pill ${m.goal === 'lose' ? 'red' : m.goal === 'gain' ? 'green' : 'muted'}">${m.goal === 'lose' ? '↓ Fat loss' : m.goal === 'gain' ? '↑ Muscle gain' : '≈ Maintain'}</span>
        </div>
        <div class="card-body"><p style="color:var(--cream-2); font-size:.95rem; margin:0;">${escHtml(m.goalNotes || 'No goal notes yet.')}</p></div>
      </div>

      <div class="card">
        <div class="card-head"><h2 class="serif">Weight trend</h2><span class="sub">${m.progress.length} entries</span></div>
        <div class="card-body">${progressSvg(m)}</div>
      </div>

      <div class="card">
        <div class="card-head"><h2 class="serif">Latest measurements</h2><span class="sub">Most recent entry</span></div>
        <div class="card-body">
          ${latest ? `
            <div class="kv-grid" style="margin-bottom:0;">
              <div class="kv"><div class="k">Date</div><div class="v">${escHtml(latest.date)}</div></div>
              <div class="kv"><div class="k">Weight</div><div class="v">${latest.weight} kg</div></div>
              <div class="kv"><div class="k">Chest</div><div class="v">${latest.chest} cm</div></div>
              <div class="kv"><div class="k">Waist</div><div class="v">${latest.waist} cm</div></div>
              <div class="kv"><div class="k">Arms</div><div class="v">${latest.arms} cm</div></div>
              <div class="kv"><div class="k">Thighs</div><div class="v">${latest.thighs} cm</div></div>
            </div>
          ` : `<div class="empty">No measurements logged yet.</div>`}
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h2 class="serif">Progress log</h2><span class="sub">All entries · newest first</span></div>
        <table>
          <thead><tr><th>Date</th><th>Weight</th><th>Chest</th><th>Waist</th><th>Arms</th><th>Thighs</th><th>Notes</th></tr></thead>
          <tbody>${m.progress.slice().reverse().map((r) => `
            <tr>
              <td>${escHtml(r.date)}</td>
              <td>${r.weight} kg</td>
              <td>${r.chest} cm</td>
              <td>${r.waist} cm</td>
              <td>${r.arms} cm</td>
              <td>${r.thighs} cm</td>
              <td style="color:var(--cream-3);">${escHtml(r.notes || '—')}</td>
            </tr>`).join('')}</tbody>
        </table>
      </div>
    `;
  }

  function bindMemberDetail(id) {
    $('#backToMembers').addEventListener('click', (e) => { e.preventDefault(); setTab('members'); });
    $('#logProgressBtn').addEventListener('click', () => showLogForm(id));
  }

  function showLogForm(id) {
    const m = MEMBERS.find((x) => x.id === id);
    const last = m.progress[m.progress.length - 1] || {};
    const html = `
      <div class="log-overlay" id="logOverlay">
        <div class="log-modal">
          <div class="log-head">
            <h3 class="serif">Log progress · ${escHtml(m.name)}</h3>
            <button class="log-close" id="logClose">&times;</button>
          </div>
          <div class="log-body">
            <div class="log-grid">
              <label><span>Date</span><input id="lgDate" type="date" value="2026-06-29"></label>
              <label><span>Weight (kg)</span><input id="lgWeight" type="number" step="0.1" value="${last.weight || ''}"></label>
              <label><span>Chest (cm)</span><input id="lgChest" type="number" step="0.5" value="${last.chest || ''}"></label>
              <label><span>Waist (cm)</span><input id="lgWaist" type="number" step="0.5" value="${last.waist || ''}"></label>
              <label><span>Arms (cm)</span><input id="lgArms" type="number" step="0.5" value="${last.arms || ''}"></label>
              <label><span>Thighs (cm)</span><input id="lgThighs" type="number" step="0.5" value="${last.thighs || ''}"></label>
            </div>
            <label class="log-notes"><span>Notes</span><textarea id="lgNotes" rows="2" placeholder="How did the session feel?"></textarea></label>
            <div class="log-actions">
              <button class="cta" id="lgSave" style="width:auto; padding:.7rem 1.4rem;">Save entry</button>
              <button class="chip" id="lgCancel">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    $('#logClose').addEventListener('click', closeLog);
    $('#lgCancel').addEventListener('click', closeLog);
    $('#lgSave').addEventListener('click', () => {
      const entry = {
        date: $('#lgDate').value || '2026-06-29',
        weight: parseFloat($('#lgWeight').value) || 0,
        chest: parseFloat($('#lgChest').value) || 0,
        waist: parseFloat($('#lgWaist').value) || 0,
        arms: parseFloat($('#lgArms').value) || 0,
        thighs: parseFloat($('#lgThighs').value) || 0,
        notes: $('#lgNotes').value.trim()
      };
      m.progress.push(entry);
      closeLog();
      openMember(id);
    });
  }
  function closeLog() { const o = $('#logOverlay'); if (o) o.remove(); }

  function renderSchedule() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = [7, 8, 9, 10, 11, 16, 17, 18, 19]; // typical gym hours
    const sessions = mySessions();

    const cells = [];
    cells.push(`<div class="cell head"></div>`);
    days.forEach((d) => cells.push(`<div class="cell head">${d}</div>`));

    hours.forEach((h) => {
      cells.push(`<div class="cell time">${h}:00</div>`);
      for (let d = 1; d <= 7; d++) {
        const s = sessions.find((x) => x.day === d && x.hour === h);
        const member = s ? MEMBERS.find((m) => m.id === s.member) : null;
        cells.push(`<div class="cell slot">${s && member ? `<div class="booked"><b>${escHtml(member.name.split(' ')[0])}</b><small>${escHtml(s.note)}</small></div>` : ''}</div>`);
      }
    });

    return `
      <div class="page-head">
        <div><h1 class="serif">This week</h1><p class="sub">${sessions.length} sessions booked · Mon–Sun</p></div>
        <span class="demo-chip">Demo schedule</span>
      </div>
      <div class="card"><div class="card-body" style="padding:0;"><div class="week">${cells.join('')}</div></div></div>
      <p style="color:var(--cream-4); font-size:.8rem; margin-top:1rem;">A tap on a slot would let you add/edit a session — kept read-only in this demo.</p>
    `;
  }

  function renderEarnings() {
    const t = currentTrainer();
    const hist = myEarnings();
    const max = Math.max(1, ...hist.map((e) => e.v));
    const bars = hist.map((e) => `
      <div class="bar">
        <span>${escHtml(e.m)}</span>
        <div class="track"><div class="fill" style="width:${(e.v / max) * 100}%;"></div></div>
        <span>${fmtRs(e.v)}</span>
      </div>`).join('');

    const commission = totalPtfCommission();
    const totalYtd = hist.reduce((s, e) => s + e.v, 0);

    // Mock recent payouts
    const payouts = [
      { d: '2026-06-01', ref: 'PAY-2606', amt: hist[hist.length - 2]?.v || 0, method: 'Bank transfer' },
      { d: '2026-05-01', ref: 'PAY-2605', amt: hist[hist.length - 3]?.v || 0, method: 'Bank transfer' },
      { d: '2026-04-01', ref: 'PAY-2604', amt: hist[hist.length - 4]?.v || 0, method: 'Bank transfer' }
    ].filter((p) => p.amt > 0);

    return `
      <div class="page-head">
        <div><h1 class="serif">Earnings</h1><p class="sub">Base salary ${fmtRs(t.salary)} + ${t.commission}% commission on PTF</p></div>
        <span class="demo-chip">Demo figures</span>
      </div>
      <div class="stats">
        <div class="stat"><span class="k">This Month</span><span class="v green">${fmtRs(thisMonthEarn())}</span></div>
        <div class="stat"><span class="k">PTF Commission MTD</span><span class="v gold">${fmtRs(commission)}</span></div>
        <div class="stat"><span class="k">YTD Earnings</span><span class="v">${fmtRs(totalYtd)}</span></div>
        <div class="stat"><span class="k">Commission %</span><span class="v gold">${t.commission}%</span></div>
      </div>
      <div class="earnings-grid">
        <div class="card">
          <div class="card-head"><h2 class="serif">6-month trend</h2><span class="sub">By month</span></div>
          <div class="card-body">${bars}</div>
        </div>
        <div class="card">
          <div class="card-head"><h2 class="serif">Recent payouts</h2><span class="sub">Bank transfers</span></div>
          <div class="card-body">
            ${payouts.length ? payouts.map((p) => `<div class="payout"><div class="l"><b>${escHtml(p.d)}</b><small>${escHtml(p.ref)} · ${escHtml(p.method)}</small></div><div class="r">${fmtRs(p.amt)}</div></div>`).join('') : '<div class="empty">No payouts yet.</div>'}
          </div>
        </div>
      </div>
    `;
  }

  function renderProfile() {
    const t = currentTrainer();
    return `
      <div class="page-head">
        <div><h1 class="serif">Profile</h1><p class="sub">Your record at Apex Fitness</p></div>
        <span class="demo-chip">Read-only in demo</span>
      </div>
      <div class="profile-head">
        <div class="av">${initials(t.name)}</div>
        <div>
          <h2>${escHtml(t.name)}</h2>
          <div class="meta">${escHtml(t.code)} · ${escHtml(t.phone)} · ${t.section === 'both' ? 'All sections' : t.section + ' section'}</div>
        </div>
        <div style="margin-left:auto; text-align:right;">
          <div class="mono">Rating</div>
          <div style="font-family:'Instrument Serif'; font-size:1.75rem; color:var(--gold-2);">${t.rating.toFixed(1)}</div>
        </div>
      </div>
      <div class="kv-grid">
        <div class="kv"><div class="k">Hire date</div><div class="v">${escHtml(t.hire)}</div></div>
        <div class="kv"><div class="k">Section</div><div class="v">${escHtml(t.section)}</div></div>
        <div class="kv"><div class="k">Monthly salary</div><div class="v">${fmtRs(t.salary)}</div></div>
        <div class="kv"><div class="k">Commission</div><div class="v">${t.commission}% of PTF collected</div></div>
        <div class="kv"><div class="k">Assigned members</div><div class="v">${myMembers().length} (${myMembers().filter(m => m.status === 'active').length} active)</div></div>
        <div class="kv"><div class="k">Notes</div><div class="v">${escHtml(t.notes)}</div></div>
      </div>
    `;
  }

  // ---- drawer + logout ----------------------------------------------------
  function openDrawer() { $('#drawer').classList.add('open'); $('#drawerBackdrop').classList.add('open'); }
  function closeDrawer() { $('#drawer').classList.remove('open'); $('#drawerBackdrop').classList.remove('open'); }

  function bindChrome() {
    $('#hambBtn').addEventListener('click', openDrawer);
    $('#drawerBackdrop').addEventListener('click', closeDrawer);
  }

  // ---- trainer switcher (replaces login for demo — one click to try
  // any trainer without going through the login screen) ---------------------
  function showTrainerSwitcher() {
    const html = `
      <div class="log-overlay" id="switcherOverlay">
        <div class="log-modal">
          <div class="log-head"><h3 class="serif">Switch trainer</h3><button class="log-close" id="swClose">&times;</button></div>
          <div class="log-body">
            <p style="color:var(--cream-3); font-size:.9rem; margin:0 0 1rem;">Pick any trainer to see the portal from their view.</p>
            <div style="display:flex; flex-direction:column; gap:.5rem;">
              ${TRAINERS.map((t) => `
                <button class="switcher-row" data-tid="${t.id}" style="display:flex; align-items:center; gap:.8rem; padding:.75rem 1rem; background:${state.session && state.session.id === t.id ? 'var(--ink-3)' : 'transparent'}; border:1px solid var(--line-strong); color:var(--cream); text-align:left; cursor:pointer;">
                  <div class="avatar">${initials(t.name)}</div>
                  <div style="flex:1;">
                    <b style="display:block;">${escHtml(t.name)}</b>
                    <small style="color:var(--cream-4);">${escHtml(t.code)} · ${t.section === 'both' ? 'All sections' : t.section + ' section'}</small>
                  </div>
                  ${state.session && state.session.id === t.id ? '<span class="pill green">current</span>' : ''}
                </button>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    $('#swClose').addEventListener('click', closeSwitcher);
    document.querySelectorAll('.switcher-row').forEach((b) => b.addEventListener('click', () => {
      state.session = { id: parseInt(b.getAttribute('data-tid'), 10) };
      saveSession();
      closeSwitcher();
      enterApp();
    }));
  }
  function closeSwitcher() { const o = $('#switcherOverlay'); if (o) o.remove(); }

  // ---- boot ---------------------------------------------------------------
  loadSession();
  bindChrome();
  // Login step is turned off for the demo — auto-enter as the richest profile
  // (Junaid Anwar, head trainer). Users can switch via the sidebar avatar.
  if (!state.session || !currentTrainer()) {
    state.session = { id: 4 };
    saveSession();
  }
  enterApp();

  // Make the sidebar avatar row + drawer avatar row open the switcher.
  document.querySelectorAll('.side-foot .avatar, .side-foot .who').forEach((el) => {
    el.style.cursor = 'pointer';
    el.title = 'Switch trainer';
    el.addEventListener('click', showTrainerSwitcher);
  });
  // Sign-out link now opens the switcher too.
  document.querySelectorAll('#logoutBtn, #logoutBtn2').forEach((el) => {
    el.textContent = 'Switch';
    el.removeEventListener?.('click', () => {});
    el.addEventListener('click', (e) => { e.preventDefault(); showTrainerSwitcher(); });
  });
})();
