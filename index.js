gsap.registerPlugin(ScrollTrigger);

/* ============ CUSTOM CURSOR ============ */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0, rx=0, ry=0;
window.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
});
(function loop(){
  rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button, .event-card, input').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
});

/* ============ CONTENT DATA ============ */
const events = [
  {i:'01',n:'ROBORACE',d:'Autonomous bots navigate a live obstacle circuit against the clock.',t:'Robotics'},
  {i:'02',n:'HACK/72',d:'A 72-hour build marathon against open problem statements.',t:'Software'},
  {i:'03',n:'CIRCUIT WARS',d:'PCB design and embedded systems, judged on a working board.',t:'Hardware'},
  {i:'04',n:'AI ARENA',d:'Applied ML competition released against a surprise dataset.',t:'Machine Learning'},
  {i:'05',n:'DRONE SIEGE',d:'Aerial piloting and obstacle combat in a caged arena.',t:'Robotics'},
  {i:'06',n:'CODE RELAY',d:'Competitive programming run in a team relay format.',t:'Software'},
  {i:'07',n:'VR FORGE',d:'A 48-hour sprint to design one immersive spatial experience.',t:'Spatial Computing'},
  {i:'08',n:'QUANTUM QUIZ',d:'Rapid-fire elimination rounds across tech and applied science.',t:'General'},
];
const grid = document.getElementById('event-grid');
events.forEach(e=>{
  const card = document.createElement('div');
  card.className='event-card reveal';
  card.innerHTML = `<div class="spot"></div>
    <div class="idx mono">${e.i} / 08</div>
    <div>
      <h3>${e.n}</h3>
      <p>${e.d}</p>
      <div class="tag">${e.t}</div>
    </div>`;
  grid.appendChild(card);
});

const timelineData = [
  {day:'Day 01', title:'Ignition', desc:'Opening ceremony, keynote 01, and registration windows for every module go live across campus.'},
  {day:'Day 02', title:'Build', desc:'HACK/72 and VR FORGE hit peak build hours. Workshops run in parallel across four labs.'},
  {day:'Day 03', title:'Clash', desc:'Finals day for ROBORACE, DRONE SIEGE and CIRCUIT WARS. Mainstage keynote 03 at noon.'},
  {day:'Day 04', title:'Reveal', desc:'Final judging, results across all eight modules, and the closing ceremony with prize distribution.'},
];
const tlist = document.getElementById('timeline-list');
timelineData.forEach(t=>{
  const item = document.createElement('div');
  item.className='t-item';
  item.innerHTML = `<div class="t-day mono">${t.day}</div>
    <div class="t-title">${t.title}</div>
    <div class="t-desc">${t.desc}</div>`;
  tlist.appendChild(item);
});

