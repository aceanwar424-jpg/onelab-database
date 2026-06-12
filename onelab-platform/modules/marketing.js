// modules/marketing.js
function renderMarketing() {
  document.getElementById('main-content').innerHTML = `
    <div class="page-header"><div><h1>Marketing Kit</h1><p>Template WA, proposal, flyer, dan skrip health talk</p></div></div>
    <div class="card" style="text-align:center;padding:60px">
      <div style="font-size:48px;margin-bottom:12px">📣</div>
      <h3 style="color:var(--navy);margin-bottom:8px">Marketing Kit</h3>
      <p style="color:var(--gray);font-size:13px;margin-bottom:20px">Modul ini akan segera tersedia.<br>Template WA, proposal mitra, flyer, dan skrip health talk terintegrasi dengan database partner.</p>
      <button class="btn btn-teal" onclick="window.open('OneLab_Marketing_Kit.html','_blank')">Buka Marketing Kit Saat Ini</button>
    </div>`;
}
