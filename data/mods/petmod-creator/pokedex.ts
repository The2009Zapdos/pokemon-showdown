{[k: string]: ModdedSpeciesData} = {

  // THIS IS WHERE NEW / EDITED POKEMON DATA GOES

rotom: {
        num: 479,
        name: "Rotom",
        types: ["Electric", "Ghost"],
        gender: "N",
        baseStats: {hp: 50, atk: 50, def: 77, spa: 95, spd: 77, spe: 91},
        abilities: {0: "Levitate"},
        heightm: 0.3,
        weightkg: 0.3,
        color: "Red",
        eggGroups: ["Amorphous"],
        otherFormes: ["Rotom-Heat", "Rotom-Wash"],
        formeOrder: ["Rotom", "Rotom-Heat", "Rotom-Wash""],
    },
    rotomheat: {
        num: 479,
        name: "Rotom-Heat",
        baseSpecies: "Rotom",
        forme: "Heat",
        types: ["Electric", "Fire"],
        gender: "N",
        baseStats: {hp: 50, atk: 65, def: 107, spa: 105, spd: 107, spe: 86},
        abilities: {0: "Levitate"},
        heightm: 0.3,
        weightkg: 0.3,
        color: "Red",
        eggGroups: ["Amorphous"],
        changesFrom: "Rotom",
    },
    rotomwash: {
        num: 479,
        name: "Rotom-Wash",
        baseSpecies: "Rotom",
        forme: "Wash",
        types: ["Electric", "Water"],
        gender: "N",
        baseStats: {hp: 50, atk: 65, def: 107, spa: 105, spd: 107, spe: 86},
        abilities: {0: "Levitate"},
        heightm: 0.3,
        weightkg: 0.3,
        color: "Red",
        eggGroups: ["Amorphous"],
        changesFrom: "Rotom",
    };
