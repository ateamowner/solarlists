"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import {
  CONSULT_HREF,
  type ChatChip,
  type ChatLink,
  chipsAfter,
  getScriptedReply,
  openerMessage,
  nepqChips,
  shouldOfferConsult,
  consultOfferLine,
} from "@/lib/nepq-replies";

type ChatRole = "bot" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  chips?: ChatChip[];
  links?: ChatLink[];
  showConsult?: boolean;
};

/**
 * TODO: Future LLM path — disabled for Wave 1.
 *
 * Hosting lock: GitHub Pages static export only. No Next.js API routes,
 * no vendor keys in the client, no Vercel runtime for solarlists.com.
 *
 * Optional env (commented in `.env.example`):
 *   NEXT_PUBLIC_SOLAR_CHAT_ENDPOINT
 * If you later stand up a server *you* control, uncomment the fetch
 * below. That server holds the keys. Never put API keys in NEXT_PUBLIC_*.
 *
 * Expected request: `{ messages: { role: "user" | "assistant"; content: string }[] }`
 * Expected response JSON: `{ text: string }` or `{ reply: string }`
 *
 * Wave 1 ships the scripted NEPQ path only.
 */
async function tryExternalChatEndpoint(
  _thread: { role: "user" | "assistant"; content: string }[]
): Promise<string | null> {
  // Disabled. Scripted replies only.
  // const endpoint = process.env.NEXT_PUBLIC_SOLAR_CHAT_ENDPOINT?.trim();
  // if (!endpoint) return null;
  // const response = await fetch(endpoint, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ messages: _thread }),
  // });
  // if (!response.ok) return null;
  // const data = (await response.json()) as { text?: string; reply?: string };
  // const text = data.text ?? data.reply;
  // return text?.trim() ? text.trim() : null;
  return null;
}

