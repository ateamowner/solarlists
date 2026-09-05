"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { formTimings, site } from "@/config/site";

const fieldClassName =
  "h-11 w-full rounded-lg border border-input bg-card px-2.5 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export const formCardClassName =
  "rounded-[16px] border border-border bg-card p-5 shadow-[0_16px_40px_rgba(26,29,24,0.14)]";

type Draft = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  timing: string;
  bill_notes: string;
  roof_notes: string;
  privacy_consent: boolean;
};

const drafts = new Map<string, Draft>();

function emptyDraft(): Draft {
  return {
    name: "",
    phone: "",
    email: "",
    zip: "",
    timing: "",
    bill_notes: "",
    roof_notes: "",
    privacy_consent: false,
  };
}

function readDraft(key: string): Draft {
  return drafts.get(key) ?? emptyDraft();
}

function writeDraft(key: string, draft: Draft) {
  drafts.set(key, draft);
}

export function ConsultForm({ compact }: { compact?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const lastKeyRef = useRef("");
  const key = "consult";
  const [draft, setDraft] = useState<Draft>(() => readDraft(key));

  function update<K extends keyof Draft>(name: K, value: Draft[K]) {
    setDraft((prev) => {
      const next = { ...prev, [name]: value };
      writeDraft(key, next);
      return next;
    });
  }

  function onTextChange<
    K extends "name" | "phone" | "email" | "zip" | "bill_notes" | "roof_notes",
  >(name: K, value: string) {
    const lastKey = lastKeyRef.current;
    const clearing =
      value === "" &&
      draft[name] !== "" &&
      lastKey !== "Backspace" &&
      lastKey !== "Delete";
    if (clearing) {
      setDraft((current) => ({ ...current }));
      return;
    }
    update(name, value);
  }

  return (
    <form
      ref={formRef}
      id="consult"
      action={site.contactReady ? site.formAction : undefined}
      method={site.contactReady ? "POST" : undefined}
      acceptCharset="UTF-8"
      autoComplete="off"
      onSubmit={(event) => {
        if (!site.contactReady) event.preventDefault();
      }}
      onKeyDown={(event) => {
        lastKeyRef.current = event.key;
        if (event.key !== "Escape") return;
        event.preventDefault();
        event.stopPropagation();
        setDraft((current) => ({ ...current }));
      }}
      className={`scroll-mt-24 ${formCardClassName}`}
    >
      <h2 className="font-heading text-lg font-semibold sm:text-xl">
        Talk through your situation
      </h2>
      <p className="mt-1 text-[16px] leading-[26px] text-muted-foreground">
        A conversation — not three quotes and not a ZIP wizard.
      </p>

      <div className={`mt-4 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
        <Field label="Name" htmlFor="name" className={compact ? "" : "md:col-span-2"}>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldClassName}
            value={draft.name}
            onChange={(event) => onTextChange("name", event.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClassName}
            value={draft.email}
            onChange={(event) => onTextChange("email", event.target.value)}
          />
        </Field>
        <Field label="Phone (optional)" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={fieldClassName}
            value={draft.phone}
            onChange={(event) => onTextChange("phone", event.target.value)}
          />
        </Field>
        <Field label="ZIP" htmlFor="zip">
          <input
            id="zip"
            name="zip"
            required
            inputMode="numeric"
            autoComplete="postal-code"
            className={fieldClassName}
            value={draft.zip}
            onChange={(event) => onTextChange("zip", event.target.value)}
          />
        </Field>
        <Field label="Timing" htmlFor="timing">
          <select
            id="timing"
            name="timing"
            required
            className={fieldClassName}
            value={draft.timing}
            onChange={(event) => update("timing", event.target.value)}
          >
            {formTimings.map((item) => (
              <option key={item.value || "empty-timing"} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <details className="mt-4 rounded-lg border border-border bg-muted/40 px-3 py-2">
        <summary className="type-label cursor-pointer">
          Optional bill or roof notes
        </summary>
        <div className="mt-3 grid gap-3">
          <Field label="Electric bill notes (optional)" htmlFor="bill_notes">
            <textarea
              id="bill_notes"
              name="bill_notes"
              rows={3}
              className="min-h-20 w-full rounded-lg border border-input bg-card px-2.5 py-2 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              placeholder="What the bill has been doing, or what you were told it might do."
              value={draft.bill_notes}
              onChange={(event) => onTextChange("bill_notes", event.target.value)}
            />
          </Field>
          <Field label="Roof notes (optional)" htmlFor="roof_notes">
            <textarea
              id="roof_notes"
              name="roof_notes"
              rows={3}
              className="min-h-20 w-full rounded-lg border border-input bg-card px-2.5 py-2 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              placeholder="Age, covering, shade, or anything you already know is a question."
              value={draft.roof_notes}
              onChange={(event) => onTextChange("roof_notes", event.target.value)}
            />
          </Field>
        </div>
      </details>

      <label className="mt-4 flex items-start gap-2 text-[16px] leading-[26px]">
        <input
          type="checkbox"
          name="privacy_consent"
          value="true"
          required
          className="mt-1 size-4 accent-primary"
          checked={draft.privacy_consent}
          onChange={(event) => update("privacy_consent", event.target.checked)}
        />
        <span>
          I agree to the{" "}
          <Link href="/privacy/" className="underline underline-offset-2">
            privacy policy
          </Link>
          . Required.
        </span>
      </label>

      <button
        type="submit"
        disabled={!site.contactReady}
        className="type-button mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {site.contactReady ? "Send consult request" : "Submit is not live yet"}
      </button>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Consult destination is not configured. Placeholders:{" "}
        <span className="font-mono">{site.email}</span>
        {" / "}
        <span className="font-mono">{site.phone}</span>
        . Do not treat those strings as a real inbox or number.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="type-label mb-1.5 block">
        {label}
      </label>
      {children}
    </div>
  );
}
