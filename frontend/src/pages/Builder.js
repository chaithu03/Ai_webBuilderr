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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = Builder;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const StepsList_1 = require("../components/StepsList");
const FileExplorer_1 = require("../components/FileExplorer");
const TabView_1 = require("../components/TabView");
const CodeEditor_1 = require("../components/CodeEditor");
const PreviewFrame_1 = require("../components/PreviewFrame");
const types_1 = require("../types");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const steps_1 = require("../steps");
const useWebContainer_1 = require("../hooks/useWebContainer");
const Loader_1 = require("../components/Loader");
const MOCK_FILE_CONTENT = `// This is a sample file content
import React from 'react';

function Component() {
  return <div>Hello World</div>;
}

export default Component;`;
function Builder() {
    const location = (0, react_router_dom_1.useLocation)();
    const { prompt } = location.state;
    const [userPrompt, setPrompt] = (0, react_1.useState)("");
    const [llmMessages, setLlmMessages] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [templateSet, setTemplateSet] = (0, react_1.useState)(false);
    const webcontainer = (0, useWebContainer_1.useWebContainer)();
    const [currentStep, setCurrentStep] = (0, react_1.useState)(1);
    const [activeTab, setActiveTab] = (0, react_1.useState)('code');
    const [selectedFile, setSelectedFile] = (0, react_1.useState)(null);
    const [steps, setSteps] = (0, react_1.useState)([]);
    const [files, setFiles] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        let originalFiles = [...files];
        let updateHappened = false;
        steps.filter(({ status }) => status === "pending").map(step => {
            var _a, _b;
            updateHappened = true;
            if ((step === null || step === void 0 ? void 0 : step.type) === types_1.StepType.CreateFile) {
                let parsedPath = (_b = (_a = step.path) === null || _a === void 0 ? void 0 : _a.split("/")) !== null && _b !== void 0 ? _b : []; // ["src", "components", "App.tsx"]
                let currentFileStructure = [...originalFiles]; // {}
                let finalAnswerRef = currentFileStructure;
                let currentFolder = "";
                while (parsedPath.length) {
                    currentFolder = `${currentFolder}/${parsedPath[0]}`;
                    let currentFolderName = parsedPath[0];
                    parsedPath = parsedPath.slice(1);
                    if (!parsedPath.length) {
                        // final file
                        let file = currentFileStructure.find(x => x.path === currentFolder);
                        if (!file) {
                            currentFileStructure.push({
                                name: currentFolderName,
                                type: 'file',
                                path: currentFolder,
                                content: step.code
                            });
                        }
                        else {
                            file.content = step.code;
                        }
                    }
                    else {
                        /// in a folder
                        let folder = currentFileStructure.find(x => x.path === currentFolder);
                        if (!folder) {
                            // create the folder
                            currentFileStructure.push({
                                name: currentFolderName,
                                type: 'folder',
                                path: currentFolder,
                                children: []
                            });
                        }
                        currentFileStructure = currentFileStructure.find(x => x.path === currentFolder).children;
                    }
                }
                originalFiles = finalAnswerRef;
            }
        });
        if (updateHappened) {
            setFiles(originalFiles);
            setSteps(steps => steps.map((s) => {
                return Object.assign(Object.assign({}, s), { status: "completed" });
            }));
        }
        console.log(files);
    }, [steps, files]);
    (0, react_1.useEffect)(() => {
        const createMountStructure = (files) => {
            const mountStructure = {};
            const processFile = (file, isRootFolder) => {
                if (file.type === 'folder') {
                    // For folders, create a directory entry
                    mountStructure[file.name] = {
                        directory: file.children ?
                            Object.fromEntries(file.children.map(child => [child.name, processFile(child, false)]))
                            : {}
                    };
                }
                else if (file.type === 'file') {
                    if (isRootFolder) {
                        mountStructure[file.name] = {
                            file: {
                                contents: file.content || ''
                            }
                        };
                    }
                    else {
                        // For files, create a file entry with contents
                        return {
                            file: {
                                contents: file.content || ''
                            }
                        };
                    }
                }
                return mountStructure[file.name];
            };
            // Process each top-level file/folder
            files.forEach(file => processFile(file, true));
            return mountStructure;
        };
        const mountStructure = createMountStructure(files);
        // Mount the structure if WebContainer is available
        console.log(mountStructure);
        webcontainer === null || webcontainer === void 0 ? void 0 : webcontainer.mount(mountStructure);
    }, [files, webcontainer]);
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(`${config_1.BACKEND_URL}/template`, {
                prompt: prompt.trim()
            });
            setTemplateSet(true);
            const { prompts, uiPrompts } = response.data;
            setSteps((0, steps_1.parseXml)(uiPrompts[0]).map((x) => (Object.assign(Object.assign({}, x), { status: "pending" }))));
            setLoading(true);
            const stepsResponse = yield axios_1.default.post(`${config_1.BACKEND_URL}/chat`, {
                messages: [...prompts, prompt].map(content => ({
                    role: "user",
                    content
                }))
            });
            setLoading(false);
            setSteps(s => [...s, ...(0, steps_1.parseXml)(stepsResponse.data.response).map(x => (Object.assign(Object.assign({}, x), { status: "pending" })))]);
            setLlmMessages([...prompts, prompt].map(content => ({
                role: "user",
                content
            })));
            setLlmMessages(x => [...x, { role: "assistant", content: stepsResponse.data.response }]);
        });
    }
    (0, react_1.useEffect)(() => {
        init();
    }, []);
    return (<div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-100">Website Builder</h1>
        <p className="text-sm text-gray-400 mt-1">Prompt: {prompt}</p>
      </header>
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-4 gap-6 p-6">
          <div className="col-span-1 space-y-6 overflow-auto">
            <div>
              <div className="max-h-[75vh] overflow-scroll">
                <StepsList_1.StepsList steps={steps} currentStep={currentStep} onStepClick={setCurrentStep}/>
              </div>
              <div>
                <div className='flex'>
                  <br />
                  {(loading || !templateSet) && <Loader_1.Loader />}
                  {!(loading || !templateSet) && <div className='flex'>
                    <textarea value={userPrompt} onChange={(e) => {
                setPrompt(e.target.value);
            }} className='p-2 w-full'></textarea>
                  <button onClick={() => __awaiter(this, void 0, void 0, function* () {
                const newMessage = {
                    role: "user",
                    content: userPrompt
                };
                setLoading(true);
                const stepsResponse = yield axios_1.default.post(`${config_1.BACKEND_URL}/chat`, {
                    messages: [...llmMessages, newMessage]
                });
                setLoading(false);
                setLlmMessages(x => [...x, newMessage]);
                setLlmMessages(x => [...x, {
                        role: "assistant",
                        content: stepsResponse.data.response
                    }]);
                setSteps(s => [...s, ...(0, steps_1.parseXml)(stepsResponse.data.response).map(x => (Object.assign(Object.assign({}, x), { status: "pending" })))]);
            })} className='bg-purple-400 px-4'>Send</button>
                  </div>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
              <FileExplorer_1.FileExplorer files={files} onFileSelect={setSelectedFile}/>
            </div>
          <div className="col-span-2 bg-gray-900 rounded-lg shadow-lg p-4 h-[calc(100vh-8rem)]">
            <TabView_1.TabView activeTab={activeTab} onTabChange={setActiveTab}/>
            <div className="h-[calc(100%-4rem)]">
              {activeTab === 'code' ? (<CodeEditor_1.CodeEditor file={selectedFile}/>) : (<PreviewFrame_1.PreviewFrame webContainer={webcontainer} files={files}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
