import React, { useEffect, useMemo, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import CSS from "./sort.module.css";

const STORAGE_KEYS = {
  all: "allAgents",
  day: "dayShift",
  night: "nightShift",
};

const DEFAULT_AGENT_NAMES = [
  "Aberna Devi",
  "Amber Fortuin",
  "Azaliah Kroutz",
  "Bianca Mars",
  "Blaine Halford",
  "Boanerges Banze",
  "Britney Mentor",
  "Camerin",
  "Candice Japhta",
  "Carron Smith",
  "Cassidy Dick",
  "Chatwin Van Rooyen",
  "Chris Henn",
  "Dylan Petersen",
  "Evelyn Mbata",
  "Dean Jacobs",
  "Support Desk",
  "Jermaine Barnes",
  "Kauthar Nazier",
  "Kauthara Ahmed",
  "Liam Willenberg",
  "Mikhail Daniels",
  "Mlamli Dube",
  "Naseefah Daniels",
  "Nazneen Parker",
  "Nikita Ross",
  "Prosper Dlamini",
  "Sidney Thomas",
  "Simanye",
  "Sisa Mokoena",
  "Tatum M",
  "Tatum Naidoo",
  "Tauriq Ismail",
  "Thabiso Ndlovu",
  "Thembinkosi Khosa",
  "Tinashe Moyo",
  "Tiyana Jacobs",
  "Tyler Adams",
  "Zita Smith",
  "Ops Leads",
];

const makeAgent = (name, index) => ({ id: `agent-${index + 1}`, name });
const DEFAULT_AGENTS = DEFAULT_AGENT_NAMES.map(makeAgent);

const sanitizeName = (name = "") => {
  const lower = name.toLowerCase().trim();
  if (lower.includes("fresh") && lower.includes("desk")) return "Support Desk";
  if (lower.includes("fica") && lower.includes("leader")) return "Ops Leads";
  return name;
};

const normalizeAgent = (item, index = 0) => {
  const rawName = typeof item === "string"
    ? item
    : item?.name || item?.contact?.name || item?.fullName || `Agent ${index + 1}`;
  const name = sanitizeName(String(rawName).trim());
  const rawId = typeof item === "object" && item !== null ? item.id : undefined;
  return {
    id: rawId ? `agent-${rawId}` : `agent-${index + 1}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
  };
};

const loadStoredList = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    return parsed.map((item, index) => normalizeAgent(item, index));
  } catch {
    return fallback;
  }
};

const uniqueById = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

export default function Sortable() {
  const [allAgents, setAllAgents] = useState(() => loadStoredList(STORAGE_KEYS.all, DEFAULT_AGENTS));
  const [dayShift, setDayShift] = useState(() => loadStoredList(STORAGE_KEYS.day, []));
  const [nightShift, setNightShift] = useState(() => loadStoredList(STORAGE_KEYS.night, []));

  useEffect(() => {
    const mergedIds = new Set([...allAgents, ...dayShift, ...nightShift].map((item) => item.id));
    const fallbackDefaults = DEFAULT_AGENTS.filter((item) => !mergedIds.has(item.id));
    const nextAll = uniqueById([...allAgents, ...fallbackDefaults]).filter(
      (item) => !dayShift.some((entry) => entry.id === item.id) && !nightShift.some((entry) => entry.id === item.id)
    );

    localStorage.setItem(STORAGE_KEYS.all, JSON.stringify(nextAll));
    localStorage.setItem(STORAGE_KEYS.day, JSON.stringify(dayShift));
    localStorage.setItem(STORAGE_KEYS.night, JSON.stringify(nightShift));
  }, [allAgents, dayShift, nightShift]);

  const dayShiftNames = useMemo(() => dayShift.map((item) => item.name), [dayShift]);
  const nightShiftNames = useMemo(() => nightShift.map((item) => item.name), [nightShift]);

  const renderAgentItem = (item) => (
    <button type="button" className={CSS.item} key={item.id}>
      <span className={CSS.agentName}>{item.name}</span>
    </button>
  );

  return (
    <div className={CSS.main_sortable}>
      <div className={CSS.header}>
        <div>
          <p className={CSS.eyebrow}>Shift planner</p>
          <h1>Sortables</h1>
          <p className={CSS.intro}>
            Drag names from the main list into the day or night shift queues. Reorder each queue to reflect roster
            priority while keeping the layout saved locally.
          </p>
        </div>
        <div className={CSS.helperCard}>
          <strong>How this demo works</strong>
          <p>
            The left column stays full height as the source pool. The two shift columns stay fixed in size and scroll
            internally as names are assigned.
          </p>
        </div>
      </div>

      <div className={CSS.board}>
        <section className={`${CSS.listPanel} ${CSS.masterPanel}`}>
          <div className={CSS.panelHead}>
            <h3>Agents</h3>
            <span>{allAgents.length} unassigned</span>
          </div>
          <p className={CSS.panelCopy}>Available names waiting to be assigned to a shift.</p>
          <ReactSortable
            className={CSS.sortable}
            list={allAgents}
            setList={setAllAgents}
            animation={180}
            swapThreshold={0.72}
            group={{ name: "shared", put: true }}
            ghostClass={CSS.ghost}
          >
            {allAgents.map(renderAgentItem)}
          </ReactSortable>
        </section>

        <div className={CSS.shiftStack}>
          <section className={CSS.listPanel}>
            <div className={CSS.panelHead}>
              <h3>Day shift</h3>
              <span>{dayShift.length} assigned</span>
            </div>
            <p className={CSS.panelCopy}>Agents planned for the daytime queue.</p>
            <ReactSortable
              className={CSS.sortable}
              list={dayShift}
              setList={setDayShift}
              animation={180}
              swapThreshold={0.72}
              group={{ name: "shared", put: true }}
              ghostClass={CSS.ghost}
            >
              {dayShift.map(renderAgentItem)}
            </ReactSortable>
          </section>

          <section className={CSS.listPanel}>
            <div className={CSS.panelHead}>
              <h3>Night shift</h3>
              <span>{nightShift.length} assigned</span>
            </div>
            <p className={CSS.panelCopy}>Agents planned for the night queue.</p>
            <ReactSortable
              className={CSS.sortable}
              list={nightShift}
              setList={setNightShift}
              animation={180}
              swapThreshold={0.72}
              group={{ name: "shared", put: true }}
              ghostClass={CSS.ghost}
            >
              {nightShift.map(renderAgentItem)}
            </ReactSortable>
          </section>
        </div>
      </div>

      <div className={CSS.summaryGrid}>
        <div className={CSS.summaryCard}>
          <p className={CSS.summaryLabel}>Plain-language result</p>
          <h4>Day shift roster</h4>
          <p>
            {dayShiftNames.length
              ? `The day shift currently includes ${dayShiftNames.join(", ")}.`
              : "No agents are currently assigned to the day shift."}
          </p>
        </div>
        <div className={CSS.summaryCard}>
          <p className={CSS.summaryLabel}>Plain-language result</p>
          <h4>Night shift roster</h4>
          <p>
            {nightShiftNames.length
              ? `The night shift currently includes ${nightShiftNames.join(", ")}.`
              : "No agents are currently assigned to the night shift."}
          </p>
        </div>
      </div>

      <a className={CSS.libraryLink} href="https://github.com/SortableJS/react-sortablejs" target="_blank" rel="noreferrer">
        View the ReactSortable library documentation ↗
      </a>
    </div>
  );
}
