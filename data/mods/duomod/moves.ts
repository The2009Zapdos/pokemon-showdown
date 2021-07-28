/*

List of flags and their descriptions:

authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability.
bullet: Has no effect on Pokemon with the Bulletproof Ability.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Magic Bounce Ability.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Soundproof Ability.

*/

export const Moves: {[moveid: string]: MoveData} = {
	reductivebash: {
		num: 1000.1,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(source, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? source.getMoveData(move.id) : source.getMoveData(callerMoveId);
			if (!moveSlot) return 120;
			switch (moveSlot.pp) {
			case 0:
				return 15;
			case 1:
				return 30;
			case 2:
				return 45;
			case 3:
				return 60;
			case 4:
				return 75;
			case 5:
				return 90;
			case 6:
				return 105;
      default:
				return 120;
			}
		},
		category: "Physical",
		desc: "The power of this move is based on the amount of PP remaining after normal PP reduction and the Pressure Ability resolve. 200 power for 0 PP, 80 power for 1 PP, 60 power for 2 PP, 50 power for 3 PP, and 40 power for 4 or more PP.",
		shortDesc: "More power the fewer PP this move has left.",
		name: "Reductive Bash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Tough",
	},
	dewyflowers: {
		num: 1001.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the user's side every turn, entry hazard.",
		name: "Dewy Flowers",
		pp: 20,
		priority: 0,
		flags: {},
		sideCondition: 'Dewy Flowers',
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'Dewy Flowers');
			},
			onResidualOrder: 6,
			onWeather(target, source, effect) {
				if (!target.isGrounded()) return;
				if (target.hasItem('heavydutyboots')) return;
				this.heal(target.baseMaxhp / 16);
			},
		},
		secondary: null,
		target: "allySide",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	},
	heatedblade: {
		num: 1002.1,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "User's Steel-type becomes Fire.",
		name: "Heated Blade",
		pp:  15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1, contact: 1},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Steel" ? "Fire" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Burn Up');
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	cleansingwaters: {
		num: 1003.1,
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 1.5;
			return move.basePower;
		},
 		onHit(target) {
			if (target.status) target.cureStatus();
		},
		category: "Special",
		shortDesc: "Power boosted by 1.5x if the target has a status ailment; heals status ailment.",
		name: "Cleansing Waters",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	stormcloud: {
		num: 1004.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "If it's raining, places Stormcloud on foe's side.",
		name: "Stormcloud",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'stormcloud',
		condition: {
			duration: 5,
      onWeather(target, source, effect) {
			if (effect.id === 'raindance') {
  			if (target.hasType('Ground') || target.hasType('Electric')) return;
				this.damage(target.baseMaxhp / 10, target, target);
		}},
			onStart(side) {
				this.add('-sidestart', side, 'Stormcloud');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 3,
			onEnd(side) {
				this.add('-sideend', side, 'Stormcloud');
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Electric",
		zMove: {effect: 'heal'},
		contestType: "Beautiful",
	},
	pitfall: {
		num: 2004,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(1);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 12}, pokemon, pokemon, move);
		},
		category: "Physical",
		shortDesc: "Does 1 damage, maximizes user's Attack if target faints.",
		name: "Pitfall",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	hyperspeed: {
		num: 1009.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Speed by 3 stages.",
		shortDesc: "Raises the user's Speed by 3.",
		name: "Hyperspeed",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 3,
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	dragoncrash: {
		num: 3001,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		name: "Flare Blitz",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	destructiveblow: {
		num: 1008.1,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		shortDesc: "If the target faints, the user faints.",
		name: "Destructive Blow",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.damage(pokemon.baseMaxhp, pokemon, pokemon, move);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	vibrantlight: {
		num: 2008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Next turn, 25% of the user's max HP and all statuses are restored.",
		name: "Vibrant Light",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		slotCondition: 'Vibrant Light',
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectData.hp = source.maxhp / 4;
				pokemon.cureStatus();
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectData.hp, target, target);
					if (damage) this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectData.source.name);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Cute",
	},
	nibbleaway: {
		num: 3002,
		accuracy: true,
		basePower: 0,
		category: "Physical",
		shortDesc: "Removes Dewy Flowers from opponent's side.",
		name: "Defog",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, authentic: 1},
		onHit(target, source, move) {
			let success = false;
			const removeTarget = [
				'dewyflowers',
			];
			const removeAll = [
				'dewyflowers',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Nibble Away', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Nibble Away', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	injection: {
		num: 1021.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The target transforms into the user. The target's current stats, stat stages, types, moves, Ability, weight, gender, and sprite are copied. The user's level and HP remain the same and each copied move receives only 5 PP, with a maximum of 5 PP each. This move fails if it hits a substitute, if either the user or the target is already transformed, or if either is behind an Illusion.",
		shortDesc: "Target copies user's stats, moves, types, and Ability.",
		name: "Injection",
		pp: 5,
		priority: -6,
		flags: {mystery: 1},
		onHit(target, pokemon) {
			if (!target.transformInto(pokemon)) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {effect: 'heal'},
		contestType: "Clever",
	},
};
