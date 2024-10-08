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
  growlithe: {
    inherit: true,
    otherFormes: ["Growlithe-Hisui"],
    formeOrder: ["Growlithe", "Growlithe-Hisui"]
  },
  growlithehisui: {
    num: 58,
    name: "Growlithe-Hisui",
    baseSpecies: "Growlithe",
    forme: "Hisui",
    types: ["Fire", "Rock"],
    genderRatio: { M: 0.75, F: 0.25 },
    baseStats: { hp: 60, atk: 75, def: 45, spa: 65, spd: 50, spe: 55 },
    abilities: { 0: "Intimidate", 1: "Flash Fire", H: "Justified" },
    heightm: 0.8,
    weightkg: 22.7,
    evos: ["Arcanine-Hisui"],
    inheritMoves: ["Growlithe"]
  },
  arcanine: {
    inherit: true,
    otherFormes: ["Arcanine-Hisui"],
    formeOrder: ["Arcanine", "Arcanine-Hisui"]
  },
  arcaninehisui: {
    num: 59,
    name: "Arcanine-Hisui",
    baseSpecies: "Arcanine",
    forme: "Hisui",
    types: ["Fire", "Rock"],
    genderRatio: { M: 0.75, F: 0.25 },
    baseStats: { hp: 95, atk: 115, def: 80, spa: 95, spd: 80, spe: 90 },
    abilities: { 0: "Intimidate", 1: "Flash Fire", H: "Justified" },
    heightm: 2,
    weightkg: 168,
    color: "Brown",
    prevo: "Growlithe-Hisui",
    evoType: "useItem",
    evoItem: "Fire Stone",
    inheritMoves: ["Arcanine"]
  },
  voltorb: {
    inherit: true,
    otherFormes: ["Voltorb-Hisui"],
    formeOrder: ["Voltorb", "Voltorb-Hisui"]
  },
  voltorbhisui: {
    num: 100,
    name: "Voltorb-Hisui",
    baseSpecies: "Voltorb",
    forme: "Hisui",
    types: ["Electric", "Grass"],
    gender: "N",
    baseStats: { hp: 40, atk: 30, def: 50, spa: 55, spd: 55, spe: 100 },
    abilities: { 0: "Soundproof", 1: "Static", H: "Aftermath" },
    heightm: 0.5,
    weightkg: 13,
    color: "Red",
    evos: ["Electrode-Hisui"],
    inheritMoves: ["Voltorb"]
  },
  electrode: {
    inherit: true,
    otherFormes: ["Electrode-Hisui"],
    formeOrder: ["Electrode", "Electrode-Hisui"]
  },
  electrodehisui: {
    num: 101,
    name: "Electrode-Hisui",
    baseSpecies: "Electrode",
    forme: "Hisui",
    types: ["Electric", "Grass"],
    gender: "N",
    baseStats: { hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 150 },
    abilities: { 0: "Soundproof", 1: "Static", H: "Aftermath" },
    heightm: 1.2,
    weightkg: 71,
    color: "Red",
    prevo: "Voltorb-Hisui",
    evoType: "useItem",
    evoItem: "Leaf Stone",
    inheritMoves: ["Electrode"]
  },
  quilava: {
    inherit: true,
    evos: ["Typhlosion", "Typhlosion-Hisui"]
  },
  typhlosion: {
    inherit: true,
    otherFormes: ["Typhlosion-Hisui"],
    formeOrder: ["Typhlosion", "Typhlosion-Hisui"]
  },
  typhlosionhisui: {
    num: 157,
    name: "Typhlosion-Hisui",
    baseSpecies: "Typhlosion",
    forme: "Hisui",
    types: ["Fire", "Ghost"],
    genderRatio: { M: 0.875, F: 0.125 },
    baseStats: { hp: 73, atk: 84, def: 78, spa: 119, spd: 85, spe: 95 },
    abilities: { 0: "Blaze", H: "Flash Fire" },
    heightm: 1.6,
    weightkg: 69.8,
    color: "Yellow",
    prevo: "Quilava",
    evoLevel: 36,
    inheritMoves: ["Typhlosion"]
  },
  qwilfish: {
    inherit: true,
    otherFormes: ["Qwilfish-Hisui"],
    formeOrder: ["Qwilfish", "Qwilfish-Hisui"]
  },
  qwilfishhisui: {
    num: 211,
    name: "Qwilfish-Hisui",
    baseSpecies: "Qwilfish",
    forme: "Hisui",
    types: ["Dark", "Poison"],
    baseStats: { hp: 65, atk: 95, def: 85, spa: 55, spd: 55, spe: 85 },
    abilities: { 0: "Poison Point", 1: "Swift Swim", H: "Intimidate" },
    heightm: 0.5,
    weightkg: 3.9,
    color: "Gray",
    evos: ["Overqwil"],
    inheritMoves: ["Qwilfish"]
  },
  overqwil: {
    num: 904,
    name: "Overqwil",
    types: ["Dark", "Poison"],
    baseStats: { hp: 85, atk: 115, def: 95, spa: 65, spd: 65, spe: 85 },
    abilities: { 0: "Poison Point", 1: "Swift Swim", H: "Intimidate" },
    heightm: 0.5,
    weightkg: 3.9,
    color: "Black",
    prevo: "Qwilfish-Hisui",
    evoType: "other",
    evoCondition: "Use Strong style Barb Barrage 20 times"
  },
  sneasel: {
    inherit: true,
    otherFormes: ["Sneasel-Hisui"],
    formeOrder: ["Sneasel", "Sneasel-Hisui"]
  },
  sneaselhisui: {
    num: 215,
    name: "Sneasel-Hisui",
    baseSpecies: "Sneasel",
    forme: "Hisui",
    types: ["Fighting", "Poison"],
    baseStats: { hp: 55, atk: 95, def: 55, spa: 35, spd: 75, spe: 115 },
    abilities: { 0: "Inner Focus", 1: "Keen Eye", H: "Poison Touch" },
    heightm: 0.9,
    weightkg: 27,
    color: "Black",
    evos: ["Sneasler"],
    inheritMoves: ["Sneasel"]
  },
  sneasler: {
    num: 903,
    name: "Sneasler",
    types: ["Fighting", "Poison"],
    baseStats: { hp: 80, atk: 130, def: 60, spa: 40, spd: 80, spe: 120 },
    abilities: { 0: "Pressure", H: "Poison Touch" },
    heightm: 1.3,
    weightkg: 43,
    color: "Gray",
    prevo: "Sneasel-Hisui",
    evoType: "useItem",
    evoItem: "Razor Claw"
  },
  dialga: {
    inherit: true,
    baseForme: "Altered",
    otherFormes: ["Dialga-Origin"],
    formeOrder: ["Dialga", "Dialga-Origin"]
  },
  dialgaorigin: {
    num: 483,
    name: "Dialga-Origin",
    baseSpecies: "Dialga",
    forme: "Origin",
    types: ["Steel", "Dragon"],
    gender: "N",
    baseStats: { hp: 100, atk: 100, def: 120, spa: 150, spd: 120, spe: 90 },
    abilities: { 0: "Pressure", H: "Telepathy" },
    heightm: 7,
    weightkg: 850,
    color: "White",
    gen: 8,
    requiredItem: "Adamant Orb",
    changesFrom: "Dialga"
  },
  palkia: {
    inherit: true,
    baseForme: "Altered",
    otherFormes: ["Palkia-Origin"],
    formeOrder: ["Palkia", "Palkia-Origin"]
  },
  palkiaorigin: {
    num: 484,
    name: "Palkia-Origin",
    baseSpecies: "Palkia",
    forme: "Origin",
    types: ["Water", "Dragon"],
    gender: "N",
    baseStats: { hp: 90, atk: 100, def: 100, spa: 150, spd: 120, spe: 120 },
    abilities: { 0: "Pressure", H: "Telepathy" },
    heightm: 6.3,
    weightkg: 660,
    color: "Purple",
    gen: 8,
    requiredItem: "Lustrous Orb",
    changesFrom: "Palkia"
  },
  dewott: {
    inherit: true,
    evos: ["Samurott", "Samurott-Hisui"]
  },
  samurott: {
    inherit: true,
    otherFormes: ["Samurott-Hisui"],
    formeOrder: ["Samurott", "Samurott-Hisui"]
  },
  samurotthisui: {
    num: 503,
    name: "Samurott-Hisui",
    baseSpecies: "Samurott",
    forme: "Hisui",
    types: ["Water", "Dark"],
    genderRatio: { M: 0.875, F: 0.125 },
    baseStats: { hp: 90, atk: 108, def: 80, spa: 100, spd: 65, spe: 85 },
    abilities: { 0: "Torrent", H: "Shell Armor" },
    heightm: 1.5,
    weightkg: 58.2,
    color: "Blue",
    prevo: "Dewott",
    evoLevel: 36,
    inheritMoves: ["Samurott"]
  },
  petilil: {
    inherit: true,
    evos: ["Lilligant", "Lilligant-Hisui"]
  },
  lilligant: {
    inherit: true,
    otherFormes: ["Lilligant-Hisui"],
    formeOrder: ["Lilligant", "Lilligant-Hisui"]
  },
  lilliganthisui: {
    num: 549,
    name: "Lilligant-Hisui",
    baseSpecies: "Lilligant",
    forme: "Hisui",
    types: ["Grass", "Fighting"],
    gender: "F",
    baseStats: { hp: 70, atk: 105, def: 75, spa: 50, spd: 75, spe: 105 },
    abilities: { 0: "Chlorophyll", 1: "Hustle", H: "Leaf Guard" },
    heightm: 1.2,
    weightkg: 19.2,
    color: "Green",
    prevo: "Petilil",
    evoType: "useItem",
    evoItem: "Sun Stone",
    inheritMoves: ["Petilil"]
  },
  basculin: {
    inherit: true,
    otherFormes: ["Basculin-Blue-Striped", "Basculin-White-Striped"],
    formeOrder: ["Basculin", "Basculin-Blue-Striped", "Basculin-White-Striped"]
  },
  basculinwhitestriped: {
    num: 550,
    name: "Basculin-White-Striped",
    baseSpecies: "Basculin",
    forme: "White-Striped",
    types: ["Water"],
    baseStats: { hp: 70, atk: 92, def: 65, spa: 80, spd: 55, spe: 98 },
    abilities: { 0: "Rattled", 1: "Adaptability", H: "Mold Breaker" },
    heightm: 1,
    weightkg: 18,
    color: "Green",
    evos: ["Basculegion", "Basculegion-F"],
    gen: 8,
    inheritMoves: ["Basculin"]
  },
  basculegion: {
    num: 902,
    name: "Basculegion",
    baseForme: "M",
    types: ["Water", "Ghost"],
    gender: "M",
    baseStats: { hp: 120, atk: 112, def: 65, spa: 80, spd: 75, spe: 78 },
    abilities: { 0: "Rattled", 1: "Adaptability", H: "Mold Breaker" },
    heightm: 3,
    weightkg: 110,
    color: "Green",
    prevo: "Basculin-White-Striped",
    evoType: "other",
    evoCondition: "Receive 294+ recoil from one move without fainting",
    eggGroups: ["Water 2"],
    otherFormes: ["Basculegion-F"],
    formeOrder: ["Basculegion", "Basculegion-F"]
  },
  basculegionf: {
    num: 902,
    name: "Basculegion-F",
    baseSpecies: "Basculegion",
    forme: "F",
    types: ["Water", "Ghost"],
    gender: "F",
    baseStats: { hp: 120, atk: 92, def: 65, spa: 100, spd: 75, spe: 78 },
    abilities: { 0: "Rattled", 1: "Adaptability", H: "Mold Breaker" },
    heightm: 3,
    weightkg: 110,
    color: "Green",
    prevo: "Basculin-White-Striped",
    evoType: "other",
    evoCondition: "Receive 294+ recoil from one move without fainting",
    eggGroups: ["Water 2"]
  },
  zorua: {
    inherit: true,
    otherFormes: ["Zorua-Hisui"],
    formeOrder: ["Zorua", "Zorua-Hisui"]
  },
  zoruahisui: {
    num: 570,
    name: "Zorua-Hisui",
    baseSpecies: "Zorua",
    forme: "Hisui",
    types: ["Normal", "Ghost"],
    genderRatio: { M: 0.875, F: 0.125 },
    baseStats: { hp: 35, atk: 60, def: 40, spa: 85, spd: 40, spe: 70 },
    abilities: { 0: "Illusion" },
    heightm: 0.7,
    weightkg: 12.5,
    color: "Gray",
    evos: ["Zoroark-Hisui"],
    inheritMoves: ["Zorua"]
  },
  zoroark: {
    inherit: true,
    otherFormes: ["Zoroark-Hisui"],
    formeOrder: ["Zoroark", "Zoroark-Hisui"]
  },
  zoroarkhisui: {
    num: 571,
    name: "Zoroark-Hisui",
    baseSpecies: "Zoroark",
    forme: "Hisui",
    types: ["Normal", "Ghost"],
    genderRatio: { M: 0.875, F: 0.125 },
    baseStats: { hp: 55, atk: 100, def: 60, spa: 125, spd: 60, spe: 110 },
    abilities: { 0: "Illusion" },
    heightm: 1.6,
    weightkg: 73,
    color: "Gray",
    prevo: "Zorua-Hisui",
    evoLevel: 30,
    inheritMoves: ["Zoroark"]
  },
  rufflet: {
    inherit: true,
    evos: ["Braviary", "Braviary-Hisui"]
  },
  braviary: {
    inherit: true,
    otherFormes: ["Braviary-Hisui"],
    formeOrder: ["Braviary", "Braviary-Hisui"]
  },
  braviaryhisui: {
    num: 628,
    name: "Braviary-Hisui",
    baseSpecies: "Braviary",
    forme: "Hisui",
    types: ["Psychic", "Flying"],
    gender: "M",
    baseStats: { hp: 110, atk: 83, def: 70, spa: 112, spd: 70, spe: 65 },
    abilities: { 0: "Keen Eye", 1: "Sheer Force", H: "Defiant" },
    heightm: 1.7,
    weightkg: 43.4,
    color: "Red",
    prevo: "Rufflet",
    evoLevel: 54,
    inheritMoves: ["Braviary"]
  },
  goomy: {
    inherit: true,
    evos: ["Sliggoo", "Sliggoo-Hisui"]
  },
  sliggoo: {
    inherit: true,
    otherFormes: ["Sliggoo-Hisui"],
    formeOrder: ["Sliggoo", "Sliggoo-Hisui"]
  },
  sliggoohisui: {
    num: 705,
    name: "Sliggoo-Hisui",
    baseSpecies: "Sliggoo",
    forme: "Hisui",
    types: ["Steel", "Dragon"],
    baseStats: { hp: 58, atk: 75, def: 83, spa: 83, spd: 113, spe: 40 },
    abilities: { 0: "Sap Sipper", 1: "Overcoat", H: "Gooey" },
    heightm: 0.7,
    weightkg: 68.5,
    color: "Purple",
    prevo: "Goomy",
    evoLevel: 40,
    evos: ["Goodra-Hisui"],
    inheritMoves: ["Sliggoo"]
  },
  goodra: {
    inherit: true,
    otherFormes: ["Goodra-Hisui"],
    formeOrder: ["Goodra", "Goodra-Hisui"]
  },
  goodrahisui: {
    num: 706,
    name: "Goodra-Hisui",
    baseSpecies: "Goodra",
    forme: "Hisui",
    types: ["Steel", "Dragon"],
    baseStats: { hp: 80, atk: 100, def: 100, spa: 110, spd: 150, spe: 60 },
    abilities: { 0: "Sap Sipper", 1: "Overcoat", H: "Gooey" },
    heightm: 1.7,
    weightkg: 334.1,
    color: "Purple",
    prevo: "Sliggoo-Hisui",
    evoLevel: 50,
    inheritMoves: ["Goodra"]
  },
  bergmite: {
    inherit: true,
    evos: ["Avalugg", "Avalugg-Hisui"]
  },
  avalugg: {
    inherit: true,
    otherFormes: ["Avalugg-Hisui"],
    formeOrder: ["Avalugg", "Avalugg-Hisui"]
  },
  avalugghisui: {
    num: 713,
    name: "Avalugg-Hisui",
    baseSpecies: "Avalugg",
    forme: "Hisui",
    types: ["Ice", "Rock"],
    baseStats: { hp: 95, atk: 127, def: 184, spa: 34, spd: 36, spe: 38 },
    abilities: { 0: "Strong Jaw", 1: "Ice Body", H: "Sturdy" },
    heightm: 1.4,
    weightkg: 262.4,
    color: "Blue",
    prevo: "Bergmite",
    evoLevel: 37,
    inheritMoves: ["Bergmite"]
  },
  dartrix: {
    inherit: true,
    evos: ["Decidueye", "Decidueye-Hisui"]
  },
  decidueye: {
    inherit: true,
    otherFormes: ["Decidueye-Hisui"],
    formeOrder: ["Decidueye", "Decidueye-Hisui"]
  },
  decidueyehisui: {
    num: 724,
    name: "Decidueye-Hisui",
    baseSpecies: "Decidueye",
    forme: "Hisui",
    types: ["Grass", "Fighting"],
    genderRatio: { M: 0.875, F: 0.125 },
    baseStats: { hp: 88, atk: 112, def: 80, spa: 95, spd: 95, spe: 60 },
    abilities: { 0: "Overgrow", H: "Long Reach" },
    heightm: 1.6,
    weightkg: 37,
    color: "Brown",
    prevo: "Dartrix",
    evoLevel: 36,
    inheritMoves: ["Decidueye"]
  },
  stantler: {
    inherit: true,
    evos: ["Wyrdeer"]
  },
  wyrdeer: {
    num: 899,
    name: "Wyrdeer",
    types: ["Normal", "Psychic"],
    baseStats: { hp: 103, atk: 105, def: 72, spa: 105, spd: 75, spe: 65 },
    abilities: { 0: "Intimidate", 1: "Frisk", H: "Sap Sipper" },
    heightm: 1.8,
    weightkg: 95.1,
    color: "Gray",
    prevo: "Stantler",
    evoType: "other",
    evoCondition: "Use Agile style Psyshield Bash 20 times",
    eggGroups: ["Field"]
  },
  scyther: {
    inherit: true,
    evos: ["Scizor", "Kleavor"]
  },
  kleavor: {
    num: 900,
    name: "Kleavor",
    types: ["Bug", "Rock"],
    baseStats: { hp: 70, atk: 135, def: 95, spa: 45, spd: 70, spe: 85 },
    abilities: { 0: "Swarm", 1: "Sheer Force", H: "Steadfast" },
    heightm: 1.8,
    weightkg: 89,
    color: "Brown",
    prevo: "Scyther",
    evoType: "other",
    evoCondition: "Black Augurite",
    eggGroups: ["Bug"]
  },
  ursaring: {
    inherit: true,
    evos: ["Ursaluna"]
  },
  ursaluna: {
    num: 901,
    name: "Ursaluna",
    types: ["Ground", "Normal"],
    baseStats: { hp: 130, atk: 140, def: 105, spa: 45, spd: 80, spe: 50 },
    abilities: { 0: "Guts", 1: "Bulletproof", H: "Unnerve" },
    heightm: 2.4,
    weightkg: 290,
    color: "Brown",
    prevo: "Ursaring",
    evoType: "other",
    evoCondition: "Peat Block when there's a full moon",
    eggGroups: ["Field"]
  },
  enamorus: {
    num: 905,
    name: "Enamorus",
    baseForme: "Incarnate",
    types: ["Fairy", "Flying"],
    gender: "F",
    baseStats: { hp: 74, atk: 115, def: 70, spa: 135, spd: 80, spe: 106 },
    abilities: { 0: "Healer", H: "Contrary" },
    heightm: 1.6,
    weightkg: 48,
    color: "Brown",
    tags: ["Sub-Legendary"],
    eggGroups: ["Undiscovered"],
    otherFormes: ["Enamorus-Therian"],
    formeOrder: ["Enamorus", "Enamorus-Therian"]
  },
  enamorustherian: {
    num: 905,
    name: "Enamorus-Therian",
    baseSpecies: "Enamorus",
    forme: "Therian",
    types: ["Fairy", "Flying"],
    gender: "F",
    baseStats: { hp: 74, atk: 115, def: 110, spa: 135, spd: 100, spe: 46 },
    abilities: { 0: "Overcoat" },
    heightm: 1.6,
    weightkg: 48,
    color: "Brown",
    eggGroups: ["Undiscovered"],
    changesFrom: "Enamorus"
  }
};
//# sourceMappingURL=pokedex.js.map
