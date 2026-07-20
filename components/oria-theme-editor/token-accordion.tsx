import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import type { ResolvedMode } from "@oriatheme/core";
import type { ThemeEditorSession, ThemeEditorSnapshot, TokenFieldDescriptor } from "@oriatheme/editor-core";
import type { EditorPanelLayout } from "./editor-layout";
import { TokenField } from "./token-field";
import { useEditorCopy } from "./use-editor-copy";

export function TokenAccordion({ panel, fields, mode, snapshot, session, reveal }: { readonly panel: EditorPanelLayout; readonly fields: readonly TokenFieldDescriptor[]; readonly mode: ResolvedMode; readonly snapshot: ThemeEditorSnapshot; readonly session: ThemeEditorSession; readonly reveal: boolean }): ReactElement {
  const copy = useEditorCopy();
  const [open, setOpen] = useState(true);
  const issueCount = snapshot.issues.filter(issue => fields.some(field => issue.path?.endsWith(field.path))).length;
  useEffect(() => { if (reveal) setOpen(true); }, [reveal]);

  return <section data-oria-editor-accordion data-open={open} data-compact>
    <button type="button" aria-expanded={open} aria-controls={`oria-panel-${panel.id}`} onClick={() => setOpen(value => !value)}>
      <span><strong>{copy(`panels.${panel.id}`)}</strong></span>
      <span>{issueCount ? copy("issues", { count: issueCount }) : null}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5" /></svg></span>
    </button>
    <div id={`oria-panel-${panel.id}`} hidden={!open}>
      {fields.map(field => <TokenField key={field.path} field={field} mode={mode} value={snapshot.draft.modes[mode][field.path]} issue={snapshot.issues.find(issue => issue.path?.endsWith(field.path))?.message} modified={snapshot.dirty} session={session} />)}
    </div>
  </section>;
}
