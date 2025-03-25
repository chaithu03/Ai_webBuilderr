"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepType = void 0;
var StepType;
(function (StepType) {
    StepType[StepType["CreateFile"] = 0] = "CreateFile";
    StepType[StepType["CreateFolder"] = 1] = "CreateFolder";
    StepType[StepType["EditFile"] = 2] = "EditFile";
    StepType[StepType["DeleteFile"] = 3] = "DeleteFile";
    StepType[StepType["RunScript"] = 4] = "RunScript";
})(StepType || (exports.StepType = StepType = {}));
