const R=(a,b)=>a+Math.random()*(b-a),P=a=>a[Math.random()*a.length|0],B=document.body;
if(!B.dataset.gate&&!sessionStorage.getItem('riya'))location.replace('index.html');
const go=u=>{B.classList.add('out');setTimeout(()=>location.href=u,700)};
addEventListener('pageshow',e=>{if(e.persisted)B.classList.remove('out')});
const split=e=>{let i=0;e.innerHTML=e.textContent.split(' ').map(w=>`<span class="wd">${[...w].map(c=>`<b style="--i:${i++}">${c}</b>`).join('')}</span>`).join(' ')};
const PEN='<svg viewBox="-40 -110 80 130" width="80" height="130" style="position:absolute;left:-40px;top:-110px;overflow:visible;filter:drop-shadow(3px 6px 4px rgba(0,0,0,.25))"><g transform="rotate(28)"><path d="M0 0L-5-15Q0-20 5-15Z" fill="#e2bd6b" stroke="#8a6a25" stroke-width=".8"/><path d="M-5-15L-7-38H7L5-15Z" fill="#2c3a5c"/><rect x="-7.5" y="-96" width="15" height="58" rx="5" fill="#34476f"/><rect x="-2" y="-92" width="3" height="46" rx="1.5" fill="#fff" opacity=".25"/><path d="M5-92v28" stroke="#e2bd6b" stroke-width="2.2"/></g></svg>';

/* pencil-flower background: hand-drawn flowers that sketch themselves in, then sway */
function bg(){
  const W=innerWidth,H=innerHeight,S=Math.max(170,Math.min(W,H)/3.6),
  pt=(l,w,r,f)=>`<path class="dr" pathLength="1" fill="url(#${f})" transform="rotate(${r})" d="M0 0C${-w} ${-l*.3} ${-w*.8} ${-l} 0 ${-l}C${w*.8} ${-l} ${w} ${-l*.3} 0 0Z"/>`,
  lf=(x,y,r,s)=>`<path class="dr" pathLength="1" fill="url(#hb)" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 0C12-9 28-8 40 0C28 8 12 9 0 0Z"/>`;
  let g='';
  for(let x=-S/3;x<W+S/2;x+=S)for(let y=-S/3;y<H+S/2;y+=S){
    const f=P(['ha','hb']),h=R(70,150),sx=R(-30,30),k=Math.random();let hd='';
    if(k<.55){const n=P([5,6,7,8,9]),l=R(26,48),w=l*R(.32,.5);for(let i=0;i<n;i++)hd+=pt(l,w,i*360/n+R(-7,7),f);hd+=`<circle class="dr" pathLength="1" r="${l*.2}" fill="url(#hc)"/>`}
    else if(k<.8)hd=`<path class="dr" pathLength="1" fill="url(#${f})" d="M-24-10C-26 24 26 24 24-10L13-34L0-14L-13-34Z"/>`;
    else for(let i=0;i<4;i++)hd+=`<circle class="dr" pathLength="1" cx="${R(-24,24)}" cy="${-i*22-R(0,8)}" r="${R(5,10)}" fill="url(#${f})"/>`;
    g+=`<g transform="translate(${x+R(-S*.4,S*.4)} ${y+R(-S*.4,S*.4)}) rotate(${R(-16,16)}) scale(${R(.75,1.3)})" style="--dl:${R(.2,4.5).toFixed(1)}s"><g class="sw" style="animation-delay:${R(-7,0).toFixed(1)}s"><path class="dr" pathLength="1" fill="none" d="M0 0C${sx} ${h*.3} ${-sx} ${h*.65} ${sx*.4} ${h}"/>${lf(sx*.2,h*.3,R(15,40),R(.6,1))}${lf(-sx*.2,h*.58,R(140,165),R(.5,.9))}${hd}</g></g>`
  }
  const d=(i,v,a)=>`<pattern id="${i}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(${a})"><rect width="6" height="6" style="fill:var(--${v});fill-opacity:.42"/><path d="M0 0V6" style="stroke:var(--pc);stroke-width:.7;opacity:.55"/></pattern>`;
  B.insertAdjacentHTML('afterbegin',`<svg id="bg" xmlns="http://www.w3.org/2000/svg"><defs>${d('ha','f1',40)+d('hb','f2',-35)+d('hc','f2',10)}</defs>${g}</svg>`)
}

