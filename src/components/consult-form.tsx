"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  OTHER_MARKET,
  consultMarkets,
  formBillRanges,
  formOwnHome,
  formRoofAges,
  formRoofTypes,
  formTimings,
  site,
} from "@/config/site";
import { consultGate, normalizeZip } from "@/lib/consult-eligibility";

const fieldClassName =
  "h-11 w-full rounded-lg border border-input bg-card px-2.5 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export const formCardClassName =
  "rounded-[16px] border border-border bg-card p-5 shadow-[0_16px_40px_rgba(26,29,24,0.14)]";

type Draft = {
  name: string;
  contact: string;
  zip: string;
  state: string;
  timing: string;
  own_home: string;
  monthly_bill: string;
  roof_age: string;
  roof_type: string;
  message: string;
  sms_consent: boolean;
  privacy_consent: boolean;
};

const drafts = new Map<string, Draft>();

function emptyDraft(): Draft {
  return {
    name: "",
    contact: "",
    zip: "",
    state: "",
    timing: "",
    own_home: "",
    monthly_bill: "",
    roof_age: "",
    roof_type: "",
    message: "",
    sms_consent: false,
    privacy_consent: false,
  };
}

function readDraft(key: string): Draft {
  return drafts.get(key) ?? emptyDraft();
}

function writeDraft(key: string, draft: Draft) {
  drafts.set(key, draft);
}

function parseContact(value: string): { email: string; phone: string } {
  const trimmed = value.trim();
  if (!trimmed) return { email: "", phone: "" };
  if (trimmed.includes("@")) return { email: trimmed, phone: "" };
  return { email: "", phone: trimmed };
}

function setHidden(form: HTMLFormElement, name: string, value: string) {
  const field = form.elements.namedItem(name);
  if (field instanceof HTMLInputElement) field.value = value;
}

