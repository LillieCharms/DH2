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
    inherit: true,
    onStart(target, source, sourceEffect) {
      if (!sourceEffect) {
        this.add("-status", target, "par");
      } else if (sourceEffect.id === "thunderorb") {
        this.add("-status", target, "par", "[from] item: Thunder Orb", "[silent]");
        this.add("-message", `${target.name} was paralyzed by the Thunder Orb!`);
      } else if (sourceEffect.effectType === "Ability") {
        this.add("-status", target, "par", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "par");
      }
    },
    onBeforeMovePriority: 1,
    onBeforeMove(pokemon) {
      if (this.randomChance(1, 4) && !(pokemon.hasAbility("quickfeet") && pokemon.hasItem("thunderorb"))) {
        this.add("cant", pokemon, "par");
        return false;
      }
    }
  },
  //There was an error so this edit to accommodate for Cloning Genes is being archived
  twoturnmove: {
    // Cloning Genes
    inherit: true,
    onStart(attacker, defender, effect) {
      this.effectState.move = effect.id;
      attacker.addVolatile(effect.id);
      let moveTargetLoc = attacker.lastMoveTargetLoc;
      if (effect.sourceEffect && this.dex.moves.get(effect.id).target !== "self") {
        if (defender.fainted) {
          defender = this.sample(attacker.foes(true));
        }
        moveTargetLoc = attacker.getLocOf(defender);
      }
      attacker.volatiles[effect.id].targetLoc = moveTargetLoc;
      this.attrLastMove("[still]");
      if (defender.hasAbility("cloninggenes")) {
        defender.addVolatile("cloninggenes", defender);
      }
      this.runEvent("PrepareHit", attacker, defender, effect);
    }
  },
  typebalm: {
    //This is here to track whether a mon has used a Type Balm this switch-in
    duration: 0,
    onStart(target, source, sourceEffect) {
      this.add("-start", target, "typechange", target.getTypes(false, true).join("/"), "[silent]");
      this.add("-message", `${target.name} gained the ${target.addedType} type from the Type Balm!`);
      const balmMoveList = {
        "Photalohm": "Magnetic Updraft",
        "Smeltusk": "Leaping Onrush",
        "Panthoard": "Cupric Deluge",
        "Mustelone": "Clone Express",
        "Froskua": "Dive Bomb",
        "Muk": "Mud Devourment",
        "Muk-Alola": "Mud Devourment",
        "Syruptitious": "Adulteration",
        "Steelix": "Olive Rampage",
        "Crobat": "Venomous Fang",
        "Saunusca": "Tectonic Shift",
        "Raatilus": "Ammolite Vortex",
        "Blootilus": "Ammolite Vortex",
        "Yleltilus": "Ammolite Vortex",
        "Acktilus": "Ammolite Vortex",
        "Whitilus": "Ammolite Vortex",
        "Dodrio": "Asura Barrage",
        "Roserade": "Vive Le\u0301 Rose",
        "Bouffalant": "Dread Stampede",
        "Pichat": "Thunder Armor",
        "Pikachat": "Thunder Armor",
        "Raichat": "Thunder Armor",
        "Trippletop": "Mystic Burst",
        "Violagarie": "Violet Seed",
        "Yiseng": "Mental Extract",
        "Garoupe": "Discovery",
        "Frostabone": "Shaking Tundra",
        "Moskitoski": "Venom Drain",
        "Moskitoski-Swarm": "Venom Drain",
        "Gastly": "Maiden's Peak",
        "Haunter": "Maiden's Peak",
        "Gengar": "Maiden's Peak"
      };
      const species = target.baseSpecies.baseSpecies;
      if (balmMoveList[species]) {
        this.effectState.balmMove = balmMoveList[species];
        this.effectState.balmType = target.addedType;
        const balmMove = this.dex.moves.get(this.effectState.balmMove);
        if (balmMove.type === target.addedType) {
          const newMoveSlots = [];
          for (const moveSlot of target.moveSlots) {
            let move = this.dex.moves.get(moveSlot.id);
            let type = move.type;
            if (moveSlot.id === "hiddenpower") {
              type = target.hpType;
            }
            if (type !== balmMove.type || move.category !== balmMove.category && [move.category, balmMove.category].includes("Status")) {
              newMoveSlots.push(moveSlot);
            } else {
              const movepp = move.category === "Status" ? 16 : 8;
              newMoveSlots.push({
                move: moveSlot.move,
                id: moveSlot.id,
                pp: movepp,
                maxpp: movepp,
                target: moveSlot.target,
                disabled: false,
                used: false,
                virtual: true
              });
            }
          }
          target.moveSlots = newMoveSlots;
        }
      }
    },
    //Priority's kinda janky so this should iron it out
    onModifyPriority(priority, pokemon, target, move) {
      if (!this.effectState.balmMove)
        return;
      const balmMove = this.dex.moves.get(this.effectState.balmMove);
      if (move.type === balmMove.type && (move.category === balmMove.category || ![move.category, balmMove.category].includes("Status"))) {
        return balmMove.priority;
      }
    }
  },
  thunderarmorboost: {
    duration: 2,
    onBasePowerPriority: 6,
    onBasePower(basePower, attacker, defender, move) {
      return this.chainModify(2);
    },
    onDisableMove(pokemon) {
      for (const moveSlot of pokemon.moveSlots) {
        const move = this.dex.moves.get(moveSlot.id);
        if (move.type === "Electric" && move.category === "Status") {
          pokemon.disableMove(moveSlot.id);
        }
      }
    }
  }
};
//# sourceMappingURL=conditions.js.map
