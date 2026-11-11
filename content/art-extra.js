/* Firefighter Training — extra hand-drawn SVG artwork + the picture questions that use it.
   Each entry in FGA_ART is a function returning an <svg class="art">. They run at render time,
   so they may call helpers defined in index.html (hydrant, sprinkler). */
(function(){
const A=window.FGA_ART=window.FGA_ART||{};
const svg=(vb,inner,mw)=>`<svg class="art" viewBox="${vb}"${mw?` style="max-width:${mw}px"`:''}>${inner}</svg>`;
const T=(x,y,s,txt,fill,anchor,w)=>`<text x="${x}" y="${y}" font-family="Oswald,Impact,sans-serif" font-weight="${w||700}" font-size="${s}" fill="${fill||'#fff'}" text-anchor="${anchor||'middle'}">${txt}</text>`;
const flame=(cx,cy,s,c)=>`<path transform="translate(${cx} ${cy}) scale(${s})" d="M0 -30 C10 -18 18 -10 14 4 C12 12 6 16 0 16 C-6 16 -12 12 -14 4 C-17 -6 -8 -12 -6 -22 C-2 -16 -2 -10 2 -8 C4 -14 2 -22 0 -30Z" fill="${c}"/>`;

/* --- Hydrant & sprinkler variants (reuse index.html art) --- */
A['hyd-red']=()=>hydrant('#dc2626');
A['sprinkler-green']=()=>sprinkler().replace('#ef233c','#16a34a');

/* --- DOT placards --- */
function placard(bg,sym,num,numCol,split){
  const half=split?`<clipPath id="pc-${num}"><rect x="0" y="110" width="220" height="110"/></clipPath><polygon points="110,6 214,110 110,214 6,110" fill="#111" clip-path="url(#pc-${num})"/>`:'';
  return svg('0 0 220 220',`<polygon points="110,6 214,110 110,214 6,110" fill="${bg}" stroke="${split?'#d6d3d1':'#111'}" stroke-width="3"/>${half}<polygon points="110,16 204,110 110,204 16,110" fill="none" stroke="${split?'#fff':numCol}" stroke-width="2.5"/>${sym}${T(110,186,30,num,numCol)}`,220);
}
A['placard-3']=()=>placard('#d7262e',flame(110,78,1.7,'#fff'),'3','#fff');
A['placard-2']=()=>placard('#15803d',`<g fill="#fff"><rect x="96" y="52" width="28" height="64" rx="12"/><rect x="104" y="42" width="12" height="12" rx="2"/><rect x="98" y="38" width="24" height="6" rx="2"/></g>`,'2','#fff');
A['placard-5']=()=>placard('#facc15',`<circle cx="110" cy="96" r="16" fill="none" stroke="#111" stroke-width="5"/>${flame(110,70,1.3,'#111')}`,'5.1','#111');
A['placard-8']=()=>placard('#fff',`<g fill="#111"><path d="M80 52 l10 -8 l6 10 l-10 6z"/><path d="M130 52 l10 -8 l6 10 l-10 6z"/><circle cx="88" cy="70" r="3"/><circle cx="88" cy="82" r="3"/><circle cx="138" cy="70" r="3"/><circle cx="138" cy="82" r="3"/><rect x="72" y="94" width="30" height="10" rx="2"/><path d="M122 100 q8 -8 20 -2 l6 4 h-26z"/></g>`,'8','#fff',true);

/* --- Extinguisher pictographs --- */
const box=inner=>svg('0 0 200 200',`<rect x="8" y="8" width="184" height="184" rx="18" fill="#f1ece6"/>${inner}`,200);
A['ext-b']=()=>box('<rect x="36" y="36" width="128" height="128" fill="#dc2626"/>');
A['ext-k']=()=>{let p=[];for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;p.push((100+72*Math.cos(a)).toFixed(1)+','+(100+72*Math.sin(a)).toFixed(1))}return box(`<polygon points="${p.join(' ')}" fill="#111"/>`)};

/* --- Triage tags --- */
function tag(c){return svg('0 0 160 220',`<rect x="20" y="10" width="120" height="200" rx="10" fill="#f5f1e8" stroke="#bbb"/><circle cx="80" cy="30" r="7" fill="#120f0e" stroke="#999"/><path d="M80 23 Q60 0 40 4" stroke="#bbb" stroke-width="2" fill="none"/><g fill="#9a948a"><rect x="34" y="50" width="92" height="5" rx="2"/><rect x="34" y="62" width="70" height="5" rx="2"/><rect x="34" y="74" width="82" height="5" rx="2"/><rect x="34" y="86" width="60" height="5" rx="2"/></g><rect x="20" y="130" width="120" height="80" rx="0" fill="${c}"/><rect x="20" y="200" width="120" height="10" rx="5" fill="${c}"/>`,150)}
A['triage-red']=()=>tag('#dc2626');A['triage-yellow']=()=>tag('#facc15');A['triage-green']=()=>tag('#16a34a');A['triage-black']=()=>tag('#111');

/* --- Hazmat control zones --- */
A['zones']=()=>svg('0 0 260 220',`<rect width="260" height="220" fill="#1b1614"/><circle cx="130" cy="110" r="100" fill="#14532d"/><circle cx="130" cy="110" r="68" fill="#a16207"/><circle cx="130" cy="110" r="36" fill="#b91c1c"/><ellipse cx="130" cy="112" rx="16" ry="8" fill="#111" opacity=".7"/><g stroke="#9fd3ff" stroke-width="3" fill="#9fd3ff"><line x1="16" y1="200" x2="56" y2="200"/><polygon points="56,194 66,200 56,206"/></g>${T(40,192,10,'WIND','#9fd3ff')}`,280);

/* --- Collapse zone --- */
A['collapse-zone']=()=>svg('0 0 280 200',`<rect width="280" height="200" fill="#1b1614"/><rect x="0" y="170" width="280" height="30" fill="#3a2f2a"/><rect x="30" y="50" width="70" height="120" fill="#6b4f3a"/><g fill="#2a211e">${[66,96,126].map(y=>`<rect x="42" y="${y}" width="16" height="16"/><rect x="72" y="${y}" width="16" height="16"/>`).join('')}</g><g fill="#ff7a2a">${flame(64,46,0.9,'#ff5a1f')}</g><g stroke="#ffb020" stroke-width="2"><line x1="20" y1="50" x2="20" y2="170"/><line x1="15" y1="50" x2="25" y2="50"/><line x1="15" y1="170" x2="25" y2="170"/><line x1="100" y1="186" x2="262" y2="186" stroke-dasharray="6 4"/></g>${T(12,114,14,'H','#ffb020')}${T(182,180,16,'? × H','#ffb020')}<rect x="240" y="150" width="34" height="20" rx="3" fill="#e3262b"/><circle cx="248" cy="172" r="5" fill="#111"/><circle cx="266" cy="172" r="5" fill="#111"/>`,320);

/* --- Ladder part --- */
A['ldr-beam']=()=>svg('0 0 200 240',`<rect width="200" height="240" fill="#1b1614"/><g stroke="#e5e7eb" stroke-width="7" stroke-linecap="round"><line x1="70" y1="14" x2="70" y2="226"/><line x1="130" y1="14" x2="130" y2="226"/></g><g stroke="#cbd5e1" stroke-width="4">${[34,62,90,118,146,174,202].map(y=>`<line x1="70" y1="${y}" x2="130" y2="${y}"/>`).join('')}</g><g stroke="#ffb020" stroke-width="3" fill="#ffb020"><line x1="178" y1="100" x2="140" y2="118"/><polygon points="138,112 132,122 144,124"/></g>${T(184,98,24,'?','#ffb020')}`,200);

/* --- Roof styles --- */
function house(roof){return svg('0 0 260 180',`<rect width="260" height="180" fill="#1b1614"/><rect x="0" y="160" width="260" height="20" fill="#3a2f2a"/><rect x="50" y="100" width="160" height="60" fill="#c9b8a6"/><rect x="70" y="118" width="22" height="22" fill="#5a7a96"/><rect x="168" y="118" width="22" height="22" fill="#5a7a96"/><rect x="118" y="124" width="24" height="36" fill="#6b4f3a"/>${roof}`,300)}
A['roof-gable']=()=>house('<polygon points="40,100 130,30 220,100" fill="#7a2a16"/><polygon points="50,100 130,40 210,100" fill="#8f3a22"/>');
A['roof-hip']=()=>house('<polygon points="40,100 90,44 170,44 220,100" fill="#8f3a22"/><polygon points="40,100 90,44 90,100" fill="#7a2a16" opacity=".8"/><polygon points="220,100 170,44 170,100" fill="#6a2412" opacity=".8"/>');
A['roof-gambrel']=()=>house('<polygon points="40,100 64,52 130,30 196,52 220,100" fill="#8f3a22"/><polyline points="64,52 196,52" stroke="#5a1c0e" stroke-width="2" fill="none"/>');
A['roof-mansard']=()=>house('<polygon points="44,100 60,50 200,50 216,100" fill="#8f3a22"/><rect x="58" y="44" width="144" height="8" fill="#5a1c0e"/><rect x="84" y="62" width="18" height="22" fill="#5a7a96"/><rect x="158" y="62" width="18" height="22" fill="#5a7a96"/>');

/* --- Lightweight truss with gusset plates --- */
A['truss']=()=>svg('0 0 300 160',`<rect width="300" height="160" fill="#1b1614"/><g stroke="#d6b07a" stroke-width="9" stroke-linecap="round"><line x1="20" y1="130" x2="280" y2="130"/><line x1="20" y1="130" x2="150" y2="30"/><line x1="280" y1="130" x2="150" y2="30"/></g><g stroke="#c49a63" stroke-width="6"><line x1="85" y1="130" x2="85" y2="80"/><line x1="215" y1="130" x2="215" y2="80"/><line x1="85" y1="130" x2="150" y2="30"/><line x1="215" y1="130" x2="150" y2="30"/><line x1="150" y1="130" x2="150" y2="30"/></g><g fill="#9aa3ab" stroke="#e5e7eb" stroke-width="1">${[[150,40],[85,128],[150,128],[215,128],[85,82],[215,82]].map(([x,y])=>`<rect x="${x-11}" y="${y-9}" width="22" height="18" rx="2"/>`).join('')}</g><g fill="none" stroke="#ffb020" stroke-width="3"><circle cx="150" cy="128" r="20"/></g>`,340);

/* --- Building sides (plan view) --- */
A['sides']=()=>svg('0 0 240 240',`<rect width="240" height="240" fill="#1b1614"/><rect x="0" y="206" width="240" height="34" fill="#2b2b2b"/><g stroke="#ffd34d" stroke-width="2" stroke-dasharray="12 10"><line x1="0" y1="223" x2="240" y2="223"/></g>${T(200,235,11,'STREET','#bbb')}<rect x="60" y="50" width="120" height="120" fill="#6b4f3a" stroke="#c9b8a6" stroke-width="3"/>${T(120,194,22,'A','#ffb020')}${T(40,118,22,'B','#ffb020')}${T(120,40,26,'?','#ffb020')}${T(200,118,22,'D','#ffb020')}`,240);

/* --- Flow path --- */
A['flowpath']=()=>svg('0 0 300 190',`<rect width="300" height="190" fill="#1b1614"/><rect x="20" y="30" width="260" height="140" fill="#2d2421" stroke="#6b5a50" stroke-width="4"/><rect x="20" y="0" width="0" height="0"/><rect x="16" y="100" width="10" height="70" fill="#1b1614"/><rect x="274" y="56" width="10" height="44" fill="#1b1614"/><rect x="20" y="30" width="260" height="46" fill="#4a4040" opacity=".85"/>${flame(230,160,1.4,'#ff5a1f')}${flame(246,160,0.9,'#ffb020')}<g stroke="#9fd3ff" stroke-width="4" fill="#9fd3ff"><line x1="0" y1="150" x2="60" y2="150"/><polygon points="60,143 72,150 60,157"/><line x1="90" y1="150" x2="170" y2="150"/><polygon points="170,143 182,150 170,157"/></g><g stroke="#ff7a2a" stroke-width="4" fill="#ff7a2a"><line x1="200" y1="66" x2="268" y2="66"/><polygon points="268,59 282,66 268,73"/><line x1="282" y1="66" x2="296" y2="66"/><path d="M230 130 Q236 96 210 70" fill="none"/></g>${T(48,138,11,'DOOR','#bbb')}${T(250,50,11,'WINDOW','#bbb')}`,340);

/* --- Neutral plane at a doorway --- */
A['neutral']=()=>svg('0 0 240 200',`<rect width="240" height="200" fill="#1b1614"/><rect x="70" y="20" width="100" height="170" fill="#0e0c0b" stroke="#6b5a50" stroke-width="6"/><rect x="73" y="23" width="94" height="78" fill="#3f3633"/><g stroke="#8a7f78" stroke-width="5" fill="none" stroke-linecap="round"><path d="M100 50 q-30 -6 -70 -20"/><path d="M130 72 q-40 -2 -100 -8"/></g><g stroke="#9fd3ff" stroke-width="4" fill="#9fd3ff"><line x1="10" y1="150" x2="60" y2="150"/><polygon points="60,144 72,150 60,156"/></g><line x1="40" y1="102" x2="220" y2="102" stroke="#ffb020" stroke-width="3" stroke-dasharray="8 6"/>${T(214,96,22,'?','#ffb020')}`,260);

/* --- ICS organization --- */
A['ics-org']=()=>{const b=(x,y,w,t,hl)=>`<rect x="${x}" y="${y}" width="${w}" height="30" rx="5" fill="${hl?'#3a2a12':'#2d2421'}" stroke="${hl?'#ffb020':'#6b5a50'}" stroke-width="2"/>${T(x+w/2,y+20,hl?18:11,t,hl?'#ffb020':'#f1e6dc',null,600)}`;
 return svg('0 0 320 170',`<rect width="320" height="170" fill="#1b1614"/><g stroke="#6b5a50" stroke-width="2"><line x1="160" y1="44" x2="160" y2="96"/><line x1="44" y1="96" x2="276" y2="96"/>${[44,121,199,276].map(x=>`<line x1="${x}" y1="96" x2="${x}" y2="114"/>`).join('')}<line x1="160" y1="66" x2="230" y2="66"/></g>${b(110,14,100,'INCIDENT CMD')}${b(230,52,82,'CMD STAFF')}${b(6,114,76,'OPERATIONS')}${b(83,114,76,'PLANNING')}${b(161,114,76,'?',true)}${b(238,114,76,'FINANCE/ADM')}`,360)};

/* --- Collapse types --- */
function col(inner){return svg('0 0 260 170',`<rect width="260" height="170" fill="#1b1614"/><rect x="0" y="150" width="260" height="20" fill="#3a2f2a"/><rect x="20" y="30" width="16" height="120" fill="#8a7f78"/><rect x="224" y="30" width="16" height="120" fill="#8a7f78"/>${inner}`,300)}
A['collapse-lean']=()=>col('<polygon points="36,40 36,52 224,148 224,138" fill="#c9b8a6"/><circle cx="70" cy="128" r="6" fill="#ffb020"/>');
A['collapse-v']=()=>col('<polygon points="36,40 36,52 130,148 130,136" fill="#c9b8a6"/><polygon points="224,40 224,52 130,148 130,136" fill="#b3a492"/><circle cx="56" cy="128" r="6" fill="#ffb020"/><circle cx="204" cy="128" r="6" fill="#ffb020"/>');
A['collapse-pancake']=()=>col('<rect x="36" y="140" width="188" height="10" fill="#c9b8a6"/><rect x="36" y="128" width="188" height="10" fill="#b3a492"/><rect x="36" y="116" width="188" height="10" fill="#c9b8a6"/><rect x="20" y="20" width="16" height="10" fill="#8a7f78"/>');

/* --- Picture questions that use this art --- */
const B=window.FGA_Q=window.FGA_Q||[];const q=(...a)=>B.push(a);
q(1,'Extinguishers','An extinguisher label shows this RED SQUARE symbol. Which class of fire is it for?',['Class B — flammable liquids and gases','Class A — ordinary combustibles','Class C — energized electrical','Class K — cooking oils'],'The geometric labeling system: green triangle = A, red square = B, blue circle = C, yellow star = D, black hexagon = K.',{img:'ext-b'});
q(1,'Extinguishers','This BLACK HEXAGON symbol on an extinguisher indicates it is rated for:',['Class K — cooking oils and fats','Class D — combustible metals','Class B — flammable liquids','Class C — electrical'],'Class K extinguishers (wet chemical) are required in commercial kitchens.',{img:'ext-k'});
q(1,'Hazmat','In this diagram of hazmat control zones, the YELLOW ring around the release is the:',['Warm zone (contamination reduction zone)','Hot zone','Cold zone','Isolation zone'],'Hot (red) = contamination; warm (yellow) = decon corridor; cold (green) = command and support. Set zones upwind and uphill when possible.',{img:'zones'});
q(1,'First Aid','Under START triage, a patient tagged with this YELLOW tag is:',['Delayed — serious injuries, but can wait a short time for treatment','Immediate','Minor (walking wounded)','Deceased/expectant'],'Yellow patients are not walking but have breathing, perfusion, and mental status within START limits.',{img:'triage-yellow'});
q(1,'First Aid','Under START triage, a BLACK tag is assigned to a patient who:',['Is not breathing even after the airway is repositioned','Is walking','Has a broken arm','Is breathing over 30 times per minute'],'Black = deceased or expectant. Resources go first to patients who can be saved.',{img:'triage-black'});
q(1,'Building Construction','What type of roof is shown?',['Gable','Hip','Gambrel','Mansard'],'A gable roof has two sloping sides meeting at a ridge, with triangular end walls.',{img:'roof-gable'});
q(1,'Building Construction','What type of roof is shown (slopes on all four sides)?',['Hip','Gable','Gambrel','Flat'],'Hip roofs slope down on all sides. They are harder to ladder and ventilate than gable roofs.',{img:'roof-hip'});
q(1,'Building Construction','This barn-style roof with two different slopes on each side is a:',['Gambrel roof','Mansard roof','Hip roof','Butterfly roof'],'Gambrel roofs are common on barns and Dutch Colonial houses; the steep lower slope creates attic living space.',{img:'roof-gambrel'});
q(1,'Building Construction','This roof, with steep sides (often with windows) and a nearly flat top, is a:',['Mansard roof','Gambrel roof','Gable roof','Shed roof'],'Mansard roofs can hide large void spaces and an old roof under a new one — fire can travel through them.',{img:'roof-mansard'});
q(1,'Building Construction','The metal plates (circled) that connect the members of this lightweight truss are called:',['Gusset plates','Tie rods','Purlins','Spreaders'],'Gusset plates have short teeth that pull out of the wood as it chars, causing early truss failure.',{img:'truss'});
q(1,'Communications & ICS','Using standard side designations, the side marked ? in this plan view is:',['Side C (rear)','Side A','Side B','Side D'],'Side A faces the street (address side). B, C, and D follow clockwise when viewed from above.',{img:'sides'});
q(1,'Fire Behavior','The arrows in this diagram show:',['A flow path — fresh air drawn in low through the door and hot gases exhausting out the window','Water flowing from a hoseline','Positive pressure ventilation only','Smoke being pulled into the door'],'Firefighters and victims between the intake and the exhaust are in the path of heat and smoke. Controlling the door controls the flow path.',{img:'flowpath'});
q(1,'Fire Behavior','In this doorway, the dashed line (?) between the smoke going out and the air coming in is the:',['Neutral plane','Thermal barrier','Flash point','Fire line'],'Watch the neutral plane — if it drops toward the floor, conditions are getting worse.',{img:'neutral'});
q(1,'Communications & ICS','Which General Staff section is missing from this ICS chart?',['Logistics','Safety','Liaison','Staging'],'The four General Staff sections are Operations, Planning, Logistics, and Finance/Administration.',{img:'ics-org'});
q(1,'Ladders','The long side rail marked ? on this ladder is called the:',['Beam','Rung','Halyard','Fly'],'The beams carry the load to the ground. Rungs are the cross members you climb on.',{img:'ldr-beam'});
q(2,'Building Collapse','The collapse pattern shown (one end of the floor still attached to a wall) is a:',['Lean-to collapse','V-shaped collapse','Pancake collapse','Cantilever collapse'],'The triangular space under the supported end is a likely survivable void (shown with a dot).',{img:'collapse-lean'});
q(2,'Building Collapse','The collapse pattern shown (floor failed in the middle) is a:',['V-shaped collapse','Lean-to collapse','Pancake collapse','A-frame collapse'],'Voids form along both walls in a V-shaped collapse.',{img:'collapse-v'});
q(2,'Building Collapse','The collapse pattern shown (floors stacked flat on each other) is a:',['Pancake collapse','Lean-to collapse','V-shaped collapse','Cantilever collapse'],'Pancake collapses leave the fewest survivable voids.',{img:'collapse-pancake'});
})();
