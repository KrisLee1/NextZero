import { useRef } from "react";
import type { ReactElement } from "react";
import type { ContrastDiagnostic, ValidationIssue } from "@oriatheme/core";
import { useDetailsDismiss } from "../hooks/use-details-dismiss";
import { useEditorCopy } from "../use-editor-copy";

type ValidationHealth = "ready" | "warning" | "error";

export function IssuesPopover({ issues, warnings }: { readonly issues: readonly ValidationIssue[]; readonly warnings: readonly ContrastDiagnostic[] }): ReactElement {
  const copy = useEditorCopy();
  const menu = useRef<HTMLDetailsElement>(null);
  useDetailsDismiss(menu);
  const health: ValidationHealth = issues.length > 0 ? "error" : warnings.length > 0 ? "warning" : "ready";
  const label = health === "error"
    ? `${copy("errors", { count: issues.length })}${warnings.length > 0 ? ` · ${copy("warnings", { count: warnings.length })}` : ""}`
    : health === "warning" ? copy("warnings", { count: warnings.length }) : copy("noIssues");
  const accessibleLabel = health === "ready" ? copy("noThemeIssues") : copy("validation", { label });

  return <details ref={menu} data-oria-editor-menu data-oria-editor-health={health}>
    <summary aria-label={accessibleLabel} title={label}>
      <svg data-oria-editor-action-icon viewBox="0 0 24 24" aria-hidden="true">
        {health === "ready" ? <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>
          : health === "warning" ? <><path d="M12 3 2.8 20h18.4z" /><path d="M12 9v5m0 3h.01" /></>
          : <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v6m0 3h.01" /></>}
      </svg>
      <span data-oria-editor-action-label>{label}</span>
    </summary>
    <div data-oria-editor-issues>{health !== "ready" ? <>
      {issues.map((issue, index) => <p key={`e-${index}`}><strong>{copy("error")}</strong> {issue.path}<br />{issue.message}</p>)}
      {warnings.map((warning, index) => <p key={`w-${index}`}><strong>{copy("warning")}</strong> {warning.pair}<br />{warning.message}</p>)}
    </> : <p>{copy("passesValidation")}</p>}</div>
  </details>;
}
