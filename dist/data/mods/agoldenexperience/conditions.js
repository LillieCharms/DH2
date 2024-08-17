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
var conditions_exports = {};
__export(conditions_exports, {
  Conditions: () => Conditions
});
module.exports = __toCommonJS(conditions_exports);
const Conditions = {
  par: {
    name: "par",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.id === "paraorb") {
        this.add("-status", target, "par", "[from] item: Para Orb");
      } else if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "par", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "par");
      }
    },
    onModifySpe(spe, pokemon) {
      if (!pokemon.hasAbility("quickfeet")) {
        return this.chainModify(0.5);
      }
    }
  },
  frz: {
    name: "frz",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "frz", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "frz");
      }
      if (target.species.name === "Shaymin-Sky" && target.baseSpecies.baseSpecies === "Shaymin") {
        target.formeChange("Shaymin", this.effect, true);
      }
    },
    onModifyMove(move, pokemon) {
      if (move.flags["defrost"]) {
        this.add("-curestatus", pokemon, "frz", "[from] move: " + move);
        pokemon.setStatus("");
      }
    },
    onModifyDefPriority: 4,
    onModifyDef(def, pokemon) {
      if (!pokemon.hasAbility("marvelscale")) {
        return this.chainModify(0.67);
      }
    },
    onModifySpDPriority: 4,
    onModifySpD(spd, pokemon) {
      if (!pokemon.hasAbility("marvelscale")) {
        return this.chainModify(0.67);
      }
    },
    onHit(target, source, move) {
      if (move.thawsTarget || move.type === "Fire" && move.category !== "Status") {
        target.cureStatus();
      }
    }
  }
};
//# sourceMappingURL=conditions.js.map
