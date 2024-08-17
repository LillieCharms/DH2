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
var moves_exports = {};
__export(moves_exports, {
  Moves: () => Moves
});
module.exports = __toCommonJS(moves_exports);
const Moves = {
  atempo: {
    name: "A Tempo",
    shortDesc: "Clears everyone's stat modifiers.",
    target: "all",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: true,
    priority: 0,
    flags: { bypasssub: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Haze", target);
    },
    onHitField() {
      this.add("-clearallboost");
      for (const pokemon of this.getAllActive()) {
        pokemon.clearBoosts();
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 196
  },
  acidtears: {
    name: "Acid Tears",
    shortDesc: "Poisons and scares the foe.",
    target: "normal",
    type: "Poison",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 85,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fake Tears", target);
    },
    status: "psnfear"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 240
  },
  aikidoarts: {
    name: "Aikido Arts",
    shortDesc: "Damage is equal to the user's level.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Seismic Toss", target);
    },
    damage: "level"
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 133
  },
  airstamp: {
    name: "Air Stamp",
    shortDesc: "Forces the foe to switch out for a random puppet after doing damage. Ends battles against wild puppets.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 55,
    pp: 6.25,
    accuracy: 95,
    priority: -6,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Whirlwind", target);
    },
    forceSwitch: true
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 58
  },
  alluringmaze: {
    name: "Alluring Maze",
    shortDesc: "Attacks against the foe's SpDef instead of their FoDef.",
    target: "normal",
    type: "Warped",
    category: "Physical",
    basePower: 80,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psyshock", target);
    },
    overrideDefensiveStat: "def"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 130
  },
  ambient: {
    name: "Ambient",
    shortDesc: "10% chance to lower one of the foe's stats randomly.",
    target: "normal",
    type: "Sound",
    category: "Physical",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hyper Voice", target);
    },
    secondaries: [
      {
        chance: 10,
        onHit(target, source2, move) {
          const stats = [];
          let stat;
          for (stat in target.boosts) {
            if (stat === "accuracy" || stat === "evasion")
              continue;
            if (target.boosts[stat] > -6) {
              stats.push(stat);
            }
          }
          if (stats.length) {
            const randomStat = this.sample(stats);
            const boost = {};
            boost[randomStat] = -1;
            this.boost(boost);
          } else {
            return false;
          }
        }
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 64
  },
  amnesia: {
    name: "Amnesia",
    shortDesc: "The foe will be stopped at the end of the next turn.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Yawn", target);
    },
    volatileStatus: "amnesia",
    onTryHit(target) {
      if (target.status || !target.runStatusImmunity("stp")) {
        return false;
      }
    },
    condition: {
      noCopy: true,
      // doesn't get copied by Baton Pass
      duration: 2,
      onStart(target, source2) {
        this.add("-start", target, "move: Amnesia", "[of] " + source2);
      },
      onResidualOrder: 23,
      onEnd(target) {
        this.add("-end", target, "move: Amnesia", "[silent]");
        target.trySetStatus("stp", this.effectState.source);
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 188
  },
  angelladder: {
    name: "Angel Ladder",
    shortDesc: "20% chance to lower the foe's Accuracy.",
    target: "normal",
    type: "Light",
    category: "Physical",
    basePower: 70,
    pp: 12.5,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flash", target);
    },
    secondary: {
      chance: 20,
      boosts: { accuracy: -1 }
    }
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 78
  },
  applebomb: {
    name: "Apple Bomb",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 60,
    pp: 12.5,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Apple Acid", target);
    },
    critRatio: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 19
  },
  aquacannon: {
    name: "Aqua Cannon",
    shortDesc: "Power decreases if the user is not at full HP.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 150,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Water Spout", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (pokemon.hp === pokemon.baseMaxhp) {
        return 150;
      }
      return 100 * pokemon.hp / pokemon.baseMaxhp;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 117
  },
  aquacutter: {
    name: "Aqua Cutter",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aqua Jet", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  aquajavelin: {
    name: "Aqua Javelin",
    shortDesc: "20% chance to lower the foe's Speed.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 80,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1, javelin: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Liquidation", target);
    },
    secondary: {
      chance: 20,
      boosts: { spe: -1 }
    }
    // Class: BU
    // Effect Chance: 200
    // Effect ID: 38
  },
  aquarake: {
    name: "Aqua Rake",
    shortDesc: "The user cannot move next turn.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 150,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { recharge: 1, protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hydro Cannon", target);
    },
    self: {
      volatileStatus: "mustrecharge"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 50
  },
  aquasonic: {
    name: "Aquasonic",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aqua Jet", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  aquaticwaltz: {
    name: "Aquatic Waltz",
    shortDesc: "Changes the foe's type to Water.",
    target: "normal",
    type: "Water",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Soak", target);
    },
    onHit(target) {
      if (target.getTypes().join() === "Water" || !target.setType("Water")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Water");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 220
  },
  arclight: {
    name: "Arclight",
    shortDesc: "Harshly lowers the user's SpAtk.",
    target: "normal",
    type: "Light",
    category: "Special",
    basePower: 130,
    pp: 3.125,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flash", target);
    },
    self: {
      boosts: { spa: -2 }
    }
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 56
  },
  armorpierce: {
    name: "Armor Pierce",
    shortDesc: "10% chance to make the foe flinch.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 90,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Iron Head", target);
    },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 18
  },
  astrology: {
    name: "Astrology",
    shortDesc: "Harshly lowers the foe's FoAtk.",
    target: "normal",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Eerie Impulse", target);
    },
    boosts: {
      atk: -2
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 44
  },
  atomicenergy: {
    name: "Atomic Energy",
    shortDesc: "The user recovers half of the damage dealt.",
    target: "normal",
    type: "Light",
    category: "Physical",
    basePower: 75,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Drain Punch", target);
    },
    drain: [1, 2]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 141
  },
  auradrain: {
    name: "Aura Drain",
    shortDesc: "The user recovers half of the damage dealt.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 75,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1, heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Drain Punch", target);
    },
    drain: [1, 2]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 141
  },
  backdraft: {
    name: "Backdraft",
    shortDesc: "10% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Heat Wave", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "brn"
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 2
  },
  backhandblow: {
    name: "Backhand Blow",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 80,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Karate Chop", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  backupplan: {
    name: "Backup Plan",
    shortDesc: "Switches to another puppet. That puppet inherits the user's stat modifiers.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Baton Pass", target);
    },
    onHit(target) {
      if (!this.canSwitch(target.side) || target.volatiles["commanded"]) {
        this.attrLastMove("[still]");
        this.add("-fail", target);
        return this.NOT_FAIL;
      }
    },
    self: {
      onHit(source2) {
        source2.skipBeforeSwitchOutEventFlag = true;
      }
    },
    selfSwitch: "copyvolatile"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 61
  },
  badmoon: {
    name: "Bad Moon",
    shortDesc: "10% chance to blind the foe.",
    target: "normal",
    type: "Dark",
    category: "Special",
    basePower: 55,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dark Pulse", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "dark"
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 3
  },
  barrierup: {
    name: "Barrier Up",
    shortDesc: "Raises the user's SpDef.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 21.875,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Iron Defense", target);
    },
    self: {
      boosts: {
        spd: 1
      }
    }
  },
  battlepreparation: {
    name: "Battle Preparation",
    shortDesc: "Raises the user's FoAtk, FoDef, and Accuracy.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Swords Dance", target);
    },
    boosts: { atk: 1, def: 1, accuracy: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 82
  },
  behindyou: {
    name: "Behind You!",
    shortDesc: "Scares the foe.",
    target: "normal",
    type: "Nether",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: 90,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mean Look", target);
    },
    status: "fear"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 23
  },
  bellow: {
    name: "Bellow",
    shortDesc: "Lowers the foe's SpDef.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Screech", target);
    },
    boosts: { spd: -1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 47
  },
  bewitchingpollen: {
    name: "Bewitching Pollen",
    shortDesc: "Stops the foe. Does not work on Nature-type puppets.",
    target: "normal",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 70,
    priority: 0,
    flags: {},
    onPrepareHit: function(source2, target, move) {
      this.attrLastMove("[still]");
      this.add("-anim", target, "Spore", source2);
    },
    status: "stp",
    onTryImmunity(target) {
      return !target.hasType("Nature");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 25
  },
  bindtrap: {
    name: "Bind Trap",
    shortDesc: "Lays a trap that lowers the Speed of foes entering the field.",
    target: "foeSide",
    type: "Dark",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sticky Web", target);
    },
    sideCondition: "bindtrap",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Bind Trap");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded())
          return;
        if (pokemon.types.includes("Dark"))
          return;
        this.add("-activate", pokemon, "move: Bind Trap");
        this.boost({ spe: -1 }, pokemon, this.effectState.source, this.dex.getActiveMove("bindtrap"));
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 215
  },
  blackhole: {
    name: "Black Hole",
    shortDesc: "The foe becomes unable to switch out until the user leaves the field.",
    target: "normal",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dark Void", target);
    },
    onHit(target, source2, move) {
      if (target.addVolatile("trapped", source2, move, "trapper")) {
        source2.addVolatile("blackhole");
        return true;
      }
    },
    condition: {
      onSwitchOut(pokemon) {
        for (const foe of pokemon.foes()) {
          foe.removeVolatile("trapped");
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 183
  },
  blackout: {
    name: "Blackout",
    shortDesc: "30% chance to blind the foe.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 75,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Throat Chop", target);
    },
    secondaries: [
      {
        chance: 30,
        status: "dark"
      }
    ]
    // Class: BU
    // Effect Chance: 300
    // Effect ID: 3
  },
  blazeoftenmei: {
    name: "Blaze of Tenmei",
    shortDesc: "Burns the foe.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 100,
    pp: 3.125,
    accuracy: 50,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Inferno", target);
    },
    status: "brn"
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 2
  },
  blazespear: {
    name: "Blaze Spear",
    shortDesc: "10% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 100,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Searing Shot", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "brn"
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 2
  },
  blitzkrieg: {
    name: "Blitzkrieg",
    shortDesc: "Power doubles if the foe is switching out.",
    target: "normal",
    type: "Electric",
    category: "Physical",
    basePower: 55,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sucker Punch", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (this.queue.willMove(target) || target.beingCalledBack || target.switchFlag) {
        return move.basePower * 2;
      }
      return move.basePower;
    },
    beforeTurnCallback(pokemon) {
      for (const side of this.sides) {
        if (side === pokemon.side)
          continue;
        side.addSideCondition("blitzkrieg", pokemon);
        const data = side.getSideConditionData("blitzkrieg");
        if (!data.sources) {
          data.sources = [];
        }
        data.sources.push(pokemon);
      }
    },
    onModifyMove(move, source2, target) {
      if (target?.beingCalledBack)
        move.accuracy = true;
    },
    onTryHit(target, pokemon) {
      target.side.removeSideCondition("blitzkrieg");
    },
    condition: {
      duration: 1,
      onBeforeSwitchOut(pokemon) {
        this.debug("Blitzkrieg start");
        let alreadyAdded = false;
        pokemon.removeVolatile("callofthedead");
        for (const source2 of this.effectState.sources) {
          if (!this.queue.cancelMove(source2) || !source2.hp)
            continue;
          if (!alreadyAdded) {
            this.add("-activate", pokemon, "move: Blitzkrieg");
            alreadyAdded = true;
          }
          this.runMove("blitzkrieg", source2, this.getTargetLoc(pokemon, source2));
        }
      }
    }
    // Class: BU
    // Effect Chance: 0
    // Effect ID: 600
  },
  bloodystorm: {
    name: "Bloody Storm",
    shortDesc: "10% chance to make the foe flinch.",
    target: "normal",
    type: "Dark",
    category: "Special",
    basePower: 70,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hurricane", target);
    },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 18
  },
  blowfromcalamity: {
    name: "Blow from Calamity",
    shortDesc: "Power doubles if the user has a status ailment. Ignores the penalty from Dark status.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 70,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Facade", target);
    },
    onBasePower(basePower, pokemon) {
      if (pokemon.status && pokemon.status !== "slp") {
        return this.chainModify(2);
      }
    }
  },
  booing: {
    name: "Booing",
    shortDesc: "Forces the foe to switch out for a random puppet. Ends battles against wild puppets.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: -6,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Roar", target);
    },
    forceSwitch: true
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 57
  },
  boutdrunkard: {
    name: "Bout Drunkard",
    shortDesc: "Stops the foe.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hypnosis", target);
    },
    status: "stp"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 25
  },
  brandish: {
    name: "Brandish",
    shortDesc: "The user takes 1/3 of the damage in recoil.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 120,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double-Edge", target);
    },
    recoil: [1, 3]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 51
  },
  braveburst: {
    name: "Brave Burst",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 90,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Focus Blast", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  bravesong: {
    name: "Brave Song",
    shortDesc: "Sharply raises the user's SpAtk.",
    target: "self",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Clangorous Soul", target);
    },
    self: {
      boosts: { spa: 2 }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 41
  },
  breakshot: {
    name: "Break Shot",
    shortDesc: "Breaks the foe's Field Barrier and Field Protect effects before doing damage.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 75,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Brick Break", target);
    },
    onTryHit(pokemon) {
      pokemon.side.removeSideCondition("fieldprotect");
      pokemon.side.removeSideCondition("fieldbarrier");
    }
  },
  burnstrike: {
    name: "Burn Strike",
    shortDesc: "10% chance to burn the foe. Lands critical hits more often.",
    target: "normal",
    type: "Fire",
    category: "Physical",
    basePower: 90,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fire Punch", target);
    },
    critRatio: 1,
    secondaries: [
      {
        chance: 10,
        status: "brn"
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 100
  },
  butterflysflit: {
    name: "Butterfly's Flit",
    shortDesc: "The user recovers a little HP every turn.",
    target: "self",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Ingrain", target);
    },
    volatileStatus: "butterflysflit",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Butterfly's Flit");
      },
      onResidualOrder: 6,
      onResidual(pokemon) {
        this.heal(pokemon.baseMaxhp / 16);
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 222
  },
  callofthedead: {
    name: "Call of the Dead",
    shortDesc: "If the user faints due to a Skill before their next action, the foe also faints.",
    target: "self",
    type: "Nether",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 0,
    flags: { bypasssub: 1, failcopycat: 1 },
    volatileStatus: "callofthedead",
    onPrepareHit(target, source2) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Destiny Bond", target);
      return !target.removeVolatile("callofthedead");
    },
    condition: {
      onStart(pokemon) {
        this.add("-message", `The dead call upon ${source.name}...`);
        this.add("-singlemove", pokemon, "Call of the Dead");
      },
      onFaint(target, source2, effect) {
        if (!source2 || !effect || target.isAlly(source2))
          return;
        if (effect.effectType === "Move" && !effect.flags.futuremove) {
          this.add("-message", `${source2.name} was dragged down by the dead...`);
          this.add("-activate", target, "move: Call of the Dead", "[silent]");
          source2.faint();
        }
      },
      onBeforeMovePriority: -1,
      onBeforeMove(pokemon, target, move) {
        if (move.id === "callofthedead")
          return;
        this.debug("removing Call of the Dead before attack");
        pokemon.removeVolatile("callofthedead");
      },
      onMoveAborted(pokemon, target, move) {
        pokemon.removeVolatile("callofthedead");
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 181
  },
  camouflage: {
    name: "Camouflage",
    shortDesc: "Sharply raises the user's Evasion.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Camouflage", target);
    },
    boosts: { evasion: 2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 80
  },
  cataclysm: {
    name: "Cataclysm",
    shortDesc: "The user cannot move next turn.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 150,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { recharge: 1, protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fissure", target);
    },
    self: {
      volatileStatus: "mustrecharge"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 50
  },
  catastrophe: {
    name: "Catastrophe",
    shortDesc: "10% chance to lower the foe's SpDef.",
    target: "normal",
    type: "Illusion",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Focus Blast", target);
    },
    secondaries: [
      {
        chance: 10,
        boosts: { spd: -1 }
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 37
  },
  changeling: {
    name: "Changeling",
    viable: true,
    shortDesc: "If it inflicts damage, the user switches for another puppet. Ends battles against wild puppets.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 70,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "U-Turn", target);
    },
    selfSwitch: true
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 60
  },
  chargethief: {
    name: "Charge Thief",
    shortDesc: "The user recovers half of the damage dealt.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 75,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Parabolic Charge", target);
    },
    drain: [1, 2]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 141
  },
  chargingstun: {
    name: "Charging Stun",
    shortDesc: "Forces the foe to switch out for a random puppet after doing damage. Ends battles against wild puppets.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 55,
    pp: 6.25,
    accuracy: 95,
    priority: -6,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Circle Throw", target);
    },
    forceSwitch: true
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 58
  },
  charonferries: {
    name: "Charon Ferries",
    shortDesc: "Damage is equal to the user's level.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 0,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Night Shade", target);
    },
    damage: "level"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 133
  },
  cheer: {
    name: "Cheer",
    shortDesc: "Sharply raises the user's SpDef.",
    target: "self",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Helping Hand", target);
    },
    boosts: { spd: 2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 42
  },
  chromeray: {
    name: "Chrome Ray",
    shortDesc: "10% chance to lower the foe's SpDef.",
    target: "normal",
    type: "Steel",
    category: "Special",
    basePower: 90,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flash Cannon", target);
    },
    secondaries: [
      {
        chance: 10,
        boosts: { spd: -1 }
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 37
  },
  claim: {
    name: "Claim",
    shortDesc: "Prevents the foe from using the same Skill twice in a row.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Disable", target);
    },
    volatileStatus: "claim",
    condition: {
      noCopy: true,
      onStart(pokemon, source2, effect) {
        this.add("-start", pokemon, "Claim");
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Claim");
      },
      onDisableMove(pokemon) {
        if (pokemon.lastMove && pokemon.lastMove.id !== "struggle")
          pokemon.disableMove(pokemon.lastMove.id);
      }
    }
  },
  clearingmist: {
    name: "Clearing Mist",
    shortDesc: "Power is higher if the foe's cost is high.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Meteor Mash", target);
    },
    basePowerCallback(pokemon, target, move) {
      switch (target.getWeight()) {
        case 0:
          return 40;
        case 1:
          return 60;
        case 2:
          return 80;
        case 3:
          return 100;
        case 4:
          return 120;
      }
      return 40;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 126
  },
  cloudburst: {
    name: "Cloudburst",
    shortDesc: "Raises the user's FoAtk and FoDef at the cost of Speed.",
    target: "self",
    type: "Water",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Curse", target);
    },
    boosts: { atk: 1, def: 1, spe: -1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 71
  },
  coldrain: {
    name: "Cold Rain",
    shortDesc: "10% chance to stop the foe.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 80,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Scald", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "stp"
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 6
  },
  concussion: {
    name: "Concussion",
    shortDesc: "20% chance to make the foe flinch.",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aura Sphere", target);
    },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    }
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 18
  },
  confine: {
    name: "Confine",
    shortDesc: "Paralyzes the foe.",
    target: "normal",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bind", target);
    },
    status: "par"
  },
  conflagration: {
    name: "Conflagration",
    shortDesc: "Power is higher if the user's Cost is higher than the foe's.",
    target: "normal",
    type: "Fire",
    category: "Physical",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flare Blitz", target);
    },
    basePowerCallback(pokemon, target, move) {
      let costDiff = pokemon.getWeight() - target.getWeight();
      switch (costDiff) {
        case 1:
          return 75;
        case 2:
          return 90;
        case 3:
          return 105;
        case 4:
          return 120;
      }
      return 60;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 121
  },
  contagion: {
    name: "Contagion",
    shortDesc: "Poisons the foe.",
    target: "normal",
    type: "Poison",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Poison Gas", target);
    },
    status: "psn"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 20
  },
  continue: {
    name: "Continue",
    shortDesc: "The user recovers all HP and status, but is stopped for two turns.",
    target: "self",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: { heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rest", target);
    },
    onTryMove(pokemon) {
      if (pokemon.status === "stp" || pokemon.hasAbility("comatose"))
        return false;
      if (pokemon.hp === pokemon.maxhp) {
        this.add("-fail", pokemon, "heal");
        return null;
      }
      if (pokemon.hasAbility("active")) {
        this.add("-fail", pokemon, "[from] ability: " + pokemon.getAbility().name, "[of] " + pokemon);
        return null;
      }
    },
    onHit(target, source2, move) {
      if (!target.setStatus("stp", source2, move))
        return false;
      target.statusState.time = 3;
      target.statusState.startTime = 3;
      this.heal(target.maxhp);
    }
  },
  corkscrew: {
    name: "Corkscrew",
    shortDesc: "70% chance to raise the user's FoAtk.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 50,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Power-up Punch", target);
    },
    secondaries: [
      {
        chance: 70,
        self: {
          boosts: { spa: 1 }
        }
      }
    ]
    // Class: BU
    // Effect Chance: 700
    // Effect ID: 29
  },
  creepingdarkness: {
    name: "Creeping Darkness",
    shortDesc: "Poisons and blinds the foe.",
    target: "normal",
    type: "Dark",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 85,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Night Shade", target);
    },
    status: "psndark"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 239
  },
  crosschange: {
    name: "Cross Change",
    shortDesc: "Switches the user's Ability with the foe's.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Skill Swap", target);
    },
    onTryHit(target, source2) {
      const additionalBannedAbilities = ["hungerswitch", "illusion", "neutralizinggas", "wonderguard"];
      const targetAbility = target.getAbility();
      const sourceAbility = source2.getAbility();
      if (target.volatiles["dynamax"] || targetAbility.isPermanent || sourceAbility.isPermanent || additionalBannedAbilities.includes(target.ability) || additionalBannedAbilities.includes(source2.ability)) {
        return false;
      }
      const sourceCanBeSet = this.runEvent("SetAbility", source2, source2, this.effect, targetAbility);
      if (!sourceCanBeSet)
        return sourceCanBeSet;
      const targetCanBeSet = this.runEvent("SetAbility", target, source2, this.effect, sourceAbility);
      if (!targetCanBeSet)
        return targetCanBeSet;
    },
    onHit(target, source2, move) {
      const targetAbility = target.getAbility();
      const sourceAbility = source2.getAbility();
      if (target.isAlly(source2)) {
        this.add("-activate", source2, "move: Cross Change", "", "", "[of] " + target);
      } else {
        this.add("-activate", source2, "move: Cross Change", targetAbility, sourceAbility, "[of] " + target);
      }
      this.singleEvent("End", sourceAbility, source2.abilityState, source2);
      this.singleEvent("End", targetAbility, target.abilityState, target);
      source2.ability = targetAbility.id;
      target.ability = sourceAbility.id;
      source2.abilityState = { id: this.toID(source2.ability), target: source2 };
      target.abilityState = { id: this.toID(target.ability), target };
      if (!target.isAlly(source2))
        target.volatileStaleness = "external";
      this.singleEvent("Start", targetAbility, source2.abilityState, source2);
      this.singleEvent("Start", sourceAbility, target.abilityState, target);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 190
  },
  crosscounter: {
    name: "Cross Counter",
    shortDesc: "Damage is twice the damage taken from the foe's Focus attack on the same turn.",
    target: "scripted",
    type: "Fighting",
    category: "Physical",
    basePower: 0,
    damageCallback(pokemon) {
      if (!pokemon.volatiles["crosscounter"])
        return 0;
      return pokemon.volatiles["crosscounter"].damage || 1;
    },
    pp: 12.5,
    accuracy: 100,
    priority: -5,
    flags: { protect: 1, contact: 1, counter: 1, failcopycat: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Counter", target);
    },
    beforeTurnCallback(pokemon) {
      pokemon.addVolatile("crosscounter");
    },
    onTry(source2) {
      if (!source2.volatiles["crosscounter"])
        return false;
      if (source2.volatiles["crosscounter"].slot === null)
        return false;
    },
    condition: {
      duration: 1,
      noCopy: true,
      onStart(target, source2, move) {
        this.effectState.slot = null;
        this.effectState.damage = 0;
      },
      onRedirectTargetPriority: -1,
      onRedirectTarget(target, source2, source22, move) {
        if (move.id !== "crosscounter")
          return;
        if (source2 !== this.effectState.target || !this.effectState.slot)
          return;
        return this.getAtSlot(this.effectState.slot);
      },
      onDamagingHit(damage, target, source2, move) {
        if (!source2.isAlly(target) && this.getCategory(move) === "Physical") {
          this.effectState.slot = source2.getSlot();
          this.effectState.damage = 2 * damage;
        }
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 135
  },
  crossdrive: {
    name: "Cross Drive",
    shortDesc: "Lowers the user's Speed.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 100,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hammer Arm", target);
    },
    self: {
      boosts: { spe: -1 }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 226
  },
  crossbowassault: {
    name: "Crossbow Assault",
    shortDesc: "30% chance to paralyze the foe.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 85,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spirit Shackle", target);
    },
    secondary: {
      chance: 30,
      status: "par"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 5
  },
  cruciform: {
    name: "Cruciform",
    shortDesc: "Hits twice.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 50,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double Hit", target);
    },
    multihit: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 224
  },
  cursereversal: {
    name: "Curse Reversal",
    shortDesc: "Adds the user's and foe's current HP and sets both to half of that.",
    target: "normal",
    type: "Nether",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Pain Split", target);
    },
    onHit(target, pokemon) {
      const targetHP = target.getUndynamaxedHP();
      const averagehp = Math.floor((targetHP + pokemon.hp) / 2) || 1;
      const targetChange = targetHP - averagehp;
      target.sethp(target.hp - targetChange);
      this.add("-sethp", target, target.getHealth, "[from] move: Curse Reversal", "[silent]");
      pokemon.sethp(averagehp);
      this.add("-sethp", pokemon, pokemon.getHealth, "[from] move: Curse Reversal");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 191
  },
  dancingrain: {
    name: "Dancing Rain",
    shortDesc: "50% chance to lower the foe's FoDef.",
    target: "normal",
    type: "Sound",
    category: "Physical",
    basePower: 75,
    pp: 6.25,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hyper Voice", target);
    },
    secondaries: [
      {
        chance: 50,
        boosts: { def: -1 }
      }
    ]
    // Class: BU
    // Effect Chance: 500
    // Effect ID: 35
  },
  dancingsword: {
    name: "Dancing Sword",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sacred Sword", target);
    },
    critRatio: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 19
  },
  dancingwind: {
    name: "Dancing Wind",
    shortDesc: "10% chance to raise all of the user's stats.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Silver Wind", target);
    },
    secondary: {
      chance: 10,
      self: {
        boosts: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 63
  },
  danmakudance: {
    name: "Danmaku Dance",
    shortDesc: "The user attacks for 2-3 turns, then becomes confused.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thrash", target);
    },
    self: {
      volatileStatus: "lockedmove"
    },
    onAfterMove(pokemon) {
      if (pokemon.volatiles["lockedmove"] && pokemon.volatiles["lockedmove"].duration === 1) {
        pokemon.removeVolatile("lockedmove");
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 150
  },
  danmakuorchestra: {
    name: "Danmaku Orchestra",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Sound",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Boomburst", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  darkarrow: {
    name: "Dark Arrow",
    shortDesc: "Hits twice.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 50,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spirit Shackle", target);
    },
    multihit: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 224
  },
  darkball: {
    name: "Dark Ball",
    shortDesc: "10% chance to blind the foe.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 55,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rollout", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "dark"
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 3
  },
  darkinnocence: {
    name: "Dark Innocence",
    shortDesc: "Hits two to five times.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 25,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Feint Attack", target);
    },
    multihit: [2, 5]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 53
  },
  darkpower: {
    name: "Dark Power",
    shortDesc: "Raises the user's FoAtk and FoDef.",
    target: "self",
    type: "Dark",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Nasty Plot", target);
    },
    boosts: { atk: 1, def: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 72
  },
  darksign: {
    name: "Dark Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Dark",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  darksphere: {
    name: "Dark Sphere",
    shortDesc: "20% chance to make the foe flinch. Power increases against camouflage users and guaranteed to hit.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 100,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rollout", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (target?.moveSlots) {
        for (const moveSlot of target?.moveSlots) {
          if (moveSlot.id === "camouflage" && moveSlot.used) {
            return move.basePower * 2;
          }
        }
      }
      return move.basePower;
    },
    onModifyMove(move, pokemon, target) {
      if (target?.moveSlots) {
        for (const moveSlot of target?.moveSlots) {
          if (moveSlot.id === "camouflage" && moveSlot.used) {
            move.accuracy = true;
            return;
          }
        }
      }
    },
    secondaries: [
      {
        chance: 20,
        volatileStatus: "flinch"
      }
    ]
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 105
  },
  darksweets: {
    name: "Dark Sweets",
    shortDesc: "10% chance to blind the foe.",
    target: "normal",
    type: "Dark",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dark Pulse", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "dark"
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 3
  },
  darknessdance: {
    name: "Darkness Dance",
    shortDesc: "The user attacks for 2-3 turns, then becomes confused.",
    target: "normal",
    type: "Dark",
    category: "Special",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Revelation Dance", target);
    },
    self: {
      volatileStatus: "lockedmove"
    },
    onAfterMove(pokemon) {
      if (pokemon.volatiles["lockedmove"] && pokemon.volatiles["lockedmove"].duration === 1) {
        pokemon.removeVolatile("lockedmove");
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 150
  },
  deadofnight: {
    name: "Dead of Night",
    shortDesc: "Raises the user's Evasion.",
    target: "self",
    type: "Dark",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double Team", target);
    },
    boosts: { evasion: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 79
  },
  deathmatch: {
    name: "Death Match",
    shortDesc: "Power is higher the lower the user's current HP is.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 0,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Reversal", target);
    },
    basePowerCallback(pokemon, target, move) {
      const bp = [200, 150, 100, 80, 40];
      if (pokemon.hp === 1)
        return bp[0];
      const numerators = [2, 5, 10, 17, 33];
      let hp = pokemon.hp / pokemon.maxhp;
      for (let i = 0; i < numerators.length; i++) {
        if (hp < numerators[i] / 48)
          return bp[i];
      }
      return 20;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 122
  },
  decrescendo: {
    name: "Decrescendo",
    shortDesc: "Lowers the foe's FoAtk and SpAtk. The user then switches for another puppet. Ends battles against wild puppets.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Parting Shot", target);
    },
    boosts: { atk: -1, spa: -1 },
    selfSwitch: true
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 86
  },
  deflagration: {
    name: "Deflagration",
    shortDesc: "The user cannot move next turn.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 150,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { recharge: 1, protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Blast Burn", target);
    },
    self: {
      volatileStatus: "mustrecharge"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 50
  },
  densebarrage: {
    name: "Dense Barrage",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 140,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Barrage", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  densefogbloom: {
    name: "Dense Fog Bloom",
    shortDesc: "A two-turn skill. The user charges on the first turn. Works instantly during Heavy Fog.",
    target: "normal",
    type: "Warped",
    category: "Special",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, charge: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Solar Beam", target);
    },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["heavyfog"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 235
  },
  depressingrain: {
    name: "Depressing Rain",
    shortDesc: "Always hits. Clears the foe's stat modifiers.",
    target: "normal",
    type: "Poison",
    category: "Physical",
    basePower: 60,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sludge", target);
    },
    onHit(target) {
      target.clearBoosts();
      this.add("-clearboost", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 131
  },
  destruction: {
    name: "Destruction",
    shortDesc: "30% chance to make the foe flinch.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 70,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flash", target);
    },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 18
  },
  destructionrift: {
    name: "Destruction Rift",
    shortDesc: "Will double in power during any terrain, as well as cancel the terrain.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Earth Power", target);
    },
    onBasePower(relayVar, source2, target, move) {
      if (this.field.terrain) {
        return move.basePower * 2;
      }
      return move.basePower;
    },
    onAfterHit(target, source2, move) {
      this.field.clearTerrain();
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 164
  },
  detonationburst: {
    name: "Detonation Burst",
    shortDesc: "Lowers the user's FoAtk and FoDef.",
    target: "normal",
    type: "Sound",
    category: "Physical",
    basePower: 120,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Boomburst", target);
    },
    self: {
      boosts: { atk: -1, def: -1 }
    }
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 62
  },
  diffusionlaser: {
    name: "Diffusion Laser",
    shortDesc: "20% chance to make the foe flinch.",
    target: "normal",
    type: "Light",
    category: "Special",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Prismatic Laser", target);
    },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    }
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 18
  },
  diligence: {
    name: "Diligence",
    shortDesc: "Power doubles if you take damage from a foe's Skill on the same turn.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 60,
    basePowerCallback(pokemon, target, move) {
      const damagedByTarget = pokemon.attackedBy.some(
        (p) => p.source === target && p.damage > 0 && p.thisTurn
      );
      if (damagedByTarget) {
        this.debug("BP doubled for getting hit by " + target);
        return move.basePower * 2;
      }
      return move.basePower;
    },
    pp: 6.25,
    accuracy: 100,
    priority: -4,
    flags: { protect: 1, counter: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Revenge", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 115
  },
  direstate: {
    name: "Dire State",
    shortDesc: "Power is higher the lower the user's current HP is.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 0,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Reversal", target);
    },
    basePowerCallback(pokemon, target, move) {
      const bp = [200, 150, 100, 80, 40];
      if (pokemon.hp === 1)
        return bp[0];
      const numerators = [2, 5, 10, 17, 33];
      let hp = pokemon.hp / pokemon.maxhp;
      for (let i = 0; i < numerators.length; i++) {
        if (hp < numerators[i] / 48)
          return bp[i];
      }
      return 20;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 122
  },
  distortionbomb: {
    name: "Distortion Bomb",
    shortDesc: "10% chance to lower the foe's FoDef.",
    target: "normal",
    type: "Warped",
    category: "Physical",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sludge Bomb", target);
    },
    secondaries: [
      {
        chance: 10,
        boosts: { def: -1 }
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 35
  },
  divinepunishment: {
    name: "Divine Punishment",
    shortDesc: "The user faints to deal damage equal to the current HP.",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 0,
    damageCallback(pokemon) {
      const damage = pokemon.hp;
      pokemon.faint();
      return damage;
    },
    selfdestruct: "ifHit",
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Explosion", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 134
  },
  divinethunder: {
    name: "Divine Thunder",
    shortDesc: "Paralyzes the foe.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 50,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunder", target);
    },
    secondary: {
      chance: 100,
      status: "par"
    }
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 5
  },
  doppelganger: {
    name: "Doppelganger",
    shortDesc: "Changes the user's type to the foe's type.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 1,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Reflect Type", target);
    },
    onHit(target, source2, move) {
      source2.setType(target.types);
      this.add("-start", source2, "typechange", source2.getTypes().join("/"), "[from] move: Doppelganger");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 205
  },
  drainseed: {
    name: "Drain Seed",
    shortDesc: "The foe's HP is drained to the user's side every turn. Does not work on Nature-type puppets.",
    target: "normal",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Leech Seed", target);
    },
    volatileStatus: "drainseed",
    onTryImmunity(target) {
      return !target.hasType("Nature");
    },
    condition: {
      onStart(target) {
        this.add("-message", `${target.name} was seeded!`);
        this.add("-start", target, "move: Drain Seed", "[silent]");
      },
      onResidualOrder: 8,
      onResidual(pokemon) {
        const target = this.getAtSlot(pokemon.volatiles["drainseed"].sourceSlot);
        if (!target || target.fainted || target.hp <= 0) {
          this.debug("Nothing to leech into");
          return;
        }
        const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
        if (damage) {
          this.heal(damage, target, pokemon);
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 182
  },
  drought: {
    name: "Drought",
    shortDesc: "Weakens the foe.",
    target: "normal",
    type: "Water",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Water Sport", target);
    },
    status: "weak"
  },
  dustbomb: {
    name: "Dust Bomb",
    shortDesc: "30% chance to poison the foe.",
    target: "normal",
    type: "Poison",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mud Shot", target);
    },
    secondary: {
      chance: 30,
      status: "psn"
    }
    // Class: BU
    // Effect Chance: 300
    // Effect ID: 1
  },
  dustcloud: {
    name: "Dust Cloud",
    shortDesc: "30% chance to lower the foe's Accuracy.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sand Attack", target);
    },
    secondary: {
      chance: 30,
      boosts: { accuracy: -1 }
    }
    // Class: BU
    // Effect Chance: 300
    // Effect ID: 78
  },
  dustdevilgate: {
    name: "Dust Devil Gate",
    shortDesc: "Traps the foe for 4-5 turns.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 20,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sand Tomb", target);
    },
    volatileStatus: "partiallytrapped"
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 149
  },
  earthsign: {
    name: "Earth Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  earthenfeast: {
    name: "Earthen Feast",
    shortDesc: "10% chance to lower the foe's Accuracy.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Earth Power", target);
    },
    secondary: {
      chance: 10,
      boosts: { accuracy: -1 }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 78
  },
  earthlyblessing: {
    name: "Earthly Blessing",
    shortDesc: "During terrain, power doubles and the type changes.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Terrain Pulse", target);
    },
    onModifyType(move, pokemon) {
      switch (this.field.terrain) {
        case "byakko":
          move.type = "Steel";
          break;
        case "genbu":
          move.type = "Water";
          break;
        case "kohryu":
          move.type = "Earth";
          break;
        case "seiryu":
          move.type = "Nature";
          break;
        case "suzaku":
          move.type = "Fire";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      if (this.field.terrain)
        move.basePower *= 2;
    }
  },
  earthlyinfluence: {
    name: "Earthly Influence",
    shortDesc: "During terrain, power doubles and the type changes.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Terrain Pulse", target);
    },
    onModifyType(move, pokemon) {
      switch (this.field.terrain) {
        case "byakko":
          move.type = "Steel";
          break;
        case "genbu":
          move.type = "Water";
          break;
        case "kohryu":
          move.type = "Earth";
          break;
        case "seiryu":
          move.type = "Nature";
          break;
        case "suzaku":
          move.type = "Fire";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      if (this.field.terrain)
        move.basePower *= 2;
    }
  },
  ebbtide: {
    name: "Ebb Tide",
    shortDesc: "Harshly lowers the foe's Speed.",
    target: "normal",
    type: "Water",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Soak", target);
    },
    boosts: { spe: -2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 48
  },
  electricsign: {
    name: "Electric Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  elementreverse: {
    name: "Element Reverse",
    shortDesc: "Inverts the foe's weaknesses and resistances.",
    target: "normal",
    type: "Warped",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Topsy-Turvy", target);
    },
    volatileStatus: "elementreverse",
    condition: {
      noCopy: true,
      onStart(target, source2, sourceEffect) {
        this.add("-message", `${target.name}'s elemental barrier is reversed!`);
        this.add("-start", target, "move: Element Reverse", "[silent]");
      },
      onEffectiveness(typeMod, target, type, move) {
        return typeMod * -1;
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 244
  },
  encourage: {
    name: "Encourage",
    shortDesc: "Forces the foe to keep using the Skill they last used for three turns.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Encore", target);
    },
    volatileStatus: "encourage",
    condition: {
      duration: 3,
      noCopy: true,
      // doesn't get copied by Z-Baton Pass
      onStart(target) {
        const noEncourage = [
          "assist",
          "copycat",
          "encourage",
          "mefirst",
          "metronome",
          "mimic",
          "mirrormove",
          "naturepower",
          "sketch",
          "sleeptalk",
          "struggle",
          "transform"
        ];
        let move = target.lastMove;
        if (!move || target.volatiles["dynamax"])
          return false;
        if (move.isMax && move.baseMove)
          move = this.dex.getMove(move.baseMove);
        const moveIndex = target.moves.indexOf(move.id);
        if (move.isZ || noEncourage.includes(move.id) || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
          return false;
        }
        this.effectState.move = move.id;
        this.add("-start", target, "Encourage");
        if (!this.queue.willMove(target)) {
          this.effectState.duration++;
        }
      },
      onOverrideAction(pokemon, target, move) {
        if (move.id !== this.effectState.move)
          return this.effectState.move;
      },
      onResidualOrder: 13,
      onResidual(target) {
        if (target.moves.includes(this.effectState.move) && target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0) {
          target.removeVolatile("encourage");
        }
      },
      onEnd(target) {
        this.add("-end", target, "Encourage");
      },
      onDisableMove(pokemon) {
        if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
          return;
        }
        for (const moveSlot of pokemon.moveSlots) {
          if (moveSlot.id !== this.effectState.move) {
            pokemon.disableMove(moveSlot.id);
          }
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 173
  },
  energyabsorb: {
    name: "Energy Absorb",
    shortDesc: "The user recovers half of the damage dealt.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 75,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Synthesis", target);
    },
    drain: [1, 2]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 141
  },
  energybolt: {
    name: "Energy Bolt",
    shortDesc: "10% chance to Stop the foe. (The in-game description says that it can paralyze, but it actually causes the Stopped status)",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunderbolt", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "stp"
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 6
  },
  ephemeral: {
    name: "Ephemeral",
    shortDesc: "10% chance to lower the foe's FoDef.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psychic", target);
    },
    secondaries: [
      {
        chance: 10,
        boosts: { def: -1 }
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 35
  },
  eternalrecord: {
    name: "Eternal Record",
    shortDesc: "Replicates Field Barrier, Field Protect, and Lucky Rainbow, but the user faints.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Reflect", target);
    },
    onHit(target, source2, move) {
      target.side.addSideCondition("fieldprotect");
      target.side.addSideCondition("fieldbarrier");
      target.side.addSideCondition("luckyrainbow");
      target.faint();
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 231
  },
  evilcrushingarrow: {
    name: "Evil-Crushing Arrow",
    shortDesc: "10% chance to make the foe flinch.",
    target: "normal",
    type: "Light",
    category: "Physical",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thousand Arrows", target);
    },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 18
  },
  explodingblaze: {
    name: "Exploding Blaze",
    shortDesc: "30% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flare Blitz", target);
    },
    secondaries: [
      {
        chance: 30,
        status: "brn"
      }
    ]
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 2
  },
  explodingfist: {
    name: "Exploding Fist",
    shortDesc: "Confuses the foe.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 100,
    pp: 3.125,
    accuracy: 50,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dynamic Punch", target);
    },
    volatileStatus: "confusion"
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 17
  },
  eyeofcalamity: {
    name: "Eye of Calamity",
    shortDesc: "Burns and scares the foe.",
    target: "normal",
    type: "Nether",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 85,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mean Look", target);
    },
    status: "brnfear"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 242
  },
  eyeoflaplace: {
    name: "Eye of Laplace",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Dark",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mean Look", target);
    },
    critRatio: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 19
  },
  fadingout: {
    name: "Fading Out",
    shortDesc: "User switches out.",
    target: "self",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: -6,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Teleport", target);
    },
    selfSwitch: true
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 60
  },
  fairydance: {
    name: "Fairy Dance",
    shortDesc: "Raises the user's SpAtk, SpDef, and Speed.",
    target: "self",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Quiver Dance", target);
    },
    boosts: { spa: 1, spd: 1, spe: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 66
  },
  fakejewel: {
    name: "Fake Jewel",
    shortDesc: "Steals foe's held item.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thief", target);
    },
    onAfterHit(target, source2, move) {
      if (source2.item || source2.volatiles["gem"]) {
        return;
      }
      const yourItem = target.takeItem(source2);
      if (!yourItem) {
        return;
      }
      if (!this.singleEvent("TakeItem", yourItem, target.itemState, source2, target, move, yourItem) || !source2.setItem(yourItem)) {
        target.item = yourItem.id;
        return;
      }
      this.add("-item", source2, yourItem, "[from] move: Fake Jewel", "[of] " + target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 146
  },
  falsecourage: {
    name: "False Courage",
    shortDesc: "Attempts to survive the next attack with 1 HP. May fail if used consecutively.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 4,
    flags: {},
    volatileStatus: "falsecourage",
    onPrepareHit(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Endure", target);
      return !!this.queue.willAct() && this.runEvent("StallMove", target);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: False Courage");
      },
      onDamagePriority: -10,
      onDamage(damage, target, source2, effect) {
        if (effect?.effectType === "Move" && damage >= target.hp) {
          this.add("-activate", target, "move: False Courage");
          return target.hp - 1;
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 179
  },
  fantasymelody: {
    name: "Fantasy Melody",
    shortDesc: "Always hits.",
    target: "normal",
    type: "Sound",
    category: "Special",
    basePower: 60,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hyper Voice", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  favorablewind: {
    name: "Favorable Wind",
    shortDesc: "Raises the user's Evasion.",
    target: "self",
    type: "Wind",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double Team", target);
    },
    boosts: { evasion: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 79
  },
  feathershot: {
    name: "Feather Shot",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Air Cutter", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  fieldbarrier: {
    name: "Field Barrier",
    shortDesc: "The user's side takes half damage from Spread skills for five turns.",
    target: "allySide",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Light Screen", target);
    },
    sideCondition: "fieldbarrier",
    condition: {
      duration: 5,
      durationCallback(target, source2, effect) {
        if (source2?.hasItem("fluorite")) {
          return 8;
        }
        return 5;
      },
      onAnyModifyDamage(damage, source2, target, move) {
        if (target !== source2 && target.side === this.effectState.target && this.getCategory(move) === "Special") {
          if (!target.getMoveHitData(move).crit && !move.infiltrates) {
            this.debug("Field Barrier weaken");
            if (target.side.active.length > 1)
              return this.chainModify([2732, 4096]);
            return this.chainModify(0.5);
          }
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "move: Field Barrier");
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 2,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Field Barrier");
      }
    }
  },
  fieldbreak: {
    name: "Field Break",
    shortDesc: "Breaks the foe's Field Barrier and Field Protect effects before doing damage.",
    target: "normal",
    type: "Warped",
    category: "Special",
    basePower: 75,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psybeam", target);
    },
    onTryHit(pokemon) {
      pokemon.side.removeSideCondition("fieldprotect");
      pokemon.side.removeSideCondition("fieldbarrier");
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 142
  },
  fieldprotect: {
    name: "Field Protect",
    shortDesc: "The user's side takes half damage from Focus skills for five turns.",
    target: "allySide",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Reflect", target);
    },
    sideCondition: "fieldprotect",
    condition: {
      duration: 5,
      durationCallback(target, source2, effect) {
        if (source2?.hasItem("fluorite")) {
          return 8;
        }
        return 5;
      },
      onAnyModifyDamage(damage, source2, target, move) {
        if (target !== source2 && target.side === this.effectState.target && this.getCategory(move) === "Physical") {
          if (!target.getMoveHitData(move).crit && !move.infiltrates) {
            this.debug("Field Protect weaken");
            if (target.side.active.length > 1)
              return this.chainModify([2732, 4096]);
            return this.chainModify(0.5);
          }
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "Field Protect");
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 1,
      onSideEnd(side) {
        this.add("-sideend", side, "Field Protect");
      }
    }
  },
  fieldshift: {
    name: "Field Shift",
    shortDesc: "Moves the foe's Field Barrier, Field Protect, Lucky Rainbow, and Magical Barrier to your side.",
    target: "normal",
    type: "Warped",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 4,
    flags: { bypasssub: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Court Change", target);
    },
    onHit(target, source2, move) {
      const movedConditions = ["fieldprotect", "fieldbarrier", "luckyrainbow", "magicbarrier"];
      let success = [];
      for (const cond of movedConditions) {
        this.debug("Trying to move " + cond + " as sideCondition");
        if (target.side.removeSideCondition(cond)) {
          success.push(["side", cond]);
          this.debug("Removed " + cond + " as sideCondition");
        }
        this.debug("Trying to move " + cond + " as volatile");
        if (target.removeVolatile(cond)) {
          success.push(["volatile", cond]);
          this.debug("Removed " + cond + " as volatile");
        }
      }
      for (var i = 0; i < success.length; i++) {
        switch (success[i][0]) {
          case "side":
            source2.side.addSideCondition(success[i][1], source2);
            break;
          case "volatile":
            source2.addVolatile(success[i][1], source2);
            break;
          default:
            this.debug("Unknown case " + success[i][0]);
            break;
        }
      }
      return success.length > 0;
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 245
  },
  fierygame: {
    name: "Fiery Game",
    shortDesc: "10% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 55,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flamethrower", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "brn"
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 2
  },
  fightingsign: {
    name: "Fighting Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  finaltribulation: {
    name: "Final Tribulation",
    shortDesc: "Bypasses half of the foe's FoDef, but the user faints. Is more powerful for Void-types.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 100,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Explosion", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (pokemon.hasType("Void")) {
        return move.basePower * 1.5;
      }
      return move.basePower;
    },
    onTryHit(source2, target, move) {
      target.addVolatile("finaltribulation");
    },
    onHit(target, source2, move) {
      target.removeVolatile("finaltribulation");
      source2.faint();
    },
    condition: {
      duration: 1,
      onModifyDef(relayVar, target, source2, move) {
        this.chainModify(0.5);
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 88
  },
  firejavelin: {
    name: "Fire Javelin",
    shortDesc: "10% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Physical",
    basePower: 80,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1, javelin: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fire Lash", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "brn"
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 2
  },
  firesign: {
    name: "Fire Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  firewall: {
    name: "Fire Wall",
    shortDesc: "If the foe holds an item, the attack is 50% stronger and destroys the item.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Incinerate", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (target.item) {
        return move.basePower * 1.5;
      }
      return move.basePower;
    },
    onAfterHit(target, source2) {
      if (source2.hp) {
        const item = target.takeItem();
        if (item) {
          this.add("-enditem", target, item.name, "[from] move: Fire Wall", "[of] " + source2);
        }
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 143
  },
  fireball: {
    name: "Fireball",
    shortDesc: "10% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Physical",
    basePower: 55,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flamethrower", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "brn"
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 2
  },
  firedragonspiral: {
    name: "Fire-Dragon Spiral",
    shortDesc: "Traps the foe for 4-5 turns.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 100,
    pp: 3.125,
    accuracy: 75,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Magma Storm", target);
    },
    volatileStatus: "partiallytrapped"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 149
  },
  firesnakespiral: {
    name: "Fire-Snake Spiral",
    shortDesc: "Traps the foe for 4-5 turns.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 20,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fire Spin", target);
    },
    volatileStatus: "partiallytrapped"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 149
  },
  firmspirit: {
    name: "Firm Spirit",
    shortDesc: "A two-turn skill. On the first turn, the user's FoDef is raised.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 130,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, charge: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Skull Bash", target);
    },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      this.boost({ def: 1 }, attacker, attacker, move);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 145
  },
  firstaid: {
    name: "First Aid",
    shortDesc: "Restores half of the user's HP.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: { heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Recover", target);
    },
    heal: [1, 2]
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 54
  },
  flamepillar: {
    name: "Flame Pillar",
    shortDesc: "20% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Physical",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flame Wheel", target);
    },
    secondaries: [
      {
        chance: 20,
        status: "brn"
      }
    ]
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 2
  },
  flamewave: {
    name: "Flame Wave",
    shortDesc: "50% chance to raise the user's SpAtk.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 80,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flame Burst", target);
    },
    secondary: {
      chance: 50,
      self: {
        boosts: { spa: 1 }
      }
    }
    // Class: 2
    // Effect Chance: 500
    // Effect ID: 31
  },
  flare: {
    name: "Flare",
    shortDesc: "10% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 70,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flame Burst", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "brn"
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 2
  },
  flashbullet: {
    name: "Flash Bullet",
    shortDesc: "Confuses the foe.",
    target: "normal",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flash", target);
    },
    volatileStatus: "confusion"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 26
  },
  flashflood: {
    name: "Flash Flood",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Waterfall", target);
    },
    critRatio: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 19
  },
  flashover: {
    name: "Flashover",
    shortDesc: "30% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flamethrower", target);
    },
    secondaries: [
      {
        chance: 30,
        status: "brn"
      }
    ]
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 2
  },
  flowerofhell: {
    name: "Flower of Hell",
    shortDesc: "30% chance to break the foe's stance, preventing them from avoiding the next attack.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Petal Dance", target);
    },
    secondaries: [
      {
        chance: 30,
        volatileStatus: "stancebreak"
      }
    ]
    // Class: BU
    // Effect Chance: 300
    // Effect ID: 128
  },
  flyingfrenzy: {
    name: "Flying Frenzy",
    shortDesc: "10% chance to make the foe flinch.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 95,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Brave Bird", target);
    },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 18
  },
  foambubbles: {
    name: "Foam Bubbles",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bubble Beam", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  focusedmovement: {
    name: "Focused Movement",
    shortDesc: "Raises the user's FoAtk and FoDef at the cost of Speed.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Curse", target);
    },
    boosts: { atk: 1, def: 1, spe: -1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 71
  },
  focusedstance: {
    name: "Focused Stance",
    shortDesc: "Raises the user's FoAtk and Accuracy.",
    target: "self",
    type: "Steel",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Curse", target);
    },
    boosts: { atk: 1, accuracy: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 83
  },
  foehnwinds: {
    name: "Foehn Winds",
    shortDesc: "The user takes 1/3 of the damage in recoil.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 120,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Brave Bird", target);
    },
    recoil: [1, 3]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 51
  },
  forceshield: {
    name: "Force Shield",
    shortDesc: "Removes your weaknesses and resistances this turn to greatly limit damage. May fail if used consecutively.",
    target: "self",
    type: "Warped",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 4,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Protect", target);
    },
    onTryHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    volatileStatus: "forceshield",
    condition: {
      noCopy: true,
      duration: 1,
      onStart(target) {
        this.add("-message", `${target.name} activated its Force Shield!`);
        this.add("-singleturn", target, "Force Shield", "[silent]");
      },
      onEffectiveness(typeMod, target, type, move) {
        return 0;
      },
      onSourceModifyDamage(damage, source2, target, move) {
        if (move.category === "Special" || move.category === "Physical") {
          return this.clampIntRange(target.getUndynamaxedHP() * 0.0625, 1);
        }
      },
      onEnd(pokemon) {
        this.add("-message", `${pokemon.name} restored their stance!`);
        this.add("-end", pokemon, "move: Force Shield", "[silent]");
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 230
  },
  foresee: {
    name: "Foresee",
    shortDesc: "Attempts to use the attacking skill the foe will use, with 50% more power.",
    target: "normal",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Me First", target);
    },
    onTryHit(target, pokemon) {
      const action = this.queue.willMove(target);
      if (!action)
        return false;
      const move = this.dex.getActiveMove(action.move.id);
      if (action.zmove || move.isZ || move.isMax)
        return false;
      if (target.volatiles["mustrecharge"])
        return false;
      if (move.category === "Status" || move.flags["failmefirst"])
        return false;
      pokemon.addVolatile("mefirst");
      this.actions.useMove(move, pokemon, target);
      return null;
    },
    condition: {
      duration: 1,
      onBasePowerPriority: 12,
      onBasePower(basePower) {
        return this.chainModify(1.5);
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 208
  },
  foresttherapy: {
    name: "Forest Therapy",
    shortDesc: "Heals the user's party of all status ailments.",
    target: "allyTeam",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aromatherapy", target);
    },
    onHit(target, source2, move) {
      this.add("-activate", source2, "move: Forest Therapy");
      let success = false;
      const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
      for (const ally of allies) {
        if (ally !== source2 && (ally.hasAbility("sapsipper") || ally.volatiles["substitute"] && !move.infiltrates)) {
          continue;
        }
        if (ally.cureStatus())
          success = true;
      }
      return success;
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 92
  },
  forwardthrust: {
    name: "Forward Thrust",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 55,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Storm Throw", target);
    },
    critRatio: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 19
  },
  fountainoflife: {
    name: "Fountain of Life",
    shortDesc: "The user recovers a little HP every turn, but becomes unable to switch or be blown away.",
    target: "self",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aqua Ring", target);
    },
    volatileStatus: "fountainoflife",
    condition: {
      onStart(pokemon) {
        this.add("-start", pokemon, "Fountain of Life");
      },
      onResidualOrder: 6,
      onResidual(pokemon) {
        this.heal(pokemon.baseMaxhp / 16);
      },
      onTrapPokemon(pokemon) {
        pokemon.tryTrap();
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 178
  },
  frenziedjoururi: {
    name: "Frenzied Joururi",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 100,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double-Edge", target);
    }
  },
  frostedge: {
    name: "Frost Edge",
    shortDesc: "10% chance to stop the foe.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Ice Beam", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "stp"
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 6
  },
  frozenprison: {
    name: "Frozen Prison",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Blizzard", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  fullmetalcrash: {
    name: "Full Metal Crash",
    shortDesc: "The user takes half of the damage in recoil.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 150,
    pp: 3.125,
    accuracy: 80,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    recoil: [1, 2],
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Head Smash", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 52
  },
  gatheredstars: {
    name: "Gathered Stars",
    shortDesc: "Raises the user's FoAtk.",
    target: "self",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Meditate", target);
    },
    boosts: { atk: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 7
  },
  gensokyotyphoon: {
    name: "Gensokyo Typhoon",
    shortDesc: "A two-turn skill. The user charges on the first turn. Lands critical hits more often.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 140,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, charge: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sky Attack", target);
    },
    critRatio: 2,
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 55
  },
  geyser: {
    name: "Geyser",
    shortDesc: "A normal attack that always lands critical hits.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Steam Eruption", target);
    },
    willCrit: true
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 19
  },
  ghostchase: {
    name: "Ghost Chase",
    shortDesc: "Makes the user immune to Fighting-type skills.",
    target: "self",
    type: "Nether",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Curse", target);
    },
    volatileStatus: "ghostchase",
    condition: {
      noCopy: true,
      onStart(target, source2, sourceEffect) {
        this.add("-start", target, "Ghost Chase");
      },
      onTryHit(source2, target, move) {
        if (move.type === "Fighting") {
          this.add("-immune", target);
          return null;
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 241
  },
  ghosttrick: {
    name: "Ghost Trick",
    shortDesc: "10% chance to make the foe flinch.",
    target: "normal",
    type: "Nether",
    category: "Physical",
    basePower: 55,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Astonish", target);
    },
    secondary: {
      chance: 10,
      status: "flinch"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 94
  },
  ghostwave: {
    name: "Ghost Wave",
    shortDesc: "30% chance to scare the foe.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Ball", target);
    },
    secondary: {
      chance: 30,
      status: "fear"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 4
  },
  gigantic: {
    name: "GIGANTIC",
    shortDesc: "10% chance to lower the foe's SpDef.",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Boomburst", target);
    },
    secondaries: [
      {
        chance: 10,
        boosts: { spd: -1 }
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 37
  },
  glamorpandemic: {
    name: "Glamor Pandemic",
    shortDesc: "Confuses the foe.",
    target: "normal",
    type: "Illusion",
    category: "Special",
    basePower: 100,
    pp: 3.125,
    accuracy: 50,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psystrike", target);
    },
    volatileStatus: "confusion"
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 17
  },
  godstonefrenzy: {
    name: "Godstone Frenzy",
    shortDesc: "Hits two to five times.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 25,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bone Rush", target);
    },
    multihit: [2, 5]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 53
  },
  goodluck: {
    name: "Good Luck",
    shortDesc: "Raises one of the user's stats randomly.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Acupressure", target);
    },
    onHit(target) {
      const stats = [];
      let stat;
      for (stat in target.boosts) {
        if (target.boosts[stat] < 6) {
          stats.push(stat);
        }
      }
      if (stats.length) {
        const randomStat = this.sample(stats);
        const boost = {};
        boost[randomStat] = 1;
        this.boost(boost);
      } else {
        return false;
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 85
  },
  gorgonseye: {
    name: "Gorgon's Eye",
    shortDesc: "Stops the foe.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 75,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mean Look", target);
    },
    status: "stp"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 25
  },
  graceofmana: {
    name: "Grace of Mana",
    shortDesc: "Restores half of the user's HP.",
    target: "self",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: { heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Synthesis", target);
    },
    heal: [1, 2]
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 54
  },
  grassjavelin: {
    name: "Grass Javelin",
    shortDesc: "10% chance to weaken the foe.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 80,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1, javelin: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Grassy Glide", target);
    },
    secondary: {
      chance: 10,
      status: "weak"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 94
  },
  gravityblast: {
    name: "Gravity Blast",
    shortDesc: "Power decreases if the foe is not at full HP.",
    target: "normal",
    type: "Illusion",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Wring Out", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (target.hp === target.maxhp) {
        return 120;
      }
      return 80 * target.hp / target.maxhp;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 118
  },
  grazebolt: {
    name: "Graze Bolt",
    shortDesc: "20% chance to paralyze the foe.",
    target: "normal",
    type: "Electric",
    category: "Physical",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunderbolt", target);
    },
    secondary: {
      chance: 20,
      status: "par"
    }
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 5
  },
  greattornado: {
    name: "Great Tornado",
    shortDesc: "Traps the foe for 4-5 turns.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 20,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Twister", target);
    },
    volatileStatus: "partiallytrapped"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 149
  },
  guardsplit: {
    name: "Guard Split",
    shortDesc: "Averages the user's FoDef and SpDef with the foe's.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Guard Split", target);
    },
    onHit(target, source2) {
      const newdef = Math.floor((target.storedStats.def + source2.storedStats.def) / 2);
      target.storedStats.def = newdef;
      source2.storedStats.def = newdef;
      const newspd = Math.floor((target.storedStats.spd + source2.storedStats.spd) / 2);
      target.storedStats.spd = newspd;
      source2.storedStats.spd = newspd;
      this.add("-activate", source2, "move: Guard Split", "[of] " + target);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 195
  },
  guardswap: {
    name: "Guard Swap",
    shortDesc: "Switches the user's changes to FoDef and SpDef with the foe's.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Guard Swap", target);
    },
    onHit(target, source2) {
      const targetBoosts = {};
      const sourceBoosts = {};
      const defSpd = ["def", "spd"];
      for (const stat of defSpd) {
        targetBoosts[stat] = target.boosts[stat];
        sourceBoosts[stat] = source2.boosts[stat];
      }
      source2.setBoost(targetBoosts);
      target.setBoost(sourceBoosts);
      this.add("-swapboost", source2, target, "def, spd", "[from] move: Guard Swap");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 194
  },
  guidedmissile: {
    name: "Guided Missile",
    shortDesc: "10% chance to make the foe flinch.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 80,
    pp: 9.375,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Weather Ball", target);
    },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    }
  },
  hachimansblessing: {
    name: "Hachiman's Blessing",
    shortDesc: "Greatly increases the chance that the user will land a critical hit.",
    target: "self",
    type: "Fighting",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Laser Focus", target);
    },
    volatileStatus: "hachimansblessing",
    condition: {
      onStart(target, source2, effect) {
        this.add("-start", target, "move: Hachiman's Blessing");
      },
      onModifyCritRatio(critRatio) {
        return critRatio + 2;
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 81
  },
  hallucination: {
    name: "Hallucination",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Synchronoise", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  hammerbash: {
    name: "Hammer Bash",
    shortDesc: "10% chance to lower the foe's FoDef.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hammer Arm", target);
    },
    secondaries: [
      {
        chance: 10,
        boosts: { def: -1 }
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 35
  },
  hammerthrow: {
    name: "Hammer Throw",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 70,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Magnet Bomb", target);
    },
    critRatio: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 19
  },
  heathaze: {
    name: "Heat Haze",
    shortDesc: "Lowers the foe's FoAtk.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Haze", target);
    },
    boosts: { atk: -1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 12
  },
  heavenlyascent: {
    name: "Heavenly Ascent",
    shortDesc: "Lowers the user's FoDef and SpDef.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 120,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Close Combat", target);
    },
    self: {
      boosts: { def: -1, spd: -1 }
    }
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 49
  },
  heavenlyblessing: {
    name: "Heavenly Blessing",
    shortDesc: "During weather, power doubles and the type changes.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 50,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Weather Ball", target);
    },
    onModifyType(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "aurora":
          move.type = "Light";
          break;
        case "calm":
          move.type = "Wind";
          break;
        case "duststorm":
          move.type = "Earth";
          break;
        case "heavyfog":
          move.type = "Dark";
          break;
        case "sunshower":
          move.type = "Warped";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      if (this.field.weather)
        move.basePower *= 2;
    }
  },
  heavenlyinfluence: {
    name: "Heavenly Influence",
    shortDesc: "During weather, power doubles and the type changes.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 50,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Weather Ball", target);
    },
    onModifyType(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "aurora":
          move.type = "Light";
          break;
        case "calm":
          move.type = "Wind";
          break;
        case "duststorm":
          move.type = "Earth";
          break;
        case "heavyfog":
          move.type = "Dark";
          break;
        case "sunshower":
          move.type = "Warped";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      if (this.field.weather)
        move.basePower *= 2;
    }
  },
  heavyrain: {
    name: "Heavy Rain",
    shortDesc: "Traps the foe for 4-5 turns.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 20,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Whirlpool", target);
    },
    volatileStatus: "partiallytrapped"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 149
  },
  highmagnetism: {
    name: "High Magnetism",
    shortDesc: "Changes the next skill the foe uses to Electric-type.",
    target: "normal",
    type: "Electric",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Electrify", target);
    },
    volatileStatus: "highmagnetism",
    condition: {
      noCopy: true,
      onModifyMove(move, pokemon, target) {
        if (pokemon.removeVolatile("highmagnetism"))
          move.type = "Electric";
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 209
  },
  hightide: {
    name: "High Tide",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Crabhammer", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  hightonecrush: {
    name: "High Tone Crush",
    shortDesc: "10% chance to lower one of the foe's stats randomly.",
    target: "normal",
    type: "Sound",
    category: "Physical",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Boomburst", target);
    },
    secondaries: [
      {
        chance: 10,
        onHit(target, source2, move) {
          const stats = [];
          let stat;
          for (stat in target.boosts) {
            if (target.boosts[stat] > -6) {
              stats.push(stat);
            }
          }
          if (stats.length) {
            const randomStat = this.sample(stats);
            const boost = {};
            boost[randomStat] = -1;
            this.boost(boost);
          } else {
            return false;
          }
        }
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 64
  },
  holyflare: {
    name: "Holy Flare",
    shortDesc: "50% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Physical",
    basePower: 100,
    pp: 3.125,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Inferno", target);
    },
    secondaries: [
      {
        chance: 50,
        status: "brn"
      }
    ]
    // Class: 2
    // Effect Chance: 500
    // Effect ID: 2
  },
  honestmanslie: {
    name: "Honest Man's Lie",
    shortDesc: "Moves the user's status ailment to the foe.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psycho Shift", target);
    },
    onHit(target, source2, move) {
      if (!source2.status)
        return;
      for (const id in source2.status)
        target.setStatus(id);
      source2.clearStatus();
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 203
  },
  hornetsflit: {
    name: "Hornet's Flit",
    shortDesc: "Hits two to five times.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 25,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bullet Seed", target);
    },
    multihit: [2, 5]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 53
  },
  howlingvoice: {
    name: "Howling Voice",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Sound",
    category: "Physical",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Echoed Voice", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  iceage: {
    name: "Ice Age",
    shortDesc: "10% chance to lower the foe's Speed.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sheer Cold", target);
    },
    secondary: {
      chance: 10,
      boosts: { spe: -1 }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 38
  },
  icecoffin: {
    name: "Ice Coffin",
    shortDesc: "20% chance to make the foe flinch.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Ice Hammer", target);
    },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    }
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 18
  },
  icegatling: {
    name: "Ice Gatling",
    shortDesc: "Hits two to five times.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 15,
    pp: 3.125,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Icicle Spear", target);
    },
    multihit: [2, 5]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 53
  },
  illusionbullets: {
    name: "Illusion Bullets",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mist Ball", target);
    }
  },
  illusionsign: {
    name: "Illusion Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Illusion",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  imaginaryfriend: {
    name: "Imaginary Friend",
    shortDesc: "10% chance to lower the foe's SpDef.",
    target: "normal",
    type: "Illusion",
    category: "Special",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mist Ball", target);
    },
    secondaries: [
      {
        chance: 10,
        boosts: { spd: -1 }
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 37
  },
  imagination: {
    name: "Imagination",
    shortDesc: "Switches the user's FoAtk and FoDef.",
    target: "self",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Power Trick", target);
    },
    onHit(target, source2, move) {
      const atk = target.storedStats.atk;
      const def = target.storedStats.def;
      target.storedStats.atk = def;
      target.storedStats.def = atk;
      this.add("-activate", source2, "move: Imagination");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 202
  },
  impactrebellion: {
    name: "Impact Rebellion",
    shortDesc: "Power is proportional to the foe's Speed, and inversely proportional to the user's Speed.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 0,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Gyro Ball", target);
    },
    basePowerCallback(pokemon, target) {
      let power = Math.floor(40 * target.getStat("spe") / pokemon.getStat("spe")) + 1;
      if (!isFinite(power))
        power = 1;
      if (power > 150)
        power = 150;
      return power;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 125
  },
  imposingair: {
    name: "Imposing Air",
    shortDesc: "Raises the user's FoAtk and Speed.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dragon Dance", target);
    },
    boosts: { atk: 1, spe: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 73
  },
  impulse: {
    name: "Impulse",
    shortDesc: "10% chance to lower the foe's SpDef.",
    target: "normal",
    type: "Warped",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Luster Purge", target);
    },
    secondaries: [
      {
        chance: 10,
        boosts: { spd: -1 }
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 37
  },
  inferno: {
    name: "Inferno",
    shortDesc: "10% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Inferno", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "brn"
      }
    ]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 2
  },
  infinitedarkness: {
    name: "Infinite Darkness",
    shortDesc: "Traps the foe for 4-5 turns.",
    target: "normal",
    type: "Dark",
    category: "Special",
    basePower: 20,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dark Void", target);
    },
    volatileStatus: "partiallytrapped"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 149
  },
  infinitescales: {
    name: "Infinite Scales",
    shortDesc: "Power increases the more the user's stats have been increased.",
    target: "normal",
    type: "Sound",
    category: "Special",
    basePower: 20,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Stored Power", target);
    },
    basePowerCallback(pokemon, target, move) {
      const bp = move.basePower + 20 * pokemon.positiveBoosts();
      return bp;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 119
  },
  innerpower: {
    name: "Inner Power",
    shortDesc: "Sacrifices half of the user's HP to maximize FoAtk.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Belly Drum", target);
    },
    onHit(target) {
      if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) {
        return false;
      }
      this.directDamage(target.maxhp / 2);
      this.boost({ atk: 12 }, target);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 87
  },
  inspiration: {
    name: "Inspiration",
    shortDesc: "Sharply raises the user's FoDef.",
    target: "self",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Amnesia", target);
    },
    boosts: { def: 2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 40
  },
  invisibleheart: {
    name: "Invisible Heart",
    shortDesc: "Always hits.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 60,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aura Sphere", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  invokedeity: {
    name: "Invoke Deity",
    shortDesc: "Sharply raises one of the user's stats randomly.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Acupressure", target);
    },
    onHit(target) {
      const stats = [];
      let stat;
      for (stat in target.boosts) {
        if (target.boosts[stat] < 6) {
          stats.push(stat);
        }
      }
      if (stats.length) {
        const randomStat = this.sample(stats);
        const boost = {};
        boost[randomStat] = 2;
        this.boost(boost);
      } else {
        return false;
      }
    }
  },
  ironwallstance: {
    name: "Iron Wall Stance",
    shortDesc: "Sharply raises the user's FoDef.",
    target: "self",
    type: "Steel",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Iron Defense", target);
    },
    boosts: { def: 2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 40
  },
  irreversibletrick: {
    name: "Irreversible Trick",
    shortDesc: "Ignores Field Protect and Barrier Option, will increase in power if foe uses a support skill.",
    target: "normal",
    type: "Warped",
    category: "Special",
    basePower: 80,
    pp: 6.25,
    accuracy: true,
    priority: -4,
    flags: { bypasssub: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psystrike", target);
    },
    infiltrates: true,
    basePowerCallback(pokemon, target, move) {
      if (!this.queue.willMove(target) && target.lastMove && target.lastMove?.category === "Status") {
        return move.basePower * 1.5;
      }
      return move.basePower;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 228
  },
  jewelrystorm: {
    name: "Jewelry Storm",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Diamond Storm", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  jinx: {
    name: "Jinx",
    shortDesc: "Seals the skill the foe last used for four turns.",
    target: "normal",
    type: "Nether",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Disable", target);
    },
    volatileStatus: "jinx",
    onTryHit(target) {
      if (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === "struggle") {
        return false;
      }
    },
    condition: {
      duration: 5,
      noCopy: true,
      // doesn't get copied by Baton Pass
      onStart(pokemon, source2, effect) {
        if (this.queue.willMove(pokemon) || pokemon === this.activePokemon && this.activeMove && !this.activeMove.isExternal) {
          this.effectState.duration--;
        }
        if (!pokemon.lastMove) {
          this.debug(`Pokemon hasn't moved yet`);
          return false;
        }
        for (const moveSlot of pokemon.moveSlots) {
          if (moveSlot.id === pokemon.lastMove.id) {
            if (!moveSlot.pp) {
              this.debug("Move out of PP");
              return false;
            }
          }
        }
        if (effect.effectType === "Ability") {
          this.add("-start", pokemon, "Jinx", pokemon.lastMove.name, "[from] ability: " + effect.name, "[of] " + source2);
        } else {
          this.add("-start", pokemon, "Jinx", pokemon.lastMove.name);
        }
        this.effectState.move = pokemon.lastMove.id;
      },
      onResidualOrder: 17,
      onEnd(pokemon) {
        this.add("-end", pokemon, "Jinx");
      },
      onBeforeMovePriority: 7,
      onBeforeMove(attacker, defender, move) {
        if (!move.isZ && move.id === this.effectState.move) {
          this.add("cant", attacker, "Jinx", move);
          return false;
        }
      },
      onDisableMove(pokemon) {
        for (const moveSlot of pokemon.moveSlots) {
          if (moveSlot.id === this.effectState.move) {
            pokemon.disableMove(moveSlot.id);
          }
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 207
  },
  killingbite: {
    name: "Killing Bite",
    shortDesc: "A normal attack that always lands critical hits.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 70,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Crunch", target);
    },
    willCrit: true
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 19
  },
  landslide: {
    name: "Landslide",
    shortDesc: "Power doubles if the foe has less than half of their HP.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rock Slide", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (target.hp <= target.maxhp / 2)
        return move.basePower * 2;
      return move.basePower;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 114
  },
  lastresort: {
    name: "Last Resort",
    shortDesc: "Can only be used when all other skills have been used once.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 140,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Last Resort", target);
    },
    onTryHit(source2, target, move) {
      let usedMoves = 0;
      for (const slot of source2.moveSlots) {
        if (slot.used)
          usedMoves++;
      }
      if (usedMoves < source2.moveSlots.length - 2) {
        this.add("-fail", source2);
        return false;
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 144
  },
  lastslash: {
    name: "Last Slash",
    shortDesc: "Ruins the user's stance, preventing them from avoiding attacks.",
    target: "normal",
    type: "Steel",
    category: "Special",
    basePower: 100,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Smart Strike", target);
    },
    self: {
      volatileStatus: "stancebreak"
    }
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 127
  },
  lazymist: {
    name: "Lazy Mist",
    shortDesc: "30% chance to weaken the foe.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Scald", target);
    },
    secondary: {
      chance: 30,
      status: "weak"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 94
  },
  lifeburst: {
    name: "Life Burst",
    shortDesc: "Always hits.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aura Sphere", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  lightjavelin: {
    name: "Light Javelin",
    shortDesc: "10% chance to confuse the foe.",
    target: "normal",
    type: "Light",
    category: "Physical",
    basePower: 80,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1, javelin: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flash", target);
    },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 17
  },
  lightoforigin: {
    name: "Light of Origin",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Light",
    category: "Special",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Photon Geyser", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  lightsign: {
    name: "Light Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Light",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  lightup: {
    name: "Light Up",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Light",
    category: "Physical",
    basePower: 55,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Photon Geyser", target);
    },
    critRatio: 2
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 19
  },
  lightningcharge: {
    name: "Lightning Charge",
    shortDesc: "Raises the user's SpDef. If an Electric-type skill is used next turn, its power is doubled.",
    target: "self",
    type: "Electric",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Charge", target);
    },
    volatileStatus: "lightningcharge",
    condition: {
      onStart(pokemon, source2, effect) {
        if (effect && ["Electromorphosis", "Wind Power"].includes(effect.name)) {
          this.add("-start", pokemon, "Lightning Charge", this.activeMove.name, "[from] ability: " + effect.name);
        } else {
          this.add("-start", pokemon, "Lightning Charge");
        }
      },
      onRestart(pokemon, source2, effect) {
        if (effect && ["Electromorphosis", "Wind Power"].includes(effect.name)) {
          this.add("-start", pokemon, "Lightning Charge", this.activeMove.name, "[from] ability: " + effect.name);
        } else {
          this.add("-start", pokemon, "Lightning Charge");
        }
      },
      onBasePowerPriority: 9,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Electric") {
          this.debug("charge boost");
          return this.chainModify(2);
        }
      },
      onMoveAborted(pokemon, target, move) {
        if (move.id !== "charge") {
          pokemon.removeVolatile("lightningcharge");
        }
      },
      onAfterMove(pokemon, target, move) {
        if (move.id !== "charge") {
          pokemon.removeVolatile("lightningcharge");
        }
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Lightning Charge", "[silent]");
      }
    },
    boosts: {
      spd: 1
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 200
  },
  lightningcut: {
    name: "Lightning Cut",
    shortDesc: "10% chance to raise the user's Speed.",
    target: "normal",
    type: "Electric",
    category: "Physical",
    basePower: 90,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Wild Charge", target);
    },
    secondary: {
      chance: 10,
      self: {
        boosts: { spe: 1 }
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 33
  },
  lightningspeed: {
    name: "Lightning Speed",
    shortDesc: "If it inflicts damage, the user switches for another puppet. Ends battles against wild puppets.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 70,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Volt Switch", target);
    },
    selfSwitch: true
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 60
  },
  lightningstrike: {
    name: "Lightning Strike",
    shortDesc: "10% chance to paralyze the foe.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 55,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shock Wave", target);
    },
    secondary: {
      chance: 10,
      status: "par"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 5
  },
  limitlessrealm: {
    name: "Limitless Realm",
    shortDesc: "Cancels all weather and terrain.",
    target: "all",
    type: "Warped",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Haze", target);
    },
    onTryHit(source2, target, move) {
      if (!this.field.weather && !this.field.terrain)
        return false;
    },
    onHit(target, source2, move) {
      this.field.clearWeather();
      this.field.clearTerrain();
    }
  },
  lostcrisis: {
    name: "Lost Crisis",
    shortDesc: "If a Terrain is active, inflicts double damage and removes it.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Throat Chop", target);
    },
    onBasePower(relayVar, source2, target, move) {
      if (this.field.terrain) {
        return move.basePower * 2;
      }
      return move.basePower;
    },
    onAfterHit(target, source2, move) {
      this.field.clearTerrain();
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 164
  },
  loveorpain: {
    name: "Love or Pain",
    shortDesc: "Does double damage if the foe has a status ailment.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hex", target);
    },
    onBasePower(relayVar, source2, target, move) {
      if (target.status)
        return move.basePower * 2;
      return move.basePower;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 113
  },
  luckyrainbow: {
    name: "Lucky Rainbow",
    shortDesc: "The user's side is protected from abnormal status for five turns.",
    target: "allySide",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 15.625,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Safeguard", target);
    },
    sideCondition: "luckyrainbow",
    condition: {
      duration: 5,
      durationCallback(target, source2, effect) {
        if (source2?.hasItem("fluorite")) {
          return 8;
        }
        return 5;
      },
      onAnySetStatus(status, target, source2, effect) {
        if (target !== source2 && this.effectState.target.hasAlly(target)) {
          this.debug("Lucky Rainbow protect");
          return false;
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "Lucky Rainbow");
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 1,
      onSideEnd(side) {
        this.add("-sideend", side, "Lucky Rainbow");
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 176
  },
  lullaby: {
    name: "Lullaby",
    shortDesc: "Stops the foe.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 60,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hypnosis", target);
    },
    status: "stp"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 25
  },
  luminousflux: {
    name: "Luminous Flux",
    shortDesc: "The user takes 1/3 of the damage in recoil.",
    target: "normal",
    type: "Light",
    category: "Physical",
    basePower: 120,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double-Edge", target);
    },
    recoil: [1, 3]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 51
  },
  lusciouswhisper: {
    name: "Luscious Whisper",
    shortDesc: "Attacks against the foe's FoDef instead of their SpDef.",
    target: "normal",
    type: "Warped",
    category: "Special",
    basePower: 80,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psyshock", target);
    },
    overrideDefensiveStat: "def"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 130
  },
  macroburst: {
    name: "Macroburst",
    shortDesc: "30% chance to confuse the foe.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 80,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hurricane", target);
    },
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 17
  },
  madrushstance: {
    name: "Mad Rush Stance",
    shortDesc: "Raises the user's FoAtk, and sharply raises their Speed.",
    target: "self",
    type: "Steel",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shift Gear", target);
    },
    boosts: { atk: 1, spe: 2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 76
  },
  magicbarrier: {
    name: "Magic Barrier",
    shortDesc: "Puts up a barrier using a fourth of the user's max HP.",
    target: "self",
    type: "Void",
    category: "Status",
    pp: 6.25,
    basePower: 0,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Substitute", target);
    },
    volatileStatus: "magicbarrier",
    onTryHit(source2) {
      if (source2.volatiles["magicbarrier"]) {
        this.add("-fail", source2, "move: Magic Barrier");
        return this.NOT_FAIL;
      }
      if (source2.hp <= source2.maxhp / 4 || source2.maxhp === 1) {
        this.add("-fail", source2, "move: Magic Barrier", "[weak]");
        return this.NOT_FAIL;
      }
    },
    onHit(target) {
      this.directDamage(target.maxhp / 4);
    },
    condition: {
      onStart(target, source2, effect) {
        this.add("-start", target, "Magic Barrier", "[silent]");
        this.add("-message", `${target.name} created a Magic Barrier!`);
        this.effectState.hp = Math.floor(target.maxhp / 4);
        if (target.volatiles["partiallytrapped"]) {
          this.add("-end", target, target.volatiles["partiallytrapped"].sourceEffect, "[partiallytrapped]", "[silent]");
          delete target.volatiles["partiallytrapped"];
        }
      },
      onTryPrimaryHitPriority: -1,
      onTryPrimaryHit(target, source2, move) {
        if (target === source2 || move.flags["bypasssub"] || move.infiltrates) {
          return;
        }
        let damage = this.actions.getDamage(source2, target, move);
        if (!damage && damage !== 0) {
          this.add("-fail", source2);
          this.attrLastMove("[still]");
          return null;
        }
        damage = this.runEvent("SubDamage", target, source2, move, damage);
        if (!damage) {
          return damage;
        }
        if (damage > target.volatiles["magicbarrier"].hp) {
          damage = target.volatiles["magicbarrier"].hp;
        }
        target.volatiles["magicbarrier"].hp -= damage;
        source2.lastDamage = damage;
        if (target.volatiles["magicbarrier"].hp <= 0) {
          if (move.ohko)
            this.add("-ohko");
          target.removeVolatile("magicbarrier");
        } else {
          this.add("-activate", target, "move: Magic Barrier", "[damage]");
        }
        if (move.recoil || move.id === "chloroblast") {
          this.damage(this.actions.calcRecoilDamage(damage, move, source2), source2, target, "recoil");
        }
        if (move.drain) {
          this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source2, target, "drain");
        }
        this.singleEvent("AfterSubDamage", move, null, target, source2, move, damage);
        this.runEvent("AfterSubDamage", target, source2, move, damage);
        return this.HIT_SUBSTITUTE;
      },
      onEnd(target) {
        this.add("-end", target, "Magic Barrier", "[silent]");
        this.add("-message", `${target.name}'s Magic Barrier broke!`);
      }
    }
  },
  merrydance: {
    name: "Merry Dance",
    shortDesc: "Raises the user's FoDef and SpDef.",
    target: "self",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Quiver Dance", target);
    },
    boosts: { def: 1, spd: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 74
  },
  metalneedle: {
    name: "Metal Needle",
    shortDesc: "20% chance to raise the user's SpAtk.",
    target: "normal",
    type: "Steel",
    category: "Special",
    basePower: 65,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Magnet Bomb", target);
    },
    secondary: {
      chance: 20,
      self: {
        boosts: {
          spa: 1
        }
      }
    }
  },
  meteorimpact: {
    name: "Meteor Impact",
    shortDesc: "Fails if the user is hurt on the same turn they try to use this Skill.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 150,
    pp: 12.5,
    accuracy: 100,
    priority: -3,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Focus Punch", target);
    },
    onTryHit(source2, target, move) {
      if (source2.hurtThisTurn) {
        this.add("-fail", source2);
        return false;
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 109
  },
  miasma: {
    name: "Miasma",
    shortDesc: "Harshly poisons the foe. Always hits if the user is Poison-type.",
    target: "normal",
    type: "Poison",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Toxic", target);
    },
    onModifyMove(move, pokemon, target) {
      if (pokemon.hasType("Poison"))
        move.accuracy = true;
    },
    status: "tox"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 27
  },
  midnightspecter: {
    name: "Midnight Specter",
    shortDesc: "The user takes 1/3 of the damage in recoil. 10% chance to cause fear to opponents.",
    target: "normal",
    type: "Nether",
    category: "Physical",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Poltergeist", target);
    },
    recoil: [1, 3]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 108
  },
  mindcontrol: {
    name: "Mind Control",
    shortDesc: "Changes the foe's Ability to the user's Ability.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Role Play", target);
    },
    onHit(target, source2, move) {
      target.setAbility(source2.ability);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 211
  },
  minetrap: {
    name: "Mine Trap",
    shortDesc: "Lays a trap that hurts foes entering the field. Can be set up to 3 times.",
    target: "foeSide",
    type: "Earth",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spikes", target);
    },
    sideCondition: "minetrap",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "minetrap");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 3)
          return false;
        this.add("-sidestart", side, "minetrap");
        this.effectState.layers++;
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded())
          return;
        if (pokemon.hasItem("tengugeta"))
          return;
        const damageAmounts = [0, 3, 4, 6];
        this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 217
  },
  miraclereprisal: {
    name: "Miracle Reprisal",
    shortDesc: "Power increases the more the foe's stats have been increased.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 20,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Power Trip", target);
    },
    basePowerCallback(pokemon, target, move) {
      const bp = move.basePower + 20 * target.positiveBoosts();
      return bp;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 120
  },
  mirage: {
    name: "Mirage",
    shortDesc: "Reflects Status skills back to the other party.",
    target: "self",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 4,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Magic Coat", target);
    },
    volatileStatus: "mirage",
    condition: {
      duration: 1,
      onStart(target, source2, effect) {
        this.add("-singleturn", target, "move: Mirage");
        if (effect?.effectType === "Move") {
          this.effectState.pranksterBoosted = effect.pranksterBoosted;
        }
      },
      onTryHitPriority: 2,
      onTryHit(target, source2, move) {
        if (target === source2 || move.hasBounced || move.category !== "Status" || move.target !== "normal" && move.target !== "foeSide" || move.name !== "Shinigami's Waltz") {
          return;
        }
        const newMove = this.dex.getActiveMove(move.id);
        newMove.hasBounced = true;
        newMove.pranksterBoosted = this.effectState.pranksterBoosted;
        this.actions.useMove(newMove, target, source2);
        return null;
      },
      onAllyTryHitSide(target, source2, move) {
        if (target.isAlly(source2) || move.hasBounced || !move.flags["reflectable"]) {
          return;
        }
        const newMove = this.dex.getActiveMove(move.id);
        newMove.hasBounced = true;
        newMove.pranksterBoosted = false;
        this.actions.useMove(newMove, this.effectState.target, source2);
        return null;
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 180
  },
  mirageedge: {
    name: "Mirage Edge",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Smart Strike", target);
    },
    critRatio: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 19
  },
  mirrordamage: {
    name: "Mirror Damage",
    shortDesc: "Power doubles if you take damage from a foe's Skill on the same turn.",
    target: "normal",
    type: "Warped",
    category: "Special",
    basePower: 60,
    basePowerCallback(pokemon, target, move) {
      const damagedByTarget = pokemon.attackedBy.some(
        (p) => p.source === target && p.damage > 0 && p.thisTurn
      );
      if (damagedByTarget) {
        this.debug("BP doubled for getting hit by " + target);
        return move.basePower * 2;
      }
      return move.basePower;
    },
    pp: 6.25,
    accuracy: 100,
    priority: -4,
    flags: { protect: 1, counter: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mirror Coat", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 115
  },
  mirrorworld: {
    name: "Mirror World",
    shortDesc: "30% chance to make the foe flinch.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 60,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Magnet Bomb", target);
    },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 18
  },
  mirrorsreflection: {
    name: "Mirror's Reflection",
    shortDesc: "Damage is 50% more than the damage taken from the foe's attack on the same turn.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, failcopycat: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Metal Burst", target);
    },
    damageCallback(pokemon) {
      if (!pokemon.volatiles["mirrorsreflection"])
        return 0;
      return pokemon.volatiles["mirrorsreflection"].damage || 1;
    },
    beforeTurnCallback(pokemon) {
      pokemon.addVolatile("mirrorsreflection");
    },
    onTry(source2) {
      if (!source2.volatiles["mirrorsreflection"])
        return false;
      if (source2.volatiles["mirrorsreflection"].slot === null)
        return false;
    },
    condition: {
      duration: 1,
      noCopy: true,
      onStart(target, source2, move) {
        this.effectState.slot = null;
        this.effectState.damage = 0;
      },
      onRedirectTargetPriority: -1,
      onRedirectTarget(target, source2, source22, move) {
        if (move.id !== "mirrorsreflection")
          return;
        if (source2 !== this.effectState.target || !this.effectState.slot)
          return;
        return this.getAtSlot(this.effectState.slot);
      },
      onDamagingHit(damage, target, source2, move) {
        if (!source2.isAlly(target) && this.getCategory(move) !== "Status") {
          this.effectState.slot = source2.getSlot();
          this.effectState.damage = 1.5 * damage;
        }
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 137
  },
  moonbow: {
    name: "Moonbow",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Light",
    category: "Special",
    basePower: 100,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spirit Shackle", target);
    }
    // Class: BU
    // Effect Chance: 0
    // Effect ID: 0
  },
  moonsprotection: {
    name: "Moon's Protection",
    shortDesc: "Raises the user's SpAtk and SpDef.",
    target: "self",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Calm Mind", target);
    },
    boosts: { spa: 1, spd: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 67
  },
  moonsreflection: {
    name: "Moon's Reflection",
    shortDesc: "Damage is twice the damage taken from the foe's Spread attack on the same turn.",
    target: "normal",
    type: "Illusion",
    category: "Special",
    basePower: 0,
    damageCallback(pokemon) {
      if (!pokemon.volatiles["moonsreflection"])
        return 0;
      return pokemon.volatiles["moonsreflection"].damage || 1;
    },
    pp: 12.5,
    accuracy: 100,
    priority: -5,
    flags: { protect: 1, counter: 1, failcopycat: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mirror Coat", target);
    },
    beforeTurnCallback(pokemon) {
      pokemon.addVolatile("moonsreflection");
    },
    onTry(source2) {
      if (!source2.volatiles["moonsreflection"])
        return false;
      if (source2.volatiles["moonsreflection"].slot === null)
        return false;
    },
    condition: {
      duration: 1,
      noCopy: true,
      onStart(target, source2, move) {
        this.effectState.slot = null;
        this.effectState.damage = 0;
      },
      onRedirectTargetPriority: -1,
      onRedirectTarget(target, source2, source22, move) {
        if (move.id !== "moonsreflection")
          return;
        if (source2 !== this.effectState.target || !this.effectState.slot)
          return;
        return this.getAtSlot(this.effectState.slot);
      },
      onDamagingHit(damage, target, source2, move) {
        if (!source2.isAlly(target) && this.getCategory(move) === "Special") {
          this.effectState.slot = source2.getSlot();
          this.effectState.damage = 2 * damage;
        }
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 136
  },
  mountainbreaker: {
    name: "Mountain Breaker",
    shortDesc: "Power is higher if the foe's cost is high.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Cross Chop", target);
    },
    basePowerCallback(pokemon, target, move) {
      switch (target.getWeight()) {
        case 0:
          return 40;
        case 1:
          return 60;
        case 2:
          return 80;
        case 3:
          return 100;
        case 4:
          return 120;
      }
      return 40;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 126
  },
  muddango: {
    name: "Mud Dango",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mud Shot", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  mudslide: {
    name: "Mudslide",
    shortDesc: "10% chance to lower the foe's Accuracy.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 75,
    pp: 15.625,
    accuracy: 80,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thousand Waves", target);
    },
    secondary: {
      chance: 10,
      boosts: { accuracy: -1 }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 78
  },
  mysteriousflare: {
    name: "Mysterious Flare",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Illusion",
    category: "Special",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mystical Fire", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  mysteriousliquid: {
    name: "Mysterious Liquid",
    shortDesc: "Does double damage if the foe is poisoned.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Scald", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (target.status === "psn" || target.status === "tox")
        return move.basePower * 2;
      return move.basePower;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 112
  },
  mysteriouswave: {
    name: "Mysterious Wave",
    shortDesc: "Attacks against the foe's FoDef instead of their SpDef.",
    target: "normal",
    type: "Illusion",
    category: "Special",
    basePower: 80,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psyshock", target);
    },
    overrideDefensiveStat: "def"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 130
  },
  mysticwind: {
    name: "Mystic Wind",
    shortDesc: "Drastically raises the user's FoDef.",
    target: "self",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Cotton Guard", target);
    },
    boosts: { def: 3 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 75
  },
  mysticalbugmist: {
    name: "Mystical Bug Mist",
    shortDesc: "Paralyzes the foe.",
    target: "normal",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: 75,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Stun Spore", target);
    },
    status: "par"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 24
  },
  naturalbeauty: {
    name: "Natural Beauty",
    shortDesc: "20% chance to lower the foe's FoAtk.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 90,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Seed Bomb", target);
    },
    secondary: {
      chance: 20,
      boosts: { atk: -1 }
    }
    // Class: BU
    // Effect Chance: 200
    // Effect ID: 34
  },
  naturesign: {
    name: "Nature Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  neardeathevent: {
    name: "Near-Death Event",
    shortDesc: "Duplicates the effect of the last used Skill.",
    target: "self",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { failcopycat: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Copycat", target);
    },
    onHit(pokemon) {
      let move = this.lastMove;
      if (!move)
        return;
      if (move.isMax && move.baseMove)
        move = this.dex.moves.get(move.baseMove);
      if (move.flags["failcopycat"] || move.isZ || move.isMax) {
        return false;
      }
      this.actions.useMove(move.id, pokemon);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 185
  },
  negativemist: {
    name: "Negative Mist",
    shortDesc: "Always hits. Clears the foe's stat modifiers.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 60,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Clear Smog", target);
    },
    onHit(target, source2, move) {
      target.clearBoosts();
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 131
  },
  nethersign: {
    name: "Nether Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  nightstep: {
    name: "Night Step",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 90,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Knock Off", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  nightwind: {
    name: "Night Wind",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Air Slash", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  offensivetrance: {
    name: "Offensive Trance",
    shortDesc: "Sharply raises the user's FoAtk, SpAtk, and Speed at the cost of FDef and SDef.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Clangorous Soul", target);
    },
    boosts: { atk: 2, def: -1, spa: 2, spd: -1, spe: 2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 70
  },
  offseasonbloom: {
    name: "Off-Season Bloom",
    shortDesc: "Harshly lowers the user's SpAtk.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 130,
    pp: 3.125,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Leaf Storm", target);
    },
    self: {
      boosts: { spa: -2 }
    }
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 56
  },
  ominousdoll: {
    name: "Ominous Doll",
    shortDesc: "10% chance to blind the foe.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dark Pulse", target);
    },
    secondaries: [
      {
        chance: 10,
        status: "dark"
      }
    ]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 3
  },
  overray: {
    name: "Over Ray",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Light",
    category: "Physical",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flash", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  overdrive: {
    name: "Overdrive",
    shortDesc: "Harshly lowers the user's FoAtk.",
    target: "normal",
    type: "Warped",
    category: "Physical",
    basePower: 130,
    pp: 3.125,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Zap Cannon", target);
    },
    self: {
      boosts: { atk: -2 }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 234
  },
  overrun: {
    name: "Overrun",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 100,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Frustration", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  overskill: {
    name: "Overskill",
    shortDesc: "The user takes 1/3 of the damage in recoil.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 120,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double-Edge", target);
    },
    recoil: [1, 3]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 51
  },
  overtakestrike: {
    name: "Overtake Strike",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bullet Punch", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  paniccall: {
    name: "Panic Call",
    shortDesc: "If the foe holds an item, the attack is 50% stronger and knocks away the item.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Knock Off", target);
    },
    onBasePower(basePower, source2, target, move) {
      const item = target.getItem();
      if (!this.singleEvent("TakeItem", item, target.itemData, target, target, move, item))
        return;
      if (item.id) {
        return this.chainModify(1.5);
      }
    },
    onAfterHit(target, source2) {
      if (source2.hp) {
        const item = target.takeItem();
        if (item) {
          this.add("-enditem", target, item.name, "[from] move: Panic Call", "[of] " + source2);
        }
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 143
  },
  paralyzingwave: {
    name: "Paralyzing Wave",
    shortDesc: "Paralyzes the foe.",
    target: "normal",
    type: "Electric",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunder Wave", target);
    },
    status: "par"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 24
  },
  parasite: {
    name: "Parasite",
    shortDesc: "The user recovers half of the damage dealt.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 50,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mega Drain", target);
    },
    drain: [1, 2]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 141
  },
  passingbreeze: {
    name: "Passing Breeze",
    shortDesc: "Will double in power during any weather, as well as cancel the weather.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aeroblast", target);
    },
    basePowerCallback(pokemon, target, move) {
      return this.field.weather ? move.basePower : move.basePower * 2;
    },
    onAfterHit(source2, target, move) {
      if (this.field.weather)
        this.field.clearWeather();
    }
  },
  peachthornarrow: {
    name: "Peach-Thorn Arrow",
    shortDesc: "The user takes 1/3 of the damage in recoil.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 120,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Wood Hammer", target);
    },
    recoil: [1, 3]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 51
  },
  perch: {
    name: "Perch",
    shortDesc: "Restores half of the user's HP, and grounds the user for the rest of the turn.",
    target: "self",
    type: "Wind",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: { heal: 1 },
    heal: [1, 2],
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Roost", target);
    },
    self: {
      volatileStatus: "perch"
    },
    condition: {
      duration: 1,
      onResidualOrder: 20,
      onStart(target) {
        this.add("-singleturn", target, "move: Perch");
      },
      onTypePriority: -1,
      onType(types, pokemon) {
        this.effectState.typeWas = types;
        return types.filter((type) => type !== "Wind");
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 184
  },
  perfectaim: {
    name: "Perfect Aim",
    shortDesc: "Defeats the foe if it hits, regardless of their HP.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 0,
    pp: 6.25,
    accuracy: 30,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Horn Drill", target);
    },
    ohko: true
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 138
  },
  petaldance: {
    name: "Petal Dance",
    shortDesc: "The user attacks for 2-3 turns, then becomes confused.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Petal Dance", target);
    },
    self: {
      volatileStatus: "lockedmove"
    },
    onAfterMove(pokemon) {
      if (pokemon.volatiles["lockedmove"] && pokemon.volatiles["lockedmove"].duration === 1) {
        pokemon.removeVolatile("lockedmove");
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 150
  },
  phantomensemble: {
    name: "Phantom Ensemble",
    shortDesc: "Lowers the target's Atk by 1.",
    target: "normal",
    type: "Sound",
    category: "Physical",
    basePower: 55,
    pp: 15,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Snarl", target);
    },
    secondary: {
      chance: 100,
      boosts: { atk: -1 }
    }
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 34
  },
  phaseinversion: {
    name: "Phase Inversion",
    shortDesc: "Inverts the foe's stat modifiers.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 1,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Topsy-Turvy", target);
    },
    onHit(target) {
      let success = false;
      let i;
      for (i in target.boosts) {
        if (target.boosts[i] === 0)
          continue;
        target.boosts[i] = -target.boosts[i];
        success = true;
      }
      if (!success)
        return false;
      this.add("-invertboost", target, "[from] move: Phase Inversion");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 218
  },
  phoenixwaltz: {
    name: "Phoenix Waltz",
    shortDesc: "Power decreases if the user is not at full HP.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 150,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Eruption", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (pokemon.hp === pokemon.baseMaxhp) {
        return 150;
      }
      return 100 * pokemon.hp / pokemon.baseMaxhp;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 117
  },
  piercingstab: {
    name: "Piercing Stab",
    shortDesc: "Ignores the opponent's stat modifiers.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 70,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Return", target);
    },
    beforeTurnCallback(pokemon, target) {
      pokemon.addVolatile("ignoremodifiers");
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 132
  },
  plasmaball: {
    name: "Plasma Ball",
    shortDesc: "Paralyzes the foe.",
    target: "normal",
    type: "Electric",
    category: "Physical",
    basePower: 20,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Electro Ball", target);
    },
    status: "par"
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 5
  },
  playghost: {
    name: "Play Ghost",
    shortDesc: "10% chance to scare the foe.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Claw", target);
    },
    secondary: {
      chance: 10,
      status: "fear"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 4
  },
  poisonbomb: {
    name: "Poison Bomb",
    shortDesc: "10% chance to poison the foe.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sludge Bomb", target);
    },
    secondary: {
      chance: 10,
      status: "psn"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 1
  },
  poisonsign: {
    name: "Poison Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  poisonstream: {
    name: "Poison Stream",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Poison",
    category: "Physical",
    basePower: 100,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sludge Wave", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  poisontrap: {
    name: "Poison Trap",
    shortDesc: "Lays a trap that poisons foes entering the field. Can be stacked up to twice.",
    target: "foeSide",
    type: "Poison",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Toxic Spikes", target);
    },
    sideCondition: "poisontrap",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Poison Trap");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 2)
          return false;
        this.add("-sidestart", side, "move: Poison Trap");
        this.effectState.layers++;
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasType("Poison")) {
          this.add("-sideend", pokemon.side, "move: Poison Trap", "[of] " + pokemon);
          pokemon.side.removeSideCondition("poisontrap");
        } else if (pokemon.hasType("Steel") || !pokemon.isGrounded || pokemon.hasItem(["heavydutyboots", "tengugeta"]) || pokemon.hasAbility(["strictdosage"])) {
          return;
        } else if (this.effectState.layers >= 2) {
          pokemon.trySetStatus("tox", pokemon.side.foe.active[0]);
        } else {
          pokemon.trySetStatus("psn", pokemon.side.foe.active[0]);
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 216
  },
  poisonedarrow: {
    name: "Poisoned Arrow",
    shortDesc: "10% chance to poison the foe. Lands critical hits more often.",
    target: "normal",
    type: "Poison",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Poison Jab", target);
    },
    critRatio: 2,
    secondary: {
      chance: 10,
      status: "psn"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 93
  },
  pollenmist: {
    name: "Pollen Mist",
    shortDesc: "10% chance to lower the foe's SpAtk.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Pollen Puff", target);
    },
    secondary: {
      chance: 10,
      boosts: { spa: -1 }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 36
  },
  poltergeist: {
    name: "Poltergeist",
    shortDesc: "10% chance to scare the foe.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 90,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Poltergeist", target);
    },
    secondary: {
      chance: 10,
      status: "fear"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 4
  },
  possession: {
    name: "Possession",
    shortDesc: "Changes the user's Ability to the foe's Ability.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Role Play", target);
    },
    onHit(target, source2, move) {
      source2.setAbility(target.ability);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 199
  },
  powerdrain: {
    name: "Power Drain",
    shortDesc: "The user recovers half of the damage dealt.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 75,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Giga Drain", target);
    },
    drain: [1, 2]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 141
  },
  powersplit: {
    name: "Power Split",
    shortDesc: "Averages the user's FoAtk and SpAtk with the foe's.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Power Split", target);
    },
    onHit(target, source2) {
      const newatk = Math.floor((target.storedStats.atk + source2.storedStats.atk) / 2);
      target.storedStats.atk = newatk;
      source2.storedStats.atk = newatk;
      const newspa = Math.floor((target.storedStats.spa + source2.storedStats.spa) / 2);
      target.storedStats.spa = newspa;
      source2.storedStats.spa = newspa;
      this.add("-activate", source2, "move: Power Split", "[of] " + target);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 193
  },
  powerspot: {
    name: "Power Spot",
    shortDesc: "At the end of the next turn, the current puppet regains half of the user's max HP.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: true,
    priority: 0,
    flags: { heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Wish", target);
    },
    slotCondition: "Power Spot",
    condition: {
      duration: 2,
      onStart(pokemon, source2) {
        this.effectState.hp = source2.maxhp / 2;
      },
      onResidualOrder: 4,
      onEnd(target) {
        if (target && !target.fainted) {
          const damage = this.heal(this.effectState.hp, target, target);
          if (damage) {
            this.add("-heal", target, target.getHealth, "[from] move: Power Spot", "[wisher] " + this.effectState.source.name);
          }
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 187
  },
  powerswap: {
    name: "Power Swap",
    shortDesc: "Switches the user's changes to FoAtk and SpAtk with the foe's.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Power Swap", target);
    },
    onHit(target, source2) {
      const targetBoosts = {};
      const sourceBoosts = {};
      const atkSpa = ["atk", "spa"];
      for (const stat of atkSpa) {
        targetBoosts[stat] = target.boosts[stat];
        sourceBoosts[stat] = source2.boosts[stat];
      }
      source2.setBoost(targetBoosts);
      target.setBoost(sourceBoosts);
      this.add("-swapboost", source2, target, "atk, spa", "[from] move: Power Swap");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 192
  },
  prank: {
    name: "Prank",
    shortDesc: "Halves the foe's current HP.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 0,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Nature's Madness", target);
    },
    damageCallback(pokemon, target) {
      return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 139
  },
  pretense: {
    name: "Pretense",
    shortDesc: "Changes the user's type to the type of the first Skill they know.",
    target: "self",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: true,
    priority: 1,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Conversion", target);
    },
    onHit(target, source2, move) {
      const type = this.dex.moves.get(target.moveSlots[0].id).type;
      if (target.hasType(type) || !target.setType(type))
        return false;
      this.add("-start", target, "typechange", type);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 204
  },
  primalnoise: {
    name: "Primal Noise",
    shortDesc: "50% chance to lower the foe's SpDef.",
    target: "normal",
    type: "Sound",
    category: "Special",
    basePower: 75,
    pp: 6.25,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hyper Voice", target);
    },
    secondaries: [
      {
        chance: 50,
        boosts: { spd: -1 }
      }
    ]
    // Class: 2
    // Effect Chance: 500
    // Effect ID: 37
  },
  projection: {
    name: "Projection",
    shortDesc: "The user copies all of the foe's stat modifiers.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psych Up", target);
    },
    onHit(target, source2) {
      const targetBoosts = {};
      const sourceBoosts = {};
      let i;
      for (i in target.boosts) {
        targetBoosts[i] = target.boosts[i];
        sourceBoosts[i] = source2.boosts[i];
      }
      target.setBoost(sourceBoosts);
      source2.setBoost(targetBoosts);
      this.add("-swapboost", source2, target, "[from] move: Projection");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 212
  },
  pulselaser: {
    name: "Pulse Laser",
    shortDesc: "The user cannot move next turn.",
    target: "normal",
    type: "Light",
    category: "Special",
    basePower: 150,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { recharge: 1, protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Prismatic Laser", target);
    },
    self: {
      volatileStatus: "mustrecharge"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 50
  },
  puppetsgrudge: {
    name: "Puppet's Grudge",
    shortDesc: "The user faints to harshly lower the foe's FoAtk and SpAtk.",
    target: "normal",
    type: "Dark",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Memento", target);
    },
    boosts: { atk: -2, spa: -2 },
    onHit(target, source2, move) {
      source2.faint();
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 89
  },
  purgatoryflicker: {
    name: "Purgatory Flicker",
    shortDesc: "The user takes 1/3 of the damage in recoil. 10% chance to burn the foe.",
    target: "normal",
    type: "Fire",
    category: "Physical",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flare Blitz", target);
    },
    recoil: [1, 3],
    secondary: {
      chance: 10,
      status: "brn"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 99
  },
  purplelightning: {
    name: "Purple Lightning",
    shortDesc: "70% chance to raise the user's SpAtk.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 50,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Charge Beam", target);
    },
    secondary: {
      chance: 70,
      self: {
        boosts: { spa: 1 }
      }
    }
    // Class: 2
    // Effect Chance: 700
    // Effect ID: 31
  },
  purplesmog: {
    name: "Purple Smog",
    shortDesc: "10% chance to poison the foe.",
    target: "normal",
    type: "Poison",
    category: "Physical",
    basePower: 55,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Smog", target);
    },
    secondary: {
      chance: 10,
      status: "psn"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 1
  },
  pursuit: {
    name: "Pursuit",
    shortDesc: "If the foe attempts to switch on the same turn, attacks the fleeing puppet for double damage.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 50,
    basePowerCallback(pokemon, target, move) {
      if (target.beingCalledBack || target.switchFlag) {
        this.debug("Pursuit damage boost");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Pursuit", target);
    },
    beforeTurnCallback(pokemon) {
      for (const side of this.sides) {
        if (side.hasAlly(pokemon))
          continue;
        side.addSideCondition("pursuit", pokemon);
        const data = side.getSideConditionData("pursuit");
        if (!data.sources) {
          data.sources = [];
        }
        data.sources.push(pokemon);
      }
    },
    onModifyMove(move, source2, target) {
      if (target?.beingCalledBack || target?.switchFlag)
        move.accuracy = true;
    },
    onTryHit(target, pokemon) {
      target.side.removeSideCondition("pursuit");
    },
    condition: {
      duration: 1,
      onBeforeSwitchOut(pokemon) {
        this.debug("Pursuit start");
        let alreadyAdded = false;
        pokemon.removeVolatile("callofthedead");
        for (const source2 of this.effectState.sources) {
          if (!source2.isAdjacent(pokemon) || !this.queue.cancelMove(source2) || !source2.hp)
            continue;
          if (!alreadyAdded) {
            this.add("-activate", pokemon, "move: Pursuit");
            alreadyAdded = true;
          }
          if (source2.canMegaEvo || source2.canUltraBurst) {
            for (const [actionIndex, action] of this.queue.entries()) {
              if (action.pokemon === source2 && action.choice === "megaEvo") {
                this.actions.runMegaEvo(source2);
                this.queue.list.splice(actionIndex, 1);
                break;
              }
            }
          }
          this.actions.runMove("pursuit", source2, source2.getLocOf(pokemon));
        }
      }
    },
    isNonstandard: null
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 148
  },
  quagmire: {
    name: "Quagmire",
    shortDesc: "Lowers the foe's Speed.",
    target: "normal",
    type: "Water",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Soak", target);
    },
    boosts: { spe: -1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 16
  },
  racingearth: {
    name: "Racing Earth",
    shortDesc: "Sharply raises the user's Speed.",
    target: "self",
    type: "Earth",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rock Polish", target);
    },
    boosts: { spe: 2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 43
  },
  raid: {
    name: "Raid",
    shortDesc: "Will always make the foe flinch, but can only be used on entering combat.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 40,
    pp: 6.25,
    accuracy: 100,
    priority: 3,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fake Out", target);
    },
    onTry(source2) {
      if (source2.activeMoveActions > 1) {
        this.hint("Raid only works on your first turn out.");
        return false;
      }
    },
    secondary: {
      chance: 100,
      volatileStatus: "flinch"
    }
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 106
  },
  rainbowflowers: {
    name: "Rainbow Flowers",
    shortDesc: "A two-turn skill. The user charges on the first turn. Works instantly during Aurora.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, charge: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Solar Beam", target);
    },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["aurora"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 166
  },
  rainbowshot: {
    name: "Rainbow Shot",
    shortDesc: "Sets Veil of Water.",
    target: "normal",
    type: "Light",
    category: "Physical",
    basePower: 85,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Water Spout", target);
    },
    self: {
      sideCondition: "veilofwater"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 162
  },
  randomshots: {
    name: "Random Shots",
    shortDesc: "Hits two to five times.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 25,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dragon Darts", target);
    },
    multihit: [2, 5]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 53
  },
  rapidthrow: {
    name: "Rapid Throw",
    shortDesc: "Hits two to five times.",
    target: "normal",
    type: "Steel",
    category: "Special",
    basePower: 25,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rock Throw", target);
    },
    multihit: [2, 5]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 53
  },
  realmblackrain: {
    name: "Realm [Black Rain]",
    shortDesc: "Summons Sunshower weather and Genbu terrain.",
    target: "all",
    type: "Warped",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sunny Day", target);
    },
    weather: "sunshower",
    terrain: "genbu"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 251
  },
  realmcorona: {
    name: "Realm [Corona]",
    shortDesc: "Summons Aurora weather and Byakko terrain.",
    target: "all",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hail", target);
    },
    weather: "aurora",
    terrain: "byakko"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 248
  },
  realmgold: {
    name: "Realm [Gold]",
    shortDesc: "Summons Dust Storm weather and Kohryu terrain.",
    target: "all",
    type: "Earth",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sandstorm", target);
    },
    weather: "duststorm",
    terrain: "kohryu"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 250
  },
  realmscarletmist: {
    name: "Realm [Scarlet Mist]",
    shortDesc: "Summons Heavy Fog weather and Suzaku terrain.",
    target: "all",
    type: "Dark",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rain Dance", target);
    },
    weather: "heavyfog",
    terrain: "suzaku"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 247
  },
  realmserenity: {
    name: "Realm [Serenity]",
    shortDesc: "Summons Calm weather and Seiryu Terrain.",
    target: "all",
    type: "Wind",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Trick Room", target);
    },
    weather: "calm",
    terrain: "seiryu"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 249
  },
  recallnightmare: {
    name: "Recall Nightmare",
    shortDesc: "Changes the foe's Ability to Active, removing their old ability and preventing them from being Stopped.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Worry Seed", target);
    },
    onHit(target, source2, move) {
      target.setAbility("active");
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 210
  },
  recklessdive: {
    name: "Reckless Dive",
    shortDesc: "If the skill fails to inflict damage, the user loses half of their HP.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 130,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "High Jump Kick", target);
    },
    onMoveFail(target, source2, move) {
      source2.damage(source2.hp / 2);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 124
  },
  recollection: {
    name: "Recollection",
    shortDesc: "Copies all of the foe's attributes.",
    target: "normal",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 3,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Transform", target);
    },
    onHit(target, pokemon) {
      if (!pokemon.transformInto(target)) {
        return false;
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 229
  },
  recompensate: {
    name: "Recompensate",
    shortDesc: "Lowers the foe's HP to be the same as the user's HP.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 0,
    damageCallback(pokemon, target) {
      return target.getUndynamaxedHP() - pokemon.hp;
    },
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Endeavor", target);
    },
    onTryImmunity(target, pokemon) {
      return pokemon.hp < target.hp;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 140
  },
  reprimand: {
    name: "Reprimand",
    shortDesc: "Power doubles if you take damage from a foe's Skill on the same turn.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 60,
    basePowerCallback(pokemon, target, move) {
      const damagedByTarget = pokemon.attackedBy.some(
        (p) => p.source === target && p.damage > 0 && p.thisTurn
      );
      if (damagedByTarget) {
        this.debug("BP doubled for getting hit by " + target);
        return move.basePower * 2;
      }
      return move.basePower;
    },
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Revenge", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 110
  },
  resourcefulness: {
    name: "Resourcefulness",
    shortDesc: "Recovers a used held item.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Recycle", target);
    },
    onHit(pokemon) {
      if (pokemon.item || !pokemon.lastItem)
        return false;
      const item = pokemon.lastItem;
      pokemon.lastItem = "";
      this.add("-item", pokemon, this.dex.items.get(item), "[from] move: Recycle");
      pokemon.setItem(item);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 186
  },
  retaliation: {
    name: "Retaliation",
    shortDesc: "Power doubles if an ally was defeated last turn.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 70,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Retaliate", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (pokemon.side.faintedLastTurn) {
        return move.basePower * 2;
      }
      return move.basePower;
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 116
  },
  reversalsword: {
    name: "Reversal Sword",
    shortDesc: "Always hits.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 60,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sacred Sword", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  reversesplash: {
    name: "Reverse Splash",
    shortDesc: "Power doubles if the foe attacks the user on the same turn.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 60,
    basePowerCallback(pokemon, target, move) {
      const damagedByTarget = pokemon.attackedBy.some(
        (p) => p.source === target && p.damage > 0 && p.thisTurn
      );
      if (damagedByTarget) {
        this.debug("BP doubled for getting hit by " + target);
        return move.basePower * 2;
      }
      return move.basePower;
    },
    pp: 6.25,
    accuracy: 100,
    priority: -4,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Splash", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 115
  },
  revolvingillusions: {
    name: "Revolving Illusions",
    shortDesc: "Uses the foe's FoAtk instead of the user's.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Foul Play", target);
    },
    overrideOffensivePokemon: "target"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 129
  },
  risingsun: {
    name: "Rising Sun",
    shortDesc: "Raises the user's Speed.",
    target: "normal",
    type: "Fire",
    category: "Physical",
    basePower: 50,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flame Charge", target);
    },
    self: {
      boosts: { spe: 1 }
    }
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 33
  },
  roar: {
    name: "Roar",
    shortDesc: "Sharply lowers the foe's FoDef.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Roar", target);
    },
    boosts: { def: -2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 45
  },
  rockdrills: {
    name: "Rock Drills",
    shortDesc: "A normal attack that always lands critical hits.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 70,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Precipice Blades", target);
    },
    willCrit: true
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 19
  },
  rockybarrage: {
    name: "Rocky Barrage",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Stone Edge", target);
    },
    critRatio: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 19
  },
  rootfrog: {
    name: "Root Frog",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Power Whip", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  rootinjection: {
    name: "Root Injection",
    shortDesc: "Poisons the foe.",
    target: "normal",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Poison Sting", target);
    },
    status: "psn"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 20
  },
  royalprism: {
    name: "Royal Prism",
    shortDesc: "30% chance to make the foe flinch.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 75,
    pp: 9.375,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Earthquake", target);
    },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 18
  },
  rubburn: {
    name: "Rub Burn",
    shortDesc: "Burns the foe.",
    target: "normal",
    type: "Fire",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Will-o-Wisp", target);
    },
    status: "brn"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 21
  },
  ruinousvoice: {
    name: "Ruinous Voice",
    shortDesc: "Both puppets will faint in 3 turns. Switching out ends the effect.",
    target: "all",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Perish Song", target);
    },
    onHitField(target, source2, move) {
      let result = false;
      let message = false;
      for (const pokemon of this.getAllActive()) {
        if (this.runEvent("Invulnerability", pokemon, source2, move) === false) {
          this.add("-miss", source2, pokemon);
          result = true;
        } else if (this.runEvent("TryHit", pokemon, source2, move) === null) {
          result = true;
        } else if (!pokemon.volatiles["ruinousvoice"]) {
          pokemon.addVolatile("ruinousvoice");
          this.add("-start", pokemon, "perish3", "[silent]");
          result = true;
          message = true;
        }
      }
      if (!result)
        return false;
      if (message)
        this.add("-fieldactivate", "move: Ruinous Voice");
    },
    condition: {
      duration: 4,
      onEnd(target) {
        this.add("-start", target, "perish0");
        target.faint();
      },
      onResidualOrder: 24,
      onResidual(pokemon) {
        const duration = pokemon.volatiles["ruinousvoice"].duration;
        this.add("-start", pokemon, "perish" + duration);
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 198
  },
  rushattack: {
    name: "Rush Attack",
    shortDesc: "Hits two to five times.",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 25,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Arm Thrust", target);
    },
    multihit: [2, 5]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 53
  },
  sakurablizzard: {
    name: "Sakura Blizzard",
    shortDesc: "10% chance to weaken the foe.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Petal Blizzard", target);
    },
    secondary: {
      chance: 10,
      status: "weak"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 94
  },
  samuraiedge: {
    name: "Samurai Edge",
    shortDesc: "10% chance to raise the user's FoAtk.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Night Slash", target);
    },
    secondary: {
      chance: 10,
      self: {
        boosts: { atk: 1 }
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 29
  },
  scatterbeam: {
    name: "Scatter Beam",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Simple Beam", target);
    },
    critRatio: 2
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 19
  },
  scatterbeans: {
    name: "Scatter Beans",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Seed Bomb", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  scorn: {
    name: "Scorn",
    shortDesc: "The last skill the foe used loses 4 SP.",
    target: "normal",
    type: "Nether",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spite", target);
    },
    onTryHit(source2, target, move) {
      if (!target.lastMoveUsed) {
        this.add("-fail", source2);
        return false;
      }
    },
    onHit(target, source2, move) {
      if (target.lastMoveUsed)
        target.lastMoveUsed.pp -= 4;
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 213
  },
  seasondoyou: {
    name: "Season [Doyou]",
    shortDesc: "Summons Calm weather and Kohryu terrain.",
    target: "all",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sunny Day", target);
    },
    weather: "calm",
    terrain: "kohryu"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 608
  },
  seasonfall: {
    name: "Season [Fall]",
    shortDesc: "Summons Heavy Fog weather and Byakko terrain.",
    target: "all",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rain Dance", target);
    },
    weather: "heavyfog",
    terrain: "byakko"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 607
  },
  seasonspring: {
    name: "Season [Spring]",
    shortDesc: "Summons Sunshower weather and Seiryu terrain.",
    target: "all",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sunny Day", target);
    },
    weather: "sunshower",
    terrain: "seiryu"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 605
  },
  seasonsummer: {
    name: "Season [Summer]",
    shortDesc: "Summons Aurora weather and Suzaku terrain.",
    target: "all",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hail", target);
    },
    weather: "aurora",
    terrain: "suzaku"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 606
  },
  seasonwinter: {
    name: "Season [Winter]",
    shortDesc: "Summons Dust Storm weather and Genbu terrain.",
    target: "all",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sandstorm", target);
    },
    weather: "duststorm",
    terrain: "genbu"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 604
  },
  seasonalflowers: {
    name: "Seasonal Flowers",
    shortDesc: "10% chance to lower the foe's Sp.Atk.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Giga Drain", target);
    },
    secondary: {
      chance: 10,
      boosts: { spa: -1 }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 36
  },
  shadowbomb: {
    name: "Shadow Bomb",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Nether",
    category: "Physical",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Sneak", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  shadowjavelin: {
    name: "Shadow Javelin",
    shortDesc: "10% chance to scare the foe.",
    target: "normal",
    type: "Nether",
    category: "Physical",
    basePower: 80,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1, javelin: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spirit Shackle", target);
    },
    secondary: {
      chance: 10,
      status: "fear"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 4
  },
  shadowrush: {
    name: "Shadow Rush",
    shortDesc: "Bypasses Supernatural Border and Thorned Ivy, and has increased priority.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 30,
    pp: 6.25,
    accuracy: 100,
    priority: 2,
    flags: { contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Sneak", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 170
  },
  sharktrade: {
    name: "Shark Trade",
    shortDesc: "Trades hold items with the foe.",
    target: "normal",
    type: "Dark",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Switcheroo", target);
    },
    onTryImmunity(target) {
      return !target.hasAbility("stickyhold");
    },
    onHit(target, source2, move) {
      const yourItem = target.takeItem(source2);
      const myItem = source2.takeItem();
      if (target.item || source2.item || !yourItem && !myItem) {
        if (yourItem)
          target.item = yourItem.id;
        if (myItem)
          source2.item = myItem.id;
        return false;
      }
      if (myItem && !this.singleEvent("TakeItem", myItem, source2.itemState, target, source2, move, myItem) || yourItem && !this.singleEvent("TakeItem", yourItem, target.itemState, source2, target, move, yourItem)) {
        if (yourItem)
          target.item = yourItem.id;
        if (myItem)
          source2.item = myItem.id;
        return false;
      }
      this.add("-activate", source2, "move: Shark Trade", "[of] " + target);
      if (myItem) {
        target.setItem(myItem);
        this.add("-item", target, myItem, "[from] move: Shark Trade");
      } else {
        this.add("-enditem", target, yourItem, "[silent]", "[from] move: Shark Trade");
      }
      if (yourItem) {
        source2.setItem(yourItem);
        this.add("-item", source2, yourItem, "[from] move: Shark Trade");
      } else {
        this.add("-enditem", source2, myItem, "[silent]", "[from] move: Shark Trade");
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 197
  },
  sharpwind: {
    name: "Sharp Wind",
    shortDesc: "Raises the user's SpAtk and Speed.",
    target: "self",
    type: "Wind",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Dragon Dance", target);
    },
    boosts: { spa: 1, spe: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 68
  },
  shatteringearth: {
    name: "Shattering Earth",
    shortDesc: "Defeats the foe if it hits, regardless of their HP.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 0,
    pp: 5,
    accuracy: 30,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fissure", target);
    },
    ohko: true
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 138
  },
  shieldup: {
    name: "Shield Up",
    shortDesc: "Raises the user's FoDef.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 21.875,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Harden", target);
    },
    boosts: { def: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 8
  },
  shinigamiswaltz: {
    name: "Shinigami's Waltz",
    shortDesc: "Consumes half of the user's HP to sap a fourth of the foe's HP every turn.",
    target: "normal",
    type: "Nether",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Curse", target);
    },
    volatileStatus: "shinigamiswaltz",
    onTryHit(target, source2, move) {
      if (move.volatileStatus && target.volatiles["shinigamiswaltz"]) {
        return false;
      }
    },
    onHit(target, source2) {
      this.directDamage(source2.maxhp / 2, source2, source2);
    },
    condition: {
      onStart(pokemon, source2) {
        this.add("-start", pokemon, "Shinigami's Waltz", "[of] " + source2);
      },
      onResidualOrder: 12,
      onResidual(pokemon) {
        this.damage(pokemon.baseMaxhp / 4);
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 206
  },
  shockingwave: {
    name: "Shocking Wave",
    shortDesc: "Shocks the foe. Does not work on Earth-type puppets.",
    target: "normal",
    type: "Electric",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 85,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunder Wave", target);
    },
    onTryImmunity(target, source2, move) {
      if (target.hasType("Earth"))
        return false;
    },
    status: "shk"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 238
  },
  shootingarts: {
    name: "Shooting Arts",
    shortDesc: "Hits two to five times.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 25,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Vacuum Wave", target);
    },
    multihit: [2, 5]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 53
  },
  shootingpress: {
    name: "Shooting Press",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 100,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Earthquake", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  shout: {
    name: "Shout",
    shortDesc: "Lowers the foe's FoAtk.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Growl", target);
    },
    boosts: {
      atk: -2
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 44
  },
  shriek: {
    name: "Shriek",
    shortDesc: "Lowers the foe's SpAtk.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Growl", target);
    },
    boosts: {
      spa: -2
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 46
  },
  silverrain: {
    name: "Silver Rain",
    shortDesc: "10% chance to raise the user's SpAtk.",
    target: "normal",
    type: "Steel",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Pay Day", target);
    },
    secondary: {
      chance: 10,
      self: {
        boosts: { spa: 1 }
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 31
  },
  singleminded: {
    name: "Single-Minded",
    shortDesc: "Raises the user's FoAtk.",
    target: "self",
    type: "Steel",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Meditate", target);
    },
    boosts: { atk: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 7
  },
  skanda: {
    name: "Skanda",
    shortDesc: "Sharply raises the user's Speed.",
    target: "self",
    type: "Wind",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Agility", target);
    },
    boosts: { spe: 2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 43
  },
  skullbreaker: {
    name: "Skull Breaker",
    shortDesc: "A normal attack",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Headbutt", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  slimeball: {
    name: "Slime Ball",
    shortDesc: "20% chance to harshly poison the foe.",
    target: "normal",
    type: "Poison",
    category: "Physical",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sludge Bomb", target);
    },
    secondary: {
      chance: 20,
      status: "tox"
    }
    // Class: BU
    // Effect Chance: 200
    // Effect ID: 95
  },
  slimeshot: {
    name: "Slime Shot",
    shortDesc: "Lowers the foe's Speed.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 55,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sludge Bomb", target);
    },
    boosts: { spe: -1 }
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 38
  },
  slingshot: {
    name: "Slingshot",
    shortDesc: "Lowers the foe's Accuracy.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 55,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sand Attack", target);
    },
    boosts: { accuracy: -1 }
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 78
  },
  smashspin: {
    name: "Smash Spin",
    shortDesc: "Clears the user's side of some binding effects, Drain Seed, and Trap skills.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 60,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    beforeTurnCallback(pokemon) {
      pokemon.addVolatile("smashspin");
    },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rapid Spin", target);
    },
    condition: {
      duration: 1,
      onUpdate(pokemon) {
        if (pokemon.moveThisTurn !== "smashspin")
          return;
        if (pokemon.hp) {
          if (pokemon.removeVolatile("drainseed"))
            this.add("-end", pokemon, "Drain Seed", "[from] move: Smash Spin", "[of] " + pokemon);
          const sideConditions = ["bindtrap", "minetrap", "poisontrap", "stealthtrap"];
          for (const condition of sideConditions) {
            if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
              this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Smash Spin", "[of] " + pokemon);
            }
          }
          if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
            pokemon.removeVolatile("partiallytrapped");
          }
        }
      }
    }
  },
  smogshot: {
    name: "Smog Shot",
    shortDesc: "30% chance to poison the foe.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 55,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sludge Bomb", target);
    },
    secondary: {
      chance: 30,
      status: "psn"
    }
    // Class: BU
    // Effect Chance: 300
    // Effect ID: 1
  },
  sneakattack: {
    name: "Sneak Attack",
    shortDesc: "Fails if the foe is not readying an attacking Skill, or if the foe moves first.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 80,
    pp: 3.125,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sucker Punch", target);
    },
    onTry(source2, target) {
      const action = this.queue.willMove(target);
      const move = action?.choice === "move" ? action.move : null;
      if (!move || move.category === "Status" && move.id !== "mefirst" || target.volatiles["mustrecharge"]) {
        return false;
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 107
  },
  snowballfight: {
    name: "Snowball Fight",
    shortDesc: "10% chance to lower the foe's Speed.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Icicle Crash", target);
    },
    secondary: {
      chance: 10,
      boosts: { spe: -1 }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 38
  },
  solareclipse: {
    name: "Solar Eclipse",
    shortDesc: "Scares and confuses the foe.",
    target: "normal",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 80,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Confuse Ray", target);
    },
    status: "fear",
    volatileStatus: "confusion"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 103
  },
  sopranovoice: {
    name: "Soprano Voice",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Sound",
    category: "Special",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hyper Voice", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  sorrowfultune: {
    name: "Sorrowful Tune",
    shortDesc: "Lowers the foe's SpAtk.",
    target: "normal",
    type: "Sound",
    category: "Special",
    basePower: 55,
    pp: 9.375,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hyper Voice", target);
    },
    boosts: { spa: -1 }
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 36
  },
  soulcorruption: {
    name: "Soul Corruption",
    shortDesc: "Blinds and confuses the foe.",
    target: "normal",
    type: "Warped",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 80,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mean Look", target);
    },
    status: "dark",
    volatileStatus: "confusion"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 246
  },
  souleater: {
    name: "Soul Eater",
    shortDesc: "10% chance to raise all of the user's stats.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Ominous Wind", target);
    },
    secondary: {
      chance: 10,
      self: {
        boosts: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 63
  },
  soulhound: {
    name: "Soul Hound",
    shortDesc: "Always hits.",
    target: "normal",
    type: "Nether",
    category: "Physical",
    basePower: 60,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bite", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  soulwalking: {
    name: "Soul Walking",
    shortDesc: "30% chance to scare the foe.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 55,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Claw", target);
    },
    secondary: {
      chance: 30,
      status: "fear"
    }
    // Class: BU
    // Effect Chance: 300
    // Effect ID: 4
  },
  soundsign: {
    name: "Sound Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Sound",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  sparkcross: {
    name: "Spark Cross",
    shortDesc: "Lowers the foe's Speed.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shock Wave", target);
    },
    boosts: { spe: -1 }
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 38
  },
  sparkjavelin: {
    name: "Spark Javelin",
    shortDesc: "10% chance to paralyze the foe.",
    target: "normal",
    type: "Electric",
    category: "Physical",
    basePower: 80,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1, javelin: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spark", target);
    },
    secondary: {
      chance: 10,
      status: "par"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 5
  },
  sparkshot: {
    name: "Spark Shot",
    shortDesc: "10% chance to paralyze the foe.",
    target: "normal",
    type: "Electric",
    category: "Physical",
    basePower: 55,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Spark", target);
    },
    secondary: {
      chance: 10,
      status: "par"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 5
  },
  specterwarning: {
    name: "Specter Warning",
    shortDesc: "10% chance to make the foe flinch.",
    target: "normal",
    type: "Nether",
    category: "Physical",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Claw", target);
    },
    secondary: {
      chance: 10,
      status: "weak"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 94
  },
  specterswaltz: {
    name: "Specter's Waltz",
    shortDesc: "10% chance to scare the foe.",
    target: "normal",
    type: "Nether",
    category: "Physical",
    basePower: 90,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Revelation Dance", target);
    },
    secondary: {
      chance: 10,
      status: "fear"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 4
  },
  speedybarrage: {
    name: "Speedy Barrage",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 140,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Double-Edge", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  spikedstones: {
    name: "Spiked Stones",
    shortDesc: "Lowers the foe's Speed.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 60,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rock Tomb", target);
    },
    boosts: { spe: -1 }
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 38
  },
  spinningair: {
    name: "Spinning Air",
    shortDesc: "10% chance to make the foe flinch.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 95,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Air Slash", target);
    },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 18
  },
  spiralstrike: {
    name: "Spiral Strike",
    shortDesc: "10% chance to raise the user's SpAtk.",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 70,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Vacuum Wave", target);
    },
    secondary: {
      chance: 10,
      self: {
        boosts: { spa: 1 }
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 31
  },
  spiritrush: {
    name: "Spirit Rush",
    shortDesc: "The user takes 1/4 of the damage in recoil.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Head Charge", target);
    },
    recoil: [1, 4]
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 97
  },
  springfirst: {
    name: "Spring First",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Vacuum Wave", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  squall: {
    name: "Squall",
    shortDesc: "Forces the foe to switch out for a random puppet. Ends battles against wild puppets.",
    target: "normal",
    type: "Wind",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: -6,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Whirlwind", target);
    },
    forceSwitch: true
  },
  stelmosfire: {
    name: "St. Elmo's Fire",
    shortDesc: "If the foe holds an item, the attack is 50% stronger and destroys the item.",
    target: "normal",
    type: "Illusion",
    category: "Physical",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flame Wheel", target);
    },
    onBasePower(basePower, source2, target, move) {
      const item = target.getItem();
      if (!this.singleEvent("TakeItem", item, target.itemData, target, target, move, item))
        return;
      if (item.id) {
        return this.chainModify(1.5);
      }
    },
    onAfterHit(target, source2) {
      if (source2.hp) {
        const item = target.takeItem();
        if (item) {
          this.add("-enditem", target, item.name, "[from] move: St. Elmo's Fire", "[of] " + source2);
        }
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 143
  },
  stalkandmurder: {
    name: "Stalk and Murder",
    shortDesc: "A two-turn skill. The user vanishes on the first turn. Bypasses Field Barriers.",
    target: "normal",
    type: "Nether",
    category: "Physical",
    basePower: 120,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: { protect: 1, contact: 1, charge: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Force", target);
    },
    infiltrates: true,
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    condition: {
      duration: 2,
      onInvulnerability(target, source2, move) {
        return false;
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 169
  },
  starflare: {
    name: "Star Flare",
    shortDesc: "20% chance to lower the foe's Accuracy.",
    target: "normal",
    type: "Light",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Flash", target);
    },
    secondary: {
      chance: 20,
      boosts: { accuracy: -1 }
    }
    // Class: BU
    // Effect Chance: 200
    // Effect ID: 78
  },
  starvingspirit: {
    name: "Starving Spirit",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 100,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Ball", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  stealthkill: {
    name: "Stealth Kill",
    shortDesc: "Always hits. Bypasses the effects of Magical Barrier.",
    target: "normal",
    type: "Warped",
    category: "Physical",
    basePower: 80,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1, contact: 1, bypasssub: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Phantom Force", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 243
  },
  stealthtrap: {
    name: "Stealth Trap",
    shortDesc: "Lays a trap that hurts foes entering the field. The trap's damage is Steel-typed.",
    target: "foeSide",
    type: "Steel",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Stealth Rock", target);
    },
    sideCondition: "stealthtrap",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "stealthtrap");
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasItem("tengugeta"))
          return;
        const steelHazard = this.dex.getActiveMove("Stealth Rock");
        steelHazard.type = "Steel";
        const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
        this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 214
  },
  steelsign: {
    name: "Steel Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Steel",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  stonecircle: {
    name: "Stone Circle",
    shortDesc: "10% chance to raise all of the user's stats.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Ancient Power", target);
    },
    secondary: {
      chance: 10,
      self: {
        boosts: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 }
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 63
  },
  stonepile: {
    name: "Stone Pile",
    shortDesc: "Raises the user's SpDef.",
    target: "self",
    type: "Nether",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Harden", target);
    },
    boosts: {
      spd: 1
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 10
  },
  stonerain: {
    name: "Stone Rain",
    shortDesc: "20% chance to make the foe flinch.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rock Slide", target);
    },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    }
    // Class: BU
    // Effect Chance: 200
    // Effect ID: 18
  },
  stonethrow: {
    name: "Stone Throw",
    shortDesc: "Hits twice.",
    target: "normal",
    type: "Earth",
    category: "Physical",
    basePower: 50,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Bonemerang", target);
    },
    multihit: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 224
  },
  stormcloudseye: {
    name: "Stormcloud's Eye",
    shortDesc: "30% chance to paralyze the foe.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Discharge", target);
    },
    secondary: {
      chance: 30,
      status: "par"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 5
  },
  strenuousstance: {
    name: "Strenuous Stance",
    shortDesc: "Sharply raises the user's FoAtk.",
    target: "self",
    type: "Steel",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Swords Dance", target);
    },
    boosts: { atk: 2 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 39
  },
  strikeshot: {
    name: "Strike Shot",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mach Punch", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  struggle: {
    name: "Struggle",
    shortDesc: "The user takes recoil damage equal to 1/3 of its max HP. Only used when a Puppet has no SP left for any of its skills.",
    target: "normal",
    type: "Dream",
    category: "Physical",
    basePower: 51,
    pp: 21.875,
    accuracy: true,
    priority: 0,
    flags: {
      contact: 1,
      protect: 1,
      failencore: 1,
      failmefirst: 1,
      nosleeptalk: 1,
      noassist: 1,
      failcopycat: 1,
      failinstruct: 1,
      failmimic: 1
    },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Struggle", target);
    },
    onAfterMove(pokemon, target, move) {
      this.damage(Math.round(pokemon.maxhp / 3), pokemon, pokemon);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 1023
  },
  sunbeamdance: {
    name: "Sunbeam Dance",
    shortDesc: "If the Weather is not clear, inflicts double damage and removes it.",
    target: "normal",
    type: "Light",
    category: "Physical",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Weather Ball", target);
    },
    basePowerCallback(pokemon, target, move) {
      return this.field.weather ? move.basePower : move.basePower * 2;
    },
    onAfterHit(source2, target, move) {
      if (this.field.weather)
        this.field.clearWeather();
    }
  },
  sunsprotection: {
    name: "Sun's Protection",
    shortDesc: "Raises the user's FoAtk and SpAtk. More potent during Calm and Aurora.",
    target: "self",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Growth", target);
    },
    onHit(target, source2, move) {
      let boost = 1;
      if (this.field.isWeather(["calm", "aurora"])) {
        boost = 2;
      }
      this.boost({ atk: boost, spa: boost });
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 201
  },
  supernaturalborder: {
    name: "Supernatural Border",
    shortDesc: "Blocks all damage from the foe's attack. May fail if used consecutively.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 4,
    flags: {},
    stallingMove: true,
    volatileStatus: "supernaturalborder",
    onPrepareHit(pokemon) {
      this.add("-anim", pokemon, "Protect", pokemon);
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "Supernatural Border");
      },
      onTryHitPriority: 3,
      onTryHit(target, source2, move) {
        if (!move.flags["protect"]) {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id))
            return;
          if (move.isZ || move.isMax)
            target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Supernatural Border");
        }
        const lockedmove = source2.getVolatile("lockedmove");
        if (lockedmove) {
          if (source2.volatiles["lockedmove"].duration === 2) {
            delete source2.volatiles["lockedmove"];
          }
        }
        return this.NOT_FAIL;
      }
    }
  },
  swallowcut: {
    name: "Swallow Cut",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 80,
    pp: 3.125,
    accuracy: 100,
    priority: 2,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Extreme Speed", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  sweetdesperado: {
    name: "Sweet Desperado",
    shortDesc: "Harshly lowers the user's SpAtk.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 130,
    pp: 3.125,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Gunk Shot", target);
    },
    self: {
      boosts: { spa: -2 }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 56
  },
  sweetnightmare: {
    name: "Sweet Nightmare",
    shortDesc: "Blinds the foe.",
    target: "normal",
    type: "Dark",
    category: "Status",
    basePower: 0,
    pp: 9.375,
    accuracy: 90,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mean Look", target);
    },
    status: "dark"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 22
  },
  swiftairraid: {
    name: "Swift Air-Raid",
    shortDesc: "Always hits. Bypasses the effects of Magical Barrier.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1, bypasssub: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Aeroblast", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 243
  },
  swirlingleaves: {
    name: "Swirling Leaves",
    shortDesc: "Always hits.",
    target: "normal",
    type: "Nature",
    category: "Special",
    basePower: 60,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Leaf Tornado", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  takeover: {
    name: "Take Over",
    shortDesc: "Uses target's SpAtk stat in damage calculation.",
    target: "normal",
    type: "Nether",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Foul Play", target);
    },
    overrideOffensivePokemon: "target"
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 129
  },
  tenseup: {
    name: "Tense Up",
    shortDesc: "Raises the user's FoDef.",
    target: "self",
    type: "Fighting",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Harden", target);
    },
    boosts: { def: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 8
  },
  terrainbyakko: {
    name: "Terrain [Byakko]",
    shortDesc: "Changes the terrain to Byakko for 5 turns. This prevents anyone from avoiding attacks.",
    target: "all",
    type: "Steel",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Trick Room", target);
    },
    terrain: "byakko"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 158
  },
  terraingenbu: {
    name: "Terrain [Genbu]",
    shortDesc: "Changes the terrain to Genbu for 5 turns. During Genbu, slower puppets move first.",
    target: "all",
    type: "Water",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: -7,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Trick Room", target);
    },
    terrain: "genbu"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 159
  },
  terrainkohryu: {
    name: "Terrain [Kohryu]",
    shortDesc: "Changes the terrain to Kohryu for 5 turns. This disables the effects of items and abilities.",
    target: "all",
    type: "Earth",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Magic Room", target);
    },
    terrain: "kohryu"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 237
  },
  terrainseiryu: {
    name: "Terrain [Seiryu]",
    shortDesc: "Changes the terrain to Seiryu for 5 turns. During Seiryu, types do not interact.",
    target: "all",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: -1,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Magic Room", target);
    },
    terrain: "seiryu"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 156
  },
  terrainsuzaku: {
    name: "Terrain [Suzaku]",
    shortDesc: "Changes the terrain to Suzaku for 5 turns. During Suzaku, healing effects cause harm.",
    target: "all",
    type: "Fire",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Wonder Room", target);
    },
    terrain: "suzaku"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 157
  },
  theripper: {
    name: "The Ripper",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Steel",
    category: "Physical",
    basePower: 60,
    pp: 15.625,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Smart Strike", target);
    },
    critRatio: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 19
  },
  thermit: {
    name: "Thermit",
    shortDesc: "Heavily burns the foe.",
    target: "normal",
    type: "Fire",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Will-o-Wisp", target);
    },
    status: "hvybrn"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 28
  },
  thievingwind: {
    name: "Thieving Wind",
    shortDesc: "Steals the foe's held item for yourself.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 60,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thief", target);
    },
    onAfterHit(target, source2, move) {
      if (source2.item || source2.volatiles["gem"]) {
        return;
      }
      const yourItem = target.takeItem(source2);
      if (!yourItem) {
        return;
      }
      if (!this.singleEvent("TakeItem", yourItem, target.itemState, source2, target, move, yourItem) || !source2.setItem(yourItem)) {
        target.item = yourItem.id;
        return;
      }
      this.add("-enditem", target, yourItem, "[silent]", "[from] move: Thieving Wind", "[of] " + source2);
      this.add("-item", source2, yourItem, "[from] move: Thieving Wind", "[of] " + target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 172
  },
  thornedivy: {
    name: "Thorned Ivy",
    shortDesc: "Blocks all damage from the foe's attack and counters strong attacks. May fail if used consecutively.",
    target: "self",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 4,
    flags: {},
    stallingMove: true,
    volatileStatus: "thornedivy",
    onPrepareHit(pokemon) {
      this.attrLastMove("[still]");
      this.add("-anim", pokemon, "Spiky Shield");
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Thorned Ivy");
      },
      onTryHitPriority: 3,
      onTryHit(target, source2, move) {
        if (!move.flags["protect"]) {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id))
            return;
          if (move.isZ || move.isMax)
            target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Thorned Ivy");
        }
        const lockedmove = source2.getVolatile("lockedmove");
        if (lockedmove) {
          if (source2.volatiles["lockedmove"].duration === 2) {
            delete source2.volatiles["lockedmove"];
          }
        }
        if (move.basePower >= 100) {
          this.damage(source2.baseMaxhp / 8, source2, target);
        }
        return this.NOT_FAIL;
      },
      onHit(target, source2, move) {
        if (move.basePower >= 100) {
          this.damage(source2.baseMaxhp / 8, source2, target);
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 168
  },
  thorshammer: {
    name: "Thor's Hammer",
    shortDesc: "The user takes 1/3 of the damage in recoil. 10% chance to paralyze the foe.",
    target: "normal",
    type: "Electric",
    category: "Physical",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunderous Kick", target);
    },
    recoil: [1, 3],
    secondary: {
      chance: 10,
      status: "par"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 98
  },
  thunderdrill: {
    name: "Thunder Drill",
    shortDesc: "A normal attack that always lands critical hits.",
    target: "normal",
    type: "Electric",
    category: "Physical",
    basePower: 70,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Wild Charge", target);
    },
    willCrit: true
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 19
  },
  thunderforce: {
    name: "Thunder Force",
    shortDesc: "10% chance to paralyze the foe.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunderbolt", target);
    },
    secondary: {
      chance: 10,
      status: "par"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 5
  },
  thunderveil: {
    name: "Thunder Veil",
    shortDesc: "Paralyzes and confuses the foe.",
    target: "normal",
    type: "Electric",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 80,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thunder Wave", target);
    },
    status: "par",
    volatileStatus: "confusion"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 104
  },
  thunderclap: {
    name: "Thunderclap",
    shortDesc: "100% chance to make the foe flinch.",
    target: "normal",
    type: "Electric",
    category: "Status",
    basePower: 0,
    pp: 0.625,
    accuracy: true,
    priority: 3,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Fake Out", target);
    },
    secondary: {
      chance: 100,
      volatileStatus: "flinch"
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 223
  },
  thunderlordsscorn: {
    name: "Thunderlord's Scorn",
    shortDesc: "10% chance to paralyze the foe.",
    target: "normal",
    type: "Electric",
    category: "Special",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Zap Cannon", target);
    },
    secondary: {
      chance: 10,
      status: "par"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 5
  },
  tigerrush: {
    name: "Tiger Rush",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 40,
    pp: 18.75,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Quick Attack", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  timescrew: {
    name: "Time Screw",
    shortDesc: "Always hits.",
    target: "normal",
    type: "Warped",
    category: "Physical",
    basePower: 60,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Psychic", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  toxichaze: {
    name: "Toxic Haze",
    shortDesc: "20% chance to harshly poison the foe.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 65,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Smog", target);
    },
    secondary: {
      chance: 20,
      status: "tox"
    }
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 95
  },
  toxicspiral: {
    name: "Toxic Spiral",
    shortDesc: "Harshly lowers the foe's SpDef.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Acid Spray", target);
    },
    boosts: { spd: -2 }
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 77
  },
  trickster: {
    name: "Trickster",
    shortDesc: "A normal attack with increased priority.",
    target: "normal",
    type: "Warped",
    category: "Physical",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 1,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Feint", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  trieffect: {
    name: "Tri-Effect",
    shortDesc: "20% chance to paralyze,blind, or scare the foe.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Tri Attack", target);
    },
    secondary: {
      chance: 20,
      onHit(target, source2) {
        const result = this.random(3);
        if (result === 0) {
          target.trySetStatus("brn", source2);
        } else if (result === 1) {
          target.trySetStatus("par", source2);
        } else {
          target.trySetStatus("frz", source2);
        }
      }
    }
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 96
  },
  tumbleplant: {
    name: "Tumble Plant",
    shortDesc: "Power is higher if the foe's cost is high.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 40,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Grass Knot", target);
    },
    basePowerCallback(pokemon, target, move) {
      switch (target.getWeight()) {
        case 0:
          return 40;
        case 1:
          return 60;
        case 2:
          return 80;
        case 3:
          return 100;
        case 4:
          return 120;
      }
      return 40;
    }
  },
  tuning: {
    name: "Tuning",
    shortDesc: "Raises the user's SpAtk.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Curse", target);
    },
    boosts: { spa: 1 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 9
  },
  twilightinfection: {
    name: "Twilight Infection",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Dark",
    category: "Physical",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Throat Chop", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  twingears: {
    name: "Twin Gears",
    shortDesc: "Hits twice.",
    target: "normal",
    type: "Steel",
    category: "Special",
    basePower: 50,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Gear Grind", target);
    },
    multihit: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 224
  },
  twinthrust: {
    name: "Twin Thrust",
    shortDesc: "Hits twice.",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 50,
    pp: 6.25,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Cross Chop", target);
    },
    multihit: 2
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 224
  },
  twister: {
    name: "Twister",
    shortDesc: "Hits two to five times.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 25,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Twister", target);
    },
    multihit: [2, 5]
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 53
  },
  ultrahightone: {
    name: "Ultra High Tone",
    shortDesc: "10% chance to raise one of the user's stats randomly.",
    target: "normal",
    type: "Sound",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hyper Voice", target);
    },
    self: {
      //chance: 10,
      onHit(target, source2, move) {
        if (this.randomChance(9, 10))
          return;
        const stats = [];
        let stat;
        for (stat in source2.boosts) {
          if (stat === "accuracy" || stat === "evasion")
            continue;
          if (source2.boosts[stat] < 6) {
            stats.push(stat);
          }
        }
        if (stats.length) {
          const randomStat = this.sample(stats);
          const boost = {};
          boost[randomStat] = 1;
          this.boost(boost);
        } else {
          return false;
        }
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 65
  },
  unconsciousmind: {
    //TODO - Find out what is NOT allowed to be picked, if anything
    name: "Unconscious Mind",
    shortDesc: "Can only be used while stopped. Randomly uses another skill.",
    target: "self",
    type: "Void",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sleep Talk", target);
    },
    sleepUsable: true,
    onTry(source2) {
      return source2.status === "stp" || source2.hasAbility("comatose");
    },
    onHit(pokemon) {
      const noSleepTalk = [
        "assist",
        "beakblast",
        "belch",
        "bide",
        "celebrate",
        "chatter",
        "copycat",
        "dynamaxcannon",
        "focuspunch",
        "mefirst",
        "metronome",
        "mimic",
        "mirrormove",
        "naturepower",
        "shelltrap",
        "sketch",
        "sleeptalk",
        "uproar"
      ];
      const moves = [];
      for (const moveSlot of pokemon.moveSlots) {
        const moveid = moveSlot.id;
        if (!moveid)
          continue;
        const move = this.dex.getMove(moveid);
        if (noSleepTalk.includes(moveid) || move.flags["charge"] || move.isZ && move.basePower !== 1 || move.isMax) {
          continue;
        }
        moves.push(moveid);
      }
      let randomMove = "";
      if (moves.length)
        randomMove = this.sample(moves);
      if (!randomMove) {
        return false;
      }
      this.actions.useMove(randomMove, pokemon);
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 151
  },
  understep: {
    name: "Understep",
    shortDesc: "Lowers the foe's Speed.",
    target: "normal",
    type: "Fighting",
    category: "Special",
    basePower: 60,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Force Palm", target);
    },
    boosts: { spe: -1 }
    // Class: BU
    // Effect Chance: 1000
    // Effect ID: 38
  },
  unfetteredsoul: {
    name: "Unfettered Soul",
    shortDesc: "Does double damage if the user is not holding an item.",
    target: "normal",
    type: "Nether",
    category: "Physical",
    basePower: 55,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Poltergeist", target);
    },
    basePowerCallback(pokemon, target, move) {
      if (!pokemon.item)
        return move.basePower * 2;
      return move.basePower;
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 111
  },
  unknownflare: {
    name: "Unknown Flare",
    shortDesc: "30% chance to confuse the foe.",
    target: "normal",
    type: "Illusion",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Shadow Ball", target);
    },
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 17
  },
  unstablehorizon: {
    name: "Unstable Horizon",
    shortDesc: "30% chance to lower the foe's Accuracy.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Earth Power", target);
    },
    secondary: {
      chance: 30,
      boosts: { accuracy: -1 }
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 78
  },
  upbeat: {
    name: "Upbeat",
    shortDesc: "Prevents the foe from using Status Skills for three turns.",
    target: "normal",
    type: "Sound",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Taunt", target);
    },
    volatileStatus: "upbeat",
    condition: {
      duration: 3,
      onStart(target) {
        if (target.activeTurns && !this.queue.willMove(target)) {
          this.effectState.duration++;
        }
        this.add("-start", target, "move: Upbeat");
      },
      onResidualOrder: 15,
      onEnd(target) {
        this.add("-end", target, "move: Upbeat");
      },
      onDisableMove(pokemon) {
        for (const moveSlot of pokemon.moveSlots) {
          const move = this.dex.moves.get(moveSlot.id);
          if (move.category === "Status") {
            pokemon.disableMove(moveSlot.id);
          }
        }
      },
      onBeforeMovePriority: 5,
      onBeforeMove(attacker, defender, move) {
        if (move.category === "Status") {
          this.add("cant", attacker, "move: Upbeat", move);
          return false;
        }
      }
    }
  },
  vacuumrupture: {
    name: "Vacuum Rupture",
    shortDesc: "The user cannot move next turn.",
    target: "normal",
    type: "Fighting",
    category: "Physical",
    basePower: 150,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { recharge: 1, protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Meteor Assault", target);
    },
    self: {
      volatileStatus: "mustrecharge"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 50
  },
  veilofwater: {
    name: "Veil of Water",
    shortDesc: "For 5 turns, the user's side cannot have their stats lowered by the foe's side.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 40,
    pp: 15.625,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Whirlpool", target);
    },
    self: {
      sideCondition: "veilofwater"
    },
    condition: {
      duration: 5,
      onBoost(boost, target, source2, effect) {
        if (effect.effectType === "Move" && effect.infiltrates && !target.isAlly(source2))
          return;
        if (source2 && target !== source2) {
          let showMsg = false;
          let i;
          for (i in boost) {
            if (boost[i] < 0) {
              delete boost[i];
              showMsg = true;
            }
          }
          if (showMsg && !effect.secondaries) {
            this.add("-activate", target, "move: Veil of Water");
          }
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "Veil of Water");
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 4,
      onSideEnd(side) {
        this.add("-sideend", side, "Veil of Water");
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 162
  },
  venomfang: {
    name: "Venom Fang",
    shortDesc: "30% chance to poison the foe.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 80,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Poison Fang", target);
    },
    secondary: {
      chance: 30,
      status: "psn"
    }
    // Class: BU
    // Effect Chance: 300
    // Effect ID: 1
  },
  venomnova: {
    name: "Venom Nova",
    shortDesc: "10% chance to poison the foe.",
    target: "normal",
    type: "Poison",
    category: "Physical",
    basePower: 120,
    pp: 3.125,
    accuracy: 85,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Gunk Shot", target);
    },
    secondary: {
      chance: 10,
      status: "psn"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 1
  },
  venomstrike: {
    name: "Venom Strike",
    shortDesc: "20% chance to poison the foe. Cannot be used when holding an item.",
    target: "normal",
    type: "Poison",
    category: "Special",
    basePower: 120,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Belch", target);
    },
    onTry(source2, target, move) {
      if (source2.item) {
        this.add("-fail", source2);
        return false;
      }
    },
    secondary: {
      chance: 20,
      status: "psn"
    }
    // Class: BU
    // Effect Chance: 200
    // Effect ID: 147
  },
  vigilantwatch: {
    name: "Vigilant Watch",
    shortDesc: "Sees through the foe's stance, preventing them from avoiding the next attack.",
    target: "normal",
    type: "Steel",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Mind Reader", target);
    },
    volatileStatus: "stancebreak"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 221
  },
  voiceoffamine: {
    name: "Voice of Famine",
    shortDesc: "10% chance to weaken the foe.",
    target: "normal",
    type: "Nature",
    category: "Physical",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Power Whip", target);
    },
    secondary: {
      chance: 10,
      status: "weak"
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 94
  },
  volcano: {
    name: "Volcano",
    shortDesc: "Harshly lowers the user's SpAtk.",
    target: "normal",
    type: "Fire",
    category: "Special",
    basePower: 130,
    pp: 3.125,
    accuracy: 90,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Overheat", target);
    },
    self: {
      boosts: { spa: -2 }
    }
    // Class: 2
    // Effect Chance: 1000
    // Effect ID: 56
  },
  volley: {
    name: "Volley",
    shortDesc: "Always hits.",
    target: "normal",
    type: "Void",
    category: "Special",
    basePower: 60,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Swift", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  waltz: {
    name: "Waltz",
    shortDesc: "10% chance to raise one of the user's stats randomly.",
    target: "normal",
    type: "Sound",
    category: "Special",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hyper Voice", target);
    },
    self: {
      //chance: 10,
      onHit(target, source2, move) {
        if (this.randomChance(9, 10))
          return;
        const stats = [];
        let stat;
        for (stat in target.boosts) {
          if (stat === "accuracy" || stat === "evasion")
            continue;
          if (target.boosts[stat] < 6) {
            stats.push(stat);
          }
        }
        if (stats.length) {
          const randomStat = this.sample(stats);
          const boost = {};
          boost[randomStat] = 1;
          this.boost(boost);
        } else {
          return false;
        }
      }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 65
  },
  warpedsign: {
    name: "Warped Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Warped",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  waterball: {
    name: "Water Ball",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 60,
    pp: 18.75,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Waterfall", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  watersign: {
    name: "Water Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Water",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  waterfalldrop: {
    name: "Waterfall Drop",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Water",
    category: "Physical",
    basePower: 100,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Waterfall", target);
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 0
  },
  wavesofearth: {
    name: "Waves of Earth",
    shortDesc: "10% chance to lower the foe's Accuracy.",
    target: "normal",
    type: "Earth",
    category: "Special",
    basePower: 95,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Thousand Waves", target);
    },
    secondary: {
      chance: 10,
      boosts: { accuracy: -1 }
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 78
  },
  weatheraurora: {
    name: "Weather [Aurora]",
    shortDesc: "Changes the weather to Aurora for 5 turns. This strengthens Light attacks and weakens Dark attacks.",
    target: "all",
    type: "Light",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hail", target);
    },
    weather: "aurora"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 153
  },
  weathercalm: {
    name: "Weather [Calm]",
    shortDesc: "Changes the weather to Calm for 5 turns. During Calm, random secondary effects of skills are blocked.",
    target: "all",
    type: "Wind",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Trick Room", target);
    },
    weather: "calm"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 152
  },
  weatherduststorm: {
    name: "Weather [Duststorm]",
    shortDesc: "Changes the weather to Dust Storm for 5 turns. This harms puppets of most types.",
    target: "all",
    type: "Earth",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sandstorm", target);
    },
    weather: "duststorm"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 155
  },
  weatherheavyfog: {
    name: "Weather [Heavy Fog]",
    shortDesc: "Changes the weather to Fog for 5 turns. This strengthens Dark attacks and weakens Light attacks.",
    target: "all",
    type: "Dark",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Rain Dance", target);
    },
    weather: "heavyfog"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 154
  },
  weathersunshower: {
    name: "Weather [Sunshower]",
    shortDesc: "Changes the weather to Sunshower for 5 turns. During Sunshower, FoDef and SpDef are switched.",
    target: "all",
    type: "Warped",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Sunny Day", target);
    },
    weather: "sunshower"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 236
  },
  westerlies: {
    name: "Westerlies",
    shortDesc: "20% chance to raise the user's Speed.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 65,
    pp: 12.5,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Air Cutter", target);
    },
    secondary: {
      chance: 20,
      self: {
        boosts: { spe: 1 }
      }
    }
    // Class: 2
    // Effect Chance: 200
    // Effect ID: 33
  },
  whitelilydance: {
    name: "White Lily Dance",
    shortDesc: "The user faints. The next puppet to come out is restored to full HP and normal status.",
    target: "self",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: true,
    priority: 0,
    flags: { heal: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Lunar Dance", target);
    },
    onTryHit(pokemon, target, move) {
      if (!this.canSwitch(pokemon.side)) {
        delete move.selfdestruct;
        return false;
      }
    },
    selfdestruct: "ifHit",
    slotCondition: "healingwish",
    condition: {
      onSwap(target) {
        if (!target.fainted && (target.hp < target.maxhp || target.status)) {
          target.heal(target.maxhp);
          target.setStatus("");
          this.add("-heal", target, target.getHealth, "[from] move: Healing Wish");
          target.side.removeSlotCondition(target, "healingwish");
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 189
  },
  whitemist: {
    name: "White Mist",
    shortDesc: "Drastically raises the user's SpAtk.",
    target: "self",
    type: "Nature",
    category: "Status",
    basePower: 0,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Tail Glow", target);
    },
    boosts: { spa: 3 }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 69
  },
  wholebeing: {
    name: "Whole Being",
    shortDesc: "Bypasses half of the foe's FoDef, but the user faints.",
    target: "normal",
    type: "Void",
    category: "Physical",
    basePower: 125,
    pp: 3.125,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Explosion", target);
    },
    onTryHit(source2, target, move) {
      target.addVolatile("wholebeing");
    },
    onHit(target, source2, move) {
      target.removeVolatile("wholebeing");
      source2.faint();
    },
    condition: {
      duration: 1,
      onModifyDef(relayVar, target, source2, move) {
        this.chainModify(0.5);
      }
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 88
  },
  willowisp: {
    name: "Will-o'-Wisp",
    shortDesc: "Burns and blinds the foe.",
    target: "normal",
    type: "Fire",
    category: "Status",
    basePower: 0,
    pp: 6.25,
    accuracy: 85,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Will-o-Wisp", target);
    },
    status: "darkbrn"
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 102
  },
  windgodsgrace: {
    name: "Wind God's Grace",
    shortDesc: "For five turns, the user's party's Speed is doubled. Six turns during Calm weather.",
    target: "allySide",
    type: "Wind",
    category: "Status",
    basePower: 0,
    pp: 18.75,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Tailwind", target);
    },
    sideCondition: "windgodsgrace",
    condition: {
      duration: 4,
      durationCallback(target, source2, effect) {
        if (this.field.isWeather("calm")) {
          return 6;
        }
        return 4;
      },
      onSideStart(side) {
        this.add("-sidestart", side, "move: Wind God's Grace");
      },
      onModifySpe(spe, pokemon) {
        return this.chainModify(2);
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 5,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Wind God's Grace");
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 175
  },
  windjavelin: {
    name: "Wind Javelin",
    shortDesc: "10% chance to make the foe flinch.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 80,
    pp: 9.375,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, contact: 1, javelin: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Drill Peck", target);
    },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    }
    // Class: BU
    // Effect Chance: 100
    // Effect ID: 18
  },
  windsign: {
    name: "Wind Sign",
    shortDesc: "A normal attack. A puppet can only know one sign skill at a time.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 60,
    pp: 6.25,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1, sign: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Hidden Power", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  windtrain: {
    name: "Wind Train",
    shortDesc: "Always hits.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 60,
    pp: 12.5,
    accuracy: true,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Drill Peck", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  windwave: {
    name: "Wind Wave",
    shortDesc: "30% chance to make the foe flinch.",
    target: "normal",
    type: "Wind",
    category: "Special",
    basePower: 75,
    pp: 9.375,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Air Slash", target);
    },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    }
    // Class: 2
    // Effect Chance: 300
    // Effect ID: 18
  },
  wintrywind: {
    name: "Wintry Wind",
    shortDesc: "A normal attack that lands critical hits often.",
    target: "normal",
    type: "Wind",
    category: "Physical",
    basePower: 55,
    pp: 12.5,
    accuracy: 95,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Air Cutter", target);
    },
    critRatio: 2
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 19
  },
  wordbreak: {
    name: "Word Break",
    shortDesc: "Seals two of the foe's skills for four turns.",
    target: "normal",
    type: "Illusion",
    category: "Status",
    basePower: 0,
    pp: 3.125,
    accuracy: true,
    priority: 0,
    flags: {},
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Disable", target);
    },
    volatileStatus: "wordbreak",
    condition: {
      duration: 5,
      noCopy: true,
      // doesn't get copied by Baton Pass
      onStart(pokemon, source2, effect) {
        let lockableMoves = [];
        for (const moveSlot of pokemon.moveSlots) {
          if (moveSlot.pp) {
            lockableMoves.push(moveSlot.id);
          }
        }
        let lockedMoves = [];
        lockedMoves.push(this.sample(lockableMoves));
        lockedMoves.push(this.sample(lockableMoves.filter((move) => move !== lockedMoves[0])));
        if (effect.effectType === "Ability") {
          this.add("-start", pokemon, "Word Break", lockedMoves.join(", "), "[from] ability: " + effect.name, "[of] " + source2);
        } else {
          this.add("-start", pokemon, "Word Break", lockedMoves.join(", "));
        }
        this.effectState.moves = lockedMoves;
      },
      onResidualOrder: 17,
      onEnd(pokemon) {
        this.add("-end", pokemon, "Word Break");
      },
      onBeforeMovePriority: 7,
      onBeforeMove(attacker, defender, move) {
        if (this.effectState.moves.includes(move.id)) {
          this.add("cant", attacker, "Word Break", move);
          return false;
        }
      },
      onDisableMove(pokemon) {
        for (const moveSlot of pokemon.moveSlots) {
          if (this.effectState.moves.includes(moveSlot.id)) {
            pokemon.disableMove(moveSlot.id);
          }
        }
      }
    }
    // Class: EN
    // Effect Chance: 100
    // Effect ID: 225
  },
  yangenergy: {
    name: "Yang Energy",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Dream",
    category: "Special",
    basePower: 55,
    pp: 21.875,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Simple Beam", target);
    }
    // Class: 2
    // Effect Chance: 100
    // Effect ID: 0
  },
  yinenergy: {
    name: "Yin Energy",
    shortDesc: "A normal attack.",
    target: "normal",
    type: "Dream",
    category: "Physical",
    basePower: 55,
    pp: 21.875,
    accuracy: 100,
    priority: 0,
    flags: { protect: 1 },
    onPrepareHit: function(target, source2, move) {
      this.attrLastMove("[still]");
      this.add("-anim", source2, "Tackle", target);
    }
  }
};
//# sourceMappingURL=moves.js.map
