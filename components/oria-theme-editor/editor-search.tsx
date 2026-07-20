import type { ReactElement } from "react";
import { useEditorCopy } from "./use-editor-copy";

export function EditorSearch({ value, onChange }: { readonly value: string; readonly onChange: (value: string) => void }): ReactElement {
  const copy = useEditorCopy();
  return <label data-oria-editor-search data-has-value={Boolean(value) || undefined}>
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
    <span className="oria-editor-visually-hidden">{copy("searchTokens")}</span>
    <input type="search" placeholder={copy("searchPlaceholder")} value={value} onChange={event => onChange(event.target.value)} onKeyDown={event => { if (event.key === "Escape" && value) { event.preventDefault(); onChange(""); } }} />
  </label>;
}