function firstMessage(): ChatMessage {
  return {
    id: "opener",
    role: "bot",
    text: openerMessage,
    chips: nepqChips,
  };
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 6.8A2.8 2.8 0 0 1 7.8 4h8.4A2.8 2.8 0 0 1 19 6.8v6.4A2.8 2.8 0 0 1 16.2 16H10l-3.6 3.2c-.7.62-1.8.12-1.8-.8V6.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 9.2h7.6M8.2 12.2h5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SolarChat() {
  const panelId = useId();
  const labelId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [barOffset, setBarOffset] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [firstMessage()]);
  const [usedTopics, setUsedTopics] = useState<string[]>([]);
  const [userTurns, setUserTurns] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => {
      const bar = document.getElementById("sticky-consult-bar");
      if (!bar) {
        setBarOffset(false);
        return;
      }
      const style = window.getComputedStyle(bar);
      const box = bar.getBoundingClientRect();
      setBarOffset(
        style.display !== "none" &&
          style.visibility !== "hidden" &&
          box.height > 0
      );
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, open, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const nextTurns = userTurns + 1;
    const userMessage: ChatMessage = {
      id: `user-${nextTurns}`,
      role: "user",
      text: trimmed,
    };

    setDraft("");
    setUserTurns(nextTurns);
    setMessages((current) => [...current, userMessage]);
    setBusy(true);

    const thread = [...messages, userMessage].map((item) => ({
      role: item.role === "user" ? ("user" as const) : ("assistant" as const),
      content: item.text,
    }));

    const external = await tryExternalChatEndpoint(thread);
    const scripted = getScriptedReply(trimmed, usedTopics);
    const nextTopics = [...usedTopics, scripted.topicId];
    setUsedTopics(nextTopics);

    const botMessage: ChatMessage = {
      id: `bot-${nextTurns}`,
      role: "bot",
      text: external ?? scripted.text,
      chips: external ? chipsAfter(nextTopics) : scripted.chips,
      links: external ? undefined : scripted.links,
      showConsult: shouldOfferConsult(nextTurns),
    };

    setMessages((current) => [...current, botMessage]);
    setBusy(false);
  }

  return (
    <div
      className={`pointer-events-none fixed z-50 flex flex-col items-end gap-3 ${
        barOffset
          ? "right-4 bottom-[calc(5.75rem+0.75rem)] md:right-5 md:bottom-5"
          : "right-4 bottom-4 md:right-5 md:bottom-5"
      }`}
    >
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={labelId}
          className="pointer-events-auto flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[16px] border text-[#1A1D18] shadow-[0_16px_40px_rgba(26,29,24,0.14)]"
          style={{
            backgroundColor: "#FFFDF8",
            borderColor: "#CFC3AA",
            maxHeight: barOffset
              ? "min(32rem, calc(100dvh - 14rem))"
              : "min(32rem, calc(100dvh - 6.5rem))",
          }}
        >
          <header className="flex items-center justify-between gap-3 border-b px-4 py-3"
            style={{ borderColor: "#CFC3AA" }}
          >
            <div>
              <h2 id={labelId} className="font-heading text-lg font-semibold leading-6">
                Ask about solar
              </h2>
              <p className="type-small mt-0.5">Problem-finding first — not a quote closer.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close chat"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ×
              </span>
            </button>
          </header>

          <div
            ref={logRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[90%] rounded-[14px] px-3 py-2 text-sm leading-6"
                  style={{
                    backgroundColor:
                      message.role === "user" ? "#E8D5C4" : "#EFE8DA",
                    color: "#1A1D18",
                  }}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {message.links && message.links.length > 0 ? (
                    <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {message.links.map((link) => (
                        <Link
                          key={`${message.id}-${link.href}`}
                          href={link.href}
                          className="font-medium underline underline-offset-2"
                          {...(link.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </p>
                  ) : null}
                  {message.showConsult ? (
                    <p className="mt-3">
                      <span className="block text-muted-foreground">
                        {consultOfferLine}
                      </span>
                      <Link
                        href={CONSULT_HREF}
                        className="type-button mt-2 inline-flex h-10 items-center rounded-lg bg-primary px-3 text-primary-foreground hover:bg-primary/90"
                      >
                        Book a consult
                      </Link>
                    </p>
                  ) : null}
                  {message.chips && message.chips.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.chips.map((chip) => (
                        <button
                          key={chip.id}
                          type="button"
                          disabled={busy}
                          onClick={() => void send(chip.prompt)}
                          className="rounded-full border px-3 py-1.5 text-left text-[13px] leading-5 hover:border-primary disabled:opacity-60"
                          style={{
                            borderColor: "#CFC3AA",
                            backgroundColor: "#FFFDF8",
                          }}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {busy ? (
              <p className="type-small px-1">Looking that up in the sourced answers…</p>
            ) : null}
          </div>

          <form
            className="border-t px-3 py-3"
            style={{ borderColor: "#CFC3AA" }}
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            <label htmlFor={`${panelId}-input`} className="sr-only">
              Ask a solar question
            </label>
            <div className="flex gap-2">
              <input
                id={`${panelId}-input`}
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                autoComplete="off"
                disabled={busy}
                placeholder="Type a question"
                className="h-11 min-w-0 flex-1 rounded-lg border bg-[#FFFDF8] px-2.5 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60"
                style={{ borderColor: "#CFC3AA", color: "#1A1D18" }}
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                className="type-button inline-flex h-11 items-center rounded-lg bg-primary px-3 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>

          <p
            className="border-t px-3 py-2 text-[11px] leading-4 text-muted-foreground"
            style={{ borderColor: "#CFC3AA" }}
          >
            {site.disclosure}
          </p>
        </section>
      ) : null}

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((current) => !current)}
        className="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full px-4 text-[15px] font-medium shadow-[0_12px_28px_rgba(26,29,24,0.16)]"
        style={{ backgroundColor: "#8A4B12", color: "#FFF8EC" }}
      >
        <ChatIcon className="size-5" />
        <span>{open ? "Close chat" : "Ask about solar"}</span>
      </button>
    </div>
  );
}
