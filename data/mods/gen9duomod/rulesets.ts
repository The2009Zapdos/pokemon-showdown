export const Formats: {[k: string]: FormatData} = {
	subscribeformorecontent: {
		effectType: 'Rule',
		name: 'Subscribe For More Content',
		desc: 'https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A',
		onBegin() {
			this.add(`raw|<img src="https://media.discordapp.net/attachments/575738724680204329/909632559036629022/talkinchu.png" height="454" width="411">`);
			this.add('-message', "Welcome to the Gen 9 version of Duomod!");		
			this.add('-message', "A lot of crazy stuff can happen in this meta. For more information, please check this spreadsheet - ");	
			this.add('-message', "https://docs.google.com/spreadsheets/d/1FO4wuxSQnquV5vubEHNVwEwrzZWjtR6gCt4RZRXBqdM/edit#gid=768503844");	
		},
		
		onResidual(pokemon) {
		var result: number;
		const pickSide = this.random(2);

		for (const allPokemon of this.getAllActive()) {
			if (allPokemon.hasAbility('obtrusive')) {
				return;
			}
		} 

		this.add('-message', "Time for the Roulette Wheel!");
		
		result = this.random(35);

		if (result === 0) {
			this.hint("Roulette Wheel Result 1 - Both Pokemon trade Speed stats.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Speed Swap", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Speed Swap", target);
				}
				}
			}
		}
    
		else if (result === 1) {
			this.hint("Roulette Wheel Result 2 - Both Pokemon will crit next turn.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Laser Focus", pokemon);
			}
		}    

		else if (result === 2) {
			this.hint("Roulette Wheel Result 3 - Make all Pokemon drowsy.");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('yawn');
			}
		}  
        
		else if (result === 3) {
			this.hint("Roulette Wheel Result 4 - Make one Pokemon Transform and raise its Speed.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
          this.boost({spe: 1}, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
          this.boost({spe: 1}, target);
				}
				}
			}
		}
        
		else if (result === 4) {
			this.hint("Roulette Wheel Result 5 - Everyone gets a Sub!");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('substitute');
			}
		}   
        
		else if (result === 5) {
			this.hint("Roulette Wheel Result 6 - Both Pokemon get Encored.");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('encore');
			}
		}   

		else if (result === 6) {
			this.hint("Roulette Wheel Result 7 - octolock was too much guys");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Fairy Lock", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Fairy Lock", target);
				}
				}
			}
		}  
        
		else if (result === 7) {
			this.hint("Roulette Wheel Result 8 - Both Pokemon get Taunted.");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('taunt');
			}
		}   

		else if (result === 8) { // might need to change the name for this one later.
			this.hint("Roulette Wheel Result 9 - Both Pokemon change their types.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Conversion", pokemon);
			}
		}         
        
		else if (result === 9) {
			this.hint("Roulette Wheel Result 10 - How do you like THIS one, Game Freak?");
			for (const pokemon of this.getAllActive()) {
				this.heal(pokemon.maxhp / 2, pokemon);
      	}
    	} 
		
		else if (result === 10) { 
			this.hint("Roulette Wheel Result 11 - lmao x2");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Pound", pokemon);
			}
		}  	
		
		else if (result === 11) { 
			this.hint("Roulette Wheel Result 12 - Everyone gets their ability replaced with Defeatist.");
			for (const s1 of this.sides[0].active) {
				for (const s2 of this.sides[1].active) {
					const oldAbility1 = s1.setAbility('Defeatist');
					if (oldAbility1) {
						this.add('-ability', s1, 'Defeatist', '[from] move: Roulette Spin');
					}
					const oldAbility2 = s2.setAbility('Defeatist');
					if (oldAbility2) {
						this.add('-ability', s2, 'Defeatist', '[from] move: Roulette Spin');
					}
				}
			}
		} 			

		else if (result === 12) {
			this.hint("Roulette Wheel Result 13 - I felt like being mean today");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.boost({atk: 4, spa: 4, spe: -12}, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.boost({atk: 4, spa: 4, spe: -12}, target);
				}
				}
			}	
		}
		
		else if (result === 13) { 
			this.hint("Roulette Wheel Result 14 - Everyone gets perfect accuracy.");
			for (const pokemon of this.getAllActive()) {
				this.boost({accuracy: 12}, pokemon);
			}
		} 		

		else if (result === 14) {
			this.hint("Roulette Wheel Result 15 - One Pokemon gets to Baton Pass.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Baton Pass", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Baton Pass", target);
				}
				}
			}
		}  
		
		else if (result === 15) { 
			this.hint("Roulette Wheel Result 16 - Both Pokemon click Destiny Bond.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Destiny Bond", pokemon);
			}
		}  
		
		else if (result === 16) {
			this.hint("Roulette Wheel Result 17 - One side sets webs.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Sticky Web", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Sticky Web", target);
				}
				}
			}
		}  	
		
		else if (result === 17) {
			this.hint("Roulette Wheel Result 18 - i felt like it would be funny");
			for (const s1 of this.sides[0].active) {
				for (const s2 of this.sides[1].active) {
					if (pickSide === 0) {
						this.damage(s2.baseMaxhp / 4, s2);
						this.heal(s1.baseMaxhp / 4, s1);
						
					}
					else if (pickSide === 1) {
						this.damage(s1.baseMaxhp / 4, s1);
						this.heal(s2.baseMaxhp / 4, s2);
					}
				}
			}
		}  
			
		else if (result === 18) { 
			this.hint("Roulette Wheel Result 19 - Everyone gets Beast Boost.");
			for (const s1 of this.sides[0].active) {
				for (const s2 of this.sides[1].active) {
					const oldAbility1 = s1.setAbility('Beast Boost');
					if (oldAbility1) {
						this.add('-ability', s1, 'Beast Boost', '[from] move: Roulette Spin');
					}
					const oldAbility2 = s2.setAbility('Beast Boost');
					if (oldAbility2) {
						this.add('-ability', s2, 'Beast Boost', '[from] move: Roulette Spin');
					}
				}
			}
		} 			
		
		else if (result === 19) {
			this.hint("Roulette Wheel Result 20 - Give one Pokemon an omniboost.");
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
			
		else if (result === 20) {
			this.hint("Roulette Wheel Result 21 - Switch both sides' field effects.");
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
			
		else if (result === 21) {
			this.hint("Roulette Wheel Result 22 - Averages out the HP of active Pokemon.");
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
		
		else if (result === 22) {
			this.hint("Roulette Wheel Result 23 - One active Pokemon Defogs.");
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
			
		else if (result === 23) {
			this.hint("Roulette Wheel Result 24 - Both sides set Stealth Rock.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Stealth Rock", pokemon);
			}
		}
			
		else if (result === 24) {
			this.hint("Roulette Wheel Result 25 - Make both Pokemon swap abilities.");
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
			
		else if (result === 25) {
			this.hint("Roulette Wheel Result 26 - Both active Pokemon swap items.");
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
			
		else if (result === 26) {
			this.hint("Roulette Wheel Result 27 - Sets Trick Room.");
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
			
		else if (result === 27) {
			this.hint("Roulette Wheel Result 28 - Sets Magic Room.");
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

		else if (result === 28) {
			this.hint("Roulette Wheel Result 29 - Sets Wonder Room.");
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
			
		else if (result === 29) {
			this.hint("Roulette Wheel Result 30 - glhf");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Sheer Cold", pokemon);
			}
		}
			
	   else if (result === 30) {
			this.hint("Roulette Wheel Result 31 - screw you both");
	            for (const pokemon of this.getAllActive()) {
			this.directDamage(pokemon.hp, pokemon);
		    }
		}			
			
		else if (result === 31) {
			this.hint("Roulette Wheel Result 32 - Attempts to Freeze all active Pokemon.");
			for (const pokemon of this.getAllActive()) {
				pokemon.trySetStatus('frz', pokemon);
	        	}
		}	
			
		else if (result === 32) {
			this.hint("Roulette Wheel Result 33 - Funeral service...");
			var deez: number;
			deez = this.random(32);
			if (deez === 0) {
				for (const pokemon of this.sides[0].active) {
					this.directDamage(pokemon.hp, pokemon);
					this.add('-message', "rip bozo LMAOOOOOOOOO");
				}
			}
			else if (deez === 1) {
				for (const pokemon of this.sides[0].active) {
					this.directDamage(pokemon.hp, pokemon);
					this.add('-message', "rip bozo LMAOOOOOOOOO");
				}
			}
			else {	
				this.add(`raw|<img src="https://cdn.discordapp.com/attachments/884947038788276264/1043172263291269120/goriplax.png" height="454" width="411">`);
				this.add('-message', "Good day, ladies and gentlemen.");
				this.add('-message', "Many of you may be wondering why Gorilax wasn't included in Gen 9 Duomod.");
				this.add('-message', "Today, I have to bear the unfortunate news that Gorilax has passed away.");
				this.add('-message', "Over the years, Gorilax has graced our lives with his 116/101/117 bulk, awful typing, and cool offensive sets.");
				this.add('-message', "His abilities of Forewarn and Mental Note may not have been the best, but we loved him for them all the same.");
				this.add('-message', "Some may have found his looks creepy, but in spite of that, his face always had that unbreakable smile.");
				this.add('-message', "Let us not grieve over the fact that he is gone, but celebrate the fact that we were able to have so many good times with him.");
				this.add('-message', "We will forever miss you, Gorilax.");
				this.add('-message', "R.I.P. 2019 - 2022");
			}
		}

		else if (result === 33) {
			this.hint("Roulette Wheel Result 34 - Both active Pokemon use Metronome.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Metronome", pokemon);
			}
		}
		
		else {
			this.hint("Roulette Wheel Result 35 - THE ULTIMATE EFFECT!!!");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Ultranome", pokemon);
			}
		}
			
		},
	},		
	
	secondspin: { // FIX
		effectType: 'Rule',
		name: 'Second Spin',
		desc: 'https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A',
		onResidual(pokemon) {
		var result: number;
		const pickSide = this.random(2);

		for (const allPokemon of this.getAllActive()) {
			if (allPokemon.hasAbility('obtrusive')) {
				return;
			}
		} 

		this.add('-message', "Time for the SECOND Roulette Wheel!");
		
		result = this.random(35);

		if (result === 0) {
			this.hint("Roulette Wheel Result 1 - Both Pokemon trade Speed stats.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Speed Swap", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Speed Swap", target);
				}
				}
			}
		}
    
		else if (result === 1) {
			this.hint("Roulette Wheel Result 2 - Both Pokemon will crit next turn.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Laser Focus", pokemon);
			}
		}    

		else if (result === 2) {
			this.hint("Roulette Wheel Result 3 - Make all Pokemon drowsy.");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('yawn');
			}
		}  
        
		else if (result === 3) {
			this.hint("Roulette Wheel Result 4 - Make one Pokemon Transform and raise its Speed.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
          this.boost({spe: 1}, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Transform", target);
          this.boost({spe: 1}, target);
				}
				}
			}
		}
        
		else if (result === 4) {
			this.hint("Roulette Wheel Result 5 - Everyone gets a Sub!");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('substitute');
			}
		}   
        
		else if (result === 5) {
			this.hint("Roulette Wheel Result 6 - Both Pokemon get Encored.");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('encore');
			}
		}   

		else if (result === 6) {
			this.hint("Roulette Wheel Result 7 - octolock was too much guys");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Fairy Lock", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Fairy Lock", target);
				}
				}
			}
		}  
        
		else if (result === 7) {
			this.hint("Roulette Wheel Result 8 - Both Pokemon get Taunted.");
			for (const pokemon of this.getAllActive()) {
				pokemon.addVolatile('taunt');
			}
		}   

		else if (result === 8) { // might need to change the name for this one later.
			this.hint("Roulette Wheel Result 9 - Both Pokemon change their types.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Conversion", pokemon);
			}
		}         
        
		else if (result === 9) {
			this.hint("Roulette Wheel Result 10 - How do you like THIS one, Game Freak?");
			for (const pokemon of this.getAllActive()) {
				this.heal(pokemon.maxhp / 2, pokemon);
      	}
    	} 
		
		else if (result === 10) { 
			this.hint("Roulette Wheel Result 11 - lmao x2");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Pound", pokemon);
			}
		}  	
		
		else if (result === 11) { 
			this.hint("Roulette Wheel Result 12 - Everyone gets their ability replaced with Defeatist.");
			for (const s1 of this.sides[0].active) {
				for (const s2 of this.sides[1].active) {
					const oldAbility1 = s1.setAbility('Defeatist');
					if (oldAbility1) {
						this.add('-ability', s1, 'Defeatist', '[from] move: Roulette Spin');
					}
					const oldAbility2 = s2.setAbility('Defeatist');
					if (oldAbility2) {
						this.add('-ability', s2, 'Defeatist', '[from] move: Roulette Spin');
					}
				}
			}
		} 			

		else if (result === 12) {
			this.hint("Roulette Wheel Result 13 - I felt like being mean today");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.boost({atk: 4, spa: 4, spe: -12}, target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.boost({atk: 4, spa: 4, spe: -12}, target);
				}
				}
			}	
		}
		
		else if (result === 13) { 
			this.hint("Roulette Wheel Result 14 - Everyone gets perfect accuracy.");
			for (const pokemon of this.getAllActive()) {
				this.boost({accuracy: 12}, pokemon);
			}
		} 		

		else if (result === 14) {
			this.hint("Roulette Wheel Result 15 - One Pokemon gets to Baton Pass.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Baton Pass", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Baton Pass", target);
				}
				}
			}
		}  
		
		else if (result === 15) { 
			this.hint("Roulette Wheel Result 16 - Both Pokemon click Destiny Bond.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Destiny Bond", pokemon);
			}
		}  
		
		else if (result === 16) {
			this.hint("Roulette Wheel Result 17 - One side sets webs.");
			if (pickSide === 0) {
				for (const target of this.sides[0].pokemon) {
				if (target.isActive) {
					this.useMove("Sticky Web", target);
				}
				}
			}
			else if (pickSide === 1) {
				for (const target of this.sides[1].pokemon) {
				if (target.isActive) {
					this.useMove("Sticky Web", target);
				}
				}
			}
		}  	
		
		else if (result === 17) {
			this.hint("Roulette Wheel Result 18 - i felt like it would be funny");
			for (const s1 of this.sides[0].active) {
				for (const s2 of this.sides[1].active) {
					if (pickSide === 0) {
						this.damage(s2.baseMaxhp / 4, s2);
						this.heal(s1.baseMaxhp / 4, s1);
						
					}
					else if (pickSide === 1) {
						this.damage(s1.baseMaxhp / 4, s1);
						this.heal(s2.baseMaxhp / 4, s2);
					}
				}
			}
		}  
			
		else if (result === 18) { 
			this.hint("Roulette Wheel Result 19 - Everyone gets Beast Boost.");
			for (const s1 of this.sides[0].active) {
				for (const s2 of this.sides[1].active) {
					const oldAbility1 = s1.setAbility('Beast Boost');
					if (oldAbility1) {
						this.add('-ability', s1, 'Beast Boost', '[from] move: Roulette Spin');
					}
					const oldAbility2 = s2.setAbility('Beast Boost');
					if (oldAbility2) {
						this.add('-ability', s2, 'Beast Boost', '[from] move: Roulette Spin');
					}
				}
			}
		} 			
		
		else if (result === 19) {
			this.hint("Roulette Wheel Result 20 - Give one Pokemon an omniboost.");
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
			
		else if (result === 20) {
			this.hint("Roulette Wheel Result 21 - Switch both sides' field effects.");
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
			
		else if (result === 21) {
			this.hint("Roulette Wheel Result 22 - Averages out the HP of active Pokemon.");
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
		
		else if (result === 22) {
			this.hint("Roulette Wheel Result 23 - One active Pokemon Defogs.");
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
			
		else if (result === 23) {
			this.hint("Roulette Wheel Result 24 - Both sides set Stealth Rock.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Stealth Rock", pokemon);
			}
		}
			
		else if (result === 24) {
			this.hint("Roulette Wheel Result 25 - Make both Pokemon swap abilities.");
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
			
		else if (result === 25) {
			this.hint("Roulette Wheel Result 26 - Both active Pokemon swap items.");
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
			
		else if (result === 26) {
			this.hint("Roulette Wheel Result 27 - Sets Trick Room.");
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
			
		else if (result === 27) {
			this.hint("Roulette Wheel Result 28 - Sets Magic Room.");
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

		else if (result === 28) {
			this.hint("Roulette Wheel Result 29 - Sets Wonder Room.");
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
			
		else if (result === 29) {
			this.hint("Roulette Wheel Result 30 - glhf");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Sheer Cold", pokemon);
			}
		}
			
	   else if (result === 30) {
			this.hint("Roulette Wheel Result 31 - screw you both");
	            for (const pokemon of this.getAllActive()) {
			this.directDamage(pokemon.hp, pokemon);
		    }
		}			
			
		else if (result === 31) {
			this.hint("Roulette Wheel Result 32 - Attempts to Freeze all active Pokemon.");
			for (const pokemon of this.getAllActive()) {
				pokemon.trySetStatus('frz', pokemon);
	        	}
		}	
			
		else if (result === 32) {
			this.hint("Roulette Wheel Result 33 - Funeral service...");
			var deez: number;
			deez = this.random(32);
			if (deez === 0) {
				for (const pokemon of this.sides[0].active) {
					this.directDamage(pokemon.hp, pokemon);
					this.add('-message', "rip bozo LMAOOOOOOOOO");
				}
			}
			else if (deez === 1) {
				for (const pokemon of this.sides[0].active) {
					this.directDamage(pokemon.hp, pokemon);
					this.add('-message', "rip bozo LMAOOOOOOOOO");
				}
			}
			else {	
				this.add(`raw|<img src="https://cdn.discordapp.com/attachments/884947038788276264/1043172263291269120/goriplax.png" height="454" width="411">`);
				this.add('-message', "Good day, ladies and gentlemen.");
				this.add('-message', "Many of you may be wondering why Gorilax wasn't included in Gen 9 Duomod.");
				this.add('-message', "Today, I have to bear the unfortunate news that Gorilax has passed away.");
				this.add('-message', "Over the years, Gorilax has graced our lives with his 116/101/117 bulk, awful typing, and cool offensive sets.");
				this.add('-message', "His abilities of Forewarn and Mental Note may not have been the best, but we loved him for them all the same.");
				this.add('-message', "Some may have found his looks creepy, but in spite of that, his face always had that unbreakable smile.");
				this.add('-message', "Let us not grieve over the fact that he is gone, but celebrate the fact that we were able to have so many good times with him.");
				this.add('-message', "We will forever miss you, Gorilax.");
				this.add('-message', "R.I.P. 2019 - 2022");
			}
		}

		else if (result === 33) {
			this.hint("Roulette Wheel Result 34 - Both active Pokemon use Metronome.");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Metronome", pokemon);
			}
		}
		
		else {
			this.hint("Roulette Wheel Result 35 - THE ULTIMATE EFFECT!!!");
			for (const pokemon of this.getAllActive()) {
				this.useMove("Ultranome", pokemon);
			}
		}
		
		},
	},		
	
	duomoddatamod: {
		effectType: 'Rule',
		name: 'Duomod Data Mod',
		desc: 'Gives data on stats, Ability and types when a Pokémon switches in.',
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			const species = this.dex.getSpecies(pokemon.species.name);
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
			/* pokemon.moveSlots[4] = {
				move: "Metronome",
				id: "metronome",
				pp: 5,
				maxpp: 64,
				target: "self",
				disabled: false,
				used: false,
				virtual: true,
			}; Maybe later, but for now, I'm not doing this. This would give each Pokemon 5 Metronomes in an additional moveslot.*/ 
		},
	},
};
