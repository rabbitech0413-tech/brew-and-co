"use client";

import { useEffect } from "react";

const WEBHOOK_URL =
  "https://n8n.srv1835431.hstgr.cloud/webhook/a72658b9-315e-42a2-aa89-020453b873ab/chat";

// Pinned so an n8n release can't silently change/break the widget.
const CDN_BASE = "https://cdn.jsdelivr.net/npm/@n8n/chat@1.29.1/dist";

const SCRIPT_ID = "n8n-chat-loader";

/**
 * Floating n8n chat widget, mounted site-wide from the root layout.
 *
 * The widget is Vue-based and ~1.8 MB of JS, so it is NOT bundled with the
 * app. Instead, once the browser goes idle we inject n8n's pre-built CDN
 * bundle as a <script type="module"> (kept out of Turbopack's module graph
 * on purpose). Brand styling lives in globals.css via --chat--* variables.
 */
export function ChatWidget() {
  useEffect(() => {
    // StrictMode double-invoke / client navigations: inject only once.
    if (document.getElementById(SCRIPT_ID)) return;

    // requestIdleCallback is missing in older Safari; fall back to a timer.
    if ("requestIdleCallback" in window) {
      const idleId = requestIdleCallback(inject, { timeout: 2500 });
      return () => cancelIdleCallback(idleId);
    }
    const timerId = setTimeout(inject, 2500);
    return () => clearTimeout(timerId);
  }, []);

  return null;
}

function inject() {
  if (document.getElementById(SCRIPT_ID)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${CDN_BASE}/style.css`;
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.type = "module";
  script.textContent = `
    import { createChat } from "${CDN_BASE}/chat.bundle.es.js";
    createChat({
      webhookUrl: ${JSON.stringify(WEBHOOK_URL)},
      mode: "window",
      loadPreviousSession: true,
      initialMessages: [
        "Hi there! 👋",
        "Welcome to Brew & Co. Ask me about our menu, opening hours, or booking a table.",
      ],
      i18n: {
        en: {
          title: "Brew & Co",
          subtitle: "We usually reply in a few seconds.",
          footer: "",
          getStarted: "New conversation",
          inputPlaceholder: "Type your question…",
          closeButtonTooltip: "Close chat",
        },
      },
    });
  `;
  document.body.appendChild(script);
}
