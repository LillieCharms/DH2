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
var import_pokemon = require("../../../sim/pokemon");
const Abilities = {
  imterrifiedofdondozo: {
    onDamagingHit(damage, target, source, move) {
      if (source.species.dondozo) {
        this.boost({ atk: 2, def: 2, spa: 2, spd: 2, spe: 2 });
      }
    },
    name: "I'm terrified of Dondozo",
    shortDesc: "When hit by Dondozo, all stats are raised by two stages."
  },
  coldcommander: {
    name: "Cold Commander",
    shortDesc: "If Eisugiri, first physical hit deals 0 damage, user transforms into Dondozo. Revert to Eisugiri in hail.",
    onStart(pokemon2) {
      if (this.field.isWeather(["hail", "snow"]) && pokemon2.species.id === "eisugiridondozo" && !pokemon2.transformed) {
        this.add("-activate", pokemon2, "ability: Cold Commander");
        this.effectState.busted = false;
        pokemon2.formeChange("Eisugiri", this.effect, true);
        pokemon2.setAbility("coldcommander");
      }
    },
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect && effect.effectType === "Move" && effect.category === "Physical" && target.species.id === "eisugiri" && !target.transformed) {
        this.add("-activate", target, "ability: Cold Commander");
        this.effectState.busted = true;
        target.setAbility("coldcommander");
        return 0;
      }
    },
    onCriticalHit(target, type, move) {
      if (!target)
        return;
      if (move.category !== "Physical" || target.species.id !== "eisugiri" || target.transformed)
        return;
      if (target.volatiles["substitute"] && !(move.flags["bypasssub"] || move.infiltrates))
        return;
      if (!target.runImmunity(move.type))
        return;
      return false;
    },
    onEffectiveness(typeMod, target, type, move) {
      if (!target)
        return;
      if (move.category !== "Physical" || target.species.id !== "eisugiri" || target.transformed)
        return;
      const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
      if (hitSub)
        return;
      if (!target.runImmunity(move.type))
        return;
      return 0;
    },
    onUpdate(pokemon2) {
      if (pokemon2.species.id === "eisugiri" && this.effectState.busted) {
        pokemon2.formeChange("Eisugiri-Dondozo");
        pokemon2.setAbility("coldcommander");
      }
      if (pokemon2.species.id === "eisugiridondozo" && !this.effectState.busted) {
        pokemon2.formeChange("Eisugiri");
        pokemon2.setAbility("coldcommander");
      }
    },
    onWeatherChange(pokemon2, source, sourceEffect) {
      if (sourceEffect?.suppressWeather)
        return;
      if (!pokemon2.hp)
        return;
      if (this.field.isWeather(["hail", "snow"]) && pokemon2.species.id === "eisugiridondozo") {
        this.add("-activate", pokemon2, "ability: Cold Commander");
        this.effectState.busted = false;
        pokemon2.formeChange("Eisugiri", this.effect, true);
      }
    },
    flags: { breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 }
  },
  nauticalnuke: {
    onDamagingHit(damage, target, source, move) {
      if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable())
        return;
      if (target.species.id === "cramogirigorging") {
        this.damage(source.baseMaxhp / 4, source, target);
        this.boost({ atk: -2, def: -2, spa: -2, spd: -2, spe: -2 }, source, target, null, true);
        target.formeChange("cramogiri", move);
      }
    },
    // The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
    onSourceTryPrimaryHit(target, source, effect) {
      if (effect && effect.id === "surf" && source.hasAbility("nauticalnuke") && source.species.name === "Cramogiri" && !source.transformed) {
        const forme = "cramogirigorging";
        source.formeChange(forme, effect);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Nautical Nuke",
    shortDesc: "When hit after Surf/Dive, attacker takes 1/4 max HP and -2 to all stats."
  },
  paramedic: {
    onSwitchOut(pokemon2) {
      pokemon2.heal(pokemon2.baseMaxhp / 3);
      pokemon2.side.addSlotCondition(pokemon2, "paramedic");
    },
    condition: {
      onStart(pokemon2, source) {
        this.effectState.hp = source.maxhp / 3;
      },
      onSwap(target) {
        if (!target.fainted && target.species.dondozo) {
          const damage = this.heal(this.effectState.hp, target, target);
          if (damage)
            this.add("-heal", target, target.getHealth, "[from] ability: Paramedic", "[of] " + this.effectState.source);
          target.side.removeSlotCondition(target, "paramedic");
        }
      }
    },
    name: "Paramedic",
    shortDesc: "If switching out into Dondozo, both Pokemon are healed, each for 33.3% of its Max HP."
  },
  commanderguard: {
    onTryHit(target, source, move) {
      this.debug("Commander Guard immunity: " + move.id);
      if (target === source || move.category === "Status" || move.type === "???" || move.id === "struggle")
        return;
      if (!source.species.dondozo && source.species.id !== "shedigiri") {
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-immune", target, "[from] ability: Commander Guard");
        }
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Commander Guard",
    shortDesc: "This Pokemon can only be hit by Dondozo."
  },
  notpayingattentiontodondozoatallsorry: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "not paying attention to dondozo at all, sorry");
      this.add("-message", `${pokemon2.name} is ignoring Dondozo!`);
    },
    onModifyMove(move, attacker, defender) {
      if (defender.hasAbility([
        "imterrifiedofdondozo",
        "coldcommander",
        "commanderguard",
        "imperialretreat",
        "powerofdondozo",
        "fishingseason",
        "fishesofruin",
        "fishout",
        "fishbond",
        "zombiefish",
        "yeah",
        "callforhelp",
        "donzoless",
        "falsedragon",
        "dondozoshield",
        "dondontzo",
        "emergencymeeting",
        "dondono",
        "gyeah",
        "fishnet",
        "commatose",
        "byeah",
        "dondophobic"
      ]))
        move.ignoreAbility = true;
    },
    // other effects in various other abilities
    name: "not paying attention to dondozo at all, sorry",
    shortDesc: "This Pokemon ignores the abilities with Dondozo in it."
  },
  imperialretreat: {
    onDamagingHit(damage, target, source, move) {
      if (source.species.dondozo) {
        target.switchFlag = true;
        this.add("-activate", target, "ability: Imperial Retreat");
      }
    },
    name: "Imperial Retreat",
    shortDesc: "This Pokemon switches out when hit by Dondozo."
  },
  powerofdondozo: {
    onAnyModifyBoost(boosts, pokemon2) {
      const unawareUser = this.effectState.target;
      if (unawareUser === pokemon2)
        return;
      if (unawareUser === this.activePokemon && pokemon2 === this.activeTarget) {
        boosts["def"] = 0;
        boosts["spd"] = 0;
        boosts["evasion"] = 0;
      }
      if (pokemon2 === this.activePokemon && unawareUser === this.activeTarget) {
        boosts["atk"] = 0;
        boosts["def"] = 0;
        boosts["spa"] = 0;
        boosts["accuracy"] = 0;
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "brn")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Power of Dondozo");
      }
      return false;
    },
    onUpdate(pokemon2) {
      if (pokemon2.status === "brn") {
        this.add("-activate", pokemon2, "ability: Power of Dondozo");
        pokemon2.cureStatus();
      }
      if (pokemon2.volatiles["attract"]) {
        this.add("-activate", pokemon2, "ability: Power of Dondozo");
        pokemon2.removeVolatile("attract");
        this.add("-end", pokemon2, "move: Attract", "[from] ability: Power of Dondozo");
      }
      if (pokemon2.volatiles["taunt"]) {
        this.add("-activate", pokemon2, "ability: Power of Dondozo");
        pokemon2.removeVolatile("taunt");
      }
    },
    onImmunity(type, pokemon2) {
      if (type === "attract")
        return false;
    },
    onTryHit(pokemon2, target, move) {
      if (move.id === "attract" || move.id === "captivate" || move.id === "taunt") {
        this.add("-immune", pokemon2, "[from] ability: Power of Dondozo");
        return null;
      }
    },
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Intimidate" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Power of Dondozo", "[of] " + target);
      }
    },
    flags: { breakable: 1 },
    name: "Power of Dondozo",
    shortDesc: "This Pokemon has the abilities of Dondozo."
  },
  sacrifice: {
    onStart(pokemon2) {
      let activated = false;
      for (const target of pokemon2.foes()) {
        if (!activated) {
          this.add("-ability", pokemon2, "Sacrifice", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          console.log(target);
          this.boost({ atk: -2, def: -2, spa: -2, spd: -2, spe: -2 }, target, pokemon2, null, true);
          pokemon2.faint();
        }
      }
    },
    name: "Sacrifice",
    shortDesc: "On switchin, this Pokemon jumps into the opponent's mouth, lowering all of its stats by 2."
  },
  fishingseason: {
    onStart(source) {
      let activated = false;
      for (const pokemon2 of source.side.foe.active) {
        if (!activated) {
          this.add("-ability", source, "Fishing Season");
        }
        activated = true;
        if (!pokemon2.volatiles["gastroacid"] && pokemon2.species.dondozo) {
          pokemon2.addVolatile("gastroacid");
          pokemon2.addVolatile("fishingseason");
        }
      }
    },
    onAnySwitchIn(pokemon2) {
      const source = this.effectState.target;
      if (pokemon2 === source)
        return;
      for (const target of source.side.foe.active) {
        if (!target.volatiles["gastroacid"] && target.species.dondozo) {
          target.addVolatile("gastroacid");
          target.addVolatile("fishingseason");
        }
      }
    },
    onEnd(pokemon2) {
      const source = this.effectState.target;
      for (const target of source.side.foe.active) {
        target.removeVolatile("gastroacid");
        target.removeVolatile("fishingseason");
      }
    },
    condition: {
      onDisableMove(pokemon2) {
        for (const moveSlot of pokemon2.moveSlots) {
          pokemon2.disableMove(moveSlot);
        }
      }
    },
    name: "Fishing Season",
    shortDesc: "While this Pokemon is active, Dondozo is suppressed."
  },
  fishesofruin: {
    onStart(pokemon2) {
      if (this.suppressingAbility(pokemon2))
        return;
      this.add("-ability", pokemon2, "Fishes of Ruin");
    },
    onResidual(pokemon2) {
      if (!pokemon2.hp)
        return;
      for (const target of pokemon2.foes()) {
        if (target.activeTurns && target.ability !== "fishesofruin" && target.ability !== "commatose" && target.ability !== "ouroboros" && target.ability !== "nauticalnuke" && target.ability !== "notpayingattentiontodondozoatallsorry") {
          target.addVolatile("fishesofruin");
        }
      }
    },
    onFaint(pokemon2) {
      for (const target of pokemon2.foes()) {
        if (target.volatiles["fishesofruin"])
          target.removeVolatile("fishesofruin");
      }
    },
    onEnd(pokemon2) {
      for (const target of pokemon2.foes()) {
        if (target.volatiles["fishesofruin"])
          target.removeVolatile("fishesofruin");
      }
    },
    condition: {
      onStart(pokemon2) {
        pokemon2.formeChange("Dondozo");
      },
      onEnd(pokemon2) {
        if (["Dondozo"].includes(pokemon2.species.forme)) {
          pokemon2.formeChange(pokemon2.species.battleOnly);
        }
      }
    },
    name: "Fishes of Ruin",
    shortDesc: "While this Pokemon is active, every other active Pokemon is Dondozo."
  },
  fishout: {
    name: "Fish Out",
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (!target.hp) {
        if (source.ability !== "notpayingattentiontodondozoatallsorry") {
          this.damage(Math.floor(target.getUndynamaxedHP(damage) * 1.546), source, target);
        } else {
          this.damage(target.getUndynamaxedHP(damage), source, target);
        }
      }
    },
    shortDesc: "When this Pokemon is knocked out by an opponent's attack, it deals damage to that opponent equal to Dondozo's HP."
  },
  fishbond: {
    onSourceAfterFaint(length, target, source, effect) {
      if (effect?.effectType !== "Move")
        return;
      if (source.abilityState.battleBondTriggered)
        return;
      if (source.species.id === "grenigiri" && source.hp && !source.transformed && source.side.foePokemonLeft()) {
        this.add("-activate", source, "ability: Fish Bond");
        pokemon.formeChange("Grenigiri-Dondozo", effect, true);
        const randAbil = this.random(3);
        if (randAbil < 1)
          pokemon.setAbility("unaware");
        else if (randAbil < 2)
          pokemon.setAbility("waterveil");
        else
          pokemon.setAbility("oblivious");
        this.boost({ atk: 2, def: 2, spa: 2, spd: 2, spe: 2 });
        source.abilityState.battleBondTriggered = true;
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Fish Bond",
    shortDesc: "After KOing a Pokemon: raises all stats by 2, transforms into Dondozo. Once per battle."
  },
  zombiefish: {
    shortDesc: "When this Pokemon faints, it's replaced by a Dondozo with 1/4 max HP.",
    name: "Zombie Fish",
    onBeforeSwitchIn(pokemon2) {
      if (pokemon2.zombie) {
        pokemon2.setAbility("unaware");
        pokemon2.baseAbility = "unaware";
        pokemon2.ability = "unaware";
        pokemon2.zombie = false;
        pokemon2.switchedIn = void 0;
      }
    },
    onFaint(pokemon2) {
      if (pokemon2.species.baseSpecies === "Drifugiri" && !pokemon2.transformed && !pokemon2.zombie && this.canSwitch(pokemon2.side)) {
        if (pokemon2.formeChange("Drifugiri-Dondozo", this.effect, true)) {
          this.add("-ability", pokemon2, "Zombie Fish");
          pokemon2.zombie = true;
          pokemon2.hp = Math.floor(pokemon2.maxhp / 4);
          const randAbil = this.random(3);
          if (randAbil < 1)
            pokemon2.setAbility("unaware");
          else if (randAbil < 2)
            pokemon2.setAbility("waterveil");
          else
            pokemon2.setAbility("oblivious");
          const avalanche = {
            move: "Avalanche",
            id: "avalanche",
            pp: 16,
            maxpp: 16,
            target: "normal",
            disabled: false,
            used: false
          };
          const curse = {
            move: "Curse",
            id: "curse",
            pp: 16,
            maxpp: 16,
            target: "normal",
            nonGhostTarget: "self",
            disabled: false,
            used: false
          };
          const sleeptalk = {
            move: "Sleep Talk",
            id: "sleeptalk",
            pp: 16,
            maxpp: 16,
            target: "self",
            disabled: false,
            used: false
          };
          const rest = {
            move: "Rest",
            id: "rest",
            pp: 16,
            maxpp: 16,
            target: "self",
            disabled: false,
            used: false
          };
          const eq = {
            move: "Earthquake",
            id: "earthquake",
            pp: 16,
            maxpp: 16,
            target: "allAdjacent",
            disabled: false,
            used: false
          };
          pokemon2.moveSlots[0] = avalanche;
          pokemon2.baseMoveSlots[0] = avalanche;
          const randMove = this.random(2);
          if (randMove < 1) {
            pokemon2.moveSlots[3] = curse;
            pokemon2.baseMoveSlots[3] = curse;
          } else {
            pokemon2.moveSlots[3] = sleeptalk;
            pokemon2.baseMoveSlots[3] = sleeptalk;
          }
          pokemon2.moveSlots[1] = rest;
          pokemon2.baseMoveSlots[1] = rest;
          pokemon2.moveSlots[2] = eq;
          pokemon2.baseMoveSlots[2] = eq;
        }
      }
    },
    flags: { breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    rating: 5,
    num: -1001
  },
  emergencymeeting: {
    onSwitchIn(pokemon2) {
      this.effectState.switchingIn = true;
    },
    onStart(pokemon2) {
      this.add("-message", `${pokemon2.name} transformed into Dondozo!`);
      pokemon2.formeChange("Dondozo");
      pokemon2.m.dondozo = true;
      const randAbil = this.random(3);
      if (randAbil < 1)
        pokemon2.setAbility("unaware");
      else if (randAbil < 2)
        pokemon2.setAbility("waterveil");
      else
        pokemon2.setAbility("oblivious");
      const avalanche = {
        move: "Avalanche",
        id: "avalanche",
        pp: 5,
        maxpp: 5,
        target: "normal",
        disabled: false,
        used: false
      };
      const bodypress = {
        move: "Body Press",
        id: "bodypress",
        pp: 5,
        maxpp: 5,
        target: "normal",
        disabled: false,
        used: false
      };
      const earthquake = {
        move: "Earthquake",
        id: "earthquake",
        pp: 5,
        maxpp: 5,
        target: "normal",
        disabled: false,
        used: false
      };
      const rest = {
        move: "Rest",
        id: "rest",
        pp: 5,
        maxpp: 5,
        target: "self",
        disabled: false,
        used: false
      };
      const curse = {
        move: "Curse",
        id: "curse",
        pp: 5,
        maxpp: 5,
        target: "self",
        disabled: false,
        used: false
      };
      pokemon2.moveSlots[0] = avalanche;
      pokemon2.baseMoveSlots[0] = avalanche;
      const randMove = this.random(2);
      if (randMove < 1) {
        pokemon2.moveSlots[3] = bodypress;
        pokemon2.baseMoveSlots[3] = bodypress;
      } else {
        pokemon2.moveSlots[3] = earthquake;
        pokemon2.baseMoveSlots[3] = earthquake;
      }
      pokemon2.moveSlots[1] = rest;
      pokemon2.baseMoveSlots[1] = rest;
      pokemon2.moveSlots[2] = curse;
      pokemon2.baseMoveSlots[2] = curse;
      this.boost({ atk: 2, def: 2, spa: 2, spd: 2, spe: 2 });
    },
    name: "Emergency Meeting",
    shortDesc: "On switchin, this Pokemon transforms into Dondozo and gains +2 in all stats."
  },
  yeah: {
    onStart(pokemon2) {
      console.log(pokemon2.side.pokemon.filter((pokemon3) => pokemon3.species.dondozo && !pokemon3.fainted));
      const dondozo = pokemon2.side.pokemon.filter((pokemon3) => pokemon3.species.dondozo && !pokemon3.fainted).length;
      this.add("-start", pokemon2, `Dondozo: ${this.effectState.dondozo}`, "[silent]");
      this.boost({ atk: dondozo * 2, def: dondozo * 2, spa: dondozo * 2, spd: dondozo * 2, spe: dondozo * 2 });
      this.effectState.dondozo = dondozo;
    },
    onEnd(pokemon2) {
      this.add("-end", pokemon2, `Dondozo: ${this.effectState.dondozo}`, "[silent]");
    },
    name: "yeah",
    shortDesc: "On switchin, this Pokemon gains +2 to all stats for each Dondozo on its team."
  },
  callforhelp: {
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect && effect.effectType === "Move" && ["mimigiri"].includes(target.species.id) && !target.transformed) {
        this.add("-activate", target, "ability: Call for Help");
        this.effectState.busted = true;
        return 0;
      }
    },
    onCriticalHit(target, source, move) {
      if (!target)
        return;
      if (!["mimigiri", "mimigiritotem"].includes(target.species.id) || target.transformed) {
        return;
      }
      const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
      if (hitSub)
        return;
      if (!target.runImmunity(move.type))
        return;
      return false;
    },
    onEffectiveness(typeMod, target, type, move) {
      if (!target || move.category === "Status")
        return;
      if (!["mimigiri"].includes(target.species.id) || target.transformed) {
        return;
      }
      const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
      if (hitSub)
        return;
      if (!target.runImmunity(move.type))
        return;
      return 0;
    },
    onUpdate(pokemon2) {
      if (["mimigiri", "mimigiritotem"].includes(pokemon2.species.id) && this.effectState.busted) {
        const speciesid = "Mimigiri-Dondozo";
        pokemon2.formeChange(speciesid, this.effect, true);
        this.damage(pokemon2.baseMaxhp / 8, pokemon2, pokemon2, this.dex.species.get(speciesid));
        const randAbil = this.random(3);
        if (randAbil < 1)
          pokemon2.setAbility("unaware");
        else if (randAbil < 2)
          pokemon2.setAbility("waterveil");
        else
          pokemon2.setAbility("oblivious");
      }
    },
    flags: { breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Call for Help",
    shortDesc: "The first hit it takes is blocked, and it takes 1/8 HP damage instead and becomes Dondozo."
  },
  ouroboros: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Ouroboros");
      this.boost({ atk: 2, def: 2, spa: 2, spd: 2, spe: 2 });
      pokemon2.faint();
    },
    /*
    onUpdate(pokemon) {
    	if (pokemon.volatiles['attract']) {
    		this.add('-activate', pokemon, 'ability: Ouroboros');
    		pokemon.removeVolatile('attract');
    		this.add('-end', pokemon, 'move: Attract', '[from] ability: Ouroboros');
    	}
    	if (pokemon.volatiles['taunt']) {
    		this.add('-activate', pokemon, 'ability: Ouroboros');
    		pokemon.removeVolatile('taunt');
    		// Taunt's volatile already sends the -end message when removed
    	}
    },
    onImmunity(type, pokemon) {
    	if (type === 'attract') return false;
    },
    onTryHit(pokemon, target, move) {
    	if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
    		this.add('-immune', pokemon, '[from] ability: Ouroboros');
    		return null;
    	}
    },*/
    name: "Ouroboros",
    shortDesc: "On switchin, this Pokemon jumps into its own mouth and gains +2 in all stats."
  },
  bozotodozo: {
    onSwitchOut(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Palagiri" || pokemon2.transformed)
        return;
      if (pokemon2.species.forme !== "Dondozo") {
        pokemon2.formeChange("Palagiri-Dondozo", this.effect, true);
      }
    },
    onSwitchIn() {
      this.effectState.switchingIn = true;
    },
    onStart(pokemon2) {
      if (!this.effectState.switchingIn)
        return;
      this.effectState.switchingIn = false;
      if (pokemon2.baseSpecies.baseSpecies !== "Palagiri" || pokemon2.transformed)
        return;
      if (!this.effectState.heroMessageDisplayed && pokemon2.species.forme === "Dondozo") {
        this.add("-activate", pokemon2, "ability: Bozo to Dozo");
        this.effectState.heroMessageDisplayed = true;
        const randAbil = this.random(3);
        if (randAbil < 1)
          pokemon2.setAbility("unaware");
        else if (randAbil < 2)
          pokemon2.setAbility("waterveil");
        else
          pokemon2.setAbility("oblivious");
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Bozo to Dozo",
    shortDesc: "This Pokemon transforms into Dondozo when switching out."
  },
  donzoless: {
    onModifyCritRatio(critRatio, source, target) {
      if (target.species.dondozo)
        return 5;
    },
    name: "Donzoless",
    shortDesc: "This Pokemon's attacks are critical hits against Dondozo."
  },
  falsedragon: {
    onBeforeSwitchIn(pokemon2) {
      const set = {
        name: "Dondozo",
        moves: ["Avalanche", "Body Press", "Curse", "Rest"]
      };
      pokemon2.illusion = new import_pokemon.Pokemon(set, pokemon2.side);
    },
    onDamagingHit(damage, target, source, move) {
      if (target.illusion) {
        this.singleEvent("End", this.dex.abilities.get("False Dragon"), target.abilityState, target, source, move);
      }
    },
    onEnd(pokemon2) {
      if (pokemon2.illusion) {
        this.debug("illusion cleared");
        pokemon2.illusion = null;
        const details = pokemon2.species.name + (pokemon2.level === 100 ? "" : ", L" + pokemon2.level) + (pokemon2.gender === "" ? "" : ", " + pokemon2.gender) + (pokemon2.set.shiny ? ", shiny" : "");
        this.add("replace", pokemon2, details);
        this.add("-end", pokemon2, "False Dragon");
      }
    },
    onFaint(pokemon2) {
      pokemon2.illusion = null;
    },
    name: "False Dragon",
    shortDesc: "(placeholder) This Pokemon is disguised as Dondozo until it takes a hit."
  },
  dondozoshield: {
    onStart(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Minigiri" || pokemon2.transformed)
        return;
      if (pokemon2.hp < pokemon2.maxhp / 2) {
        if (!pokemon2.species.dondozo) {
          pokemon2.formeChange("Minigiri-Dondozo");
        }
      } else {
        if (pokemon2.species.dondozo) {
          pokemon2.formeChange(pokemon2.set.species);
        }
      }
    },
    onResidualOrder: 29,
    onResidual(pokemon2) {
      if (pokemon2.baseSpecies.baseSpecies !== "Minigiri" || pokemon2.transformed || !pokemon2.hp)
        return;
      if (pokemon2.hp < pokemon2.maxhp / 2) {
        if (!pokemon2.species.dondozo) {
          pokemon2.formeChange("Minigiri-Dondozo");
        }
      } else {
        if (pokemon2.species.dondozo) {
          pokemon2.formeChange(pokemon2.set.species);
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Dondozo Shield",
    shortDesc: "At 1/2 max HP or less, this Pokemon transforms into Dondozo."
  },
  dondontzo: {
    onAnyTryMove(target, source, effect) {
      if (target.species.dondozo) {
        this.attrLastMove("[still]");
        this.add("cant", this.effectState.source, "ability: Dondon'tzo", effect, "[of] " + target);
        return false;
      }
    },
    flags: { breakable: 1 },
    name: "Dondon'tzo",
    shortDesc: "Prevents Dondozo's moves while this ability is active."
  },
  dondono: {
    onTryHit(target, source, move) {
      if (target !== source && source.species.dondozo) {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Dondo-No");
        }
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Dondo-No",
    shortDesc: "This Pokemon heals 1/4 max HP when hit by Dondozo; immunity to Dondozo."
  },
  gyeah: {
    onUpdate(pokemon2) {
      let target = null;
      for (const foe of pokemon2.foes()) {
        target = foe;
      }
      if (pokemon2.baseSpecies.baseSpecies !== "Malagiri" || !target.species.dondozo) {
        if (pokemon2.getVolatile("gyeahperpetrator"))
          pokemon2.removeVolatile("gyeahperpetrator");
        return;
      }
      if (!pokemon2.getVolatile("gyeahperpetrator")) {
        if (target.getVolatile("gyeahvictim"))
          return;
        this.queue.cancelAction(pokemon2);
        this.add("-activate", pokemon2, "ability: gyeah", "[of] " + target);
        pokemon2.addVolatile("gyeahperpetrator");
        target.addVolatile("gyeahvictim", pokemon2);
      } else {
        if (!target.fainted)
          return;
        pokemon2.removeVolatile("gyeahperpetrator");
      }
    },
    name: "gyeah",
    shortDesc: "If enemy is Dondozo: this Pokemon cannot act or be hit, -2 to Dondozo's stats."
  },
  fishnet: {
    onFoeTrapPokemon(pokemon2) {
      if (!pokemon2.isAdjacent(this.effectState.target))
        return;
      if (pokemon2.species.dondozo) {
        pokemon2.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon2, source) {
      if (!source)
        source = this.effectState.target;
      if (!source || !pokemon2.isAdjacent(source))
        return;
      if (pokemon2.species.dondozo) {
        pokemon2.maybeTrapped = true;
      }
    },
    name: "Fishnet",
    shortDesc: "Prevents opposing Dondozo from switching out."
  },
  commatose: {
    onStart(pokemon2) {
      this.add("-ability", pokemon2, "Commatose");
    },
    onSetStatus(status, target, source, effect) {
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Commatose");
      }
      return false;
    },
    // dondozo effect in pokedex.ts
    name: "Commatose",
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    shortDesc: "This Pokemon cannot be statused, and is considered to be Dondozo."
  },
  byeah: {
    onModifyMovePriority: 1,
    onModifyMove(move, attacker, defender) {
      if (attacker.species.baseSpecies !== "Aegigiri" && attacker.species.baseSpecies !== "Aegigiri-Dondozo" || attacker.transformed)
        return;
      if (move.category === "Status" && move.id !== "kingsshield")
        return;
      const targetForme = move.id === "kingsshield" ? "Aegigiri" : "Aegigiri-Dondozo";
      if (attacker.species.name !== targetForme)
        attacker.formeChange(targetForme);
      attacker.setAbility("byeah");
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "byeah",
    shortDesc: "This Pokemon changes to Dondozo before it attacks."
  },
  dondophobic: {
    /*
    onStart(pokemon) {
    	for (const target of pokemon.foes()) {
    		if (target.species.dondozo) {
    			this.add('-ability', pokemon, 'Anticipation');
    			this.boost({atk: 2, def: 2, spa: 2, spd: 2, spe:2});
    			return;
    		}
    	}
    },*/
    onResidual(pokemon2) {
      if (!pokemon2.hp)
        return;
      for (const target of pokemon2.foes()) {
        if (target.species.dondozo)
          this.damage(pokemon2.baseMaxhp / 8, pokemon2, pokemon2);
        else
          this.heal(pokemon2.baseMaxhp / 4);
      }
    },
    name: "Dondophobic",
    shortDesc: "This Pokemon heals 1/4 max HP against non-Dondozo and damaged 1/8 max HP against Dondozo at the end of each turn."
  }
};
//# sourceMappingURL=abilities.js.map
