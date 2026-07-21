/* =================================================================
   OPTOMETRÍA L.C. — main.js
   Preloader, partículas, scroll reveal, contadores, FAQ, nav,
   parallax y envío de formulario por WhatsApp.
   ================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------- */
  /* PRELOADER                                                       */
  /* ------------------------------------------------------------- */
  (function preloader() {
    var el = document.getElementById('preloader');
    if (!el) return;
    var fill = document.getElementById('preloader-fill');
    var label = document.getElementById('preloader-label');
    var MIN_MS = reduceMotion ? 400 : 2400;
    var startedAt = Date.now();
    var pageLoaded = false;
    var progress = 0;
    var labels = ['Cargando...', 'Preparando tu experiencia...', 'Casi listo...'];

    document.body.classList.add('no-scroll');

    var tick = setInterval(function () {
      var elapsed = Date.now() - startedAt;
      var target = Math.min(90, (elapsed / MIN_MS) * 90);
      progress += (target - progress) * 0.18;
      if (fill) fill.style.width = Math.min(progress, 90) + '%';
      if (label) {
        var idx = elapsed > MIN_MS * 0.66 ? 2 : elapsed > MIN_MS * 0.3 ? 1 : 0;
        label.textContent = labels[idx];
      }
    }, 80);

    function finish() {
      pageLoaded = true;
      var elapsed = Date.now() - startedAt;
      var wait = Math.max(0, MIN_MS - elapsed);
      setTimeout(function () {
        clearInterval(tick);
        if (fill) fill.style.width = '100%';
        if (label) label.textContent = '¡Listo!';
        setTimeout(function () {
          el.classList.add('is-leaving');
          setTimeout(function () {
            el.classList.add('is-opening');
            document.body.classList.remove('no-scroll');
            document.dispatchEvent(new CustomEvent('site:revealed'));
            setTimeout(function () {
              el.classList.add('is-done');
            }, reduceMotion ? 50 : 1250);
          }, reduceMotion ? 50 : 480);
        }, 260);
      }, wait);
    }

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }
    // Failsafe: never trap the user behind the loader.
    setTimeout(function () { if (!pageLoaded) finish(); }, 8000);
  })();

  /* ------------------------------------------------------------- */
  /* NAVBAR: scroll state, mobile menu, scrollspy                    */
  /* ------------------------------------------------------------- */
  (function nav() {
    var header = document.getElementById('site-header');
    var toggle = document.getElementById('nav-toggle');
    var mobile = document.getElementById('nav-mobile');
    if (!header) return;

    var scrim = document.createElement('div');
    scrim.className = 'nav-scrim';
    document.body.appendChild(scrim);

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 30);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    function closeMobile() {
      toggle.classList.remove('is-open');
      mobile.classList.remove('is-open');
      scrim.classList.remove('is-visible');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
    function openMobile() {
      toggle.classList.add('is-open');
      mobile.classList.add('is-open');
      scrim.classList.add('is-visible');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
    }
    if (toggle) {
      toggle.addEventListener('click', function () {
        mobile.classList.contains('is-open') ? closeMobile() : openMobile();
      });
    }
    scrim.addEventListener('click', closeMobile);
    document.querySelectorAll('#nav-mobile a').forEach(function (a) {
      a.addEventListener('click', closeMobile);
    });

    // Scrollspy
    var navLinks = document.querySelectorAll('[data-nav]');
    var sections = [];
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        var sec = document.querySelector(id);
        if (sec) sections.push({ link: link, sec: sec });
      }
    });
    function onSpy() {
      var pos = window.scrollY + 140;
      var current = null;
      sections.forEach(function (item) {
        if (item.sec.offsetTop <= pos) current = item;
      });
      sections.forEach(function (item) {
        item.link.classList.toggle('is-active', item === current);
      });
    }
    if (sections.length) {
      onSpy();
      window.addEventListener('scroll', onSpy, { passive: true });
    }
  })();

  /* ------------------------------------------------------------- */
  /* SCROLL REVEAL                                                    */
  /* ------------------------------------------------------------- */
  (function reveal() {
    var targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!targets.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (t) { io.observe(t); });
  })();

  /* ------------------------------------------------------------- */
  /* CONTADORES                                                       */
  /* ------------------------------------------------------------- */
  (function counters() {
    var nums = document.querySelectorAll('[data-target]');
    if (!nums.length) return;
    function animate(el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1600;
      var startTime = null;
      function step(ts) {
        if (!startTime) startTime = ts;
        var p = Math.min(1, (ts - startTime) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(target * eased);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    }
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nums.forEach(function (el) {
        el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ------------------------------------------------------------- */
  /* FAQ ACCORDION                                                    */
  /* ------------------------------------------------------------- */
  (function faq() {
    var items = document.querySelectorAll('.faq__item');
    items.forEach(function (item) {
      var btn = item.querySelector('.faq__btn');
      var panel = item.querySelector('.faq__panel');
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        items.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.faq__panel').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 40 + 'px';
        }
      });
    });
  })();

  /* ------------------------------------------------------------- */
  /* PARALLAX (fondos con movimiento, sin background-attachment)     */
  /* ------------------------------------------------------------- */
  (function parallax() {
    if (reduceMotion) return;
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!nodes.length) return;
    var active = new Set();

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) active.add(entry.target);
          else active.delete(entry.target);
        });
      }, { rootMargin: '200px 0px' });
      nodes.forEach(function (n) { io.observe(n); });
    } else {
      nodes.forEach(function (n) { active.add(n); });
    }

    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      active.forEach(function (node) {
        var rect = node.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var offset = (center - vh / 2) / vh; // -0.5 .. 0.5 approx
        var translate = offset * 46;
        var img = node.querySelector('img');
        if (img) img.style.transform = 'translate3d(0,' + translate.toFixed(1) + 'px,0) scale(1.14)';
      });
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* ------------------------------------------------------------- */
  /* TYPEWRITER — eyebrow del hero                                   */
  /* ------------------------------------------------------------- */
  (function typewrite() {
    var el = document.getElementById('hero-eyebrow-text');
    if (!el) return;
    var text = el.getAttribute('data-typewrite') || el.textContent;
    if (reduceMotion) { el.textContent = text; return; }
    el.textContent = '';
    var caret = document.createElement('span');
    caret.className = 'tw-caret';
    caret.textContent = '|';
    caret.style.cssText = 'display:inline-block;margin-left:2px;color:#F0C878;animation:tw-blink 1s step-end infinite;';
    var styleTag = document.createElement('style');
    styleTag.textContent = '@keyframes tw-blink{50%{opacity:0;}}';
    document.head.appendChild(styleTag);
    el.appendChild(caret);

    function start() {
      var i = 0;
      var iv = setInterval(function () {
        el.insertBefore(document.createTextNode(text.charAt(i)), caret);
        i++;
        if (i >= text.length) {
          clearInterval(iv);
          setTimeout(function () { caret.remove(); }, 1400);
        }
      }, 26);
    }
    document.addEventListener('site:revealed', start, { once: true });
    setTimeout(start, 4200); // failsafe if preloader event is delayed
  })();

  /* ------------------------------------------------------------- */
  /* RIPPLE en botones data-ripple                                   */
  /* ------------------------------------------------------------- */
  (function ripple() {
    document.querySelectorAll('[data-ripple]').forEach(function (btn) {
      btn.style.position = btn.style.position || 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', function (e) {
        var rect = btn.getBoundingClientRect();
        var span = document.createElement('span');
        var size = Math.max(rect.width, rect.height) * 1.6;
        span.style.cssText = [
          'position:absolute', 'border-radius:50%', 'pointer-events:none',
          'width:' + size + 'px', 'height:' + size + 'px',
          'left:' + ((e.clientX - rect.left) - size / 2) + 'px',
          'top:' + ((e.clientY - rect.top) - size / 2) + 'px',
          'background:rgba(255,255,255,.5)', 'transform:scale(0)',
          'transition:transform .6s ease-out, opacity .6s ease-out', 'opacity:1'
        ].join(';');
        btn.appendChild(span);
        requestAnimationFrame(function () {
          span.style.transform = 'scale(1)';
          span.style.opacity = '0';
        });
        setTimeout(function () { span.remove(); }, 650);
      });
    });
  })();

  /* ------------------------------------------------------------- */
  /* PARTÍCULAS (canvas ligero, doradas / verdes según sección)       */
  /* ------------------------------------------------------------- */
  function createParticles(canvas, opts) {
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var running = false;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var color = opts.color || '240,200,120';
    var density = opts.density || 60;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      var count = Math.max(18, Math.min(70, Math.round((rect.width * rect.height) / (density * 1000))));
      particles = [];
      for (var i = 0; i < count; i++) particles.push(makeParticle(rect.width, rect.height, true));
    }

    function makeParticle(w, h, randomY) {
      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : h + 20,
        r: Math.random() * 2 + 0.6,
        speed: Math.random() * 0.35 + 0.08,
        drift: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.15,
        twinkle: Math.random() * 0.02 + 0.005
      };
    }

    function step() {
      if (!running) return;
      var w = canvas.width / dpr, h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      particles.forEach(function (p) {
        p.y -= p.speed;
        p.x += p.drift;
        p.alpha += (Math.random() - 0.5) * p.twinkle;
        p.alpha = Math.max(0.08, Math.min(0.65, p.alpha));
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + color + ',' + p.alpha + ')';
        ctx.fill();
      });
      requestAnimationFrame(step);
    }

    function start() { if (!running) { running = true; step(); } }
    function stop() { running = false; }

    resize();
    window.addEventListener('resize', resize);

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.05 });
      io.observe(canvas.parentElement);
    } else {
      start();
    }
  }

  createParticles(document.getElementById('hero-particles'), { color: '240,200,120', density: 55 });
  createParticles(document.getElementById('glow-particles'), { color: '139,233,201', density: 60 });
  createParticles(document.getElementById('cta-particles'), { color: '240,200,120', density: 70 });

  /* ------------------------------------------------------------- */
  /* FORMULARIO DE CONTACTO → WHATSAPP                               */
  /* ------------------------------------------------------------- */
  (function contactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var WA_NUMBER = '525575565562';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var name = form.nombre.value.trim();
      var phone = form.telefono.value.trim();
      var service = form.servicio.value;
      var msg = form.mensaje.value.trim();

      var lines = [
        'Hola, quiero solicitar una cotización en Optometría L.C.',
        'Nombre: ' + name,
        'Teléfono: ' + phone,
        'Servicio de interés: ' + service
      ];
      if (msg) lines.push('Mensaje: ' + msg);

      var text = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + text, '_blank', 'noopener');
      form.reset();
    });
  })();

})();
