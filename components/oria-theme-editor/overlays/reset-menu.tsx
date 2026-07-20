import { useRef, useState } from "react";
import type { ReactElement } from "react";
import type { ResolvedMode } from "@oriatheme/core";
import type { ThemeEditorSession } from "@oriatheme/editor-core";
import { useDetailsDismiss } from "../hooks/use-details-dismiss";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useEditorCopy } from "../use-editor-copy";

type ResetRequest = { readonly label: string; readonly action: () => void };

export function ResetMenu({ session, mode }: { readonly session: ThemeEditorSession; readonly mode: ResolvedMode }): ReactElement {
  const copy = useEditorCopy();
  const menu = useRef<HTMLDetailsElement>(null);
  useDetailsDismiss(menu);
  const [request, setRequest] = useState<ResetRequest>();
  const askToReset = (label: string, action: () => void): void => { menu.current?.removeAttribute("open"); setRequest({ label, action }); };
  const confirmReset = (): void => { request?.action(); setRequest(undefined); };

  return <>
    <details ref={menu} data-oria-editor-menu><summary aria-label={copy("resetDraft")} title={copy("reset")}><svg data-oria-editor-action-icon viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4v6h6M5.5 15a7 7 0 1 0 .8-7.8L4 10" /></svg><span data-oria-editor-action-label>{copy("reset")}</span></summary><div role="menu"><button role="menuitem" type="button" onClick={() => askToReset(copy("modeScope", { mode }), () => session.resetMode(mode))}>{copy("resetMode", { mode })}</button><button role="menuitem" type="button" onClick={() => askToReset(copy("entireDraft"), () => session.resetAll())}>{copy("resetEntire")}</button></div></details>
    <ConfirmationDialog open={request !== undefined} title={copy("resetTitle", { scope: request?.label ?? copy("draft") })} description={copy("resetDescription", { scope: request?.label ?? copy("selectedScope") })} confirmLabel={copy("reset")} onConfirm={confirmReset} onCancel={() => setRequest(undefined)} />
  </>;
}
