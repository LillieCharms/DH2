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
    baseStats: { hp: 100, atk: 80, def: 90, spa: 165, spd: 110, spe: 135 },
    abilities: { 0: "Cute Charm" },
    weightkg: 50
  },
  ben: {
    num: 2002,
    name: "Ben",
    types: ["Electric", "Dark"],
    gender: "M",
    baseStats: { hp: 80, atk: 135, def: 95, spa: 130, spd: 89, spe: 151 },
    abilities: { 0: "Anger Point", 1: "Harmful Mental", H: "Ben Mode" },
    weightkg: 80
  },
  benmode: {
    num: 2002,
    name: "Ben-Ben",
    baseSpecies: "Ben",
    forme: "Ben Mode",
    types: ["Electric", "Psychic"],
    gender: "M",
    baseStats: { hp: 80, atk: 151, def: 100, spa: 135, spd: 94, spe: 151 },
    abilities: { 0: "Ben Mode" },
    weightkg: 75
  },
  zeya: {
    num: 2003,
    name: "Zeya",
    types: ["Steel"],
    gender: "M",
    baseStats: { hp: 135, atk: 105, def: 110, spa: 95, spd: 110, spe: 110 },
    abilities: { 0: "Battle Armor", 1: "Halal Trip", H: "Anticipated Strikes" },
    weightkg: 75
  }
};
//# sourceMappingURL=pokedex.js.map
