export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	obtrusive: {
		shortDesc: "Stops the Roulette Wheel while the user is active.",
		onAnyTryMove(target, source, effect) {
			if (['roulettespin'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Obtrusive', effect, '[of] ' + target);
				return false;
			}
		},
		name: "Obtrusive",
		rating: 1,
		num: 9001,
	},
	
	hostabsorb: {
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
				volatileStatus: 'leechseed',
				ability: this.dex.getAbility('hostabsorb'),
			});
		},
		name: "Host Absorb",
		shortDesc: "Contact moves - 100% chance to Leech Seed.",
		rating: 2,
		num: 9002,
	},
	
	poweroutage: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: -1});
			}
		},
		name: "Power Outage",
		shortDesc: "Lowers Speed by 1 each turn.",
		rating: 4.5,
		num: 9003,
	},	
	
	blazingspirit: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Blazing Spirit', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Vital Spirit');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Vital Spirit');
			}
			return false;
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		name: "Blazing Spirit",
		shortDesc: "Combines Vital Spirit, Intimidate, and Magic Guard.",
		rating: 3.5,
		num: 9004,
	},	
	
	stickystarch: {
		onAnyTryMove(target, source, effect) {
			if (['teleport', 'chillyreception', 'voltswitch', 'uturn', 'flipturn', 'batonpass'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Sticky Starch', effect, '[of] ' + target);
				return false;
			}
		},
		name: "Sticky Starch",
		shortDesc: "Blocks and traps opponents when they use pivoting moves.",
		rating: 1,
		num: 9005,
	},	

	update: {
		onStart(pokemon) {
			this.add('-message', pokemon.name + " is currently holding a " + pokemon.item + "!", '[identify]');	
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water' && target.hasItem('splashplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Fire' && target.hasItem('flameplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Grass' && target.hasItem('meadowplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Electric' && target.hasItem('zapplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Bug' && target.hasItem('insectplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Flying' && target.hasItem('skyplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Rock' && target.hasItem('stoneplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Ground' && target.hasItem('earthplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Fighting' && target.hasItem('fistplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Psychic' && target.hasItem('mindplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Poison' && target.hasItem('toxicplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Ghost' && target.hasItem('spookyplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Ice' && target.hasItem('icicleplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Dragon' && target.hasItem('dracoplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Steel' && target.hasItem('ironplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Dark' && target.hasItem('dreadplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
			else if (target !== source && move.type === 'Fairy' && target.hasItem('pixieplate') && target.getMoveHitData(move).typeMod <= 0) {
				this.add('-immune', target, '[from] ability: Update');
				return null;
			}
		},
		name: "Update",
		shortDesc: "Grants the user an immunity depending on held plate; cannot bypass weaknesses.",
		rating: 3.5,
		num: 9006,
	},

	// double check later
	magicabsorb: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source && move.type !== 'Flying') {
				this.add('-immune', target, '[from] ability: Magic Absorb');	
				this.heal(target.baseMaxhp);
				return null;
			}
		},
		name: "Magic Absorb",
		shortDesc: "Blocks non-Flying status moves, heals the user for 25%.",
		rating: 5,
		num: 9007,
	},
	
	unstableclaws: {
		// implemented in moves.ts - it'd be far easier on me to just code this directly into the move dire claws instead
		name: "Unstable Claws",
		shortDesc: "If user's Dire Claws inflicts a status, changes type to match.",
		rating: 2,
		num: 9008,
	},	
	
	// expect errors
	drawfour: {
		shortDesc: "After knocking out target, if user knows less than 12 moves, it learns target's moves.",
		onSourceAfterFaint(length, target, source, effect) {
			for (const moveSlot of target.moveSlots) {
				if (moveSlot === null) return;
				if (source.moveSlots.length < 12) {
					this.attrLastMove('[still]');
					if (source.moveSlots.length < 0) return false;
					const learnedMove = {
						move: target.moveSlots.name,
						id: target.moveSlots.id,
						pp: target.moveSlots.pp,
						maxpp: target.moveSlots.pp,
						target: target.moveSlots.target,
						disabled: false,
						used: false,
					};	
					source.moveSlots[source.moveSlots.length] = learnedMove;
					source.baseMoveSlots[source.moveSlots.length - 1] = learnedMove;
				}
			}
			this.add('-message', source.name + " copied its victim's moves!");
		},
		name: "Draw Four",
		shortDesc: "After knocking out target, if user knows less than 12 moves, it learns target's moves.",
		rating: 3,
		num: 9009,
	},
	
	conduction: {
		onAfterMoveSecondary(target, source, move) {
			if (source.species.id === 'gelsius' && source.hp && !source.transformed && source.side.foe.pokemonLeft && move.type === 'Ice') {
				this.add('-message', source.name + " is beginning to rapidly cool!");
				source.formeChange('Gelsius-Subzero', this.effect, true);
				this.add('-message', source.name + " transformed!");
			}
			else if (source.species.id === 'gelsius' && source.hp && !source.transformed && source.side.foe.pokemonLeft && move.type === 'Fire') {
				this.add('-message', source.name + " is beginning to rapidly heat up!");
				source.formeChange('Gelsius-Thousand', this.effect, true);
				this.add('-message', source.name + " transformed!");
			}
		},
		name: "Conduction",
		shortDesc: "If the user uses Ice or Fire move, transforms. Only works once.",
		rating: 2,
		num: 9010,
	},	

	respawnpunisher: {
		onAnyFaintPriority: 1,
		onAnyFaint() {
			delete this.effectData.target.volatiles['respawnpunisher'];
			this.effectData.target.addVolatile('respawnpunisher');
		},
		onBeforeSwitchOut(pokemon) {
			delete pokemon.volatiles['respawnpunisher'];
			pokemon.addVolatile('respawnpunisher');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['respawnpunisher'];
			this.add('-end', pokemon, 'Respawn Punisher', '[silent]');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.boost({atk: 1}, pokemon);
			},
			onEnd(pokemon) {
				delete pokemon.volatiles['respawnpunisher'];
				this.boost({atk: -1}, pokemon);
			},			
		},
		name: "Respawn Punisher",
		shortDesc: "If an enemy switches or faints, raises Atk by 1 for one turn.",
		rating: 3.5,
		num: 9011,
	},
	
	vent: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 10 && target.hp + damage > target.maxhp / 10) {
				this.add('-message', target.name + " is gonna Vent!");
				target.switchFlag = true;
				this.heal(target.baseMaxhp);
			}
		},
		name: "Vent",
		shortDesc: "Switches and fully heals the user if hit below 10%.",
		rating: 5,
		num: 10000,
	},

	supremeoverlord: {
		onModifyAtk(atk, source, target, move) {
			const faintedAllies = source.side.pokemon.filter(ally => ally.fainted).length;
			if (faintedAllies < 1) return;
			this.debug(`Supreme Overlord atk boost for ${faintedAllies} defeated allies.`);
			// Placeholder 1.1 -> 1.5
			return this.chainModify(1 + (0.1 * faintedAllies));
		},
		onModifySpA(spa, source, target, move) {
			const faintedAllies = source.side.pokemon.filter(ally => ally.fainted).length;
			if (faintedAllies < 1) return;
			this.debug(`Supreme Overlord spa boost for ${faintedAllies} defeated allies.`);
			// Placeholder 1.1 -> 1.5
			return this.chainModify(1 + (0.1 * faintedAllies));
		},
		name: "Supreme Overlord",
		rating: 2.5,
		num: 293,
	},
	
	angershell: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				target.abilityState.checkedAngerShell = false;
			} else {
				target.abilityState.checkedAngerShell = true;
			}
		},
		onTryEatItem(item, pokemon) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return pokemon.abilityState.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			target.abilityState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1, spe: 1, def: -1, spd: -1});
			}
		},
		name: "Anger Shell",
		rating: 2,
		num: 271,
	},
	
	electromorphosis: {
		onDamagingHit(damage, target, source, move) {
			this.add('-activate', target, 'ability: Electromorphosis', '[move] ' + move.name);
			target.addVolatile('charge');
		},
		name: "Electromorphosis",
		rating: 3,
		num: 280,
	},
	
	goodasgold: {
		onTryHit(target, source, move) {
			if (move.category !== 'Status' || target === source) {
				return;
			}
			this.add('-ability', target, 'Good as Gold');
			return null;
		},
		name: "Good as Gold",
		rating: 2,
		num: 283,
	},
	
	eartheater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
			}
		},
		name: "Earth Eater",
		rating: 3,
		num: 297,
	},
	
	wellbakedbody: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
		name: "Well-Baked Body",
		rating: 2,
		num: 273,
	},
	
	purifyingsalt: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Purifying Salt');
			}
			return false;
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		isBreakable: true, // TODO verify the assumption that this can be supprsed by Mold Breaker & friends
		name: "Purifying Salt",
		rating: 2,
		num: 272,
	},
	
	swordofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Sword of Ruin');
		},
		onAnyModifyDef(def, source, target, move) {
			if (this.effectState.target === source) return;
			this.debug('Sword of Ruin Def drop');
			// TODO Placeholder
			return this.chainModify(0.75);
		},
		name: "Sword of Ruin",
		rating: 3,
		num: 285,
	},
};
