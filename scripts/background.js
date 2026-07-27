/* reactive dot-grid background — brightens toward the pointer, drifts when idle */
(function () {
    const canvas = document.getElementById("bg");
    if (!canvas) {
        return;
    }
    const ctx = canvas.getContext("2d");

    const GAP = 40;      // spacing between dots (css px)
    const RADIUS = 170;  // pointer influence radius (css px)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cols = Math.ceil(w / GAP) + 1;
        rows = Math.ceil(h / GAP) + 1;
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function draw(time) {
        ctx.clearRect(0, 0, w, h);

        let px = pointer.x;
        let py = pointer.y;
        if (!pointer.active && !reduce) {
            /* gentle drift so it feels alive without a mouse (and on touch) */
            px = w * 0.5 + Math.cos(time * 0.0004) * w * 0.32;
            py = h * 0.5 + Math.sin(time * 0.00055) * h * 0.30;
        }

        if (!reduce) {
            const glow = ctx.createRadialGradient(px, py, 0, px, py, RADIUS * 2);
            glow.addColorStop(0, "rgba(94, 139, 222, 0.07)");
            glow.addColorStop(1, "rgba(94, 139, 222, 0)");
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, w, h);
        }

        for (let gy = 0; gy < rows; gy++) {
            for (let gx = 0; gx < cols; gx++) {
                const x = gx * GAP;
                const y = gy * GAP;
                let f = 0;
                if (!reduce) {
                    const dx = x - px;
                    const dy = y - py;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    f = dist < RADIUS ? 1 - dist / RADIUS : 0;
                }
                const alpha = 0.05 + f * f * 0.8;
                const size = 0.8 + f * 2.2;

                if (f > 0.02) {
                    ctx.fillStyle = "rgba(" +
                        (lerp(174, 143, f) | 0) + ", " +
                        (lerp(181, 176, f) | 0) + ", " +
                        (lerp(184, 234, f) | 0) + ", " + alpha + ")";
                } else {
                    ctx.fillStyle = "rgba(174, 181, 184, 0.05)";
                }

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        if (!reduce) {
            requestAnimationFrame(draw);
        }
    }

    window.addEventListener("resize", function () {
        resize();
        if (reduce) {
            draw(0);
        }
    });
    window.addEventListener("mousemove", function (e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
    });
    window.addEventListener("mouseout", function () {
        pointer.active = false;
    });
    window.addEventListener("touchmove", function (e) {
        const t = e.touches[0];
        if (t) {
            pointer.x = t.clientX;
            pointer.y = t.clientY;
            pointer.active = true;
        }
    }, { passive: true });
    window.addEventListener("touchend", function () {
        pointer.active = false;
    });

    resize();
    if (reduce) {
        draw(0);
    } else {
        requestAnimationFrame(draw);
    }
}());
