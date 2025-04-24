// PokemonViewer.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./PokemonViewer.module.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import MiniPlayer from "../../audioPlayer/MiniPlayer";
import typeColors from "./TypeColors";

export default function PokemonViewer() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastPokemonElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // Load Pokémon list
  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const limit = 20;
        const offset = (page - 1) * limit;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();

        // Check if we've reached the end
        if (data.results.length === 0) {
          setHasMore(false);
          return;
        }

        // Get ID from URL
        const pokemonWithIds = data.results.map((p) => {
          const segments = p.url.split("/");
          const id = segments[segments.length - 2];
          return {
            ...p,
            id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });

        setPokemon((prev) => [...prev, ...pokemonWithIds]);
      } catch (err) {
        setError("Failed to fetch Pokémon. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [page]);

  // Fetch Pokémon details when modal is opened
  const fetchPokemonDetails = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemonDetails(data);
      console.log("data", data);
    } catch (err) {
      console.error("Error fetching Pokémon details:", err);
    }
  };

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    console.log("pokemonDetails", pokemonDetails);
    setModalVisible(true);
    fetchPokemonDetails(pokemon.id);
  };

  const closeModal = () => {
    setModalVisible(false);
    setPokemonDetails(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pokémon Explorer</h1>
        <p className={styles.subtitle}>Gotta catch 'em all!</p>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.pokemonGrid}>
        {pokemon.map((poke, index) => {
          const cardProps = {
            key: poke.id + index,
            onClick: () => openModal(poke),
            className: styles.pokemonCard,
          };

          if (pokemon.length === index + 1) {
            cardProps.ref = lastPokemonElementRef;
          }

          return (
            <div {...cardProps}>
              <div className={styles.imageContainer}>
                <img
                  loading="lazy"
                  src={poke.imageUrl}
                  alt={poke.name}
                  className={styles.pokemonImage}
                />
              </div>
              <div className={styles.cardFooter}>
                <h2 className={styles.pokemonName}>{poke.name}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {isLoading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p className={styles.loaderText}>Loading more Pokémon...</p>
        </div>
      )}

      {/* Modal */}
      {modalVisible && selectedPokemon && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button onClick={closeModal} className={styles.closeButton}>
              &times;
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderTitle}>
                <h2 className={styles.modalTitle}>{selectedPokemon.name}</h2>
                <div className={styles.pokemonIdBadge}>
                  <span>#{selectedPokemon.id}</span>
                </div>
              </div>

              {pokemonDetails ? (
                <img
                  src={
                    pokemonDetails.sprites.other["official-artwork"]
                      .front_default || pokemonDetails.sprites.front_default
                  }
                  alt={selectedPokemon.name}
                  className={styles.modalImage}
                />
              ) : (
                <div className={styles.modalImagePlaceholder}>
                  <div className={styles.spinner}></div>
                </div>
              )}
            </div>

            <div className={styles.modalBody}>
              {pokemonDetails ? (
                <div>
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <h3 className={styles.statLabel}>Height</h3>
                      <p>{(pokemonDetails.height / 10).toFixed(1)} m</p>
                    </div>
                    <div className={styles.statCard}>
                      <h3 className={styles.statLabel}>Weight</h3>
                      <p>{(pokemonDetails.weight / 10).toFixed(1)} kg</p>
                    </div>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Types</h3>
                    <div className={styles.badgeContainer}>
                      {pokemonDetails.types.map((type) => (
                        <span
                          style={{ 
                            backgroundColor: (() => {
                              const match = typeColors.find(({ name }) => 
                                name.toLocaleLowerCase() === type.type.name.toLocaleLowerCase()
                              );
                              return match ? match.color : "transparent";
                            })()
                          }}
                          key={type.type.name}
                          className={`${styles.badge} ${styles.typeBadge}`}
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Abilities</h3>
                    <div className={styles.badgeContainer}>
                      {pokemonDetails.abilities.map((ability) => (
                        <span
                          key={ability.ability.name}
                          className={`${styles.badge} ${styles.abilityBadge}`}
                        >
                          {ability.ability.name.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Cries</h3>
                    <div className={styles.cries}>
                      {pokemonDetails ? (
                        pokemonDetails.cries.latest && (
                          <MiniPlayer
                            audioSrc={pokemonDetails.cries.latest}
                            defaultStyle={"mini"}
                          />
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Stats</h3>
                    {pokemonDetails.stats.map((stat) => (
                      <div key={stat.stat.name} className={styles.statBar}>
                        <div className={styles.statInfo}>
                          <span className={styles.statName}>
                            {stat.stat.name.replace("-", " ")}
                          </span>
                          <span className={styles.statValue}>
                            {stat.base_stat}
                          </span>
                        </div>
                        <div className={styles.statBarContainer}>
                          <div
                            className={styles.statBarFill}
                            style={{
                              width: `${Math.min(
                                100,
                                (stat.base_stat / 255) * 100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sprites section */}
                  {pokemonDetails.sprites && (
                    <div className={styles.section}>
                      <h3 className={styles.sectionTitle}>Sprites</h3>
                      <div className={styles.spritesGrid}>
                        {Object.entries(pokemonDetails.sprites).map(
                          ([key, value]) => {
                            if (typeof value === "string") {
                              return (
                                <img
                                  key={key}
                                  src={value}
                                  alt={`${selectedPokemon.name} ${key}`}
                                  className={styles.spriteImage}
                                />
                              );
                            }
                            return null;
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.detailsLoader}>
                  <div className={styles.spinner}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
