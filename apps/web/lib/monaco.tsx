import { configureDefaultWorkerFactory } from 'monaco-languageclient/workerFactory';
import type { MonacoVscodeApiConfig } from 'monaco-languageclient/vscodeApiWrapper';
import type { LanguageClientConfig } from 'monaco-languageclient/lcwrapper';
import type { EditorAppConfig } from 'monaco-languageclient/editorApp';

const languageId = 'mylang';
const code = '// initial editor content';
const codeUri = '/workspace/hello.mylang';

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