/* falling petals (once=true gives a one-time burst) */
function petals(n,once){for(let i=0;i<n;i++){const p=document.createElement('i');p.className='pt';p.style.cssText=`left:${R(0,100)}vw;--s:${R(9,22)}px;--x:${R(-18,18)}vw;--d:${once?R(3.5,8):R(9,19)}s;animation-delay:${once?R(0,1.5):R(-19,0)}s;animation-iteration-count:${once?1:'infinite'};background:${P(['var(--f1)','var(--f2)','#fff'])}`;if(once)p.onanimationend=()=>p.remove();B.appendChild(p)}}

/* handwriting engine: every word is inked left to right with a slanted pen-stroke reveal,
   slight random tilt/baseline wobble per word, and a fountain pen that follows the writing */
function write(root,done){
  const ws=[],sg=window.Intl&&Intl.Segmenter?new Intl.Segmenter('hi',{granularity:'grapheme'}):null;
  root.querySelectorAll('p').forEach(p=>{
    p.innerHTML=p.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ');
    p.style.visibility='visible';
    p.querySelectorAll('.w').forEach(s=>{s.style.setProperty('--r',R(-1.6,1.6)+'deg');s.style.setProperty('--y',R(-2.5,2.5)+'px');ws.push(s)})
  });
  const pen=document.createElement('div');pen.className='pen';pen.innerHTML=PEN;root.appendChild(pen);
  let t=400,fr=[];
  ws.forEach(s=>{
    const x=s.offsetLeft,y=s.offsetTop+s.offsetHeight*.7,w=s.offsetWidth,d=(sg?[...sg.segment(s.textContent)].length:s.textContent.length)*90+140;
    s.style.setProperty('--d',d+'ms');s.style.setProperty('--t',t+'ms');
    fr.push([t,x,y],[t+d,x+w,y+R(-5,5)]);
    t+=d+(/[।,.!?]$/.test(s.textContent)?600:120)
  });
  const T=t+900,Lf=fr[fr.length-1];
  pen.animate([...fr.map(([a,x,y])=>({transform:`translate(${x}px,${y}px)`,opacity:1,offset:a/T})),{transform:`translate(${Lf[1]+100}px,${Lf[2]+160}px)`,opacity:0,offset:1}],{duration:T,fill:'both'});
  const iv=setInterval(()=>{const r=pen.getBoundingClientRect();if(r.top>innerHeight*.7)scrollBy({top:r.top-innerHeight*.45,behavior:'smooth'})},600);
  let fin=0;const f=()=>{if(fin)return;fin=1;clearInterval(iv);clearTimeout(tm);root.onclick=null;done&&done()},tm=setTimeout(f,t);
  root.onclick=()=>{try{root.getAnimations({subtree:true}).forEach(a=>a.finish())}catch(e){}f()}
}

bg();petals(+B.dataset.p||18);
document.querySelectorAll('[data-s]').forEach(split);
if(B.dataset.n)B.insertAdjacentHTML('beforeend',`<nav class="dots">${[1,2,3,4].map(i=>`<i class="${i==B.dataset.n?'on':''}"></i>`).join('')}</nav>`);
const nx=document.querySelector('.next');
if(nx){nx.onclick=()=>go(nx.dataset.to);if(!('hold' in nx.dataset))setTimeout(()=>nx.classList.add('show'),+nx.dataset.after||3200)}
    
