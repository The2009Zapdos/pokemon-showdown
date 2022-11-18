export const Moves: {[moveid: string]: MoveData} = {
  blueshell: {
		num: 9001,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Blue Shell",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
   	onModifyMove(move, source, target) {
      	const userSide = source.side.pokemon.filter(ally => ally === source || !ally.fainted && !ally.status);
      	const targetSide = target.side.pokemon.filter(ally => ally === target || !ally.fainted && !ally.status);
			if (userSide.length < targetSide.length) {move.basePower = 140;}
      	else {move.basePower = 70;}
    	},
		secondary: null,
		target: "allAdjacent",
		type: "Rock",
		zMove: {basePower: 140},
		maxMove: {basePower: 140},
		contestType: "Tough",
	},

	doubledab: {
		num: 9002,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Bonemerang",
		pp: 1,
		noPPBoosts: true,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1, punch: 1},
		multihit: 2,
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fighting",
		maxMove: {basePower: 130},
		contestType: "Tough",
	},

	exobash: {
		num: 9003,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let power = Math.floor(25 * target.getStat('def') / pokemon.getStat('def')) + 1;
			if (!isFinite(power)) power = 1;
			if (power > 150) power = 150;
			this.debug(`${power} bp`);
			return power;
		},
		category: "Physical",
		name: "Exo Bash",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	
	extremebeam: {
		num: 9004,
		accuracy: 99,
		basePower: 250,
		category: "Special",
		desc: "If this move is successful, the user begins to Bide.",
		shortDesc: "User Bides. Priority -6.",
		name: "EXTREME BEAM",
		pp: 5,
		priority: -6,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Photon Geyser", target);
		},
		self: {
			volatileStatus: 'bide',
		},
		condition: {
			duration: 2,
			onLockMove: 'bide',
		},		
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},	

	gelatinize: {
		num: 9005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gelatinize",
		pp: 10,
		priority: 1,
		flags: {snatch: 1},
		onTryHit(target) {
			if (target.getAbility().isPermanent || target.ability === 'magicbounce' || target.ability === 'truant') {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('magicbounce');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Magic Bounce', '[from] move: Gelatinize');
				return;
			}
			return false;
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	
	incense: {
		num: 9008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Incense",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'incense',
		condition: {
			duration: 5,
			onTakeItem(item, pokemon, source) {
				if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
					this.add('-message', "The Incense kept ", source.name, " alert enough to block the attempt!");
					return false;
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Incense');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-sideend', side, 'Incense');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Grass",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	
	hyperwind: {
		num: 9009,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		shortDesc: "Clears the opponents hazards.",
		inherit: true,
		isNonstandard: null,
		gen: 8,
		shortDesc: "The user clears hazards from the opponents side.",
		name: "Razor Wind",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onHit(target, source) {
			if (!target.volatiles['substitute'] || move.infiltrates);
			const removeTarget = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeTarget.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Razor Wind', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	
	impostorblade: {
		num: 9010,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Impostor Blade",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				this.add('-message', "I dunno... ", pokemon.name, "'s been acting pretty sus lately...");
				target.formeChange('Impsaustor', this.effect, true);
				const oldAbility = target.setAbility('Vent');
				if (oldAbility) {
					this.add('-ability', target, 'Vent', '[from] move: Impostor Blade', '[silent]');
					target.volatileStaleness = 'external';
					return;
				}
				this.add('-message', target + " was the Impsaustor!");
				this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
				const species = this.dex.getSpecies(target.species.name);
				const abilities = species.abilities;
				const baseStats = species.baseStats;
				const type = species.types[0];
				if (species.types[1]) {
					const type2 = species.types[1];
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				}
				this.add('-start', target, 'typechange', target.species.types.join('/'), '[silent]');
			}
			else if (this.dex.getSpecies(pokemon.species.name) !== 'Impsaustor') {
				this.damage(pokemon.baseMaxhp / 16, pokemon, pokemon);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	
	inkbrush: {
		num: 9011,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Inkbrush",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, punch: 1},
		multihit: 4,
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Fighting",
		maxMove: {basePower: 130},
		contestType: "Tough",
	},
	
	kamikaze: {
		num: 9012,
		accuracy: 50,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(target.maxHP / 2, 1);
		},
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('High Jump Kick'));
		},
		category: "Physical",
		name: "Kamikaze",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1},
		hasCrashDamage: true,
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	
	onetrillionarrows: {
		num: 9013,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "One Trillion Arrows",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onEffectiveness(typeMod, target, type, move) {
			target.addVolatile('arrowed');
			move.ignoreImmunity = true;
			return 0; // literally all three of these lines should do the same thing but i am NOT taking my chances
		},
		volatileStatus: 'arrowed',
		condition: {
			onEnd(pokemon) {
				onTryHit(target, source, move) {
					move.ignoreImmunity = true;
					return 0;
				}
				delete pokemon.volatiles['arrowed'];
				this.add('-end', pokemon, 'arrowed');
			}
		}
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		zMove: {basePower: 180},
		contestType: "Beautiful",
	},	
		
	outburst: {
		num: 9014,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Outburst",
		pp: 8,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		onTryHit(target) {
			if (target.getAbility().isPermanent || target.ability === 'lightningrod') {
				return false;
			},
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('lightningrod');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Lightning Rod', '[from] move: Outburst');
				return;
			},
			return false;
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	
	// test this one especially
	pharaohshot: {
		num: 9015,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Pharaoh Shot",
		pp: 15,
		priority: -3,
		flags: {contact: 1, protect: 1, punch: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('pharaohshot');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['pharaohshot'] && pokemon.volatiles['pharaohshot'].lostFocus) {
				this.add('cant', pokemon, 'Pharaoh Shot', 'Pharaoh Shot');
				return true;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Pharaoh Shot');
			},
			onHit(pokemon, source, move) {
				if (move.flags['contact']) {
					this.useMove("Pharaoh Shot", pokemon);
					this.useMove("Pharaoh Shot", pokemon);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	
	polarpounce: {
		num: 9016,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Polar Pounce",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		weather: 'hail',
		secondary: null,
		target: "all",
		type: "Ice",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	
	remotemine: {
		num: 9017,
		accuracy: 100,
		basePower: 130,
		onBeforeMovePriority: 6,
		onTryMove(pokemon, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? source.getMoveData(move.id) : pokemon.getMoveData(callerMoveId);
			if (!moveSlot || (moveSlot.pp % 2 = 0)) return false;
			return true;
		},
		category: "Special",
		name: "Remote Mine",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	
	stupidcannon: {
		num: 9020,
		accuracy: 100,
		basePower: 0,
		damage: 5,
		category: "Special",
		shortDesc: "For your own sake, please don't use this.",
		name: "Stupid Cannon",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Bulk Up", target);
		    this.add('-anim', source, "Dragon Dance", target);
		    this.add('-anim', source, "Dragon Dance", target);
		    this.add('-anim', source, "Dragon Dance", target);
		    this.add('-anim', source, "Charge", target);
		    this.add('-anim', source, "Extreme Evoboost", target);
		    this.add('-anim', source, "Luster Purge", target);
		    this.add('-anim', source, "Hyper Beam", target);
		    this.add('-anim', source, "Draco Meteor", target);
		    this.add('-anim', source, "Doom Desire", target);
		    this.add('-anim', source, "Clangorous Soulblaze", target);
		},
		secondary: null,
		multihit: 23,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},

	shadowscratch: {
		num: 9019,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Shadow Scratch",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 4 <= target.maxhp * 3) {return this.chainModify(1.5);}
			else if (target.hp * 2 <= target.maxhp) {return this.chainModify(2);}
			else if (target.hp * 4 <= target.maxhp) {return this.chainModify(3);}
			else if (target.hp * 10 <= target.maxhp) {return this.chainModify(10);}
			else {return this.chainModify(1);}
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},

	healorder: {
		num: 456,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Heal Order",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	
	milkdrink: {
		num: 208,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Milk Drink",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	
	recover: {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Recover",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	
	roost: {
		num: 355,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Roost",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		self: {
			volatileStatus: 'roost',
		},
		condition: {
			duration: 1,
			onResidualOrder: 20,
			onStart(target) {
				this.add('-singleturn', target, 'move: Roost');
			},
			onTypePriority: -1,
			onType(types, pokemon) {
				this.effectData.typeWas = types;
				return types.filter(type => type !== 'Flying');
			},
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	
	slackoff: {
		num: 303,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Slack Off",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	
	softboiled: {
		num: 135,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Soft-Boiled",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	
	synthesis: {
		num: 235,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Synthesis",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	
	moonlight: {
		num: 236,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Moonlight",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	
	morningsun: {
		num: 234,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Morning Sun",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	
	shoreup: {
		num: 659,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shore Up",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('sandstorm')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Ground",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	
	rest: {
		num: 156,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rest",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryMove(pokemon) {
			if (pokemon.hp === pokemon.maxhp) {
				this.add('-fail', pokemon, 'heal');
				return null;
			}
			if (pokemon.status === 'slp' || pokemon.hasAbility('comatose')) {
				this.add('-fail', pokemon);
				return null;
			}
		},
		onHit(target, source, move) {
			if (!target.setStatus('slp', source, move)) return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	
	chillyreception: {
		num: 881,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Chilly Reception",
		pp: 10,
		priority: 0,
		flags: {},
		onTry(source) {
			return !!this.canSwitch(source.side);
		},
		selfSwitch: true,
		weather: 'snow',
		secondary: null,
		target: "all",
		type: "Ice",
	},
	
	gigatonhammer: {
		num: 893,
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Gigaton Hammer",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		// Move disabling implemented in Battle#nextTurn in sim/battle.ts
		onTry(source) {
			source.addVolatile('gigatonhammer');
		},
		condition: {
			duration: 2,
			onBeforeMove(pokemon, target, move) {
				if (move.id === 'gigatonhammer') {
					this.add('cant', pokemon, 'move: Gigaton Hammer', move);
					pokemon.removeVolatile('gigatonhammer');
					return false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	
	wavecrash: {
		num: 834,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Wave Crash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Water",
	},
	
	chloroblast: {
		num: 835,
		accuracy: 95,
		basePower: 150,
		category: "Special",
		name: "Chloroblast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	
	luminacrash: {
		num: 855,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Lumina Crash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		target: "normal",
		type: "Psychic",
	},
		
	lunarblessing: {
		num: 849,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lunar Blessing",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		type: "Psychic",
	},
	
	glaiverush: {
		num: 862,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Glaive Rush",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'glaiverush',
		},
		onAfterHit(source, target, move) {
			if (!target.hp) {
				if (source.volatiles['glaiverush']) {
					delete source.volatiles['glaiverush'];
					source.addVolatile('glaiverush');
				}
			}
		},
		condition: {
			noCopy: true,
			duration: 2,
			onAccuracy(accuracy) {
				if (this.effectState.duration === 2) return accuracy;
				return true;
			},
			onSourceModifyDamage() {
				if (this.effectState.duration === 2) return;
				return this.chainModify(2);
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	
	ceaselessedge: {
		num: 845,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Ceaseless Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		// critRatio: 2,
		secondary: {
			chance: 100,
			onHit(target) {
				target.side.addSideCondition('spikes');
			},
		},
		target: "normal",
		type: "Dark",
	},
		
	stoneaxe: {
		num: 830,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		// critRatio: 2,
		secondary: {
			chance: 100,
			onHit(target) {
				target.side.addSideCondition('stealthrock');
			},
		},
		target: "normal",
		type: "Rock",
	},
	
	jetpunch: {
		num: 857,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Jet Punch",
		pp: 15,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	
	// haha i have stolen hematite's code AND HE MAY NEVER KNOW!!
	direclaw: {
		shortDesc: "50% to paralyze, poison, or sleep target. High crit ratio.",
		num: 10011,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dire Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		critRatio: 2,
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
					if ((target) && source.ability === "unstableclaws") {this.add('-start', target, 'typechange', 'Poison');}
				} else if (result === 1) {
					target.trySetStatus('par', source);
					if ((target) && source.ability === "unstableclaws") {this.add('-start', target, 'typechange', 'Electric');}
				} else {
					target.trySetStatus('slp', source);
					if ((target) && source.ability === "unstableclaws") {this.add('-start', target, 'typechange', 'Psychic');}
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	
	shedtail: {
		num: 880,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shed Tail",
		pp: 10,
		priority: 0,
		flags: {},
		volatileStatus: 'substitute',
		onTryHit(target) {
			if (target.volatiles['substitute']) {
				this.add('-fail', target, 'move: Shed Tail');
				return null;
			}
			if (target.hp <= target.maxhp / 2 || target.maxhp === 1) { // Shedinja clause
				this.add('-fail', target, 'move: Shed Tail', '[weak]');
				return null;
			}
		},
		onHit(target) {
			if (!this.canSwitch(target.side)) {
				this.attrLastMove('[still]');
				this.add('-fail', target);
				return this.NOT_FAIL;
			}
			this.directDamage(target.maxhp / 2);
		},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true;
			},
		},
		selfSwitch: 'shedtail',
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
	},
	
	infernalparade: {
		num: 844,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Infernal Parade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
	},
	
	makeitrain: {
		num: 874,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Make It Rain",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Steel",
		contestType: "Beautiful",
	},
};
