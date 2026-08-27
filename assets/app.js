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

  const MEMBERS = [
    // MEN
    { id: 1, code: '1001', name: 'Ahmed Raza',    phone: '03001112201', section: 'men',   type: 'Premium',  monthly: 5000, ptf: 3000, due: 0,    nextDue: '2026-07-10', assigned: 1, lastCheckin: '2026-06-28', status: 'active' },
    { id: 2, code: '1002', name: 'Bilal Hussain', phone: '03001112202', section: 'men',   type: 'Standard', monthly: 3500, ptf: 2000, due: 3500, nextDue: '2026-06-05', assigned: 1, lastCheckin: '2026-06-25', status: 'active' },
    { id: 3, code: '1003', name: 'Usman Tariq',   phone: '03001112203', section: 'men',   type: 'Premium',  monthly: 5000, ptf: 3500, due: 0,    nextDue: '2026-07-12', assigned: 4, lastCheckin: '2026-06-29', status: 'active' },
    { id: 4, code: '1004', name: 'Hamza Sheikh',  phone: '03001112204', section: 'men',   type: 'Standard', monthly: 3500, ptf: 0,    due: 7000, nextDue: '2026-05-01', assigned: null, lastCheckin: '2026-05-12', status: 'inactive' },
    { id: 5, code: '1005', name: 'Zain Malik',    phone: '03001112205', section: 'men',   type: 'Premium',  monthly: 5000, ptf: 4000, due: 0,    nextDue: '2026-07-20', assigned: 2, lastCheckin: '2026-06-29', status: 'active' },
    { id: 6, code: '1006', name: 'Faisal Iqbal',  phone: '03001112206', section: 'men',   type: 'Standard', monthly: 3500, ptf: 0,    due: 0,    nextDue: '2026-07-02', assigned: 4, lastCheckin: '2026-06-27', status: 'active' },
    // WOMEN
    { id: 7, code: '2001', name: 'Ayesha Khan',   phone: '03001112301', section: 'women', type: 'Ladies',   monthly: 4000, ptf: 3000, due: 0,    nextDue: '2026-07-18', assigned: 3, lastCheckin: '2026-06-28', status: 'active' },
    { id: 8, code: '2002', name: 'Sana Ali',      phone: '03001112302', section: 'women', type: 'Ladies',   monthly: 4000, ptf: 2500, due: 4000, nextDue: '2026-06-22', assigned: 3, lastCheckin: '2026-06-24', status: 'active' },
    { id: 9, code: '2003', name: 'Maria Yousuf',  phone: '03001112303', section: 'women', type: 'Ladies',   monthly: 4000, ptf: 2000, due: 0,    nextDue: '2026-07-30', assigned: 4, lastCheckin: '2026-06-29', status: 'active' },
    { id:10, code: '2004', name: 'Hina Riaz',     phone: '03001112304', section: 'women', type: 'Ladies',   monthly: 4000, ptf: 0,    due: 0,    nextDue: '2026-07-11', assigned: null, lastCheckin: '2026-06-28', status: 'active' }
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
    $('#loginView').classList.add('hide');
    $('#appView').classList.remove('hide');
    const t = currentTrainer();
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
    document.querySelectorAll('[data-tab]').forEach((a) => a.classList.toggle('active', a.getAttribute('data-tab') === key));
    const main = $('#mainContent');
    if (key === 'dashboard') main.innerHTML = renderDashboard();
    else if (key === 'members') main.innerHTML = renderMembers();
    else if (key === 'schedule') main.innerHTML = renderSchedule();
    else if (key === 'earnings') main.innerHTML = renderEarnings();
    else if (key === 'profile') main.innerHTML = renderProfile();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // ---- data helpers -------------------------------------------------------
  function currentTrainer() { return TRAINERS.find((t) => t.id === state.session?.id) || null; }
  function myMembers() { const id = state.session?.id; return MEMBERS.filter((m) => m.assigned === id); }
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
            return `<tr><td><div class="row-mem"><div class="av">${initials(m.name)}</div><div><b>${escHtml(m.name)}</b><small>${escHtml(m.code)} · ${escHtml(m.type)}</small></div></div></td><td>${escHtml(reason)}</td><td style="text-align:right; font-family:'Instrument Serif'; font-size:1.05rem; ${m.due ? 'color:var(--red)' : ''}">${m.due ? fmtRs(m.due) : '—'}</td></tr>`;
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
        <span class="demo-chip">Read-only in demo</span>
      </div>
      <div class="card">
        ${mem.length === 0 ? `<div class="empty">No members are assigned to you yet.<br>Ask the front desk to assign a member from the Apex admin dashboard.</div>` : `
          <table>
            <thead><tr><th>Member</th><th>Section</th><th>Package</th><th>Last check-in</th><th>Next fee due</th><th>Status</th></tr></thead>
            <tbody>${mem.map(m => `
              <tr>
                <td><div class="row-mem"><div class="av">${initials(m.name)}</div><div><b>${escHtml(m.name)}</b><small>${escHtml(m.code)} · ${escHtml(m.phone)}</small></div></div></td>
                <td>${escHtml(m.section)}</td>
                <td>${escHtml(m.type)}<br><small style="color:var(--cream-4);">${fmtRs(m.monthly)}/mo</small></td>
                <td>${m.lastCheckin ? escHtml(m.lastCheckin) : '—'}</td>
                <td>${escHtml(m.nextDue)}${m.due > 0 ? `<br><small style="color:var(--red);">${fmtRs(m.due)} overdue</small>` : ''}</td>
                <td><span class="pill ${m.status === 'active' ? 'green' : 'muted'}">${escHtml(m.status)}</span></td>
              </tr>`).join('')}</tbody>
          </table>`}
      </div>
    `;
  }

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
    ['#logoutBtn', '#logoutBtn2'].forEach((s) => $(s).addEventListener('click', (e) => {
      e.preventDefault();
      clearSession();
      $('#appView').classList.add('hide');
      $('#loginView').classList.remove('hide');
    }));
  }

  // ---- boot ---------------------------------------------------------------
  loadSession();
  initLogin();
  bindChrome();
  if (state.session && currentTrainer()) enterApp();
})();
