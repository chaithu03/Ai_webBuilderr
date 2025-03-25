"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeEditor = CodeEditor;
const react_1 = __importDefault(require("react"));
const react_2 = __importDefault(require("@monaco-editor/react"));
function CodeEditor({ file }) {
    if (!file) {
        return (<div className="h-full flex items-center justify-center text-gray-400">
        Select a file to view its contents
      </div>);
    }
    return (<react_2.default height="100%" defaultLanguage="typescript" theme="vs-dark" value={file.content || ''} options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
        }}/>);
}
