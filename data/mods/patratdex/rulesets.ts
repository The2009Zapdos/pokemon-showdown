export const Formats: {[k: string]: FormatData} = {
  realmonclause: {
		effectType: 'ValidatorRule',
		name: 'Realmon Clause',
		desc: "Bans all previously-existing Pokemon.",
		onValidateSet(set) {
			const species = this.dex.getSpecies(set.species);
			if (species.num < 1000) {
        return [
							"Previously-existing Pokemon are banned. Please use the Pokemon created for this mod.",
						];
      }
    },
  },
};
