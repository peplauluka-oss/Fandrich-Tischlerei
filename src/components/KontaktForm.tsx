import { useState, type FormEvent } from 'react';
import '../styles/form.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface Errors {
  name?: string;
  email?: string;
  nachricht?: string;
}

// Formular-Backend: Formspree. Sendet an anfrage@tischlerei-fandrich.de.
// Wichtig: Die ERSTE Absendung muss einmalig per E-Mail von Formspree bestätigt
// werden, damit das Formular aktiv ist (Double-Opt-in des Anbieters).
const FORM_ENDPOINT = 'https://formspree.io/f/xpqvyvgb';

export default function KontaktForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const nachricht = String(data.get('nachricht') ?? '').trim();
    if (name.length < 2) next.name = 'Bitte nennen Sie uns Ihren Namen.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    if (nachricht.length < 10)
      next.nachricht = 'Bitte beschreiben Sie Ihr Projekt in ein paar Sätzen.';
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!FORM_ENDPOINT) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="form__result" role="status">
        Ihre Nachricht ist angekommen. Wir melden uns innerhalb von zwei Werktagen bei Ihnen. Eilt
        es? Rufen Sie uns direkt an:{' '}
        <a href="tel:+493036445760" className="link-static">
          030&nbsp;36&nbsp;44&nbsp;57&nbsp;60
        </a>
      </p>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__field">
        <input type="text" id="name" name="name" placeholder=" " autoComplete="name" required />
        <label htmlFor="name">Name</label>
        {errors.name && <p className="form__error">{errors.name}</p>}
      </div>

      <div className="form__field">
        <input type="email" id="email" name="email" placeholder=" " autoComplete="email" required />
        <label htmlFor="email">E-Mail</label>
        {errors.email && <p className="form__error">{errors.email}</p>}
      </div>

      <div className="form__field">
        <input type="tel" id="telefon" name="telefon" placeholder=" " autoComplete="tel" />
        <label htmlFor="telefon">Telefon (optional)</label>
      </div>

      <div className="form__field">
        <textarea id="nachricht" name="nachricht" placeholder=" " rows={5} required />
        <label htmlFor="nachricht">Ihr Projekt</label>
        {errors.nachricht && <p className="form__error">{errors.nachricht}</p>}
      </div>

      <button type="submit" className="btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Wird gesendet …' : 'Nachricht senden'}
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </button>

      <p className="form__note">
        Unverbindlich — keine Werbung. Ihre Angaben nutzen wir ausschließlich zur Beantwortung Ihrer
        Anfrage.
      </p>

      {status === 'error' && (
        <p className="form__result form__result--error" role="alert">
          {/* TODO: E-Mail-Adresse ergänzen, sobald verifiziert (src/data/site.ts) */}
          Das hat leider nicht geklappt. Rufen Sie uns an:{' '}
          <a href="tel:+493036445760" className="link-static">
            030&nbsp;36&nbsp;44&nbsp;57&nbsp;60
          </a>
          .
        </p>
      )}
    </form>
  );
}
