function renderVoucher() {
  document.getElementById('main-content').innerHTML = `
    <div class="page-header"><div><h1>Voucher Builder</h1><p>Buat, generate, dan distribusi voucher digital</p></div></div>
    <div class="card" style="text-align:center;padding:60px">
      <div style="font-size:48px;margin-bottom:12px">🎟</div>
      <h3 style="color:var(--navy);margin-bottom:8px">Voucher Builder</h3>
      <p style="color:var(--gray);font-size:13px;margin-bottom:20px">Generate massal, upload background, save PDF 5×10cm, dan blast WA.</p>
      <button class="btn btn-teal" onclick="window.open('OneLab_Digital_Voucher_Builder.html','_blank')">Buka Voucher Builder Saat Ini</button>
    </div>`;
}
