"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var scripts_exports = {};
__export(scripts_exports, {
  Scripts: () => Scripts
});
module.exports = __toCommonJS(scripts_exports);
const Scripts = {
  gen: 9,
  init() {
    this.modData("Learnsets", "swablu").learnset.willowisp = ["9L1"];
    this.modData("Learnsets", "swablu").learnset.bodypress = ["9L1"];
    this.modData("Learnsets", "swablu").learnset.encore = ["9L1"];
    this.modData("Learnsets", "slugma").learnset.surginglava = ["9L1"];
    delete this.modData("Learnsets", "slugma").learnset.lightscreen;
    delete this.modData("Learnsets", "slugma").learnset.reflect;
    this.modData("Learnsets", "gastly").learnset.drainingkiss = ["9L1"];
    this.modData("Learnsets", "gastly").learnset.psychicnoise = ["9L1"];
    delete this.modData("Learnsets", "gastly").learnset.energyball;
    delete this.modData("Learnsets", "gastly").learnset.dazzlinggleam;
    delete this.modData("Learnsets", "gastly").learnset.nastyplot;
    this.modData("Learnsets", "sprigatito").learnset.flowertrick = ["9L1"];
    this.modData("Learnsets", "sprigatito").learnset.knockoff = ["9L1"];
  }
};
//# sourceMappingURL=scripts.js.map
