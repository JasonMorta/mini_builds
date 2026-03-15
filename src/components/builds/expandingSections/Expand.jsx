import React, { useMemo, useState } from 'react';
import styles from './Expand.module.css';

const localImages = import.meta.glob('./**/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default',
});

function buildPanels(imageEntries) {
  const [firstImage, secondImage, thirdImage, fourthImage, fifthImage] = imageEntries;

  return [
    {
      id: 'gallery',
      variant: 'gallery',
      eyebrow: 'Image panel',
      title: 'Expandable image gallery',
      summary: 'A compact teaser opens into a selectable gallery where the hero image changes without leaving the card.',
      metrics: ['Hero swap', 'Selectable thumbnails', 'Media-led'],
      bullets: [
        'Collapsed state behaves like a simple teaser card.',
        'Expanded state lets the user switch between local images inside the same surface.',
        'Shows that expansion can reveal a gallery workflow, not just more height.',
      ],
      images: [firstImage, secondImage, thirdImage, fourthImage].filter(Boolean),
      details: [
        {
          id: 'overview',
          title: 'Why this feels different',
          body: 'The open state is now interactive. Instead of only showing a larger image, it adds thumbnail switching so the user gets a clear second layer of control.',
        },
        {
          id: 'usage',
          title: 'Where this pattern fits',
          body: 'Good for product galleries, portfolios, or media pickers where the collapsed state should stay tidy but the expanded state should reveal richer browsing.',
        },
      ],
    },
    {
      id: 'story',
      variant: 'story',
      eyebrow: 'Narrative panel',
      title: 'Feature spotlight with steps',
      summary: 'This variation turns expansion into a story flow: media on one side, guided steps and highlights on the other.',
      metrics: ['Step-based', 'Editorial', 'Guided reveal'],
      image: fifthImage?.src || secondImage?.src || firstImage?.src || '',
      imageAlt: fifthImage?.label || 'Feature spotlight',
      bullets: [
        'Collapsed state introduces the feature quickly.',
        'Expanded state reveals steps, highlights, and layered detail cards.',
        'It feels closer to a feature tour than a plain accordion.',
      ],
      details: [
        { id: 'step1', title: 'Step 1 — Preview', body: 'Lead with a single message and hero visual so the user understands what the panel represents before opening it.' },
        { id: 'step2', title: 'Step 2 — Explain', body: 'Once opened, reveal clearer supporting points instead of dumping one large paragraph. This keeps the expansion purposeful.' },
        { id: 'step3', title: 'Step 3 — Emphasise', body: 'Use nested highlights and short blocks so the user can scan the content instead of feeling trapped inside one oversized expanded card.' },
      ],
    },
    {
      id: 'faq',
      variant: 'faq',
      eyebrow: 'Text panel',
      title: 'Nested text expansion',
      summary: 'A text-first pattern where the parent card opens into grouped questions and each answer expands smoothly on demand.',
      metrics: ['Text-first', 'Nested accordions', 'Compact'],
      bullets: [
        'Demonstrates that expansion is not only for media.',
        'The parent opens first, then smaller text modules reveal answers.',
        'Useful for onboarding, help, settings, or micro documentation.',
      ],
      details: [
        { id: 'what', title: 'What is being demonstrated?', body: 'A parent card expansion can reveal a second level of small, focused content boxes instead of one huge text wall.' },
        { id: 'why', title: 'Why is this more intuitive?', body: 'Each inner answer only opens when requested, which keeps the expanded state readable and easier to scan.' },
        { id: 'where', title: 'Where would this be useful?', body: 'Help panels, settings descriptions, onboarding checklists, and FAQ sections all benefit from this kind of progressive disclosure.' },
      ],
    },
    {
      id: 'board',
      variant: 'board',
      eyebrow: 'Mixed panel',
      title: 'Dashboard-style expansion board',
      summary: 'The final pattern opens into a small dashboard with status cards, tags, and utility blocks instead of another image/text split.',
      metrics: ['Status cards', 'Mixed content', 'Dashboard feel'],
      bullets: [
        'Shows that expansion can reveal tools and states, not just copy.',
        'Uses smaller cards with stronger separation so every block has a job.',
        'Feels more like a mini workspace once it opens.',
      ],
      stats: [
        { label: 'Assets loaded', value: `${imageEntries.length}`, note: 'From local directory' },
        { label: 'Nested actions', value: '3', note: 'Expandable blocks' },
        { label: 'Focus mode', value: 'On', note: 'Context-first layout' },
      ],
      details: [
        { id: 'status', title: 'Status panel', body: 'Use small cards to show active states or summaries so the expanded area feels functional rather than decorative.' },
        { id: 'notes', title: 'Context notes', body: 'Short supportive cards can explain what changed in the open state without forcing the user to read one long section.' },
        { id: 'actions', title: 'Action-ready reveal', body: 'Expandable dashboard panels work well when the open state should feel like a workspace instead of a modal replacement.' },
      ],
    },
  ];
}

