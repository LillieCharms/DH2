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
  sceptile: {
    num: 1001,
    name: "Sceptile",
    types: ["Grass", "Ground"],
    genderRatio: { M: 0.875, F: 0.125 },
    baseStats: { hp: 80, atk: 105, def: 75, spa: 65, spd: 85, spe: 120 },
    abilities: { 0: "Overflow" },
    heightm: 1.7,
    weightkg: 52.2,
    color: "Green",
    prevo: "Grovyle",
    evoLevel: 36,
    eggGroups: ["Monster", "Dragon"],
    otherFormes: ["Sceptile-Mega"],
    formeOrder: ["Sceptile", "Sceptile-Mega"]
  },
  charizard: {
    num: 1002,
    name: "Charizard",
    types: ["Fire", "Flying"],
    genderRatio: { M: 0.875, F: 0.125 },
    baseStats: { hp: 78, atk: 74, def: 73, spa: 114, spd: 85, spe: 110 },
    abilities: { 0: "Graze" },
    heightm: 1.7,
    weightkg: 90.5,
    color: "Red",
    prevo: "Charmeleon",
    evoLevel: 36,
    eggGroups: ["Monster", "Dragon"],
    otherFormes: ["Charizard-Mega-X", "Charizard-Mega-Y"],
    formeOrder: ["Charizard", "Charizard-Mega-X", "Charizard-Mega-Y"],
    canGigantamax: "G-Max Wildfire"
  },
  inteleon: {
    num: 1003,
    name: "Inteleon",
    types: ["Water", "Poison"],
    genderRatio: { M: 0.875, F: 0.125 },
    baseStats: { hp: 82, atk: 122, def: 74, spa: 74, spd: 90, spe: 88 },
    abilities: { 0: "Abhorrent" },
    heightm: 1.9,
    weightkg: 45.2,
    color: "Blue",
    prevo: "Drizzile",
    evoLevel: 35,
    eggGroups: ["Water 1", "Field"],
    canGigantamax: "G-Max Hydrosnipe"
  },
  lanturn: {
    num: 1004,
    name: "Lanturn",
    types: ["Water", "Electric"],
    baseStats: { hp: 125, atk: 68, def: 68, spa: 86, spd: 86, spe: 77 },
    abilities: { 0: "Host Absorb" },
    heightm: 1.2,
    weightkg: 22.5,
    color: "Blue",
    prevo: "Chinchou",
    evoLevel: 27,
    eggGroups: ["Water 2"]
  },
  larvesta: {
    num: 1005,
    name: "Larvesta",
    types: ["Bug", "Fire"],
    baseStats: { hp: 105, atk: 135, def: 105, spa: 85, spd: 60, spe: 65 },
    abilities: { 0: "Worm" },
    heightm: 1.1,
    weightkg: 28.8,
    color: "White",
    eggGroups: ["Bug"]
  },
  aggron: {
    num: 1006,
    name: "Aggron",
    types: ["Steel", "Dragon"],
    baseStats: { hp: 80, atk: 110, def: 120, spa: 60, spd: 90, spe: 70 },
    abilities: { 0: "Death Metal" },
    heightm: 2.1,
    weightkg: 360,
    color: "Gray",
    prevo: "Lairon",
    evoLevel: 42,
    eggGroups: ["Monster"],
    otherFormes: ["Aggron-Mega"],
    formeOrder: ["Aggron", "Aggron-Mega"]
  },
  sableye: {
    num: 302,
    name: "Sableye",
    types: ["Dark", "Ghost"],
    baseStats: { hp: 110, atk: 75, def: 75, spa: 65, spd: 65, spe: 110 },
    abilities: { 0: "Mean Eye" },
    heightm: 0.5,
    weightkg: 11,
    color: "Purple",
    eggGroups: ["Human-Like"],
    otherFormes: ["Sableye-Mega"],
    formeOrder: ["Sableye", "Sableye-Mega"]
  },
  carbink: {
    num: 703,
    name: "Carbink",
    types: ["Rock", "Fairy"],
    gender: "N",
    baseStats: { hp: 50, atk: 50, def: 150, spa: 50, spd: 150, spe: 50 },
    abilities: { 0: "Cleft Body" },
    heightm: 0.3,
    weightkg: 5.7,
    color: "Gray",
    eggGroups: ["Fairy", "Mineral"]
  },
  entei: {
    num: 244,
    name: "Entei",
    types: ["Fire"],
    gender: "N",
    baseStats: { hp: 115, atk: 115, def: 85, spa: 90, spd: 75, spe: 100 },
    abilities: { 0: "Simmer Focus" },
    heightm: 2.1,
    weightkg: 198,
    color: "Brown",
    tags: ["Sub-Legendary"],
    eggGroups: ["Undiscovered"]
  },
  hatterene: {
    num: 858,
    name: "Hatterene",
    types: ["Psychic", "Fairy"],
    gender: "F",
    baseStats: { hp: 77, atk: 80, def: 105, spa: 116, spd: 103, spe: 29 },
    abilities: { 0: "Feeler" },
    heightm: 2.1,
    weightkg: 5.1,
    color: "Pink",
    prevo: "Hattrem",
    evoLevel: 42,
    eggGroups: ["Fairy"],
    canGigantamax: "G-Max Smite"
  },
  raticatealola: {
    num: 20,
    name: "Raticate-Alola",
    baseSpecies: "Raticate",
    forme: "Alola",
    types: ["Dark", "Poison"],
    baseStats: { hp: 92, atk: 101, def: 80, spa: 50, spd: 80, spe: 97 },
    abilities: { 0: "Tricky Rat" },
    heightm: 0.7,
    weightkg: 25.5,
    color: "Black",
    prevo: "Rattata-Alola",
    evoLevel: 20,
    evoCondition: "at night",
    eggGroups: ["Field"]
  },
  lapras: {
    num: 131,
    name: "Lapras",
    types: ["Water", "Ice"],
    baseStats: { hp: 130, atk: 85, def: 80, spa: 110, spd: 85, spe: 60 },
    abilities: { 0: "Jelly Armor" },
    heightm: 2.5,
    weightkg: 220,
    color: "Blue",
    eggGroups: ["Monster", "Water 1"],
    canGigantamax: "G-Max Resonance"
  }
};
//# sourceMappingURL=pokedex.js.map
