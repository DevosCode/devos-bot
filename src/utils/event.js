
const updateChannelNameWithCount = async (channel, count) => {
    if (!channel) return;
    const currentName = channel.name;
    const newName = `${currentName.split(':')[0].trim()}: ${count}`;
  
    await channel.setName(newName, "Stats counter.");
  };

  
module.exports= {
    updateChannelNameWithCount
}