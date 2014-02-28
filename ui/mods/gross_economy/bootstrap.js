require.config({
  baseUrl: "coui://ui/mods",
  paths: {
    text: 'gross_economy/text',
  }
})
  // shutup
  handlers.army = function (payload) {
    model.currentEnergy(payload.energy.current);
    model.maxEnergy(payload.energy.storage);
    model.energyGain(payload.energy.production);
    model.energyLoss(payload.energy.demand);

    model.currentMetal(payload.metal.current);
    model.maxMetal(payload.metal.storage);
    model.metalGain(payload.metal.production);
    model.metalLoss(payload.metal.demand);

    model.hasFirstResourceUpdate(true);
    //console.log('army message:');
    //console.log(payload);
  }

require(['gross_economy/main'])
