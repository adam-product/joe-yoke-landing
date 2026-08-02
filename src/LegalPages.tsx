import type { ReactNode } from 'react'
import { ArrowLeft, FileText, Moon, ShieldCheck, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoNavLight from '@/imports/logo-nav-light.png'
import logoNavDark from '@/imports/logo-nav-dark.png'
import { useTheme } from './ThemeContext'
import Seo from './Seo'
import StructuredData from './StructuredData'

const EFFECTIVE_DATE = 'August 3, 2026'

type Section = {
  id: string
  title: string
  content: ReactNode
}

function Paragraph({ children }: { children: ReactNode }) {
  return <p className="text-sm sm:text-base leading-7 text-current/70">{children}</p>
}

function BulletList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base leading-7 text-current/70 marker:text-[#9bcc00]">{children}</ul>
}

const privacySections: Section[] = [
  {
    id: 'scope',
    title: '1. Scope of this policy',
    content: (
      <Paragraph>
        This Privacy Policy explains how Joe Yoke handles information when you visit joeyoke.com, use the Joe Yoke mobile app, create or join multiplayer games, participate in social or community features, contact support, or otherwise use our services. Features that are not available in your country, app version, or account are covered only when you use them.
      </Paragraph>
    ),
  },
  {
    id: 'information',
    title: '2. Information we collect',
    content: (
      <div className="space-y-4">
        <Paragraph>Depending on the features you use, we may collect the following categories of information:</Paragraph>
        <BulletList>
          <li><strong className="text-current">Account and profile information:</strong> username, display name, email address, avatar, account identifiers, authentication records, age or date-of-birth confirmation, and profile preferences.</li>
          <li><strong className="text-current">Game and activity information:</strong> games played, scores, achievements, match history, rooms joined or hosted, player statistics, preferences, and interactions with other players.</li>
          <li><strong className="text-current">Social and community information:</strong> friend connections, group or room participation, messages or posts you choose to submit, reactions, reports, blocks, moderation history, and other user-generated content.</li>
          <li><strong className="text-current">Device and technical information:</strong> device type, operating system, app version, language, IP address, browser type, crash information, diagnostic logs, security events, and approximate location inferred from IP address.</li>
          <li><strong className="text-current">Website and app usage:</strong> pages viewed, buttons used, referral source, session activity, performance measurements, and anonymous or pseudonymous visitor identifiers used for analytics.</li>
          <li><strong className="text-current">Uploads and permissions:</strong> images or other files you voluntarily upload and information accessed through device permissions you choose to grant, such as notifications or photo-library access.</li>
          <li><strong className="text-current">Support communications:</strong> messages, attachments, and contact details you provide when asking for help, reporting a problem, or submitting feedback. Support queries may be processed by an automated assistant and reviewed by the Joe Yoke support team.</li>
        </BulletList>
      </div>
    ),
  },
  {
    id: 'use',
    title: '3. How we use information',
    content: (
      <BulletList>
        <li>Provide, personalize, maintain, and improve the website, games, accounts, and community features.</li>
        <li>Match players, host game rooms, preserve progress, display leaderboards, and deliver requested features.</li>
        <li>Authenticate users, protect accounts, prevent cheating, spam, fraud, abuse, and other security threats.</li>
        <li>Moderate community activity, investigate reports, enforce our Terms &amp; Conditions, and protect players.</li>
        <li>Respond to support requests and send important service, safety, or account communications.</li>
        <li>Generate automatic support answers, identify requests that need human review, and preserve conversation history so an administrator can reply.</li>
        <li>Measure traffic, reliability, and performance and understand how users interact with Joe Yoke.</li>
        <li>Comply with legal duties and establish, exercise, or defend legal claims.</li>
      </BulletList>
    ),
  },
  {
    id: 'bases',
    title: '4. Legal bases and consent',
    content: (
      <Paragraph>
        Where applicable law requires a legal basis, we process information as needed to provide the service you request, for our legitimate interests in operating and securing Joe Yoke, with your consent, or to comply with law. You may withdraw consent for optional processing through the relevant app or device setting, although this does not affect processing already completed.
      </Paragraph>
    ),
  },
  {
    id: 'sharing',
    title: '5. How information is shared',
    content: (
      <div className="space-y-4">
        <Paragraph>We may share information only as reasonably necessary with:</Paragraph>
        <BulletList>
          <li><strong className="text-current">Other users:</strong> information you make visible through your profile, game rooms, leaderboards, messages, or other social features.</li>
          <li><strong className="text-current">Service providers:</strong> vendors that provide hosting, databases, authentication, file storage, analytics, performance monitoring, communications, automated customer support, and security. Our current technology stack may include Supabase, Vercel, and OpenAI.</li>
          <li><strong className="text-current">App platforms:</strong> Apple, Google, or other distributors when needed to publish, operate, diagnose, or support the app.</li>
          <li><strong className="text-current">Legal and safety recipients:</strong> regulators, courts, law enforcement, advisers, or affected parties when disclosure is required by law or reasonably necessary to protect rights, safety, and service integrity.</li>
          <li><strong className="text-current">Business successors:</strong> a buyer, investor, or successor in connection with a proposed or completed merger, financing, reorganization, or transfer of the service, subject to appropriate safeguards.</li>
        </BulletList>
        <Paragraph>We do not authorize service providers to use personal information for purposes unrelated to providing their contracted services to Joe Yoke.</Paragraph>
      </div>
    ),
  },
  {
    id: 'public',
    title: '6. Public and social features',
    content: (
      <Paragraph>
        Multiplayer rooms, profiles, leaderboards, chats, and community areas may make information visible to other users. Do not post personal, confidential, or sensitive information that you do not want others to see. Other users may copy or reshare content that is visible to them. Use blocking and reporting tools where available and contact us if you experience abuse or a safety issue.
      </Paragraph>
    ),
  },
  {
    id: 'retention',
    title: '7. Retention and account deletion',
    content: (
      <div className="space-y-4">
        <Paragraph>
          We retain information only for as long as reasonably necessary to provide Joe Yoke, meet legal and accounting obligations, resolve disputes, prevent abuse, and enforce agreements. Retention periods vary according to the type of data, why it was collected, and applicable law.
        </Paragraph>
        <Paragraph>
          You may request deletion of your account and associated personal information using the deletion option in the app, where available, or through the privacy/support contact method published in the app, app-store listing, or on joeyoke.com. We may retain limited information where legally required, necessary for security and fraud prevention, or contained in backups until those backups expire. Content already shared with others may remain visible if another user has independently retained or reposted it.
        </Paragraph>
      </div>
    ),
  },
  {
    id: 'security',
    title: '8. Security',
    content: (
      <Paragraph>
        We use reasonable administrative, technical, and organizational safeguards designed to protect information. No online service can guarantee absolute security. Keep your login credentials confidential, use a strong unique password, and notify us promptly if you believe your account has been compromised.
      </Paragraph>
    ),
  },
  {
    id: 'international',
    title: '9. International data transfers',
    content: (
      <Paragraph>
        Joe Yoke and its service providers may process information in countries other than the one where you live. Where required, we use appropriate contractual or legal safeguards for international transfers and protect the information as described in this policy.
      </Paragraph>
    ),
  },
  {
    id: 'children',
    title: '10. Children’s privacy',
    content: (
      <Paragraph>
        Joe Yoke is not directed to children under 13, or the higher minimum age required in a user’s country, unless a specific service clearly states otherwise and provides the required protections. We do not knowingly collect personal information from a child below the applicable minimum age without verifiable parental consent. A parent or guardian who believes a child provided information improperly should contact us so we can investigate and delete it where required.
      </Paragraph>
    ),
  },
  {
    id: 'rights',
    title: '11. Your rights and choices',
    content: (
      <div className="space-y-4">
        <Paragraph>Depending on where you live, you may have the right to:</Paragraph>
        <BulletList>
          <li>Access, correct, or obtain a copy of personal information about you.</li>
          <li>Request deletion or restriction of certain processing.</li>
          <li>Object to processing or withdraw consent.</li>
          <li>Receive portable data where applicable.</li>
          <li>Appeal a decision or complain to your local data-protection authority.</li>
        </BulletList>
        <Paragraph>You can also manage notifications and other optional permissions through the app or your device settings. We may need to verify your identity before completing a privacy request.</Paragraph>
      </div>
    ),
  },
  {
    id: 'third-parties',
    title: '12. Third-party services and links',
    content: (
      <Paragraph>
        Joe Yoke may link to app stores, Discord, social networks, or other third-party services. Their privacy practices are governed by their own policies. Review those policies before providing information to them. Joe Yoke is not responsible for a third party’s independent practices.
      </Paragraph>
    ),
  },
  {
    id: 'updates',
    title: '13. Changes to this policy',
    content: (
      <Paragraph>
        We may update this policy as our services or legal obligations change. We will post the revised policy with a new effective date and provide additional notice when required. Continued use after an update takes effect means the updated policy applies to future use, subject to any consent requirements under applicable law.
      </Paragraph>
    ),
  },
  {
    id: 'contact',
    title: '14. Contact us',
    content: (
      <Paragraph>
        For privacy questions, rights requests, or complaints, use the official privacy or support contact method shown in the Joe Yoke app, the applicable app-store listing, or on joeyoke.com. Please include enough detail for us to identify your account and understand the request, but do not send passwords or unnecessary sensitive information.
      </Paragraph>
    ),
  },
]

const termsSections: Section[] = [
  {
    id: 'agreement',
    title: '1. Agreement to these terms',
    content: <Paragraph>These Terms &amp; Conditions govern your access to joeyoke.com, the Joe Yoke mobile app, multiplayer games, community features, and related services. By creating an account, downloading the app, or using the service, you agree to these terms and the Privacy Policy. If you do not agree, do not use Joe Yoke.</Paragraph>,
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    content: <Paragraph>You must meet the minimum digital-consent age required in your country. If you are under the age of legal majority, a parent or legal guardian must review and agree to these terms for you. You may not use Joe Yoke if applicable law prohibits you from doing so.</Paragraph>,
  },
  {
    id: 'accounts',
    title: '3. Accounts and security',
    content: (
      <BulletList>
        <li>Provide accurate information and keep it reasonably up to date.</li>
        <li>Protect your login credentials and do not sell, transfer, or share access to your account.</li>
        <li>You are responsible for activity performed through your account unless caused by our failure to use reasonable security.</li>
        <li>Notify us promptly of suspected unauthorized access. We may require verification before restoring access or processing sensitive requests.</li>
      </BulletList>
    ),
  },
  {
    id: 'service',
    title: '4. The Joe Yoke service',
    content: <Paragraph>Joe Yoke provides access to a collection of games and social features that may include public or private rooms, matchmaking, profiles, leaderboards, chat, events, and community tools. Feature availability may vary by platform, region, age, device, and app version. An internet connection and compatible device may be required, and carrier or data charges are your responsibility.</Paragraph>,
  },
  {
    id: 'conduct',
    title: '5. Community rules and prohibited conduct',
    content: (
      <div className="space-y-4">
        <Paragraph>You must treat other players fairly and respectfully. You may not:</Paragraph>
        <BulletList>
          <li>Harass, threaten, impersonate, exploit, or discriminate against another person.</li>
          <li>Post unlawful, hateful, sexually exploitative, dangerously violent, deceptive, or privacy-invasive content.</li>
          <li>Share another person’s personal information without lawful permission.</li>
          <li>Cheat, collude, manipulate rankings, exploit bugs, use unauthorized automation, or interfere with fair play.</li>
          <li>Distribute malware, spam, scams, phishing, or unauthorized promotions.</li>
          <li>Reverse engineer, scrape, overload, disrupt, or bypass access controls or security measures, except where law expressly permits it.</li>
          <li>Use Joe Yoke to violate law or another person’s intellectual-property or other rights.</li>
        </BulletList>
      </div>
    ),
  },
  {
    id: 'content',
    title: '6. User content and moderation',
    content: (
      <div className="space-y-4">
        <Paragraph>You retain ownership of content you submit. You grant Joe Yoke a worldwide, non-exclusive, royalty-free license to host, store, reproduce, display, adapt, and distribute that content only as reasonably necessary to operate, improve, secure, and promote the service. This license ends when the content is deleted from our active systems, except where continued retention is legally permitted or technically required.</Paragraph>
        <Paragraph>We may review, restrict, remove, or preserve content and may warn, mute, suspend, or terminate users when we reasonably believe these terms, community standards, law, or safety are at risk. Moderation tools are not guaranteed to identify every violation. Report harmful behavior through the tools provided.</Paragraph>
      </div>
    ),
  },
  {
    id: 'games',
    title: '7. Games, rankings, and fair play',
    content: <Paragraph>Game rules, scoring, rankings, rewards, and events may change to preserve balance, address errors, or improve play. Unless expressly stated otherwise, virtual scores, ranks, badges, and rewards have no cash value and cannot be transferred outside the service. We may correct results affected by cheating, technical errors, or abuse.</Paragraph>,
  },
  {
    id: 'purchases',
    title: '8. Purchases and app platforms',
    content: <Paragraph>If paid features, subscriptions, or virtual items are offered, the price and material terms will be shown before purchase. Transactions made through Apple, Google, or another app platform are also governed by that platform’s payment, cancellation, and refund rules. Except where required by law or platform rules, digital items are licensed, not sold, and have no real-world monetary value.</Paragraph>,
  },
  {
    id: 'intellectual-property',
    title: '9. Joe Yoke intellectual property',
    content: <Paragraph>The service, software, visual design, logos, game assets, text, audio, and other materials provided by Joe Yoke are owned by or licensed to the service operator and are protected by intellectual-property laws. Subject to these terms, you receive a limited, personal, revocable, non-exclusive, non-transferable license to use Joe Yoke for its intended purposes. No other rights are granted.</Paragraph>,
  },
  {
    id: 'third-party',
    title: '10. Third-party services',
    content: <Paragraph>Joe Yoke may rely on or link to third-party services, including app stores, hosting providers, authentication tools, Discord, and social platforms. Third-party services are governed by their own terms and policies. We are not responsible for services controlled independently by those providers.</Paragraph>,
  },
  {
    id: 'availability',
    title: '11. Changes, availability, and updates',
    content: <Paragraph>We may add, change, suspend, or discontinue features; deploy updates; impose reasonable usage limits; or perform maintenance. We aim to provide a reliable service but do not guarantee uninterrupted or error-free access. You may need to install updates to continue using the app safely.</Paragraph>,
  },
  {
    id: 'automated-support',
    title: '12. Automated support',
    content: <Paragraph>Joe Yoke may use an AI assistant to provide immediate help based on available product information and recent conversation context. Automated answers may be incomplete or incorrect and do not make refunds, account decisions, legal determinations, or other binding commitments. Do not send passwords, payment details, one-time codes, or unnecessary sensitive information. Requests needing individual review may be escalated to an administrator.</Paragraph>,
  },
  {
    id: 'termination',
    title: '13. Suspension, termination, and deletion',
    content: <Paragraph>You may stop using Joe Yoke at any time and may request account deletion through the available in-app or support method. We may restrict or terminate access for a serious or repeated violation, legal requirement, safety risk, fraud, or threat to the service. Where reasonable and lawful, we will provide notice or an opportunity to appeal. Sections that by their nature should survive termination—including ownership, disclaimers, and liability terms—will remain in effect.</Paragraph>,
  },
  {
    id: 'disclaimers',
    title: '14. Disclaimers',
    content: <Paragraph>To the fullest extent permitted by law, Joe Yoke is provided “as is” and “as available,” without warranties of uninterrupted availability, fitness for a particular purpose, non-infringement, or error-free operation. Nothing in these terms excludes warranties or consumer rights that cannot lawfully be excluded.</Paragraph>,
  },
  {
    id: 'liability',
    title: '15. Limitation of liability',
    content: <Paragraph>To the fullest extent permitted by law, Joe Yoke’s operator and service providers will not be liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits, data, goodwill, or opportunities arising from use of the service. Any aggregate liability will be limited to the greater of the amount you paid to Joe Yoke during the 12 months before the claim or the minimum amount required by law. These limits do not apply where liability cannot lawfully be limited.</Paragraph>,
  },
  {
    id: 'law',
    title: '16. Applicable law and disputes',
    content: <Paragraph>These terms are governed by the applicable laws of the jurisdiction in which the Joe Yoke service operator is established, without overriding mandatory consumer protections that apply where you live. Before starting formal proceedings, you and Joe Yoke should attempt in good faith to resolve the issue through the official support channel, unless law allows you to proceed directly.</Paragraph>,
  },
  {
    id: 'changes',
    title: '17. Changes to these terms',
    content: <Paragraph>We may update these terms to reflect changes to the service, law, or safety practices. We will post the revised terms with a new effective date and provide additional notice when required. If you do not agree to a material update, you should stop using the service and may request account deletion.</Paragraph>,
  },
  {
    id: 'contact',
    title: '18. Contact',
    content: <Paragraph>For questions, complaints, or legal notices, use the official support contact method published in the Joe Yoke app, the applicable app-store listing, or on joeyoke.com. Include enough information for us to understand the issue, but never send your password.</Paragraph>,
  },
]

function LegalPage({
  type,
  title,
  description,
  introduction,
  sections,
}: {
  type: 'privacy' | 'terms'
  title: string
  description: string
  introduction: string
  sections: Section[]
}) {
  const { darkMode, toggleDarkMode } = useTheme()
  const Icon = type === 'privacy' ? ShieldCheck : FileText
  const pagePath = type === 'privacy' ? '/privacy-policy' : '/terms'
  const relatedPath = type === 'privacy' ? '/terms' : '/privacy-policy'
  const relatedLabel = type === 'privacy' ? 'Terms & Conditions' : 'Privacy Policy'
  const foreground = darkMode ? 'text-white' : 'text-[#1A1A1A]'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#080808]' : 'bg-[#F5F6F2]'} ${foreground}`}>
      <Seo title={`${title} | Joe Yoke`} description={description} path={pagePath} type="article" />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: `https://www.joeyoke.com${pagePath}`,
          isPartOf: { '@type': 'WebSite', name: 'Joe Yoke', url: 'https://www.joeyoke.com/' },
          dateModified: '2026-08-03',
        }}
      />

      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${darkMode ? 'border-white/10 bg-[#080808]/85' : 'border-black/10 bg-[#F5F6F2]/85'}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 font-black tracking-tight" aria-label="Joe Yoke home">
            <img src={darkMode ? logoNavDark : logoNavLight} alt="" className="h-9 w-9 rounded-xl object-cover" />
            <span>JOE YOKE</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold sm:flex ${darkMode ? 'border-white/15 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`}>
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <button onClick={toggleDarkMode} className={`grid h-10 w-10 place-items-center rounded-full border ${darkMode ? 'border-white/15 hover:bg-white/10' : 'border-black/10 hover:bg-black/5'}`} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className={`mb-7 grid h-14 w-14 place-items-center rounded-2xl ${darkMode ? 'bg-[#C5FF00] text-[#111]' : 'bg-[#1A1A1A] text-[#C5FF00]'}`}>
              <Icon className="h-7 w-7" />
            </div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#82a900]">Joe Yoke legal</p>
            <h1 className="max-w-4xl text-4xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-current/60 sm:text-lg">{introduction}</p>
            <p className="mt-6 text-sm font-semibold text-current/45">Effective date: {EFFECTIVE_DATE}</p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
            <aside className={`rounded-3xl border p-5 lg:sticky lg:top-24 ${darkMode ? 'border-white/10 bg-white/[0.035]' : 'border-black/10 bg-white'}`}>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-current/40">On this page</p>
              <nav aria-label={`${title} sections`}>
                <ol className="space-y-2">
                  {sections.map(section => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="block text-sm leading-5 text-current/55 transition hover:text-[#82a900]">{section.title}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <article className={`overflow-hidden rounded-3xl border ${darkMode ? 'border-white/10 bg-[#101010]' : 'border-black/10 bg-white'}`}>
              {sections.map(section => (
                <section key={section.id} id={section.id} className={`scroll-mt-24 p-6 sm:p-9 ${darkMode ? 'border-b border-white/10 last:border-b-0' : 'border-b border-black/10 last:border-b-0'}`}>
                  <h2 className="mb-4 text-xl font-extrabold tracking-tight sm:text-2xl">{section.title}</h2>
                  {section.content}
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-current/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 text-sm text-current/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Joe Yoke. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/" className="hover:text-current">Home</Link>
            <Link to="/games" className="hover:text-current">Games</Link>
            <Link to={relatedPath} className="hover:text-current">{relatedLabel}</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      type="privacy"
      title="Privacy Policy"
      description="Learn how Joe Yoke collects, uses, shares, secures, and deletes information across its website, multiplayer games, and social app."
      introduction="This policy describes how information is handled across the Joe Yoke website, mobile app, multiplayer games, and community experiences."
      sections={privacySections}
    />
  )
}

export function TermsPage() {
  return (
    <LegalPage
      type="terms"
      title="Terms & Conditions"
      description="Terms governing the Joe Yoke website, multi-game social app, player accounts, multiplayer gameplay, community content, and fair use."
      introduction="These terms set the rules for using Joe Yoke, including player accounts, multiplayer games, community interactions, user content, and fair play."
      sections={termsSections}
    />
  )
}
