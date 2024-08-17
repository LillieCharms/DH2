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
  athleetah: {
    num: 3002,
    name: "Athleetah",
    types: ["Normal", "Ground"],
    baseStats: { hp: 65, atk: 80, def: 65, spa: 65, spd: 65, spe: 145 },
    abilities: { 0: "Sprinter", 1: "Limber", H: "Quick Feet" },
    heightm: 1.6,
    weightkg: 45,
    color: "Yellow",
    eggGroups: ["Field", "Human-Like"],
    gen: 8
  }
};
//# sourceMappingURL=pokedex.js.map
