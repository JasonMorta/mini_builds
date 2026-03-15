/*
  PokemonViewer.jsx
  - Uses the local sprite sheet manifest for the card list so the full grid can render without hitting the API.
  - Filters by name prefix only.
  - Calls the PokéAPI only after the user selects a Pokémon card.
*/
import { useMemo, useState } from "react";
import styles from "./PokemonViewer.module.css";
import MiniPlayer from "../../audioPlayer/MiniPlayer";
import typeColors from "./TypeColors";
import localPokemonManifest from "./localPokemonManifest";

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
  const [searchValue, setSearchValue] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const filteredPokemon = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return localPokemonManifest;

    // Prefix-only filtering keeps the result set aligned with the requested behavior.
    return localPokemonManifest.filter((entry) =>
      entry.slug.toLowerCase().startsWith(query)
    );
  }, [searchValue]);

  const fetchPokemonDetails = async (slug) => {
    setDetailsLoading(true);
    setDetailsError(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
      if (!response.ok) {
        throw new Error("Pokémon details request failed.");
      }
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      setDetailsError("Could not load that Pokémon's full details right now.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const openModal = (entry) => {
    setSelectedPokemon(entry);
    setPokemonDetails(null);
    setDetailsError(null);
    fetchPokemonDetails(entry.slug);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setPokemonDetails(null);
    setDetailsLoading(false);
    setDetailsError(null);
  };

  const totalCountLabel = `${filteredPokemon.length} of ${localPokemonManifest.length} Pokémon`;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Pokédex mini build</p>
          <h1 className={styles.title}>Pokémon Explorer</h1>
          <p className={styles.subtitle}>
            Browse the full local sprite list instantly, then open any card to pull
            live stats, cries, artwork, and battle details from the API.
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
              placeholder="Try b, bul, char..."
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

      {filteredPokemon.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No Pokémon match that starting text.</h2>
          <p>Prefix filtering is active, so results must start with what you type.</p>
        </div>
      ) : (
        <div className={styles.pokemonGrid}>
          {filteredPokemon.map((entry, index) => (
            <button
              type="button"
              key={entry.slug}
              onClick={() => openModal(entry)}
              className={styles.pokemonCard}
            >
              <div className={styles.cardTopRow}>
                <span className={styles.cardNumber}>#{index + 1}</span>
              </div>
              <div className={styles.imageContainer}>
                <img
                  loading="lazy"
                  src={entry.spritePath}
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
                  <span className={styles.pokemonIdBadge}>
                    {pokemonDetails?.id ? `#${pokemonDetails.id}` : selectedPokemon.displayName}
                  </span>
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
                    <img
                      src={selectedPokemon.spritePath}
                      alt={selectedPokemon.displayName}
                      className={styles.modalImage}
                    />
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