function GalleryPanel({ panel }) {
  const [activeMedia, setActiveMedia] = useState(panel.images[0] || null);

  return (
    <div className={styles.galleryLayout}>
      <div className={styles.galleryHero}>
        {activeMedia ? <img src={activeMedia.src} alt={activeMedia.label} className={styles.media} /> : null}
        <div className={styles.galleryCaption}>
          <strong>{activeMedia?.label || 'Local image preview'}</strong>
          <p>This is the active local image. The thumbnails below let the expanded card behave like a lightweight gallery.</p>
        </div>
      </div>

      <div className={styles.galleryRail}>
        {panel.images.map((image) => (
          <button
            key={image.src}
            type="button"
            className={`${styles.thumbCard} ${activeMedia?.src === image.src ? styles.thumbCardActive : ''}`}
            onClick={() => setActiveMedia(image)}
          >
            <img src={image.src} alt={image.label} className={styles.thumbImage} />
            <span>{image.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StoryPanel({ panel }) {
  return (
    <div className={styles.storyLayout}>
      <div className={styles.storyMediaWrap}>
        {panel.image ? <img src={panel.image} alt={panel.imageAlt} className={styles.media} /> : null}
      </div>
      <div className={styles.storySteps}>
        {panel.details.map((detail, index) => (
          <div key={detail.id} className={styles.storyStepCard}>
            <span className={styles.storyStepIndex}>0{index + 1}</span>
            <strong>{detail.title}</strong>
            <p>{detail.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQPanel({ panel, openDetails, toggleDetail }) {
  return (
    <div className={styles.faqLayout}>
      <div className={styles.textBlock}>
        <h4>Why this variation feels different</h4>
        <ul>
          {panel.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.nestedStack}>
        {panel.details.map((detail) => {
          const isOpen = !!openDetails[`${panel.id}:${detail.id}`];
          return (
            <div key={detail.id} className={`${styles.nestedCard} ${isOpen ? styles.nestedCardOpen : ''}`}>
              <button
                type="button"
                className={styles.nestedTrigger}
                onClick={() => toggleDetail(panel.id, detail.id)}
                aria-expanded={isOpen}
              >
                <span>{detail.title}</span>
                <span className={styles.nestedChevron}>{isOpen ? '−' : '+'}</span>
              </button>
              <div className={styles.nestedBodyWrap}>
                <div className={styles.nestedBody}>
                  <p>{detail.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BoardPanel({ panel, openDetails, toggleDetail }) {
  return (
    <div className={styles.boardLayout}>
      <div className={styles.statGrid}>
        {panel.stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.note}</p>
          </div>
        ))}
      </div>

      <div className={styles.nestedStack}>
        {panel.details.map((detail) => {
          const isOpen = !!openDetails[`${panel.id}:${detail.id}`];
          return (
            <div key={detail.id} className={`${styles.nestedCard} ${isOpen ? styles.nestedCardOpen : ''}`}>
              <button
                type="button"
                className={styles.nestedTrigger}
                onClick={() => toggleDetail(panel.id, detail.id)}
                aria-expanded={isOpen}
              >
                <span>{detail.title}</span>
                <span className={styles.nestedChevron}>{isOpen ? '−' : '+'}</span>
              </button>
              <div className={styles.nestedBodyWrap}>
                <div className={styles.nestedBody}>
                  <p>{detail.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Expand() {
  const imageEntries = useMemo(() => {
    return Object.entries(localImages)
      .map(([path, src]) => ({
        src,
        label: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') || 'Expandable media',
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const panels = useMemo(() => buildPanels(imageEntries), [imageEntries]);
  const [activeId, setActiveId] = useState(panels[0]?.id || 'gallery');
  const [openDetails, setOpenDetails] = useState(() => ({
    [`faq:what`]: true,
    [`board:status`]: true,
  }));

  const toggleDetail = (panelId, detailId) => {
    const key = `${panelId}:${detailId}`;
    setOpenDetails((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className={styles.expandBuild}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Expandable UI patterns</p>
          <h2>One idea, four different expansion behaviours</h2>
          <p className={styles.heroCopy}>
            Instead of four cards that all open the same way, this build now shows four different expansion patterns:
            a gallery reveal, a guided feature story, nested text answers, and a small dashboard board.
          </p>
        </div>
        <div className={styles.heroMeta}>
          <span>Gallery selection</span>
          <span>Story / step reveal</span>
          <span>Nested text accordions</span>
          <span>Dashboard-style expansion</span>
        </div>
      </div>

      <div className={styles.panelStack}>
        {panels.map((panel) => {
          const open = activeId === panel.id;

          return (
            <article key={panel.id} className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
              <button
                type="button"
                className={styles.panelTrigger}
                onClick={() => setActiveId(open ? '' : panel.id)}
                aria-expanded={open}
              >
                <div>
                  <p className={styles.panelEyebrow}>{panel.eyebrow}</p>
                  <h3>{panel.title}</h3>
                </div>
                <div className={styles.panelSummaryRow}>
                  <p>{panel.summary}</p>
                  <span className={styles.chevron}>{open ? '−' : '+'}</span>
                </div>
              </button>

              <div className={styles.panelContentWrap}>
                <div className={styles.panelContent}>
                  <div className={styles.metricRow}>
                    {panel.metrics.map((metric) => (
                      <span key={metric} className={styles.metricPill}>{metric}</span>
                    ))}
                  </div>

                  {panel.variant === 'gallery' ? <GalleryPanel panel={panel} /> : null}
                  {panel.variant === 'story' ? <StoryPanel panel={panel} /> : null}
                  {panel.variant === 'faq' ? <FAQPanel panel={panel} openDetails={openDetails} toggleDetail={toggleDetail} /> : null}
                  {panel.variant === 'board' ? <BoardPanel panel={panel} openDetails={openDetails} toggleDetail={toggleDetail} /> : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
