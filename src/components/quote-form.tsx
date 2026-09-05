"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  cityZip,
  formBillRanges,
  formInterest,
  formOwnHome,
  formRoofAges,
  formRoofTypes,
  formTimings,
  site,
  type City,
  type Service,
} from "@/config/site";

const fieldClassName =
  "h-11 w-full rounded-lg border border-input bg-card px-2.5 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export const formCardClassName =
  "rounded-[16px] border border-border bg-card p-5 shadow-[0_16px_40px_rgba(26,29,24,0.14)]";

type Draft = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  own_home: string;
  monthly_bill: string;
  timing: string;
  interested_in: string;
  roof_age: string;
  roof_type: string;
  message: string;
  sms_consent: boolean;
  privacy_consent: boolean;
};

const drafts = new Map<string, Draft>();

function emptyDraft(service?: Service, city?: City): Draft {
  return {
    name: "",
    phone: "",
    email: "",
    zip: city ? cityZip(city) : "",
    own_home: "",
    monthly_bill: "",
    timing: "",
    interested_in: service?.formValue ?? "tpo",
    roof_age: "",
    roof_type: "",
    message: "",
    sms_consent: false,
    privacy_consent: false,
  };
}

function draftKey(city?: City, service?: Service) {
  return `${city?.slug ?? "home"}:${service?.slug ?? "none"}`;
}

function readDraft(key: string, service?: Service, city?: City): Draft {
  const cached = drafts.get(key);
  const zip = city ? cityZip(city) : "";
  if (cached) {
    if (!cached.zip && zip) return { ...cached, zip };
    return cached;
  }
  return emptyDraft(service, city);
}

function writeDraft(key: string, draft: Draft) {
  drafts.set(key, draft);
}

type QuoteFormProps = {
  city?: City;
  service?: Service;
  compact?: boolean;
};

export function QuoteForm({ city, service, compact }: QuoteFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const lastKeyRef = useRef("");
  const key = draftKey(city, service);
  const [draft, setDraft] = useState<Draft>(() => readDraft(key, service, city));

  function update<K extends keyof Draft>(name: K, value: Draft[K]) {
    setDraft((prev) => {
      const next = { ...prev, [name]: value };
      writeDraft(key, next);
      return next;
    });
  }

  function onTextChange<
    K extends "name" | "phone" | "email" | "zip" | "message",
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
      id="quote"
      action={site.formAction}
      method="POST"
      acceptCharset="UTF-8"
      autoComplete="off"
      onKeyDown={(event) => {
        lastKeyRef.current = event.key;
        if (event.key !== "Escape") return;
        event.preventDefault();
        event.stopPropagation();
        setDraft((current) => ({ ...current }));
      }}
      onFocusCapture={() => {
        window.setTimeout(() => {
          const form = formRef.current;
          if (!form) return;
          for (const name of ["name", "phone", "email", "zip"] as const) {
            const field = form.elements.namedItem(name);
            if (field instanceof HTMLInputElement && field.value) {
              update(name, field.value);
            }
          }
        }, 50);
      }}
      className={`scroll-mt-24 ${formCardClassName}`}
    >
      <h2 className="font-heading text-lg font-semibold sm:text-xl">
        Request a solar quote
      </h2>
      <p className="mt-1 text-[16px] leading-[26px] text-muted-foreground">
        No credit card.
      </p>

      <div className={`mt-4 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={fieldClassName}
            value={draft.phone}
            onChange={(event) => onTextChange("phone", event.target.value)}
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
        <Field label="Service" htmlFor="interested_in">
          <select
            id="interested_in"
            name="interested_in"
            required
            className={fieldClassName}
            value={draft.interested_in}
            onChange={(event) => update("interested_in", event.target.value)}
          >
            {formInterest.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
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

      <details className="mt-4 rounded-lg border border-border bg-muted/40 px-3 py-2">
        <summary className="type-label cursor-pointer">More details</summary>
        <div className={`mt-3 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
          <Field label="Name (optional)" htmlFor="name">
            <input
              id="name"
              name="name"
              autoComplete="name"
              className={fieldClassName}
              value={draft.name}
              onChange={(event) => onTextChange("name", event.target.value)}
            />
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
            placeholder="Shade, roof notes, or questions about TPO vs buying."
            value={draft.message}
            onChange={(event) => onTextChange("message", event.target.value)}
          />
        </Field>
      </details>

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
      <label className="mt-2 flex items-start gap-2 text-[16px] leading-[26px]">
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
      <input type="hidden" name="_subject" value={`${site.name} quote request`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="page_url" defaultValue="" />
      <input type="hidden" name="city" defaultValue={city?.name ?? ""} />
      <input type="hidden" name="city_slug" defaultValue={city?.slug ?? ""} />
      <input type="hidden" name="state_abbr" defaultValue={city?.stateAbbr ?? ""} />
      <input type="hidden" name="service" defaultValue={service?.slug ?? ""} />
      <input type="hidden" name="source" defaultValue="solarlists.com" />
      <input type="hidden" name="gclid" defaultValue="" />
      <input type="hidden" name="utm_source" defaultValue="" />
      <input type="hidden" name="utm_medium" defaultValue="" />
      <input type="hidden" name="utm_campaign" defaultValue="" />

      <button
        type="submit"
        className="type-button mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Send request
      </button>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        If the form cannot send, email{" "}
        <a href={`mailto:${site.leadsEmail}`} className="underline">
          {site.leadsEmail}
        </a>{" "}
        with the same details.
      </p>
    </form>
  );
}

function setHidden(form: HTMLFormElement, name: string, value: string) {
  const field = form.elements.namedItem(name);
  if (field instanceof HTMLInputElement) field.value = value;
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
