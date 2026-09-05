"use client";

import { useState } from "react";
import Link from "next/link";
import { nepqItems } from "@/lib/editorial";

export function NepqOpener() {
  const [openId, setOpenId] = useState<string | null>(nepqItems[0]?.id ?? null);

  return (
    <section id="questions" className="mt-14 scroll-mt-24">
      <p className="text-sm font-medium text-primary">Start here</p>
      <h2 className="type-h2 mt-2">Questions that find the problem</h2>
      <p className="type-prose mt-3 text-muted-foreground">
        These are the first questions we would rather you sit with than a quote
        form. Open one. There is no score and no right answer.
      </p>
      <ol className="mt-6 space-y-3">
        {nepqItems.map((item, index) => {
          const open = openId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`nepq-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
                className={`w-full rounded-[16px] border px-4 py-4 text-left transition-colors ${
                  open
                    ? "border-primary bg-card shadow-[0_12px_28px_rgba(26,29,24,0.08)]"
                    : "border-border bg-card/70 hover:border-primary/50"
                }`}
              >
                <span className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-lg font-semibold leading-7">
                      {item.question}
                    </span>
                    <span
                      id={`nepq-${item.id}`}
                      hidden={!open}
                      className="mt-2 block text-sm leading-6 text-muted-foreground"
                    >
                      {item.why}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-muted-foreground">
                    {open ? "−" : "+"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-6">
        <Link
          href="/consult/"
          className="type-button inline-flex h-11 items-center rounded-lg bg-primary px-4 text-primary-foreground hover:bg-primary/90"
        >
          Book a consult
        </Link>
      </p>
    </section>
  );
}
