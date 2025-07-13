    // Canvas animation script from our previous projects
    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('space-canvas');
        const ctx = canvas.getContext('2d');
        let stars = [], blackHole, nebulas = [], sun, saturn, earth, mars, moon;
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        function init() {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            sun = { x: canvas.width * 0.9, y: canvas.height * 0.1, radius: 60, parallax: 0.1 };
            blackHole = { x: canvas.width / 2, y: canvas.height / 2, radius: 40, angle: 0, parallax: 0.05 };
            saturn = { x: canvas.width * 0.15, y: canvas.height * 0.2, radius: 30, parallax: 0.08 };
            earth = { x: canvas.width * 0.8, y: canvas.height * 0.8, radius: 25, parallax: 0.06 };
            mars = { x: canvas.width * 0.2, y: canvas.height * 0.75, radius: 20, parallax: 0.07 };
            moon = { orbitRadius: 45, angle: 0, parallax: 0.06 };
            stars = []; const starCount = window.innerWidth > 768 ? 500 : 250;
            for (let i = 0; i < starCount; i++) { stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 1.5, alpha: Math.random() * 0.5 + 0.5, twinkle: Math.random() * 0.02, parallax: Math.random() * 0.04 + 0.01 }); }
            nebulas = [];
            for(let i = 0; i < 3; i++) { nebulas.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 200 + 150, color: `rgba(${100 + Math.random() * 50}, ${50 + Math.random() * 50}, ${150 + Math.random() * 50}, 0.1)`, speedX: (Math.random() - 0.5) * 0.1, speedY: (Math.random() - 0.5) * 0.1 }); }
        }
        function drawSun(x, y) { ctx.save(); ctx.translate(x, y); const g = ctx.createRadialGradient(0, 0, sun.radius * 0.8, 0, 0, sun.radius * 2.5); g.addColorStop(0, 'rgba(255, 255, 220, 1)'); g.addColorStop(0.2, 'rgba(255, 220, 100, 0.5)'); g.addColorStop(0.5, 'rgba(255, 180, 50, 0.1)'); g.addColorStop(1, 'rgba(255, 150, 0, 0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, sun.radius * 2.5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
        function drawSaturn(x, y) { ctx.save(); ctx.translate(x,y); ctx.strokeStyle='rgba(210,180,140,0.7)'; ctx.lineWidth=4; ctx.beginPath(); ctx.ellipse(0,0,saturn.radius*2.2,saturn.radius*0.8,-0.4,0,Math.PI*2); ctx.stroke(); ctx.fillStyle='#E3B971'; ctx.beginPath(); ctx.arc(0,0,saturn.radius,0,Math.PI*2); ctx.fill(); ctx.restore(); }
        function drawEarth(x, y) { ctx.save(); ctx.translate(x,y); const g=ctx.createRadialGradient(0,0,earth.radius,0,0,earth.radius*1.5); g.addColorStop(0,'rgba(100,150,255,0.3)'); g.addColorStop(1,'rgba(100,150,255,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,earth.radius*1.5,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#4D94DB'; ctx.beginPath(); ctx.arc(0,0,earth.radius,0,Math.PI*2); ctx.fill(); ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.ellipse(-5,-10,20,8,0.5,0,Math.PI*2); ctx.ellipse(10,5,18,6,-0.3,0,Math.PI*2); ctx.fill(); ctx.restore(); }
        function drawMars(x, y) { ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#C1440E'; ctx.beginPath(); ctx.arc(0, 0, mars.radius, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; ctx.beginPath(); ctx.arc(0, -mars.radius + 3, 5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
        function drawMoon(x, y) { ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#B0B0B0'; ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const pX = (mouse.x - canvas.width / 2) * 0.5, pY = (mouse.y - canvas.height / 2) * 0.5;
            nebulas.forEach(n => { n.x += n.speedX; n.y += n.speedY; if(n.x+n.radius<0) n.x=canvas.width+n.radius; if(n.x-n.radius>canvas.width) n.x=-n.radius; if(n.y+n.radius<0) n.y=canvas.height+n.radius; if(n.y-n.radius>canvas.height) n.y=-n.radius; const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.radius); g.addColorStop(0,n.color); g.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=g; ctx.fillRect(0,0,canvas.width,canvas.height); });
            stars.forEach(s => { const sx=s.x+pX*s.parallax, sy=s.y+pY*s.parallax; s.alpha+=s.twinkle; if(s.alpha>1||s.alpha<0.5) s.twinkle=-s.twinkle; ctx.globalAlpha=s.alpha; ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(sx,sy,s.radius,0,Math.PI*2); ctx.fill(); });
            ctx.globalAlpha = 1;
            const sunX = sun.x+pX*sun.parallax, sunY = sun.y+pY*sun.parallax;
            const saturnX = saturn.x+pX*saturn.parallax, saturnY = saturn.y+pY*saturn.parallax;
            const earthX = earth.x+pX*earth.parallax, earthY = earth.y+pY*earth.parallax;
            const marsX = mars.x+pX*mars.parallax, marsY = mars.y+pY*mars.parallax;
            const bhX = blackHole.x+pX*blackHole.parallax, bhY = blackHole.y+pY*blackHole.parallax;
            moon.angle += 0.01;
            const moonX = earthX + moon.orbitRadius * Math.cos(moon.angle), moonY = earthY + moon.orbitRadius * Math.sin(moon.angle);
            drawSun(sunX, sunY); drawSaturn(saturnX, saturnY); drawMars(marsX, marsY); drawEarth(earthX, earthY); drawMoon(moonX, moonY);
            ctx.save(); ctx.translate(bhX, bhY);
            ctx.fillStyle='black'; ctx.beginPath(); ctx.arc(0,0,blackHole.radius,0,Math.PI*2); ctx.fill();
            ctx.rotate(blackHole.angle); const dG=ctx.createLinearGradient(-blackHole.radius*2.5,0,blackHole.radius*2.5,0); dG.addColorStop(0,'rgba(255,200,0,0.8)'); dG.addColorStop(0.5,'rgba(160,60,255,0.9)'); dG.addColorStop(1,'rgba(255,200,0,0.8)');
            ctx.strokeStyle=dG; ctx.lineWidth=3; ctx.shadowColor='rgba(160,60,255,0.7)'; ctx.shadowBlur=15;
            ctx.beginPath(); ctx.ellipse(0,0,blackHole.radius*2,blackHole.radius*0.7,0,0,Math.PI*2); ctx.stroke();
            ctx.lineWidth=1.5; ctx.shadowBlur=5; ctx.beginPath(); ctx.ellipse(0,0,blackHole.radius*1.5,blackHole.radius*0.5,0,0,Math.PI*2); ctx.stroke();
            ctx.restore(); blackHole.angle += 0.003;
            requestAnimationFrame(draw);
        }
        window.addEventListener('resize', init);
        window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
        init();
        draw();
    });