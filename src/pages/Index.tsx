import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  painting1: "https://cdn.poehali.dev/projects/0fbc1966-8751-4732-9e58-d4bd044585a5/bucket/a869a2b0-74b4-4d5a-86e1-eda1b55f60d4.jpg",
  painting2: "https://cdn.poehali.dev/projects/0fbc1966-8751-4732-9e58-d4bd044585a5/bucket/0041b4bf-e524-490d-9ad2-0ea6f98c9c75.jpg",
  painting3: "https://cdn.poehali.dev/projects/0fbc1966-8751-4732-9e58-d4bd044585a5/bucket/fa2ecb2e-6289-4f65-89e2-6329d0674b82.jpg",
  painting4: "https://cdn.poehali.dev/projects/0fbc1966-8751-4732-9e58-d4bd044585a5/bucket/78d2bf83-6633-4fed-9c9a-f59a84866ae5.jpg",
};

const PAINTINGS = [
  {
    id: 1,
    image: IMAGES.painting1,
    title: "Цветение",
    theme: "Принятие себя",
    description: "Образ внутреннего расцвета — для тех, кто учится любить себя.",
  },
  {
    id: 2,
    image: IMAGES.painting3,
    title: "Путь к себе",
    theme: "Самоопределение",
    description: "Картина для тех, кто стоит на пороге нового этапа жизни.",
  },
  {
    id: 3,
    image: IMAGES.painting4,
    title: "Свет внутри",
    theme: "Исцеление",
    description: "Нежный образ для отпускания боли и обретения покоя.",
  },
];

const SERVICES = [
  {
    icon: "Palette",
    title: "Картина-образ",
    desc: "Создаю уникальное полотно под вашу личную историю, запрос или жизненный вызов.",
    price: "от 15 000 ₽",
  },
  {
    icon: "Heart",
    title: "Терапевтический портрет",
    desc: "Ваш образ как метафора силы, красоты и внутреннего состояния.",
    price: "от 22 000 ₽",
  },
  {
    icon: "Gift",
    title: "Картина в подарок",
    desc: "Создаю смысловой подарок для близкого человека — с заботой и вниманием.",
    price: "от 12 000 ₽",
  },
];

const REVIEWS = [
  {
    name: "Мария",
    text: "Картина стала моим якорем в трудный период. Каждый раз, глядя на неё, чувствую поддержку и ясность. Это чудо.",
    theme: "Отпускание расставания",
  },
  {
    name: "Светлана",
    text: "Заказала картину дочери на совершеннолетие. Она до сих пор говорит, что это самый смысловой подарок в её жизни.",
    theme: "Взросление и путь",
  },
  {
    name: "Анна",
    text: "Образ помог мне принять решение, которое я откладывала годами. Будто кто-то поверил в меня — через краски.",
    theme: "Внутренний конфликт",
  },
];

