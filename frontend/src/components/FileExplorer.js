"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileExplorer = FileExplorer;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
function FileNode({ item, depth, onFileClick }) {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const handleClick = () => {
        if (item.type === 'folder') {
            setIsExpanded(!isExpanded);
        }
        else {
            onFileClick(item);
        }
    };
    return (<div className="select-none">
      <div className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md cursor-pointer" style={{ paddingLeft: `${depth * 1.5}rem` }} onClick={handleClick}>
        {item.type === 'folder' && (<span className="text-gray-400">
            {isExpanded ? (<lucide_react_1.ChevronDown className="w-4 h-4"/>) : (<lucide_react_1.ChevronRight className="w-4 h-4"/>)}
          </span>)}
        {item.type === 'folder' ? (<lucide_react_1.FolderTree className="w-4 h-4 text-blue-400"/>) : (<lucide_react_1.File className="w-4 h-4 text-gray-400"/>)}
        <span className="text-gray-200">{item.name}</span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (<div>
          {item.children.map((child, index) => (<FileNode key={`${child.path}-${index}`} item={child} depth={depth + 1} onFileClick={onFileClick}/>))}
        </div>)}
    </div>);
}
function FileExplorer({ files, onFileSelect }) {
    return (<div className="bg-gray-900 rounded-lg shadow-lg p-4 h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-100">
        <lucide_react_1.FolderTree className="w-5 h-5"/>
        File Explorer
      </h2>
      <div className="space-y-1">
        {files.map((file, index) => (<FileNode key={`${file.path}-${index}`} item={file} depth={0} onFileClick={onFileSelect}/>))}
      </div>
    </div>);
}
