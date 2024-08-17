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
var items_exports = {};
__export(items_exports, {
  Items: () => Items
});
module.exports = __toCommonJS(items_exports);
const Items = {
  summerbackdoor: {
    name: "Summer Backdoor",
    shortDesc: "If held by a Cirno, this item changes its forme to Tanned.",
    spritenum: 698,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 1004 || pokemon.baseSpecies.num === 1004) {
        return false;
      }
      return true;
    },
    itemUser: ["Cirno-Tanned"],
    num: -1,
    gen: 9
  },
  jeweledpagoda: {
    name: "Jeweled Pagoda",
    shortDesc: "If held by a Nazrin/Shou, its Fairy-type attacks have 1.5x power.",
    spritenum: 698,
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if ((user.baseSpecies.num === 1045 || user.baseSpecies.num === 1048) && move.type === "Fairy") {
        return this.chainModify(1.5);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && (source.baseSpecies.num === 1045 || source.baseSpecies.num === 1048) || (pokemon.baseSpecies.num === 1045 || pokemon.baseSpecies.num === 1048)) {
        return false;
      }
      return true;
    },
    num: -2,
    gen: 9
  }
};
//# sourceMappingURL=items.js.map
