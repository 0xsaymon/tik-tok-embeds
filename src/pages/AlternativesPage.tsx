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
    name: 'Video Download + Self-Host',
    status: 'not-recommended',
    description: 'Download TikTok video and host on own CDN with custom player',
    pros: [
      'Full UI control',
      'Custom player (Video.js, Plyr)',
      'No TikTok branding',
      'Complete analytics tracking',
    ],
    cons: [
      'Violates TikTok Terms of Service',
      'Copyright issues',
      'No engagement metrics from TikTok',
      'Storage and bandwidth costs',
    ],
    verdict: '❌ Not recommended for production due to legal risks',
  },
  {
    name: 'Thumbnail + Custom Overlay',
    status: 'partial',
    description: 'Use TikTok oEmbed thumbnail URL + custom play button overlay',
    pros: [
      'Clean UI until interaction',
      'Custom overlay design matches Zeely branding',
      'Click opens embed in modal/lightbox',
      'Better visual integration',
    ],
    cons: [
      'Requires second click to play',
      'No native TikTok player initially',
      'Thumbnail may be delayed/outdated',
      'Extra implementation complexity',
    ],
    verdict: '⚠️ Partial solution - good for preview, embed on interaction',
  },
  {
    name: 'TikTok Web SDK (Enterprise)',
    status: 'recommended',
    description: 'TikTok for Developers offers advanced APIs for verified partners',
    pros: [
      'Potential customization access',
      'Analytics integration',
      'Verified business accounts',
      'Official support channel',
    ],
    cons: [
      'Requires partnership application',
      'Likely paid service',
      'Not publicly documented',
      'Approval process unknown',
    ],
    verdict: '⏳ Requires business inquiry - most promising long-term',
  },
  {
    name: 'Iframe Sandboxing + Overlay',
    status: 'not-recommended',
    description: 'Wrap embed in positioned container with custom overlay to hide elements',
    pros: [
      'Can visually hide specific elements',
      'CSS positioning tricks possible',
      'Maintains TikTok player functionality',
    ],
    cons: [
      'Fragile - breaks if TikTok changes layout',
      'May violate TikTok ToS',
      'Poor accessibility',
      'Maintenance nightmare',
    ],
    verdict: '❌ Technical workaround - avoid in production',
  },
  {
    name: 'Standard oEmbed (Current)',
    status: 'recommended',
    description: 'Use official TikTok oEmbed with minimal wrapper styling',
    pros: [
      'Official, stable solution',
      'Least legal risk',
      'Zero maintenance overhead',
      'Always up-to-date player',
      'Acceptable for "preview" use case',
    ],
    cons: [
      'No customization of internal elements',
      'TikTok branding always visible',
      'Redirects to TikTok on click',
      'Limited to TikTok design',
    ],
    verdict: '✅ Recommended for MVP - embrace as "preview" feature',
  },
];

function StatusBadge({ status }: { status: Alternative['status'] }) {
  const variants = {
    recommended: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    'not-recommended': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    partial: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  };

  const labels = {
    recommended: 'Recommended',
    'not-recommended': 'Not Recommended',
    partial: 'Partial Solution',
  };

  return <Badge className={variants[status]}>{labels[status]}</Badge>;
}

export default function AlternativesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Typography variant="h1" className="mb-2 text-3xl font-bold">
        TikTok Embed Alternatives
      </Typography>
      <Typography variant="p" className="text-muted-foreground mb-8">
        Comparison of different approaches to embed TikTok content with evaluation of customization
        capabilities.
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
                    Pros
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
                    Cons
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
              <div className="mt-6 border-t pt-4">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  Verdict:
                </div>
                <Typography variant="p" className="text-muted-foreground mt-1">
                  {alt.verdict}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-green-200 bg-green-50/50 sm:col-span-2 lg:col-span-3 dark:bg-green-900/20">
          <CardHeader>
            <CardTitle>Recommended Approach for Zeely</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <h4 className="font-semibold">Phase 1 (MVP)</h4>
                <p className="text-muted-foreground">
                  Use standard TikTok oEmbed with minimal wrapper. Embrace it as a "preview" feature
                  that drives traffic to TikTok. Set user expectations with clear UI copy.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Phase 2 (Enhanced)</h4>
                <p className="text-muted-foreground">
                  Implement thumbnail-first approach: fetch oEmbed data server-side, show custom
                  card with Zeely branding, lazy-load embed only on user interaction.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Phase 3 (Enterprise)</h4>
                <p className="text-muted-foreground">
                  Apply for TikTok for Developers partnership to access advanced APIs with potential
                  customization options.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
