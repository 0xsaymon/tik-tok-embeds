import { useState } from 'react';

export default function ResearchPage() {
  const [methodTab, setMethodTab] = useState<'iframe' | 'oembed'>('iframe');

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
        <div className="mb-6 flex border-b">
          <button
            onClick={() => setMethodTab('iframe')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              methodTab === 'iframe'
                ? 'border-primary text-foreground border-b-2'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Прямий Iframe (рекомендований)
          </button>
          <button
            onClick={() => setMethodTab('oembed')}
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
                <ul className="space-y-1.5 text-sm">
                  <li>Офіційний метод TikTok</li>
                  <li>Адаптивний дизайн</li>
                  <li>Автоматична мініатюра</li>
                  <li>Завжди актуальний плеєр</li>
                </ul>
              </div>
              <div className="flex-1 rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800 dark:bg-red-900/20">
                <h4 className="mb-3 font-semibold text-red-700 dark:text-red-400">Недоліки</h4>
                <ul className="space-y-1.5 text-sm">
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
            <h3 className="mb-3 text-xl font-semibold">Прямий Iframe Player</h3>
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
                <ul className="space-y-1.5 text-sm">
                  <li>10 підтверджених параметрів кастомізації</li>
                  <li>Явне задання розмірів (width/height)</li>
                  <li>Можна приховати: опис, музику, рекомендації та інше</li>
                  <li>Autoplay з muted=1 працює у більшості браузерів</li>
                  <li>Циклічне відтворення (loop)</li>
                </ul>
              </div>
              <div className="flex-1 rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800 dark:bg-red-900/20">
                <h4 className="mb-3 font-semibold text-red-700 dark:text-red-400">Недоліки</h4>
                <ul className="space-y-1.5 text-sm">
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

        <h3 className="mb-2 text-lg font-semibold text-red-600">Брендинг та атрибуція</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>Логотип TikTok у шапці embed</li>
          <li>Кнопка &quot;Дивитися більше на TikTok&quot;</li>
          <li>Ім&apos;я користувача та аватар автора</li>
          <li>Кнопка &quot;Переглянути профіль&quot;</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold text-red-600">Інтерактивні елементи</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>Кнопки лайк/коментар/поділитися (завжди видимі)</li>
          <li>Поведінка click-to-play</li>
          <li>Редирект при натисканні на будь-який елемент</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold text-red-600">Стилізація</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>Внутрішній CSS iframe (обмеження CORS)</li>
          <li>Колірна схема (слідує бренду TikTok)</li>
          <li>Шрифти</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold text-yellow-600">
          Поведінка (частково через Iframe Player)
        </h3>
        <ul className="mb-6 list-disc pl-6">
          <li>
            Autoplay — <strong>працює</strong> в iframe з <code>muted=1</code> (політика браузерів)
          </li>
          <li>
            Loop — <strong>працює</strong> в iframe з параметром <code>loop=1</code>
          </li>
          <li>Гучність за замовчуванням — не контролюється</li>
        </ul>

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

        <h2 className="mb-4 text-2xl font-semibold">Рекомендації для Zeely</h2>

        <h3 className="mb-3 text-xl font-semibold">Для MVP (Фаза 1)</h3>
        <p className="mb-2 font-semibold">Використовувати Direct Iframe Player (/player/v1/)</p>
        <div className="bg-muted -mx-4 mb-4 rounded-lg p-4 sm:mx-0">
          <pre className="overflow-x-auto text-xs sm:text-sm">
            <code>{`<iframe
  src="https://www.tiktok.com/player/v1/{videoId}?controls=1&progress_bar=1&play_button=1&rel=0&music_info=0"
  width="325"
  height="700"
  allow="fullscreen"
/>`}</code>
          </pre>
        </div>
        <p className="mb-2">
          <strong>Обгрунтування:</strong>
        </p>
        <ul className="mb-6 list-disc pl-6">
          <li>10 підтверджених параметрів кастомізації</li>
          <li>Явне задання розмірів</li>
          <li>Можна приховати непотрібні елементи (рекомендації, опис, музику)</li>
          <li>Autoplay + loop для кращого UX</li>
        </ul>

        <h3 className="mb-3 text-xl font-semibold">Для покращеного UX (Фаза 2)</h3>
        <p className="mb-2 font-semibold">Мініатюра + lazy load iframe</p>
        <ol className="mb-4 list-decimal pl-6">
          <li>Отримати дані oEmbed API на сервері (включає мініатюру)</li>
          <li>Показати кастомну картку з мініатюрою, назвою, автором</li>
          <li>Завантажити iframe тільки при взаємодії (клік/скрол)</li>
          <li>Зменшити навантаження — без iframe до потреби</li>
        </ol>
        <p className="mb-2">
          <strong>Переваги:</strong>
        </p>
        <ul className="mb-6 list-disc pl-6">
          <li>Кастомний UI Zeely для сітки/списку</li>
          <li>Продуктивність (без iframe до потреби)</li>
          <li>Краща візуальна інтеграція</li>
        </ul>

        <h3 className="mb-3 text-xl font-semibold">Що повідомити користувачам</h3>
        <p className="mb-4">
          Оскільки повна кастомізація неможлива, потрібно оновити UI-копірайт для встановлення
          очікувань:
        </p>
        <blockquote className="border-muted my-4 border-l-4 pl-4 italic">
          &quot;Попередній перегляд від TikTok. Натисніть, щоб переглянути на TikTok.&quot;
        </blockquote>
        <p>
          Або використовувати embed як &quot;тізер&quot;, що спрямовує трафік на TikTok для повного
          перегляду.
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
        <p className="mb-4">
          Протестовані конфігурації доступні на:{' '}
          <a
            href="https://tik-tok-embeds.vercel.app/playground"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://tik-tok-embeds.vercel.app/playground
          </a>
        </p>

        <h3 className="mb-2 text-lg font-semibold">Тестове відео</h3>
        <ul className="mb-8 list-disc pl-6">
          <li>
            <strong>ID:</strong> 7598731566696729870
          </li>
          <li>
            <strong>Автор:</strong> @wilbur.maud
          </li>
          <li>
            <strong>Контент:</strong> Тестове відео для перевірки embed
          </li>
          <li>
            <strong>Статус:</strong> <span className="text-green-600">Embed працює коректно</span>
          </li>
        </ul>

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
          <p className="mb-2 font-semibold">Підсумок:</p>
          <p>
            TikTok embed створений для залучення трафіку на TikTok. Повна кастомізація UI обмежена,
            але <strong>Direct Iframe Player (/player/v1/)</strong> дає 10 підтверджених параметрів
            для налаштування відображення. Рекомендований підхід для Zeely — використовувати iframe
            player з оптимальним набором параметрів (rel=0, description=0) для чистого вигляду
            превью.
          </p>
        </div>
      </article>
    </div>
  );
}
