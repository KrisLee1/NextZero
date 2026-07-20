"use client";

import { useTranslation } from "react-i18next";

/** Keeps the generated editor's UI copy on the app-wide i18n runtime. */
export function useEditorCopy(): (key: string, values?: Record<string, unknown>) => string {
  const { t } = useTranslation();

  return (key, values) => t(`editor.${key}`, values) as string;
}
