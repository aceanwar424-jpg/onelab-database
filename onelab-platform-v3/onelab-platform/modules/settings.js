function renderSettings(){
  document.getElementById('main-content').innerHTML=`
    <div class="page-header"><div><h1>Pengaturan</h1><p>Konfigurasi sistem OneLab Growth Platform</p></div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:800px">
      <div class="card">
        <div class="card-title" style="margin-bottom:14px">🔗 Koneksi Supabase</div>
        <div class="form-group">
          <label>Project URL</label>
          <input type="text" value="${SUPABASE_URL}" readonly style="background:var(--lgray);color:var(--gray);font-size:12px">
        </div>
        <div id="sett-conn" class="status-box status-info" style="margin-bottom:12px">Memeriksa...</div>
        <button class="btn btn-teal btn-sm" onclick="checkConnSett()">🔄 Cek Koneksi</button>
      </div>
      <div class="card">
        <div class="card-title" style="margin-bottom:14px">🗺 Google Maps API</div>
        <div class="form-group">
          <label>API Key Tersimpan</label>
          <input type="password" id="sett-maps-key" value="${localStorage.getItem('ol_maps_key')||''}"
            placeholder="Belum diset">
        </div>
        <div class="btn-row">
          <button class="btn btn-ghost btn-sm" onclick="document.getElementById('sett-maps-key').type=document.getElementById('sett-maps-key').type==='password'?'text':'password'">👁</button>
          <button class="btn btn-teal btn-sm" onclick="saveMapsKey()">💾 Simpan</button>
          <button class="btn btn-danger btn-sm" onclick="clearMapsKey()">🗑 Hapus</button>
        </div>
      </div>
      <div class="card" style="grid-column:1/-1">
        <div class="card-title" style="margin-bottom:14px">📊 Statistik Database</div>
        <div id="sett-stats" class="loading-row"><div class="spinner"></div></div>
      </div>
    </div>`;

  checkConnSett();
  loadSettStats();
}

async function checkConnSett(){
  const el=document.getElementById('sett-conn');
  if(!el) return;
  el.className='status-box status-info'; el.textContent='⏳ Memeriksa...';
  try {
    const d=await sbGet('partners','select=count&limit=1');
    el.className='status-box status-ok';
    el.textContent='✅ Supabase terhubung dan berfungsi normal.';
  } catch(e){
    el.className='status-box status-err';
    el.textContent='❌ '+e.message;
  }
}

async function loadSettStats(){
  const el=document.getElementById('sett-stats');
  if(!el) return;
  try {
    const tables=['partners','vouchers','marketing_templates','outgoing_letters','campaigns'];
    const counts=await Promise.all(tables.map(t=>sbGet(t,'select=count').catch(()=>[])));
    el.innerHTML=`<div style="display:flex;gap:16px;flex-wrap:wrap">
      ${tables.map((t,i)=>`
        <div style="text-align:center;padding:10px 16px;background:var(--lgray);border-radius:8px">
          <div style="font-size:20px;font-weight:800;color:var(--navy)">${Array.isArray(counts[i])?counts[i].length:'?'}</div>
          <div style="font-size:11px;color:var(--gray);margin-top:2px">${t}</div>
        </div>`).join('')}
    </div>`;
  } catch(e){ el.innerHTML=`<span style="color:var(--gray);font-size:13px">Gagal load stats</span>`; }
}

function saveMapsKey(){
  const k=document.getElementById('sett-maps-key').value.trim();
  if(!k){ toast('API key kosong','warn'); return; }
  localStorage.setItem('ol_maps_key',k);
  toast('✅ API key tersimpan','ok');
}

function clearMapsKey(){
  localStorage.removeItem('ol_maps_key');
  document.getElementById('sett-maps-key').value='';
  toast('🗑 API key dihapus','info');
}
