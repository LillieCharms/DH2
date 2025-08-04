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
var pokedex_exports = {};
__export(pokedex_exports, {
  Pokedex: () => Pokedex
});
module.exports = __toCommonJS(pokedex_exports);
const Pokedex = {
  stonjourner: {
    inherit: true,
    otherFormes: ["Stonjourner-Mega"],
    formeOrder: ["Stonjourner", "Stonjourner-Mega"]
  },
  stonjournermega: {
    num: 874,
    name: "Stonjourner-Mega",
    baseSpecies: "Stonjourner",
    forme: "Mega",
    types: ["Rock"],
    baseStats: { hp: 100, atk: 125, def: 135, spa: 20, spd: 20, spe: 70 },
    abilities: { 0: "Cosmic Energy" },
    heightm: 2.5,
    weightkg: 520,
    color: "Gray",
    eggGroups: ["Mineral"],
    requiredItem: "Stonjournerite"
  }
};
//# sourceMappingURL=pokedex.js.map
