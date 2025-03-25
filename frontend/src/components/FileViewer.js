"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileViewer = FileViewer;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
function FileViewer({ file, onClose }) {
    if (!file)
        return null;
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium text-gray-100">{file.path}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
            <lucide_react_1.X className="w-5 h-5"/>
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[calc(80vh-4rem)]">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
            {file.content || 'No content available'}
          </pre>
        </div>
      </div>
    </div>);
}
