
const traded = [
  {logo:"C", cls:"red", name:"Cupid", price:"₹212.24", change:"2.23 (1.06%)"},
  {logo:"K", cls:"orange", name:"Kalyan Jewellers", price:"₹476.15", change:"33.15 (7.48%)"},
  {logo:"Z", cls:"", name:"Zensar Technologies", price:"₹508.25", change:"60.85 (13.60%)"},
  {logo:"G", cls:"blue", name:"Greaves Cotton", price:"₹263.60", change:"26.37 (11.12%)"}
];

const stocks = [
  {logo:"S", cls:"red", name:"Solar Industries Ind", price:"₹18,236.00", change:"856.00 (4.93%)", volume:"2,18,676", line:[3,9,8,15,17,16,18,18,17,19,20]},
  {logo:"L", cls:"blue", name:"LTM", price:"₹4,037.20", change:"182.80 (4.74%)", volume:"10,24,019", line:[15,13,14,12,12,10,11,9,14,16,20]},
  {logo:"U", cls:"", name:"Union Bank of India", price:"₹164.51", change:"7.25 (4.61%)", volume:"2,45,98,550", line:[4,6,5,7,8,8,15,11,16,15,17]},
  {logo:"D", cls:"", name:"DLF", price:"₹685.75", change:"26.15 (3.96%)", volume:"1,13,38,298", line:[3,12,10,14,13,15,14,13,14,14,15]}
];

const tools = [
  ["📣","IPO","6 open"],["📜","Bonds",""],["🧳","ETFs",""],["⌛","Intraday Screener",""],
  ["🗓","Stocks SIP",""],["◫","MTF stocks",""]
];

const indices = [
  ["NIFTY","24,206.90","244.10 (1.02%)"],
  ["SENSEX","77,569.39","827.57 (1.08%)"],
  ["BANKNIFTY","58,045.90","793.45 (1.39%)"]
];

const gainers = [
  {logo:"S",cls:"red",name:"Solar Industries Ind",price:"₹18,236.00",change:"856.00 (4.93%)"},
  {logo:"L",cls:"blue",name:"LTM",price:"₹4,037.20",change:"182.80 (4.74%)"},
  {logo:"U",cls:"",name:"Union Bank of India",price:"₹164.51",change:"7.25 (4.61%)"}
];

const news = [
  {logo:"M",cls:"yellow",name:"Mazagon Dock Sh...",price:"₹2,420.10",change:"47.30 (1.99%)"},
  {logo:"M",cls:"navy",name:"Exide Industries",price:"₹424.40",change:"-0.80 (0.19%)",negative:true},
  {logo:"JD",cls:"",name:"Just Dial",price:"₹564.05",change:"17.45 (3.19%)"}
];

function logo(item){
  return `<div class="logo-box ${item.cls || ""}">${item.logo}</div>`;
}

document.getElementById("tradedGrid").innerHTML = traded.map(x => `
  <article class="trade-card">${logo(x)}<h3>${x.name}</h3><p>${x.price}</p><strong>${x.change}</strong></article>
`).join("");

function sparkline(points){
  const w=100,h=30,pad=2;
  const min=Math.min(...points), max=Math.max(...points);
  const coords=points.map((v,i)=>{
    const x=pad+i*(w-pad*2)/(points.length-1);
    const y=h-pad-(v-min)*(h-pad*2)/(max-min || 1);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return `<svg class="sparkline" viewBox="0 0 100 30" aria-hidden="true"><polyline points="${coords}" fill="none" stroke="#00b386" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

document.getElementById("stockRows").innerHTML = stocks.map(x => `
  <div class="stock-row">
    <div class="company-cell">${logo(x)}<span class="company-name">${x.name}</span>${sparkline(x.line)}</div>
    <div class="price-cell">${x.price}<strong>${x.change}</strong></div>
    <div class="volume-cell">${x.volume}</div>
  </div>
`).join("");

document.getElementById("toolsList").innerHTML = tools.map(x => `
  <div class="tool-row"><div class="tool-icon">${x[0]}</div><span>${x[1]}</span>${x[2] ? `<small>${x[2]}</small>` : ""}</div>
`).join("");

document.getElementById("indicesRow").innerHTML = indices.map(x => `
  <article class="index-card"><h3>${x[0]}</h3><p>${x[1]}</p><strong>${x[2]}</strong></article>
`).join("");

function mobileCards(list){
  return list.map(x => `
    <article class="mobile-stock-card">${logo(x)}<h3>${x.name}</h3><p>${x.price}</p><strong class="${x.negative ? "negative" : ""}">${x.change}</strong></article>
  `).join("");
}
document.getElementById("gainersRow").innerHTML = mobileCards(gainers);
document.getElementById("newsRow").innerHTML = mobileCards(news);

// Demo filter state
document.querySelectorAll(".filter-row button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter-row button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js"));
}

let deferredPrompt;
const banner = document.getElementById("installBanner");
const installBtn = document.getElementById("installBtn");
const dismissBtn = document.getElementById("dismissInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  banner.hidden = false;
});
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  banner.hidden = true;
});
dismissBtn.addEventListener("click",()=> banner.hidden=true);
