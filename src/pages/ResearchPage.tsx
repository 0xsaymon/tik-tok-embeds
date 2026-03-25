export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1 className="mb-6 text-3xl font-bold">TikTok Embed Research Findings</h1>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Overview</h2>
          <p className="text-muted-foreground mb-4">
            This document summarizes the investigation into TikTok embed customization capabilities
            conducted for <strong>ZP-4177</strong> (Viral Tab v1).
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Research Date:</strong> March 25, 2025
            </p>
            <p>
              <strong>Live Playground:</strong>{' '}
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

        <h2 className="mb-6 text-2xl font-semibold">Requirements</h2>

        <h3 className="mb-3 text-xl font-semibold">Original Questions</h3>
        <p className="text-muted-foreground mb-2">
          From the Slack message in #viral_content_product_team (March 25, 2025):
        </p>
        <blockquote className="border-muted my-4 border-l-4 pl-4 italic">
          &quot;We plan to display examples of original viral videos from TikTok in our product via
          iFrame embed, so we need to understand the capabilities / limitations of this tool. The
          main task is to understand how much we can adapt this view to our needs and UI.&quot;
        </blockquote>

        <h3 className="mt-8 mb-4 text-xl font-semibold">Specific Requirements from Jira ZP-4177</h3>

        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2 text-left">#</th>
                <th className="px-2 py-2 text-left">Question</th>
                <th className="px-2 py-2 text-left">Finding</th>
                <th className="px-2 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-2 py-3">1</td>
                <td className="px-2 py-3 font-semibold">
                  Can we control height, width, aspect ratio?
                </td>
                <td className="px-2 py-3">
                  Yes — via CSS wrapper and min-width/max-width constraints. Iframe supports
                  explicit width/height attributes.
                </td>
                <td className="px-2 py-3 text-green-600">Supported</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-3">2</td>
                <td className="px-2 py-3 font-semibold">
                  Can we remove author info and TikTok logo?
                </td>
                <td className="px-2 py-3">
                  <strong>No</strong> — Author info, TikTok logo, and branding are non-removable per
                  TikTok&apos;s Terms of Service.
                </td>
                <td className="px-2 py-3 text-red-600">Not Possible</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-3">3</td>
                <td className="px-2 py-3 font-semibold">
                  Can we remove performance metrics (likes, comments)?
                </td>
                <td className="px-2 py-3">
                  <strong>Partially</strong> — Only via iframe query params (music_info,
                  description), but engagement metrics always visible in standard embed.
                </td>
                <td className="px-2 py-3 text-yellow-600">Limited</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-3">4</td>
                <td className="px-2 py-3 font-semibold">
                  Can we disable redirect to TikTok on click?
                </td>
                <td className="px-2 py-3">
                  <strong>No</strong> — All elements (video, author, metrics, &quot;Watch now&quot;
                  button) link to TikTok. Cannot be intercepted due to CORS.
                </td>
                <td className="px-2 py-3 text-red-600">Not Possible</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="my-8" />

        <h2 className="mb-6 text-2xl font-semibold">Technical Implementation Details</h2>

        <h3 className="mb-3 text-xl font-semibold">Method 1: oEmbed API (Recommended)</h3>
        <p className="mb-2">
          <strong>Endpoint:</strong>{' '}
          <code className="bg-muted rounded px-2 py-1">
            https://www.tiktok.com/oembed?url=video_url
          </code>
        </p>

        <p className="mb-2">Response includes:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>HTML blockquote with data-video-id</li>
          <li>Thumbnail URL</li>
          <li>Author metadata</li>
          <li>Standard embed script</li>
        </ul>

        <div className="bg-muted mb-4 rounded-lg p-4">
          <pre className="overflow-x-auto text-sm">
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

        <h4 className="mb-2 font-semibold">Pros:</h4>
        <ul className="mb-4 list-disc pl-6">
          <li>Official TikTok method</li>
          <li>Responsive design</li>
          <li>Auto-generated thumbnail</li>
          <li>Always up-to-date player</li>
        </ul>

        <h4 className="mb-2 font-semibold">Cons:</h4>
        <ul className="mb-6 list-disc pl-6">
          <li>Limited customization</li>
          <li>TikTok branding unavoidable</li>
          <li>Redirects to TikTok on interaction</li>
        </ul>

        <h3 className="mb-3 text-xl font-semibold">Method 2: Direct Iframe</h3>
        <p className="mb-2">
          <strong>URL Format:</strong>{' '}
          <code className="bg-muted rounded px-2 py-1">
            https://www.tiktok.com/player/v1/video_id?params
          </code>
        </p>

        <h4 className="mb-2 font-semibold">Available Query Parameters:</h4>
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2 text-left">Parameter</th>
                <th className="px-2 py-2 text-left">Type</th>
                <th className="px-2 py-2 text-left">Default</th>
                <th className="px-2 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-2 py-2">
                  <code>music_info</code>
                </td>
                <td className="px-2 py-2">boolean</td>
                <td className="px-2 py-2">1</td>
                <td className="px-2 py-2">Show music information</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">
                  <code>description</code>
                </td>
                <td className="px-2 py-2">boolean</td>
                <td className="px-2 py-2">1</td>
                <td className="px-2 py-2">Show video description</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">
                  <code>controls</code>
                </td>
                <td className="px-2 py-2">boolean</td>
                <td className="px-2 py-2">1</td>
                <td className="px-2 py-2">Show volume controls</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="mb-2 font-semibold">Pros:</h4>
        <ul className="mb-4 list-disc pl-6">
          <li>More control over container</li>
          <li>Explicit sizing</li>
          <li>Some UI element toggles</li>
        </ul>

        <h4 className="mb-2 font-semibold">Cons:</h4>
        <ul className="mb-6 list-disc pl-6">
          <li>Still shows TikTok branding</li>
          <li>No way to hide engagement metrics</li>
          <li>Same redirect behavior</li>
        </ul>

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">What CANNOT Be Customized</h2>
        <p className="text-muted-foreground mb-4">Based on official documentation and testing:</p>

        <h3 className="mb-2 text-lg font-semibold text-red-600">Branding & Attribution</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>TikTok logo in embed header</li>
          <li>&quot;Watch more on TikTok&quot; button</li>
          <li>Author username and avatar</li>
          <li>&quot;View profile&quot; button</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold text-red-600">Interactive Elements</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>Like/comment/share buttons (always visible)</li>
          <li>Click-to-play behavior</li>
          <li>Redirect on any element click</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold text-red-600">Styling</h3>
        <ul className="mb-4 list-disc pl-6">
          <li>Internal iframe CSS (CORS restricted)</li>
          <li>Color scheme (follows TikTok brand)</li>
          <li>Font family</li>
        </ul>

        <h3 className="mb-2 text-lg font-semibold text-red-600">Behavior</h3>
        <ul className="mb-6 list-disc pl-6">
          <li>Autoplay (blocked by browser policies)</li>
          <li>Loop settings</li>
          <li>Default volume</li>
        </ul>

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">CORS & Security Limitations</h2>
        <p className="mb-4">
          The TikTok embed iframe is <strong>cross-origin</strong>, which means:
        </p>

        <div className="bg-muted mb-4 rounded-lg p-4 font-mono text-sm">
          <p>Parent (your-site.com) → Child (tiktok.com/embed)</p>
          <p className="ml-8">↓</p>
          <p className="ml-8">CORS Policy Blocks:</p>
          <p className="ml-12">- CSS access to iframe content</p>
          <p className="ml-12">- JavaScript DOM manipulation</p>
          <p className="ml-12">- Event interception</p>
          <p className="ml-12">- Style overrides</p>
        </div>

        <p className="mb-4">This is a browser security feature that cannot be bypassed.</p>
        <p>
          Reference:{' '}
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

        <h2 className="mb-4 text-2xl font-semibold">Recommendations for Zeely</h2>

        <h3 className="mb-3 text-xl font-semibold">For MVP (Phase 1)</h3>
        <p className="mb-2 font-semibold">Use Standard oEmbed with Minimal Wrapper</p>
        <div className="bg-muted mb-4 rounded-lg p-4">
          <pre className="text-sm">
            <code>{`<div className="tiktok-embed-wrapper">
  <blockquote 
    className="tiktok-embed" 
    data-video-id={videoId} 
    style={{ maxWidth: '400px' }}
  >
    <section />
  </blockquote>
</div>`}</code>
          </pre>
        </div>
        <p className="mb-2">
          <strong>Rationale:</strong>
        </p>
        <ul className="mb-6 list-disc pl-6">
          <li>Official, stable solution</li>
          <li>Least legal risk</li>
          <li>Zero maintenance</li>
          <li>Acceptable for &quot;preview&quot; use case</li>
        </ul>

        <h3 className="mb-3 text-xl font-semibold">For Enhanced UX (Phase 2)</h3>
        <p className="mb-2 font-semibold">Thumbnail-First with Lazy Load</p>
        <ol className="mb-4 list-decimal pl-6">
          <li>Fetch oEmbed data server-side (includes thumbnail)</li>
          <li>Show custom card with thumbnail, title, author</li>
          <li>Load actual embed only on user interaction</li>
          <li>Embed loads in modal or expanded view</li>
        </ol>
        <p className="mb-2">
          <strong>Benefits:</strong>
        </p>
        <ul className="mb-6 list-disc pl-6">
          <li>Custom Zeely UI for grid/list views</li>
          <li>Performance (no embed JS until needed)</li>
          <li>Better visual integration</li>
        </ul>

        <h3 className="mb-3 text-xl font-semibold">What to Communicate to Users</h3>
        <p className="mb-4">Since we cannot fully customize, update UI copy to set expectations:</p>
        <blockquote className="border-muted my-4 border-l-4 pl-4 italic">
          &quot;Preview powered by TikTok. Click to watch on TikTok.&quot;
        </blockquote>
        <p>
          Or use the embed as a &quot;teaser&quot; that drives traffic to TikTok for full
          experience.
        </p>

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">References</h2>
        <ol className="mb-8 list-decimal pl-6">
          <li className="mb-2">
            <a
              href="https://developers.tiktok.com/doc/embed-videos/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok oEmbed Documentation
            </a>
          </li>
          <li className="mb-2">
            <a
              href="https://www.tiktok.com/embed/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok Embed Generator
            </a>
          </li>
          <li className="mb-2">
            <a
              href="https://developers.tiktok.com/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok Developer Portal
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
              TikTok Terms of Service
            </a>
          </li>
        </ol>

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">Live Test Results</h2>
        <p className="mb-4">
          Tested configurations available at:{' '}
          <a
            href="https://tik-tok-embeds.vercel.app/playground"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://tik-tok-embeds.vercel.app/playground
          </a>
        </p>

        <h3 className="mb-2 text-lg font-semibold">Tested Video</h3>
        <ul className="mb-8 list-disc pl-6">
          <li>
            <strong>ID:</strong> 7613863332826729761
          </li>
          <li>
            <strong>Author:</strong> @matildefaria__
          </li>
          <li>
            <strong>Content:</strong> Samsung S26 Ultra privacy filter demo
          </li>
          <li>
            <strong>Status:</strong> <span className="text-green-600">Embed working correctly</span>
          </li>
        </ul>

        <hr className="my-8" />

        <h2 className="mb-4 text-2xl font-semibold">Summary for Stakeholders</h2>
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2 text-left">Requirement</th>
                <th className="px-2 py-2 text-left">Can Do</th>
                <th className="px-2 py-2 text-left">Cannot Do</th>
                <th className="px-2 py-2 text-left">Workaround</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-2 py-2">Custom dimensions</td>
                <td className="px-2 py-2 text-green-600">Yes</td>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2">CSS wrapper</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Remove TikTok branding</td>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2 text-red-600">No</td>
                <td className="px-2 py-2">Thumbnail preview</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Remove author info</td>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2 text-red-600">No</td>
                <td className="px-2 py-2">Overlay hack (fragile)</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Remove metrics</td>
                <td className="px-2 py-2 text-yellow-600">Partial</td>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2">Iframe params (limited)</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Disable redirects</td>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2 text-red-600">No</td>
                <td className="px-2 py-2">None (CORS restriction)</td>
              </tr>
              <tr className="border-b">
                <td className="px-2 py-2">Custom styling</td>
                <td className="px-2 py-2 text-yellow-600">Wrapper only</td>
                <td className="px-2 py-2 text-red-600">Internal</td>
                <td className="px-2 py-2">CSS container</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <p className="mb-2 font-semibold">Bottom Line:</p>
          <p>
            TikTok embed is designed to drive traffic to TikTok. Full UI customization is
            intentionally restricted. The best approach for Zeely is to embrace the embed as a
            &quot;preview&quot; and focus on the surrounding UI/UX rather than trying to customize
            the embed itself.
          </p>
        </div>
      </article>
    </div>
  );
}
