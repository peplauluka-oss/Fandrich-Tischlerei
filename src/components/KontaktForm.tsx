import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '../styles/form.css';

// Formular-Backend: Formspree. Sendet an anfrage@tischlerei-fandrich.de.
// Wichtig: Die ERSTE Absendung muss einmalig per E-Mail von Formspree bestätigt
// werden, damit das Formular aktiv ist (Double-Opt-in des Anbieters).
const FORM_ENDPOINT = 'https://formspree.io/f/xpqvyvgb';

type Status = 'idle' | 'sending' | 'success' | 'error';

const LEISTUNGEN = ['Neuanfertigung', 'Restaurierung', 'Reparatur', 'Wartung', 'Etwas anderes'];
const AUFTRAGGEBER = ['Privat', 'Hausverwaltung', 'Gewerbe'];
const TOTAL = 3;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v: string) => /\d{6,}/.test(v.replace(/[\s/()+-]/g, ''));

/**
 * Konversationelles Kontaktformular „eine Frage nach der anderen":
 * Schritt 1+2 per Knopfdruck (auto-weiter), Schritt 3 minimaler Kontakt.
 * Barrierefrei: echte Buttons, Fokuswechsel auf die neue Frage, aria-live,
 * Zurück-Navigation, reduced-motion-fest. Absenden via Formspree.
 */
export default function KontaktForm() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [leistung, setLeistung] = useState('');
  const [auftraggeber, setAuftraggeber] = useState('');
  const [errors, setErrors] = useState<{ name?: string; kontakt?: string }>({});

  const qRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const timer = useRef<number | undefined>(undefined);

  // Fokus auf die neue Frage bei jedem Schrittwechsel (nicht beim ersten Laden).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    qRef.current?.focus();
  }, [step]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (setter: (v: string) => void, value: string) => {
    setter(value);
    window.clearTimeout(timer.current);
    // kurze Verzögerung, damit die Auswahl sichtbar aufleuchtet, dann weiter
    timer.current = window.setTimeout(
      () => setStep((s) => Math.min(s + 1, TOTAL - 1)),
      reduced ? 0 : 260,
    );
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('Name') ?? '').trim();
    const kontakt = String(fd.get('Kontakt') ?? '').trim();

    const next: typeof errors = {};
    if (name.length < 2) next.name = 'Bitte nennen Sie uns Ihren Namen.';
    if (!isEmail(kontakt) && !isPhone(kontakt))
      next.kontakt = 'Bitte Telefon oder E-Mail angeben, damit wir antworten können.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    fd.append('Leistung', leistung || '—');
    fd.append('Auftraggeber', auftraggeber || '—');
    fd.append('_subject', `Neue Anfrage: ${leistung || 'Projekt'} (${auftraggeber || '—'})`);
    if (isEmail(kontakt)) fd.append('email', kontakt); // Reply-to für die Antwort

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="form__result" role="status">
        Danke, Ihre Anfrage ist angekommen — wir melden uns innerhalb von zwei Werktagen. Eilt es?
        Rufen Sie uns direkt an:{' '}
        <a href="tel:+493036445760" className="link-static">
          030&nbsp;36&nbsp;44&nbsp;57&nbsp;60
        </a>
      </p>
    );
  }

  return (
    <div className="cform" role="group" aria-label="Anfrage in drei kurzen Schritten">
      <div className="cform__top">
        <span className="cform__kicker">Eine Frage nach der anderen</span>
        <span className="cform__count">
          Schritt {step + 1} von {TOTAL}
        </span>
      </div>
      <div className="cform__dots" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`cform__dot${i < step ? ' is-done' : ''}${i === step ? ' is-current' : ''}`}
          />
        ))}
      </div>

      <div className="cform__stage">
        <motion.div
          key={step}
          initial={reduced ? false : { opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <div className="cform__step" role="group" aria-labelledby="cq0">
              <h3 className="cform__q" id="cq0" tabIndex={-1} ref={qRef}>
                Worum geht&rsquo;s?
              </h3>
              <div className="cform__choices">
                {LEISTUNGEN.map((o) => (
                  <button
                    type="button"
                    key={o}
                    className={`cform__choice${leistung === o ? ' is-active' : ''}`}
                    aria-pressed={leistung === o}
                    onClick={() => pick(setLeistung, o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="cform__step" role="group" aria-labelledby="cq1">
              <h3 className="cform__q" id="cq1" tabIndex={-1} ref={qRef}>
                Für wen ist es?
              </h3>
              <div className="cform__choices">
                {AUFTRAGGEBER.map((o) => (
                  <button
                    type="button"
                    key={o}
                    className={`cform__choice${auftraggeber === o ? ' is-active' : ''}`}
                    aria-pressed={auftraggeber === o}
                    onClick={() => pick(setAuftraggeber, o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
              <button type="button" className="cform__back" onClick={back}>
                <span aria-hidden="true">←</span> zurück
              </button>
            </div>
          )}

          {step === 2 && (
            <form className="form cform__contact" onSubmit={onSubmit} noValidate>
              <h3 className="cform__q" id="cq2" tabIndex={-1} ref={qRef}>
                Wie erreichen wir Sie?
              </h3>

              <div className="form__field">
                <input type="text" id="name" name="Name" placeholder=" " autoComplete="name" required />
                <label htmlFor="name">Name</label>
                {errors.name && <p className="form__error">{errors.name}</p>}
              </div>

              <div className="form__field">
                <input
                  type="text"
                  id="kontakt"
                  name="Kontakt"
                  placeholder=" "
                  autoComplete="tel"
                  required
                />
                <label htmlFor="kontakt">Telefon oder E-Mail</label>
                {errors.kontakt && <p className="form__error">{errors.kontakt}</p>}
              </div>

              <button type="submit" className="btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
                <span className="arrow" aria-hidden="true">→</span>
              </button>

              <p className="form__note">
                Unverbindlich — keine Werbung. Ihre Angaben nutzen wir ausschließlich zur
                Beantwortung Ihrer Anfrage.
              </p>

              {status === 'error' && (
                <p className="form__result form__result--error" role="alert">
                  Das hat leider nicht geklappt. Rufen Sie uns an:{' '}
                  <a href="tel:+493036445760" className="link-static">
                    030&nbsp;36&nbsp;44&nbsp;57&nbsp;60
                  </a>
                  .
                </p>
              )}

              <button type="button" className="cform__back" onClick={back}>
                <span aria-hidden="true">←</span> zurück
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <p className="cform__sr" aria-live="polite">
        Schritt {step + 1} von {TOTAL}.
      </p>
    </div>
  );
}
