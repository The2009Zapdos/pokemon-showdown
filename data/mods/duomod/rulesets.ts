export const Formats: {[k: string]: FormatData} = {
	subscribeformorecontent: {
		effectType: 'Rule',
		name: 'Subscribe For More Content',
		desc: 'https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A',
		onResidual(pokemon) {
		var result: number;
		var pickSide: number;
		for (const allPokemon of this.getAllActive()) {
			if (allPokemon.hasAbility('obtrusive')) {
				return;
			}
		} 
		this.hint("Time for a bonus wheel!");
		result = this.random(10) + 39;
	        pickSide = this.random(2);
		if (result === 0) {
			this.hint("Roulette Wheel Result 1 - Fully heal every active Pokemon.");
	            for (const pokemon of this.getAllActive()) {
	                this.heal(pokemon.maxhp, pokemon);
	                pokemon.cureStatus();
	            }
	        } 
	        else if (result === 1) {
			this.hint("Roulette Wheel Result 2 - Greatly increase everyone's highest stat.");
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
			this.hint("Roulette Wheel Result 3 - Give one Pokemon an omniboost.");
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
			this.hint("Roulette Wheel Result 4 - Set one Pokemon to 1 HP.");
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
			this.hint("Roulette Wheel Result 5 - screw you both");
	            for (const pokemon of this.getAllActive()) {
			this.directDamage(pokemon.hp, pokemon);
		    }
		}
		else if (result === 5) {
			this.hint("Roulette Wheel Result 6 - Set hazards on both sides.");
		    for (const pokemon of this.getAllActive()) {
			this.useMove("Spikes", pokemon);
			this.useMove("Stealth Electric", pokemon);
		    }
		}
		else if (result === 6) {
			this.hint("Roulette Wheel Result 7 - Set a random weather and terrain.");
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
			this.hint("Roulette Wheel Result 8 - lmao");
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
			this.hint("Roulette Wheel Result 9 - Minimize every stat of one Pokemon.");
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
			this.hint("Roulette Wheel Result 10 - Forcibly switch every Pokemon.");
			for (const pokemon of this.getAllActive()) {
				pokemon.forceSwitchFlag = true;
			}	
		}

		else if (result === 10) {
			this.hint("Roulette Wheel Result 11 - Make every Pokemon use Conversion 2.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Conversion 2", pokemon);
			}
		}

		else if (result === 11) {
			this.hint("Roulette Wheel Result 12 - Make one Pokemon Transform into the other.");
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
			this.hint("Roulette Wheel Result 13 - Make both Pokemon trade stat changes.");
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
			this.hint("Roulette Wheel Result 14 - Slightly heal both Pokemon.");
			for (const pokemon of this.getAllActive()) {
				this.heal(pokemon.maxhp / 4, pokemon);
	        	}
	        } 

		else if (result === 14) {
			this.hint("Roulette Wheel Result 15 - heard you guys liked scald");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Scald 2", pokemon);
			}
		}

		else if (result === 15) {
			this.hint("Roulette Wheel Result 16 - Attempt to Toxic both Pokemon.");
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.side.getSideCondition('safeguard')) { 
					pokemon.trySetStatus('tox', pokemon);
				}
	      }
		}

		else if (result === 16) {
			this.hint("Roulette Wheel Result 17 - Switch both sides' field effects.");
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
			this.hint("Roulette Wheel Result 18 - Raise both active Pokemons' attacking stats.");
			for (const pokemon of this.getAllActive()) {
		                this.boost({atk: 2, spa: 2}, pokemon);
			}
	        }

		else if (result === 18) {
			this.hint("Roulette Wheel Result 19 - Make both Pokemon use Camouflage.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Camouflage", pokemon);
			}
		}

		else if (result === 19) {
			this.hint("Roulette Wheel Result 20 - Make both Pokemon swap abilities.");
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
			this.hint("Roulette Wheel Result 21 - wahoo");
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
			this.hint("Roulette Wheel Result 22 - Sets Trick Room.");
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
			this.hint("Roulette Wheel Result 23 - Pocket sand go");
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
			this.hint("Roulette Wheel Result 24 - Removes all active stat changes.");
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
			this.hint("Roulette Wheel Result 25 - Sets Magic Room.");
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
			this.hint("Roulette Wheel Result 26 - Sets Wonder Room.");
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
			this.hint("Roulette Wheel Result 27 - Averages out the HP of active Pokemon.");
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
			this.hint("Roulette Wheel Result 28 - Cures all active Pokemons' statuses.");
			for (const pokemon of this.getAllActive()) {
	                	pokemon.cureStatus();
	        	}
	        }

		else if (result === 28) {
			this.hint("Roulette Wheel Result 29 - Sets up Screens for one side.");
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
			this.hint("Roulette Wheel Result 30 - Starts a status immunity for both sides.");
			for (const pokemon of this.getAllActive()) {
	                	this.useMove("Safeguard", pokemon);
	        	}
	        }

		else if (result === 30) {
			this.hint("Roulette Wheel Result 31 - Deactivates all abilities that are active within 5 turns.");
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
			this.hint("Roulette Wheel Result 32 - Attempts to Freeze all active Pokemon.");
			for (const pokemon of this.getAllActive()) {
				pokemon.trySetStatus('frz', pokemon);
	        	}
		}

		else if (result === 32) {
			this.hint("Roulette Wheel Result 33 - Switches out one Pokemon.");
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
			this.hint("Roulette Wheel Result 34 - Sets up Water Shield for both sides.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Water Shield", pokemon);
			}
		}

		else if (result === 34) {
			this.hint("Roulette Wheel Result 35 - One active Pokemon Defogs.");
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
			this.hint("Roulette Wheel Result 36 - Both active Pokemon share a type combination.");
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
			this.hint("Roulette Wheel Result 37 - glhf");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Sheer Cold", pokemon);
			}
		}

		else if (result === 37) {
			this.hint("Roulette Wheel Result 38 - uh oh");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Octolock", pokemon);
			}
		}

		else if (result === 38) {
			this.hint("Roulette Wheel Result 39 - Both active Pokemon use Metronome.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Metronome", pokemon);
			}
		}
		
		else if (result === 39) {
			this.hint("Roulette Wheel Result 40 - Both active Pokemon become Moody.");
			for (const pokemon of this.getAllActive()) {
				this.add('-ability', pokemon, 'Moody', '[from] move: Roulette Spin');
			}
		}
		
		else if (result === 40) {
			this.hint("Roulette Wheel Result 41 - Both active Pokemon swap items.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Trick", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Switcheroo", target);
				}
				}
			}	
		}	
		
		else if (result === 41) {
			this.hint("Roulette Wheel Result 42 - Both active Pokemon trade HP bars.");
			for (const temp of this.sides[0].pokemon) {
				for (const pokemon2 of this.temp.side.foe.active[0]) {
				for (const target of this.pokemon.side.foe.active[0]) {
					const pokHP = (pokemon2.hp / pokemon2.maxhp);
					const tarHP = (target.hp / target.maxhp);
					pokemon.sethp(tarHP * pokemon2.maxhp);
					target.sethp(pokHP * target.maxhp);					
				}
				}
			}
		}
		
		else if (result === 42) {
			this.hint("Roulette Wheel Result 43 - Both active Pokemon use their first move.");
			for (const pokemon of this.getAllActive()) {
				const frstMove = this.dex.getMove(pokemon.moveSlots[0].id);
				this.useMove(frstMove, pokemon);
			}
		}
			
		else if (result === 43) {
			this.hint("Roulette Wheel Result 44 - don't get critted lmao");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Focus Energy", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Focus Energy", target);
				}
				}
			}
		}	
			
		else if (result === 44) {
			this.hint("Roulette Wheel Result 45 - You get a bonus!");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Roulette Spin", pokemon);
			}
		}			
		
		else if (result === 45) {
			this.hint("Roulette Wheel Result 46 - One active Pokemon becomes way faster than the other.");
			for (const pokemon of this.sides[0].active) {
				for (const target of this.sides[1].active) {
					if (pickSide === 0) {
						this.boost({spe: 12}, pokemon, pokemon, null, true);
						this.boost({spe: -12}, target, target, null, true);
					}
					else if (pickSide === 1) {
						this.boost({spe: 12}, target, target, null, true);
						this.boost({spe: -12}, pokemon, pokemon, null, true);
					}
				}
			}
		}			
			
		else if (result === 46) {
			this.hint("Roulette Wheel Result 47 - sussie");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Vote Out", target);
					const oldAbility = target.setAbility('vent');
					if (oldAbility) {
						this.add('-ability', target, 'Vent', '[from] move: Vote Out', '[silent]');
						return;
					}
				return false;
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Vote Out", target);
					const oldAbility = target.setAbility('vent');
					if (oldAbility) {
						this.add('-ability', target, 'Vent', '[from] move: Vote Out', '[silent]');
						return;
					}
				return false;
				}
				}
			}
		}	
			
		else if (result === 47) {
			this.hint("Roulette Wheel Result 48 - Time for some good ol' Mario Kart Wii");
			for (const pokemon of this.sides[0].active) {
				for (const target of this.sides[1].active) {
					if (target.storedStats.spe < pokemon.storedStats.spe) {
						this.useMove("Flame Runner", pokemon);		
						if (target.isActive) {
							this.useMove("Vote Out", target);
							const oldAbility = pokemon.setAbility('vent');
							if (oldAbility) {
								this.add('-ability', pokemon, 'Slow Start', '[from] move: Flame Runner');
								return;
							}
						return false;
						}
					}
					else {
						this.useMove("Flame Runner", target);
						if (target.isActive) {
							const oldAbility = pokemon.setAbility('vent');
							if (oldAbility) {
								this.add('-ability', pokemon, 'Slow Start', '[from] move: Flame Runner');
								return;
							}
						return false;
					}
					}	
				}
			}
		}
						
		else if (result === 48) {
			this.hint("Roulette Wheel Result 49 - Ad break.");
			this.add('-message', "Hello Duomod v3 enjoyer!");
			this.add('-message', "The fact that you're spending your time on Pokemon Showdown must mean you're really bored!");
			this.add('-message', "Well today's your lucky day! Because I've got just the cure!");
			this.add('-message', "Head on over to DuoM2's YouTube channel, featuring several videos from the one and only DuoM2!");
			this.add('-message', "He's smart, funny, a gamer, handsome, and the best Mewtwo main in South Carolina Smash!");
			this.add('-message', "With 4 hours of content right now and more to come, your boredom will soar off into space!");
			this.add('-message', "Plus, as a special promotional bonus, if you subscribe now, you'll get to say you knew him before it was cool!");
			this.add('-message', "Head on over to DuoM2's YouTube channel for the time of your life! Linked down below!");
			this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
			this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
			this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
			this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
			this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
		}		
		
		else {
			this.hint("Roulette Wheel Result 50 - THE ULTIMATE EFFECT");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Ultranome", pokemon);
			}
		}
			
		},
	},		
};
