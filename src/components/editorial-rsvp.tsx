"use client";

import { motion, useInView } from "framer-motion";
import { FormEvent, useRef, useState, type InputHTMLAttributes } from "react";

interface EditorialRsvpProps {
  title?: string;
  subtitle?: string;
  deadline?: string;
  formAction?: string;
}

// Elegant input field
function EditorialInput({
  label,
  name,
  type = "text",
  required = false,
  delay = 0,
  value,
  onValueChange,
  inputProps,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  delay?: number;
  value?: string | number;
  onValueChange?: (value: string) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(value !== undefined && value !== "");

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <input
        type={type}
        name={name}
        required={required}
        value={value ?? undefined}
        className="w-full bg-transparent border-b border-editorial-border py-3 sm:py-4 font-clean text-sm sm:text-base text-editorial-charcoal placeholder-transparent focus:outline-none focus:border-editorial-charcoal transition-colors duration-300 peer"
        placeholder={label}
        onChange={(e) => {
          const currentValue = e.target.value;
          setHasValue(currentValue.length > 0);
          onValueChange?.(currentValue);
        }}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        {...inputProps}
      />
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-clean
          ${
            focused || hasValue
              ? "top-0 text-[10px] sm:text-xs tracking-widest uppercase text-editorial-muted -translate-y-full"
              : "top-3 sm:top-4 text-sm sm:text-base text-editorial-stone"
          }`}
      >
        {label}
      </label>
    </motion.div>
  );
}

// Elegant radio button group
function EditorialRadioGroup({
  label,
  name,
  options,
  required = false,
  defaultValue,
  onChange,
  delay = 0,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  delay?: number;
}) {
  const [selected, setSelected] = useState<string | null>(defaultValue ?? null);

  return (
    <motion.div
      className="space-y-3 sm:space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="font-clean text-xs sm:text-sm text-editorial-stone block mb-2 sm:mb-4">
        {label}
      </span>
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
        {options.map((option, index) => (
          <label
            key={option.value}
            className={`
              flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 border cursor-pointer transition-all duration-300
              ${
                selected === option.value
                  ? "border-editorial-charcoal bg-editorial-charcoal text-editorial-cream"
                  : "border-editorial-border hover:border-editorial-border-hover text-editorial-charcoal"
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              className="hidden"
              required={required && index === 0}
              checked={selected === option.value}
              onChange={() => {
                setSelected(option.value);
                onChange?.(option.value);
              }}
            />
            <span className="font-clean text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </motion.div>
  );
}

// Elegant textarea
function EditorialTextarea({
  label,
  name,
  required = false,
  delay = 0,
}: {
  label: string;
  name: string;
  required?: boolean;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <textarea
        name={name}
        rows={4}
        required={required}
        className="w-full bg-transparent border-b border-editorial-border py-4 font-clean text-editorial-body text-editorial-charcoal placeholder-transparent focus:outline-none focus:border-editorial-charcoal transition-colors duration-300 peer resize-none"
        placeholder={label}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
      />
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-clean
          ${
            focused || hasValue
              ? "top-0 text-editorial-overline text-editorial-muted -translate-y-full"
              : "top-4 text-editorial-body text-editorial-stone"
          }`}
      >
        {label}
      </label>
    </motion.div>
  );
}

export function EditorialRsvp({
  title = "Potwierdź obecność",
  subtitle = "Prosimy o odpowiedź do",
  deadline = "15 lipca 2026",
  formAction,
}: EditorialRsvpProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [withChildren, setWithChildren] = useState<string | null>(null);
  const [childrenCount, setChildrenCount] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const endpoint = formAction ?? process.env.NEXT_PUBLIC_RSVP_WEBAPP_URL;

  type RsvpPayload = {
    fullName: string | null;
    attendance: string | null;
    diet: string | null;
    dietRestrictions: string | null;
    withChildren: string | null;
    childrenCount: number | "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!endpoint) {
      setSubmitError("Brak skonfigurowanego adresu Google Apps Script.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const payload: RsvpPayload = {
      fullName: (formData.get("fullName") as string) ?? null,
      attendance: (formData.get("attendance") as string) ?? null,
      diet: (formData.get("diet") as string) ?? null,
      dietRestrictions: (formData.get("dietRestrictions") as string) ?? null,
      withChildren: (formData.get("withChildren") as string) ?? null,
      childrenCount: formData.get("childrenCount")
        ? Number(formData.get("childrenCount"))
        : "",
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError("Nie udało się wysłać odpowiedzi. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="py-14 sm:py-20 md:py-28 lg:py-32 px-3 sm:px-4 md:px-6 bg-editorial-linen"
    >
      <div className="container-editorial-narrow">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="font-clean text-[10px] sm:text-xs tracking-widest uppercase text-editorial-muted block mb-3 sm:mb-4">
            RSVP
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-editorial-charcoal mb-2 sm:mb-4">
            {title}
          </h2>
          <p className="font-clean text-sm sm:text-base text-editorial-stone">
            {subtitle} <span className="font-medium">{deadline}</span>
          </p>

          {/* Decorative element */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-12 h-px bg-editorial-stone/20" />
            <div className="w-1 h-1 rounded-full bg-editorial-stone/40" />
            <div className="w-12 h-px bg-editorial-stone/20" />
          </motion.div>
        </motion.div>

        {/* Form */}
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            action={formAction}
            className="space-y-6 sm:space-y-8 md:space-y-10 max-w-xl mx-auto"
          >
            <EditorialInput
              label="Proszę podać swoje imię i nazwisko"
              name="fullName"
              required
              delay={0.1}
            />

            <EditorialRadioGroup
              label="Czy planujesz przyjść na nasz ślub?"
              name="attendance"
              options={[
                { value: "yes", label: "Tak" },
                { value: "no", label: "Nie" },
              ]}
              required
              delay={0.25}
            />

            <EditorialRadioGroup
              label="Wolicie tradycyjne dania mięsne, czy raczej skłaniacie się ku potrawom wegetariańskim?"
              name="diet"
              options={[
                { value: "vegetarian", label: "Dania wegetariańskie" },
                { value: "meat", label: "Dania mięsne" },
                { value: "any", label: "Bez różnicy" },
              ]}
              required
              defaultValue="any"
              delay={0.3}
            />

            <EditorialTextarea
              label="Czy masz jakieś ograniczenia dietetyczne lub alergie pokarmowe, o których powinniśmy wiedzieć?"
              name="dietRestrictions"
              required={false}
              delay={0.35}
            />

            <EditorialRadioGroup
              label="Planujesz zabrać ze sobą dzieci?"
              name="withChildren"
              options={[
                { value: "yes", label: "Tak" },
                { value: "no", label: "Nie" },
              ]}
              required
              onChange={(value) => {
                setWithChildren(value);
                if (value === "no") {
                  setChildrenCount("");
                }
              }}
              delay={0.4}
            />

            {withChildren === "yes" && (
              <EditorialInput
                label="Ile dzieci planujesz ze sobą zabrać?"
                name="childrenCount"
                type="number"
                required
                value={childrenCount}
                onValueChange={setChildrenCount}
                inputProps={{ min: 1, step: 1 }}
                delay={0.45}
              />
            )}

            {/* Submit button */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-editorial-filled py-5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.div
                      className="w-4 h-4 border border-editorial-cream/30 border-t-editorial-cream rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Wysyłanie...
                  </span>
                ) : (
                  "Wyślij odpowiedź"
                )}
              </button>
              {submitError && (
                <p className="text-sm text-red-700 mt-3 text-center">
                  {submitError}
                </p>
              )}
            </motion.div>
          </form>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-editorial-charcoal flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-editorial-charcoal"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-editorial text-editorial-h3 text-editorial-charcoal mb-4">
              Dziękujemy!
            </h3>
            <p className="font-clean text-editorial-body text-editorial-stone">
              Twoja odpowiedź została zapisana. Do zobaczenia!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default EditorialRsvp;
