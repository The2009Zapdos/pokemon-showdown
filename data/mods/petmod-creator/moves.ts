{[moveid: string]: MoveData} = {

  // THIS IS WHERE YOU ADD NEW / EDITED MOVES

firelash: {
        num: 680,
        accuracy: 100,
        basePower: 80,
        category: "Physical",
        name: "Fire Lash",
        pp: 15,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1},
        secondary: {
            chance: 100,
            boosts: {
                def: -1,
            },
        },
        target: "normal",
        type: "Fire",
        contestType: "Cute",
    };
