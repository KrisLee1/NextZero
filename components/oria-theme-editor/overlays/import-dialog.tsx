import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ReactElement } from "react";
import type { ThemeEditorSession } from "@oriatheme/editor-core";
import { useEditorCopy } from "../use-editor-copy";

const acceptedThemeFiles = ".oria-theme.json,.json,application/json";

export function ImportDialog({ session }: { readonly session: ThemeEditorSession }): ReactElement {
  const copy = useEditorCopy();
  const dialog = useRef<HTMLDialogElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    fileInput.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  const load = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setMessage("");
    void file.text().then(setText).catch(() => setMessage(copy("fileReadError")));
  };
  const commit = (): void => {
    const result = session.replaceFromJson(text);
    if (result.ok) {
      setMessage(copy("imported"));
      dialog.current?.close();
    } else setMessage(result.issues[0]?.message ?? copy("invalidJson"));
  };

  return <>
    <button type="button" aria-label={copy("importThemeJson")} title={copy("import")} onClick={() => setOpen(true)}>
      <svg data-oria-editor-action-icon viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 19h14" /></svg>
      <span data-oria-editor-action-label>{copy("import")}</span>
    </button>
    <dialog ref={dialog} data-oria-editor-dialog data-oria-editor-import onCancel={() => setMessage("")} onClose={() => setOpen(false)}>
      <form method="dialog">
        <header>
          <div><small>{copy("importAtomic")}</small><h2>{copy("importThemeJson")}</h2><p>{copy("importDescription")}</p></div>
          <button data-oria-editor-dialog-close aria-label={copy("closeImport")} value="cancel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
        </header>

        <section data-oria-editor-import-file aria-labelledby="oria-import-file-title">
          <div data-oria-editor-import-file-copy>
            <span data-oria-editor-import-file-icon aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h4l2 2H18.5A1.5 1.5 0 0 1 20 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" /><path d="M12 9v6m-2-2 2 2 2-2" /></svg></span>
            <div><h3 id="oria-import-file-title">{copy("themeFile")}</h3><p>.oria-theme.json or .json</p></div>
          </div>
          <label data-oria-editor-file-picker>
            <input ref={fileInput} className="oria-editor-visually-hidden" type="file" accept={acceptedThemeFiles} onChange={load} />
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m-4 4 4-4 4 4M5 20h14" /></svg>
            <span>{copy("chooseFile")}</span>
          </label>
          <p data-oria-editor-file-name data-selected={Boolean(fileName)} aria-live="polite">{fileName || copy("noFile")}</p>
        </section>

        <div data-oria-editor-import-divider><span>{copy("pasteJson")}</span></div>
        <label data-oria-editor-import-paste>
          <span>{copy("themeJson")}</span>
          <textarea rows={8} spellCheck={false} placeholder={copy("pasteTheme")} value={text} onChange={event => { setText(event.target.value); setFileName(""); setMessage(""); }} />
        </label>
        {message ? <p data-oria-editor-error role="alert">{message}</p> : null}
        <footer><button value="cancel">{copy("cancel")}</button><button data-oria-editor-primary type="button" disabled={!text.trim()} onClick={commit}>{copy("importDraft")}</button></footer>
      </form>
    </dialog>
  </>;
}
