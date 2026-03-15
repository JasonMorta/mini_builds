/*
  PokemonViewer.jsx
  - Loads a curated Pokédex list once so search can filter instantly by starting letter.
  - Keeps card and modal styling scoped to the local CSS module.
  - Uses a prefix-only search to match the requested behaviour.
*/
import { useEffect, useMemo, useState } from "react";
import styles from "./PokemonViewer.module.css";
import MiniPlayer from "../../audioPlayer/MiniPlayer";
import typeColors from "./TypeColors";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";

const POKEDEX_LIMIT = 151;

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

export default function PokemonViewer() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchPokemon = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Load a fixed Pokédex slice once so the UI can filter locally without waiting for pagination.
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${POKEDEX_LIMIT}&offset=0`
        );
        const data = await response.json();

        if (!isMounted) return;

        const pokemonWithIds = data.results.map((entry) => {
          const segments = entry.url.split("/");
          const id = segments[segments.length - 2];
          return {
            ...entry,
            id,
            displayName: formatName(entry.name),
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });

        setPokemon(pokemonWithIds);
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to fetch Pokémon. Please try again later.");
        console.error("Error fetching Pokémon:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPokemon();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPokemon = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return pokemon;

    // Prefix-only filtering to match the requested behaviour.
    return pokemon.filter((entry) => entry.name.toLowerCase().startsWith(query));
  }, [pokemon, searchValue]);

  const fetchPokemonDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemonDetails(data);
    } catch (err) {
      console.error("Error fetching Pokémon details:", err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const openModal = (entry) => {
    setSelectedPokemon(entry);
    setPokemonDetails(null);
    fetchPokemonDetails(entry.id);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setPokemonDetails(null);
    setDetailsLoading(false);
  };

  const totalCountLabel = `${filteredPokemon.length} of ${pokemon.length} Pokémon`;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Pokédex mini build</p>
          <h1 className={styles.title}>Pokémon Explorer</h1>
          <p className={styles.subtitle}>
            Browse the starter-era Pokédex, then open a card to inspect stats,
            abilities, cries, and artwork.
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
              onChange={(event) => setSearchValue(event.target.value)}
              className={styles.searchInput}
              placeholder="Try B, Bu, Bul..."
              autoComplete="off"
            />
            {searchValue && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setSearchValue("")}
              >
                Clear
              </button>
            )}
          </div>
          <p className={styles.searchMeta}>{totalCountLabel}</p>
        </div>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      {isLoading ? (
        <div className={styles.loaderPanel}>
          <div className={styles.spinner}></div>
          <p className={styles.loaderText}>Loading the Pokédex…</p>
        </div>
      ) : filteredPokemon.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No Pokémon match that starting text.</h2>
          <p>Prefix filtering is active, so results must start with what you type.</p>
        </div>
      ) : (
        <div className={styles.pokemonGrid}>
          {filteredPokemon.map((entry) => (
            <button
              type="button"
              key={entry.id}
              onClick={() => openModal(entry)}
              className={styles.pokemonCard}
            >
              <div className={styles.cardTopRow}>
                <span className={styles.cardNumber}>#{entry.id}</span>
              </div>
              <div className={styles.imageContainer}>
                <img
                  loading="lazy"
                  src={entry.imageUrl}
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
      )}

      {selectedPokemon && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className={styles.closeButton}
              aria-label="Close Pokémon details"
            >
              ×
            </button>

            <div className={styles.modalHero}>
              <div className={styles.modalTitleBlock}>
                <p className={styles.modalEyebrow}>Pokémon details</p>
                <h2 className={styles.modalTitle}>{selectedPokemon.displayName}</h2>
                <div className={styles.modalMetaRow}>
                  <span className={styles.pokemonIdBadge}>#{selectedPokemon.id}</span>
                  {pokemonDetails?.types?.map((type) => (
                    <span
                      key={type.type.name}
                      className={styles.typePill}
                      style={{ backgroundColor: getTypeColor(type.type.name) }}
                    >
                      {formatName(type.type.name)}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.heroArtworkPanel}>
                {pokemonDetails && !detailsLoading ? (
                  <img
                    src={
                      pokemonDetails.sprites.other["official-artwork"]
                        .front_default || pokemonDetails.sprites.front_default
                    }
                    alt={selectedPokemon.displayName}
                    className={styles.modalImage}
                  />
                ) : (
                  <div className={styles.modalImagePlaceholder}>
                    <div className={styles.spinner}></div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.modalBody}>
              {pokemonDetails && !detailsLoading ? (
                <>
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Height</span>
                      <p className={styles.statMainValue}>
                        {(pokemonDetails.height / 10).toFixed(1)} m
                      </p>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Weight</span>
                      <p className={styles.statMainValue}>
                        {(pokemonDetails.weight / 10).toFixed(1)} kg
                      </p>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statLabel}>Base XP</span>
                      <p className={styles.statMainValue}>{pokemonDetails.base_experience}</p>
                    </div>
                  </div>

                  <div className={styles.detailGrid}>
                    <section className={styles.sectionCard}>
                      <h3 className={styles.sectionTitle}>Abilities</h3>
                      <div className={styles.badgeContainer}>
                        {pokemonDetails.abilities.map((ability) => (
                          <span
                            key={ability.ability.name}
                            className={`${styles.badge} ${styles.abilityBadge}`}
                          >
                            {formatName(ability.ability.name)}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section className={styles.sectionCard}>
                      <h3 className={styles.sectionTitle}>Cry</h3>
                      <div className={styles.audioWrap}>
                        {pokemonDetails.cries?.latest ? (
                          <MiniPlayer
                            audioSrc={pokemonDetails.cries.latest}
                            defaultStyle={"mini"}
                          />
                        ) : (
                          <p className={styles.helperText}>No cry audio available.</p>
                        )}
                      </div>
                    </section>
                  </div>

                  <section className={styles.sectionCard}>
                    <h3 className={styles.sectionTitle}>Base stats</h3>
                    <div className={styles.statsList}>
                      {pokemonDetails.stats.map((stat) => (
                        <div key={stat.stat.name} className={styles.statBar}>
                          <div className={styles.statInfo}>
                            <span className={styles.statName}>
                              {formatName(stat.stat.name)}
                            </span>
                            <span className={styles.statValue}>{stat.base_stat}</span>
                          </div>
                          <div className={styles.statBarContainer}>
                            <div
                              className={styles.statBarFill}
                              style={{
                                width: `${Math.min(100, (stat.base_stat / 255) * 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className={styles.sectionCard}>
                    <h3 className={styles.sectionTitle}>Sprite sheet</h3>
                    <div className={styles.spritesGrid}>
                      {Object.entries(pokemonDetails.sprites).map(([key, value]) => {
                        if (typeof value !== "string" || !value) return null;
                        return (
                          <div key={key} className={styles.spriteTile}>
                            <img
                              src={value}
                              alt={`${selectedPokemon.displayName} ${key}`}
                              className={styles.spriteImage}
                            />
                            <span className={styles.spriteLabel}>{formatName(key)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </>
              ) : (
                <div className={styles.detailsLoader}>
                  <div className={styles.spinner}></div>
                  <p className={styles.loaderText}>Loading details…</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
