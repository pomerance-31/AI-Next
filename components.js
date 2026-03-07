(function () {

  // ── Injected styles (header + footer + modals) ────────────────
  const style = document.createElement('style');
  style.textContent = `
    .site-header-bar {
      border-top: 4px solid #c8102e;
      border-bottom: 2px solid #1b2d45;
      padding: 1.2rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .site-header-bar h1 {
      font-size: 1.9rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #1b2d45;
    }
    .site-header-bar h1 a {
      text-decoration: none;
      color: inherit;
      font-family: Georgia, 'Times New Roman', serif;
    }
    .site-header-bar nav a {
      text-decoration: none;
      color: #1b2d45;
      font-family: system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
    .site-header-bar nav a:hover { color: #c8102e; }

    .site-footer {
      border-top: 2px solid #1b2d45;
      padding: 1.5rem 2rem;
      text-align: center;
      font-family: system-ui, sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #7a8a9a;
      margin-top: 4rem;
    }
    .footer-links {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      margin-bottom: 0.8rem;
      flex-wrap: wrap;
    }
    .footer-btn {
      background: none;
      border: none;
      font-family: system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #7a8a9a;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .footer-btn:hover { color: #1b2d45; }

    .modal-overlay {
      display: none;
      position: fixed; inset: 0;
      background: rgba(27,45,69,0.5);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .modal-overlay.open { display: flex; }
    .modal {
      background: #fff;
      padding: 2rem;
      max-width: 480px; width: 100%;
      position: relative;
    }
    .modal h3 {
      font-family: Georgia, serif;
      font-size: 1.1rem;
      margin-bottom: 1.2rem;
      color: #1b2d45;
    }
    .modal form { display: flex; flex-direction: column; gap: 0.9rem; }
    .modal label {
      display: flex; flex-direction: column; gap: 0.3rem;
      font-family: system-ui, sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: #7a8a9a;
    }
    .modal input, .modal textarea {
      border: 1px solid #ddd8cf;
      padding: 0.5rem 0.7rem;
      font-family: system-ui, sans-serif;
      font-size: 0.9rem;
      color: #1b2d45;
      background: #fff;
      outline: none;
      resize: vertical;
    }
    .modal input:focus, .modal textarea:focus { border-color: #1b2d45; }
    .modal-submit {
      align-self: flex-start;
      padding: 0.55rem 1.4rem;
      background: #c8102e; color: #fff;
      border: none; cursor: pointer;
      font-family: system-ui, sans-serif;
      font-size: 0.72rem; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase;
    }
    .modal-submit:hover { background: #a30d25; }
    .modal-close {
      position: absolute; top: 0.8rem; right: 1rem;
      background: none; border: none;
      font-size: 1.4rem; color: #7a8a9a; cursor: pointer;
      line-height: 1;
    }
    .modal-close:hover { color: #1b2d45; }
  `;
  document.head.appendChild(style);

  // ── Path prefix (articles/ subdir vs root) ────────────────────
  const root = /\/articles\//.test(location.pathname) ? '../' : '';

  // ── Inject header ─────────────────────────────────────────────
  const headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.outerHTML = `
      <div class="site-header-bar">
        <h1><a href="${root}index.html">AI Next</a></h1>
        <nav><a href="${root}about.html">ABOUT</a></nav>
      </div>`;
  }

  // ── Inject footer + modals ────────────────────────────────────
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.outerHTML = `
      <footer class="site-footer">
        <div class="footer-links">
          <button class="footer-btn" data-modal="research">Submit a Research Request</button>
          <button class="footer-btn" data-modal="contribute">Contact Us</button>
        </div>
        &copy; 2026 AI Next
      </footer>

      <div class="modal-overlay" id="modal-research">
        <div class="modal">
          <button class="modal-close">&times;</button>
          <h3>Submit a Research Request</h3>
          <form action="https://formspree.io/f/mreanplv" method="POST">
            <label>Full Name <input type="text" name="name" required /></label>
            <label>Your Email <input type="email" name="email" required /></label>
            <label>Question / Topic <textarea name="question" rows="4" required></textarea></label>
            <button type="submit" class="modal-submit">Submit</button>
          </form>
        </div>
      </div>

      <div class="modal-overlay" id="modal-contribute">
        <div class="modal">
          <button class="modal-close">&times;</button>
          <h3>We'd Love to Hear From You</h3>
          <form action="https://formspree.io/f/maqdredn" method="POST">
            <label>Full Name <input type="text" name="name" required /></label>
            <label>Your Email <input type="email" name="email" required /></label>
            <label>Subject<input type="text" name="topic" required /></label>
            <label>Brief Description <textarea name="description" rows="4" required></textarea></label>
            <button type="submit" class="modal-submit">Submit</button>
          </form>
        </div>
      </div>`;
  }

  // ── Modal JS ──────────────────────────────────────────────────
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('modal-' + btn.dataset.modal).classList.add('open');
    });
  });
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el) e.target.closest('.modal-overlay').classList.remove('open');
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open')
      .forEach(m => m.classList.remove('open'));
  });

})();
