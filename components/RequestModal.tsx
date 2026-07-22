"use client";

import { X, ArrowRight, CaretDown } from "./icons";

export function RequestModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <section
      id="request-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-background border border-foreground/10 w-full max-w-lg mx-4 p-8 relative">
        <button
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="font-bold text-3xl text-foreground mb-2 leading-tight">
          Start a project
        </h2>
        <p className="text-muted text-sm mb-8">
          Tell us about your project and we&apos;ll get back to you shortly.
        </p>

        <form
          className="flex flex-col gap-6"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="modal-name" className="font-medium text-foreground text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="modal-name"
              placeholder="Joe Yoke"
              className="bg-transparent border-b border-foreground/20 focus:border-primary outline-none text-foreground placeholder:text-muted py-2 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="modal-email" className="font-medium text-foreground text-sm">
              Email Address
            </label>
            <input
              type="email"
              id="modal-email"
              placeholder="hello@joeyoke.com"
              className="bg-transparent border-b border-foreground/20 focus:border-primary outline-none text-foreground placeholder:text-muted py-2 text-sm transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="modal-type" className="font-medium text-foreground text-sm">
              Project Type
            </label>
            <button
              type="button"
              id="modal-type"
              className="bg-transparent border-b border-foreground/20 text-muted py-2 text-sm text-left flex items-center justify-between hover:border-primary transition-colors"
            >
              <span>Select a type</span>
              <CaretDown size={16} className="text-muted" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="modal-message" className="font-medium text-foreground text-sm">
              Message
            </label>
            <textarea
              id="modal-message"
              rows={3}
              placeholder="Describe your project..."
              className="bg-transparent border-b border-foreground/20 focus:border-primary outline-none text-foreground placeholder:text-muted py-2 text-sm resize-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="font-semibold bg-primary text-background py-3 px-8 text-sm tracking-wide rounded-full rounded-theme-btn hover:opacity-90 transition-opacity mt-2 flex items-center justify-between group"
          >
            <span>Send Request</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>
      </div>
    </section>
  );
}