const THEMES = [
  "Взросление и самоопределение",
  "Рождение ребёнка",
  "Принятие себя",
  "Внутренний конфликт",
  "Избавление от душевной боли",
  "Отпускание партнёра",
  "Обретение любви",
  "Новый жизненный этап",
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${visible ? "section-visible" : "section-hidden"} ${className}`}
      style={{ transition: "opacity 0.9s ease, transform 0.9s ease" }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", theme: "", message: "" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen watercolor-bg">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-cormorant text-xl font-light tracking-widest"
            style={{ color: "var(--text-dark)" }}
          >
            Алёна Мелешкина
            <span className="font-nunito text-xs ml-2" style={{ color: "var(--rose)", letterSpacing: "0.15em" }}>
              художник
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[["portfolio", "Портфолио"], ["about", "Обо мне"], ["services", "Услуги"], ["reviews", "Отзывы"], ["order", "Заказать"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link">{label}</button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--text-mid)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t px-6 py-6 flex flex-col gap-5" style={{ borderColor: "rgba(232,167,184,0.15)" }}>
            {[["portfolio", "Портфолио"], ["about", "Обо мне"], ["services", "Услуги"], ["reviews", "Отзывы"], ["order", "Заказать"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link text-left">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div
          className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-25 animate-float"
          style={{ background: "radial-gradient(circle, var(--rose-light), transparent)", filter: "blur(40px)" }}
        />
        <div
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-20 animate-float"
          style={{ background: "radial-gradient(circle, var(--blue-light), transparent)", filter: "blur(40px)", animationDelay: "3s" }}
        />

        <div className="max-w-4xl mx-auto px-6 text-center">
          <p
            className="font-nunito text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in-up"
            style={{ color: "var(--rose)", animationDelay: "0.1s", opacity: 0 }}
          >
            Художник-терапевт
          </p>
          <h1
            className="font-cormorant text-6xl md:text-8xl font-light leading-tight mb-6 animate-fade-in-up"
            style={{ color: "var(--text-dark)", animationDelay: "0.25s", opacity: 0 }}
          >
            <em className="font-light" style={{ color: "var(--text-dark)" }}>Картины,</em>
            <br />
            <em className="font-light" style={{ color: "var(--rose)" }}>которые исцеляют</em>
          </h1>
          <p
            className="font-nunito font-light text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up"
            style={{ color: "var(--text-mid)", animationDelay: "0.4s", opacity: 0 }}
          >
            Создаю уникальные образы под ваш личный запрос — картины, которые сопровождают
            вас в жизненных вызовах, помогают исцелиться и обрести ясность.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.6s", opacity: 0 }}
          >
            <button onClick={() => scrollTo("order")} className="btn-rose">Заказать картину</button>
            <button onClick={() => scrollTo("portfolio")} className="btn-outline">Смотреть работы</button>
          </div>

          <div
            className="mt-14 flex flex-wrap gap-2 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.8s", opacity: 0 }}
          >
            {THEMES.map((t) => (
              <span
                key={t}
                className="font-nunito text-xs px-4 py-2 rounded-full"
                style={{ background: "rgba(232,167,184,0.12)", color: "var(--text-mid)", border: "1px solid rgba(232,167,184,0.3)", letterSpacing: "0.05em" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "1.2s", opacity: 0 }}
        >
          <span className="font-nunito text-xs tracking-widest uppercase" style={{ color: "var(--text-light)" }}>Листайте</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--rose), transparent)" }} />
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="font-nunito text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--rose)" }}>Галерея</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: "var(--text-dark)" }}>
              Мои <em>работы</em>
            </h2>
            <div className="mt-3 flex justify-center">
              <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, var(--rose), var(--blue), transparent)" }} />
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PAINTINGS.map((p) => (
              <RevealSection key={p.id}>
                <div className="painting-card rounded-3xl overflow-hidden group cursor-pointer" style={{ boxShadow: "0 4px 30px rgba(232,167,184,0.1)" }}>
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                      style={{ background: "linear-gradient(to top, rgba(61,45,53,0.7) 0%, transparent 60%)" }}
                    >
                      <span className="font-nunito text-xs uppercase tracking-widest text-white/70 mb-1">{p.theme}</span>
                      <p className="font-nunito text-sm text-white/90 leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                  <div className="p-5 bg-white">
                    <span className="font-nunito text-xs uppercase tracking-widest" style={{ color: "var(--rose)" }}>{p.theme}</span>
                    <h3 className="font-cormorant text-2xl font-light mt-1" style={{ color: "var(--text-dark)" }}>{p.title}</h3>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6" style={{ background: "linear-gradient(135deg, var(--rose-pale) 0%, var(--blue-pale) 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-nunito text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--rose)" }}>Обо мне</p>
                <h2 className="font-cormorant text-5xl font-light leading-tight mb-6" style={{ color: "var(--text-dark)" }}>
                  Искусство как <em>язык души</em>
                </h2>
                <div className="space-y-5 font-nunito font-light leading-relaxed" style={{ color: "var(--text-mid)" }}>
                  <p>
                    Я создаю картины, которые говорят с той частью вас, до которой не дотянуться словами. Каждое полотно рождается из вашей истории — из того, что болит, ищет выход или просит поддержки.
                  </p>
                  <p>
                    Мой подход объединяет художественное мастерство и психологическую чуткость. Прежде чем взять кисть, я слушаю — внимательно и бережно.
                  </p>
                  <p>
                    Результат — живой образ, который сопровождает вас: напоминает о вашей силе, помогает отпустить или открывает путь вперёд.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-8">
                  {[["120+", "картин создано"], ["7 лет", "в искусстве"], ["98%", "довольных клиентов"]].map(([num, label]) => (
                    <div key={label}>
                      <div className="font-cormorant text-4xl font-light" style={{ color: "var(--rose)" }}>{num}</div>
                      <div className="font-nunito text-xs uppercase tracking-wider mt-1" style={{ color: "var(--text-light)" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl" style={{ border: "1px solid var(--rose-light)" }} />
                <img src={IMAGES.painting2} alt="О художнике" className="relative rounded-3xl w-full object-cover aspect-square" />
                <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-6 py-4" style={{ boxShadow: "0 8px 30px rgba(232,167,184,0.2)" }}>
                  <p className="font-cormorant text-lg italic" style={{ color: "var(--text-dark)" }}>«Каждая картина —<br />это разговор о главном»</p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="font-nunito text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--blue)", filter: "brightness(0.65)" }}>Услуги</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: "var(--text-dark)" }}>
              Что я <em>создаю</em>
            </h2>
            <div className="mt-3 flex justify-center">
              <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, var(--blue), var(--rose), transparent)" }} />
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <RevealSection key={s.title}>
                <div
                  className="rounded-3xl p-8 h-full flex flex-col"
                  style={{
                    background: i === 1 ? "linear-gradient(135deg, var(--rose-pale), var(--blue-pale))" : "white",
                    border: "1px solid rgba(232,167,184,0.2)",
                    boxShadow: "0 4px 30px rgba(232,167,184,0.07)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: "linear-gradient(135deg, var(--rose-light), var(--blue-light))" }}
                  >
                    <Icon name={s.icon as "Palette" | "Heart" | "Gift"} size={20} style={{ color: "var(--text-dark)" }} />
                  </div>
                  <h3 className="font-cormorant text-2xl font-light mb-3" style={{ color: "var(--text-dark)" }}>{s.title}</h3>
                  <p className="font-nunito font-light text-sm leading-relaxed flex-1" style={{ color: "var(--text-mid)" }}>{s.desc}</p>
                  <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(232,167,184,0.2)" }}>
                    <span className="font-cormorant text-xl" style={{ color: "var(--rose)" }}>{s.price}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center mt-10">
            <p className="font-nunito font-light text-sm" style={{ color: "var(--text-light)" }}>
              Каждая работа индивидуальна — цена зависит от размера, сложности и темы.
              <br />Свяжитесь со мной, чтобы обсудить ваш запрос.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6" style={{ background: "linear-gradient(135deg, var(--blue-pale) 0%, var(--rose-pale) 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="font-nunito text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--rose)" }}>Отзывы</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: "var(--text-dark)" }}>
              Истории <em>исцеления</em>
            </h2>
            <div className="mt-3 flex justify-center">
              <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, var(--rose), var(--blue), transparent)" }} />
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((r) => (
              <RevealSection key={r.name}>
                <div className="bg-white rounded-3xl p-8" style={{ boxShadow: "0 8px 40px rgba(232,167,184,0.12)" }}>
                  <div className="font-cormorant text-6xl leading-none mb-4 select-none" style={{ color: "var(--rose-light)" }}>"</div>
                  <p className="font-nunito font-light text-sm leading-relaxed mb-6" style={{ color: "var(--text-mid)" }}>{r.text}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-cormorant text-lg font-light" style={{ color: "var(--text-dark)" }}>{r.name}</div>
                      <div className="font-nunito text-xs mt-0.5" style={{ color: "var(--rose)", letterSpacing: "0.05em" }}>{r.theme}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => <span key={j} style={{ color: "var(--gold)" }}>★</span>)}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealSection className="text-center mb-14">
            <p className="font-nunito text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--rose)" }}>Заказ</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: "var(--text-dark)" }}>
              Создадим <em>вместе</em>
            </h2>
            <p className="font-nunito font-light text-base mt-4 leading-relaxed" style={{ color: "var(--text-mid)" }}>
              Расскажите о том, что вас волнует — и я создам образ, который будет вашим.
            </p>
          </RevealSection>

          <RevealSection>
            <div
              className="bg-white rounded-3xl p-8 md:p-12"
              style={{ boxShadow: "0 8px 60px rgba(232,167,184,0.12)", border: "1px solid rgba(232,167,184,0.15)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-nunito text-xs uppercase tracking-wider block mb-2" style={{ color: "var(--text-light)" }}>Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Как вас зовут?"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl font-nunito text-sm outline-none transition-all"
                    style={{ background: "var(--rose-pale)", border: "1px solid transparent", color: "var(--text-dark)" }}
                    onFocus={e => (e.target.style.borderColor = "var(--rose)")}
                    onBlur={e => (e.target.style.borderColor = "transparent")}
                  />
                </div>
                <div>
                  <label className="font-nunito text-xs uppercase tracking-wider block mb-2" style={{ color: "var(--text-light)" }}>Email</label>
                  <input
                    type="email"
                    placeholder="для связи с вами"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl font-nunito text-sm outline-none transition-all"
                    style={{ background: "var(--rose-pale)", border: "1px solid transparent", color: "var(--text-dark)" }}
                    onFocus={e => (e.target.style.borderColor = "var(--rose)")}
                    onBlur={e => (e.target.style.borderColor = "transparent")}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-nunito text-xs uppercase tracking-wider block mb-2" style={{ color: "var(--text-light)" }}>Тема или запрос</label>
                  <select
                    value={formData.theme}
                    onChange={e => setFormData({ ...formData, theme: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl font-nunito text-sm outline-none transition-all appearance-none cursor-pointer"
                    style={{ background: "var(--blue-pale)", border: "1px solid transparent", color: formData.theme ? "var(--text-dark)" : "var(--text-light)" }}
                    onFocus={e => (e.target.style.borderColor = "var(--blue)")}
                    onBlur={e => (e.target.style.borderColor = "transparent")}
                  >
                    <option value="">Выберите тему...</option>
                    {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                    <option value="Другое">Другое (опишу ниже)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="font-nunito text-xs uppercase tracking-wider block mb-2" style={{ color: "var(--text-light)" }}>Ваша история или пожелание</label>
                  <textarea
                    rows={5}
                    placeholder="Расскажите, что сейчас происходит в вашей жизни, что вас беспокоит или к чему вы стремитесь. Чем больше вы поделитесь — тем точнее получится образ."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl font-nunito text-sm outline-none transition-all resize-none leading-relaxed"
                    style={{ background: "var(--rose-pale)", border: "1px solid transparent", color: "var(--text-dark)" }}
                    onFocus={e => (e.target.style.borderColor = "var(--rose)")}
                    onBlur={e => (e.target.style.borderColor = "transparent")}
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button className="btn-rose w-full sm:w-auto">Отправить заявку</button>
                <p className="font-nunito text-xs text-center sm:text-left" style={{ color: "var(--text-light)" }}>
                  Отвечу в течение 24 часов и предложу формат работы
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="py-16 px-6" style={{ background: "var(--text-dark)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="font-cormorant text-2xl font-light text-white mb-2">Алёна Мелешкина</div>
              <div className="font-nunito text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--rose)" }}>Художник-терапевт</div>
              <p className="font-nunito font-light text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Создаю картины, которые помогают исцелиться, обрести себя и двигаться вперёд.
              </p>
            </div>
            <div>
              <div className="font-nunito text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>Разделы</div>
              <div className="flex flex-col gap-3">
                {[["portfolio", "Портфолио"], ["about", "Обо мне"], ["services", "Услуги"], ["reviews", "Отзывы"], ["order", "Заказать"]].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="font-nunito text-sm text-left transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-nunito text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>Контакты</div>
              <div className="flex flex-col gap-4">
                <a href="mailto:Falcon_power@mail.ru" className="flex items-center gap-3 font-nunito text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Icon name="Mail" size={15} /> Falcon_power@mail.ru
                </a>
                <a href="https://t.me/walnut_paradise" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-nunito text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Icon name="MessageCircle" size={15} /> @walnut_paradise
                </a>
                <a href="https://vk.com/lyyria_govorit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-nunito text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Icon name="Users" size={15} /> ВКонтакте
                </a>
              </div>
            </div>
          </div>
          <div
            className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="font-nunito text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              © 2026 Алёна Мелешкина. Все права защищены.
            </p>
            <p className="font-nunito text-xs italic" style={{ color: "rgba(255,255,255,0.2)" }}>
              Каждая картина рождается из любви
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}