import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function ResearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [methodTab, setMethodTab] = useState<'iframe' | 'oembed'>('iframe');
  const tabsRef = useRef<HTMLDivElement>(null);

  // Sync ?tab= from URL on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'iframe' || tabParam === 'oembed') {
      setMethodTab(tabParam);
      // Scroll to tabs section after render
      setTimeout(() => {
        tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab: 'iframe' | 'oembed') => {
    setMethodTab(tab);
    setSearchParams({ tab }, { replace: true });
  };

  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-8 sm:px-6 lg:px-8">
      <article className="prose prose-slate dark:prose-invert max-w-none min-w-0">
        <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Результати дослідження TikTok Embed</h1>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Огляд</h2>
          <p className="text-muted-foreground mb-4">
            Цей документ підсумовує дослідження можливостей кастомізації TikTok embed, проведене для{' '}
            <strong>ZP-4177</strong> (Viral Tab v1).
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Дата дослідження:</strong> 25 березня 2025
            </p>
            <p>
              <strong>Playground:</strong>{' '}
              <a
                href="https://tik-tok-embeds.vercel.app"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://tik-tok-embeds.vercel.app
              </a>
            </p>
          </div>
        </div>

        <hr className="my-8" />

        <h2 className="mb-6 text-2xl font-semibold">Вимоги</h2>

        <h3 className="mb-3 text-xl font-semibold">Початкові питання</h3>
        <p className="text-muted-foreground mb-2">
          Зі Slack-повідомлення в #viral_content_product_team (25 березня 2025):
        </p>
        <blockquote className="border-muted my-4 border-l-4 pl-4 italic">
          &quot;Ми плануємо показувати приклади оригінальних вірусних відео з TikTok у нашому
          продукті через iFrame embed, тому потрібно зрозуміти можливості та обмеження цього
          інструмента. Головне завдання — зрозуміти, наскільки ми можемо адаптувати цей вигляд під
          наші потреби та UI.&quot;
        </blockquote>

        <h3 className="mt-8 mb-4 text-xl font-semibold">Конкретні вимоги з Jira ZP-4177</h3>

        <div className="-mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[500px] border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2 text-left">#</th>
                <th className="px-2 py-2 text-left">Питання</th>
                <th className="px-2 py-2 text-left">Висновок</th>
                <th className="px-2 py-2 text-left">Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-2 py-3">1</td>
                <td className="px-2 py-3 font-semibold">
                  Чи можна контролювати висоту, ширину, пропорції?
                </td>
                <td className="px-2 py-3">
                  Так — через CSS-обгортку та обмеження min-width/max-width. Iframe підтримує явні
                  атрибути width/height.
                </td>
                <td className="px-2 py-3 text-green-600">Підтримується</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-3">2</td>
                <td className="px-2 py-3 font-semibold">
                  Чи можна прибрати інфо автора та логотип TikTok?
                </td>
                <td className="px-2 py-3">
                  <strong>Ні</strong> — інфо автора, логотип TikTok та брендинг не можна видалити
                  згідно з Умовами використання TikTok.
                </td>
                <td className="px-2 py-3 text-red-600">Неможливо</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-3">3</td>
                <td className="px-2 py-3 font-semibold">
                  Чи можна прибрати метрики (лайки, коментарі, поділитися)?
                </td>
                <td className="px-2 py-3">
                  <strong>Ні</strong> — кнопки лайків, коментарів та &quot;поділитися&quot; завжди
                  видимі. Параметра для їх приховування не існує в API. Можна приховати лише опис,
                  музику, рекомендації та панель управління.
                </td>
                <td className="px-2 py-3 text-red-600">Неможливо</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-3">4</td>
                <td className="px-2 py-3 font-semibold">
                  Чи можна вимкнути редирект на TikTok при кліку?
                </td>
                <td className="px-2 py-3">
                  <strong>Ні</strong> — всі елементи (відео, автор, метрики, кнопка
                  &quot;Дивитись&quot;) посилаються на TikTok. Неможливо перехопити через CORS.
                </td>
                <td className="px-2 py-3 text-red-600">Неможливо</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="my-8" />

        <h2 className="mb-6 text-2xl font-semibold">Технічні деталі реалізації</h2>

        {/* Method tabs */}
        <div ref={tabsRef} className="mb-6 flex scroll-mt-16 border-b">
          <button
            onClick={() => handleTabChange('iframe')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              methodTab === 'iframe'
                ? 'border-primary text-foreground border-b-2'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Прямий Iframe (рекомендований)
          </button>
          <button
            onClick={() => handleTabChange('oembed')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              methodTab === 'oembed'
                ? 'border-primary text-foreground border-b-2'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            oEmbed API
          </button>
        </div>

        {methodTab === 'oembed' && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">oEmbed API</h3>
              <Link to="/?tab=oembed" className="text-sm text-blue-500 hover:underline">
                Спробувати в Пісочниці →
              </Link>
            </div>
            <p className="mb-2">
              <strong>Endpoint:</strong>{' '}
              <code className="bg-muted rounded px-2 py-1 text-xs sm:text-sm">
                https://www.tiktok.com/oembed?url=video_url
              </code>
            </p>

            <p className="mb-2">Відповідь містить:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>HTML blockquote з data-video-id</li>
              <li>URL мініатюри</li>
              <li>Метадані автора</li>
              <li>Стандартний embed-скрипт</li>
            </ul>

            <div className="bg-muted -mx-4 mb-4 rounded-lg p-4 sm:mx-0">
              <pre className="overflow-x-auto text-xs sm:text-sm">
                <code>{`<blockquote
  class="tiktok-embed"
  cite="https://www.tiktok.com/@username/video/1234567890"
  data-video-id="1234567890"
  style="max-width: 605px; min-width: 325px;"
>
  <section></section>
</blockquote>
<script async src="https://www.tiktok.com/embed.js"></script>`}</code>
              </pre>
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-800 dark:bg-green-900/20">
                <h4 className="mb-3 font-semibold text-green-700 dark:text-green-400">Переваги</h4>
                <ul className="list-disc space-y-1.5 pl-4 text-sm">
                  <li>Офіційний метод TikTok</li>
                  <li>Адаптивний дизайн</li>
                  <li>Автоматична мініатюра</li>
                  <li>Завжди актуальний плеєр</li>
                </ul>
              </div>
              <div className="flex-1 rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800 dark:bg-red-900/20">
                <h4 className="mb-3 font-semibold text-red-700 dark:text-red-400">Недоліки</h4>
                <ul className="list-disc space-y-1.5 pl-4 text-sm">
                  <li>Нуль кастомізації внутрішніх елементів</li>
                  <li>Брендинг TikTok незмінний</li>
                  <li>Редирект на TikTok при взаємодії</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {methodTab === 'iframe' && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Прямий Iframe Player</h3>
              <Link to="/?tab=iframe" className="text-sm text-blue-500 hover:underline">
                Спробувати в Пісочниці →
              </Link>
            </div>
            <p className="mb-2">
              <strong>Формат URL:</strong>{' '}
              <code className="bg-muted rounded px-2 py-1 text-xs sm:text-sm">
                https://www.tiktok.com/player/v1/video_id?params
              </code>
            </p>

            <h4 className="mb-2 font-semibold">Доступні query-параметри (10 підтверджених):</h4>
            <div className="-mx-4 mb-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[500px] border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-2 py-2 text-left">Параметр</th>
                    <th className="px-2 py-2 text-left">За замовч.</th>
                    <th className="px-2 py-2 text-left">Опис</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>autoplay</code>
                    </td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">
                      Автовідтворення (потребує muted=1 у більшості браузерів)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>muted</code>
                    </td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">Запуск без звуку</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>loop</code>
                    </td>
                    <td className="px-2 py-2">0</td>
                    <td className="px-2 py-2">Циклічне відтворення</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>music_info</code>
                    </td>
                    <td className="px-2 py-2">1</td>
                    <td className="px-2 py-2">Показувати інфо про музику</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>description</code>
                    </td>
                    <td className="px-2 py-2">1</td>
                    <td className="px-2 py-2">Показувати опис відео</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>rel</code>
                    </td>
                    <td className="px-2 py-2">1</td>
                    <td className="px-2 py-2">Показувати рекомендовані відео</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>controls</code>
                    </td>
                    <td className="px-2 py-2">1</td>
                    <td className="px-2 py-2">Показувати елементи управління</td>
                  </tr>
                  <tr className="border-b bg-red-950/20">
                    <td className="px-2 py-2 line-through opacity-60">
                      <code>progress_bar</code>
                    </td>
                    <td className="px-2 py-2 opacity-60">—</td>
                    <td className="px-2 py-2 text-red-400">Не працює (перевірено)</td>
                  </tr>
                  <tr className="border-b bg-red-950/20">
                    <td className="px-2 py-2 line-through opacity-60">
                      <code>play_button</code>
                    </td>
                    <td className="px-2 py-2 opacity-60">—</td>
                    <td className="px-2 py-2 text-red-400">Не працює (перевірено)</td>
                  </tr>
                  <tr className="border-b bg-red-950/20">
                    <td className="px-2 py-2 line-through opacity-60">
                      <code>volume_control</code>
                    </td>
                    <td className="px-2 py-2 opacity-60">—</td>
                    <td className="px-2 py-2 text-red-400">Не працює (перевірено)</td>
                  </tr>
                  <tr className="border-b bg-red-950/20">
                    <td className="px-2 py-2 line-through opacity-60">
                      <code>fullscreen_button</code>
                    </td>
                    <td className="px-2 py-2 opacity-60">—</td>
                    <td className="px-2 py-2 text-red-400">Не працює (перевірено)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>timestamp</code>
                    </td>
                    <td className="px-2 py-2">1</td>
                    <td className="px-2 py-2">Показувати час відтворення</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>closed_caption</code>
                    </td>
                    <td className="px-2 py-2">1</td>
                    <td className="px-2 py-2">Показувати кнопку субтитрів</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-2 py-2">
                      <code>native_context_menu</code>
                    </td>
                    <td className="px-2 py-2">1</td>
                    <td className="px-2 py-2">Показувати контекстне меню (ПКМ)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-800 dark:bg-green-900/20">
                <h4 className="mb-3 font-semibold text-green-700 dark:text-green-400">Переваги</h4>
                <ul className="list-disc space-y-1.5 pl-4 text-sm">
                  <li>10 підтверджених параметрів кастомізації</li>
                  <li>Явне задання розмірів (width/height)</li>
                  <li>Можна приховати: опис, музику, рекомендації та інше</li>
                  <li>Autoplay з muted=1 працює у більшості браузерів</li>
                  <li>Циклічне відтворення (loop)</li>
                </ul>
              </div>
              <div className="flex-1 rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800 dark:bg-red-900/20">
                <h4 className="mb-3 font-semibold text-red-700 dark:text-red-400">Недоліки</h4>
                <ul className="list-disc space-y-1.5 pl-4 text-sm">
                  <li>Все ще показує брендинг TikTok та інфо автора</li>
                  <li>Лайки, коментарі, поділитися — завжди видимі</li>
                  <li>Менш документований ніж oEmbed</li>
                  <li>Та сама поведінка редиректу</li>
                </ul>
              </div>
            </div>
          </>
        )}

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">Що НЕ МОЖНА кастомізувати</h2>
        <p className="text-muted-foreground mb-4">
          На основі офіційної документації та тестування:
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="mb-3 font-semibold text-red-700 dark:text-red-400">
              Брендинг та атрибуція
            </h3>
            <ul className="list-disc space-y-1.5 pl-4 text-sm">
              <li>Логотип TikTok у шапці embed</li>
              <li>Кнопка &quot;Дивитися більше на TikTok&quot;</li>
              <li>Ім&apos;я користувача та аватар автора</li>
              <li>Кнопка &quot;Переглянути профіль&quot;</li>
            </ul>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="mb-3 font-semibold text-red-700 dark:text-red-400">
              Інтерактивні елементи
            </h3>
            <ul className="list-disc space-y-1.5 pl-4 text-sm">
              <li>Кнопки лайк/коментар/поділитися (завжди видимі)</li>
              <li>Поведінка click-to-play</li>
              <li>Редирект при натисканні на будь-який елемент</li>
            </ul>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <h3 className="mb-3 font-semibold text-red-700 dark:text-red-400">Стилізація</h3>
            <ul className="list-disc space-y-1.5 pl-4 text-sm">
              <li>Внутрішній CSS iframe (обмеження CORS)</li>
              <li>Колірна схема (слідує бренду TikTok)</li>
              <li>Шрифти</li>
            </ul>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50/50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <h3 className="mb-3 font-semibold text-yellow-700 dark:text-yellow-400">
              Поведінка (частково)
            </h3>
            <ul className="list-disc space-y-1.5 pl-4 text-sm">
              <li>
                Autoplay — <strong>працює</strong> в iframe з <code>muted=1</code>
              </li>
              <li>
                Loop — <strong>працює</strong> з <code>loop=1</code>
              </li>
              <li>Гучність за замовчуванням — не контролюється</li>
            </ul>
          </div>
        </div>

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">Обмеження CORS та безпеки</h2>
        <p className="mb-4">
          TikTok embed iframe є <strong>cross-origin</strong>, що означає:
        </p>

        <div className="bg-muted -mx-4 mb-4 overflow-x-auto rounded-lg p-4 font-mono text-xs sm:mx-0 sm:text-sm">
          <p>Parent (your-site.com) → Child (tiktok.com/embed)</p>
          <p className="ml-4 sm:ml-8">↓</p>
          <p className="ml-4 sm:ml-8">Політика CORS блокує:</p>
          <p className="ml-8 sm:ml-12">- CSS-доступ до вмісту iframe</p>
          <p className="ml-8 sm:ml-12">- JavaScript DOM-маніпуляції</p>
          <p className="ml-8 sm:ml-12">- Перехоплення подій</p>
          <p className="ml-8 sm:ml-12">- Перевизначення стилів</p>
        </div>

        <p className="mb-4">Це функція безпеки браузера, яку неможливо обійти.</p>
        <p>
          Довідка:{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MDN Same-Origin Policy
          </a>
        </p>

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">Посилання</h2>
        <ol className="mb-8 list-decimal pl-6">
          <li className="mb-2">
            <a
              href="https://developers.tiktok.com/doc/embed-videos/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Документація TikTok oEmbed
            </a>
          </li>
          <li className="mb-2">
            <a
              href="https://www.tiktok.com/embed/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Генератор TikTok Embed
            </a>
          </li>
          <li className="mb-2">
            <a
              href="https://developers.tiktok.com/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Портал розробників TikTok
            </a>
          </li>
          <li className="mb-2">
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              MDN: Same-Origin Policy
            </a>
          </li>
          <li className="mb-2">
            <a
              href="https://www.tiktok.com/legal/terms-of-use/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Умови використання TikTok
            </a>
          </li>
        </ol>

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">Результати тестування</h2>
        <p className="text-muted-foreground mb-4">
          Протестовані конфігурації доступні на інтерактивних сторінках:
        </p>
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to="/?tab=iframe"
            className="rounded-lg border p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
          >
            <h4 className="font-semibold">Пісочниця (Iframe)</h4>
            <p className="text-muted-foreground text-sm">
              Інтерактивне тестування параметрів одного відео
            </p>
          </Link>
          <Link
            to="/?tab=oembed"
            className="rounded-lg border p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
          >
            <h4 className="font-semibold">Пісочниця (oEmbed)</h4>
            <p className="text-muted-foreground text-sm">Стандартний TikTok embed з blockquote</p>
          </Link>
          <Link
            to="/grid"
            className="rounded-lg border p-4 transition-colors hover:border-blue-400 hover:bg-blue-50/50 sm:col-span-2 dark:hover:bg-blue-900/20"
          >
            <h4 className="font-semibold">Сітка (Iframe)</h4>
            <p className="text-muted-foreground text-sm">
              Кілька відео одночасно з глобальними та per-video налаштуваннями
            </p>
          </Link>
        </div>

        <h3 className="mb-3 text-lg font-semibold">Тестові відео</h3>
        <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { id: '7620887262770760982', author: '@_.thys._' },
            { id: '7543789467740458271', author: '@queefquack123' },
            { id: '7541605713617882399', author: '@marykatenoashley' },
            { id: '7573311210620259615', author: '@dudevaeh' },
            { id: '7581608398815284498', author: '@samhooper_' },
            { id: '7579295333071473927', author: '@camimiminini' },
            { id: '7573904830461234487', author: '@71cent' },
            { id: '7583832764869397782', author: '@spaghetillie' },
          ].map(v => (
            <a
              key={v.id}
              href={`https://www.tiktok.com/player/v1/${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted hover:bg-muted/70 truncate rounded-lg px-3 py-2 text-xs transition-colors"
            >
              <span className="block truncate font-mono">{v.id}</span>
              <span className="text-muted-foreground block truncate">{v.author}</span>
            </a>
          ))}
        </div>

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">Підсумок</h2>
        <div className="-mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[400px] border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2 text-left">Вимога</th>
                <th className="px-2 py-2 text-left">Статус</th>
                <th className="px-2 py-2 text-left">Примітка</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-2 py-2">Кастомні розміри</td>
                <td className="px-2 py-2 text-green-600">Так</td>
                <td className="px-2 py-2">CSS-обгортка або iframe width/height</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Приховати елементи UI</td>
                <td className="px-2 py-2 text-green-600">Iframe: 10 параметрів</td>
                <td className="px-2 py-2">Опис, музика, рекомендації, controls, timestamp</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Прибрати брендинг TikTok</td>
                <td className="px-2 py-2 text-red-600">Ні</td>
                <td className="px-2 py-2">Логотип та &quot;Watch now&quot; завжди видимі</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Прибрати інфо автора</td>
                <td className="px-2 py-2 text-red-600">Ні</td>
                <td className="px-2 py-2">Немає параметра в API</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Вимкнути редиректи</td>
                <td className="px-2 py-2 text-red-600">Ні</td>
                <td className="px-2 py-2">Обмеження CORS — неможливо перехопити</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Кастомна стилізація</td>
                <td className="px-2 py-2 text-yellow-600">Тільки обгортка</td>
                <td className="px-2 py-2">Внутрішні стилі iframe недоступні (CORS)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <p>
            TikTok embed створений для залучення трафіку на TikTok. Повна кастомізація UI обмежена,
            але <strong>Direct Iframe Player (/player/v1/)</strong> дає 10 підтверджених параметрів
            для налаштування відображення. Рекомендований підхід для Zeely — використовувати{' '}
            <Link to="/?tab=iframe" className="text-blue-600 underline dark:text-blue-400">
              iframe player
            </Link>{' '}
            з оптимальним набором параметрів (rel=0, description=0) для чистого вигляду превью.
          </p>
        </div>
      </article>
    </div>
  );
}
