import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

import { Badge } from '@/shared/ui-kit/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui-kit/components/ui/card';
import { Typography } from '@/shared/ui-kit/components/ui/typography';

interface Alternative {
  name: string;
  status: 'recommended' | 'not-recommended' | 'partial';
  description: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

const alternatives: Alternative[] = [
  {
    name: 'Завантаження відео + Self-Host',
    status: 'not-recommended',
    description: 'Завантажити відео TikTok і хостити на власному CDN з кастомним плеєром',
    pros: [
      'Повний контроль UI',
      'Кастомний плеєр (Video.js, Plyr)',
      'Без брендингу TikTok',
      'Повне відстеження аналітики',
    ],
    cons: [
      'Порушує Умови використання TikTok',
      'Проблеми з авторським правом',
      'Немає метрик залученості від TikTok',
      'Витрати на зберігання та трафік',
    ],
    verdict: '❌ Не рекомендовано для продакшену через юридичні ризики',
  },
  {
    name: 'Мініатюра + кастомний Overlay',
    status: 'partial',
    description: 'Використати URL мініатюри TikTok oEmbed + кастомна кнопка відтворення поверх',
    pros: [
      'Чистий UI до взаємодії',
      'Кастомний overlay відповідає брендингу Zeely',
      'Клік відкриває embed у модалці/lightbox',
      'Краща візуальна інтеграція',
    ],
    cons: [
      'Потрібен другий клік для відтворення',
      'Немає нативного плеєра TikTok спочатку',
      'Мініатюра може бути застарілою',
      'Додаткова складність реалізації',
    ],
    verdict: '⚠️ Часткове рішення — добре для превью, embed при взаємодії',
  },
  {
    name: 'TikTok Web SDK (Enterprise)',
    status: 'recommended',
    description: 'TikTok for Developers пропонує розширені API для верифікованих партнерів',
    pros: [
      'Потенційний доступ до кастомізації',
      'Інтеграція аналітики',
      'Верифіковані бізнес-акаунти',
      'Офіційний канал підтримки',
    ],
    cons: [
      'Потрібна заявка на партнерство',
      'Ймовірно платний сервіс',
      'Не задокументовано публічно',
      'Процес схвалення невідомий',
    ],
    verdict: '⏳ Потрібен бізнес-запит — найперспективніший довгостроково',
  },
  {
    name: 'Iframe Sandboxing + Overlay',
    status: 'not-recommended',
    description: 'Обгорнути embed у позиціонований контейнер з overlay для приховування елементів',
    pros: [
      'Можна візуально приховати окремі елементи',
      'Можливі CSS-трюки з позиціонуванням',
      'Зберігає функціональність плеєра TikTok',
    ],
    cons: [
      'Крихкий — ламається при зміні верстки TikTok',
      'Може порушувати ToS TikTok',
      'Погана доступність',
      'Кошмар підтримки',
    ],
    verdict: '❌ Технічний обхідний шлях — уникати в продакшені',
  },
  {
    name: 'Стандартний oEmbed (Поточний)',
    status: 'recommended',
    description: 'Використовувати офіційний TikTok oEmbed з мінімальною стилізацією обгортки',
    pros: [
      'Офіційне, стабільне рішення',
      'Мінімальний юридичний ризик',
      'Нульові витрати на підтримку',
      'Завжди актуальний плеєр',
      'Прийнятно для кейсу "попередній перегляд"',
    ],
    cons: [
      'Немає кастомізації внутрішніх елементів',
      'Брендинг TikTok завжди видимий',
      'Редирект на TikTok при кліку',
      'Обмежено дизайном TikTok',
    ],
    verdict: '✅ Рекомендовано для MVP — прийняти як функцію "попереднього перегляду"',
  },
];

function StatusBadge({ status }: { status: Alternative['status'] }) {
  const variants = {
    recommended: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    'not-recommended': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    partial: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  };

  const labels = {
    recommended: 'Рекомендовано',
    'not-recommended': 'Не рекомендовано',
    partial: 'Часткове рішення',
  };

  return <Badge className={variants[status]}>{labels[status]}</Badge>;
}

export default function AlternativesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Typography variant="h1" className="mb-2 text-3xl font-bold">
        Альтернативи TikTok Embed
      </Typography>
      <Typography variant="p" className="text-muted-foreground mb-8">
        Порівняння різних підходів до вбудовування контенту TikTok з оцінкою можливостей
        кастомізації.
      </Typography>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {alternatives.map(alt => (
          <Card key={alt.name}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-2">{alt.name}</CardTitle>
                  <StatusBadge status={alt.status} />
                </div>
              </div>
              <Typography variant="p" className="text-muted-foreground mt-2">
                {alt.description}
              </Typography>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:gap-6 xl:grid-cols-2">
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Переваги
                  </h4>
                  <ul className="space-y-2">
                    {alt.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-red-600">
                    <XCircle className="h-4 w-4" />
                    Недоліки
                  </h4>
                  <ul className="space-y-2">
                    {alt.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500">−</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <div className="mt-auto border-t px-6 pt-4">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                Висновок:
              </div>
              <Typography variant="p" className="text-muted-foreground mt-1">
                {alt.verdict}
              </Typography>
            </div>
          </Card>
        ))}

        <Card className="border-green-200 bg-green-50/50 sm:col-span-2 lg:col-span-3 dark:bg-green-900/20">
          <CardHeader>
            <CardTitle>Рекомендований підхід для Zeely</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <h4 className="font-semibold">Фаза 1 (MVP)</h4>
                <p className="text-muted-foreground">
                  Використовувати стандартний TikTok oEmbed з мінімальною обгорткою. Прийняти як
                  функцію &quot;попереднього перегляду&quot;, що спрямовує трафік на TikTok.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Фаза 2 (Покращення)</h4>
                <p className="text-muted-foreground">
                  Реалізувати підхід з мініатюрою: отримати дані oEmbed на сервері, показати
                  кастомну картку з брендингом Zeely, завантажувати embed тільки при взаємодії.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Фаза 3 (Enterprise)</h4>
                <p className="text-muted-foreground">
                  Подати заявку на партнерство TikTok for Developers для доступу до розширених API з
                  можливостями кастомізації.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
