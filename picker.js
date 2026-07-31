/* The backend picker — the one interactive piece on the site.
 *
 * The whole point of the component is that switching tabs changes exactly two
 * of the eight visible lines, plus the config block and the three notes. So it
 * updates text nodes in place: nothing is re-rendered, nothing reflows, and the
 * demonstration survives. Do not replace this with a re-render of the panel.
 *
 * The markup ships with backend 0 already in it, so the section is complete
 * and readable with JavaScript off. This only ever upgrades. */

import { BACKENDS } from './backends.js';

const picker = document.querySelector('[data-picker]');
if (picker) {
  const tabs = [...picker.querySelectorAll('[role="tab"]')];
  const out = Object.fromEntries(
    ['log', 'infra', 'config', 'when', 'why', 'cost'].map(
      (field) => [field, picker.querySelector(`[data-field="${field}"]`)]));

  const show = (i) => {
    const b = BACKENDS[i];
    if (!b) return;

    for (const [field, node] of Object.entries(out)) {
      if (node) node.textContent = b[field];
    }

    tabs.forEach((tab, j) => {
      const selected = i === j;
      tab.setAttribute('aria-selected', String(selected));
      // Roving tabindex: one stop for the whole tablist, arrows do the rest.
      tab.tabIndex = selected ? 0 : -1;
    });

    const panel = picker.querySelector('[role="tabpanel"]');
    if (panel) panel.setAttribute('aria-labelledby', tabs[i].id);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => show(i));

    tab.addEventListener('keydown', (e) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      const to = step ? (i + step + tabs.length) % tabs.length
        : e.key === 'Home' ? 0
          : e.key === 'End' ? tabs.length - 1
            : null;
      if (to === null) return;
      e.preventDefault();
      show(to);
      tabs[to].focus();
    });
  });

  show(0);
}
