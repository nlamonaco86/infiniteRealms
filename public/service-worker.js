let email = String.fromCodePoint(0x1F4E7) 
let phone = String.fromCodePoint(0x1F4DE)
let wrench = String.fromCodePoint(0x1F527)
let mma = String.fromCodePoint(0x1F3EB)
let gym = String.fromCodePoint(0x1F6B6)

console.log('%cHello.', 'background-color: maroon; font-size: 3rem; padding:10px;')
console.log(`%cI'm Nicholas LaMonaco`, 'background-color: maroon; font-size: 1.5rem; padding:5px;')
console.log(`%cAn aspiring full-stack web developer from New Jersey.`, 'background-color: maroon; font-size: 1rem; padding:5px;')
console.log(`%c${email} nlamonaco86@gmail.com`, `background-color: maroon; font-size: 1rem; padding:5px;`)
console.log(`%c${phone} 908-337-9307`, `background-color: maroon; font-size: 1rem; padding:5px;`)
console.log(`%cAbout`, 'font-size: 2rem; padding:8px;')
console.log(`%cWith a minimalist, lightweight approach, I can create effective, efficient, user-friendly and enjoyable web applications for a wide variety of uses. I learn quickly and I'm not afraid to try new ways of doing things.`, 'font-size: .85rem;')
console.log(`%cLinks`, 'font-size: 2rem; padding:8px;')
console.log(`%cGithub: http://github.com/nlamonaco86`, 'font-size: .8rem;')
console.log(`%cResume: https://nlamonaco86.github.io/Portfolio/assets/resume.pdf`, 'font-size: .8rem;')
console.log(`%cLinkedIn: https://www.linkedin.com/in/nicholas-la-monaco-98b5501b3/`, 'font-size: .8rem;')
console.log(`%cMy Projects`, 'font-size: 2rem; padding:8px;')
console.log(`%c${wrench} repairTracker: http://repairtracker.herokuapp.com`, 'font-size: 1rem;')
console.log(`%c${mma} MMA Scheduling: https://guarded-hamlet-46204.herokuapp.com/`, 'font-size: 1rem;')
console.log(`%c${gym} fullStack Fitness: https://fullstackfitness.herokuapp.com/`, 'font-size: 1rem;')
console.log(`%cDon't Say Goodbye!`, 'background-color: maroon; font-size: 2rem; padding:10px;')
console.log(`%c${email} nlamonaco86@gmail.com`, `background-color: maroon; font-size: 1rem; padding:5px;`)
console.log(`%c${phone} 908-337-9307`, `background-color: maroon; font-size: 1rem; padding:5px;`)

// // install
// self.addEventListener("install", function (event) {
//     // pre cache image data
//     event.waitUntil(
//         caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/images"))
//     );

//     // pre cache all static assets
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
//     );

//     // tell the browser to activate this service worker immediately once it
//     // has finished installing
//     self.skipWaiting();
// });

// self.addEventListener("activate", function (event) {
//     event.waitUntil(
//         caches.keys().then(keyList => {
//             return Promise.all(
//                 keyList.map(key => {
//                     if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
//                         console.log("Removing old cache data", key);
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );

//     self.clients.claim();
// });

// self.addEventListener("activate", function (event) {
//     event.waitUntil(
//         caches.keys().then(keyList => {
//             return Promise.all(
//                 keyList.map(key => {
//                     if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
//                         console.log("Removing old cache data", key);
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );

//     self.clients.claim();
// });

// self.addEventListener('fetch', function (event) {
//     if (event.request.url.includes('/api/')) {
//         console.log('[Service Worker] Fetch (data)', event.request.url);

//         event.respondWith(
//             caches.open(DATA_CACHE_NAME).then(cache => {
//                 return fetch(event.request)
//                     .then(response => {
//                         if (response.status === 200) {
//                             cache.put(event.request.url, response.clone());
//                         }

//                         return response;
//                     })
//                     .catch(err => {
//                         return cache.match(event.request);
//                     });
//             })
//         );
//         return;
//     }

//     event.respondWith(
//         caches.open(CACHE_NAME).then(cache => {
//             return cache.match(event.request).then(response => {
//                 return response || fetch(event.request);
//             });
//         })
//     );
// });