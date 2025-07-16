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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`mongodb+srv://book_management:book_management@cluster0.aif7qmj.mongodb.net/tour-management?retryWrites=true&w=majority&appName=Cluster0`)
                .then(() => {
                console.log('Connected to mongodb');
            });
            server = app_1.app.listen(5000, () => {
                console.log('This is running on the port 5000');
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
process.on('unhandledRejection', error => {
    console.log("unhandled rejection and it is shutting down", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
        process.exit(1);
    }
});
Promise.reject(new Error('I forgot to catch this promise'));
/** Error handling
 *
 * unhandled rejection error
 * uncaught error
 * signal termination or sigterm
 */
