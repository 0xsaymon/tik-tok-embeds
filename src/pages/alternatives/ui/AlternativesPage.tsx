import { AlertCircle, CheckCircle2, ExternalLink, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  links?: { to: string; label: string }[];
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
    name: 'Стандартний oEmbed',
    status: 'partial',
    description:
      'Офіційний TikTok oEmbed (blockquote + embed.js) — нуль кастомізації внутрішніх елементів',
    pros: [
      'Офіційний, найстабільніший метод',
      'Мінімальний юридичний ризик',
      'Нульові витрати на підтримку',
      'Завжди актуальний плеєр',
    ],
    cons: [
      'Нуль кастомізації — лише max-width контейнера',
      'Висота визначається TikTok автоматично',
      'Усі елементи UI завжди видимі',
      'Редирект на TikTok при кліку',
    ],
    verdict: '⚠️ Для простого превью, але iframe player дає більше контролю',
    links: [{ to: '/?tab=oembed', label: 'Відкрити в Пісочниці' }],
  },
  {
    name: 'Direct Iframe Player (/player/v1/)',
    status: 'recommended',
    description:
      'Використати TikTok iframe player з 10 підтвердженими query-параметрами для кастомізації',
    pros: [
      '10 підтверджених параметрів (controls, description, music_info, rel, timestamp, closed_caption та ін.)',
      'Явне задання width/height',
      'Autoplay з muted, циклічне відтворення (loop)',
      'Можна приховати рекомендовані відео (rel=0)',
      'Найбільша гнучкість серед легітимних методів',
    ],
    cons: [
      'Менш документований ніж oEmbed',
      'Все ще показує брендинг TikTok та інфо автора',
      'Редирект на TikTok при кліку',
      'Потенційно менш стабільний API',
    ],
    verdict: '✅ Рекомендовано — найкращий баланс кастомізації та стабільності',
    links: [
      { to: '/?tab=iframe', label: 'Пісочниця' },
      { to: '/grid', label: 'Сітка' },
    ],
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Typography variant="h1" className="mb-2 text-3xl font-bold">
        Альтернативи TikTok Embed
      </Typography>
      <Typography variant="p" className="text-muted-foreground mb-8">
        Порівняння різних підходів до вбудовування контенту TikTok з оцінкою можливостей
        кастомізації.
      </Typography>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {alternatives.map(alt => (
          <Card
            key={alt.name}
            className={
              alt.status === 'not-recommended'
                ? 'border-red-200 bg-red-50/30 dark:border-red-800/50 dark:bg-red-950/20'
                : alt.status === 'partial'
                  ? 'border-yellow-200 bg-yellow-50/30 dark:border-yellow-800/50 dark:bg-yellow-950/20'
                  : 'border-green-200 bg-green-50/30 dark:border-green-800/50 dark:bg-green-950/20'
            }
          >
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  Висновок:
                </div>
                {alt.links && (
                  <div className="flex items-center gap-3">
                    {alt.links.map(link => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Typography variant="p" className="text-muted-foreground mt-1">
                {alt.verdict}
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
