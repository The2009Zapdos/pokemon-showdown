export const Moves: {[moveid: string]: ModdedMoveData} = {
	stupidcannon: {
		num: 3010,
		accuracy: 100,
		basePower: 0,
		damage: 5,
		category: "Special",
		shortDesc: "For your own sake, please don't use this.",
		name: "Stupid Cannon",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: null,
		multihit: 22,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	watershield: {
		num: 3011,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "The user gains armor that punishes contact.",
		name: "Water Shield",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'watershield',
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'Water Shield');
				this.effectData.layers = 8;
			},
			onDamagingHitOrder: 1,
			onDamagingHit(damage, target, source, move) {
				if (move.flags['contact']) {
					this.damage(source.baseMaxhp / 16, source, target);
					this.effectData.layers--;
				}
				if (this.effectData.layers === 0) {
					const side = target.side;
					this.add('-sideend', side, 'Water Shield');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},		
	skitterout: {
		num: 3008,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "The user switches the target out, then switches out.",
		name: "Skitter Out",
		pp: 1,
		noPPBoosts: true,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		forceSwitch: true,
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cute",
	},
	striketheearth: {
		num: 3009,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Power doubles if used last turn.",
		name: "Strike the Earth",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},

		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Cool", 
	},

	dedefog: {
		num: 3008,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Prevents the target from using Spinning Web or Defog.",
		shortDesc: "Target can't remove hazards.",
		name: "De-Defog",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'dedefog',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Dedefog');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (moveSlot.id === 'defog' || moveSlot.id === 'spinningweb') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
				
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	dundaboat: {
		num: 3001,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Paralyzes target or user; can't use if statused.",
		name: "Dundaboat",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry(pokemon) {
			if (pokemon.status) {
				return null;
			}
		},
		onHit(target, source, move) {
			const result = this.random(2);
			if (result === 0) {
				target.trySetStatus('par', source);
			}
			else {
				if (source.hasType('Electric')) {
					source.setType(source.getTypes(true).map(type => type === "Electric" ? "???" : type));
					this.add('-start', source, 'typechange', source.types.join('/'), '[from] move: Dundaboat');
				}
				source.trySetStatus('par', source);
			}
			},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	neutralair: {
		num: 3005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, abilities become nullified.",
		name: "Neutral Air",
		pp: 5,
		priority: 0,
		flags: {},
		pseudoWeather: 'neutralair',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('floatstone')) {
					return 8;
				}
				return 5;
			},
			onStart(side, source) {
				this.add('-fieldstart', 'move: Neutral Air', '[of] ' + source);
				for (const target of this.getAllActive()) {
					this.add('-endability', target);
					this.singleEvent('End', target.getAbility(), target.abilityData, target, target, 'neutral air');
				}
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('neutralair');
			},
			onResidualOrder: 24,
			onEnd() {
				this.add('-fieldend', 'move: Neutral Air');
			},
		},
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	roulettespin: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Activates the Roulette Wheel an additional time.",
		name: "Roulette Spin",
		pp: 40,
		priority: 0,
		flags: {},
		onHit(source) {
		var result: number;
		var pickSide: number;
		this.hint("Let's spin the Wheel!");
		result = this.random(40);
	        pickSide = this.random(2);
		if (result === 0) {
			this.hint("Roulette Wheel Result: 1");
	            for (const pokemon of this.getAllActive()) {
	                this.heal(pokemon.maxhp, pokemon);
	                pokemon.cureStatus();
	            }
	        } 
	        else if (result === 1) {
			this.hint("Roulette Wheel Result: 2");
	            for (const pokemon of this.getAllActive()) {
	                let statName = 'atk';
	                let bestStat = 0;
	                let s: StatNameExceptHP;
	                for (s in pokemon.storedStats) {
	                    if (pokemon.storedStats[s] > bestStat) {
	                        statName = s;
	                        bestStat = pokemon.storedStats[s];
	                    }
	                }
	                this.boost({[statName]: 3}, pokemon);
	            }
	        } 

	        else if (result === 2) {
			this.hint("Roulette Wheel Result: 3");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
				}
				}
			}
	        } 
	        else if (result === 3) {
			this.hint("Roulette Wheel Result: 4");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.directDamage(target.hp - 1, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.directDamage(target.hp - 1, target);
				}
				}
			}
	        }
	        else if (result === 4) {
			this.hint("Roulette Wheel Result: 5");
	            for (const pokemon of this.getAllActive()) {
			this.directDamage(pokemon.hp, pokemon);
		    }
		}
		else if (result === 5) {
			this.hint("Roulette Wheel Result: 6");
		    for (const pokemon of this.getAllActive()) {
			this.useMove("Spikes", pokemon);
			this.useMove("Charged Stone", pokemon);
		    }
		}
		else if (result === 6) {
			this.hint("Roulette Wheel Result: 7");
			const result2 = this.random(3);
			const result3 = this.random(3);
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
					if (target.isActive) {
					if (result2 === 0) {
						this.useMove("Grassy Terrain", target);
					} else if (result2 === 1) {
						this.useMove("Electric Terrain", target);
					} else {
						this.useMove("Misty Terrain", target);
					}
					if (result3 === 0) {
						this.useMove("Sunny Day", target);
					} else if (result3 === 1) {
						this.useMove("Rain Dance", target);
					} else {
						this.useMove("Sandstorm", target);
					}
					}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
					if (target.isActive) {
					if (result2 === 0) {
						this.useMove("Grassy Terrain", target);
					} else if (result2 === 1) {
						this.useMove("Electric Terrain", target);
					} else {
						this.useMove("Misty Terrain", target);
					}
					if (result3 === 0) {
						this.useMove("Sunny Day", target);
					} else if (result3 === 1) {
						this.useMove("Rain Dance", target);
					} else {
						this.useMove("Sandstorm", target);
					}
					}
				}
			}
		}

		else if (result === 7) {
			this.hint("Roulette Wheel Result: 8");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.directDamage(1, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.directDamage(1, target);
				}
				}
			}
	        }

		else if (result === 8) {
			this.hint("Roulette Wheel Result: 9");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.boost({atk: -12, def: -12, spa: -12, spd: -12, spe: -12}, target, target, null, true);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.boost({atk: -12, def: -12, spa: -12, spd: -12, spe: -12}, target, target, null, true);
				}
				}
			}
	        } 

		else if (result === 9) {
			this.hint("Roulette Wheel Result: 10");
			for (const pokemon of this.getAllActive()) {
				pokemon.forceSwitchFlag = true;
			}	
		}

		else if (result === 10) {
			this.hint("Roulette Wheel Result: 11");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Conversion 2", pokemon);
			}
		}

		else if (result === 11) {
			this.hint("Roulette Wheel Result: 12");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
				}
				}
			}
			
		}

		else if (result === 12) {
			this.hint("Roulette Wheel Result: 13");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Heart Swap", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Heart Swap", target);
				}
				}
			}
		}

		else if (result === 13) {
			this.hint("Roulette Wheel Result: 14");
			for (const pokemon of this.getAllActive()) {
				this.heal(pokemon.maxhp / 4, pokemon);
	        	}
	        } 

		else if (result === 14) {
			this.hint("Roulette Wheel Result: 15");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Scald 2", pokemon);
			}
		}

		else if (result === 15) {
			this.hint("Roulette Wheel Result: 16");
			for (const pokemon of this.getAllActive()) {
				pokemon.trySetStatus('tox', pokemon);
	        	}
		}

		else if (result === 16) {
			this.hint("Roulette Wheel Result: 17");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Court Change", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Court Change", target);
				}
				}
			}	
		}


		else if (result === 17) {
			this.hint("Roulette Wheel Result: 18");
			for (const pokemon of this.getAllActive()) {
		                this.boost({atk: 2, spa: 2}, pokemon);
			}
	        }

		else if (result === 18) {
			this.hint("Roulette Wheel Result: 19");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Camouflage", pokemon);
			}
		}

		else if (result === 19) {
			this.hint("Roulette Wheel Result: 20");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Skill Swap", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Skill Swap", target);
				}
				}
			}	
		}

		else if (result === 20) {
			this.hint("Roulette Wheel Result: 21");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Celebrate", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Celebrate", target);
				}
				}
			}	
		}

		else if (result === 21) {
			this.hint("Roulette Wheel Result: 22");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Trick Room", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Trick Room", target);
				}
				}
			}	
		}

		else if (result === 22) {
			this.hint("Roulette Wheel Result: 23");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.boost({accuracy: -1}, target);	
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.boost({accuracy: -1}, target);	
				}
				}
			}	
		}

		else if (result === 23) {
			this.hint("Roulette Wheel Result: 24");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Haze", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Haze", target);
				}
				}
			}	
		}

		else if (result === 24) {
			this.hint("Roulette Wheel Result: 25");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Magic Room", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Magic Room", target);
				}
				}
			}	
		}

		else if (result === 25) {
			this.hint("Roulette Wheel Result: 26");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Wonder Room", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Wonder Room", target);
				}
				}
			}	
		}

		else if (result === 26) {
			this.hint("Roulette Wheel Result: 27");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Pain Split", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Pain Split", target);
				}
				}
			}	
		}

		else if (result === 27) {
			this.hint("Roulette Wheel Result: 28");
			for (const pokemon of this.getAllActive()) {
	                	pokemon.cureStatus();
	        	}
	        }

		else if (result === 28) {
			this.hint("Roulette Wheel Result: 29");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Reflect", target);
					this.useMove("Light Screen", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Reflect", target);
					this.useMove("Light Screen", target);
				}
				}
			}	
		}			

		else if (result === 29) {
			this.hint("Roulette Wheel Result: 30");
			for (const pokemon of this.getAllActive()) {
	                	this.useMove("Safeguard", pokemon);
	        	}
	        }

		else if (result === 30) {
			this.hint("Roulette Wheel Result: 31");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Neutral Air", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Neutral Air", target);
				}
				}
			}	
		}

		else if (result === 31) {
			this.hint("Roulette Wheel Result: 32");
			for (const pokemon of this.getAllActive()) {
				pokemon.trySetStatus('frz', pokemon);
	        	}
		}

		else if (result === 32) {
			this.hint("Roulette Wheel Result: 33");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					target.forceSwitchFlag = true;
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					target.forceSwitchFlag = true;
				}
				}
			}	
		}

		else if (result === 33) {
			this.hint("Roulette Wheel Result: 34");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Water Shield", pokemon);
			}
		}

		else if (result === 34) {
			this.hint("Roulette Wheel Result: 35");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Defog", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Defog", target);
				}
				}
			}
		}

		else if (result === 35) {
			this.hint("Roulette Wheel Result: 36");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Reflect Type", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Reflect Type", target);
				}
				}
			}
		}

		else if (result === 36) {
			this.hint("Roulette Wheel Result: 37");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Sheer Cold", pokemon);
			}
		}

		else if (result === 37) {
			this.hint("Roulette Wheel Result: 38");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('trapped', pokemon, pokemon, 'trapper');
			}
		}

		else if (result === 38) {
			this.hint("Roulette Wheel Result: 39");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Metronome", pokemon);
			}
		}

		else {
			this.hint("Roulette Wheel Result: 40");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Ultranome", pokemon);
			}
		}
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Cute",
	},

	deeznutsjoke: {
		num: 669,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Does stuff.",
		name: "Deez Nuts Joke",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'deeznutsjoke',
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: Deez Nuts Joke');
		},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Deez Nuts Joke');
	},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
					if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
				}
		},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Deez Nuts Joke', move);
					return false;
				}
			},
		},
		boosts: {
			atk: 3
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	extremebeam: {
		num: 3002,
		accuracy: 100,
		basePower: 300,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following two turns and cannot select a move.",
		shortDesc: "User cannot move next two turns.",
		name: "EXTREME BEAM",
		pp: 5,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onHit(pokemon) {
			pokemon.addVolatile('extremebeam');
		},

		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	quadrupleaxel: {
		num: 3006,
		accuracy: 70,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		desc: "Hits three times. Power increases to 40 for the second hit, 60 for the third, and 80 for the fourth. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. The user does not have Skill Link because I'm not doing that.",
		shortDesc: "Hits 4 times. Each hit can miss, but power rises.",
		name: "Quadruple Axel",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 4,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	protect: {
		num: 182,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Prevents moves from affecting the user this turn.",
		name: "Protect",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'protect',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	recover: {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		name: "Recover",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Electric",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	wish: {
		num: 273,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "At the end of the next turn, the Pokemon at the user's position has 1/2 of the user's maximum HP restored to it, rounded half up. Fails if this move is already in effect for the user's position.",
		shortDesc: "Next turn, 50% of the user's max HP is restored.",
		name: "Wish",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		slotCondition: 'Wish',
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectData.hp = source.maxhp / 2;
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
	lightscreen: {
		num: 113,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members take 0.5x damage from special attacks, or 0.66x damage if in a Double Battle. Damage is not reduced further with Aurora Veil. Critical hits ignore this effect. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Lasts for 8 turns if the user is holding Light Clay. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, special damage to allies is halved.",
		name: "Light Screen",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'lightscreen',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Special') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Light Screen weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	reflect: {
		num: 115,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members take 0.5x damage from physical attacks, or 0.66x damage if in a Double Battle. Damage is not reduced further with Aurora Veil. Critical hits ignore this effect. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Lasts for 8 turns if the user is holding Light Clay. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, physical damage to allies is halved.",
		name: "Reflect",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'reflect',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onResidualOrder: 21,
			onEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fairy",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	healbell: {
		num: 215,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Every Pokemon in the user's party is cured of its major status condition. Active Pokemon with the Soundproof Ability are not cured, unless they are the user.",
		shortDesc: "Cures the user's party of all status conditions.",
		name: "Heal Bell",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, sound: 1, distance: 1, authentic: 1},
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Heal Bell');
			const side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally !== source && ally.hasAbility('soundproof')) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "allyTeam",
		type: "Steel",
		zMove: {effect: 'heal'},
		contestType: "Beautiful",
	},
	calmmind: {
		num: 347,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1.",
		name: "Calm Mind",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spa: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	bulkup: {
		num: 339,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack and Defense by 1 stage.",
		shortDesc: "Raises the user's Attack and Defense by 1.",
		name: "Bulk Up",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
			def: 1,
		},
		secondary: null,
		target: "self",
		type: "Dark",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},
	swordsdance: {
		num: 14,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by 2 stages.",
		shortDesc: "Raises the user's Attack by 2.",
		name: "Swords Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			atk: 2,
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	shellsmash: {
		num: 504,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers the user's Defense and Special Defense by 1 stage. Raises the user's Attack, Special Attack, and Speed by 2 stages.",
		shortDesc: "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 2.",
		name: "Shell Smash",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: -1,
			spd: -1,
			atk: 2,
			spa: 2,
			spe: 2,
		},
		secondary: null,
		target: "self",
		type: "Ground",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},
	whirlwind: {
		num: 18,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The target is forced to switch out and be replaced with a random unfainted ally. Fails if the target is the last unfainted Pokemon in its party, or if the target used Ingrain previously or has the Suction Cups Ability.",
		shortDesc: "Forces the target to switch to a random ally.",
		name: "Whirlwind",
		pp: 20,
		priority: -6,
		flags: {reflectable: 1, mirror: 1, authentic: 1, mystery: 1},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	haze: {
		num: 114,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Resets the stat stages of all active Pokemon to 0.",
		shortDesc: "Eliminates all stat changes.",
		name: "Haze",
		pp: 30,
		priority: 0,
		flags: {authentic: 1},
		onHitField() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: {effect: 'heal'},
		contestType: "Beautiful",
	},
	frustration: {
		num: 218,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon) {
			return Math.floor(((255 - pokemon.happiness) * 10) / 25) || 1;
		},
		category: "Physical",
		desc: "Power is equal to the greater of ((255 - user's Happiness) * 2/5), rounded down, or 1.",
		shortDesc: "Max 102 power at minimum Happiness.",
		isNonstandard: "Past",
		name: "Frustration",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cute",
	},
	bind: {
		num: 20,
		accuracy: 85,
		basePower: 15,
		category: "Physical",
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "Bind",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	octolock: {
		num: 753,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Prevents the target from switching out. At the end of each turn during effect, the target's Defense and Special Defense are lowered by 1 stage. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Traps target, lowers Def and SpD by 1 each turn.",
		name: "Octolock",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryImmunity(target) {
			return this.dex.getImmunity('trapped', target);
		},
		volatileStatus: 'octolock',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Octolock', '[of] ' + source);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				const source = this.effectData.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['octolock'];
					this.add('-end', pokemon, 'Octolock', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({def: -1, spd: -1}, pokemon, source, this.dex.getActiveMove('octolock'));
			},
			onTrapPokemon(pokemon) {
				if (this.effectData.source && this.effectData.source.isActive) pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	trickroom: {
		num: 433,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the Speed of every Pokemon is recalculated for the purposes of determining turn order. During the effect, each Pokemon's Speed is considered to be (10000 - its normal Speed), and if this value is greater than 8191, 8192 is subtracted from it. If this move is used during the effect, the effect ends.",
		shortDesc: "Goes last. For 5 turns, turn order is reversed.",
		name: "Trick Room",
		pp: 5,
		priority: -7,
		flags: {mirror: 1},
		pseudoWeather: 'trickroom',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Fairy",
		zMove: {boost: {accuracy: 1}},
		contestType: "Clever",
	},
	healingwish: {
		num: 361,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user faints and the next injured or statused Pokemon brought in has its HP fully restored along with having any major status condition cured. The healing happens before hazards take effect. Is not consumed if the Pokemon sent out is not injured or statused. Fails if the user is the last unfainted Pokemon in its party.",
		shortDesc: "User faints. Next hurt Pokemon is fully healed.",
		name: "Healing Wish",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryHit(pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		selfdestruct: "ifHit",
		slotCondition: 'healingwish',
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.maxhp);
					target.setStatus('');
					this.add('-heal', target, target.getHealth, '[from] move: Healing Wish');
					target.side.removeSlotCondition(target, 'healingwish');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		contestType: "Beautiful",
	},
	agility: {
		num: 97,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Speed by 2 stages.",
		shortDesc: "Raises the user's Speed by 2.",
		name: "Agility",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 2,
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers the target's evasiveness by 1 stage. If this move is successful and whether or not the target's evasiveness was affected, the effects of Reflect, Light Screen, Aurora Veil, Safeguard, Mist, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the target's side, and the effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side. Ignores a target's substitute, although a substitute will still block the lowering of evasiveness. If there is a terrain active and this move is successful, the terrain will be cleared.",
		shortDesc: "-1 evasion; clears terrain and hazards on both sides.",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'dewyflowers', 'chargedstone', 'watershield', 'spikes'
			];
			const removeAll = [
				'dewyflowers', 'chargedstone', 'spikes', 'watershield'
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	futuresight: {
		num: 248,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Future Sight",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'futuresight',
				source: source,
				moveData: {
					id: 'futuresight',
					name: "Future Sight",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Fairy',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
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
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	sleeptalk: {
		num: 214,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sleep Talk",
		pp: 10,
		priority: 0,
		flags: {},
		sleepUsable: true,
		onTryHit(pokemon) {
			if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) return false;
		},
		onHit(pokemon) {
			const noSleepTalk = [
				'assist', 'beakblast', 'belch', 'bide', 'celebrate', 'chatter', 'copycat', 'dynamaxcannon', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'sleeptalk', 'uproar',
			];
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				if (!moveid) continue;
				const move = this.dex.getMove(moveid);
				if (noSleepTalk.includes(moveid) || move.flags['charge'] || (move.isZ && move.basePower !== 1)) {
					continue;
				}
				moves.push(moveid);
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, pokemon);
		},
		secondary: null,
		target: "self",
		type: "Dark",
		zMove: {effect: 'crit2'},
		contestType: "Cute",
	},
	storedpower: {
		num: 500,
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Special",
		name: "Stored Power",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	tearapart: {
		num: 2006,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		shortDesc: "Hits twice. Each hits lowers Def.",
		name: "Tear Apart",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		multihit: 2,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	clearbeam: {
		num: 1033.1,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Does not factor type effectiveness.",
		name: "Clear Beam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 0;
			if (type === 'Grass') return 0;
			if (type === 'Fire') return 0;
			if (type === 'Water') return 0;
			if (type === 'Electric') return 0;
			if (type === 'Flying') return 0;
			if (type === 'Ground') return 0;
			if (type === 'Dragon') return 0;
			if (type === 'Fairy') return 0;
			if (type === 'Steel') return 0;
			if (type === 'Bug') return 0;
			if (type === 'Poison') return 0;
		},
		target: "normal",
		type: "Steel",
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
	rancidrush: {
		num: 1026.1,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		shortDesc: "+1 Priority; badly poisons.",
		name: "Rancid Rush",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		status: 'tox',
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	spinningweb: {
		num: 3009,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Also removes Water Shield from the user's side, but triples the move's power.",
		shortDesc: "Free user from hazards/bind/Leech Seed.",
		name: "Spinning Web",
		pp: 40,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryImmunity(target) {
			return !target.hasType('Fire');
		},
		onBasePower(basePower, pokemon, target) {
			const sideConditions = ['watershield'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Spinning Web', '[of] ' + pokemon);
					return this.chainModify(3);
				}
			}
		},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Spinning Web', '[of] ' + pokemon);
			}
			const sideConditions = ['dewyflowers', 'chargedstone', 'spikes', 'stickyweb', 'stealthrock', 'toxic spikes'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Spinning Web', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['dewyflowers', 'chargedstone', 'spikes', 'stickyweb', 'stealthrock', 'toxic spikes'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Spinning Web', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	destructiveblow: {
		num: 1008.1,
		accuracy: 100,
		basePower: 140,
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
		type: "Dragon",
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
				this.effectData.hp = source.maxhp / 3;
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectData.hp, target, target);
					target.cureStatus();
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Cute",
	},
	dewyflowers: {
		num: 1001.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the user's side every turn; entry hazard.",
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
			onResidual(target, source, effect) {
				for (const ally of target.side) {
					if (ally.isActive) {
						if (ally.item === 'heavydutyboots' || !ally.isGrounded()) {
							this.heal(ally.baseMaxhp / 16);
						}
					}
				}
			},
		},
		secondary: null,
		target: "allySide",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	},
	scorch: {
		num: 3004,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		desc: "Has a 100% chance to burn the target.",
		shortDesc: "100% chance to burn the target.",
		name: "Scorch",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	chargedstone: {
		num: 3006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Fails if the effect is already active on the opposing side. Foes lose 1/40, 1/20, 1/10, 1/5, or 1/2.5 of their maximum HP, rounded down, based on their weakness to the Electric type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Spinning Web or Defog successfully, or is hit by Defog.",
		shortDesc: "Hurts foes on switch-in. Factors Electric weakness.",
		name: "Charged Stone",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'chargedstone',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Charged Stone');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				if (pokemon.hasType('Ground')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('chargedstone')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Electric",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	dirtyscheme: {
		num: 3003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's primary stats by 1 stage. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then raises most stats by 1.",
		name: "Dirty Scheme",
		pp: 5,
		priority: 0,
		flags: {charge: 1, nonsky: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Dark",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	flamerunner: {
		num: 1002.1,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "User becomes part Fire.",
		name: "Flame Runner",
		pp:  15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1, contact: 1},
		self: {
			onHit(pokemon) {
				if (pokemon.hasType('Fire')) return false;
				if (!pokemon.addType('Fire')) return false;
				this.add('-start', pokemon, 'typeadd', 'Fire', '[from] move: Flame Runner');
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	boomburst: {
		num: 586,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Boomburst",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Water",
		contestType: "Tough",
	},
	injection: {
		num: 1021.1,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The target transforms into the user. The target's current stats, stat stages, types, moves, Ability, weight, gender, and sprite are copied. The user's level and HP remain the same and each copied move receives only 5 PP, with a maximum of 5 PP each. This move fails if it hits a substitute, if either the user or the target is already transformed, or if either is behind an Illusion.",
		shortDesc: "Target copies user's stats, moves, types, and Ability.",
		name: "Injection",
		pp: 10,
		priority: -7,
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
	substitute: {
		num: 164,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user takes 1/4 of its maximum HP, rounded down, and puts it into a substitute to take its place in battle. The substitute is removed once enough damage is inflicted on it, or if the user switches out or faints. Baton Pass can be used to transfer the substitute to an ally, and the substitute will keep its remaining HP. Until the substitute is broken, it receives damage from all attacks made by other Pokemon and shields the user from status effects and stat stage changes caused by other Pokemon. Sound-based moves and Pokemon with the Infiltrator Ability ignore substitutes. The user still takes normal damage from weather and status effects while behind its substitute. If the substitute breaks during a multi-hit attack, the user will take damage from any remaining hits. If a substitute is created while the user is trapped by a binding move, the binding effect ends immediately. Fails if the user does not have enough HP remaining to create a substitute without fainting, or if it already has a substitute.",
		shortDesc: "User takes 1/4 its max HP to put in a substitute.",
		name: "Substitute",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, nonsky: 1},
		volatileStatus: 'substitute',
		onTryHit(target) {
			if (target.volatiles['substitute']) {
				this.add('-fail', target, 'move: Substitute');
				return null;
			}
			if (target.hp <= target.maxhp / 4 || target.maxhp === 1) { // Shedinja clause
				this.add('-fail', target, 'move: Substitute', '[weak]');
				return null;
			}
		},
		onHit(target) {
			this.directDamage(target.maxhp / 4);
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'Substitute');
				this.effectData.hp = Math.floor(target.maxhp / 4);
				if (target.volatiles['partiallytrapped']) {
					this.add('-end', target, target.volatiles['partiallytrapped'].sourceEffect, '[partiallytrapped]', '[silent]');
					delete target.volatiles['partiallytrapped'];
				}
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit(target, source, move) {
				if (target === source || move.flags['authentic'] || move.infiltrates) {
					return;
				}
				let damage = this.getDamage(source, target, move);
				if (!damage && damage !== 0) {
					this.add('-fail', source);
					this.attrLastMove('[still]');
					return null;
				}
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) {
					return damage;
				}
				if (damage > target.volatiles['substitute'].hp) {
					damage = target.volatiles['substitute'].hp as number;
				}
				target.volatiles['substitute'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['substitute'].hp <= 0) {
					target.removeVolatile('substitute');
				} else {
					this.add('-activate', target, 'move: Substitute', '[damage]');
				}
				if (move.recoil) {
					this.damage(this.calcRecoilDamage(damage, move), source, target, 'recoil');
				}
				if (move.drain) {
					this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source, target, 'drain');
				}
				this.singleEvent('AfterSubDamage', move, null, target, source, move, damage);
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return this.HIT_SUBSTITUTE;
			},
			onEnd(target) {
				this.add('-end', target, 'Substitute');
			},
		},
		secondary: null,
		target: "self",
		type: "Dark",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},	
	ultranome: {
		num: 118,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultranome",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			this.useMove("Metronome", pokemon);
			this.useMove("Metronome", pokemon);
			this.useMove("Metronome", pokemon);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cute",
	},
	scald2: {
		num: 503,
		accuracy: 100,
		basePower: 5,
		category: "Special",
		name: "Scald 2",
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
};
