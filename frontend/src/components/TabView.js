"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabView = TabView;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
function TabView({ activeTab, onTabChange }) {
    return (<div className="flex space-x-2 mb-4">
      <button onClick={() => onTabChange('code')} className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'code'
            ? 'bg-gray-700 text-gray-100'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}>
        <lucide_react_1.Code2 className="w-4 h-4"/>
        Code
      </button>
      <button onClick={() => onTabChange('preview')} className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'preview'
            ? 'bg-gray-700 text-gray-100'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}>
        <lucide_react_1.Eye className="w-4 h-4"/>
        Preview
      </button>
    </div>);
}
