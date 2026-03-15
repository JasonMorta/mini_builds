/*
  PokemonViewer.jsx
  - Fetches the full Pokémon index once so search can match unloaded / non-visible entries too.
  - Reveals the broader list progressively while still keeping the detail API request on-demand.
  - Uses a modal with a dedicated scroll body and GSAP-powered motion for a more interactive detail view.
*/
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./PokemonViewer.module.css";
import MiniPlayer from "../../audioPlayer/MiniPlayer";
import typeColors from "./TypeColors";

const INITIAL_BATCH_SIZE = 36;
const LOAD_MORE_BATCH_SIZE = 36;
const POKEDEX_LIMIT = 1302;
const MAX_STAT_VALUE = 255;

const formatName = (name) =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getTypeColor = (typeName) => {
  const match = typeColors.find(
    ({ name }) => name.toLowerCase() === typeName.toLowerCase()
  );
  return match ? match.color : "#8b5e34";
};

const buildSpriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export default function PokemonViewer() {
  const [pokemonIndex, setPokemonIndex] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const loadMoreRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalScrollAreaRef = useRef(null);
  const modalHeaderRef = useRef(null);
  const modalImageRef = useRef(null);
  const statsFillRefs = useRef([]);
  const detailsCardRefs = useRef([]);
  const badgeRefs = useRef([]);

  const registerStatFill = (node, index) => {
    if (!node) return;
    statsFillRefs.current[index] = node;
  };

  const registerDetailCard = (node, key) => {
    if (!node) return;
    detailsCardRefs.current[key] = node;
  };

  const registerBadge = (node, key) => {
    if (!node) return;
    badgeRefs.current[key] = node;
  };

  useEffect(() => {
    let isActive = true;

    const fetchPokemonIndex = async () => {
      setListLoading(true);
      setListError("");

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEDEX_LIMIT}&offset=0`);
        if (!response.ok) {
          throw new Error("Pokémon index request failed.");
        }

        const data = await response.json();
        const mappedList = data.results.map((entry, index) => {
          const idFromUrl = entry.url.match(/\/pokemon\/(\d+)\//)?.[1];
          const id = Number(idFromUrl || index + 1);

          return {
            id,
            apiName: entry.name,
            displayName: formatName(entry.name),
            thumbnail: buildSpriteUrl(id),
          };
        });

        if (!isActive) return;
        setPokemonIndex(mappedList);
      } catch (error) {
        if (!isActive) return;
        console.error("Error fetching Pokémon index:", error);
        setListError("Could not load the Pokémon list. Reload and try again.");
      } finally {
        if (isActive) {
          setListLoading(false);
        }
      }
    };

    fetchPokemonIndex();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredPokemon = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return pokemonIndex;

    return pokemonIndex.filter((entry) => entry.apiName.startsWith(query));
  }, [pokemonIndex, searchValue]);

  useEffect(() => {
    if (searchValue.trim()) {
      setVisibleCount(filteredPokemon.length || INITIAL_BATCH_SIZE);
      return;
    }

    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [searchValue, filteredPokemon.length]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || searchValue.trim()) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisibleCount((current) => Math.min(current + LOAD_MORE_BATCH_SIZE, filteredPokemon.length));
        });
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [filteredPokemon.length, searchValue]);

  useLayoutEffect(() => {
    if (!selectedPokemon || !modalContentRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(modalContentRef.current, { y: 18, opacity: 0, scale: 0.985 });
      gsap.to(modalContentRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.34,
        ease: "power2.out",
      });

      if (modalHeaderRef.current) {
        gsap.fromTo(
          modalHeaderRef.current.children,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.3, ease: "power2.out", delay: 0.08 }
        );
      }
    }, modalContentRef);

    if (modalScrollAreaRef.current) {
      modalScrollAreaRef.current.scrollTop = 0;
    }

    return () => ctx.revert();
  }, [selectedPokemon]);

  useLayoutEffect(() => {
    if (!pokemonDetails) return undefined;

    const ctx = gsap.context(() => {
      if (modalImageRef.current) {
        gsap.fromTo(
          modalImageRef.current,
          { y: 22, opacity: 0, scale: 0.92, rotate: -4 },
          { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.55, ease: "back.out(1.6)" }
        );
      }

      const detailCards = detailsCardRefs.current.filter(Boolean);
      if (detailCards.length) {
        gsap.fromTo(
          detailCards,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.32, ease: "power2.out" }
        );
      }

      const badges = badgeRefs.current.filter(Boolean);
      if (badges.length) {
        gsap.fromTo(
          badges,
          { y: 8, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.03, duration: 0.24, ease: "power2.out" }
        );
      }

      const statFills = statsFillRefs.current.filter(Boolean);
      if (statFills.length) {
        gsap.set(statFills, { transformOrigin: "left center", scaleX: 0 });
        gsap.to(statFills, {
          scaleX: (_, target) => Number(target.dataset.fill || 0),
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.14,
        });
      }
    }, modalContentRef);

    if (modalScrollAreaRef.current) {
      modalScrollAreaRef.current.scrollTop = 0;
    }

    return () => ctx.revert();
  }, [pokemonDetails]);

  const visiblePokemon = useMemo(
    () => filteredPokemon.slice(0, visibleCount),
    [filteredPokemon, visibleCount]
  );

  const fetchPokemonDetails = async (apiName) => {
    setDetailsLoading(true);
    setDetailsError("");

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
      if (!response.ok) {
        throw new Error("Pokémon details request failed.");
      }
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      setDetailsError("Could not load that Pokémon's details right now.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const openModal = (entry) => {
    statsFillRefs.current = [];
    detailsCardRefs.current = [];
    badgeRefs.current = [];
    setSelectedPokemon(entry);
    setPokemonDetails(null);
    setDetailsError("");
    fetchPokemonDetails(entry.apiName);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setPokemonDetails(null);
    setDetailsLoading(false);
    setDetailsError("");
    statsFillRefs.current = [];
    detailsCardRefs.current = [];
    badgeRefs.current = [];
  };

  const totalCountLabel = `${visiblePokemon.length} shown of ${filteredPokemon.length} matched Pokémon`;
  const crySource = pokemonDetails?.cries?.latest || pokemonDetails?.cries?.legacy || "";

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Pokédex mini build</p>
          <h1 className={styles.title}>Pokémon Explorer</h1>
          <p className={styles.subtitle}>
            Scroll through the broader Pokédex progressively, search against every fetched name,
            and open any card to pull detailed stats, cries, and artwork on demand.
          </p>
        </div>

        <div className={styles.searchPanel}>
          <label className={styles.searchLabel} htmlFor="pokemon-search">
            Search by first letter or name start
          </label>
          <div className={styles.searchRow}>
            <input
              id="pokemon-search"
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value.toLowerCase())}
              className={styles.searchInput}
              placeholder="Try b, bul, char..."
              autoComplete="off"
            />
            {searchValue && (
              <button type="button" className={styles.clearButton} onClick={() => setSearchValue("")}>Clear</button>
            )}
          </div>
          <p className={styles.searchMeta}>{totalCountLabel}</p>
        </div>
      </header>

      {listLoading ? (
        <div className={styles.loaderPanel}>
          <div className={styles.spinner}></div>
          <p className={styles.loaderText}>Loading the Pokémon index…</p>
        </div>
      ) : listError ? (
        <div className={styles.error}>{listError}</div>
      ) : visiblePokemon.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No Pokémon match that starting text.</h2>
          <p>Prefix filtering is active, so results must start with what you type.</p>
        </div>
      ) : (
        <>
          <div className={styles.pokemonGrid}>
            {visiblePokemon.map((entry) => (
              <button
                type="button"
                key={`${entry.apiName}-${entry.id}`}
                onClick={() => openModal(entry)}
                className={styles.pokemonCard}
              >
                <div className={styles.cardTopRow}>
                  <span className={styles.cardNumber}>#{entry.id}</span>
                </div>
                <div className={styles.imageContainer}>
                  <img
                    loading="lazy"
                    src={entry.thumbnail}
                    alt={entry.displayName}
                    className={styles.pokemonImage}
                  />
                </div>
                <div className={styles.cardFooter}>
                  <h2 className={styles.pokemonName}>{entry.displayName}</h2>
                </div>
              </button>
            ))}
          </div>
          {!searchValue.trim() ? <div ref={loadMoreRef} className={styles.loadMoreSentinel} aria-hidden="true" /> : null}
        </>
      )}

      {selectedPokemon ? (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div ref={modalContentRef} className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
            <div ref={modalHeaderRef} className={styles.modalHeader}>
              <div className={styles.modalHeaderCopy}>
                <p className={styles.modalEyebrow}>Pokémon details</p>
                <h2 className={styles.modalTitle}>{selectedPokemon.displayName}</h2>
                <div className={styles.modalMetaRow}>
                  <span className={styles.pokemonIdBadge}>
                    {pokemonDetails?.id ? `#${pokemonDetails.id}` : `#${selectedPokemon.id}`}
                  </span>
                  {pokemonDetails?.types?.map((type, index) => (
                    <span
                      key={type.type.name}
                      ref={(node) => registerBadge(node, index)}
                      className={styles.typePill}
                      style={{ backgroundColor: getTypeColor(type.type.name) }}
                    >
                      {formatName(type.type.name)}
                    </span>
                  ))}
                </div>
              </div>
              <button type="button" onClick={closeModal} className={styles.closeButton} aria-label="Close Pokémon details">
                ×
              </button>
            </div>

            <div ref={modalScrollAreaRef} className={styles.modalScrollArea}>
              <div className={styles.modalHero}>
                <div ref={(node) => registerDetailCard(node, 0)} className={styles.heroArtworkPanel}>
                  <img
                    ref={modalImageRef}
                    src={pokemonDetails && !detailsLoading
                      ? pokemonDetails.sprites.other["official-artwork"]?.front_default || pokemonDetails.sprites.front_default || selectedPokemon.thumbnail
                      : selectedPokemon.thumbnail}
                    alt={selectedPokemon.displayName}
                    className={styles.modalImage}
                  />
                </div>

                <div className={styles.heroSummary}>
                  <section ref={(node) => registerDetailCard(node, 1)} className={styles.detailCard}>
                    <h3 className={styles.sectionTitle}>Battle profile</h3>
                    <p className={styles.helperText}>
                      Browse lightweight cards first, then open a Pokémon to animate in richer combat, size, and audio detail only when needed.
                    </p>
                  </section>

                  {pokemonDetails && !detailsLoading ? (
                    <div className={styles.statsGrid}>
                      <div ref={(node) => registerDetailCard(node, 2)} className={styles.statCard}>
                        <span className={styles.statLabel}>Height</span>
                        <p className={styles.statMainValue}>{(pokemonDetails.height / 10).toFixed(1)} m</p>
                      </div>
                      <div ref={(node) => registerDetailCard(node, 3)} className={styles.statCard}>
                        <span className={styles.statLabel}>Weight</span>
                        <p className={styles.statMainValue}>{(pokemonDetails.weight / 10).toFixed(1)} kg</p>
                      </div>
                      <div ref={(node) => registerDetailCard(node, 4)} className={styles.statCard}>
                        <span className={styles.statLabel}>Base XP</span>
                        <p className={styles.statMainValue}>{pokemonDetails.base_experience ?? "—"}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {detailsError ? (
                <div className={styles.error}>{detailsError}</div>
              ) : pokemonDetails && !detailsLoading ? (
                <>
                  <div className={styles.detailSectionGrid}>
                    <section ref={(node) => registerDetailCard(node, 5)} className={styles.detailCard}>
                      <h3 className={styles.sectionTitle}>Abilities</h3>
                      <div className={styles.badgeContainer}>
                        {pokemonDetails.abilities.map((ability, index) => (
                          <span
                            key={ability.ability.name}
                            ref={(node) => registerBadge(node, `ability-${index}`)}
                            className={styles.abilityPill}
                          >
                            {formatName(ability.ability.name)}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section ref={(node) => registerDetailCard(node, 6)} className={styles.detailCard}>
                      <h3 className={styles.sectionTitle}>Core stats</h3>
                      <div className={styles.statsList}>
                        {pokemonDetails.stats.map((stat, index) => {
                          const fillAmount = Math.min(stat.base_stat / MAX_STAT_VALUE, 1);
                          return (
                            <div key={stat.stat.name} className={styles.statBar}>
                              <div className={styles.statInfo}>
                                <span className={styles.statName}>{formatName(stat.stat.name)}</span>
                                <span className={styles.statValue}>{stat.base_stat}</span>
                              </div>
                              <div className={styles.statBarContainer}>
                                <div
                                  ref={(node) => registerStatFill(node, index)}
                                  data-fill={fillAmount}
                                  className={styles.statBarFill}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  </div>

                  <div className={styles.detailSectionGrid}>
                    <section ref={(node) => registerDetailCard(node, 7)} className={styles.detailCard}>
                      <h3 className={styles.sectionTitle}>Pokémon cry</h3>
                      {crySource ? (
                        <div className={styles.audioWrap}>
                          <MiniPlayer audioSrc={crySource} />
                        </div>
                      ) : (
                        <p className={styles.helperText}>No cry audio available.</p>
                      )}
                    </section>

                    <section ref={(node) => registerDetailCard(node, 8)} className={styles.detailCard}>
                      <h3 className={styles.sectionTitle}>Extra sprites</h3>
                      <div className={styles.spritesGrid}>
                        {[
                          [pokemonDetails.sprites.front_default, "Front"],
                          [pokemonDetails.sprites.back_default, "Back"],
                          [pokemonDetails.sprites.front_shiny, "Shiny front"],
                          [pokemonDetails.sprites.back_shiny, "Shiny back"],
                        ]
                          .filter(([src]) => Boolean(src))
                          .map(([src, label], index) => (
                            <div key={label} className={styles.spriteTile} ref={(node) => registerBadge(node, `sprite-${index}`)}>
                              <img src={src} alt={label} className={styles.spriteImage} />
                              <span className={styles.spriteLabel}>{label}</span>
                            </div>
                          ))}
                      </div>
                    </section>
                  </div>
                </>
              ) : (
                <div className={styles.loaderPanel}>
                  <div className={styles.spinner}></div>
                  <p className={styles.loaderText}>Loading Pokémon details…</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
