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
  charms: {
    num: 2e3,
    name: "Charms",
    types: ["Water", "Fairy"],
    gender: "F",
    baseStats: { hp: 120, atk: 80, def: 100, spa: 130, spd: 107, spe: 143 },
    abilities: { 0: "Victory Star", H: "Starstruck Veil" },
    weightkg: 70
  },
  diantha: {
    num: 2001,
    name: "Diantha",
    types: ["Fairy"],
    gender: "F",
    baseStats: { hp: 100, atk: 85, def: 90, spa: 165, spd: 105, spe: 135 },
    abilities: { 0: "Cute Charm" },
    weightkg: 50
  }
};
//# sourceMappingURL=pokedex.js.map
