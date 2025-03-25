"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepsList = StepsList;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
function StepsList({ steps, currentStep, onStepClick }) {
    return (<div className="bg-gray-900 rounded-lg shadow-lg p-4 h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Build Steps</h2>
      <div className="space-y-4">
        {steps.map((step) => (<div key={step.id} className={`p-1 rounded-lg cursor-pointer transition-colors ${currentStep === step.id
                ? 'bg-gray-800 border border-gray-700'
                : 'hover:bg-gray-800'}`} onClick={() => onStepClick(step.id)}>
            <div className="flex items-center gap-2">
              {step.status === 'completed' ? (<lucide_react_1.CheckCircle className="w-5 h-5 text-green-500"/>) : step.status === 'in-progress' ? (<lucide_react_1.Clock className="w-5 h-5 text-blue-400"/>) : (<lucide_react_1.Circle className="w-5 h-5 text-gray-600"/>)}
              <h3 className="font-medium text-gray-100">{step.title}</h3>
            </div>
            <p className="text-sm text-gray-400 mt-2">{step.description}</p>
          </div>))}
      </div>
    </div>);
}
