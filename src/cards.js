// ─── 3D Tilt Cards ────────────────────────────────────────────
// Mouse-tracking perspective tilt on project cards + click to expand detail

const cards = document.querySelectorAll('.project-card');
const MAX_TILT = 15; // degrees

cards.forEach((card) => {
  const inner = card.querySelector('.project-card-inner');

  // ── Mouse-tracking 3D tilt ──────────────────────────────────
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0 → 1
    const y = (e.clientY - rect.top) / rect.height;   // 0 → 1

    const rotateX = (0.5 - y) * MAX_TILT;
    const rotateY = (x - 0.5) * MAX_TILT;

    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    inner.style.transition = 'transform 0.4s ease';
    inner.style.transform = 'rotateX(0) rotateY(0) scale(1)';

    // Remove transition override after it completes so mousemove stays snappy
    setTimeout(() => {
      inner.style.transition = 'transform 0.15s ease, box-shadow 0.3s ease';
    }, 400);
  });

  // ── Click to expand detail ──────────────────────────────────
  card.addEventListener('click', () => {
    const targetId = card.dataset.target;
    const detail = document.getElementById(targetId);
    if (!detail) return;

    const isOpen = detail.classList.contains('open');

    // Close any currently open details and deactivate cards
    document.querySelectorAll('.project-detail.open').forEach((d) => {
      d.classList.remove('open');
    });
    document.querySelectorAll('.project-card.active').forEach((c) => {
      c.classList.remove('active');
    });

    // Toggle this one (if it wasn't already open)
    if (!isOpen) {
      detail.classList.add('open');
      card.classList.add('active');

      // Scroll detail into view after the expand animation starts
      setTimeout(() => {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  });
});

// ── Close buttons ───────────────────────────────────────────────
document.querySelectorAll('.project-detail-close').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const detail = btn.closest('.project-detail');
    detail.classList.remove('open');

    // Deactivate the corresponding card
    document.querySelectorAll('.project-card.active').forEach((c) => {
      c.classList.remove('active');
    });
  });
});
