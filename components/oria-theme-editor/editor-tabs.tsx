import { useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactElement } from "react";
import type { ValidationIssue } from "@oriatheme/core";
import { motion, useReducedMotion } from "motion/react";
import type { EditorTabId, EditorTabLayout } from "./editor-layout";
import { useEditorCopy } from "./use-editor-copy";

export function EditorTabs({ tabs, active, onChange, issues }: { readonly tabs: readonly EditorTabLayout[]; readonly active: EditorTabId; readonly onChange: (tab: EditorTabId) => void; readonly issues: readonly ValidationIssue[] }): ReactElement {
  const copy = useEditorCopy();
  const reduceMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef(new Map<EditorTabId, HTMLButtonElement>());
  const [indicator, setIndicator] = useState<{ x: number; width: number } | undefined>();
  useLayoutEffect(() => {
    const nav = navRef.current;
    const button = tabRefs.current.get(active);
    if (!nav || !button) return;
    const update = (): void => {
      const navBounds = nav.getBoundingClientRect();
      const buttonBounds = button.getBoundingClientRect();
      setIndicator({ x: buttonBounds.left - navBounds.left + nav.scrollLeft, width: buttonBounds.width });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    observer.observe(button);
    nav.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); nav.removeEventListener("scroll", update); };
  }, [active, tabs]);
  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number): void => {
    let next = index; if (event.key === "ArrowRight") next = (index + 1) % tabs.length; else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length; else if (event.key === "Home") next = 0; else if (event.key === "End") next = tabs.length - 1; else return;
    event.preventDefault(); const candidate = tabs[next]!; onChange(candidate.id); event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  };
  return <nav ref={navRef} data-oria-editor-tabs role="tablist" aria-label={copy("themeCategories")}>{tabs.map((tab, index) => {
    const count = issues.filter(issue => tab.panels.some(panel => panel.prefixes?.some(prefix => issue.path?.includes(prefix)) || panel.paths?.some(path => issue.path?.endsWith(path)))).length;
    const selected = active === tab.id;
    return <button ref={node => { if (node) tabRefs.current.set(tab.id, node); else tabRefs.current.delete(tab.id); }} type="button" role="tab" id={`oria-tab-${tab.id}`} aria-selected={selected} tabIndex={selected ? 0 : -1} key={tab.id} onClick={() => onChange(tab.id)} onKeyDown={event => move(event, index)}>{copy(`tabs.${tab.id}`)}{count ? <span aria-label={copy("issues", { count })}>{count}</span> : null}</button>;
  })}{indicator ? <motion.span data-oria-editor-tab-indicator aria-hidden="true" initial={false} animate={{ x: indicator.x, width: indicator.width }} transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} /> : null}</nav>;
}
