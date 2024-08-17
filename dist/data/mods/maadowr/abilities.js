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
var abilities_exports = {};
__export(abilities_exports, {
  Abilities: () => Abilities
});
module.exports = __toCommonJS(abilities_exports);
const Abilities = {
  absorption: {
    shortDesc: "Increases user's base Def or SpD in terrain.",
    onModifyDefPriority: 6,
    onModifyDef(pokemon) {
      if (this.field.isTerrain("grassyterrain") || this.field.isTerrain("electricterrain"))
        return this.chainModify(1.5);
    },
    onModifySpDPriority: 6,
    onModifySpD(pokemon) {
      if (this.field.isTerrain("acidicterrain") || this.field.isTerrain("mistyterrain") || this.field.isTerrain("psychicterrain"))
        return this.chainModify(1.5);
    },
    flags: { breakable: 1 },
    name: "Absorption",
    rating: 2,
    num: -1
  },
  // end
  // start
  acidicsurge: {
    desc: "On switch-in, this Pok\xE9mon summons Acidic Terrain for 5 turns. During the effect, the power of Poison-type attacks made by grounded Pok\xE9mon is multiplied by 1.3, and grounded Steel-types are not immune to Poison-type damage. Steel-type Pok\xE9mon are still immune to being poisoned and badly poisoned, except by Pok\xE9mon with Corrosion. Camouflage transforms the user into a Poison-type, Nature Power becomes Sludge Bomb, and Secret Power has a 30% chance to cause poison. Lasts for 8 turns if the user is holding a Terrain Extender (such as through Skill Swap).",
    shortDesc: "5 turns. Grounded: +Poison power, Steel not immune to Poison type.",
    onStart(source) {
      this.field.setTerrain("acidicterrain");
    },
    flags: {},
    name: "Acidic Surge",
    rating: 4,
    num: -2
  },
  // end
  // start
  mimicry: {
    onStart(pokemon) {
      this.singleEvent("TerrainChange", this.effect, this.effectState, pokemon);
    },
    onTerrainChange(pokemon) {
      let types;
      switch (this.field.terrain) {
        case "electricterrain":
          types = ["Electric"];
          break;
        case "grassyterrain":
          types = ["Grass"];
          break;
        case "mistyterrain":
          types = ["Fairy"];
          break;
        case "psychicterrain":
          types = ["Psychic"];
          break;
        case "acidicterrain":
          types = ["Poison"];
          break;
        default:
          types = pokemon.baseSpecies.types;
      }
      const oldTypes = pokemon.getTypes();
      if (oldTypes.join() === types.join() || !pokemon.setType(types))
        return;
      if (this.field.terrain || pokemon.transformed) {
        this.add("-start", pokemon, "typechange", types.join("/"), "[from] ability: Mimicry");
        if (!this.field.terrain)
          this.hint("Transform Mimicry changes you to your original un-transformed types.");
      } else {
        this.add("-activate", pokemon, "ability: Mimicry");
        this.add("-end", pokemon, "typechange", "[silent]");
      }
    },
    flags: {},
    name: "Mimicry",
    rating: 0,
    num: 250
  },
  // end
  // start
  agitation: {
    desc: "When this Pok\xE9mon raises or lowers another Pok\xE9mon's stat stages, the effect is increased by one stage for each affected stat.",
    shortDesc: "Increases stat stage changes the Pok\xE9mon inflicts by 1 stage.",
    onAnyTryBoost(boost, target, source, effect) {
      if (effect && effect.id === "zpower")
        return;
      if (!target || !source || target === source || source !== this.effectState.target)
        return;
      for (const stat in boost) {
        const boostValue = boost[stat];
        if (boostValue !== void 0) {
          if (boostValue < 0) {
            boost[stat] = boostValue - 1;
          } else if (boostValue > 0) {
            boost[stat] = boostValue + 1;
          }
        }
      }
    },
    flags: {},
    name: "Agitation",
    rating: 4,
    num: -3
  },
  // end
  // start
  ampup: {
    desc: "When this Pok\xE9mon's move misses, raises its Speed by 2 stages.",
    shortDesc: "Raises user's Speed by 2 stages if its move misses.",
    onModifySpe(spe, pokemon) {
      if (pokemon.moveThisTurnResult === false) {
        this.boost({ spe: 2 });
      }
    },
    flags: {},
    name: "Amp Up",
    rating: 2,
    num: -4
  },
  // end
  // start: Currently doesn't affect the user of Perish Song. Perhaps, I misunderstood how Perish Song actually targets...
  buzz: {
    desc: "When this Pok\xE9mon uses a Sound move, the target(s) will be inflicted with a Torment effect.",
    shortDesc: "Inflicts Torment effect if the Pok\xE9mon uses a Sound move.",
    onAfterMove(source, target, move) {
      if (move.flags["sound"]) {
        if (move.target === "all" || move.target === "allAdjacent" || move.target === "allAdjacentFoes") {
          for (const pokemon of this.getAllActive()) {
            if (pokemon && !pokemon.hasAbility("soundproof") && !pokemon.volatiles["torment"]) {
              pokemon.addVolatile("torment");
              this.add("-start", pokemon, "Torment", "[from] ability: Buzz");
            }
          }
        } else {
          if (target && !target.hasAbility("soundproof") && !target.volatiles["torment"]) {
            target.addVolatile("torment");
            this.add("-start", target, "Torment", "[from] ability: Buzz");
          }
        }
      }
    },
    flags: {},
    name: "Buzz",
    rating: 3,
    num: -5
  },
  // end
  // start
  chainlink: {
    shortDesc: "In a double battle, the Pok\xE9mon steals its partner's Steel type.",
    onUpdate(pokemon) {
      if (!pokemon.isStarted)
        return;
      if (!pokemon.hasType("Steel")) {
        for (const ally of pokemon.allies()) {
          if (ally.hasAbility("chainlink"))
            continue;
          if (ally.hasType("Steel") && pokemon.addType("Steel")) {
            this.add("-ability", pokemon, "Chain Link");
            this.add("-message", `${pokemon.name} stole its partner's armor!`);
            this.add("-start", pokemon, "typeadd", "Steel", "[from] Ability: Chain Link");
            ally.addVolatile("chainlink");
          }
        }
      }
    },
    onEnd(pokemon) {
      if (!pokemon.hasType("Steel"))
        return;
      for (const ally of pokemon.allies()) {
        ally.removeVolatile("chainlink");
      }
    },
    condition: {
      onStart(pokemon) {
        pokemon.setType(pokemon.getTypes(true).map((type) => type === "Steel" ? "???" : type));
        this.add("-start", pokemon, "typechange", pokemon.types.join("/"));
      },
      onSwitchOut(pokemon) {
        pokemon.removeVolatile("chainlink");
      },
      onFaint(pokemon) {
        pokemon.removeVolatile("chainlink");
      },
      onEnd(pokemon) {
        for (const ally of pokemon.allies()) {
          if (ally.hasAbility("chainlink") && ally.hasType("Steel")) {
            let types = ally.baseSpecies.types;
            if (ally.getTypes().join() === types.join() || !ally.setType(types))
              return;
            this.add("-ability", ally, "Chain Link");
            this.add("-message", `${ally.name} returned its partner's armor!`);
            this.add("-start", ally, "typechange", ally.types.join("/"));
            types = pokemon.baseSpecies.types;
            if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types))
              return;
            this.add("-start", pokemon, "typechange", pokemon.types.join("/"));
          }
        }
      }
    },
    flags: {},
    name: "Chain Link",
    rating: 3,
    num: -6
  },
  // end
  // start
  coupdegrass: {
    desc: "This Pok\xE9mon moves first in its priority bracket when its target has 1/2 or less of its maximum HP, rounded down. Does not affect moves that have multiple targets.",
    shortDesc: "This Pok\xE9mon moves first in its priority bracket when its target has 1/2 or less HP.",
    onUpdate(pokemon) {
      const action = this.queue.willMove(pokemon);
      if (!action)
        return;
      const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
      if (!target)
        return;
      if (target.hp <= Math.floor(target.maxhp / 2)) {
        if (action.move.target !== "allAdjacent" && action.move.target !== "all") {
          pokemon.addVolatile("coupdegrass");
        }
      }
    },
    condition: {
      duration: 1,
      onStart(pokemon) {
        const action = this.queue.willMove(pokemon);
        if (action) {
          this.add("-ability", pokemon, "Coup de Grass");
          this.add("-message", `${pokemon.name} prepared to move immediately!`);
        }
      },
      onModifyPriority(priority) {
        return priority + 0.1;
      }
    },
    flags: {},
    name: "Coup de Grass",
    rating: 3,
    num: -7
  },
  // end
  // start: currently, only heals user rather than ally as well
  cultivation: {
    shortDesc: "User recovers 1/16 of its HP, 1/8 in terrain.",
    onTerrainChange(target, source) {
      if (this.field.isTerrain("electricterrain") || this.field.isTerrain("grassyterrain") || this.field.isTerrain("mistyterrain") || this.field.isTerrain("psychicterrain") || this.field.isTerrain("acidicterrain")) {
        this.heal(target.baseMaxhp / 16);
        for (const ally of target.side.pokemon) {
          if (ally && ally.hp > 0) {
            this.heal(ally.baseMaxhp / 16);
          }
        }
      }
    },
    flags: {},
    name: "Cultivation",
    rating: 2,
    num: -8
  },
  // end
  // start
  graviton: {
    shortDesc: "On switch-in, this Pok\xE9mon summons Gravity.",
    onStart(source) {
      this.field.addPseudoWeather("gravity");
    },
    flags: {},
    name: "Graviton",
    rating: 4,
    num: -9
  },
  // end
  // start
  illwind: {
    shortDesc: "Sets Tailwind when user replaces a fainted ally.",
    //onAfterMega(pokemon) {
    //	if (!pokemon.side.faintedLastTurn) return;
    //	this.field.addPseudoWeather('tailwind');
    // },
    onStart(pokemon) {
      if (!pokemon.side.faintedThisTurn)
        return;
      pokemon.side.addSideCondition("tailwind");
      this.add("-sidestart", pokemon.side, "move: Tailwind");
    },
    flags: {},
    name: "Ill Wind",
    rating: 5,
    num: -10
  },
  // end
  // start
  inoculum: {
    name: "Inoculum",
    onAnyModifyDamage(damage, source, target, effect) {
      if (source && effect && effect.effectType === "Move" && effect.type === "Fire") {
        if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
          this.debug("Inoculum damage reduction from Fire-type move");
          return this.chainModify(0.5);
        }
      }
    },
    onAnyDamage(damage, target, source, effect) {
      if (effect && effect.id === "brn") {
        if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
          this.debug("Inoculum damage reduction for burn damage");
          return damage / 2;
        }
      }
    },
    flags: {},
    rating: 2,
    num: -11
  },
  // end
  // start
  interference: {
    shortDesc: "If user gets hurt by a contact move, inflicts Torment on the attacker.",
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        source.addVolatile("torment", this.effectState.target);
      }
    },
    flags: {},
    name: "Interference",
    rating: 3,
    num: -12
  },
  // end
  // start: Malware
  malware: {
    name: "Malware",
    onStart(pokemon) {
      this.add("-ability", pokemon, "Malware");
      this.add("-message", `${pokemon.name}'s Malware is active!`);
      this.effectState.malwareUser = pokemon;
      this.eachEvent("Update");
    },
    onAnyDragOut(pokemon) {
      pokemon.removeVolatile("malwarepoisoned");
    },
    onUpdate(pokemon) {
      if (pokemon === this.effectState.malwareUser) {
        for (const target of this.getAllActive()) {
          if (target !== pokemon && !target.hasType("Poison") && !target.hasType("Steel") && !target.status) {
            if (target.isGrounded() && this.field.isTerrain("mistyterrain")) {
              continue;
            }
            if (target.hasAbility("immunity")) {
              continue;
            }
            if (target.side.getSideCondition("safeguard")) {
              continue;
            }
            if (target.hasItem("sunring") && target.baseSpecies.baseSpecies === "Horizonoc") {
              continue;
            }
            const allyPresent = target.side.active.some((ally) => ally && ally !== target && ally.baseSpecies.baseSpecies === "Horizonoc" && ally.hasItem("sunring"));
            if (allyPresent && ["sunnyday", "desolateland"].includes(this.field.effectiveWeather())) {
              continue;
            }
            this.add("-message", `${target.name} is affected by Malware!`);
            target.setStatus("psn", pokemon, null, true);
            target.addVolatile("malwarepoisoned");
          }
        }
      }
    },
    //	onResidualOrder: 26,
    //	onResidualSubOrder: 1,
    //	onResidual(pokemon) {
    onSwitchOut(pokemon) {
      for (const target of this.getAllActive()) {
        if (target.volatiles["malwarepoisoned"]) {
          target.removeVolatile("malwarepoisoned");
          if (target.status === "psn") {
            target.cureStatus();
          }
          this.add("-message", `${target.name} is cured of Malware poison.`);
        }
      }
    },
    // This method handles when any Pokémon switches out
    onAnySwitchOut(pokemon) {
      if (pokemon.volatiles["malwarepoisoned"]) {
        pokemon.removeVolatile("malwarepoisoned");
        if (pokemon.status === "psn") {
          pokemon.cureStatus();
        }
        this.add("-message", `${pokemon.name} is cured of Malware poison.`);
      }
    },
    onFaint(pokemon) {
      for (const target of this.getAllActive()) {
        if (target.volatiles["malwarepoisoned"]) {
          target.removeVolatile("malwarepoisoned");
          if (target.status === "psn") {
            target.cureStatus();
          }
          this.add("-message", `${target.name} is cured of Malware poison.`);
        }
      }
    },
    //		onDamage(damage, target, source, effect) {
    //			if (effect && effect.id === 'psn' && (target.volatiles['malwarepoisoned'])) {
    //				return damage / 2;
    //			}
    //		},
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
    rating: 4,
    num: -13
  },
  // end
  // start
  masquerade: {
    desc: `This Pok\xE9mon inherits the Ability of the last unfainted Pokemon in its party until it takes direct damage from another Pok\xE9mon's attack. Abilities that cannot be copied are "No Ability", As One, Battle Bond, Comatose, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Power of Alchemy, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, and Zen Mode.`,
    shortDesc: "Inherits the Ability of the last party member. Wears off when attacked.",
    onUpdate(pokemon) {
      if (!pokemon.isStarted || this.effectState.gaveUp || pokemon.volatiles["masquerade"])
        return;
      pokemon.addVolatile("masquerade");
      let i;
      for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
        if (!pokemon.side.pokemon[i])
          continue;
        const additionalBannedAbilities = [
          "noability",
          "flowergift",
          "forecast",
          "hugepower",
          "hungerswitch",
          "illusion",
          "imposter",
          "neutralizinggas",
          "powerofalchemy",
          "purepower",
          "receiver",
          "trace",
          "wonderguard"
        ];
        if (pokemon.side.pokemon[i].fainted || pokemon.side.pokemon[i].getAbility().isPermanent || additionalBannedAbilities.includes(pokemon.side.pokemon[i].ability)) {
          continue;
        }
        break;
      }
      if (!pokemon.side.pokemon[i] || pokemon === pokemon.side.pokemon[i]) {
        this.effectState.gaveUp = true;
        return;
      }
      const masquerade = pokemon.side.pokemon[i];
      this.add("-ability", pokemon, "Masquerade");
      pokemon.setAbility(masquerade.ability);
      this.hint(`${pokemon.name} inherited ${this.dex.abilities.get(pokemon.ability).name} from ${masquerade.name}!`);
      this.add("-ability", pokemon, this.dex.abilities.get(pokemon.ability).name, "[silent]");
    },
    condition: {
      onDamagingHit(damage, target, source, move) {
        this.effectState.busted = true;
      },
      onFaint(pokemon) {
        this.effectState.busted = true;
      },
      onUpdate(pokemon) {
        if (pokemon.hasAbility("masquerade"))
          return;
        if (this.effectState.busted) {
          this.add("-ability", pokemon, "Masquerade");
          this.add("-message", `${pokemon.name}'s Masquerade wore off!`);
          pokemon.setAbility("masquerade");
        }
      }
    },
    flags: {},
    name: "Masquerade",
    rating: 3,
    num: -14
  },
  // end
  // start
  permafrost: {
    shortDesc: "Boosts Ice moves by 50% on user's side.",
    onAllyBasePowerPriority: 22,
    onAllyBasePower(basePower, attacker, defender, move) {
      if (move.type === "Ice") {
        this.debug("Permafrost boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Permafrost",
    rating: 3.5,
    num: -15
  },
  // end
  // start
  poisonspit: {
    shortDesc: "Sets Acidic Terrain when hurt.",
    onDamagingHit(damage, target, source, move) {
      this.field.setTerrain("acidicterrain");
    },
    flags: {},
    name: "Poison Spit",
    rating: 2,
    num: -16
  },
  // end
  // start
  reconfiguration: {
    shortDesc: "Boosts user's stat depending on target's best stat.",
    onSwitchIn(pokemon) {
      this.effectState.switchingIn = true;
    },
    onStart(pokemon) {
      const foes = pokemon.side.foe.active;
      const target = foes[foes.length - 1 - pokemon.position];
      if (!target)
        return;
      this.boost({ [target.getBestStat(false, true)]: 1 });
    },
    flags: {},
    name: "Reconfiguration",
    rating: 3,
    num: -17
  },
  // end
  // start: 
  rewind: {
    shortDesc: "Recovers items on user's side if at 50% or below.",
    onDamage(damage, target, source, effect) {
      if (target.hp - damage <= target.maxhp / 2) {
        this.effectState.rewindTriggered = true;
      }
    },
    onAfterMoveSecondary(target, source, move) {
      if (this.effectState.rewindTriggered) {
        this.effectState.rewindTriggered = false;
        for (const ally of target.side.pokemon) {
          if (ally && !ally.item) {
            this.actions.useMove("Recycle", ally);
          }
        }
      }
    },
    flags: {},
    name: "Rewind",
    rating: 4,
    num: -18
  },
  // end
  // start
  scaleshift: {
    shortDesc: "In a double battle, the Pok\xE9mon copies its partner's first type.",
    onUpdate(pokemon) {
      if (!pokemon.isStarted)
        return;
      let newtype = null;
      for (const ally of pokemon.side.active) {
        if (ally !== pokemon && !ally.hasAbility("scaleshift") && ally.types[0] !== pokemon.baseSpecies.types[0] && ally.types[0] !== pokemon.baseSpecies.types[1]) {
          newtype = ally.types[0];
        }
      }
      if (newtype) {
        const typecombo = [newtype, pokemon.baseSpecies.types[1]];
        if (pokemon.getTypes().join() === typecombo.join() || !pokemon.setType(typecombo))
          return;
        this.add("-ability", pokemon, "Scale Shift");
        this.add("-start", pokemon, "typechange", pokemon.getTypes(true).join("/"));
      } else {
        if (pokemon.getTypes().join() === pokemon.baseSpecies.types.join() || !pokemon.setType(pokemon.baseSpecies.types))
          return;
        this.add("-ability", pokemon, "Scale Shift");
        this.add("-start", pokemon, "typechange", pokemon.getTypes(true).join("/"));
      }
    },
    onEnd(pokemon) {
      if (pokemon.getTypes().join() === pokemon.baseSpecies.types.join() || !pokemon.setType(pokemon.baseSpecies.types))
        return;
      this.add("-ability", pokemon, "Scale Shift");
      this.add("-start", pokemon, "typechange", pokemon.getTypes(true).join("/"));
    },
    flags: {},
    name: "Scale Shift",
    rating: 3,
    num: -19
  },
  // end
  // start
  solarcore: {
    shortDesc: "During intense sunlight, this Pok\xE9mon can skip the charging turn of its moves.",
    onChargeMove(pokemon, target, move) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        this.debug("Solar Core - remove charge turn for " + move.id);
        this.attrLastMove("[still]");
        this.addMove("-anim", pokemon, move.name, target);
        return false;
      }
    },
    flags: {},
    name: "Solar Core",
    rating: 2,
    num: -20
  },
  // end
  // start
  steelbreaker: {
    shortDesc: "This Pok\xE9mon's attacks are critical hits if the target is a Steel-type Pok\xE9mon.",
    onModifyCritRatio(critRatio, source, target) {
      if (target && target.hasType("Steel"))
        return 5;
    },
    flags: {},
    name: "Steelbreaker",
    rating: 3,
    num: -21
  },
  // end
  // start
  tempestuous: {
    desc: "When replacing a fainted party member, this Pok\xE9mon's Special Defense is boosted, and it charges power to double the power of its Electric-type move on its first turn.",
    shortDesc: "Gains the effect of Charge when replacing a fainted ally.",
    //	onAfterMega(pokemon) {
    //		if (!pokemon.side.faintedLastTurn) return;
    //		this.boost({spd: 1}, pokemon);
    //		this.add('-activate', pokemon, 'move: Charge');
    //		pokemon.addVolatile('charge');
    //	},
    onStart(pokemon) {
      if (!pokemon.side.faintedThisTurn)
        return;
      this.boost({ spd: 1 }, pokemon);
      if (!pokemon.volatiles["charge"]) {
        pokemon.addVolatile("charge");
      }
    },
    name: "Tempestuous",
    rating: 3,
    num: -22
  },
  // end
  // start
  // thermal expansion
  thermalexpansion: {
    onDamage(damage, target, source, effect) {
      if (!target.hasType("Ice"))
        return;
      if (effect && effect.id === "stealthrock") {
        target.setType(target.getTypes(true).map((type) => type === "Ice" ? "???" : type));
        this.add("-start", target, "typechange", target.getTypes().join("/"));
        return false;
      }
    },
    onTryHit(target, source, move) {
      if (!target.hasType("Ice"))
        return;
      if (move.type === "Rock") {
        this.add("-immune", target, "[from] ability: Thermal Expansion");
        target.setType(target.getTypes(true).map((type) => type === "Ice" ? "???" : type));
        this.add("-start", target, "typechange", target.getTypes().join("/"));
        return null;
      }
    },
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (target.hasType("Ice"))
        return;
      if (!target.addType("Ice"))
        return false;
      if (effect.id === "snow") {
        this.add("-start", target, "typeadd", "Ice", "[from] ability: Thermal Expansion");
      }
    },
    flags: {},
    name: "Thermal Expansion",
    shortDesc: "If user is Ice-type, immunity to Stealth Rock and Rock-type moves. On immunity, lose Ice-type. Regain in Snow or switch.",
    rating: 4,
    num: -23
  },
  // end
  // start
  vampirism: {
    shortDesc: "Replaces target's ability with Vampirism if user made contact.",
    onSourceDamagingHit(damage, target, source, move) {
      const sourceAbility = source.getAbility();
      const targetAbility = target.getAbility();
      if (targetAbility.flags["cantsuppress"] || targetAbility.id === "vampirism") {
        return;
      }
      if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
        const oldAbility = target.setAbility("vampirism", source);
        if (oldAbility) {
          this.add("-activate", target, "ability: Vampirism", this.dex.abilities.get(oldAbility).name, "[of] " + source);
        }
      }
    },
    flags: {},
    name: "Vampirism",
    rating: 3,
    num: -24
  },
  // end
  // start
  woodstove: {
    shortDesc: "Ice does 50% less damage against user's side.",
    onAnyModifyDamage(damage, source, target, effect) {
      if (source && effect && effect.effectType === "Move" && effect.type === "Ice") {
        if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
          this.debug("Wood Stove damage reduction from Ice-type move");
          return this.chainModify(0.5);
        }
      }
    },
    onUpdate(pokemon) {
      const allies = pokemon.side.active;
      for (const ally of allies) {
        if (ally.status === "frz") {
          this.add("-activate", ally, "ability: Wood Stove");
          ally.cureStatus();
        }
      }
      if (pokemon.status === "frz") {
        this.add("-activate", pokemon, "ability: Wood Stove");
        pokemon.cureStatus();
      }
    },
    onImmunity(type, pokemon) {
      if (type === "frz") {
        const allies = pokemon.side.active;
        for (const ally of allies) {
          if (ally === pokemon || ally.isAlly(pokemon)) {
            this.add("-immune", ally, "ability: Wood Stove");
          }
        }
        return false;
      }
    },
    flags: {},
    name: "Wood Stove",
    rating: 2,
    num: -25
  },
  // end
  // start: modifying vanilla abilities
  leafguard: {
    onSetStatus(status, target, source, effect) {
      if (["sunnyday", "desolateland"].includes(target.effectiveWeather())) {
        if (effect?.status) {
          this.add("-immune", target, "[from] ability: Leaf Guard");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && ["sunnyday", "desolateland"].includes(target.effectiveWeather())) {
        this.add("-immune", target, "[from] ability: Leaf Guard");
        return null;
      }
    },
    onModifyDefPriority: 6,
    onModifyDef(pokemon) {
      if (this.field.isWeather("sunnyday") || this.field.isWeather("desolateland")) {
        return this.chainModify(1.5);
      }
    },
    flags: { breakable: 1 },
    name: "Leaf Guard",
    rating: 0.5,
    num: 102
  },
  magmaarmor: {
    onUpdate(pokemon) {
      if (pokemon.status === "frz") {
        this.add("-activate", pokemon, "ability: Magma Armor");
        pokemon.cureStatus();
      }
    },
    onImmunity(type, pokemon) {
      if (type === "frz")
        return false;
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Ice") {
        this.debug("Magma Armor damage reduction from Ice-type move");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Magma Armor",
    rating: 0.5,
    num: 40
  },
  rivalry: {
    onBasePowerPriority: 24,
    onBasePower(basePower, attacker, defender, move) {
      const ally = attacker.side.active.find((pokemon) => pokemon && pokemon !== attacker);
      if (ally && attacker.gender && ally.gender) {
        if (attacker.gender === ally.gender) {
          this.debug("Rivalry boost");
          return this.chainModify(1.25);
        }
      }
    },
    flags: {},
    name: "Rivalry",
    rating: 0,
    num: 79
  },
  flowergift: {
    onStart(pokemon) {
      this.singleEvent("WeatherChange", this.effect, this.effectState, pokemon);
    },
    onWeatherChange(pokemon) {
      if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== "Cherrim" || pokemon.transformed)
        return;
      if (!pokemon.hp)
        return;
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        if (pokemon.species.id !== "cherrimsunshine") {
          pokemon.formeChange("Cherrim-Sunshine", this.effect, false, "[msg]");
        }
      } else {
        if (pokemon.species.id === "cherrimsunshine") {
          pokemon.formeChange("Cherrim", this.effect, false, "[msg]");
        }
      }
    },
    onAllyModifyAtkPriority: 3,
    onAllyModifyAtk(atk, pokemon) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim" && this.effectState.target.baseSpecies.baseSpecies !== "Hieroturoc")
        return;
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onAllyModifySpDPriority: 4,
    onAllyModifySpD(spd, pokemon) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim" && this.effectState.target.baseSpecies.baseSpecies !== "Hieroturoc")
        return;
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1 },
    name: "Flower Gift",
    rating: 1,
    num: 122
  },
  stancechange: {
    onModifyMovePriority: 1,
    onModifyMove(move, attacker, defender) {
      if (!attacker.species.name.startsWith("Aegislash") && !attacker.species.name.startsWith("Ma'adowr") || attacker.transformed)
        return;
      if (move.category === "Status" && move.id !== "kingsshield")
        return;
      if (attacker.species.name === "Aegislash" || attacker.species.name === "Aegislash-Blade") {
        const targetForme = move.id === "kingsshield" ? "Aegislash" : "Aegislash-Blade";
        if (attacker.species.name !== targetForme)
          attacker.formeChange(targetForme);
      } else if (attacker.species.name === "Aegislash-Ma'adowr" || attacker.species.name === "Aegislash-Blade-Ma'adowr") {
        const targetForme = move.id === "kingsshield" ? "Aegislash-Ma'adowr" : "Aegislash-Blade-Ma'adowr";
        if (attacker.species.name !== targetForme)
          attacker.formeChange(targetForme);
        this.add("-message", `${attacker.name} changed to ${move.id === "kingsshield" ? "Shield Forme" : "Blade Forme"}!`);
        this.add("-start", attacker, "typechange", attacker.getTypes(true).join("/"), "[silent]");
        if (!this.effectState.busted) {
          const species = this.dex.species.get(attacker.species.name);
          const abilities = species.abilities;
          const baseStats = species.baseStats;
          const type = species.types[0];
          if (species.types[1]) {
            const type2 = species.types[1];
            this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
          } else {
            this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
          }
          this.effectState.busted = true;
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Stance Change",
    rating: 4,
    num: 176
  },
  zenmode: {
    onResidualOrder: 29,
    onResidual(pokemon) {
      const baseSpecies = pokemon.baseSpecies.baseSpecies;
      const forme = pokemon.species.forme;
      if (!["Darmanitan", "Immanicus"].includes(baseSpecies) || pokemon.transformed) {
        return;
      }
      if (pokemon.hp <= pokemon.maxhp / 2 && !["Zen", "Galar-Zen"].includes(forme)) {
        pokemon.addVolatile("zenmode");
      } else if (pokemon.hp > pokemon.maxhp / 2 && ["Zen", "Galar-Zen"].includes(forme)) {
        pokemon.addVolatile("zenmode");
        pokemon.removeVolatile("zenmode");
      }
    },
    onEnd(pokemon) {
      if (!pokemon.volatiles["zenmode"] || !pokemon.hp)
        return;
      pokemon.transformed = false;
      delete pokemon.volatiles["zenmode"];
      if (["Darmanitan", "Immanicus"].includes(pokemon.species.baseSpecies) && pokemon.species.battleOnly) {
        pokemon.formeChange(pokemon.species.battleOnly, this.effect, false, "[silent]");
      }
    },
    condition: {
      onStart(pokemon) {
        const speciesId = pokemon.species.id;
        if (!pokemon.species.name.includes("Galar")) {
          if (speciesId === "darmanitanzen" || speciesId === "immanicuszen")
            return;
          if (speciesId === "darmanitan")
            pokemon.formeChange("Darmanitan-Zen");
          if (speciesId === "immanicus")
            pokemon.formeChange("Immanicus-Zen");
        } else {
          if (speciesId !== "darmanitangalarzen")
            pokemon.formeChange("Darmanitan-Galar-Zen");
        }
      },
      onEnd(pokemon) {
        if (["Zen", "Galar-Zen"].includes(pokemon.species.forme)) {
          pokemon.formeChange(pokemon.species.battleOnly);
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Zen Mode",
    rating: 0,
    num: 161
  }
  // end
};
//# sourceMappingURL=abilities.js.map
