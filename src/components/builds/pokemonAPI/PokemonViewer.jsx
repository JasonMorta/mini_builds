/*
  PokemonViewer.jsx
  - Loads the full Pokémon name list once, then reveals more cards progressively as the user scrolls.
  - Keeps modal detail requests on-demand so the heavier API fetch only happens after card selection.
  - Uses prefix-only searching so every Pokémon starting with the entered text can be shown.
*/
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PokemonViewer.module.css";
import MiniPlayer from "../../audioPlayer/MiniPlayer";
import typeColors from "./TypeColors";

const INITIAL_BATCH_SIZE = 30;
const LOAD_MORE_BATCH_SIZE = 30;
const POKEDEX_LIMIT = 1302;

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
  const [allPokemon, setAllPokemon] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const loadMoreRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    const fetchPokemonList = async () => {
      setListLoading(true);
      setListError("");

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEDEX_LIMIT}&offset=0`);
        if (!response.ok) {
          throw new Error("Pokémon list request failed.");
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
        setAllPokemon(mappedList);
      } catch (error) {
        if (!isActive) return;
        console.error("Error fetching Pokémon list:", error);
        setListError("Could not load the Pokémon list. Reload and try again.");
      } finally {
        if (isActive) {
          setListLoading(false);
        }
      }
    };

    fetchPokemonList();

    return () => {
      isActive = false;
    };
  }, []);

  const filteredPokemon = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return allPokemon;

    return allPokemon.filter((entry) => entry.apiName.startsWith(query));
  }, [allPokemon, searchValue]);

  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [searchValue]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return undefined;

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
  }, [filteredPokemon.length]);

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
  };

  const totalCountLabel = `${visiblePokemon.length} shown of ${filteredPokemon.length} matched Pokémon`;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Pokédex mini build</p>
          <h1 className={styles.title}>Pokémon Explorer</h1>
          <p className={styles.subtitle}>
            Load the full Pokédex list progressively as you scroll, then open any card to fetch richer details,
            cries, stats, and artwork on demand.
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
          <p className={styles.loaderText}>Loading the full Pokémon list…</p>
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
          <div ref={loadMoreRef} className={styles.loadMoreSentinel} aria-hidden="true" />
        </>
      )}

      {selectedPokemon && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={closeModal} className={styles.closeButton} aria-label="Close Pokémon details">
              ×
            </button>

            <div className={styles.modalHero}>
              <div className={styles.modalTitleBlock}>
                <p className={styles.modalEyebrow}>Pokémon details</p>
                <h2 className={styles.modalTitle}>{selectedPokemon.displayName}</h2>
                <div className={styles.modalMetaRow}>
                  <span className={styles.pokemonIdBadge}>
                    {pokemonDetails?.id ? `#${pokemonDetails.id}` : selectedPokemon.displayName}
                  </span>
                  {pokemonDetails?.types?.map((type) => (
                    <span key={type.type.name} className={styles.typePill} style={{ backgroundColor: getTypeColor(type.type.name) }}>
                      {formatName(type.type.name)}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.heroArtworkPanel}>
                {pokemonDetails && !detailsLoading ? (
                  <img
                    src={pokemonDetails.sprites.other["official-artwork"].front_default || pokemonDetails.sprites.front_default}
                    alt={selectedPokemon.displayName}
                    className={styles.modalImage}
                  />
                ) : (
                  <div className={styles.modalImagePlaceholder}>
                    <img src={selectedPokemon.thumbnail} alt={selectedPokemon.displayName} className={styles.modalImage} />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.modalBody}>
              {detailsError ? (
                <div className={styles.error}>{detailsError}</div>
              ) : pokemonDetails && !detailsLoading ? (
                <>
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Height</span>
                      <p className={styles.statMainValue}>{(pokemonDetails.height / 10).toFixed(1)} m</p>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Weight</span>
                      <p className={styles.statMainValue}>{(pokemonDetails.weight / 10).toFixed(1)} kg</p>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Base XP</span>
                      <p className={styles.statMainValue}>{pokemonDetails.base_experience}</p>
                    </div>
                  </div>

                  <div className={styles.detailSectionGrid}>
                    <section className={styles.detailCard}>
                      <h3 className={styles.sectionTitle}>Abilities</h3>
                      <div className={styles.badgeContainer}>
                        {pokemonDetails.abilities.map((ability) => (
                          <span key={ability.ability.name} className={styles.abilityPill}>
                            {formatName(ability.ability.name)}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section className={styles.detailCard}>
                      <h3 className={styles.sectionTitle}>Stats</h3>
                      <div className={styles.statsList}>
                        {pokemonDetails.stats.map((stat) => (
                          <div key={stat.stat.name} className={styles.statRow}>
                            <span>{formatName(stat.stat.name)}</span>
                            <strong>{stat.base_stat}</strong>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <section className={styles.detailCard}>
                    <h3 className={styles.sectionTitle}>Pokémon cry</h3>
                    <MiniPlayer src={pokemonDetails.cries?.latest} />
                  </section>
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
      )}
    </div>
  );
}
