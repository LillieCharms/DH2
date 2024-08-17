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
  gastly: {
    inherit: true,
    baseStats: { hp: 30, atk: 35, def: 30, spa: 70, spd: 35, spe: 60 },
    abilities: { 0: "Frisk", 1: "Protean", H: "Neutralizing Gas" }
  },
  swablu: {
    inherit: true,
    types: ["Fairy", "Flying"],
    baseStats: { hp: 45, atk: 45, def: 60, spa: 45, spd: 75, spe: 50 },
    abilities: { 0: "Natural Cure", 1: "Scrappy", H: "Pixilate" }
  },
  slugma: {
    inherit: true,
    baseStats: { hp: 30, atk: 40, def: 40, spa: 80, spd: 30, spe: 40 },
    abilities: { 0: "Flame Body", 1: "Weak Armor", H: "Hazard Absorb" }
  },
  sprigatito: {
    inherit: true,
    baseStats: { hp: 40, atk: 65, def: 54, spa: 31, spd: 45, spe: 75 },
    abilities: { 0: "Overgrow", H: "Protean (Gen 7)" }
  }
};
//# sourceMappingURL=pokedex.js.map
