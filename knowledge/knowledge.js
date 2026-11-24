(function(){
const data=window.ORBIT_KNOWLEDGE;if(!data)return;
const root=document.querySelector("[data-knowledge-root]");if(!root)return;
const search=document.querySelector("#knowledge-search"),categoryWrap=document.querySelector("#knowledge-categories"),articleWrap=document.querySelector("#knowledge-articles"),count=document.querySelector("#knowledge-count"),empty=document.querySelector("#knowledge-empty");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let active="all",term="";
const progressKey="rf983KnowledgeProgress";let progress={};try{progress=JSON.parse(localStorage.getItem(progressKey)||"{}")||{};}catch(e){}
function renderCategories(){
categoryWrap.innerHTML=data.categories.map(c=>{const n=data.articles.filter(a=>a.category===c.id).length;return '<article class="k-card"><div class="k-icon">'+c.icon+'</div><h3>'+esc(c.name)+'</h3><p>'+esc(c.description)+'</p><div class="k-topic-list">'+c.topics.slice(0,4).map(t=>'<span class="k-topic">'+esc(t)+'</span>').join("")+'</div><a href="#collection-'+c.id+'">Explore collection ↓</a></article>'}).join("");
}
function renderArticles(){
const q=term.toLowerCase();
const list=data.articles.filter(a=>(active==="all"||a.category===active)&&(!q||(a.title+" "+a.summary+" "+a.category).toLowerCase().includes(q)));
articleWrap.innerHTML=list.map(a=>{const c=data.categories.find(x=>x.id===a.category);return '<article class="k-card k-article-card"><div class="k-meta">'+esc(c.name.toUpperCase())+' · '+esc(a.level)+' · '+esc(a.read)+'</div><h3>'+esc(a.title)+'</h3><p>'+esc(a.summary)+'</p><a href="article.html?topic='+encodeURIComponent(a.slug)+'">'+(progress[a.slug]?'Completed ✓ · Review guide ↗':'Read learning guide ↗')+'</a></article>'}).join("");
count.textContent=list.length+" learning guides · "+Object.keys(progress).length+" completed on this device";
empty.hidden=list.length!==0;
}
function renderRoadmap(){
const q=term.toLowerCase();
const cats=data.categories.filter(c=>(active==="all"||active===c.id)&&(!q||(c.name+" "+c.description+" "+c.topics.join(" ")).toLowerCase().includes(q)));
const el=document.querySelector("#knowledge-roadmaps");
el.innerHTML=cats.map(c=>'<section class="k-section" id="collection-'+c.id+'"><div class="k-section-head"><h2>'+c.icon+' '+esc(c.name)+'</h2><span class="k-muted">'+c.topics.length+' topics in collection plan</span></div><div class="k-roadmap"><p>'+esc(c.description)+'</p><ul>'+c.topics.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul></div></section>').join("");
}
function update(){renderArticles();renderRoadmap();}
renderCategories();update();
search?.addEventListener("input",()=>{term=search.value.trim();update();});
document.querySelector("#knowledge-filter")?.addEventListener("change",e=>{active=e.target.value;update();});
document.querySelector("#knowledge-reset")?.addEventListener("click",()=>{active="all";term="";search.value="";document.querySelector("#knowledge-filter").value="all";update();});
const totalTopics=data.categories.reduce((n,c)=>n+c.topics.length,0);
document.querySelector("#knowledge-universe-count").textContent=data.categories.length;
document.querySelector("#knowledge-topic-count").textContent=totalTopics;
document.querySelector("#knowledge-guide-count").textContent=data.articles.length;
})();