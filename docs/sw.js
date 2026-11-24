// Mreza do 6 s; ako ne odgovori ili javi gresku, zadnje spremljeno. Brisu se samo vlastite stare predmemorije.
const C="pregled-v2",S=["./","index.html","icons/icon-192.png"],kopija=q=>caches.open(C).then(c=>c.match(q,{ignoreSearch:true}));
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(S)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("pregled-")&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=="GET")return;
e.respondWith((async()=>{const t=new AbortController(),h=setTimeout(()=>t.abort(),6000);let r;
try{r=await fetch(e.request,{signal:t.signal});if(r.ok){const b=await r.clone().blob();(await caches.open(C)).put(u.origin+u.pathname,new Response(b,{headers:r.headers}));return r}}catch(x){}finally{clearTimeout(h)}
return (await kopija(e.request))||r||Response.error()})())});