export function ConsultForm({ compact }: { compact?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const lastKeyRef = useRef("");
  const key = "consult";
  const [draft, setDraft] = useState<Draft>(() => readDraft(key));
  const [contactError, setContactError] = useState("");

  const parsed = parseContact(draft.contact);
  const gate = consultGate(draft.zip, draft.state);
  const canSubmit = site.contactReady && gate === "ok";
  const steps = [
    Boolean(draft.name.trim()),
    Boolean(draft.contact.trim()),
    Boolean(draft.zip.trim()),
    Boolean(draft.timing),
  ];

  function update<K extends keyof Draft>(name: K, value: Draft[K]) {
    setDraft((prev) => {
      const next = { ...prev, [name]: value };
      writeDraft(key, next);
      return next;
    });
  }

  function onTextChange<K extends "name" | "contact" | "zip" | "message">(
    name: K,
    value: string
  ) {
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
    if (name === "contact") setContactError("");
  }

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    setHidden(form, "page_url", window.location.href);
    setHidden(form, "gclid", params.get("gclid") ?? "");
    setHidden(form, "utm_source", params.get("utm_source") ?? "");
    setHidden(form, "utm_medium", params.get("utm_medium") ?? "");
    setHidden(form, "utm_campaign", params.get("utm_campaign") ?? "");
  }, []);

  return (
    <form
      ref={formRef}
      id="consult"
      action={canSubmit ? site.formAction : undefined}
      method={canSubmit ? "POST" : undefined}
      acceptCharset="UTF-8"
      autoComplete="off"
      onSubmit={(event) => {
        if (!draft.contact.trim()) {
          event.preventDefault();
          setContactError("Add a phone number or an email.");
          return;
        }
        if (!canSubmit) event.preventDefault();
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
        Request a consult
      </h2>
      <p className="mt-1 text-[16px] leading-[26px] text-muted-foreground">
        A conversation — not three quotes and not a ZIP wizard.
      </p>

      <ol
        className="mt-4 flex items-center gap-2"
        aria-label="Form progress"
      >
        {steps.map((done, index) => (
          <li key={index} className="flex items-center gap-2">
            <span
              className={`block size-2.5 rounded-full ${
                done ? "bg-primary" : "bg-border"
              }`}
            />
            {index < steps.length - 1 ? (
              <span aria-hidden="true" className="block h-px w-4 bg-border" />
            ) : null}
          </li>
        ))}
      </ol>

      <div className={`mt-4 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
        <Field
          label="Name"
          htmlFor="name"
          className={compact ? "" : "md:col-span-2"}
        >
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
        <Field
          label="Phone or email"
          htmlFor="contact"
          className={compact ? "" : "md:col-span-2"}
        >
          <input
            id="contact"
            name="contact"
            required
            autoComplete="on"
            inputMode="email"
            className={fieldClassName}
            value={draft.contact}
            onChange={(event) => onTextChange("contact", event.target.value)}
            aria-describedby={contactError ? "contact-error" : "contact-hint"}
          />
          <p id="contact-hint" className="mt-1 text-[13px] leading-5 text-muted-foreground">
            One field is enough — whichever you prefer.
          </p>
          {contactError ? (
            <p id="contact-error" className="mt-1 text-[13px] leading-5 text-destructive">
              {contactError}
            </p>
          ) : null}
        </Field>
        <Field label="ZIP" htmlFor="zip">
          <input
            id="zip"
            name="zip"
            required
            inputMode="numeric"
            maxLength={5}
            pattern="[0-9]{5}"
            autoComplete="postal-code"
            className={fieldClassName}
            value={draft.zip}
            onChange={(event) =>
              onTextChange("zip", normalizeZip(event.target.value))
            }
          />
        </Field>
        <Field
          label="Timing"
          htmlFor="timing"
          className={compact ? "" : "md:col-span-2"}
        >
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

      {gate === "dq" ? (
        <p className="mt-4 rounded-lg border border-border bg-muted/60 px-3 py-3 text-sm leading-6 text-muted-foreground">
          A consult is not available for this ZIP. The education pages on this
          site are still here if you want them.
        </p>
      ) : null}
      {gate === "out_of_market" ? (
        <p className="mt-4 rounded-lg border border-border bg-muted/60 px-3 py-3 text-sm leading-6 text-muted-foreground">
          Consults are limited to served markets. Education on this site is
          still available.
        </p>
      ) : null}

      <details className="mt-4 rounded-lg border border-border bg-muted/40 px-3 py-2">
        <summary className="type-label cursor-pointer">More details</summary>
        <div className={`mt-3 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
          <Field label="State (optional)" htmlFor="state">
            <select
              id="state"
              name="state"
              className={fieldClassName}
              value={draft.state}
              onChange={(event) => update("state", event.target.value)}
            >
              <option value="">Not sure / skip</option>
              {consultMarkets.map((market) => (
                <option key={market.abbr} value={market.abbr}>
                  {market.name}
                </option>
              ))}
              <option value={OTHER_MARKET}>Another state</option>
            </select>
          </Field>
          <Field label="Do you own the home? (optional)" htmlFor="own_home">
            <select
              id="own_home"
              name="own_home"
              className={fieldClassName}
              value={draft.own_home}
              onChange={(event) => update("own_home", event.target.value)}
            >
              {formOwnHome.map((item) => (
                <option key={item.value || "empty-own"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Monthly electric bill (optional)" htmlFor="monthly_bill">
            <select
              id="monthly_bill"
              name="monthly_bill"
              className={fieldClassName}
              value={draft.monthly_bill}
              onChange={(event) => update("monthly_bill", event.target.value)}
            >
              <option value="">Not sure / skip</option>
              {formBillRanges.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Roof age (optional)" htmlFor="roof_age">
            <select
              id="roof_age"
              name="roof_age"
              className={fieldClassName}
              value={draft.roof_age}
              onChange={(event) => update("roof_age", event.target.value)}
            >
              {formRoofAges.map((item) => (
                <option key={item.value || "empty-age"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Roof type (optional)" htmlFor="roof_type">
            <select
              id="roof_type"
              name="roof_type"
              className={fieldClassName}
              value={draft.roof_type}
              onChange={(event) => update("roof_type", event.target.value)}
            >
              {formRoofTypes.map((item) => (
                <option key={item.value || "empty-type"} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Message (optional)" htmlFor="message" className="mt-3">
          <textarea
            id="message"
            name="message"
            rows={4}
            className="min-h-24 w-full rounded-lg border border-input bg-card px-2.5 py-2 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            placeholder="Bill notes, roof notes, or the question you do not trust yet."
            value={draft.message}
            onChange={(event) => onTextChange("message", event.target.value)}
          />
        </Field>
      </details>

      {parsed.phone ? (
        <label className="mt-4 flex items-start gap-2 text-[16px] leading-[26px]">
          <input
            type="checkbox"
            name="sms_consent"
            value="true"
            className="mt-1 size-4 accent-primary"
            checked={draft.sms_consent}
            onChange={(event) => update("sms_consent", event.target.checked)}
          />
          <span>
            You may text me about this request at the number I provided.
          </span>
        </label>
      ) : null}

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

      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input type="hidden" name="_next" value={site.formRedirect} />
      <input type="hidden" name="_subject" value={`${site.name} consult request`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="email" value={parsed.email} />
      <input type="hidden" name="phone" value={parsed.phone} />
      <input type="hidden" name="page_url" defaultValue="" />
      <input type="hidden" name="source" defaultValue="solarlists.com" />
      <input type="hidden" name="gclid" defaultValue="" />
      <input type="hidden" name="utm_source" defaultValue="" />
      <input type="hidden" name="utm_medium" defaultValue="" />
      <input type="hidden" name="utm_campaign" defaultValue="" />

      <button
        type="submit"
        disabled={!canSubmit}
        className="type-button mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Request a consult
      </button>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Requests go to{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2">
          {site.email}
        </a>
        . Call or text{" "}
        <a href={`tel:${site.phoneTel}`} className="underline underline-offset-2">
          {site.phone}
        </a>
        .
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