const speakers = [
  {n:'Levi Ackerman', r:'Robotics Systems Lead, Orbital Dynamics'},
  {n:'Mike Zacharias', r:'Founder, NeuralForge AI'},
  {n:'Hange Zoe', r:'Embedded Security Researcher'},
  {n:'Erwin Smith', r:'Creative Director, Spatial Studio'},
];
const sgrid = document.getElementById('speaker-grid');
speakers.forEach((s,idx)=>{
  const card = document.createElement('div');
  card.className='speaker-card reveal';
  card.innerHTML = `<div class="avatar">${avatarSVG(idx)}</div>
    <h4>${s.n}</h4>
    <div class="role mono">${s.r}</div>`;
  sgrid.appendChild(card);
});
function avatarSVG(seed){
  const colors=['#4cf3ff','#f5d90a','#ff3d9a','#4cf3ff'];
  const c = colors[seed % colors.length];
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <polygon points="50,10 90,35 90,75 50,95 10,75 10,35" fill="none" stroke="${c}" stroke-width="1" opacity="0.6"/>
    <circle cx="50" cy="45" r="14" fill="none" stroke="${c}" stroke-width="1"/>
    <line x1="10" y1="35" x2="90" y2="75" stroke="${c}" stroke-width="0.5" opacity="0.4"/>
    <line x1="90" y1="35" x2="10" y2="75" stroke="${c}" stroke-width="0.5" opacity="0.4"/>
  </svg>`;
}

/* ============ 3D TILT ON EVENT / SPEAKER CARDS ============ */
function attachTilt(el, strength=10){
  el.addEventListener('mousemove', e=>{
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left)/r.width;
    const py = (e.clientY - r.top)/r.height;
    const rx = (py-0.5) * -strength;
    const ry = (px-0.5) * strength;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    el.style.setProperty('--x', (px*100)+'%');
    el.style.setProperty('--y', (py*100)+'%');
  });
  el.addEventListener('mouseleave', ()=>{
    el.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateZ(0)';
  });
}
document.querySelectorAll('.event-card, .speaker-card').forEach(el=>attachTilt(el,8));

/* ============ SCROLL REVEALS ============ */
gsap.utils.toArray('.reveal, .event-card, .speaker-card').forEach((el,i)=>{
  gsap.fromTo(el, {opacity:0, y:40}, {
    opacity:1, y:0, duration:0.8, ease:'power3.out',
    delay:(i%4)*0.06,
    scrollTrigger:{trigger:el, start:'top 88%'}
  });
});
gsap.utils.toArray('.t-item').forEach((el,i)=>{
  gsap.to(el, {opacity:1, y:0, duration:0.9, ease:'power3.out',
    scrollTrigger:{trigger:el, start:'top 82%'}});
});
gsap.from('.hero h1', {opacity:0, y:60, duration:1.1, ease:'power4.out', delay:0.2});
gsap.from('.hero-sub', {opacity:0, y:30, duration:1, ease:'power3.out', delay:0.5});
gsap.from('.hero-meta > div', {opacity:0, y:20, duration:0.8, stagger:0.08, ease:'power3.out', delay:0.75});
gsap.from('.eyebrow', {opacity:0, x:-20, duration:0.8, ease:'power3.out'});

/* register form */
document.getElementById('reg-form').addEventListener('submit', e=>{
  e.preventDefault();
  document.getElementById('form-msg').textContent = '> QUEUED. WATCH YOUR INBOX.';
});

/* mobile menu (simple toggle placeholder) */
document.getElementById('menu-toggle').addEventListener('click', ()=>{
  const links = document.querySelector('nav.links');
  const open = links.style.display === 'flex';
  links.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:70px;right:5vw;background:var(--void-2);padding:24px;border:1px solid var(--line);gap:1.2rem;';
});

/* ============ THREE.JS BACKGROUND ============ */
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 200);
camera.position.set(0,0,14);

// core: wireframe icosahedron + inner glow sphere
const coreGroup = new THREE.Group();
scene.add(coreGroup);

const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
const icoEdges = new THREE.EdgesGeometry(icoGeo);
const icoMat = new THREE.LineBasicMaterial({color:0x4cf3ff, transparent:true, opacity:0.55});
const icoLines = new THREE.LineSegments(icoEdges, icoMat);
coreGroup.add(icoLines);

const icoGeo2 = new THREE.IcosahedronGeometry(2.05, 1);
const icoEdges2 = new THREE.EdgesGeometry(icoGeo2);
const icoMat2 = new THREE.LineBasicMaterial({color:0xf5d90a, transparent:true, opacity:0.28});
const icoLines2 = new THREE.LineSegments(icoEdges2, icoMat2);
coreGroup.add(icoLines2);

const glowGeo = new THREE.SphereGeometry(1.05, 32, 32);
const glowMat = new THREE.MeshBasicMaterial({color:0x4cf3ff, transparent:true, opacity:0.12});
const glowMesh = new THREE.Mesh(glowGeo, glowMat);
coreGroup.add(glowMesh);

// particle field
const PARTICLE_COUNT = 900;
const posArr = new Float32Array(PARTICLE_COUNT*3);
const colorArr = new Float32Array(PARTICLE_COUNT*3);
const palette = [[0.30,0.95,1.0],[0.96,0.85,0.04],[1.0,0.24,0.60]];
for(let i=0;i<PARTICLE_COUNT;i++){
  const r = 8 + Math.random()*46;
  const theta = Math.random()*Math.PI*2;
  const phi = Math.acos((Math.random()*2)-1);
  posArr[i*3]   = r*Math.sin(phi)*Math.cos(theta);
  posArr[i*3+1] = r*Math.sin(phi)*Math.sin(theta);
  posArr[i*3+2] = r*Math.cos(phi) - 20;
  const c = palette[Math.floor(Math.random()*palette.length)];
  colorArr[i*3]=c[0]; colorArr[i*3+1]=c[1]; colorArr[i*3+2]=c[2];
}
const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr,3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArr,3));
const particleMat = new THREE.PointsMaterial({size:0.09, vertexColors:true, transparent:true, opacity:0.75, sizeAttenuation:true});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// a few connecting circuit lines from core to nearby nodes
const lineGroup = new THREE.Group();
scene.add(lineGroup);
for(let i=0;i<14;i++){
  const idx = Math.floor(Math.random()*PARTICLE_COUNT);
  const target = new THREE.Vector3(posArr[idx*3]*0.35, posArr[idx*3+1]*0.35, posArr[idx*3+2]*0.35+20);
  const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), target]);
  const mat = new THREE.LineBasicMaterial({color:0x4cf3ff, transparent:true, opacity:0.10});
  lineGroup.add(new THREE.Line(geo, mat));
}

window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// mouse parallax
let targetRotX=0, targetRotY=0;
window.addEventListener('mousemove', e=>{
  targetRotY = ((e.clientX/window.innerWidth)-0.5) * 0.6;
  targetRotX = ((e.clientY/window.innerHeight)-0.5) * 0.6;
});

// click pulse on core
let pulseT = 0;
window.addEventListener('click', e=>{
  const raycaster = new THREE.Raycaster();
  const m = new THREE.Vector2((e.clientX/window.innerWidth)*2-1, -(e.clientY/window.innerHeight)*2+1);
  raycaster.setFromCamera(m, camera);
  const hit = raycaster.intersectObject(glowMesh);
  if(hit.length){ pulseT = 1; }
});

// scroll-driven camera dolly
const scrollState = {z:14, coreScale:1};
ScrollTrigger.create({
  trigger:'main',
  start:'top top',
  end:'bottom bottom',
  scrub:1,
  onUpdate: self=>{
    const p = self.progress;
    scrollState.z = 14 - p*30;
    scrollState.coreScale = 1 - p*0.55;
  }
});

const clock = new THREE.Clock();
function animate(){
  const dt = clock.getDelta();
  const t = clock.getElapsedTime();

  coreGroup.rotation.y += dt*0.18;
  coreGroup.rotation.x += dt*0.06;
  coreGroup.rotation.y += (targetRotY - 0) * dt * 0.6;
  coreGroup.rotation.x += (targetRotX - 0) * dt * 0.6;

  if(pulseT>0){
    pulseT -= dt*1.6;
    const s = 1 + Math.max(pulseT,0)*0.6;
    coreGroup.scale.setScalar(THREE.MathUtils.lerp(coreGroup.scale.x, s*scrollState.coreScale, 0.3));
  } else {
    coreGroup.scale.setScalar(THREE.MathUtils.lerp(coreGroup.scale.x, scrollState.coreScale, 0.08));
  }

  particles.rotation.y += dt*0.015;
  lineGroup.rotation.y += dt*0.015;

  camera.position.z += (scrollState.z - camera.position.z)*0.06;
  camera.position.x = Math.sin(t*0.05)*0.4;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();