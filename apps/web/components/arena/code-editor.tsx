"use client"

import { configureDefaultWorkerFactory } from 'monaco-languageclient/workerFactory';
import type { MonacoVscodeApiConfig } from 'monaco-languageclient/vscodeApiWrapper';
import type { LanguageClientConfig } from 'monaco-languageclient/lcwrapper';
import type { EditorAppConfig } from 'monaco-languageclient/editorApp';
import { useTheme } from "next-themes"
import { MonacoEditorReactComp } from '@typefox/monaco-editor-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Button } from "@repo/ui/components/button";
import { RotateCcw } from "lucide-react"

type Language = "CPP" | "PYTHON" | "JAVA" | "JAVASCRIPT" | "TYPESCRIPT" | "GO" | "RUST";

const languageLabels: Record<Language, string> = {
  CPP: "C++",
  PYTHON: "Python",
  JAVA: "Java",
  JAVASCRIPT: "JavaScript",
  GO: "Go",
  RUST: "Rust",
  TYPESCRIPT: "Typescript"
}

const monacoLanguages: Record<Language, string> = {
  CPP: "cpp",
  PYTHON: "python",
  JAVA: "java",
  JAVASCRIPT: "javascript",
  GO: "Go",
  RUST: "Rust",
  TYPESCRIPT: "Typescript"
}

interface CodeEditorProps {
  code: string
  onChange: (value: string) => void
  language: Language
  onLanguageChange: (lang: Language) => void
}

export function CodeEditor({ code, onChange, language, onLanguageChange }: CodeEditorProps) {
  const { theme } = useTheme()


  const vscodeApiConfig: MonacoVscodeApiConfig = {
    $type: 'extended',
    viewsConfig: {
      $type: 'EditorService'
    },
    userConfiguration: {
      json: JSON.stringify({
        'workbench.colorTheme': 'Default Dark Modern',
        'editor.wordBasedSuggestions': 'off'
      })
    },
    monacoWorkerFactory: configureDefaultWorkerFactory
  };

  // Language client configuration
  const languageClientConfig: LanguageClientConfig = {
    languageId,
    connection: {
      options: {
        $type: 'WebSocketUrl',
        // at this url the language server for myLang must be reachable
        url: 'ws://localhost:30000/myLangLS'
      }
    },
    clientOptions: {
      documentSelector: [languageId],
    }
  };

  // editor app / monaco-editor configuration
  const editorAppConfig: EditorAppConfig = {
    codeResources: {
      main: {
        text: code,
        uri: codeUri
      }
    }
  };


  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <Select value={language} onValueChange={(v) => onLanguageChange(v as Language)}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(languageLabels) as Language[]).map((lang) => (
              <SelectItem key={lang} value={lang}>
                {languageLabels[lang]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <RotateCcw className="h-3 w-3" />
          Reset
        </Button>
      </div>
      <div className="flex-1">
        <MonacoEditorReactComp
          vscodeApiConfig={vscodeApiConfig}
          editorAppConfig={editorAppConfig}
          languageClientConfig={languageClientConfig}
          onError={(e: any) => {
            console.error(e);
          }} />
      </div>
    </div>
  )
}
