import type { CSSProperties, ReactElement } from "react";
import type { ShadowLayer } from "@oriatheme/core";
import { previewColor } from "../fields/color-utils";
import { useEditorCopy } from "../use-editor-copy";

type LayerKey = "x" | "y" | "blur" | "spread" | "color";
export function ShadowLayerEditor({ layer, index, onChange, onDelete }: { readonly layer: ShadowLayer; readonly index: number; readonly onChange: (layer: ShadowLayer) => void; readonly onDelete: () => void }): ReactElement {
  const copy = useEditorCopy();
  const fieldLabels: Readonly<Record<LayerKey, string>> = { color: copy("shadowFields.color"), x: copy("shadowFields.x"), y: copy("shadowFields.y"), blur: copy("shadowFields.blur"), spread: copy("shadowFields.spread") };
  const field = (key: LayerKey, wide = false): ReactElement => <label data-wide={wide || undefined}>
    <span>{fieldLabels[key]}</span>
    <input aria-label={`Layer ${index + 1} ${fieldLabels[key]}`} value={layer[key]} onChange={event => onChange({ ...layer, [key]: event.target.value })} spellCheck={false} />
  </label>;
  const swatchStyle = { "--oria-editor-color-preview": previewColor(layer.color) } as CSSProperties;

  return <fieldset data-oria-editor-shadow-layer>
    <legend className="oria-editor-visually-hidden">{copy("shadowLayer", { count: index + 1 })}</legend>
    <header>
      <span data-oria-editor-shadow-swatch style={swatchStyle} aria-hidden="true" />
      <span><strong>{copy("shadowLayer", { count: index + 1 })}</strong><small>{layer.inset ? copy("innerShadow") : copy("outerShadow")}</small></span>
      <button type="button" onClick={onDelete} aria-label={copy("deleteLayer", { count: index + 1 })} title={copy("deleteLayerTitle")}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" /></svg>
      </button>
    </header>
    <div data-oria-editor-shadow-layer-fields>
      {field("color", true)}
      {field("x")}
      {field("y")}
      {field("blur")}
      {field("spread")}
    </div>
    <label data-oria-editor-shadow-inset>
      <input type="checkbox" checked={Boolean(layer.inset)} onChange={event => onChange({ ...layer, inset: event.target.checked })} />
      <span aria-hidden="true" />
      <strong>{copy("insetShadow")}</strong>
    </label>
  </fieldset>;
}
