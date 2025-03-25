"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebContainer = useWebContainer;
const react_1 = require("react");
const api_1 = require("@webcontainer/api");
function useWebContainer() {
    const [webcontainer, setWebcontainer] = (0, react_1.useState)();
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            const webcontainerInstance = yield api_1.WebContainer.boot();
            setWebcontainer(webcontainerInstance);
        });
    }
    (0, react_1.useEffect)(() => {
        main();
    }, []);
    return webcontainer;
}
